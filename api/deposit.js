
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
    const {
      telegram_chat_id,
      amount_trx,
      tx_hash
    } = req.body || {};

    if (!telegram_chat_id || !amount_trx || !tx_hash) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id, amount_trx and tx_hash are required"
      });
    }

    const userAmount = Number(amount_trx);

    if (!Number.isFinite(userAmount) || userAmount <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRX amount"
      });
    }

    // TRON TXID must be exactly 64 hexadecimal characters
    const cleanTxHash = String(tx_hash).trim();

    if (!/^[a-fA-F0-9]{64}$/.test(cleanTxHash)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRON transaction hash"
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        ok: false,
        message: "Supabase environment variables are missing"
      });
    }

    // Your shared TRX deposit address
    const depositAddress = "TDhbWgGaC3yEBcqoqz3425TeEZtVAqThxX";

    // --------------------------------------------------
    // 1. Check that Telegram user is registered
    // --------------------------------------------------

    const userResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users?telegram_chat_id=eq.${encodeURIComponent(
        String(telegram_chat_id)
      )}&select=telegram_chat_id&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const users = await userResponse.json();

    if (!userResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not verify user"
      });
    }

    if (!users || users.length === 0) {
      return res.status(403).json({
        ok: false,
        message: "User is not registered"
      });
    }

    // --------------------------------------------------
    // 2. Check if TXID was already submitted
    // --------------------------------------------------

    const duplicateResponse = await fetch(
      `${supabaseUrl}/rest/v1/deposits?tx_hash=eq.${encodeURIComponent(
        cleanTxHash
      )}&select=id,status&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const duplicates = await duplicateResponse.json();

    if (!duplicateResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not check transaction"
      });
    }

    if (duplicates.length > 0) {
      return res.status(409).json({
        ok: false,
        message: "This transaction has already been submitted"
      });
    }

    // --------------------------------------------------
    // 3. Get solidified transaction from TRON
    // --------------------------------------------------

    const trxResponse = await fetch(
      "https://api.trongrid.io/walletsolidity/gettransactionbyid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          value: cleanTxHash
        })
      }
    );

    const trxData = await trxResponse.json();

    if (
      !trxResponse.ok ||
      !trxData ||
      trxData.Error ||
      !trxData.txID
    ) {
      return res.status(400).json({
        ok: false,
        message: "Transaction not found or not yet confirmed on TRON"
      });
    }

    // --------------------------------------------------
    // 4. Check transaction type
    // --------------------------------------------------

    const contract = trxData?.raw_data?.contract?.[0];

    if (!contract || contract.type !== "TransferContract") {
      return res.status(400).json({
        ok: false,
        message: "Transaction is not a native TRX transfer"
      });
    }

    const parameter = contract?.parameter?.value;

    if (!parameter) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRON transfer data"
      });
    }

    // --------------------------------------------------
    // 5. Decode TRON hex address to Base58
    // --------------------------------------------------

    function hexToBase58(hexAddress) {
      const alphabet =
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

      function sha256(buffer) {
        return require("crypto")
          .createHash("sha256")
          .update(buffer)
          .digest();
      }

      const bytes = Buffer.from(hexAddress, "hex");

      const checksum = sha256(sha256(bytes)).subarray(0, 4);

      const full = Buffer.concat([bytes, checksum]);

      let num = BigInt("0x" + full.toString("hex"));
      let result = "";

      while (num > 0n) {
        const remainder = Number(num % 58n);
        result = alphabet[remainder] + result;
        num = num / 58n;
      }

      for (const byte of full) {
        if (byte === 0) {
          result = "1" + result;
        } else {
          break;
        }
      }

      return result;
    }

    let toAddress;

    try {
      toAddress = hexToBase58(parameter.to_address);
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Could not read transaction recipient"
      });
    }

    // --------------------------------------------------
    // 6. Verify recipient address
    // --------------------------------------------------

    if (toAddress !== depositAddress) {
      return res.status(400).json({
        ok: false,
        message: "Transaction was not sent to the deposit address"
      });
    }

    // --------------------------------------------------
    // 7. Get actual TRX amount from blockchain
    // --------------------------------------------------

    const actualAmountTrx =
      Number(parameter.amount) / 1000000;

    if (!Number.isFinite(actualAmountTrx) || actualAmountTrx <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRX amount on blockchain"
      });
    }

    // --------------------------------------------------
    // 8. Compare user-entered amount with blockchain amount
    // --------------------------------------------------

    const difference =
      Math.abs(actualAmountTrx - userAmount);

    if (difference > 0.000001) {
      return res.status(400).json({
        ok: false,
        message:
          `Amount mismatch. Blockchain: ${actualAmountTrx} TRX`
      });
    }

    // --------------------------------------------------
    // 9. Check solidified execution receipt
    // --------------------------------------------------

    const receiptResponse = await fetch(
      "https://api.trongrid.io/walletsolidity/gettransactioninfobyid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          value: cleanTxHash
        })
      }
    );

    const receiptData = await receiptResponse.json();

    if (
      !receiptResponse.ok ||
      !receiptData ||
      receiptData.Error ||
      !receiptData.id
    ) {
      return res.status(400).json({
        ok: false,
        message: "Transaction receipt is not yet available"
      });
    }

    // Plain TRX transfer should have successful execution.
    if (
      receiptData.receipt &&
      receiptData.receipt.result &&
      receiptData.receipt.result !== "SUCCESS"
    ) {
      return res.status(400).json({
        ok: false,
        message: "TRON transaction execution was not successful"
      });
    }

    // --------------------------------------------------
    // 10. Save verified deposit
    // --------------------------------------------------

    const response = await fetch(
      `${supabaseUrl}/rest/v1/deposits`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          telegram_chat_id: String(telegram_chat_id),
          amount_trx: actualAmountTrx,
          tx_hash: cleanTxHash,
          deposit_address: depositAddress,
          status: "approved",
          verified_at: new Date().toISOString(),
          verified_amount_trx: actualAmountTrx,
          verification_note:
            "Verified against solidified TRON transaction"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Verified transaction could not be saved",
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Deposit verified successfully",
      deposit: data?.[0] || data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message
    });
  }
}

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

    const amount = Number(amount_trx);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRX amount"
      });
    }

    if (amount < 1) {
      return res.status(400).json({
        ok: false,
        message: "Minimum deposit is 1 TRX"
      });
    }

    const cleanTxHash = String(tx_hash).trim();

    if (!/^[A-Za-z0-9]{20,128}$/.test(cleanTxHash)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid transaction hash"
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

    // Check that the Telegram user is registered
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

    // Check duplicate transaction hash
    const duplicateResponse = await fetch(
      `${supabaseUrl}/rest/v1/deposits?tx_hash=eq.${encodeURIComponent(
        cleanTxHash
      )}&select=id&limit=1`,
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

    // Create pending deposit
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
          amount_trx: amount,
          tx_hash: cleanTxHash,
          status: "pending"
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Deposit could not be saved",
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Deposit submitted successfully",
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

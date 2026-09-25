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
      destination_address
    } = req.body || {};

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "Telegram chat ID is required"
      });
    }

    const amount = Number(amount_trx);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Invalid withdrawal amount"
      });
    }

    if (amount < 50) {
      return res.status(400).json({
        ok: false,
        message: "Minimum withdrawal is 50 TRX"
      });
    }

    if (!destination_address) {
      return res.status(400).json({
        ok: false,
        message: "TRON destination address is required"
      });
    }

    const address = String(destination_address).trim();

    if (!address.startsWith("T") || address.length !== 34) {
      return res.status(400).json({
        ok: false,
        message: "Invalid TRON address"
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

    const response = await fetch(
      `${supabaseUrl}/rest/v1/rpc/request_withdrawal`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_telegram_chat_id: String(telegram_chat_id),
          p_amount_trx: amount,
          p_destination_address: address
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        ok: false,
        message:
          data?.message ||
          data?.hint ||
          "Withdrawal request failed",
        error: data
      });
    }

    /*
     * Create notification
     */
    try {
      const withdrawal = data;

      await fetch(
        `${supabaseUrl}/rest/v1/notifications`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            telegram_chat_id: String(telegram_chat_id),
            type: "withdraw",
            title: "Withdrawal Requested",
            message:
              `${amount} TRX withdrawal request has been submitted and is pending admin approval.`,
            status: "pending",
            amount_trx: amount,
            metadata: {
              withdrawal_id:
                withdrawal?.withdrawal_id || null,
              destination_address: address
            },
            is_read: false
          })
        }
      );
    } catch (notificationError) {
      console.error(
        "Withdrawal notification error:",
        notificationError
      );
    }

    return res.status(200).json({
      ok: true,
      message: "Withdrawal request submitted successfully",
      withdrawal: data
    });

  } catch (error) {
    console.error("Withdrawal error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

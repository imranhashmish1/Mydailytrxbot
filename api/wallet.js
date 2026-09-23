export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
    const telegram_chat_id =
      String(req.query.telegram_chat_id || "").trim();

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id is required"
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
      `${supabaseUrl}/rest/v1/wallet_balances?telegram_chat_id=eq.${encodeURIComponent(
        telegram_chat_id
      )}&select=available_trx,locked_trx&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load wallet",
        error: data
      });
    }

    const wallet = data?.[0];

    return res.status(200).json({
      ok: true,
      available_trx: wallet
        ? Number(wallet.available_trx || 0)
        : 0,
      locked_trx: wallet
        ? Number(wallet.locked_trx || 0)
        : 0
    });

  } catch (error) {
    console.error("Wallet API error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

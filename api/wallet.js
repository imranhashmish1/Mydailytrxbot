export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  const telegram_chat_id = String(
    req.query.telegram_chat_id || ""
  ).trim();

  if (!telegram_chat_id) {
    return res.status(400).json({
      ok: false,
      message: "telegram_chat_id is required"
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      ok: false,
      message: "Missing Supabase environment variables"
    });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/wallet_balances?telegram_chat_id=eq.${encodeURIComponent(
        telegram_chat_id
      )}&select=id,telegram_chat_id,balance_trx,Update_at,Lock_TRX&limit=1`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load wallet balance",
        error: data
      });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        ok: true,
        wallet: {
          telegram_chat_id,
          balance_trx: 0,
          lock_trx: 0
        }
      });
    }

    const wallet = data[0];

    return res.status(200).json({
      ok: true,
      wallet: {
        id: wallet.id,
        telegram_chat_id: wallet.telegram_chat_id,
        balance_trx: Number(wallet.balance_trx || 0),
        lock_trx: Number(wallet.Lock_TRX || 0),
        update_at: wallet.Update_at || null
      }
    });

  } catch (error) {
    console.error("Wallet API error:", error);

    return res.status(500).json({
      ok: false,
      message: "Wallet server error"
    });
  }
}

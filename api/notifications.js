export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
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

    const telegram_chat_id =
      String(req.query?.telegram_chat_id || "").trim();

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "Telegram chat ID is required"
      });
    }

    const url =
      `${supabaseUrl}/rest/v1/notifications` +
      `?telegram_chat_id=eq.${encodeURIComponent(telegram_chat_id)}` +
      `&select=id,type,title,message,status,amount_trx,tx_hash,metadata,is_read,created_at` +
      `&order=created_at.desc` +
      `&limit=100`;

    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load notifications",
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      notifications: data || []
    });

  } catch (error) {
    console.error("Notifications error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

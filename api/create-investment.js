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
      plan_id
    } = req.body || {};

    if (!telegram_chat_id || !plan_id) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id and plan_id are required"
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
      `${supabaseUrl}/rest/v1/rpc/create_investment`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_telegram_chat_id: String(telegram_chat_id),
          p_plan_id: Number(plan_id)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        ok: false,
        message: data?.message || "Investment failed",
        error: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Create investment error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

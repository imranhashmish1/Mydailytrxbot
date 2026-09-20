export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      ok: true,
      message: "Telegram API is running"
    });
  }

  try {
    const update = req.body;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY;

    if (!token || !supabaseUrl || !supabaseKey) {
      throw new Error("Missing environment variables");
    }

    if (update?.message?.text === "/start") {
      const chatId = update.message.chat.id;

      // Check if Telegram user already exists
      const checkResponse = await fetch(
        `${supabaseUrl}/rest/v1/bot_users?telegram_chat_id=eq.${chatId}&select=id`,
        {
          method: "GET",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
          }
        }
      );

      const existingUsers = await checkResponse.json();

      // Create user if not already registered
      if (!existingUsers.length) {
        const insertResponse = await fetch(
          `${supabaseUrl}/rest/v1/bot_users`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal"
            },
            body: JSON.stringify({
              telegram_chat_id: chatId,
              is_verified: false
            })
          }
        );

        if (!insertResponse.ok) {
          const errorText = await insertResponse.text();
          throw new Error(`Supabase insert failed: ${errorText}`);
        }
      }

      // Send Telegram welcome message
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text:
            "👋 Welcome to DailyTRX Bot!\n\n" +
            "Your Telegram account has been registered successfully. ✅"
        })
      });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}

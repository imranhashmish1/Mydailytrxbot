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

    const envStatus = {
      TELEGRAM_BOT_TOKEN: token ? "OK" : "MISSING",
      SUPABASE_URL: supabaseUrl ? "OK" : "MISSING",
      SUPABASE_SECRET_KEY: supabaseKey ? "OK" : "MISSING"
    };

    console.log("Environment status:", envStatus);

    if (!token || !supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        ok: false,
        error: "Missing environment variables",
        environment: envStatus
      });
    }

    const message = update?.message;

    if (!message) {
      return res.status(200).json({
        ok: true
      });
    }

    const chatId = String(message.chat.id);
    const text = String(message.text || "").trim();

    /*
     * Telegram referral link example:
     *
     * https://t.me/MyDailyTRXBot?start=TRXE092665CF9
     *
     * Telegram sends:
     *
     * /start TRXE092665CF9
     */

    if (text.startsWith("/start")) {

      const parts = text.split(/\s+/);

      let referralCode = null;

      if (parts.length >= 2 && parts[1]) {
        referralCode = parts[1].trim();
      }

      console.log("Telegram start:", {
        chatId,
        hasReferralCode: !!referralCode
      });

      // Check existing user
      const checkResponse = await fetch(
        `${supabaseUrl}/rest/v1/bot_users?telegram_chat_id=eq.${encodeURIComponent(chatId)}&select=id,referral_code,referred_by_code`,
        {
          method: "GET",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
          }
        }
      );

      if (!checkResponse.ok) {
        const errorText = await checkResponse.text();

        throw new Error(
          `Supabase check failed: ${errorText}`
        );
      }

      const existingUsers = await checkResponse.json();

      /*
       * New Telegram user
       */
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
              is_verified: false,
              referred_by_code: referralCode || null
            })
          }
        );

        if (!insertResponse.ok) {
          const errorText = await insertResponse.text();

          throw new Error(
            `Supabase insert failed: ${errorText}`
          );
        }

      } else if (
        referralCode &&
        !existingUsers[0].referred_by_code
      ) {

        /*
         * Existing Telegram user who has no referral yet.
         * Save the referral code without replacing
         * the user's own referral_code.
         */

        const updateResponse = await fetch(
          `${supabaseUrl}/rest/v1/bot_users?telegram_chat_id=eq.${encodeURIComponent(chatId)}`,
          {
            method: "PATCH",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal"
            },
            body: JSON.stringify({
              referred_by_code: referralCode
            })
          }
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();

          throw new Error(
            `Supabase referral update failed: ${errorText}`
          );
        }
      }

      /*
       * Welcome message
       */
      let welcomeText =
        "👋 Welcome to DailyTRX Bot!\n\n" +
        "Your Telegram account has been registered successfully. ✅";

      if (referralCode) {
        welcomeText +=
          "\n\n🎁 Referral link detected successfully. ✅";
      }

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeText
          })
        }
      );

      if (!telegramResponse.ok) {
        const errorText = await telegramResponse.text();

        throw new Error(
          `Telegram sendMessage failed: ${errorText}`
        );
      }
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {

    console.error(
      "Telegram API error:",
      error.message
    );

    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}

import crypto from "crypto";

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
      username,
      email,
      pin,
      referral_code
    } = req.body || {};

    if (!telegram_chat_id || !username || !email || !pin) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id, username, email and pin are required"
      });
    }

    if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid username"
      });
    }

    if (!/^\d{4,6}$/.test(String(pin))) {
      return res.status(400).json({
        ok: false,
        message: "PIN must be 4 to 6 digits"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid email"
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

    const telegramId = String(telegram_chat_id);

    // Check existing Telegram user
    const existingResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users?telegram_chat_id=eq.${encodeURIComponent(telegramId)}&select=id,referral_code,referred_by_code`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    if (!existingResponse.ok) {
      const errorText = await existingResponse.text();

      return res.status(500).json({
        ok: false,
        message: "Could not check existing user",
        error: errorText
      });
    }

    const existingUsers = await existingResponse.json();
    const existingUser = existingUsers[0] || null;

    // Keep existing referral code if user already has one
    const ownReferralCode =
      existingUser?.referral_code ||
      ("TRX" + crypto.randomBytes(5).toString("hex")).toUpperCase();

    // Referral code can come from:
    // 1. Registration form
    // 2. Telegram /start referral link saved by telegram.js
    const suppliedReferralCode =
      referral_code ||
      existingUser?.referred_by_code ||
      null;

    const pinHash = crypto
      .createHash("sha256")
      .update(String(pin))
      .digest("hex");

    // Register / update user
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bot_users?on_conflict=telegram_chat_id`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify({
          telegram_chat_id: telegramId,
          username,
          email,
          pin_hash: pinHash,
          referral_code: ownReferralCode,
          is_verified: false,
          referred_by_code: suppliedReferralCode
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: "Supabase registration failed",
        error: data
      });
    }

    let referralCreated = false;
    let referralMessage = null;

    /*
     * If a referral code exists, connect this user
     * to the referral system.
     */
    if (suppliedReferralCode) {
      try {
        const host = req.headers.host;

        const protocol =
          req.headers["x-forwarded-proto"] || "https";

        const referralApiUrl =
          `${protocol}://${host}/api/referral`;

        const referralResponse = await fetch(
          referralApiUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              telegram_chat_id: telegramId,
              referral_code: suppliedReferralCode
            })
          }
        );

        const referralData = await referralResponse.json();

        referralCreated =
          referralResponse.ok &&
          referralData?.ok === true;

        referralMessage =
          referralData?.message || null;

      } catch (referralError) {
        console.error(
          "Referral connection error:",
          referralError.message
        );

        referralMessage =
          "Registration succeeded, but referral could not be connected yet.";
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Registration successful",
      user: data?.[0] || data,
      referral_code: ownReferralCode,
      referred_by_code: suppliedReferralCode,
      referral_created: referralCreated,
      referral_message: referralMessage
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message
    });
  }
}

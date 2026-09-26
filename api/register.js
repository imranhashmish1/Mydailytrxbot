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

    const pinHash = crypto
      .createHash("sha256")
      .update(String(pin))
      .digest("hex");

    // Create a unique referral code for this user
    const ownReferralCode =
      "TRX" + crypto.randomBytes(5).toString("hex").toUpperCase();

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
          telegram_chat_id: String(telegram_chat_id),
          username,
          email,
          pin_hash: pinHash,
          referral_code: ownReferralCode,
          is_verified: false
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

    // If no referral code was supplied, registration is complete
    if (!referral_code) {
      return res.status(200).json({
        ok: true,
        message: "Registration successful",
        user: data?.[0] || data,
        referral_created: false
      });
    }

    const cleanReferralCode = String(referral_code).trim();

    // Find the user whose referral code was used
    const referrerResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users?referral_code=eq.${encodeURIComponent(cleanReferralCode)}&select=telegram_chat_id,referral_code`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    if (!referrerResponse.ok) {
      return res.status(200).json({
        ok: true,
        message: "Registration successful, but referral could not be checked",
        user: data?.[0] || data,
        referral_created: false
      });
    }

    const referrers = await referrerResponse.json();

    if (!referrers || referrers.length === 0) {
      return res.status(200).json({
        ok: true,
        message: "Registration successful, but referral code was not found",
        user: data?.[0] || data,
        referral_created: false
      });
    }

    const referrerTelegramId = String(
      referrers[0].telegram_chat_id
    );

    const referredTelegramId = String(telegram_chat_id);

    // Prevent self-referral
    if (referrerTelegramId === referredTelegramId) {
      return res.status(200).json({
        ok: true,
        message: "Registration successful",
        user: data?.[0] || data,
        referral_created: false,
        referral_message: "Self referral is not allowed"
      });
    }

    // Check if this user already has a direct referrer
    const existingResponse = await fetch(
      `${supabaseUrl}/rest/v1/referrals?referred_telegram_chat_id=eq.${encodeURIComponent(referredTelegramId)}&level=eq.1&select=id`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    if (existingResponse.ok) {
      const existing = await existingResponse.json();

      if (existing.length > 0) {
        return res.status(200).json({
          ok: true,
          message: "Registration successful",
          user: data?.[0] || data,
          referral_created: false,
          referral_message: "Referral already exists"
        });
      }
    }

    // Create Level 1 referral
    const referralResponse = await fetch(
      `${supabaseUrl}/rest/v1/referrals`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify({
          referrer_telegram_chat_id: referrerTelegramId,
          referred_telegram_chat_id: referredTelegramId,
          level: 1,
          commission_rate: 0.06,
          total_commission_trx: 0
        })
      }
    );

    const referralData = await referralResponse.json();

    return res.status(200).json({
      ok: true,
      message: "Registration successful",
      user: data?.[0] || data,
      referral_created: referralResponse.ok,
      referral: referralData
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

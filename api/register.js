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

    const code =
      referral_code ||
      ("TRX" + crypto.randomBytes(5).toString("hex")).toUpperCase();

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
          telegram_chat_id,
          username,
          email,
          pin_hash: pinHash,
          referral_code: code,
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

    return res.status(200).json({
      ok: true,
      message: "Registration successful",
      user: data?.[0] || data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message
    });
  }
}

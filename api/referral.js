export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
      return res.status(500).json({
        ok: false,
        message: "Missing Supabase environment variables"
      });
    }

    const {
      telegram_chat_id,
      referral_code
    } = req.body || {};

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id is required"
      });
    }

    if (!referral_code) {
      return res.status(400).json({
        ok: false,
        message: "referral_code is required"
      });
    }

    const cleanReferralCode = String(referral_code).trim();

    // Find the referrer
    const referrerResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/bot_users?telegram_chat_id=eq.${encodeURIComponent(cleanReferralCode)}&select=telegram_chat_id`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
        }
      }
    );

    if (!referrerResponse.ok) {
      const errorText = await referrerResponse.text();

      return res.status(500).json({
        ok: false,
        message: "Could not find referrer",
        error: errorText
      });
    }

    const referrers = await referrerResponse.json();

    if (!referrers || referrers.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Referral user not found"
      });
    }

    const referrerId = String(referrers[0].telegram_chat_id);
    const referredId = String(telegram_chat_id);

    // Prevent self-referral
    if (referrerId === referredId) {
      return res.status(400).json({
        ok: false,
        message: "You cannot refer yourself"
      });
    }

    // Check whether this user already has a referral
    const existingResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/referrals?referred_telegram_chat_id=eq.${encodeURIComponent(referredId)}&select=id,referrer_telegram_chat_id,level,commission_rate,total_commission_trx`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
        }
      }
    );

    if (!existingResponse.ok) {
      const errorText = await existingResponse.text();

      return res.status(500).json({
        ok: false,
        message: "Could not check existing referral",
        error: errorText
      });
    }

    const existingReferrals = await existingResponse.json();

    if (existingReferrals.length > 0) {
      return res.status(409).json({
        ok: false,
        message: "This user already has a referral",
        referral: existingReferrals[0]
      });
    }

    // Level 1 referral
    const level1 = {
      referrer_telegram_chat_id: referrerId,
      referred_telegram_chat_id: referredId,
      level: 1,
      commission_rate: 0.06,
      total_commission_trx: 0
    };

    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/referrals`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify(level1)
      }
    );

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();

      return res.status(500).json({
        ok: false,
        message: "Could not create referral",
        error: errorText
      });
    }

    const inserted = await insertResponse.json();

    return res.status(200).json({
      ok: true,
      message: "Referral created successfully",
      referral: inserted[0] || inserted
    });

  } catch (error) {
    console.error("Referral API error:", error);

    return res.status(500).json({
      ok: false,
      message: "Referral server error",
      error: error.message
    });
  }
}

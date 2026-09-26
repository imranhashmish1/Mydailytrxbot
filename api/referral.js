export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    })allowed  try {
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

    if (!telegram_chat_id || !referral_code) {
      return res.status(400).json({
        ok: false,
        message: "telegram_chat_id and referral_code are required"
      });
    }

    const referredId = String(telegram_chat_id);
    const cleanCode = String(referral_code).trim();

    // Find the owner of the referral code
    const referrerResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/bot_users?referral_code=eq.${encodeURIComponent(cleanCode)}&select=telegram_chat_id`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
        }
      }
    );

    if (!referrerResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not find referral owner"
      });
    }

    const referrers = await referrerResponse.json();

    if (!referrers.length) {
      return res.status(404).json({
        ok: false,
        message: "Referral code not found"
      });
    }

    const directReferrerId = String(
      referrers[0].telegram_chat_id
    );

    // Prevent self referral
    if (directReferrerId === referredId) {
      return res.status(400).json({
        ok: false,
        message: "Self referral is not allowed"
      });
    }

    // Check whether this user already has a Level 1 referrer
    const existingResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/referrals?referred_telegram_chat_id=eq.${encodeURIComponent(referredId)}&level=eq.1&select=id`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
        }
      }
    );

    if (!existingResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not check existing referral"
      });
    }

    const existing = await existingResponse.json();

    if (existing.length > 0) {
      return res.status(409).json({
        ok: false,
        message: "Referral already exists"
      });
    }

    // Create Level 1
    const level1 = await createReferral({
      supabaseUrl: SUPABASE_URL,
      supabaseKey: SUPABASE_SECRET_KEY,
      referrerId: directReferrerId,
      referredId,
      level: 1,
      rate: 0.06
    });

    if (!level1.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not create Level 1 referral",
        error: level1.error
      });
    }

    // Find Level 2 referrer
    const level1ParentResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/referrals?referred_telegram_chat_id=eq.${encodeURIComponent(directReferrerId)}&level=eq.1&select=referrer_telegram_chat_id`,
      {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
        }
      }
    );

    if (level1ParentResponse.ok) {
      const parents = await level1ParentResponse.json();

      if (parents.length > 0) {
        const level2ReferrerId =
          String(parents[0].referrer_telegram_chat_id);

        if (
          level2ReferrerId &&
          level2ReferrerId !== referredId &&
          level2ReferrerId !== directReferrerId
        ) {
          await createReferral({
            supabaseUrl: SUPABASE_URL,
            supabaseKey: SUPABASE_SECRET_KEY,
            referrerId: level2ReferrerId,
            referredId,
            level: 2,
            rate: 0.02
          });

          // Find Level 3 referrer
          const level2ParentResponse = await fetch(
            `${SUPABASE_URL}/rest/v1/referrals?referred_telegram_chat_id=eq.${encodeURIComponent(level2ReferrerId)}&level=eq.1&select=referrer_telegram_chat_id`,
            {
              headers: {
                apikey: SUPABASE_SECRET_KEY,
                Authorization: `Bearer ${SUPABASE_SECRET_KEY}`
              }
            }
          );

          if (level2ParentResponse.ok) {
            const parents2 = await level2ParentResponse.json();

            if (parents2.length > 0) {
              const level3ReferrerId =
                String(parents2[0].referrer_telegram_chat_id);

              if (
                level3ReferrerId &&
                level3ReferrerId !== referredId &&
                level3ReferrerId !== directReferrerId &&
                level3ReferrerId !== level2ReferrerId
              ) {
                await createReferral({
                  supabaseUrl: SUPABASE_URL,
                  supabaseKey: SUPABASE_SECRET_KEY,
                  referrerId: level3ReferrerId,
                  referredId,
                  level: 3,
                  rate: 0.01
                });
              }
            }
          }
        }
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Referral network created successfully",
      levels: {
        level1: "6%",
        level2: "2%",
        level3: "1%"
      }
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


async function createReferral({
  supabaseUrl,
  supabaseKey,
  referrerId,
  referredId,
  level,
  rate
}) {
  try {
    const response = await fetch(
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
          referrer_telegram_chat_id: referrerId,
          referred_telegram_chat_id: referredId,
          level,
          commission_rate: rate,
          total_commission_trx: 0
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data
      };
    }

    return {
      ok: true,
      data
    };

  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
  }
}

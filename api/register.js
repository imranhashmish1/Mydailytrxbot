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
        message:
          "telegram_chat_id, username, email and pin are required"
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

    const headers = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json"
    };

    /*
     * 1. Check existing Telegram user
     */
    const existingResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users` +
      `?telegram_chat_id=eq.${encodeURIComponent(telegramId)}` +
      `&select=id,telegram_chat_id,referral_code,referred_by_code`,
      {
        headers
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

    /*
     * 2. Keep existing referral code,
     *    otherwise create a new one.
     */
    const ownReferralCode =
      existingUser?.referral_code ||
      ("TRX" + crypto.randomBytes(5).toString("hex"))
        .toUpperCase();

    /*
     * Referral source can come from:
     *
     * 1. Registration form
     * 2. Telegram /start referral link
     * 3. Existing saved referred_by_code
     */
    const suppliedReferralCode =
      referral_code ||
      existingUser?.referred_by_code ||
      null;

    /*
     * 3. Hash PIN
     */
    const pinHash = crypto
      .createHash("sha256")
      .update(String(pin))
      .digest("hex");

    /*
     * 4. Register / update user
     */
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bot_users?on_conflict=telegram_chat_id`,
      {
        method: "POST",
        headers: {
          ...headers,
          Prefer:
            "resolution=merge-duplicates,return=representation"
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

    /*
     * 5. Referral system
     *
     * Level 1 = 6%
     * Level 2 = 2%
     * Level 3 = 1%
     *
     * This only creates the referral relationship.
     * Commission is paid later when an investment
     * is created.
     */

    let referralCreated = false;
    let referralLevelsCreated = 0;
    let referralMessage = null;

    if (
      suppliedReferralCode &&
      suppliedReferralCode !== ownReferralCode
    ) {
      try {
        let currentReferralCode =
          String(suppliedReferralCode).trim();

        for (let level = 1; level <= 3; level++) {

          if (!currentReferralCode) {
            break;
          }

          /*
           * Find the user who owns this referral code.
           */
          const referrerResponse = await fetch(
            `${supabaseUrl}/rest/v1/bot_users` +
            `?referral_code=eq.${encodeURIComponent(currentReferralCode)}` +
            `&select=telegram_chat_id,referral_code,referred_by_code` +
            `&limit=1`,
            {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`
              }
            }
          );

          if (!referrerResponse.ok) {
            console.error(
              "Could not find referral owner:",
              await referrerResponse.text()
            );
            break;
          }

          const referrerUsers =
            await referrerResponse.json();

          const referrer = referrerUsers[0];

          /*
           * Referral code does not belong to a user.
           */
          if (!referrer) {
            break;
          }

          const referrerTelegramId =
            String(referrer.telegram_chat_id);

          /*
           * Never allow self-referral.
           */
          if (referrerTelegramId === telegramId) {
            break;
          }

          /*
           * Commission rate for this referral level.
           */
          let commissionRate = 0;

          if (level === 1) {
            commissionRate = 0.06;
          } else if (level === 2) {
            commissionRate = 0.02;
          } else if (level === 3) {
            commissionRate = 0.01;
          }

          /*
           * Check whether this exact referral
           * relationship already exists.
           */
          const existingReferralResponse =
            await fetch(
              `${supabaseUrl}/rest/v1/referrals` +
              `?referrer_telegram_chat_id=eq.${encodeURIComponent(referrerTelegramId)}` +
              `&referred_telegram_chat_id=eq.${encodeURIComponent(telegramId)}` +
              `&level=eq.${level}` +
              `&select=id` +
              `&limit=1`,
              {
                headers: {
                  apikey: supabaseKey,
                  Authorization: `Bearer ${supabaseKey}`
                }
              }
            );

          if (existingReferralResponse.ok) {
            const existingReferral =
              await existingReferralResponse.json();

            if (
              Array.isArray(existingReferral) &&
              existingReferral.length > 0
            ) {
              /*
               * Already exists.
               * Continue upward to check next level.
               */
            } else {
              /*
               * Create referral relationship.
               */
              const insertReferralResponse =
                await fetch(
                  `${supabaseUrl}/rest/v1/referrals`,
                  {
                    method: "POST",
                    headers: {
                      ...headers,
                      Prefer: "return=representation"
                    },
                    body: JSON.stringify({
                      referrer_telegram_chat_id:
                        referrerTelegramId,

                      referred_telegram_chat_id:
                        telegramId,

                      level,

                      commission_rate:
                        commissionRate,

                      total_commission_trx: 0
                    })
                  }
                );

              const insertReferralData =
                await insertReferralResponse.json();

              if (!insertReferralResponse.ok) {
                console.error(
                  "Referral insert failed:",
                  insertReferralData
                );

                /*
                 * Registration itself remains successful.
                 */
                referralMessage =
                  "Registration succeeded, but referral connection needs review.";

                break;
              }

              referralCreated = true;
              referralLevelsCreated++;
            }
          }

          /*
           * Move upward through the referral chain.
           *
           * Example:
           *
           * User C
           *   ↓
           * User B
           *   ↓
           * User A
           *
           * C gets:
           * Level 1 → B
           * Level 2 → A
           */
          currentReferralCode =
            referrer.referred_by_code || null;
        }

        if (referralLevelsCreated > 0) {
          referralMessage =
            `${referralLevelsCreated} referral level(s) connected successfully.`;
        }

      } catch (referralError) {
        console.error(
          "Referral processing error:",
          referralError
        );

        referralMessage =
          "Registration succeeded, but referral connection needs review.";
      }
    }

    /*
     * 6. Final response
     */
    return res.status(200).json({
      ok: true,
      message: "Registration successful",

      user: data?.[0] || data,

      referral_code: ownReferralCode,

      referred_by_code:
        suppliedReferralCode,

      referral_created:
        referralCreated,

      referral_levels_created:
        referralLevelsCreated,

      referral_message:
        referralMessage
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: "Server error",
      error: error.message
    });
  }
}

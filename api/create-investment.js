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

    const chatId = String(telegram_chat_id);
    const numericPlanId = Number(plan_id);

    /*
     * 1. Create investment
     */
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
          p_telegram_chat_id: chatId,
          p_plan_id: numericPlanId
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

    /*
     * 2. Try to get investment details from RPC response
     */
    const investment =
      Array.isArray(data) ? data[0] : data;

    const investmentId =
      investment?.id ||
      investment?.investment_id ||
      null;

    const planName =
      investment?.plan_name ||
      investment?.name ||
      investment?.title ||
      `Investment Plan #${numericPlanId}`;

    const amount =
      investment?.amount_trx ??
      investment?.amount ??
      investment?.principal ??
      null;

    const dailyProfit =
      investment?.daily_profit ??
      investment?.daily_profit_trx ??
      investment?.profit_per_day ??
      null;

    const duration =
      investment?.duration_days ??
      investment?.days ??
      null;

    /*
     * 3. Create notification
     *
     * Notification failure will NOT cancel the investment.
     */
    let notificationCreated = false;

    try {
      const notificationResponse = await fetch(
        `${supabaseUrl}/rest/v1/notifications`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
          },
          body: JSON.stringify({
            telegram_chat_id: chatId,
            type: "investment",
            title: "Investment Created",
            message:
              `Your investment in ${planName} has been successfully created.`,
            status: "completed",
            amount_trx: amount,
            metadata: {
              investment_id: investmentId,
              plan_id: numericPlanId,
              plan_name: planName,
              daily_profit: dailyProfit,
              duration_days: duration
            },
            is_read: false
          })
        }
      );

      const notificationData =
        await notificationResponse.json();

      if (notificationResponse.ok) {
        notificationCreated = true;
      } else {
        console.error(
          "Investment notification failed:",
          notificationData
        );
      }

    } catch (notificationError) {
      console.error(
        "Investment notification error:",
        notificationError
      );
    }

    /*
     * 4. Return successful investment result
     */
    return res.status(200).json({
      ...(
        typeof data === "object" && data !== null
          ? data
          : {}
      ),
      notification_created: notificationCreated
    });

  } catch (error) {
    console.error("Create investment error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

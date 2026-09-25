export default async function handler(req, res) {
  if (req.method === "GET") {
    return getWithdrawals(req, res);
  }

  if (req.method === "POST") {
    return processWithdrawal(req, res);
  }

  return res.status(405).json({
    ok: false,
    message: "Method not allowed"
  });
}


async function getWithdrawals(req, res) {
  try {
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

    const telegram_chat_id =
      String(req.query?.telegram_chat_id || "").trim();

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "Telegram chat ID is required"
      });
    }

    // Check admin
    const adminResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users` +
      `?telegram_chat_id=eq.${encodeURIComponent(telegram_chat_id)}` +
      `&select=id,telegram_chat_id,is_admin` +
      `&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const adminData = await adminResponse.json();

    if (!adminResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not verify admin",
        error: adminData
      });
    }

    const admin = adminData?.[0];

    if (!admin || admin.is_admin !== true) {
      return res.status(403).json({
        ok: false,
        message: "Admin access required"
      });
    }

    // Load pending withdrawals
    const withdrawalsResponse = await fetch(
      `${supabaseUrl}/rest/v1/withdrawals` +
      `?status=eq.pending` +
      `&select=id,telegram_chat_id,amount_trx,status,destination_address,admin_note,created_at,updated_at` +
      `&order=created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const withdrawals = await withdrawalsResponse.json();

    if (!withdrawalsResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load withdrawals",
        error: withdrawals
      });
    }

    return res.status(200).json({
      ok: true,
      withdrawals: withdrawals || []
    });

  } catch (error) {
    console.error("Get withdrawals error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}


async function processWithdrawal(req, res) {
  try {
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

    const {
      telegram_chat_id,
      withdrawal_id,
      action,
      admin_note
    } = req.body || {};

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "Admin Telegram chat ID is required"
      });
    }

    if (!withdrawal_id) {
      return res.status(400).json({
        ok: false,
        message: "Withdrawal ID is required"
      });
    }

    if (!["approve", "reject"].includes(
      String(action || "").toLowerCase()
    )) {
      return res.status(400).json({
        ok: false,
        message: "Action must be approve or reject"
      });
    }

    // Check admin
    const adminResponse = await fetch(
      `${supabaseUrl}/rest/v1/bot_users` +
      `?telegram_chat_id=eq.${encodeURIComponent(telegram_chat_id)}` +
      `&select=id,telegram_chat_id,is_admin` +
      `&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const adminData = await adminResponse.json();

    if (!adminResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not verify admin",
        error: adminData
      });
    }

    const admin = adminData?.[0];

    if (!admin || admin.is_admin !== true) {
      return res.status(403).json({
        ok: false,
        message: "Admin access required"
      });
    }

    // Process withdrawal using Supabase RPC
    const rpcResponse = await fetch(
      `${supabaseUrl}/rest/v1/rpc/process_withdrawal`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_withdrawal_id: Number(withdrawal_id),
          p_action: String(action).toLowerCase(),
          p_admin_note: admin_note || null
        })
      }
    );

    const rpcData = await rpcResponse.json();

    if (!rpcResponse.ok) {
      return res.status(400).json({
        ok: false,
        message:
          rpcData?.message ||
          rpcData?.hint ||
          "Could not process withdrawal",
        error: rpcData
      });
    }

    // Load withdrawal information for notification
    try {
      const withdrawalResponse = await fetch(
        `${supabaseUrl}/rest/v1/withdrawals` +
        `?id=eq.${Number(withdrawal_id)}` +
        `&select=id,telegram_chat_id,amount_trx,status,destination_address` +
        `&limit=1`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`
          }
        }
      );

      const withdrawalData =
        await withdrawalResponse.json();

      const withdrawal = withdrawalData?.[0];

      if (withdrawal) {
        let title = "";
        let message = "";
        let status = "";

        if (String(action).toLowerCase() === "approve") {
          title = "Withdrawal Approved";
          message =
            `${withdrawal.amount_trx} TRX withdrawal has been approved by admin.`;
          status = "approved";
        } else {
          title = "Withdrawal Rejected";
          message =
            `${withdrawal.amount_trx} TRX withdrawal was rejected and the amount has been returned to your wallet.`;
          status = "rejected";
        }

        await fetch(
          `${supabaseUrl}/rest/v1/notifications`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal"
            },
            body: JSON.stringify({
              telegram_chat_id:
                withdrawal.telegram_chat_id,
              type: "withdraw",
              title,
              message,
              status,
              amount_trx:
                withdrawal.amount_trx,
              metadata: {
                withdrawal_id:
                  withdrawal.id,
                destination_address:
                  withdrawal.destination_address,
                admin_note:
                  admin_note || null
              },
              is_read: false
            })
          }
        );
      }

    } catch (notificationError) {
      console.error(
        "Withdrawal result notification error:",
        notificationError
      );
    }

    return res.status(200).json({
      ok: true,
      message:
        String(action).toLowerCase() === "approve"
          ? "Withdrawal approved successfully"
          : "Withdrawal rejected successfully",
      withdrawal: rpcData
    });

  } catch (error) {
    console.error(
      "Process withdrawal error:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

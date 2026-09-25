export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

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
      title,
      message,
      image_url,
      starts_at,
      ends_at,
      active
    } = req.body || {};

    if (!telegram_chat_id) {
      return res.status(400).json({
        ok: false,
        message: "Telegram chat ID is required"
      });
    }

    // Check admin
    const adminUrl =
      `${supabaseUrl}/rest/v1/bot_users` +
      `?telegram_chat_id=eq.${encodeURIComponent(telegram_chat_id)}` +
      `&select=id,telegram_chat_id,is_admin` +
      `&limit=1`;

    const adminResponse = await fetch(adminUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

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

    if (!title || !message || !starts_at) {
      return res.status(400).json({
        ok: false,
        message: "Title, message and start time are required"
      });
    }

    const announcement = {
      title,
      message,
      image_url: image_url || null,
      starts_at,
      ends_at: ends_at || null,
      active: active === true
    };

    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/global_announcements`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify(announcement)
      }
    );

    const insertData = await insertResponse.json();

    if (!insertResponse.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not create announcement",
        error: insertData
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Announcement created successfully",
      announcement: insertData?.[0] || null
    });

  } catch (error) {
    console.error("Admin announcement error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

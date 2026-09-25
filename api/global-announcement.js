export default async function handler(req, res) {
  if (req.method !== "GET") {
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

    const now = new Date().toISOString();

    const url =
      `${supabaseUrl}/rest/v1/global_announcements` +
      `?active=eq.true` +
      `&starts_at=lte.${encodeURIComponent(now)}` +
      `&or=(ends_at.is.null,ends_at.gt.${encodeURIComponent(now)})` +
      `&select=id,title,message,image_url,starts_at,ends_at` +
      `&order=id.desc` +
      `&limit=1`;

    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load announcement",
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      announcement: data?.[0] || null
    });

  } catch (error) {
    console.error("Global announcement error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

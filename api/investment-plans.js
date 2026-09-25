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

    const response = await fetch(
      `${supabaseUrl}/rest/v1/investment_plans?active=eq.true&select=id,name,amount_trx,daily_profit_trx,duration_days&order=amount_trx.asc`,
      {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        ok: false,
        message: "Could not load investment plans",
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      plans: data || []
    });

  } catch (error) {
    console.error("Investment plans API error:", error);

    return res.status(500).json({
      ok: false,
      message: "Server error"
    });
  }
}

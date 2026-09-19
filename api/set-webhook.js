export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const webhookUrl = "https://mydailytrxbot.vercel.app/api/telegram";

  if (!token) {
    return res.status(500).json({ ok: false, error: "Token not configured" });
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
    );

    const result = await response.json();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Webhook setup failed"
    });
  }
}

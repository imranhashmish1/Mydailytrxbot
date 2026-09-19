export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      ok: true,
      message: "Telegram API is running"
    });
  }

  try {
    const update = req.body;

    console.log("Telegram update:", update);

    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
}

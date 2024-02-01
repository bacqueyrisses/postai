export const WEBHOOK_URL =
  process.env.VERCEL_ENV === "development"
    ? `${process.env.NGROK_URL}/api/webhook`
    : `${process.env.NEXT_PUBLIC_URL}/api/webhook`;

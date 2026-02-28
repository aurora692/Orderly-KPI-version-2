import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/dashboard-service";
import { buildWeeklySummaryMessage } from "@/lib/telegram";

export async function GET() {
  const data = await getDashboardData();
  const text = buildWeeklySummaryMessage(data);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID", preview: text }, { status: 400 });
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!response.ok) {
    const errorPayload = await response.text();
    return NextResponse.json({ ok: false, error: errorPayload }, { status: 502 });
  }

  return NextResponse.json({ ok: true, preview: text });
}

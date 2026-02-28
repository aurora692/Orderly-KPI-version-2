import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("dashboard-data");
  return NextResponse.json({ ok: true, message: "Dashboard cache refresh triggered." });
}

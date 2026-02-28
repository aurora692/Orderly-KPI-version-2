import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/dashboard-service";

export async function GET() {
  const data = await getDashboardData();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

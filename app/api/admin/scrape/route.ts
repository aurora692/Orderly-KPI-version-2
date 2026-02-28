import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return true;
  return request.headers.get("x-admin-password") === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    prefill: {
      date: new Date().toISOString().slice(0, 10),
      source: "auto"
    }
  });
}

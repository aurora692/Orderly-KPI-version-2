import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Orderly Dashboard"'
    }
  });
}

export function middleware(request: NextRequest) {
  const enabled = process.env.DASHBOARD_BASIC_AUTH_ENABLED === "true";
  const expectedUser = process.env.DASHBOARD_BASIC_AUTH_USER;
  const expectedPass = process.env.DASHBOARD_BASIC_AUTH_PASSWORD;

  if (!enabled || !expectedUser || !expectedPass) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return unauthorized();
  }

  const decoded = Buffer.from(header.split(" ")[1], "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

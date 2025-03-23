import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userCookie = request.cookies.get("user")?.value;

  if (
    (pathname.startsWith("/worker") || pathname.startsWith("/supervisor")) &&
    !userCookie
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userCookie) {
    let user: { role: string };
    try {
      user = JSON.parse(decodeURIComponent(userCookie));
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const role = user.role;

    if (pathname === "/") {
      if (role === "worker")
        return NextResponse.redirect(new URL("/worker", request.url));
      if (role === "supervisor")
        return NextResponse.redirect(new URL("/supervisor", request.url));
    }

    if (pathname.startsWith("/supervisor") && role === "worker") {
      return NextResponse.redirect(new URL("/worker", request.url));
    }

    if (pathname.startsWith("/worker") && role === "supervisor") {
      return NextResponse.redirect(new URL("/supervisor", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/worker", "/dashboard", "/supervisor"],
};

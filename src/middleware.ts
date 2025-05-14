import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  // Skip middleware for static files or API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "/unauthorized" || pathname==='/setup-profile') {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to home page
  if (!token) {
    return NextResponse.redirect(new URL("/", origin));
  }
  const roleId = request.cookies.get("role_id")?.value;
  if (pathname.startsWith(`/${role}`) && !roleId) {
    return NextResponse.redirect(new URL("/setup-profile", origin));
  }

  // If user tries to access another role's route, redirect to unauthorized
  if (pathname.startsWith("/farmer") && role !== "farmer") {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  if (pathname.startsWith("/retailer") && role !== "retailer") {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  if (pathname.startsWith("/consumer") && role !== "consumer") {
    return NextResponse.redirect(new URL("/unauthorized", origin));
  }

  return NextResponse.next();
}

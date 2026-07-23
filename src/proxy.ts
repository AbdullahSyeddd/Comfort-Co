import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin routes: only authenticated users with role "admin" may pass.
  // Everyone else (including unauthenticated visitors) is bounced straight to "/".
  if (pathname.startsWith("/admin")) {
    if (!req.auth?.user || req.auth.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return;
  }

  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*", "/orders/:path*", "/wishlist/:path*", "/checkout"],
};

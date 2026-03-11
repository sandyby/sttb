import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!req.nextauth.token;

    // Protect admin routes (but allow /admin/login)
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
      const userRole = req.nextauth.token?.role as string | undefined;

      if (userRole?.toLowerCase() !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // Redirect authenticated users away from login page
    if (pathname === "/admin/login" && isAuthenticated) {
      const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/admin/dashboard";
      return NextResponse.redirect(new URL(callbackUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        // Require token for admin routes except login
        if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
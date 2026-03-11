import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;

  // const isProtectedAdminPath =
  //   pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  // // const token = request.cookies.get("admin-token")?.value; // or your auth method

  // if (isProtectedAdminPath) {
  //   const redirectToLoginUrl = new URL("/admin/login", request.url);
  //   redirectToLoginUrl.searchParams.set("from", request.nextUrl.pathname);
  //   // return NextResponse.redirect(redirectToLoginUrl);
  //   // return NextResponse.redirect(new URL("/admin/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

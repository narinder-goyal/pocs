import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
export async function proxy(req: NextRequest) {

  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const isFirstTimeLoggedIn = (token?.user as any)?.is_first_time_logged_in;

  if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    if (isFirstTimeLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/intract", req.url));
    }
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isFirstTimeLoggedIn && !pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && !isFirstTimeLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/intract", req.url));
  }
}

export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    "/intract/:path*",
    "/dashboard/:path*",
  ],
};


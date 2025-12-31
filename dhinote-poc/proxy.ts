import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
export async function proxy(req: NextRequest) {

  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const isFirstTimeLoggedIn = (token?.user as any)?.is_first_time_logged_in;

  console.log("path name",pathname)
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && !isFirstTimeLoggedIn && !pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } 
  
  if (token && isFirstTimeLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/intract", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/intract/:path*"],
};


import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function proxy(req: NextRequest) {
//   console.log("hi")
//   const { pathname } = req.nextUrl;
//   const accessToken = req.cookies.get('accessToken')?.value;
//   console.log("accessToken", accessToken)
//   if (pathname.includes('/dashboard') && !accessToken) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   if (
//     accessToken &&
//     (pathname === '/' ||
//       pathname.startsWith('/login') ||
//       pathname.startsWith('/signup'))
//   ) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/dashboard';
//     return NextResponse.redirect(url);
//   }


//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/login', '/signup', '/'],
// };


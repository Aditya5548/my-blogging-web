import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // DELETE COOKIE (proper way)
  res.cookies.set("token", "", {
    expires: new Date(0),
    path: "/",
  });

  res.headers.set("x-middleware-test", "running");

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|static|_next/image|favicon.ico).*)"],
};

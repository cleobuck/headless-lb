import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(
    "-------------------------------------------------------------------------------------------------------"
  );
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Exclude the favicon
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Continue to the catch-all route for other paths
  return NextResponse.rewrite(new URL(`/${pathname}`, req.url));
}

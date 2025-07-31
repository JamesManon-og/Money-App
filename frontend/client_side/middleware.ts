// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL! || "http://localhost:8080";
const PROFILE_ENDPOINT = `/api/auth/profile`;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch(`${BASE_URL}${PROFILE_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const user = await response.json();

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - login (public route)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)",
  ],
};

import { NextResponse } from "next/server";

/* ============================================================
   Domain redirect — devibi.co.uk  →  devibi.com
   Any request whose Host is the UK domain is sent to the primary
   domain with a 301 (permanent), preserving the path and query.
   devibi.com (and localhost) pass straight through, untouched.
   ============================================================ */

const REDIRECT_HOSTS = new Set(["devibi.co.uk", "www.devibi.co.uk"]);
const PRIMARY_HOST = "devibi.com";

export function middleware(request) {
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  if (REDIRECT_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = PRIMARY_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next.js internal assets.
  matcher: ["/((?!_next/).*)"],
};

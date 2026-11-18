import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Preview domains (*.vercel.app) must never be indexed: only the production
 * domain (blexmann-avocats.fr, declared in canonical URLs) is indexable.
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

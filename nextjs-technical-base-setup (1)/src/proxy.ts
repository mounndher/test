import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin-cookie";

/**
 * Preview domains (*.vercel.app) must never be indexed: only the production
 * domain (blexmann-avocats.fr, declared in canonical URLs) is indexable.
 *
 * Admin guard (premier filtre) : le proxy s'exécute en environnement edge, sans accès
 * à la base — il vérifie uniquement la PRÉSENCE du cookie de session. La vérification
 * complète (empreinte en base, expiration, révocation) est faite par le layout serveur
 * de /admin, qui redirige aussi en cas de cookie invalide.
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  const { pathname } = request.nextUrl;
  const hasSessionCookie = request.cookies.has(ADMIN_COOKIE);

  if (pathname.startsWith("/api/admin") && !hasSessionCookie) {
    return NextResponse.json({ ok: false, error: "Authentification requise." }, { status: 401 });
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

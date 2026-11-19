/**
 * Stateless healthcheck — the site is fully static and uses no database.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, mode: "static" });
}

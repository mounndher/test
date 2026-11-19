import { sql } from "drizzle-orm";
import { db } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, mode: "database" });
  } catch (error) {
    return Response.json(
      { ok: false, mode: "static", error: error instanceof Error ? error.message : "db_error" },
      { status: 500 },
    );
  }
}
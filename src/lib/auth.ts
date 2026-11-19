import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { admins, sessions } from "@/db/schema";
import { ADMIN_COOKIE } from "@/lib/admin-cookie";

/** Durée de vie des sessions d'administration : 12 heures. */
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;

export type AdminSession = {
  adminId: number;
  email: string;
  name: string | null;
};

/** Le jeton brut n'est jamais stocké : uniquement son empreinte SHA-256. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(adminId: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const headerList = await headers();
  await db.insert(sessions).values({
    adminId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
    ip: headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: headerList.get("user-agent")?.slice(0, 300) ?? null,
  });
  return token;
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Vérification complète : empreinte connue en base, session non révoquée et non expirée.
 * Le proxy ne contrôle que la présence du cookie (environnement edge, pas d'accès DB).
 */
export async function readSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  const rows = await db
    .select({
      adminId: admins.id,
      email: admins.email,
      name: admins.name,
      expiresAt: sessions.expiresAt,
      revokedAt: sessions.revokedAt,
    })
    .from(sessions)
    .innerJoin(admins, eq(sessions.adminId, admins.id))
    .where(eq(sessions.tokenHash, hashToken(token)))
    .limit(1);

  const row = rows[0];
  if (!row || row.revokedAt || row.expiresAt.getTime() <= Date.now()) return null;
  return { adminId: row.adminId, email: row.email, name: row.name };
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token) {
    await db
      .update(sessions)
      .set({ revokedAt: new Date() })
      .where(eq(sessions.tokenHash, hashToken(token)));
  }
  jar.delete(ADMIN_COOKIE);
}

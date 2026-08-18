import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { Role, Session } from "./types";
const cookieName = "interviewdesk-session";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-change-me-change-before-production");
export async function getSession(): Promise<Session | null> { const token = (await cookies()).get(cookieName)?.value; if (!token) return null; try { const { payload } = await jwtVerify(token, secret()); if ((payload.role !== "admin" && payload.role !== "student") || typeof payload.name !== "string") return null; return { role: payload.role as Role, name: payload.name, userId: typeof payload.userId === "number" ? payload.userId : undefined }; } catch { return null; } }
export async function createSession(session: Session) { const token = await new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret()); (await cookies()).set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 }); }
export async function clearSession() { (await cookies()).delete(cookieName); }
export async function isAuthenticated() { return !!(await getSession()); }

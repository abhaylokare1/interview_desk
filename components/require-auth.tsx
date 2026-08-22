import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { Role, Session } from "@/lib/types";
import { Nav } from "./nav";
export default async function RequireAuth({ children, session: providedSession }: { children: React.ReactNode; role?: Role; session?: Session | null }) { const session = providedSession ?? await getSession(); if (!session || session.role !== "admin") redirect("/login"); return <><Nav session={session} /><main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">{children}</main></>; }

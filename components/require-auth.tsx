import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { Role } from "@/lib/types";
import { Nav } from "./nav";
export default async function RequireAuth({ children, role }: { children: React.ReactNode; role?: Role }) { const session = await getSession(); if (!session) redirect("/login"); if (role && session.role !== role) redirect("/dashboard"); return <><Nav session={session} /><main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">{children}</main></>; }

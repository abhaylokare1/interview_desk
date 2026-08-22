"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/app/actions";
import type { Session } from "@/lib/types";
import { AppLogo } from "@/components/app-logo";

const link = "rounded-xl border border-white/10 bg-white/[.025] px-3.5 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-violet-500/12 hover:text-white";

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-slate-100 md:hidden">
    <span className="flex w-4 flex-col gap-1.5"><span className={`h-0.5 rounded-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`h-0.5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} /><span className={`h-0.5 rounded-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} /></span>
  </button>;
}

export function Nav({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const admin = session.role === "admin";
  const close = () => setOpen(false);

  return <header className="sticky top-0 z-20 border-b border-white/8 bg-[#090b14]/80 backdrop-blur-xl"><div className="mx-auto max-w-7xl px-4 py-3"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><MenuButton open={open} onClick={() => setOpen(value => !value)} /><Link href="/dashboard" onClick={close} className="app-title flex items-center gap-2.5 rounded-xl text-lg font-bold text-white"><AppLogo />InterviewDesk</Link></div><nav className="hidden items-center gap-2 md:flex"><Link className={link} href="/dashboard">Dashboard</Link><Link className={link} href="/interviews/new">{admin ? "Add Interview" : "Schedule Interview"}</Link><Link className={link} href="/interviews">{admin ? "All Interviews" : "My Interviews"}</Link>{admin && <a className={link} href="/api/export">Export Excel</a>}<form action={logout}><button className="rounded-xl border border-red-400/20 bg-red-500/[.035] px-3.5 py-2 text-sm font-semibold text-red-200 hover:-translate-y-0.5 hover:bg-red-500/10">Logout</button></form></nav></div>{open && <nav className="mt-3 grid gap-2 border-t border-white/8 pt-3 md:hidden"><Link onClick={close} className={link} href="/dashboard">Dashboard</Link><Link onClick={close} className={link} href="/interviews/new">{admin ? "Add Interview" : "Schedule Interview"}</Link><Link onClick={close} className={link} href="/interviews">{admin ? "All Interviews" : "My Interviews"}</Link>{admin && <a className={link} href="/api/export" onClick={close}>Export Excel</a>}<form action={logout}><button className="w-full rounded-xl border border-red-400/20 bg-red-500/[.035] px-3.5 py-2 text-left text-sm font-semibold text-red-200 hover:bg-red-500/10">Logout</button></form></nav>}</div></header>;
}

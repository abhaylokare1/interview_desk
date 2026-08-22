"use client";

import Link from "next/link";
import { useState } from "react";
import { AppLogo } from "@/components/app-logo";

const button = "rounded-xl border border-white/10 bg-white/[.025] px-3.5 py-2 text-sm font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-violet-500/12 hover:text-white";

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-slate-100 md:hidden">
    <span className="flex w-4 flex-col gap-1.5"><span className={`h-0.5 rounded-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} /><span className={`h-0.5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} /><span className={`h-0.5 rounded-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} /></span>
  </button>;
}

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="surface mb-8 rounded-2xl p-2.5 backdrop-blur-xl"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><MenuButton open={open} onClick={() => setOpen(value => !value)} /><Link href="/" onClick={close} className="app-title flex items-center gap-2.5 rounded-xl font-bold text-white"><AppLogo />InterviewDesk</Link></div><nav className="hidden gap-2 md:flex"><Link className={button} href="/schedule">Schedule Interview</Link><Link className={button} href="/availability">Check Slots</Link><Link className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:brightness-110" href="/login">Admin Login</Link></nav></div>{open && <nav className="mt-3 grid gap-2 border-t border-white/8 pt-3 md:hidden"><Link onClick={close} className={button} href="/schedule">Schedule Interview</Link><Link onClick={close} className={button} href="/availability">Check Slots</Link><Link onClick={close} className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-3.5 py-2 text-sm font-semibold text-white" href="/login">Admin Login</Link></nav>}</header>;
}

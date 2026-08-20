import Link from "next/link";

const button = "rounded-xl border border-white/10 bg-white/[.025] px-3.5 py-2 text-sm font-semibold text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-violet-500/12 hover:text-white";

export function PublicNav() {
  return <header className="surface mb-8 rounded-2xl p-2.5 backdrop-blur-xl"><div className="flex flex-wrap items-center justify-between gap-3"><Link href="/" className="flex items-center gap-2.5 rounded-xl px-2 py-1 font-bold tracking-tight text-white"><span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 text-sm shadow-lg shadow-violet-950/40">I</span>InterviewDesk</Link><nav className="flex flex-wrap gap-2"><Link className={button} href="/schedule">Schedule Interview</Link><Link className={button} href="/availability">Check Slots</Link><Link className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:brightness-110" href="/login">Admin Login</Link></nav></div></header>;
}

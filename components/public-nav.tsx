import Link from "next/link";

const button = "rounded-xl border border-white/12 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white";

export function PublicNav() {
  return <header className="mb-7 rounded-2xl border border-white/10 bg-[#111522]/80 p-3 shadow-xl shadow-black/15 backdrop-blur"><div className="flex flex-wrap items-center justify-between gap-3"><Link href="/" className="flex items-center gap-2 font-bold text-white"><span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-sm">I</span>InterviewDesk</Link><nav className="flex flex-wrap gap-2"><Link className={button} href="/schedule">Schedule Interview</Link><Link className={button} href="/availability">View Schedules</Link><Link className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5" href="/login">Admin Login</Link></nav></div></header>;
}

import RequireAuth from "@/components/require-auth";
import { getCounts, getToday, getUpcoming } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardInterviewList } from "@/components/dashboard-interview-list";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/login");
  const [counts, today, upcoming] = await Promise.all([getCounts(session), getToday(session), getUpcoming(session)]);
  const cards = [
    { label: "Today's Interviews", value: counts.today, color: "#a78bfa" },
    { label: "Upcoming Interviews", value: counts.upcoming, color: "#38bdf8" },
    { label: "Completed Interviews", value: counts.completed, color: "#34d399" },
    { label: "Total Interviews", value: counts.total, color: "#818cf8" },
  ];

  return <RequireAuth session={session}>
    <div className="mb-6 sm:mb-7"><p className="eyebrow">INTERVIEW MANAGEMENT</p></div>
    <section className="mb-9 grid max-w-5xl grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:grid-cols-2" aria-label="Interview summary">
      {cards.map(card => <article key={card.label} className="surface relative min-h-36 overflow-hidden rounded-2xl p-4 sm:min-h-40 sm:p-5">
        <div className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: card.color }} />
        <div className="flex items-start justify-between gap-3 pl-1">
          <p className="text-xs font-semibold uppercase tracking-[.09em] text-slate-400 sm:text-sm">{card.label}</p>
          <span className="mt-1.5 size-2 rounded-full" style={{ backgroundColor: card.color, boxShadow: `0 0 14px ${card.color}` }} />
        </div>
        <div className="mt-6 pl-1"><p className="text-4xl font-bold tracking-[-.055em] text-white sm:text-5xl">{card.value}</p><p className="mt-1 text-xs text-slate-500">Interview records</p></div>
      </article>)}
    </section>
    <DashboardInterviewList title="Today's Interviews" interviews={today} empty="No interviews scheduled today." />
    <DashboardInterviewList title="Upcoming Interviews" interviews={upcoming} empty="No upcoming interviews." />
  </RequireAuth>;
}

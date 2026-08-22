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
    { label: "Today's Interviews", value: counts.today },
    { label: "Upcoming Interviews", value: counts.upcoming },
    { label: "Completed Interviews", value: counts.completed },
    { label: "Total Interviews", value: counts.total },
  ];

  return <RequireAuth session={session}>
    <div className="mb-6 sm:mb-7"><p className="eyebrow">INTERVIEW MANAGEMENT</p></div>
    <section className="mb-9 grid max-w-5xl grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:grid-cols-2" aria-label="Interview summary">
      {cards.map(card => <article key={card.label} className="surface relative min-h-32 overflow-hidden rounded-2xl p-4 sm:min-h-36 sm:p-5">
        <div className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-white/[.025] blur-2xl" />
        <div className="relative flex h-full flex-col justify-between">
          <p className="max-w-32 text-xs font-semibold leading-5 text-slate-400 sm:max-w-none sm:text-sm">{card.label}</p>
          <div className="mt-5"><p className="text-4xl font-bold tracking-[-.055em] text-white sm:text-5xl">{card.value}</p><div className="mt-3 h-px w-8 bg-white/15" /></div>
        </div>
      </article>)}
    </section>
    <DashboardInterviewList title="Today's Interviews" interviews={today} empty="No interviews scheduled today." />
    <DashboardInterviewList title="Upcoming Interviews" interviews={upcoming} empty="No upcoming interviews." />
  </RequireAuth>;
}

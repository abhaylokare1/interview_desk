"use client";

import Link from "next/link";
import { deleteInterview } from "@/app/actions";
import type { Interview } from "@/lib/types";
import { showTime } from "@/lib/format";

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  return <div className="min-w-0 rounded-xl border border-white/[.06] bg-black/[.12] px-3 py-2.5"><p className="text-[11px] font-semibold uppercase tracking-[.1em] text-slate-500">{label}</p><p className="mt-1 truncate text-sm font-medium text-slate-200" title={value || "—"}>{value || "—"}</p></div>;
}

export function InterviewTable({ interviews, onDeleted }: { interviews: Interview[]; onDeleted?: () => void }) {
  async function remove(id: number) {
    if (!window.confirm("Delete this interview? This cannot be undone.")) return;
    const result = await deleteInterview(id);
    if (result.success) {
      alert(result.success);
      onDeleted?.();
    } else alert(result.error);
  }

  if (!interviews.length) return <div className="surface rounded-2xl p-8 text-center text-sm text-slate-500">No interviews found.</div>;

  return <div className="grid gap-4">
    {interviews.map(interview => <article key={interview.id} className="surface overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[.07] px-4 py-4 sm:px-5">
        <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[.12em] text-violet-300">Interview record</p><h2 className="mt-1 truncate text-lg font-bold tracking-tight text-white">{interview.studentName}</h2></div>
        <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-200">{interview.status}</span>{interview.contactNumber ? <a href={`tel:${interview.contactNumber.replace(/[^\d+]/g, "")}`} className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/20">Call</a> : null}<Link href={`/interviews/${interview.id}/edit`} className="rounded-lg border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-200 transition hover:bg-violet-500/20">Edit</Link><button onClick={() => remove(interview.id)} className="rounded-lg border border-red-400/20 bg-red-500/[.04] px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-500/10">Delete</button></div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-4 xl:grid-cols-5">
        <Detail label="Experience" value={interview.yearsOfExperience ? `${interview.yearsOfExperience} Years` : null} />
        <Detail label="Experience Type" value={interview.experienceType} />
        <Detail label="Date" value={interview.interviewDate} />
        <Detail label="Time" value={showTime(interview)} />
        <Detail label="Technology" value={interview.technology} />
        <Detail label="Company" value={interview.companyName} />
        <Detail label="Interview Type" value={interview.interviewType} />
        <Detail label="Contact Number" value={interview.contactNumber} />
        <Detail label="Interview Round" value={interview.interviewRound} />
      </div>
    </article>)}
  </div>;
}

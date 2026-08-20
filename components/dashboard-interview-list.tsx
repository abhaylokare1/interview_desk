"use client";

import { useState, useTransition } from "react";
import { updateInterviewStatus } from "@/app/actions";
import { STATUSES, type Interview } from "@/lib/types";
import { showInterviewDate, showTime } from "@/lib/format";
import { useRouter } from "next/navigation";

export function DashboardInterviewList({ title, interviews, empty }: { title: string; interviews: Interview[]; empty: string }) {
  const router = useRouter();
  const [items, setItems] = useState(interviews);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [, startTransition] = useTransition();

  function changeStatus(id: number, status: string) {
    const previous = items;
    setItems(current => current.map(item => item.id === id ? { ...item, status: status as Interview["status"] } : item));
    setSavingId(id);
    setNotice("");
    startTransition(async () => {
      const result = await updateInterviewStatus(id, status);
      if (result.error) {
        setItems(previous);
        setNotice(result.error);
      } else {
        setNotice("Status saved automatically.");
        router.refresh();
      }
      setSavingId(null);
    });
  }

  return <section className="mb-10"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-bold tracking-tight text-white">{title}</h2>{notice && <p role="status" className="text-sm text-emerald-300">{notice}</p>}</div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(i => <article key={i.id} className="surface rounded-2xl p-5 transition hover:-translate-y-0.5"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{i.studentName}</h3><span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-200">{i.status}</span></div><p className="mt-4 text-sm font-semibold text-sky-300">{showInterviewDate(i.interviewDate)}</p><p className="mt-1 font-medium text-violet-300">{showTime(i)}</p><p className="mt-2 text-sm text-slate-300">{i.technology || "—"} · {i.companyName || "—"}</p><div className="mt-3 flex items-center justify-between gap-3"><p className="text-sm text-slate-500">{i.interviewType} · {i.yearsOfExperience ? `${i.yearsOfExperience} Years` : "Experience not set"}</p>{i.contactNumber ? <a href={`tel:${i.contactNumber.replace(/[^\d+]/g, "")}`} className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/20">Call</a> : <span className="text-xs text-slate-600">No contact</span>}</div><label className="mt-4 block text-xs font-semibold uppercase tracking-[.1em] text-slate-500">Status<select value={i.status} disabled={savingId === i.id} onChange={event => changeStatus(i.id, event.target.value)} className="mt-1.5 py-2 text-sm normal-case tracking-normal disabled:opacity-60">{STATUSES.map(status => <option key={status}>{status}</option>)}</select></label></article>)}{!items.length && <p className="surface rounded-2xl p-5 text-sm text-slate-500">{empty}</p>}</div></section>;
}

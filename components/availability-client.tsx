"use client";

import { useEffect, useState } from "react";

type Slot = { fromTime: string; toTime: string };
const today = new Date().toISOString().slice(0, 10);
const time = (value: string) => { const [hours, minutes] = value.split(":").map(Number); return `${((hours + 11) % 12) + 1}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`; };

export default function AvailabilityClient() {
  const [date, setDate] = useState(today);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { let active = true; setLoading(true); fetch(`/api/availability?date=${date}`).then(response => response.ok ? response.json() : []).then(data => { if (active) setSlots(data); }).catch(() => { if (active) setSlots([]); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [date]);

  return <section className="rounded-2xl border border-white/10 bg-[#111522]/85 p-5 shadow-xl shadow-black/15"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-xl font-bold text-white">Booked time slots</h2><p className="mt-1 text-sm text-slate-400">Only dates and times are shared—student details stay private.</p></div><label className="w-full max-w-xs text-sm font-medium text-slate-300">Choose date<input className="mt-1.5" type="date" value={date} min={today} onChange={event => setDate(event.target.value)} /></label></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{loading ? <p className="text-sm text-slate-400">Checking availability…</p> : slots.length ? slots.map((slot, index) => <article key={`${slot.fromTime}-${index}`} className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-amber-200">Booked</p><p className="mt-1 text-lg font-bold text-white">{time(slot.fromTime)} – {time(slot.toTime)}</p></article>) : <p className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">No booked interviews for this date. Choose a suitable slot.</p>}</div></section>;
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { InterviewTable } from "./interview-table";
import type { Interview } from "@/lib/types";
import { STATUSES } from "@/lib/types";

const dateOptions = ["All", "Today", "Yesterday", "Tomorrow", "Date"];

export default function InterviewsClient() {
  const [items, setItems] = useState<Interview[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 180);
    return () => window.clearTimeout(timer);
  }, [search]);

  const load = useCallback(async (signal?: AbortSignal) => {
    setRefreshing(true);
    const params = new URLSearchParams({ search: debouncedSearch, status, dateFilter, date });
    try {
      const response = await fetch(`/api/interviews?${params}`, { signal, cache: "no-store" });
      if (response.ok) setItems(await response.json());
    } catch (error) {
      if ((error as Error).name !== "AbortError") throw error;
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [date, dateFilter, debouncedSearch, status]);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return <>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><p className="mb-2 text-sm font-semibold text-violet-300">RECORDS</p><h1 className="text-3xl font-bold tracking-tight text-white">All Interviews</h1><p className="mt-1 text-sm text-slate-400">Search, sort, and manage your interview records.</p></div>
      <a href="/api/export" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50">Export Excel</a>
    </div>
    <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_170px_170px_auto]">
      <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name, company, technology or contact…" aria-label="Search interviews" />
      <select value={status} onChange={event => setStatus(event.target.value)} aria-label="Filter by status"><option>All</option>{STATUSES.map(item => <option key={item}>{item}</option>)}</select>
      <select value={dateFilter} onChange={event => { setDateFilter(event.target.value); if (event.target.value !== "Date") setDate(""); }} aria-label="Filter by date"><option value="All">All dates</option>{dateOptions.slice(1).map(item => <option key={item} value={item}>{item === "Date" ? "Choose date" : item}</option>)}</select>
      {dateFilter === "Date" && <input type="date" value={date} onChange={event => setDate(event.target.value)} aria-label="Choose interview date" />}
    </div>
    {refreshing && !loading && <p className="mb-3 text-sm text-violet-300">Updating results…</p>}
    {loading ? <p className="py-8 text-center text-sm text-slate-500">Loading interviews…</p> : <InterviewTable interviews={items} onDeleted={() => { void load(); }} />}
  </>;
}

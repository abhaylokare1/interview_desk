"use client";

import { useRef, useState } from "react";
import { checkConflict, persistInterview, scheduleInterview } from "@/app/actions";
import { EXPERIENCE_TYPES, INTERVIEW_TYPES, STATUSES, type Interview } from "@/lib/types";
import { useRouter } from "next/navigation";

const field = "block text-sm font-medium text-slate-300";

function Select({ label, name, values, value }: { label: string; name: string; values: readonly string[]; value: string }) {
  return <label className={field}>{label}<select className="mt-1.5" name={name} defaultValue={value}>{values.map(item => <option key={item}>{item}</option>)}</select></label>;
}

function formatDate(value: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value: string) {
  if (!value) return "—";
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${((hours + 11) % 12) + 1}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function whatsappMessage(formData: FormData) {
  const value = (key: string) => String(formData.get(key) || "").trim() || "—";
  return `New Interview Scheduled\n\nName - ${value("studentName")}\nDate - ${formatDate(value("interviewDate"))}\nTime - ${formatTime(value("fromTime"))} - ${formatTime(value("toTime"))}\nTechnology - ${value("technology")}\nCompany Name - ${value("companyName")}\nContact No - ${value("contactNumber")}`;
}

export default function InterviewForm({ interview, profile, publicSchedule = false }: { interview?: Interview; profile?: { name: string; contactNumber: string | null }; publicSchedule?: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [whatsappText, setWhatsappText] = useState("");
  const [copyNotice, setCopyNotice] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const v = (key: Exclude<keyof Interview, "id">): string => String(interview?.[key] ?? "");
  const inputClass = (name: string) => `mt-1.5 ${emptyFields.includes(name) ? "border-red-500 ring-2 ring-red-500/25" : ""}`;

  async function submit(formData: FormData) {
    const missing = Array.from(formRef.current?.querySelectorAll<HTMLInputElement>("input[required]") || []).filter(input => !input.value.trim()).map(input => input.name);
    if (missing.length) {
      setEmptyFields(missing);
      setMessage("Complete the highlighted required fields.");
      const first = formRef.current?.querySelector<HTMLInputElement>(`[name="${missing[0]}"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus();
      return;
    }
    setSaving(true);
    setMessage("");
    setWhatsappUrl("");
    setWhatsappText("");
    try {
      if (!publicSchedule) {
        const conflict = await checkConflict(formData);
        if (conflict.error) { setMessage(conflict.error); return; }
      }
      const result = publicSchedule ? await scheduleInterview(formData) : await persistInterview(formData);
      if (result.error) { setMessage(result.error); return; }
      if (publicSchedule) {
        const text = whatsappMessage(formData);
        setWhatsappText(text);
        setWhatsappUrl(`https://wa.me/?text=${encodeURIComponent(text)}`);
        setMessage("Interview scheduled successfully. Use the button below to open WhatsApp.");
        return;
      }
      router.push("/interviews");
      router.refresh();
    } catch {
      setMessage("Unable to save the interview. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function copyWhatsAppMessage() {
    try {
      await navigator.clipboard.writeText(whatsappText);
      return true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = whatsappText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    }
  }

  async function sendToWhatsApp() {
    const copied = await copyWhatsAppMessage();
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    setCopyNotice(copied ? "Details copied. Paste them into your WhatsApp group." : "WhatsApp will open with the interview details pre-filled.");
    window.setTimeout(() => setCopyNotice(""), 12000);
    if (!desktop) window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return <form ref={formRef} noValidate action={submit} onInput={event => { const target = event.target as HTMLInputElement; if (target.name && target.value.trim()) setEmptyFields(previous => previous.filter(name => name !== target.name)); }} className="rounded-2xl border border-white/10 bg-[#111522]/85 p-4 shadow-2xl shadow-black/20 sm:p-6">
    <input type="hidden" name="id" value={interview?.id ?? ""} />
    <div className="mb-6 flex items-center gap-3 border-b border-white/8 pb-4"><span className="grid size-9 place-items-center rounded-xl bg-violet-500/15 text-violet-300">✦</span><div><h2 className="font-semibold text-white">Interview details</h2><p className="text-xs text-slate-500">Fields marked * are required</p></div></div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <label className={field}>Student Name *<input className={inputClass("studentName")} name="studentName" defaultValue={interview ? v("studentName") : profile?.name || ""} required autoFocus /></label>
      <label className={field}>Years of Experience *<input className={inputClass("yearsOfExperience")} name="yearsOfExperience" type="number" min="0" step="0.5" defaultValue={v("yearsOfExperience")} required /></label>
      <Select label="Experience Type" name="experienceType" values={EXPERIENCE_TYPES} value={v("experienceType") || "Original"} />
      <label className={field}>Interview Date *<input className={inputClass("interviewDate")} name="interviewDate" type="date" defaultValue={v("interviewDate")} required /></label>
      <label className={field}>From Time *<input className={inputClass("fromTime")} name="fromTime" type="time" defaultValue={v("fromTime")} required /></label>
      <label className={field}>To Time *<input className={inputClass("toTime")} name="toTime" type="time" defaultValue={v("toTime")} required /></label>
      <label className={field}>Technology *<input className={inputClass("technology")} name="technology" defaultValue={v("technology")} placeholder="Java + React" required /></label>
      <label className={field}>Company Name *<input className={inputClass("companyName")} name="companyName" defaultValue={v("companyName")} required /></label>
      <Select label="Interview Type" name="interviewType" values={INTERVIEW_TYPES} value={v("interviewType") || "ChatGPT"} />
      <label className={field}>Contact Number *<input className={inputClass("contactNumber")} name="contactNumber" defaultValue={interview ? v("contactNumber") : profile?.contactNumber || ""} required /></label>
      <label className={field}>Interview Round *<input className={inputClass("interviewRound")} name="interviewRound" defaultValue={v("interviewRound")} placeholder="L1" required /></label>
      <Select label="Status" name="status" values={STATUSES} value={v("status") || "Scheduled"} />
    </div>
    {message && <p className={`mt-4 rounded-lg border p-3 text-sm ${message.includes("successfully") ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>{message}</p>}
    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row"><button type="button" onClick={() => router.back()} className="rounded-xl border border-white/12 px-5 py-2.5 font-semibold text-slate-300 hover:bg-white/5">Cancel</button>{whatsappUrl && <button type="button" onClick={() => { void sendToWhatsApp(); }} className="rounded-xl bg-[#25D366] px-5 py-2.5 text-center font-semibold text-slate-950 hover:bg-[#4be083]">Send to WhatsApp Group</button>}<button disabled={saving || !!whatsappUrl} className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-2.5 font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : publicSchedule ? "Schedule Interview" : interview ? "Update Interview" : "Save Interview"}</button></div>
    {copyNotice && <div role="status" className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-400/30 bg-[#10251d] p-4 text-center text-sm font-semibold text-emerald-200 shadow-2xl shadow-black/40">{copyNotice}</div>}
  </form>;
}

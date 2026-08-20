import InterviewForm from "@/components/interview-form";
import { PublicNav } from "@/components/public-nav";
export default function SchedulePage() { return <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10"><PublicNav /><div className="mb-8"><p className="eyebrow mb-2">STUDENT SCHEDULING</p><h1 className="text-3xl font-bold tracking-[-.04em] text-white sm:text-4xl">Schedule Interview</h1><p className="mt-2 text-[15px] text-slate-400">Add your details, choose a clear time slot, and share it when you are ready.</p></div><InterviewForm publicSchedule /></main>; }

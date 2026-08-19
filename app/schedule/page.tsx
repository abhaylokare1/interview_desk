import InterviewForm from "@/components/interview-form";
import { PublicNav } from "@/components/public-nav";
export default function SchedulePage() { return <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10"><PublicNav /><div className="mb-6"><p className="mb-2 text-sm font-semibold text-violet-300">STUDENT SCHEDULING</p><h1 className="text-3xl font-bold tracking-tight text-white">Schedule Interview</h1><p className="mt-1 text-sm text-slate-400">Submit your interview details directly.</p></div><InterviewForm publicSchedule /></main>; }

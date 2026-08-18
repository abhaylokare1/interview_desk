import RequireAuth from "@/components/require-auth";
import InterviewForm from "@/components/interview-form";
export const dynamic = "force-dynamic";
export default function NewInterview() { return <RequireAuth><div className="mb-6"><p className="mb-2 text-sm font-semibold text-violet-300">NEW SCHEDULE</p><h1 className="text-3xl font-bold tracking-tight text-white">Add Interview</h1><p className="mt-1 text-sm text-slate-400">Create an interview schedule in a few seconds.</p></div><InterviewForm /></RequireAuth>; }

import RequireAuth from "@/components/require-auth";
import InterviewForm from "@/components/interview-form";
import { getSession } from "@/lib/auth";
import { getStudent } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function NewInterview() { const session = await getSession(); const profile = session?.role === "student" && session.userId ? await getStudent(session.userId) : null; return <RequireAuth><div className="mb-6"><p className="mb-2 text-sm font-semibold text-violet-300">NEW SCHEDULE</p><h1 className="text-3xl font-bold tracking-tight text-white">{session?.role === "admin" ? "Add Interview" : "Schedule Interview"}</h1><p className="mt-1 text-sm text-slate-400">Create an interview schedule in a few seconds.</p></div><InterviewForm profile={profile || undefined} /></RequireAuth>; }

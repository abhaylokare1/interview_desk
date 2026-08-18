import { notFound } from "next/navigation";
import RequireAuth from "@/components/require-auth";
import InterviewForm from "@/components/interview-form";
import { getInterview } from "@/lib/db";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default async function EditInterview({ params }: { params: Promise<{ id: string }> }) { const session = await getSession(); if (!session) notFound(); const { id } = await params; const interview = await getInterview(Number(id), session); if (!interview) notFound(); return <RequireAuth><div className="mb-6"><p className="mb-2 text-sm font-semibold text-violet-300">UPDATE SCHEDULE</p><h1 className="text-3xl font-bold tracking-tight text-white">Edit Interview</h1><p className="mt-1 text-sm text-slate-400">Keep the interview details up to date.</p></div><InterviewForm interview={interview} /></RequireAuth>; }

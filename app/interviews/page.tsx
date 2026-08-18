import RequireAuth from "@/components/require-auth";
import InterviewsClient from "@/components/interviews-client";
export const dynamic = "force-dynamic";
export default function Interviews() { return <RequireAuth><InterviewsClient /></RequireAuth>; }

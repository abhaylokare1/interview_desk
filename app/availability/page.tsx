import AvailabilityClient from "@/components/availability-client";
import { PublicNav } from "@/components/public-nav";

export const dynamic = "force-dynamic";

export default function AvailabilityPage() { return <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10"><PublicNav /><div className="mb-6"><p className="mb-2 text-sm font-semibold text-violet-300">SCHEDULE AVAILABILITY</p><h1 className="text-3xl font-bold tracking-tight text-white">Find an open interview slot</h1><p className="mt-1 text-sm text-slate-400">Pick a date to see booked times before scheduling your interview.</p></div><AvailabilityClient /></main>; }

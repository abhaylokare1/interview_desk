import AvailabilityClient from "@/components/availability-client";
import { PublicNav } from "@/components/public-nav";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) { const { date } = await searchParams; return <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10"><PublicNav /><div className="mb-8"><p className="eyebrow mb-2">SCHEDULE AVAILABILITY</p><h1 className="text-3xl font-bold tracking-[-.04em] text-white sm:text-4xl">Find an open interview slot</h1><p className="mt-2 text-[15px] text-slate-400">Pick a date to see booked times before scheduling your interview.</p></div><AvailabilityClient initialDate={date} /></main>; }

import { NextRequest, NextResponse } from "next/server";
import { getBookedTimeSlots } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "A valid date is required." }, { status: 400 });
  return NextResponse.json(await getBookedTimeSlots(date));
}

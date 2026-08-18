import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getInterviews } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) { const session = await getSession(); if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const { searchParams } = request.nextUrl; const interviews = await getInterviews(session, searchParams.get("search") || "", searchParams.get("status") || "All", searchParams.get("dateFilter") || "All", searchParams.get("date") || ""); return NextResponse.json(interviews); }

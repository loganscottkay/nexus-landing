import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ── In-memory rate limiter ────────────────────────────────────── */
const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS = 2;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS
  );
  submissions.set(ip, timestamps);
  return timestamps.length >= MAX_SUBMISSIONS;
}

function recordSubmission(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS
  );
  timestamps.push(now);
  submissions.set(ip, timestamps);
}

// Cleanup stale entries every hour to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const keys = Array.from(submissions.keys());
  for (const ip of keys) {
    const timestamps = submissions.get(ip);
    if (!timestamps) continue;
    const valid = timestamps.filter((t) => now - t < WINDOW_MS);
    if (valid.length === 0) {
      submissions.delete(ip);
    } else {
      submissions.set(ip, valid);
    }
  }
}, 60 * 60 * 1000);

/* ── Validation helpers ────────────────────────────────────────── */
const VALID_INTERESTS = ["startup", "investor", "both"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

/* ── Server-side Supabase client ───────────────────────────────── */
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase configuration");
  }

  return createClient(url, key);
}

/* ── POST handler ──────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  // Maintenance mode check
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return NextResponse.json(
      { error: "The waitlist is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  // Get client IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit check
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You have already submitted. Please wait 24 hours before trying again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: { name?: string; email?: string; interest?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, interest } = body;

  // Validate name
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }
  const cleanName = stripHtml(name).slice(0, 200);
  if (cleanName.length === 0) {
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );
  }

  // Validate email
  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }
  const cleanEmail = stripHtml(email).toLowerCase().slice(0, 320);
  if (!EMAIL_REGEX.test(cleanEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // Validate interest
  if (!interest || typeof interest !== "string" || !VALID_INTERESTS.includes(interest)) {
    return NextResponse.json(
      { error: "Please select a valid interest." },
      { status: 400 }
    );
  }

  // Insert into Supabase
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("waitlist")
      .insert({ name: cleanName, email: cleanEmail, interest });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Record successful submission for rate limiting
    recordSubmission(ip);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not connect. Please try again." },
      { status: 500 }
    );
  }
}

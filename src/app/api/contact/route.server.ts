import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, isDbConfigured } from "@/lib/mongo";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.email("Please enter a valid email").max(120),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Message is a little short").max(4000),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields = z.flattenError(parsed.error).fieldErrors;
    if (fields.company) return NextResponse.json({ ok: true }); // bot — pretend success
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 422 });
  }

  const { company: _honeypot, ...message } = parsed.data;
  void _honeypot;
  try {
    const db = await getDb();
    const messages = db.collection("messages");

    // Light rate limit: at most 3 messages per email per hour.
    const recent = await messages.countDocuments({
      email: message.email,
      createdAt: { $gt: new Date(Date.now() - 60 * 60 * 1000) },
    });
    if (recent >= 3) {
      return NextResponse.json({ ok: false, error: "Too many messages — please try again later." }, { status: 429 });
    }

    await messages.insertOne({
      ...message,
      read: false,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
      createdAt: new Date(),
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[contact] failed to save message:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
}

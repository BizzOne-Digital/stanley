import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest, setAdminSessionCookie, verifyAdminPassword } from "@/lib/auth/admin";

export const runtime = "nodejs";

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!verifyAdminPassword(parsed.data.password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    await setAdminSessionCookie();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}

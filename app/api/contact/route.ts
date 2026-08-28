import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { getTransporter, getSmtpConfig, isSmtpConfigured } from "@/lib/email/transporter";
import { contactBusinessEmail, customerAcknowledgementEmail } from "@/lib/email/templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`contact:${ip}`);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter ?? 900) } }
      );
    }

    if (!isSmtpConfigured()) {
      return NextResponse.json(
        { error: "Email service is not configured. Please call us directly at 504-915-4433." },
        { status: 503 }
      );
    }

    const body: unknown = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const config = getSmtpConfig();
    const transporter = getTransporter();
    const businessEmail = contactBusinessEmail(data);
    const ackEmail = customerAcknowledgementEmail(data.fullName);

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.contactTo,
      replyTo: data.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    });

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.email,
      subject: ackEmail.subject,
      html: ackEmail.html,
      text: ackEmail.text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send your message at this time. Please call 504-915-4433." },
      { status: 500 }
    );
  }
}

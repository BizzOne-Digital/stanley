import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validation/quote";
import { getSmtpConfig, isSmtpConfigured, sendMail } from "@/lib/email/transporter";
import { quoteBusinessEmail, customerAcknowledgementEmail } from "@/lib/email/templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { generateReferenceNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`quote:${ip}`);
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
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ success: true, reference: generateReferenceNumber() });
    }

    const reference = generateReferenceNumber();
    const config = getSmtpConfig();
    const businessEmail = quoteBusinessEmail(data, reference);
    const ackEmail = customerAcknowledgementEmail(data.fullName, reference);

    await sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.contactTo,
      replyTo: data.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
    });

    await sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.email,
      subject: ackEmail.subject,
      html: ackEmail.html,
      text: ackEmail.text,
    });

    return NextResponse.json({ success: true, reference });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit your quote request. Please call 504-915-4433." },
      { status: 500 }
    );
  }
}

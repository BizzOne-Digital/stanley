import { NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import {
  subcontractorFormSchema,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} from "@/lib/validation/subcontractor";
import { getTransporter, getSmtpConfig, isSmtpConfigured } from "@/lib/email/transporter";
import {
  subcontractorBusinessEmail,
  subcontractorAcknowledgementEmail,
} from "@/lib/email/templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const FILE_FIELDS = [
  { key: "driversLicense", label: "drivers-license", required: true },
  { key: "proofOfInsurance", label: "proof-of-insurance", required: true },
  { key: "resume", label: "resume", required: false },
] as const;

async function parseFile(
  formData: FormData,
  key: string,
  required: boolean
): Promise<{ attachment?: Attachment; error?: string }> {
  const file = formData.get(key);

  if (!file || !(file instanceof File) || file.size === 0) {
    if (required) {
      return { error: `Missing required file: ${key}` };
    }
    return {};
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: `${file.name} exceeds the 5 MB size limit` };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      error: `${file.name} has an unsupported file type. Please upload PDF, JPG, PNG, or DOC.`,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    attachment: {
      filename: file.name,
      content: buffer,
      contentType: file.type,
    },
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`subcontractor:${ip}`);
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

    const formData = await request.formData();

    const rawData = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      cityArea: String(formData.get("cityArea") ?? ""),
      hasLicense: String(formData.get("hasLicense") ?? ""),
      hasTransportation: String(formData.get("hasTransportation") ?? ""),
      yearsExperience: String(formData.get("yearsExperience") ?? ""),
      vehicleType: String(formData.get("vehicleType") ?? ""),
      availability: String(formData.get("availability") ?? ""),
      deliveryExperience: String(formData.get("deliveryExperience") ?? ""),
      courierExperience: String(formData.get("courierExperience") ?? ""),
      customerServiceExperience: String(formData.get("customerServiceExperience") ?? ""),
      goodFit: String(formData.get("goodFit") ?? ""),
      additionalInfo: String(formData.get("additionalInfo") ?? ""),
      consent: formData.get("consent") === "true",
      website: String(formData.get("website") ?? ""),
    };

    const parsed = subcontractorFormSchema.safeParse(rawData);
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

    const attachments: Attachment[] = [];
    const attachmentNames: string[] = [];

    for (const field of FILE_FIELDS) {
      const result = await parseFile(formData, field.key, field.required);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      if (result.attachment) {
        attachments.push(result.attachment);
        const name =
          typeof result.attachment.filename === "string"
            ? result.attachment.filename
            : field.label;
        attachmentNames.push(name);
      }
    }

    const config = getSmtpConfig();
    const transporter = getTransporter();
    const businessEmail = subcontractorBusinessEmail(data, attachmentNames);
    const ackEmail = subcontractorAcknowledgementEmail(data.fullName);

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.contactTo,
      replyTo: data.email,
      subject: businessEmail.subject,
      html: businessEmail.html,
      text: businessEmail.text,
      attachments,
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
      { error: "Unable to submit your application at this time. Please call 504-915-4433." },
      { status: 500 }
    );
  }
}

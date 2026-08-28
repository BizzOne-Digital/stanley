import { NextResponse } from "next/server";
import type { Attachment } from "nodemailer/lib/mailer";
import {
  subcontractorFormSchema,
  MAX_FILE_SIZE,
  isAllowedUpload,
} from "@/lib/validation/subcontractor";
import { createTransporter, getSmtpConfig, isSmtpConfigured, sendMail } from "@/lib/email/transporter";
import { appendReplyToNotice, sendResilientMail } from "@/lib/email/send";
import {
  subcontractorBusinessEmail,
  subcontractorAcknowledgementEmail,
} from "@/lib/email/templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isMongoConfigured } from "@/lib/mongodb";
import {
  DOCUMENT_MIME_TYPES,
  MAX_DOCUMENT_SIZE,
  saveUploadBuffer,
} from "@/lib/uploads/storage";

export const runtime = "nodejs";
export const maxDuration = 60;

const FILE_FIELDS = [
  { key: "driversLicense", label: "Driver's License", required: true },
  { key: "proofOfInsurance", label: "Proof of Insurance", required: true },
  { key: "resume", label: "Resume", required: false },
] as const;

type StoredDocument = { label: string; url: string };

function getSiteUrl(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const origin = request.headers.get("origin");
  if (origin) return origin;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;

  return "https://conleydeliverysolutions.com";
}

async function storeInMongo(
  file: File,
  buffer: Buffer,
  label: string,
  siteUrl: string
): Promise<StoredDocument | null> {
  if (!isMongoConfigured()) return null;

  try {
    const saved = await saveUploadBuffer({
      folder: "misc",
      originalName: file.name,
      mimeType: file.type,
      buffer,
      allowedMimeTypes: DOCUMENT_MIME_TYPES,
      maxSize: MAX_DOCUMENT_SIZE,
    });

    return {
      label,
      url: `${siteUrl}${saved.url}`,
    };
  } catch (error) {
    console.error(`Mongo upload failed for ${label}:`, error);
    return null;
  }
}

async function processUploadedFile(
  file: File,
  label: string,
  siteUrl: string
): Promise<{ document: StoredDocument; attachment?: Attachment } | { error: string }> {
  if (!isAllowedUpload(file)) {
    return {
      error: `${file.name} has an unsupported file type. Please upload PDF, JPG, PNG, or DOC.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: `${file.name} exceeds the 5 MB size limit` };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const attachment: Attachment = {
    filename: file.name,
    content: buffer,
    contentType: file.type || undefined,
  };

  const mongoDocument = await storeInMongo(file, buffer, label, siteUrl);
  if (mongoDocument) {
    return { document: mongoDocument };
  }

  return {
    document: { label, url: `${file.name} (attached to this email)` },
    attachment,
  };
}

async function parseFile(
  formData: FormData,
  key: string,
  label: string,
  required: boolean,
  siteUrl: string
): Promise<{ document?: StoredDocument; attachment?: Attachment; error?: string }> {
  const file = formData.get(key);

  if (!file || !(file instanceof File) || file.size === 0) {
    if (required) {
      return { error: `Missing required file: ${label}` };
    }
    return {};
  }

  return processUploadedFile(file, label, siteUrl);
}

function parseConsent(value: FormDataEntryValue | null): boolean {
  const normalized = String(value ?? "").toLowerCase();
  return normalized === "true" || normalized === "on" || normalized === "1";
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

    const siteUrl = getSiteUrl(request);
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
      consent: parseConsent(formData.get("consent")),
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

    const documents: StoredDocument[] = [];
    const attachments: Attachment[] = [];

    for (const field of FILE_FIELDS) {
      const result = await parseFile(formData, field.key, field.label, field.required, siteUrl);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      if (result.document) {
        documents.push(result.document);
      }
      if (result.attachment) {
        attachments.push(result.attachment);
      }
    }

    const config = getSmtpConfig();
    const businessEmail = subcontractorBusinessEmail(data, documents);
    const ackEmail = subcontractorAcknowledgementEmail(data.fullName);
    const businessBody = appendReplyToNotice(
      businessEmail.html,
      businessEmail.text,
      data.email
    );

    await sendResilientMail({
      to: config.contactTo,
      replyTo: data.email,
      subject: businessEmail.subject,
      html: businessBody.html,
      text: businessBody.text,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    try {
      await sendMail({
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: data.email,
        subject: ackEmail.subject,
        html: ackEmail.html,
        text: ackEmail.text,
      });
    } catch (ackError) {
      console.error("Subcontractor acknowledgement email failed:", ackError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subcontractor submission error:", error);

    const errMsg = error instanceof Error ? error.message : String(error);
    const message = /auth|credentials|invalid login|authentication/i.test(errMsg)
      ? "Email service authentication failed. Please call 504-915-4433."
      : /mailbox unavailable|550|EMESSAGE/i.test(errMsg)
        ? "Email could not be delivered. Please verify SMTP settings in Vercel or call 504-915-4433."
        : /timeout|timed out|ETIMEDOUT|ESOCKET/i.test(errMsg)
          ? "Email service timed out. Please try again or call 504-915-4433."
          : "Unable to submit your application at this time. Please call 504-915-4433.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

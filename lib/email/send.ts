import type { Attachment } from "nodemailer/lib/mailer";
import { createTransporter, getSmtpConfig } from "./transporter";

type SendOptions = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
};

function isYahooHost(host: string | undefined): boolean {
  return Boolean(host?.toLowerCase().includes("yahoo"));
}

function getFromAddress(): string {
  const config = getSmtpConfig();
  if (isYahooHost(config.host) && config.user) {
    return config.user;
  }
  return config.fromEmail ?? config.user ?? "";
}

function isMailboxError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const smtpError = error as { code?: string; responseCode?: number; message?: string };
  return (
    smtpError.code === "EMESSAGE" ||
    smtpError.responseCode === 550 ||
    /mailbox unavailable|550/i.test(smtpError.message ?? "")
  );
}

async function attemptSend(options: SendOptions): Promise<void> {
  const config = getSmtpConfig();
  const fromEmail = getFromAddress();
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${fromEmail}>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
      attachments: options.attachments,
    });
  } finally {
    transporter.close();
  }
}

export async function sendResilientMail(options: SendOptions): Promise<void> {
  const attempts: SendOptions[] = [
    options,
    { ...options, attachments: undefined },
    { ...options, replyTo: undefined, attachments: undefined },
  ];

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      await attemptSend(attempt);
      return;
    } catch (error) {
      lastError = error;
      if (!isMailboxError(error)) {
        throw error;
      }
      console.error("SMTP send attempt failed, retrying with simpler message:", error);
    }
  }

  throw lastError;
}

export function appendReplyToNotice(html: string, text: string, replyTo?: string) {
  if (!replyTo) return { html, text };

  return {
    html: `${html}<p style="color:#F7F2E7;line-height:1.6;margin-top:16px;">Applicant email: <a href="mailto:${replyTo}" style="color:#F4C64E;">${replyTo}</a></p>`,
    text: `${text}\n\nApplicant email: ${replyTo}`,
  };
}

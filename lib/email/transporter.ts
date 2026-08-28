import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

function cleanSecret(value: string | undefined): string | undefined {
  return value?.trim().replace(/\s+/g, "");
}

export function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    (process.env.SMTP_SECURE !== "false" && port === 465);

  return {
    host,
    port,
    secure,
    user: process.env.SMTP_USER?.trim(),
    pass: cleanSecret(process.env.SMTP_PASS),
    fromName: process.env.SMTP_FROM_NAME?.trim() ?? "Conley Delivery Solutions",
    fromEmail: process.env.SMTP_FROM_EMAIL?.trim(),
    contactTo: process.env.CONTACT_TO_EMAIL?.trim() ?? "sconley9922@yahoo.com",
  };
}

export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  if (!(config.host && config.user && config.pass && config.fromEmail)) {
    return false;
  }

  if (isYahooHost(config.host) && config.fromEmail !== config.user) {
    console.warn(
      "SMTP_FROM_EMAIL should match SMTP_USER for Yahoo SMTP. Using SMTP_USER as sender."
    );
  }

  return true;
}

function isYahooHost(host: string | undefined): boolean {
  return Boolean(host?.toLowerCase().includes("yahoo"));
}

export function createTransporter(): Transporter {
  const config = getSmtpConfig();
  if (!config.host || !config.user || !config.pass) {
    throw new Error("SMTP configuration is incomplete");
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure && config.port === 587,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 25000,
    greetingTimeout: 25000,
    socketTimeout: 35000,
  });
}

/** @deprecated Use createTransporter() — fresh connections are more reliable on serverless. */
export function getTransporter(): Transporter {
  return createTransporter();
}

export async function sendMail(
  options: Parameters<Transporter["sendMail"]>[0]
): Promise<void> {
  const transporter = createTransporter();
  await transporter.sendMail(options);
  transporter.close();
}

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    fromName: process.env.SMTP_FROM_NAME ?? "Conley Logistics LLC",
    fromEmail: process.env.SMTP_FROM_EMAIL,
    contactTo: process.env.CONTACT_TO_EMAIL ?? "sconley9922@yahoo.com",
  };
}

export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return !!(config.host && config.user && config.pass && config.fromEmail);
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;

  const config = getSmtpConfig();
  if (!config.host || !config.user || !config.pass) {
    throw new Error("SMTP configuration is incomplete");
  }

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure && config.port === 587,
    auth: { user: config.user, pass: config.pass },
    pool: true,
    maxConnections: 2,
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 30000,
  });

  return transporter;
}

/**
 * SMTP connection test — run with: node scripts/test-smtp.mjs
 * Loads credentials from .env.local
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

function loadEnv() {
  const env = {};
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
    }
  } catch {
    console.error("Could not read .env.local");
    process.exit(1);
  }
  return env;
}

const env = loadEnv();

const config = {
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT ?? "587", 10),
  secure: env.SMTP_SECURE === "true",
  user: env.SMTP_USER,
  pass: env.SMTP_PASS,
  fromEmail: env.SMTP_FROM_EMAIL,
  toEmail: env.CONTACT_TO_EMAIL,
  fromName: env.SMTP_FROM_NAME ?? "Conley Delivery Solutions",
};

console.log("SMTP Test Configuration:");
console.log(`  Host: ${config.host}`);
console.log(`  Port: ${config.port}`);
console.log(`  Secure: ${config.secure}`);
console.log(`  User: ${config.user ? config.user.replace(/(.{2}).*(@.*)/, "$1***$2") : "(not set)"}`);
console.log(`  From: ${config.fromEmail}`);
console.log(`  To: ${config.toEmail}`);
console.log("");

if (!config.host || !config.user || !config.pass) {
  console.error("FAIL: Missing SMTP credentials in .env.local");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: { user: config.user, pass: config.pass },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

console.log("Step 1: Verifying SMTP connection...");
try {
  await transporter.verify();
  console.log("  OK — SMTP connection verified successfully");
} catch (err) {
  console.error("  FAIL — SMTP verification failed:");
  console.error(`  ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

console.log("");
console.log("Step 2: Sending test email...");
try {
  const info = await transporter.sendMail({
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: config.toEmail,
    subject: "Conley Delivery Solutions — SMTP Test Successful",
    text: "This is a test email confirming SMTP is configured correctly for the Conley Delivery Solutions website.",
    html: `<p>This is a test email confirming SMTP is configured correctly for the <strong>Conley Delivery Solutions</strong> website.</p><p>Sent at: ${new Date().toISOString()}</p>`,
  });
  console.log(`  OK — Test email sent (messageId: ${info.messageId})`);
} catch (err) {
  console.error("  FAIL — Could not send test email:");
  console.error(`  ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}

console.log("");
console.log("SMTP test completed successfully!");

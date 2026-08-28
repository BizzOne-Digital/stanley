import { escapeHtml, nl2br } from "./escape";
import type { ContactFormData } from "@/lib/validation/contact";
import type { QuoteFormData } from "@/lib/validation/quote";
import type { SubcontractorFormData } from "@/lib/validation/subcontractor";

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#8E681B;vertical-align:top;width:180px;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#101010;">${nl2br(value)}</td></tr>`;
}

function textRow(label: string, value: string): string {
  return `${label}: ${value}\n`;
}

const emailWrapper = (title: string, body: string) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#101010;border:1px solid #D4A62A;border-radius:4px;">
        <tr><td style="background:#1A1A1A;padding:24px;border-bottom:2px solid #D4A62A;">
          <h1 style="margin:0;color:#F4C64E;font-size:20px;">${escapeHtml(title)}</h1>
        </td></tr>
        <tr><td style="padding:24px;">${body}</td></tr>
        <tr><td style="padding:16px 24px;border-top:1px solid #1A1A1A;color:#A8A8A8;font-size:12px;">
          Conley Logistics LLC — New Orleans Courier Service
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

export function contactBusinessEmail(data: ContactFormData) {
  const htmlBody = `<table width="100%" cellpadding="0" cellspacing="0">${[
    row("Name", data.fullName),
    row("Company", data.company || "—"),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Preferred Contact", data.preferredContact),
    row("Service Interest", data.serviceInterest),
    row("Pickup Area", data.pickupArea),
    row("Delivery Area", data.deliveryArea),
    row("Preferred Date", data.preferredDate || "—"),
    row("Message", data.message),
  ].join("")}</table>`;

  const text = [
    textRow("Name", data.fullName),
    textRow("Company", data.company || "—"),
    textRow("Email", data.email),
    textRow("Phone", data.phone),
    textRow("Preferred Contact", data.preferredContact),
    textRow("Service Interest", data.serviceInterest),
    textRow("Pickup Area", data.pickupArea),
    textRow("Delivery Area", data.deliveryArea),
    textRow("Preferred Date", data.preferredDate || "—"),
    textRow("Message", data.message),
  ].join("");

  return {
    subject: `Contact Request — ${data.fullName}`,
    html: emailWrapper("New Contact Request", htmlBody),
    text: `New Contact Request\n\n${text}`,
  };
}

export function quoteBusinessEmail(data: QuoteFormData, reference: string) {
  const htmlBody = `<p style="color:#F4C64E;font-size:16px;font-weight:700;margin:0 0 16px;">Reference: ${escapeHtml(reference)}</p>
  <table width="100%" cellpadding="0" cellspacing="0">${[
    row("Service Type", data.serviceType),
    row("Delivery Timing", data.deliveryTiming),
    row("Customer Type", data.customerType),
    row("Pickup", data.pickupAddress),
    row("Delivery", data.deliveryAddress),
    row("Stops", String(data.numberOfStops)),
    row("Round Trip", data.roundTrip),
    row("Preferred Date", data.preferredDate),
    row("Pickup Time", data.pickupTime || "—"),
    row("Delivery Time", data.deliveryTime || "—"),
    row("Item Category", data.itemCategory),
    row("Size", data.approximateSize),
    row("Weight", data.approximateWeight),
    row("Quantity", String(data.quantity)),
    row("Fragile", data.fragile),
    row("Classification", data.itemClassification),
    row("Special Handling", data.specialHandling || "—"),
    row("Wait Time", data.waitTime || "—"),
    row("Name", data.fullName),
    row("Company", data.company || "—"),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Preferred Contact", data.preferredContact),
    row("Notes", data.additionalNotes || "—"),
  ].join("")}</table>`;

  const text = `Reference: ${reference}\n\n${[
    textRow("Service Type", data.serviceType),
    textRow("Delivery Timing", data.deliveryTiming),
    textRow("Pickup", data.pickupAddress),
    textRow("Delivery", data.deliveryAddress),
    textRow("Preferred Date", data.preferredDate),
    textRow("Name", data.fullName),
    textRow("Email", data.email),
    textRow("Phone", data.phone),
  ].join("")}`;

  return {
    subject: `Quote Request ${reference} — ${data.serviceType} — ${data.preferredDate} — ${data.pickupAddress} → ${data.deliveryAddress}`,
    html: emailWrapper("New Quote Request", htmlBody),
    text: `New Quote Request\n\n${text}`,
  };
}

export function subcontractorBusinessEmail(
  data: SubcontractorFormData,
  documents: { label: string; url: string }[]
) {
  const documentList =
    documents.length > 0
      ? documents.map((doc) => `${doc.label}: ${doc.url}`).join("\n")
      : "None";

  const documentHtml =
    documents.length > 0
      ? documents
          .map(
            (doc) =>
              `<li><a href="${escapeHtml(doc.url)}" style="color:#F4C64E;">${escapeHtml(doc.label)}</a></li>`
          )
          .join("")
      : "—";

  const htmlBody = `<table width="100%" cellpadding="0" cellspacing="0">${[
    row("Name", data.fullName),
    row("Phone", data.phone),
    row("Email", data.email),
    row("City/Area", data.cityArea),
    row("Valid Driver's License", data.hasLicense === "yes" ? "Yes" : "No"),
    row("Reliable Transportation", data.hasTransportation === "yes" ? "Yes" : "No"),
    row("Years of Experience", data.yearsExperience),
    row("Vehicle Type", data.vehicleType),
    row("Availability", data.availability),
    row("Previous Delivery Experience", data.deliveryExperience || "—"),
    row("Courier/Medical Courier Experience", data.courierExperience || "—"),
    row("Customer Service Experience", data.customerServiceExperience || "—"),
    row("Why Good Fit", data.goodFit),
    row("Additional Info", data.additionalInfo || "—"),
  ].join("")}</table>
  <p style="color:#F4C64E;font-weight:700;margin:24px 0 8px;">Uploaded Documents</p>
  <ul style="color:#F7F2E7;padding-left:20px;">${documentHtml}</ul>`;

  const text = [
    textRow("Name", data.fullName),
    textRow("Phone", data.phone),
    textRow("Email", data.email),
    textRow("City/Area", data.cityArea),
    textRow("Valid Driver's License", data.hasLicense === "yes" ? "Yes" : "No"),
    textRow("Reliable Transportation", data.hasTransportation === "yes" ? "Yes" : "No"),
    textRow("Years of Experience", data.yearsExperience),
    textRow("Vehicle Type", data.vehicleType),
    textRow("Availability", data.availability),
    textRow("Previous Delivery Experience", data.deliveryExperience || "—"),
    textRow("Courier/Medical Courier Experience", data.courierExperience || "—"),
    textRow("Customer Service Experience", data.customerServiceExperience || "—"),
    textRow("Why Good Fit", data.goodFit),
    textRow("Additional Info", data.additionalInfo || "—"),
    textRow("Documents", documentList),
  ].join("");

  return {
    subject: `Driver Application — ${data.fullName}`,
    html: emailWrapper("New Driver Application", htmlBody),
    text: `New Driver Application\n\n${text}`,
  };
}

export function subcontractorAcknowledgementEmail(name: string) {
  const htmlBody = `
    <p style="color:#F7F2E7;line-height:1.6;">Dear ${escapeHtml(name)},</p>
    <p style="color:#F7F2E7;line-height:1.6;">Thank you for applying to drive with Conley Logistics LLC. We have received your application and will review it shortly.</p>
    <p style="color:#F7F2E7;line-height:1.6;">If your qualifications match our current needs, we will contact you to discuss next steps.</p>
    <p style="color:#F7F2E7;line-height:1.6;">If you have questions in the meantime, please call us at <a href="tel:+15049154433" style="color:#F4C64E;">504-915-4433</a>.</p>
    <p style="color:#F7F2E7;line-height:1.6;">— Conley Logistics LLC</p>`;

  const text = `Dear ${name},\n\nThank you for applying to drive with Conley Logistics LLC. We have received your application and will review it shortly.\n\nIf your qualifications match our current needs, we will contact you to discuss next steps.\n\nIf you have questions in the meantime, please call us at 504-915-4433.\n\n— Conley Logistics LLC`;

  return {
    subject: "Conley Logistics LLC — Application Received",
    html: emailWrapper("Application Received", htmlBody),
    text,
  };
}

export function customerAcknowledgementEmail(name: string, reference?: string) {
  const refLine = reference
    ? `<p style="color:#F4C64E;font-weight:700;">Reference Number: ${escapeHtml(reference)}</p>`
    : "";
  const refText = reference ? `Reference Number: ${reference}\n\n` : "";

  const htmlBody = `${refLine}
    <p style="color:#F7F2E7;line-height:1.6;">Dear ${escapeHtml(name)},</p>
    <p style="color:#F7F2E7;line-height:1.6;">Thank you for contacting Conley Logistics LLC. We have received your request and will review the details shortly.</p>
    <p style="color:#F7F2E7;line-height:1.6;">This is not a confirmed delivery. We will follow up to confirm availability, acceptance, and final pricing.</p>
    <p style="color:#F7F2E7;line-height:1.6;">If you have an urgent need, please call us at <a href="tel:+15049154433" style="color:#F4C64E;">504-915-4433</a>.</p>
    <p style="color:#F7F2E7;line-height:1.6;">— Conley Logistics LLC</p>`;

  const text = `${refText}Dear ${name},\n\nThank you for contacting Conley Logistics LLC. We have received your request and will review the details shortly.\n\nThis is not a confirmed delivery. We will follow up to confirm availability, acceptance, and final pricing.\n\nIf you have an urgent need, please call us at 504-915-4433.\n\n— Conley Logistics LLC`;

  return {
    subject: "Conley Logistics LLC — Request Received",
    html: emailWrapper("Request Received", htmlBody),
    text,
  };
}

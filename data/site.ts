import type { BusinessHours, NavItem } from "@/types";

export const siteConfig = {
  name: "Conley Logistics LLC",
  shortName: "Conley Logistics",
  tagline: "RELIABLE DELIVERY. EVERY ROUTE. EVERY TIME.",
  headline: "FAST, RELIABLE DELIVERY.",
  headlineSecondary: "RIGHT WHEN YOU NEED IT.",
  description:
    "Professional same-day, scheduled, medical, legal, and business courier services throughout New Orleans.",
  about:
    "Conley Logistics LLC provides same-day, rush, scheduled, medical, business, and personal courier services throughout New Orleans. We help healthcare facilities, professional offices, local businesses, and individuals move time-sensitive items with clear communication and dependable service.",
  mission:
    "To provide responsive, professional courier support that helps New Orleans businesses and individuals move important items without unnecessary delays or confusion.",
  email: "sconley9922@yahoo.com",
  emailHref: "mailto:sconley9922@yahoo.com",
  phone: "504-915-4433",
  phoneHref: "tel:+15049154433",
  phoneDisplay: "(504) 915-4433",
  serviceArea: "New Orleans, Louisiana and surrounding local areas.",
  serviceAreaShort: "New Orleans & surrounding areas",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  logo: {
    src: "/brand/conley-logistics-logo.png",
    alt: "Conley Logistics LLC — Reliable delivery. Every route. Every time.",
    width: 800,
    height: 800,
  },
  faviconHook: "/brand/favicon.ico",
  ogImageHook: "/brand/og-image.png",
} as const;

export const businessHours: BusinessHours[] = [
  { day: "Monday – Friday", hours: "7:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 5:00 PM" },
  {
    day: "Sunday",
    hours: "Closed unless emergency availability is explicitly confirmed",
  },
];

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Request a Quote", href: "/request-a-quote" },
];

export const legalNotices = {
  medicalWarning:
    "Do not submit protected health information, patient names, medical-record details, test results, prescriptions, or other sensitive health information through this form.",
  medicalFormWarning:
    "Do not enter patient names, medical-record information, test results, prescription details, or other protected health information.",
  hazardousRestriction:
    "Do not use this form to request transport of hazardous, illegal, prohibited, or unapproved materials.",
  quoteDisclaimer:
    "This submission is a quote request, not a confirmed delivery. Conley Logistics LLC will review the details and confirm availability, acceptance, and final pricing.",
  medicalReview:
    "Healthcare-related delivery inquiries are reviewed before acceptance. Please describe any handling, privacy, timing, or temperature requirements when requesting a quote.",
  acceptanceNotice:
    "Acceptance is subject to service capability and confirmation.",
  afterHoursNotice:
    "After-hours and emergency delivery requests are subject to confirmation and availability.",
  pricingDisclaimer:
    "Courier services start at $35. Final pricing is confirmed after reviewing the route, timing, item type, handling requirements, and any special instructions.",
  pricingVariation:
    "Final pricing may vary based on distance, urgency, item type, handling requirements, wait time, after-hours scheduling, and route frequency.",
} as const;

export const audienceList = [
  "Medical offices",
  "Healthcare facilities",
  "Pharmacies",
  "Laboratories",
  "Law firms",
  "Small businesses",
  "Auto dealerships",
  "Individuals needing local deliveries",
] as const;

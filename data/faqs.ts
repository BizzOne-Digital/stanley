import type { FAQ } from "@/types";
import { legalNotices } from "./site";

export const faqs: FAQ[] = [
  {
    id: "service-area",
    question: "What areas do you serve?",
    answer: `Conley Delivery Solutions serves ${"New Orleans, Louisiana and surrounding local areas"}. Specific routes to surrounding areas are confirmed when you request a quote.`,
    category: "general",
  },
  {
    id: "pricing",
    question: "How much does delivery cost?",
    answer: `Courier services starting at $35. ${legalNotices.pricingVariation} Request a custom quote for an accurate price based on your specific needs.`,
    category: "pricing",
  },
  {
    id: "same-day",
    question: "Do you offer same-day delivery?",
    answer:
      "Yes. Same-day delivery is available throughout New Orleans when schedule and route conditions allow. Submit a quote request or call to confirm availability for your specific route and timing.",
    category: "services",
  },
  {
    id: "medical",
    question: "Do you handle medical deliveries?",
    answer:
      "We provide medical-office courier support. Healthcare-related delivery inquiries are reviewed before acceptance. Please describe handling, privacy, timing, or temperature requirements in your quote request. Do not submit protected health information through our public forms.",
    category: "medical",
  },
  {
    id: "legal",
    question: "Can you deliver legal documents?",
    answer:
      "Yes. We provide local courier delivery for law firms and professional offices moving documents and related materials between locations. This service covers courier delivery — not process serving, legal filing, or notarization.",
    category: "legal",
  },
  {
    id: "after-hours",
    question: "Are you available after hours or on weekends?",
    answer:
      "Standard hours are Monday–Friday 7:00 AM–7:00 PM and Saturday 8:00 AM–5:00 PM. After-hours and emergency requests are subject to confirmation and availability. Sunday is closed unless emergency availability is explicitly confirmed.",
    category: "hours",
  },
  {
    id: "quote-process",
    question: "How does the quote process work?",
    answer:
      "Submit a quote request with your route, timing, and item details. We review the information and respond with availability, acceptance confirmation, and final pricing. A quote request is not a confirmed delivery until we confirm.",
    category: "general",
  },
  {
    id: "recurring",
    question: "Do you offer recurring delivery routes?",
    answer:
      "Yes. Recurring route services are available for businesses that need regular, scheduled delivery runs. Contact us to discuss frequency, stops, and pricing for your route.",
    category: "services",
  },
  {
    id: "what-not-to-send",
    question: "What should I not send through your forms?",
    answer:
      "Do not submit protected health information, patient names, or medical records. Do not use our forms to request transport of hazardous, illegal, prohibited, or unapproved materials.",
    category: "medical",
  },
  {
    id: "how-to-contact",
    question: "What is the best way to reach you?",
    answer:
      "Call 504-915-4433 for immediate needs, email sconley9922@yahoo.com for general inquiries, or use our online quote request form for detailed delivery requests.",
    category: "contact",
  },
];

export const homepageFaqs = faqs.slice(0, 5);

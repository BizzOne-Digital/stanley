import type { Service } from "@/types";
import { images } from "./images";

export const services: Service[] = [
  {
    slug: "same-day-delivery",
    title: "Same-Day Delivery",
    shortTitle: "Same-Day",
    category: "same-day",
    description:
      "Local same-day courier service for time-sensitive pickups and deliveries across New Orleans.",
    overview:
      "When something needs to move today, Conley Delivery Solutions provides same-day courier support throughout New Orleans. We coordinate pickup timing, route details, and delivery expectations so you know what to expect before the run begins.",
    customerTypes: [
      "Medical offices",
      "Law firms",
      "Small businesses",
      "Auto dealerships",
      "Individuals",
    ],
    useCases: [
      "Documents needed at another office before close of business",
      "Parts or supplies required at a job site the same day",
      "Time-sensitive packages between local business locations",
      "Personal items that cannot wait for standard shipping",
    ],
    process: [
      { step: 1, title: "Submit request", description: "Share pickup and delivery areas, timing needs, and item details." },
      { step: 2, title: "Review & confirm", description: "We confirm availability, route feasibility, and pricing." },
      { step: 3, title: "Pickup", description: "Courier arrives at the agreed pickup location." },
      { step: 4, title: "Delivery", description: "Item is delivered to the specified destination with confirmation." },
    ],
    requirements: [
      "Clear pickup and delivery locations",
      "Contact person available at pickup when needed",
      "Description of item type and approximate size/weight",
      "Any special handling instructions",
    ],
    disclaimer:
      "Same-day availability depends on current schedule, route, and item requirements. Acceptance is subject to service capability and confirmation.",
    seoTitle: "Same-Day Delivery in New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Same-day courier and local delivery service in New Orleans. Request a quote for time-sensitive pickups and deliveries.",
    image: images.localPickup.src,
    imageAlt: images.localPickup.alt,
  },
  {
    slug: "rush-expedited-delivery",
    title: "Rush & Expedited Delivery",
    shortTitle: "Rush",
    category: "rush",
    description:
      "Priority courier service for urgent local deliveries that need immediate attention.",
    overview:
      "Rush and expedited delivery is designed for situations where every hour matters. We prioritize urgent requests when schedule and route conditions allow, with clear communication about timing expectations from the start.",
    customerTypes: [
      "Healthcare facilities",
      "Law firms",
      "Professional offices",
      "Businesses with urgent supply needs",
    ],
    useCases: [
      "Urgent document transfer between offices",
      "Critical supplies needed at a facility quickly",
      "Last-minute business deliveries before a deadline",
      "Expedited item movement within the local area",
    ],
    process: [
      { step: 1, title: "Urgent request", description: "Call or submit a quote request with rush timing noted." },
      { step: 2, title: "Immediate review", description: "We assess availability and provide a confirmed timeline." },
      { step: 3, title: "Direct route", description: "Pickup and delivery are handled with priority routing." },
      { step: 4, title: "Completion update", description: "You receive confirmation when delivery is complete." },
    ],
    requirements: [
      "Urgency level and deadline clearly stated",
      "Accessible pickup contact",
      "Item ready at pickup time",
      "Delivery contact information",
    ],
    disclaimer:
      "Rush service availability varies by time of day and current schedule. We do not guarantee specific delivery times until confirmed.",
    seoTitle: "Rush Courier Service New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Rush and expedited local courier service in New Orleans. Priority delivery when timing is critical.",
    image: images.heroVan.src,
    imageAlt: images.heroVan.alt,
  },
  {
    slug: "scheduled-delivery",
    title: "Scheduled Delivery",
    shortTitle: "Scheduled",
    category: "scheduled",
    description:
      "Plan ahead with scheduled pickup and delivery times that fit your business workflow.",
    overview:
      "Scheduled delivery lets you coordinate courier service around your calendar. Whether you need a one-time scheduled run or regular timing windows, we work with you to establish clear pickup and delivery expectations.",
    customerTypes: [
      "Medical offices",
      "Law firms",
      "Small businesses",
      "Auto dealerships",
      "Individuals with planned needs",
    ],
    useCases: [
      "Pre-planned document runs between offices",
      "Scheduled supply deliveries to a facility",
      "Coordinated pickup for a specific appointment window",
      "Business deliveries aligned with operating hours",
    ],
    process: [
      { step: 1, title: "Schedule request", description: "Provide preferred date, time windows, and route details." },
      { step: 2, title: "Confirm plan", description: "We confirm the schedule, pricing, and any special needs." },
      { step: 3, title: "Scheduled pickup", description: "Courier arrives within the agreed time window." },
      { step: 4, title: "Scheduled delivery", description: "Delivery completed per the confirmed schedule." },
    ],
    requirements: [
      "Preferred date and time windows",
      "Pickup and delivery locations",
      "Item description and handling notes",
      "Contact information for both ends of the route",
    ],
    disclaimer:
      "Scheduled service is confirmed after reviewing route, timing, and item requirements. Changes may affect pricing.",
    seoTitle: "Scheduled Local Delivery New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Scheduled courier and delivery service in New Orleans. Plan pickups and deliveries around your schedule.",
    image: images.processFlow.src,
    imageAlt: images.processFlow.alt,
  },
  {
    slug: "medical-courier-services",
    title: "Medical Courier Services",
    shortTitle: "Medical",
    category: "medical",
    description:
      "Medical-office courier support for healthcare-related local delivery inquiries throughout New Orleans.",
    overview:
      "Conley Delivery Solutions provides medical-office courier support for healthcare facilities, medical offices, pharmacies, and laboratories that need local pickup and delivery coordination. Healthcare-related delivery inquiries are reviewed before acceptance to ensure we can meet the specific requirements of each request.",
    customerTypes: [
      "Medical offices",
      "Healthcare facilities",
      "Pharmacies",
      "Laboratories",
    ],
    useCases: [
      "Inter-office document and supply movement",
      "Laboratory-related pickup and delivery coordination",
      "Medical office supply runs",
      "Healthcare facility supply transfers",
    ],
    process: [
      { step: 1, title: "Describe requirements", description: "Share handling, timing, and privacy-related needs without PHI." },
      { step: 2, title: "Capability review", description: "We review whether the request fits our service capability." },
      { step: 3, title: "Confirmed pickup", description: "Pickup is scheduled after acceptance and confirmation." },
      { step: 4, title: "Delivery completion", description: "Delivery is completed per agreed instructions." },
    ],
    requirements: [
      "General description of item category (no PHI)",
      "Handling, privacy, timing, or temperature requirements noted in quote request",
      "Pickup and delivery locations",
      "Authorized contact at pickup location",
    ],
    disclaimer:
      "Healthcare-related delivery inquiries are reviewed before acceptance. Do not submit protected health information through our public forms. Acceptance is subject to service capability and confirmation.",
    seoTitle: "Medical Office Courier New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Medical-office courier support in New Orleans. Healthcare-related delivery inquiries reviewed before acceptance.",
    image: images.medicalOffice.src,
    imageAlt: images.medicalOffice.alt,
  },
  {
    slug: "legal-document-delivery",
    title: "Legal Document Delivery",
    shortTitle: "Legal",
    category: "legal",
    description:
      "Local courier service for law firms and professional offices moving legal documents and related materials.",
    overview:
      "Law firms and professional offices rely on timely document movement. Conley Delivery Solutions provides local courier support for legal document delivery between offices, courthouses, and business locations throughout the New Orleans area.",
    customerTypes: ["Law firms", "Professional offices", "Small businesses"],
    useCases: [
      "Document delivery between law offices",
      "Court-related document transport coordination",
      "Contract and filing material movement",
      "Confidential business document transfer",
    ],
    process: [
      { step: 1, title: "Request details", description: "Provide pickup/delivery locations and document handling needs." },
      { step: 2, title: "Confirm route", description: "We confirm timing, pricing, and delivery expectations." },
      { step: 3, title: "Secure pickup", description: "Documents collected from the specified location." },
      { step: 4, title: "Delivery", description: "Documents delivered to the designated recipient." },
    ],
    requirements: [
      "Pickup and delivery addresses or areas",
      "Preferred timing",
      "Handling instructions for sensitive materials",
      "Recipient contact information",
    ],
    disclaimer:
      "This service covers local courier delivery. We do not provide process serving, legal filing authority, notarization, or certified chain-of-custody services unless separately confirmed.",
    seoTitle: "Legal Document Courier New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Legal document delivery and courier service for law firms in New Orleans. Request a quote for local document runs.",
    image: images.legalDocuments.src,
    imageAlt: images.legalDocuments.alt,
  },
  {
    slug: "business-to-business-delivery",
    title: "Business-to-Business Delivery",
    shortTitle: "B2B",
    category: "business",
    description:
      "Courier service connecting local businesses with dependable pickup and delivery between locations.",
    overview:
      "Business-to-business delivery keeps your operations moving. From inter-office transfers to supplier runs and client deliveries, Conley Delivery Solutions provides local courier support tailored to your business workflow.",
    customerTypes: [
      "Small businesses",
      "Auto dealerships",
      "Professional offices",
      "Retail and service businesses",
    ],
    useCases: [
      "Inter-office material transfers",
      "Supplier pickup and client delivery",
      "Parts and inventory movement between locations",
      "Business correspondence and package delivery",
    ],
    process: [
      { step: 1, title: "Business inquiry", description: "Describe your route, frequency, and item types." },
      { step: 2, title: "Quote & plan", description: "We provide pricing and delivery plan options." },
      { step: 3, title: "Pickup", description: "Items collected from your business location." },
      { step: 4, title: "Delivery", description: "Items delivered to the business destination." },
    ],
    requirements: [
      "Business name and contact",
      "Pickup and delivery locations",
      "Item category and approximate volume",
      "Preferred schedule or frequency",
    ],
    disclaimer:
      "Business delivery pricing varies by route, frequency, and item requirements. Final pricing confirmed after review.",
    seoTitle: "Business Courier Service New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Business-to-business courier and local delivery in New Orleans. Dependable pickup and delivery between locations.",
    image: images.businessDelivery.src,
    imageAlt: images.businessDelivery.alt,
  },
  {
    slug: "on-demand-courier-service",
    title: "On-Demand Courier Service",
    shortTitle: "On-Demand",
    category: "on-demand",
    description:
      "Flexible on-demand courier service when you need a local delivery without a standing contract.",
    overview:
      "On-demand courier service gives you local delivery support when you need it — without committing to a recurring arrangement. Submit a request, confirm the details, and we coordinate pickup and delivery based on availability.",
    customerTypes: [
      "Individuals",
      "Small businesses",
      "Professional offices",
      "Auto dealerships",
    ],
    useCases: [
      "One-time local deliveries",
      "Unexpected urgent transport needs",
      "Personal item pickup and drop-off",
      "Ad-hoc business deliveries",
    ],
    process: [
      { step: 1, title: "On-demand request", description: "Submit pickup, delivery, and item details." },
      { step: 2, title: "Availability check", description: "We confirm we can accommodate the request." },
      { step: 3, title: "Pickup", description: "Courier collects the item from the specified location." },
      { step: 4, title: "Delivery", description: "Item delivered to the destination." },
    ],
    requirements: [
      "Pickup and delivery locations",
      "Item description",
      "Contact phone number",
      "Preferred timing",
    ],
    disclaimer:
      "On-demand availability depends on current schedule. Acceptance is subject to service capability and confirmation.",
    seoTitle: "On-Demand Courier New Orleans | Conley Delivery Solutions",
    seoDescription:
      "On-demand local courier service in New Orleans. Flexible pickup and delivery without a standing contract.",
    image: images.heroVan.src,
    imageAlt: images.heroVan.alt,
  },
  {
    slug: "recurring-route-services",
    title: "Recurring Route Services",
    shortTitle: "Recurring",
    category: "recurring",
    description:
      "Regularly scheduled courier routes for businesses that need consistent local delivery support.",
    overview:
      "Recurring route services are designed for businesses that need dependable, repeated delivery runs. We work with you to establish route frequency, timing, and expectations so your regular deliveries stay on track.",
    customerTypes: [
      "Medical offices",
      "Small businesses",
      "Law firms",
      "Healthcare facilities",
    ],
    useCases: [
      "Daily or weekly document runs",
      "Regular supply deliveries to multiple stops",
      "Scheduled inter-office transfers",
      "Consistent pickup routes for business operations",
    ],
    process: [
      { step: 1, title: "Route consultation", description: "Discuss frequency, stops, and timing requirements." },
      { step: 2, title: "Route plan", description: "We develop a recurring route plan and pricing." },
      { step: 3, title: "Route activation", description: "Recurring service begins on the agreed schedule." },
      { step: 4, title: "Ongoing coordination", description: "Clear communication for schedule changes or adjustments." },
    ],
    requirements: [
      "Route frequency (daily, weekly, etc.)",
      "Stop locations and order",
      "Typical item types per stop",
      "Preferred time windows",
    ],
    disclaimer:
      "Recurring route pricing depends on frequency, number of stops, distance, and item requirements. Route changes may affect pricing.",
    seoTitle: "Recurring Delivery Routes New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Recurring courier routes and scheduled business delivery in New Orleans. Consistent local delivery support.",
    image: images.recurringRoutes.src,
    imageAlt: images.recurringRoutes.alt,
  },
  {
    slug: "local-pickup-delivery",
    title: "Local Pickup & Delivery",
    shortTitle: "Local",
    category: "local",
    description:
      "Straightforward local pickup and delivery throughout New Orleans and surrounding areas.",
    overview:
      "Local pickup and delivery is the foundation of our courier service. Whether you need a single item moved across town or a multi-stop run, we coordinate the details and keep you informed throughout the process.",
    customerTypes: [
      "Individuals",
      "Small businesses",
      "Medical offices",
      "Auto dealerships",
    ],
    useCases: [
      "Single-item local deliveries",
      "Multi-stop pickup routes",
      "Personal item transport within the area",
      "Business supply and material movement",
    ],
    process: [
      { step: 1, title: "Location details", description: "Share pickup and delivery areas or addresses." },
      { step: 2, title: "Quote confirmation", description: "We confirm pricing based on route and requirements." },
      { step: 3, title: "Pickup", description: "Item collected from the pickup location." },
      { step: 4, title: "Delivery", description: "Item delivered to the final destination." },
    ],
    requirements: [
      "Pickup location",
      "Delivery location",
      "Item type and size estimate",
      "Contact information",
    ],
    disclaimer:
      "Service to surrounding areas is subject to confirmation based on route and availability.",
    seoTitle: "Local Pickup & Delivery New Orleans | Conley Delivery Solutions",
    seoDescription:
      "Local pickup and delivery courier service in New Orleans. Simple, dependable item transport.",
    image: images.localPickup.src,
    imageAlt: images.localPickup.alt,
  },
  {
    slug: "after-hours-emergency-delivery",
    title: "After-Hours & Emergency Delivery",
    shortTitle: "After-Hours",
    category: "after-hours",
    description:
      "After-hours and emergency delivery requests reviewed for availability outside standard business hours.",
    overview:
      "Sometimes delivery needs extend beyond regular hours. After-hours and emergency delivery requests are reviewed for availability and confirmation. We communicate clearly about whether we can accommodate the request and what timing to expect.",
    customerTypes: [
      "Healthcare facilities",
      "Law firms",
      "Businesses with urgent needs",
      "Individuals with emergency requests",
    ],
    useCases: [
      "Urgent after-hours document delivery",
      "Emergency supply transport when available",
      "Late-evening pickup requests",
      "Weekend delivery needs subject to confirmation",
    ],
    process: [
      { step: 1, title: "Emergency request", description: "Call or submit request noting after-hours timing." },
      { step: 2, title: "Availability confirmation", description: "We confirm whether the request can be accommodated." },
      { step: 3, title: "Pickup", description: "If confirmed, courier proceeds to pickup location." },
      { step: 4, title: "Delivery", description: "Delivery completed per confirmed expectations." },
    ],
    requirements: [
      "Clear urgency description",
      "Pickup and delivery locations",
      "Contact phone for immediate reach",
      "Item type and handling needs",
    ],
    disclaimer:
      "After-hours and emergency delivery requests are subject to confirmation and availability. Sunday service is closed unless emergency availability is explicitly confirmed.",
    seoTitle: "After-Hours Courier New Orleans | Conley Delivery Solutions",
    seoDescription:
      "After-hours and emergency local courier requests in New Orleans. Availability subject to confirmation.",
    image: images.afterHours.src,
    imageAlt: images.afterHours.alt,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const current = getServiceBySlug(slug);
  if (!current) return services.slice(0, limit);
  return services
    .filter((s) => s.slug !== slug && s.category !== current.category)
    .slice(0, limit);
}

export const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "same-day", label: "Same-Day" },
  { id: "rush", label: "Rush" },
  { id: "scheduled", label: "Scheduled" },
  { id: "medical", label: "Medical" },
  { id: "legal", label: "Legal" },
  { id: "business", label: "Business" },
  { id: "recurring", label: "Recurring" },
  { id: "after-hours", label: "After-Hours" },
] as const;

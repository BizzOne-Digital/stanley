import type { ImageAsset } from "@/types";

/** Centralized image references — replace placeholders with real photography when available. */
export const images = {
  heroSkyline: {
    src: "/images/placeholders/new-orleans-skyline.svg",
    alt: "Illustrated New Orleans skyline at night with bridge and city lights",
    placeholder: true,
  },
  heroVan: {
    src: "/images/placeholders/delivery-van.svg",
    alt: "Service illustration of a local delivery van on a New Orleans route",
    placeholder: true,
  },
  routeMap: {
    src: "/images/placeholders/route-map.svg",
    alt: "Stylized map grid showing a gold delivery route through New Orleans",
    placeholder: true,
  },
  processFlow: {
    src: "/images/placeholders/delivery-process.svg",
    alt: "Service illustration of the delivery process from request to completion",
    placeholder: true,
  },
  medicalOffice: {
    src: "/images/placeholders/medical-office.svg",
    alt: "Service illustration representing medical-office courier support",
    placeholder: true,
  },
  legalDocuments: {
    src: "/images/placeholders/legal-documents.svg",
    alt: "Service illustration representing legal document delivery",
    placeholder: true,
  },
  businessDelivery: {
    src: "/images/placeholders/business-delivery.svg",
    alt: "Service illustration representing business-to-business delivery",
    placeholder: true,
  },
  recurringRoutes: {
    src: "/images/placeholders/recurring-routes.svg",
    alt: "Service illustration representing recurring delivery routes",
    placeholder: true,
  },
  localPickup: {
    src: "/images/placeholders/local-pickup.svg",
    alt: "Service illustration representing local pickup and delivery",
    placeholder: true,
  },
  afterHours: {
    src: "/images/placeholders/after-hours.svg",
    alt: "Service illustration representing after-hours delivery requests",
    placeholder: true,
  },
  serviceArea: {
    src: "/images/placeholders/service-area.svg",
    alt: "Stylized map highlighting the New Orleans service area",
    placeholder: true,
  },
  contactMap: {
    src: "/images/placeholders/contact-map.svg",
    alt: "Stylized New Orleans area map for service coverage reference",
    placeholder: true,
  },
  aboutTeam: {
    src: "/images/placeholders/about-operations.svg",
    alt: "Service illustration representing professional courier operations",
    placeholder: true,
  },
  pricingVisual: {
    src: "/images/placeholders/pricing-visual.svg",
    alt: "Service illustration representing custom quote-based pricing",
    placeholder: true,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;

import { businessHours, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import type { Service, FAQ } from "@/types";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CourierService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: {
      "@type": "City",
      name: "New Orleans",
      containedInPlace: { "@type": "State", name: "Louisiana" },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Courier Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          url: `${siteConfig.url}/services/${s.slug}`,
        },
      })),
    },
    image: `${siteConfig.url}${siteConfig.logo.src}`,
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "CourierService",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    areaServed: {
      "@type": "City",
      name: "New Orleans",
    },
    url: `${siteConfig.url}/services/${service.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqItems: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function businessHoursText(): string {
  return businessHours.map((h) => `${h.day}: ${h.hours}`).join("; ");
}

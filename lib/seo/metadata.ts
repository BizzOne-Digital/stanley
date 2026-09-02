import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: siteConfig.ogImageHook
        ? [{ url: siteConfig.ogImageHook, width: 1200, height: 630, alt: siteConfig.name }]
        : [{ url: siteConfig.logo.src, width: siteConfig.logo.width, height: siteConfig.logo.height, alt: siteConfig.logo.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | New Orleans Courier Service`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "New Orleans courier service",
    "same-day delivery New Orleans",
    "rush courier service",
    "medical office courier",
    "legal document delivery",
    "business courier New Orleans",
    "local pickup and delivery",
  ],
};

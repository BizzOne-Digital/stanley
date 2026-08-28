import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { siteConfig, legalNotices } from "@/data/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { LogoLockup } from "@/components/layout/LogoLockup";

export const metadata = createPageMetadata({
  title: `Request a Quote | ${siteConfig.name}`,
  description:
    "Request a custom courier quote for same-day, rush, scheduled, or recurring delivery throughout New Orleans.",
  path: "/request-a-quote",
});

export default function RequestQuotePage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Request a Quote", url: `${siteConfig.url}/request-a-quote` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <PageHero
        title="Request a Quote"
        eyebrow="Custom Delivery Pricing"
        description="Submit your route, timing, and item details. We will review availability and confirm final pricing — this is a quote request, not a confirmed delivery."
        breadcrumbs={[{ label: "Request a Quote" }]}
        compact
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center">
            <LogoLockup size="lg" className="mb-6" />
            <SectionHeading
              eyebrow="Multi-Step Form"
              title="Tell Us About Your Delivery"
              description={legalNotices.quoteDisclaimer}
              align="center"
            />
          </div>

          <div className="mb-8 rounded-sm border border-gold/20 bg-graphite/50 p-5 text-sm text-muted">
            <p>{legalNotices.medicalFormWarning}</p>
            <p className="mt-2">{legalNotices.hazardousRestriction}</p>
          </div>

          <QuoteForm />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-gold/10 pt-10 sm:flex-row">
            <p className="text-sm text-muted">Need immediate assistance?</p>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-gold transition-colors hover:text-gold-bright"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.emailHref}
              className="inline-flex items-center gap-2 font-semibold text-gold transition-colors hover:text-gold-bright"
            >
              <Mail className="size-4" aria-hidden />
              Email Us
            </a>
          </div>

          <p className="mt-8 text-center text-xs text-muted">
            Prefer a simpler inquiry?{" "}
            <Link href="/contact" className="text-gold hover:text-gold-bright">
              Use the contact form
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </>
  );
}

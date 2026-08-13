import Link from "next/link";
import { Phone, Mail, Info } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  pricingConfig,
  pricingFactors,
  deliveryTypeComparison,
} from "@/data/pricing";
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: "Pricing | Conley Logistics LLC New Orleans Courier",
  description: pricingConfig.disclaimer,
  path: "/pricing",
});

export default function PricingPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Pricing", url: `${siteConfig.url}/pricing` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <PageHero
        title="Pricing"
        eyebrow="Custom Quotes"
        description={pricingConfig.subheadline}
        breadcrumbs={[{ label: "Pricing" }]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                Starting Price
              </p>
              <p className="mt-4 font-display text-5xl font-bold uppercase tracking-wide gold-gradient-text sm:text-6xl md:text-7xl">
                ${pricingConfig.startingPrice}
              </p>
              <h2 className="mt-4 font-display text-2xl uppercase tracking-wide text-ivory">
                {pricingConfig.headline}
              </h2>
              <p className="mt-4 text-muted">{pricingConfig.disclaimer}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/request-a-quote">Get a Custom Quote</Link>
                </Button>
                <Button href={siteConfig.phoneHref} variant="secondary" size="lg">
                  <Phone className="size-5" aria-hidden />
                  Call Now
                </Button>
              </div>
            </div>
            <ImageReveal
              src={images.pricingVisual.src}
              alt={images.pricingVisual.alt}
              width={700}
              height={320}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="rounded-sm border border-gold/20 bg-black"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Quote Factors"
            title="What Affects Your Price"
            description={pricingConfig.variationNote}
            align="center"
            className="mb-12"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricingFactors.map((factor) => (
              <li
                key={factor.title}
                className="rounded-sm border border-gold/10 bg-graphite/50 p-5 metallic-edge"
              >
                <h3 className="font-display text-sm uppercase tracking-wide text-gold">
                  {factor.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{factor.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Compare"
            title="Delivery Type Comparison"
            description="Different delivery types serve different needs. Final pricing is confirmed after reviewing your specific route."
            className="mb-10"
          />
          <div className="table-scroll">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="py-4 pr-4 font-display text-sm uppercase tracking-wide text-gold">
                    Type
                  </th>
                  <th className="py-4 pr-4 font-display text-sm uppercase tracking-wide text-gold">
                    Description
                  </th>
                  <th className="py-4 font-display text-sm uppercase tracking-wide text-gold">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody>
                {deliveryTypeComparison.map((row) => (
                  <tr key={row.type} className="border-b border-gold/10">
                    <td className="py-4 pr-4 font-medium text-ivory">{row.type}</td>
                    <td className="py-4 pr-4 text-sm text-muted">{row.description}</td>
                    <td className="py-4 text-sm text-muted">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-sm border border-gold/20 bg-graphite/50 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
            <p className="text-sm text-muted">{pricingConfig.disclaimer}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeading
            eyebrow="Recurring Routes"
            title="Business Route Pricing"
            description="Businesses with ongoing delivery needs may receive pricing based on route frequency, number of stops, distance, and item requirements. Contact us to discuss a recurring route plan."
            align="center"
            className="mb-0"
          />
          <Button asChild className="mt-8">
            <Link href="/services/recurring-route-services">
              Learn About Recurring Routes
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Quick Quote"
            title="Request Pricing"
            description="Submit your route and item details for a custom quote. This is a quote request — not a confirmed delivery."
            align="center"
            className="mb-10"
          />
          <QuoteForm />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.emailHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
            >
              <Mail className="size-4" aria-hidden />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title="Get Your Custom Quote Today"
            description="Every delivery is unique. Tell us about your route and we'll confirm availability and final pricing."
          />
        </div>
      </AnimatedSection>
    </>
  );
}

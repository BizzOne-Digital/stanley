import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { siteConfig, legalNotices } from "@/data/site";
import { services, getServiceBySlug } from "@/data/services";
import { deliveryTypeComparison } from "@/data/pricing";
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { PricingPanel } from "@/components/sections/PricingPanel";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";
import { ServicesFilterGrid } from "./services-filter-grid";

export const metadata = createPageMetadata({
  title: `Courier Services in New Orleans | ${siteConfig.name}`,
  description:
    "Same-day, rush, scheduled, medical-office, legal, business, and recurring courier services throughout New Orleans.",
  path: "/services",
});

const industryUseCases = [
  {
    industry: "Healthcare & Medical Offices",
    description:
      "Medical-office courier support for inter-office transfers, supply runs, and laboratory-related coordination.",
    services: ["medical-courier-services", "scheduled-delivery", "recurring-route-services"],
  },
  {
    industry: "Law Firms & Professional Offices",
    description:
      "Local document delivery between offices, courthouses, and business locations throughout New Orleans.",
    services: ["legal-document-delivery", "same-day-delivery", "rush-expedited-delivery"],
  },
  {
    industry: "Small Businesses & Dealerships",
    description:
      "Business-to-business delivery, parts movement, and inter-office transfers on your schedule.",
    services: ["business-to-business-delivery", "local-pickup-delivery", "on-demand-courier-service"],
  },
] as const;

export default function ServicesPage() {
  const recurringService = getServiceBySlug("recurring-route-services");
  const afterHoursService = getServiceBySlug("after-hours-emergency-delivery");

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <PageHero
        title="Courier Services"
        eyebrow="New Orleans Delivery"
        description="Professional same-day, rush, scheduled, medical-office, legal, business, and recurring courier services throughout New Orleans."
        breadcrumbs={[{ label: "Services" }]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="All Services"
            title="Find the Right Delivery Option"
            description="Filter by category or browse our complete courier service lineup."
            className="mb-10"
          />
          <ServicesFilterGrid services={services} />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Industry Use Cases"
            title="Courier Support by Industry"
            description="How New Orleans businesses and professionals use our delivery services."
            className="mb-12"
          />
          <div className="grid gap-8 lg:grid-cols-3">
            {industryUseCases.map(({ industry, description, services: slugs }) => (
              <article
                key={industry}
                className="rounded-sm border border-gold/20 bg-graphite/50 p-6 metallic-edge"
              >
                <h3 className="font-display text-lg uppercase tracking-wide text-gold">
                  {industry}
                </h3>
                <p className="mt-3 text-sm text-muted">{description}</p>
                <ul className="mt-4 space-y-2">
                  {slugs.map((slug) => {
                    const service = getServiceBySlug(slug);
                    return service ? (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          className="inline-flex items-center gap-2 text-sm text-ivory transition-colors hover:text-gold"
                        >
                          <ArrowRight className="size-3 text-gold" aria-hidden />
                          {service.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Delivery Types"
            title="Scheduled vs. On-Demand"
            description="Choose the timing model that fits your workflow."
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gold/20">
              <Image
                src={images.processFlow.src}
                alt={images.processFlow.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-gold/20">
              <Image
                src={images.businessDelivery.src}
                alt={images.businessDelivery.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Important Notice"
                title="Medical & Legal Delivery Guidelines"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-sm border border-gold/20 bg-graphite/50 p-5">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <div className="space-y-3 text-sm text-muted">
                    <p>{legalNotices.medicalWarning}</p>
                    <p>{legalNotices.medicalReview}</p>
                    <p>{legalNotices.acceptanceNotice}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">
                  Legal document delivery covers local courier transport between locations.
                  We do not provide process serving, legal filing authority, notarization, or
                  certified chain-of-custody services unless separately confirmed.
                </p>
              </div>
            </div>
            <ImageReveal
              src={images.medicalOffice.src}
              alt={images.medicalOffice.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20"
            />
          </div>
        </div>
      </AnimatedSection>

      {recurringService && (
        <AnimatedSection variant="fadeIn" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <ImageReveal
                src={images.recurringRoutes.src}
                alt={images.recurringRoutes.alt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                containerClassName="aspect-[4/3] rounded-sm border border-gold/20"
              />
              <div>
                <SectionHeading
                  eyebrow="Recurring Routes"
                  title={recurringService.title}
                  description={recurringService.overview}
                />
                <Button asChild className="mt-8">
                  <Link href={`/services/${recurringService.slug}`}>
                    Learn About Recurring Routes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {afterHoursService && (
        <AnimatedSection variant="fadeUp" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="After-Hours"
                  title={afterHoursService.title}
                  description={afterHoursService.overview}
                />
                <div className="mt-6 flex items-start gap-3 rounded-sm border border-gold/20 bg-graphite/50 p-5">
                  <Clock className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <p className="text-sm text-muted">{legalNotices.afterHoursNotice}</p>
                </div>
                <Button asChild variant="secondary" className="mt-8">
                  <Link href={`/services/${afterHoursService.slug}`}>
                    After-Hours Details
                  </Link>
                </Button>
              </div>
              <ImageReveal
                src={images.afterHours.src}
                alt={images.afterHours.alt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                containerClassName="aspect-[4/3] rounded-sm border border-gold/20"
              />
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <PricingPanel compact />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title="Need a Custom Delivery Solution?"
            description="Tell us about your route, timing, and handling requirements for a personalized quote."
          />
        </div>
      </AnimatedSection>
    </>
  );
}

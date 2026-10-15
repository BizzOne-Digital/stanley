import Link from "next/link";
import {
  Building2,
  Stethoscope,
  Scale,
  Car,
  User,
  FlaskConical,
  Pill,
  ArrowRight,
  Clock,
  MapPin,
  MessageSquare,
  Route,
} from "lucide-react";
import { siteConfig, audienceList, legalNotices } from "@/data/site";
import { getServiceBySlug } from "@/data/services";
import { homepageFaqs } from "@/data/faqs";
import { deliveryProcess } from "@/data/process";
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingPanel } from "@/components/sections/PricingPanel";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "./home-hero";

export const metadata = createPageMetadata({
  title: `${siteConfig.name} | New Orleans Courier Service`,
  description: siteConfig.description,
  path: "/",
});

const coreServiceSlugs = [
  "same-day-delivery",
  "rush-expedited-delivery",
  "scheduled-delivery",
  "medical-courier-services",
  "legal-document-delivery",
  "business-to-business-delivery",
] as const;

const coreServices = coreServiceSlugs
  .map((slug) => getServiceBySlug(slug))
  .filter(Boolean);

const audienceIcons = [
  Stethoscope,
  Building2,
  Pill,
  FlaskConical,
  Scale,
  Building2,
  Car,
  User,
] as const;

const newOrleansValues = [
  {
    title: "Local Knowledge",
    description:
      "Routes and timing shaped by New Orleans neighborhoods, traffic patterns, and business hours.",
    icon: MapPin,
  },
  {
    title: "Flexible Options",
    description:
      "Same-day, rush, scheduled, and recurring delivery support to match how you operate.",
    icon: Route,
  },
  {
    title: "Clear Communication",
    description:
      "Expectations confirmed before pickup so you know what to expect throughout the run.",
    icon: MessageSquare,
  },
  {
    title: "Quote-Based Service",
    description:
      "Every route is reviewed individually — pricing confirmed after we understand your needs.",
    icon: Clock,
  },
] as const;

export default function HomePage() {
  const rushService = getServiceBySlug("rush-expedited-delivery");
  const recurringService = getServiceBySlug("recurring-route-services");

  return (
    <>
      <JsonLd data={faqJsonLd(homepageFaqs)} />

      <HomeHero />

      {/* Audience strip */}
      <AnimatedSection
        variant="fadeUp"
        className="border-y border-gold/10 bg-carbon py-10"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="mb-6 text-center font-display text-xs uppercase tracking-[0.25em] text-gold">
            Serving New Orleans Businesses &amp; Individuals
          </p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {audienceList.map((audience, index) => {
              const Icon = audienceIcons[index] ?? Building2;
              return (
                <li
                  key={audience}
                  className="flex flex-col items-center gap-2 rounded-sm border border-gold/10 bg-graphite/50 p-4 text-center transition-colors hover:border-gold/30"
                >
                  <Icon className="size-5 text-gold" aria-hidden />
                  <span className="text-xs font-medium text-ivory">{audience}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </AnimatedSection>

      {/* Core services */}
      <AnimatedSection
        variant="fadeUp"
        className="py-16 md:py-24"
        as="section"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Courier Solutions for Every Timeline"
            description="From same-day urgency to scheduled business routes — professional local delivery throughout New Orleans."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) =>
              service ? (
                <ServiceCard key={service.slug} service={service} />
              ) : null,
            )}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/services">
                View All Services
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Built for New Orleans */}
      <AnimatedSection
        variant="fadeIn"
        className="border-y border-gold/10 bg-carbon py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Built for New Orleans"
                title="Local Courier Service You Can Count On"
                description={`${siteConfig.name} is built around the rhythms of New Orleans — flexible delivery options, clear communication, and quote-based pricing for every route.`}
              />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {newOrleansValues.map(({ title, description, icon: Icon }) => (
                  <li
                    key={title}
                    className="rounded-sm border border-gold/10 bg-graphite/50 p-5"
                  >
                    <Icon className="mb-3 size-5 text-gold" aria-hidden />
                    <h3 className="font-display text-sm uppercase tracking-wide text-ivory">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ImageReveal
              src={images.routeMap.src}
              alt={images.routeMap.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Delivery process */}
      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="How Delivery Works"
            description="From request to completion — clear steps with no surprises."
            align="center"
          />
          <ProcessSteps steps={deliveryProcess} />
        </div>
      </AnimatedSection>

      {/* Time-sensitive spotlight */}
      {rushService && (
        <AnimatedSection
          variant="fadeUp"
          className="border-y border-gold/10 bg-carbon py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <ImageReveal
                src={rushService.image}
                alt={rushService.imageAlt}
                width={800}
                height={400}
                sizes="(max-width: 1024px) 100vw, 50vw"
                containerClassName="rounded-sm border border-gold/20 bg-black metallic-edge order-2 lg:order-1"
              />
              <div className="order-1 lg:order-2">
                <SectionHeading
                  eyebrow="Time-Sensitive Delivery"
                  title="When Every Hour Matters"
                  description={rushService.overview}
                />
                <ul className="mt-6 space-y-3">
                  {rushService.useCases.slice(0, 3).map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                      {useCase}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted">{rushService.disclaimer}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href={`/services/${rushService.slug}`}>Learn More</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/request-a-quote">Request Rush Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Medical & professional support */}
      <AnimatedSection variant="fadeIn" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Professional Support"
                title="Medical-Office & Legal Courier Support"
                description="Healthcare facilities, medical offices, pharmacies, laboratories, and law firms rely on timely local delivery. We provide medical-office courier support and legal document delivery with careful, review-first handling."
              />
              <div className="mt-6 space-y-4 rounded-sm border border-gold/20 bg-graphite/50 p-5">
                <p className="text-sm text-muted">{legalNotices.medicalReview}</p>
                <p className="text-sm text-muted">{legalNotices.acceptanceNotice}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="secondary">
                  <Link href="/services/medical-courier-services">
                    Medical Courier
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/services/legal-document-delivery">
                    Legal Documents
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageReveal
                src={images.medicalOffice.src}
                alt={images.medicalOffice.alt}
                width={400}
                height={300}
                sizes="(max-width: 640px) 50vw, 25vw"
                containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
              />
              <ImageReveal
                src={images.legalDocuments.src}
                alt={images.legalDocuments.alt}
                width={400}
                height={300}
                sizes="(max-width: 640px) 50vw, 25vw"
                containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge mt-8"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Recurring routes */}
      {recurringService && (
        <AnimatedSection
          variant="fadeUp"
          className="border-y border-gold/10 bg-carbon py-16 md:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  eyebrow="Recurring Routes"
                  title="Consistent Delivery for Regular Business Needs"
                  description={recurringService.overview}
                />
                <Button asChild className="mt-8">
                  <Link href={`/services/${recurringService.slug}`}>
                    Explore Recurring Routes
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
              <ImageReveal
                src={images.recurringRoutes.src}
                alt={images.recurringRoutes.alt}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
              />
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Pricing preview */}
      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <PricingPanel compact showVisual />
        </div>
      </AnimatedSection>

      {/* Service area */}
      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Service Area"
              title="New Orleans & Surrounding Areas"
              description={`${siteConfig.serviceArea} Routes to surrounding areas are confirmed when you request a quote.`}
            />
            <ImageReveal
              src={images.serviceArea.src}
              alt={images.serviceArea.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ preview */}
      <AnimatedSection variant="fadeUp" className="border-t border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            description="Quick answers about our New Orleans courier service."
            align="center"
            className="mb-10"
          />
          <FAQAccordion items={homepageFaqs} />
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="text-sm font-semibold uppercase tracking-wide text-gold transition-colors hover:text-gold-bright"
            >
              More questions? Contact us
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title="Ready for Reliable New Orleans Delivery?"
            description="Call, email, or request a quote for same-day, scheduled, and recurring courier service."
          />
        </div>
      </AnimatedSection>
    </>
  );
}

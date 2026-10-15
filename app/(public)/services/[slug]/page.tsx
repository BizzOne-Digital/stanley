import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from "@/data/services";
import { siteConfig, legalNotices } from "@/data/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service Not Found",
      description: "The requested courier service could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug);
  const isMedical = service.category === "medical";
  const isLegal = service.category === "legal";
  const isAfterHours = service.category === "after-hours";

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: service.title, url: `${siteConfig.url}/services/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, serviceJsonLd(service)]} />

      <PageHero
        title={service.title}
        eyebrow={service.shortTitle}
        description={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title={`${service.shortTitle} Courier Service`}
                description={service.overview}
              />
              {isMedical && (
                <div className="mt-6 flex items-start gap-3 rounded-sm border border-gold/20 bg-graphite/50 p-5">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <div className="space-y-2 text-sm text-muted">
                    <p>{legalNotices.medicalFormWarning}</p>
                    <p>{legalNotices.medicalReview}</p>
                  </div>
                </div>
              )}
              {isLegal && (
                <p className="mt-6 text-sm text-muted">{service.disclaimer}</p>
              )}
            </div>
            <ImageReveal
              src={service.image}
              alt={service.imageAlt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Customer Types"
                title="Who Uses This Service"
                className="mb-6"
              />
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.customerTypes.map((type) => (
                  <li
                    key={type}
                    className="rounded-sm border border-gold/10 bg-graphite/50 px-4 py-3 text-sm text-ivory"
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Use Cases"
                title="Typical Delivery Scenarios"
                className="mb-6"
              />
              <ul className="space-y-3">
                {service.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ProcessSteps
            steps={service.process}
            title="Service Process"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Requirements"
                title="What We Need From You"
                className="mb-6"
              />
              <ul className="space-y-3">
                {service.requirements.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Important Notice"
                title="Availability & Handling"
                className="mb-6"
              />
              <div className="rounded-sm border border-gold/20 bg-graphite/50 p-6">
                <p className="text-sm text-muted">{service.disclaimer}</p>
                {isAfterHours && (
                  <p className="mt-4 text-sm text-muted">{legalNotices.afterHoursNotice}</p>
                )}
                {!isMedical && !isLegal && (
                  <p className="mt-4 text-sm text-muted">{legalNotices.acceptanceNotice}</p>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/request-a-quote">Request a Quote</Link>
                </Button>
                <Button href={siteConfig.phoneHref} variant="secondary">
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {relatedServices.length > 0 && (
        <AnimatedSection variant="fadeIn" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading
              eyebrow="Related Services"
              title="You May Also Need"
              className="mb-10"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection variant="fadeUp" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title={`Request ${service.shortTitle} Delivery`}
            description={`Get a custom quote for ${service.title.toLowerCase()} throughout New Orleans.`}
          />
        </div>
      </AnimatedSection>
    </>
  );
}

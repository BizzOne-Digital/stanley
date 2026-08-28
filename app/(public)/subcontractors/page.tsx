import { CheckCircle2, Truck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { subcontractorContent } from "@/data/subcontractor";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SubcontractorForm } from "@/components/forms/SubcontractorForm";

export const metadata = createPageMetadata({
  title: "Drive With Us | Independent Delivery Driver Jobs",
  description: `Join ${siteConfig.name} as an independent delivery driver. Local routes, flexible scheduling, and growth opportunities in the New Orleans area.`,
  path: "/subcontractors",
});

export default function SubcontractorsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Drive With Us", url: `${siteConfig.url}/subcontractors` },
  ]);

  const { hero, position, requirements, benefits, growth } = subcontractorContent;

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <PageHero
        title={hero.title}
        eyebrow={hero.eyebrow}
        description={hero.tagline}
        breadcrumbs={[{ label: "Drive With Us" }]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <blockquote className="border-l-4 border-gold pl-6 text-muted leading-relaxed">
                {hero.intro}
              </blockquote>

              <div className="mt-10 rounded-sm border border-gold/20 bg-carbon p-6 metallic-edge">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-gold" aria-hidden />
                  <h2 className="font-display text-xl uppercase tracking-wide text-ivory">
                    Positions Available
                  </h2>
                </div>
                <h3 className="mt-4 font-semibold text-gold">{position.title}</h3>
                <ul className="mt-4 space-y-2">
                  {position.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Requirements"
                title="What We're Looking For"
                className="mb-6"
              />
              <ul className="space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Benefits"
            title="Why Drive With Conley?"
            align="center"
            className="mb-12"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-sm border border-gold/20 bg-graphite/50 p-6 metallic-edge"
              >
                <h3 className="font-display text-lg uppercase tracking-wide text-gold">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Growth"
            title={growth.title}
            description={growth.description}
            align="center"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection
        variant="fadeUp"
        className="border-t border-gold/10 bg-carbon py-16 md:py-24"
      >
        <div id="apply" className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Ready to Get Started?"
            title="Application Form"
            description="We're building our delivery team. Fill out the application below and tell us a little about yourself."
            align="center"
            className="mb-10"
          />
          <SubcontractorForm />
        </div>
      </AnimatedSection>
    </>
  );
}

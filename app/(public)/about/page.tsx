import Link from "next/link";
import { Shield, MessageSquare, Route, Clock } from "lucide-react";
import { siteConfig, audienceList } from "@/data/site";
import { deliveryProcess } from "@/data/process";
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";

export const metadata = createPageMetadata({
  title: `About ${siteConfig.name} | New Orleans Courier`,
  description: siteConfig.about,
  path: "/about",
});

const values = [
  {
    title: "Dependability",
    description:
      "Clear pickup and delivery expectations confirmed before every run — no surprises.",
    icon: Shield,
  },
  {
    title: "Communication",
    description:
      "Responsive updates so you know where your delivery stands throughout the process.",
    icon: MessageSquare,
  },
  {
    title: "Flexibility",
    description:
      "Same-day, rush, scheduled, and recurring options to fit how your business operates.",
    icon: Route,
  },
  {
    title: "Responsiveness",
    description:
      "Quote requests reviewed promptly with availability and pricing confirmed upfront.",
    icon: Clock,
  },
] as const;

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />

      <PageHero
        title={`About ${siteConfig.name}`}
        eyebrow="New Orleans Courier Service"
        description={siteConfig.about}
        breadcrumbs={[{ label: "About" }]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="Professional Local Courier Support"
                description={siteConfig.about}
              />
              <p className="mt-6 text-muted leading-relaxed">
                We help healthcare facilities, professional offices, local businesses, and
                individuals move time-sensitive items with clear communication and dependable
                service. Every delivery is reviewed individually — acceptance is subject to
                service capability and confirmation.
              </p>
            </div>
            <ImageReveal
              src={images.aboutTeam.src}
              alt={images.aboutTeam.alt}
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
          <SectionHeading
            eyebrow="Our Mission"
            title="Moving Important Items Without Delays"
            description={siteConfig.mission}
            align="center"
            className="mb-12"
          />
          <div className="mx-auto max-w-3xl rounded-sm border border-gold/20 bg-graphite/50 p-8 text-center metallic-edge">
            <p className="font-display text-xl uppercase tracking-wide text-gold md:text-2xl">
              &ldquo;{siteConfig.mission}&rdquo;
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Service Philosophy"
            title="Quote-Based, Communication-First Delivery"
            description="We believe reliable courier service starts with understanding your route, timing, and handling needs before pickup begins."
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="rounded-sm border border-gold/10 bg-carbon p-6 metallic-edge"
              >
                <Icon className="mb-4 size-6 text-gold" aria-hidden />
                <h3 className="font-display text-lg uppercase tracking-wide text-ivory">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ImageReveal
              src={images.heroSkyline.src}
              alt={images.heroSkyline.alt}
              width={1200}
              height={520}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="rounded-sm border border-gold/20 bg-black"
            />
            <div>
              <SectionHeading
                eyebrow="New Orleans Focus"
                title="Built Around Local Routes"
                description={`${siteConfig.name} operates throughout ${siteConfig.serviceAreaShort}. We understand that local knowledge, flexible timing, and clear communication matter as much as speed.`}
              />
              <p className="mt-4 text-sm text-muted">
                Service to surrounding areas is subject to confirmation based on route and
                availability when you request a quote.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Businesses & Individuals Across New Orleans"
            className="mb-10"
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {audienceList.map((audience) => (
              <li
                key={audience}
                className="rounded-sm border border-gold/10 bg-graphite/50 px-4 py-5 text-center text-sm font-medium text-ivory"
              >
                {audience}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-t border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Process"
            title="Our Delivery Process"
            description="Clear communication at every step of your delivery."
            align="center"
          />
          <ProcessSteps steps={deliveryProcess} />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title={`Partner With ${siteConfig.shortName}`}
            description="Request a quote or call to discuss your delivery needs throughout New Orleans."
          />
        </div>
      </AnimatedSection>
    </>
  );
}

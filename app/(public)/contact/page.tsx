import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { homepageFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/layout/PageHero";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { BusinessHoursDisplay } from "@/components/sections/BusinessHoursDisplay";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "@/components/layout/LogoLockup";

export const metadata = createPageMetadata({
  title: `Contact ${siteConfig.name} | New Orleans Courier`,
  description: `Contact ${siteConfig.name} for same-day and scheduled courier service in New Orleans. Call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Contact", url: `${siteConfig.url}/contact` },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbs, faqJsonLd(homepageFaqs)]} />

      <PageHero
        title="Contact Us"
        eyebrow="Get in Touch"
        description={`Reach ${siteConfig.shortName} by phone, email, or the contact form below. We serve ${siteConfig.serviceAreaShort}.`}
        breadcrumbs={[{ label: "Contact" }]}
      />

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <LogoLockup size="lg" />

              <div className="rounded-sm border border-gold/20 bg-carbon p-6 metallic-edge">
                <h2 className="font-display text-lg uppercase tracking-wide text-ivory">
                  Direct Contact
                </h2>
                <ul className="mt-6 space-y-4">
                  <li>
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center gap-3 text-ivory transition-colors hover:text-gold"
                    >
                      <Phone className="size-5 text-gold" aria-hidden />
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-muted">
                          Phone
                        </span>
                        {siteConfig.phoneDisplay}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.emailHref}
                      className="flex items-center gap-3 text-ivory transition-colors hover:text-gold"
                    >
                      <Mail className="size-5 text-gold" aria-hidden />
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-muted">
                          Email
                        </span>
                        {siteConfig.email}
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-ivory">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted">
                        Service Area
                      </span>
                      {siteConfig.serviceArea}
                    </span>
                  </li>
                </ul>
              </div>

              <BusinessHoursDisplay />

              <Button asChild className="w-full">
                <Link href="/request-a-quote">Request a Quote</Link>
              </Button>
            </div>

            <div className="lg:col-span-2">
              <SectionHeading
                eyebrow="Send a Message"
                title="Contact Form"
                description="Describe your delivery needs. Do not include protected health information or patient details."
                className="mb-8"
              />
              <ContactForm />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="border-y border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Coverage Map"
                title="New Orleans Service Area"
                description={`${siteConfig.serviceArea} This map-style visual represents our service coverage — not a physical office location.`}
              />
              <p className="mt-4 text-sm text-muted">
                Routes to surrounding areas are confirmed when you request a quote.
              </p>
            </div>
            <ImageReveal
              src={images.contactMap.src}
              alt={images.contactMap.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <ImageReveal
              src={images.localPickup.src}
              alt={images.localPickup.alt}
              width={600}
              height={450}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
            <ImageReveal
              src={images.heroVan.src}
              alt={images.heroVan.alt}
              width={600}
              height={450}
              sizes="(max-width: 1024px) 100vw, 50vw"
              containerClassName="aspect-[4/3] rounded-sm border border-gold/20 metallic-edge"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeUp" className="border-t border-gold/10 bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            align="center"
            className="mb-10"
          />
          <FAQAccordion items={homepageFaqs} />
        </div>
      </AnimatedSection>

      <AnimatedSection variant="fadeIn" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <CTABanner
            title="Prefer to Request a Detailed Quote?"
            description="Use our multi-step quote form for route details, item information, and handling requirements."
            showQuote
          />
        </div>
      </AnimatedSection>
    </>
  );
}

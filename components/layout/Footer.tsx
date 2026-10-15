import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import {
  businessHours,
  legalNotices,
  navigation,
  siteConfig,
} from "@/data/site";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
};

const footerNav = navigation.filter((item) => item.href !== "/request-a-quote");

const quickServices = [
  { label: "Same-Day Delivery", href: "/services/same-day-delivery" },
  { label: "Rush & Expedited", href: "/services/rush-expedited-delivery" },
  { label: "Medical Courier", href: "/services/medical-courier-services" },
  { label: "Legal Documents", href: "/services/legal-document-delivery" },
] as const;

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-gold/25 bg-gradient-to-b from-carbon to-black text-sm text-muted",
        className,
      )}
    >
      <div className="mx-auto min-w-0 max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
        <div className="border-b border-gold/15 pb-10 lg:pb-12">
          <div className="flex flex-col items-center text-center">
            <LogoLockup
              size="md"
              showText={false}
              className="justify-center"
              imageClassName="h-16 w-auto max-w-[14rem] sm:h-20 sm:max-w-[18rem] lg:h-24 lg:max-w-[22rem]"
            />
            <p className="mt-4 max-w-2xl font-display text-xs uppercase tracking-[0.25em] text-gold/80">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            <p className="max-w-sm leading-relaxed text-ivory/75">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild variant="primary" size="sm">
                <Link href="/request-a-quote">Request a Quote</Link>
              </Button>
              <Button href={siteConfig.phoneHref} variant="secondary" size="sm">
                <Phone className="size-4" aria-hidden />
                Call Now
              </Button>
            </div>
          </div>

          <FooterColumn title="Navigation" className="lg:col-span-2">
            <ul className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/80 transition-colors hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="sm:col-span-2 lg:col-span-1">
                <Link
                  href="/request-a-quote"
                  className="inline-flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-gold-bright"
                >
                  Request a Quote
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Services" className="lg:col-span-2">
            <ul className="space-y-2.5">
              {quickServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ivory/80 transition-colors hover:text-gold-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-gold-bright"
                >
                  All Services
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact" className="lg:col-span-2">
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-gold-bright"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-gold/20 bg-black/40">
                    <Phone className="size-4 text-gold" aria-hidden />
                  </span>
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex items-center gap-2.5 break-all text-ivory/80 transition-colors hover:text-gold-bright"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-gold/20 bg-black/40">
                    <Mail className="size-4 text-gold" aria-hidden />
                  </span>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ivory/80">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-gold/20 bg-black/40">
                  <MapPin className="size-4 text-gold" aria-hidden />
                </span>
                <span>{siteConfig.serviceAreaShort}</span>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Hours" className="lg:col-span-2">
            <dl className="space-y-3">
              {businessHours.map((entry) => (
                <div key={entry.day} className="border-b border-gold/10 pb-3 last:border-0 last:pb-0">
                  <dt className="font-medium text-ivory">{entry.day}</dt>
                  <dd className="mt-0.5 text-xs leading-relaxed">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </FooterColumn>
        </div>

        <div className="mt-10 rounded-sm border border-gold/15 bg-black/30 p-4 sm:p-5">
          <ul className="grid gap-3 text-xs leading-relaxed sm:grid-cols-3 sm:gap-4">
            <li>{legalNotices.quoteDisclaimer}</li>
            <li>{legalNotices.medicalWarning}</li>
            <li>{legalNotices.afterHoursNotice}</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-gold/10 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display uppercase tracking-[0.15em] text-gold/70">
            New Orleans Courier Service
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Home, ArrowLeft, Phone, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "@/components/layout/LogoLockup";

export const metadata = createPageMetadata({
  title: `Page Not Found | ${siteConfig.name}`,
  description: `The page you are looking for could not be found. Return to ${siteConfig.name} homepage or request a courier quote.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-4 py-24 map-grid">
      <div className="relative mx-auto max-w-lg text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <LogoLockup size="lg" className="relative mb-8 justify-center" showText={false} />

        <p className="relative font-display text-8xl font-bold uppercase tracking-wide gold-gradient-text">
          404
        </p>
        <h1 className="relative mt-4 font-display text-2xl uppercase tracking-wide text-ivory md:text-3xl">
          Route Not Found
        </h1>
        <p className="relative mt-4 text-muted">
          The page you are looking for does not exist or may have been moved. Let us
          help you get back on route.
        </p>

        <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-5" aria-hidden />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/services">
              <ArrowLeft className="size-5" aria-hidden />
              View Services
            </Link>
          </Button>
        </div>

        <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
          >
            <Phone className="size-4" aria-hidden />
            {siteConfig.phoneDisplay}
          </a>
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
          >
            <FileText className="size-4" aria-hidden />
            Request a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}

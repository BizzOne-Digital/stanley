import Link from "next/link";
import { Phone, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function CTABanner({
  title = "Ready to schedule your delivery?",
  description = `Contact ${siteConfig.name} for a custom quote or call us directly.`,
  showQuote = true,
}: {
  title?: string;
  description?: string;
  showQuote?: boolean;
}) {
  return (
    <section className="w-full min-w-0 overflow-x-clip border-y border-gold/20 bg-carbon py-16 md:py-20">
      <div className="mx-auto min-w-0 max-w-7xl px-4 text-center lg:px-8">
        <h2 className="break-words font-display text-3xl font-bold uppercase text-ivory md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ivory/75">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {showQuote && (
            <Button asChild variant="primary" size="lg">
              <Link href="/request-a-quote">
                <FileText className="size-4" aria-hidden="true" />
                Request a Quote
              </Link>
            </Button>
          )}
          <Button asChild variant="secondary" size="lg">
            <a href={siteConfig.phoneHref}>
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={siteConfig.emailHref}>
              <Mail className="size-4" aria-hidden="true" />
              Email Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

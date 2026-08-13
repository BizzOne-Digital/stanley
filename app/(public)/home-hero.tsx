"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-black to-black" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-20 lg:px-8">
        <div className="max-w-3xl text-center lg:text-left">
          <SplitText
            as="h1"
            text={siteConfig.headline}
            className="break-words font-display text-4xl font-bold uppercase leading-tight text-ivory sm:text-5xl md:text-6xl lg:text-7xl"
          />
          <p className="mt-3 break-words font-display text-xl uppercase tracking-wider text-gold sm:text-3xl md:text-4xl">
            {siteConfig.headlineSecondary}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/80 lg:mx-0">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button asChild variant="primary" size="lg">
              <Link href="/request-a-quote">Request a Quote</Link>
            </Button>
            <Button href={siteConfig.phoneHref} variant="secondary" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

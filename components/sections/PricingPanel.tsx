"use client";

import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { pricingConfig, pricingFactors } from "@/data/pricing";
import { images } from "@/data/images";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type PricingPanelProps = {
  className?: string;
  compact?: boolean;
  showVisual?: boolean;
};

export function PricingPanel({
  className,
  compact = false,
  showVisual = false,
}: PricingPanelProps) {
  const previewFactors = compact ? pricingFactors.slice(0, 4) : pricingFactors;

  const content = (
    <>
      <div className={cn("text-center", showVisual && "lg:text-left")}>
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Transparent Pricing</p>
        <h2
          id="pricing-panel-heading"
          className="mt-2 font-display text-3xl uppercase tracking-wide text-ivory sm:text-4xl"
        >
          Starting at ${pricingConfig.startingPrice}
        </h2>
        <p className="mt-3 max-w-xl text-muted">{pricingConfig.subheadline}</p>
      </div>

      <ul
        className={cn(
          "mt-6 grid gap-3",
          compact ? "sm:grid-cols-2" : "mt-8 sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {previewFactors.map((factor) => (
          <li
            key={factor.title}
            className="rounded-sm border border-gold/10 bg-graphite/50 p-3 sm:p-4"
          >
            <h3 className="text-sm font-semibold text-gold">{factor.title}</h3>
            <p className="mt-1 text-sm text-muted">{factor.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-3 rounded-sm border border-gold/20 bg-black/40 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
        <p className="text-sm text-muted">
          {compact ? pricingConfig.disclaimer : `${pricingConfig.disclaimer} ${pricingConfig.variationNote}`}
        </p>
      </div>

      <div
        className={cn(
          "mt-5 flex flex-wrap items-center gap-3",
          showVisual ? "justify-center lg:justify-start" : "justify-center",
        )}
      >
        <Button asChild size="lg">
          <Link href="/request-a-quote">
            Get a Custom Quote
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
        {compact && (
          <Button asChild variant="secondary" size="lg">
            <Link href="/pricing">View Pricing Details</Link>
          </Button>
        )}
      </div>
    </>
  );

  if (showVisual) {
    return (
      <section
        className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-12", className)}
        aria-labelledby="pricing-panel-heading"
      >
        <div>{content}</div>
        <ImageReveal
          src={images.pricingVisual.src}
          alt={images.pricingVisual.alt}
          width={700}
          height={320}
          sizes="(max-width: 1024px) 100vw, 50vw"
          containerClassName="rounded-sm border border-gold/20 bg-black"
        />
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-sm border border-gold/30 bg-carbon p-6 sm:p-8 metallic-edge",
        className,
      )}
      aria-labelledby="pricing-panel-heading"
    >
      {content}
    </section>
  );
}

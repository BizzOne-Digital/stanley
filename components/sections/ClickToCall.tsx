"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type ClickToCallProps = {
  className?: string;
  variant?: "button" | "link" | "banner";
  label?: string;
};

export function ClickToCall({
  className,
  variant = "button",
  label,
}: ClickToCallProps) {
  const displayLabel = label ?? siteConfig.phoneDisplay;

  if (variant === "link") {
    return (
      <a
        href={siteConfig.phoneHref}
        className={cn(
          "inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-bright",
          className
        )}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        <span>{displayLabel}</span>
      </a>
    );
  }

  if (variant === "banner") {
    return (
      <a
        href={siteConfig.phoneHref}
        className={cn(
          "flex items-center justify-center gap-3 rounded-sm bg-gold px-6 py-4 font-display text-lg uppercase tracking-wider text-black transition-colors hover:bg-gold-bright",
          className
        )}
      >
        <Phone className="h-6 w-6" aria-hidden />
        <span>Call {displayLabel}</span>
      </a>
    );
  }

  return (
    <a
      href={siteConfig.phoneHref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 font-semibold text-black transition-colors hover:bg-gold-bright",
        className
      )}
    >
      <Phone className="h-5 w-5" aria-hidden />
      <span>{displayLabel}</span>
    </a>
  );
}

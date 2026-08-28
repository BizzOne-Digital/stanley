"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export type LogoLockupProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showText?: boolean;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { px: 44, className: "h-11 w-11", text: "text-sm" },
  md: { px: 56, className: "h-14 w-14", text: "text-base" },
  lg: { px: 160, className: "h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48", text: "text-lg" },
} as const;

export function LogoLockup({
  className,
  imageClassName,
  textClassName,
  showText = true,
  priority = false,
  size = "md",
}: LogoLockupProps) {
  const [imageError, setImageError] = useState(false);
  const sizes = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center gap-3", className)}
      aria-label={`${siteConfig.name} — Home`}
    >
      {!imageError ? (
        <Image
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          width={sizes.px}
          height={sizes.px}
          priority={priority}
          onError={() => setImageError(true)}
          className={cn(
            sizes.className,
            "shrink-0 object-contain transition-transform duration-300 group-hover:scale-105",
            imageClassName,
          )}
        />
      ) : (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-sm border border-gold/40 bg-carbon font-display text-xs font-bold uppercase tracking-wider text-gold",
            sizes.className,
            imageClassName,
          )}
          aria-hidden="true"
        >
          CL
        </span>
      )}
      {showText ? (
        <span
          className={cn(
            "font-display font-semibold uppercase leading-tight tracking-wide text-ivory transition-colors group-hover:text-gold-bright",
            sizes.text,
            textClassName,
          )}
        >
          {siteConfig.name}
        </span>
      ) : null}
    </Link>
  );
}

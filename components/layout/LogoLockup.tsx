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
  sm: { className: "h-10 w-auto max-w-[9.5rem]", text: "text-sm" },
  md: { className: "h-14 w-auto max-w-[12rem]", text: "text-base" },
  lg: {
    className:
      "h-28 w-auto max-w-[min(100%,20rem)] sm:h-36 sm:max-w-[24rem] md:h-44 md:max-w-[28rem] lg:h-52 lg:max-w-[32rem]",
    text: "text-lg",
  },
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
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          priority={priority}
          onError={() => setImageError(true)}
          className={cn(
            sizes.className,
            "shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.02]",
            imageClassName,
          )}
        />
      ) : (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-sm border border-gold/40 bg-carbon px-3 py-2 font-display text-xs font-bold uppercase tracking-wider text-gold",
            imageClassName,
          )}
          aria-hidden="true"
        >
          Conley
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/uploads/resolve";

export function ImageReveal({
  src,
  alt,
  className,
  containerClassName,
  width = 800,
  height = 500,
  direction = "left",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  direction?: "left" | "right" | "up";
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  const reduced = useReducedMotion();
  const isSvg = src.endsWith(".svg");
  const imageSrc = resolveImageUrl(src);
  const useUnoptimized = imageSrc.startsWith("/api/uploads/");
  const objectFit = fit === "contain" || isSvg ? "contain" : "cover";
  const imageClass = cn(
    "block h-auto w-full max-w-full",
    objectFit === "contain" ? "object-contain" : "h-full object-cover",
    className,
  );
  const clipFrom =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : direction === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";

  const wrapperClass = cn(
    "relative max-w-full overflow-hidden metallic-edge",
    containerClassName,
  );

  if (reduced) {
    return (
      <div className={wrapperClass}>
        <Image src={imageSrc} alt={alt} width={width} height={height} className={imageClass} priority={priority} sizes={sizes} unoptimized={useUnoptimized} />
      </div>
    );
  }

  return (
    <motion.div
      className={wrapperClass}
      initial={{ clipPath: clipFrom }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={imageClass}
        priority={priority}
        sizes={sizes}
        unoptimized={useUnoptimized}
      />
    </motion.div>
  );
}

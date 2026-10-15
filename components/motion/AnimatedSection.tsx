"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  defaultTransition,
  motionVariants,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type AnimatedSectionVariant = keyof typeof motionVariants;

export function AnimatedSection({
  children,
  variant = "fadeUp",
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  variant?: AnimatedSectionVariant;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("w-full min-w-0 max-w-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={motionVariants[variant]}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

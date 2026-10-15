"use client";

import { forwardRef, type Ref, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-gold text-black hover:bg-gold-bright focus-visible:ring-gold-bright",
  secondary:
    "border border-gold/60 bg-transparent text-gold hover:border-gold hover:bg-gold/10 focus-visible:ring-gold",
  ghost:
    "bg-transparent text-ivory hover:text-gold-bright focus-visible:ring-gold-bright",
} as const;

const sizeStyles = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-6 text-sm tracking-wide",
  lg: "h-12 px-8 text-sm tracking-wider",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50";

/** Use on Link/anchor in Server Components to avoid asChild hydration issues. */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      href,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const classes = buttonVariants({ variant, size, className });

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        {...(asChild ? props : { type, ...props })}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

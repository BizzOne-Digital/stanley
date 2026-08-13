"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  error?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group flex cursor-pointer items-start gap-3 text-sm text-ivory",
          props.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer sr-only"
            aria-invalid={error || undefined}
            {...props}
          />
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-sm border bg-carbon transition-colors duration-300",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black",
              "peer-checked:border-gold peer-checked:bg-gold [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100",
              error ? "border-error" : "border-graphite group-hover:border-gold/40",
            )}
            aria-hidden="true"
          >
            <Check className="size-3.5 text-black transition-opacity" />
          </span>
        </span>
        {label ? <span className="leading-relaxed">{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

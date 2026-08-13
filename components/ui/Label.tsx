import { type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({
  className,
  children,
  required,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-medium tracking-wide text-ivory",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-1 text-gold" aria-hidden="true">
          *
        </span>
      ) : null}
      {required ? <span className="sr-only"> (required)</span> : null}
    </label>
  );
}

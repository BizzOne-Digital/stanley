import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormErrorProps = {
  id?: string;
  message?: string;
  className?: string;
};

export function FormError({ id, message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "mt-1.5 flex items-start gap-1.5 text-sm text-error",
        className,
      )}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

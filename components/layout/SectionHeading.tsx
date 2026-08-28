import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="break-words font-display text-3xl font-bold uppercase tracking-wide text-ivory md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-px w-16 bg-gradient-to-r from-gold to-transparent",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
    </div>
  );
}

import { Breadcrumbs } from "./Breadcrumbs";
import { RouteLineAnimated } from "@/components/motion/RouteLine";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumbs,
  children,
  className,
  compact = false,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-gold/10 bg-carbon",
        compact ? "py-10 md:py-14" : "py-16 md:py-24 lg:py-28",
        className
      )}
    >
      <div className="absolute inset-0 map-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="break-words font-display text-4xl font-bold uppercase tracking-wide text-ivory md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ivory/75">
            {description}
          </p>
        )}
        {children}
        <div className="mt-8 max-w-xl">
          <RouteLineAnimated />
        </div>
      </div>
    </section>
  );
}

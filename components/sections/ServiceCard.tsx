import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col border border-gold/15 bg-graphite/50 p-6 transition-all duration-300 hover:border-gold/40 hover:bg-graphite",
        className
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-gold">
        {service.shortTitle}
      </span>
      <h3 className="mt-2 font-display text-xl font-bold uppercase text-ivory group-hover:text-gold-bright">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/70">
        {service.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold transition-transform group-hover:translate-x-1">
        Learn more <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

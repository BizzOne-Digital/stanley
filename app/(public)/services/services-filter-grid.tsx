"use client";

import { useState } from "react";
import type { Service } from "@/types";
import { serviceCategories } from "@/data/services";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { cn } from "@/lib/utils";

type ServicesFilterGridProps = {
  services: Service[];
};

export function ServicesFilterGrid({ services }: ServicesFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter services by category"
      >
        {serviceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "rounded-sm border px-4 py-2 font-display text-xs uppercase tracking-wider transition-colors",
              activeCategory === cat.id
                ? "border-gold bg-gold text-black"
                : "border-gold/30 text-muted hover:border-gold hover:text-ivory",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">
          No services match this category.
        </p>
      )}
    </div>
  );
}

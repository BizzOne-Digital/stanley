"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-gold/10 border border-gold/20">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-graphite/50"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
            >
              <span className="font-medium text-ivory">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-gold transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-button-${faq.id}`}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden px-5 transition-all",
                isOpen ? "pb-4" : "pb-0"
              )}
            >
              {isOpen && (
                <p className="text-sm leading-relaxed text-ivory/75">
                  {faq.answer}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

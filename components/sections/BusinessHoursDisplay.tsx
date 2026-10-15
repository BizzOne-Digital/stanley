"use client";

import { Clock } from "lucide-react";
import { businessHours, legalNotices } from "@/data/site";
import { cn } from "@/lib/utils";

type BusinessHoursDisplayProps = {
  className?: string;
  showNotice?: boolean;
};

export function BusinessHoursDisplay({
  className,
  showNotice = true,
}: BusinessHoursDisplayProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-gold/20 bg-carbon p-6 metallic-edge",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-5 w-5 text-gold" aria-hidden />
        <h3 className="font-display text-lg uppercase tracking-wide text-ivory">
          Business Hours
        </h3>
      </div>

      <dl className="space-y-3">
        {businessHours.map(({ day, hours }) => (
          <div
            key={day}
            className="flex flex-col gap-1 border-b border-gold/10 pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between"
          >
            <dt className="text-sm font-medium text-gold">{day}</dt>
            <dd className="text-sm text-muted">{hours}</dd>
          </div>
        ))}
      </dl>

      {showNotice && (
        <p className="mt-4 text-xs text-muted border-t border-gold/10 pt-4">
          {legalNotices.afterHoursNotice}
        </p>
      )}
    </div>
  );
}

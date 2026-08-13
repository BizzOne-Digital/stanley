import Link from "next/link";
import { Clock, Phone } from "lucide-react";
import { businessHours, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type AvailabilityBarProps = {
  className?: string;
};

function getHoursSnippet() {
  const weekday = businessHours[0];
  const saturday = businessHours[1];
  return `${weekday.day}: ${weekday.hours} · ${saturday.day}: ${saturday.hours}`;
}

export function AvailabilityBar({ className }: AvailabilityBarProps) {
  return (
    <div
      className={cn(
        "relative z-50 border-b border-gold/20 bg-carbon/95 text-xs text-muted backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 lg:px-8">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
            <span className="break-words">{getHoursSnippet()}</span>
          </span>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-1.5 font-medium text-ivory transition-colors hover:text-gold-bright"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
        <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
          <Link href="/request-a-quote">Request a Quote</Link>
        </Button>
      </div>
    </div>
  );
}

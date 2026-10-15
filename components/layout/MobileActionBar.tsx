"use client";

import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type MobileActionBarProps = {
  className?: string;
};

export function MobileActionBar({ className }: MobileActionBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-black/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden",
        className,
      )}
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <Button asChild variant="secondary" className="flex-1">
          <a href={siteConfig.phoneHref}>
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
        </Button>
        <Button asChild variant="primary" className="flex-1">
          <Link href="/request-a-quote">
            <FileText className="size-4" aria-hidden="true" />
            Quote
          </Link>
        </Button>
      </div>
    </div>
  );
}

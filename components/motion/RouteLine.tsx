"use client";

import { cn } from "@/lib/utils";

export function RouteLineAnimated({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-full", className)}
      viewBox="0 0 800 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 60 Q200 20 400 60 T780 60"
        stroke="#D4A62A"
        strokeWidth="2"
        fill="none"
        strokeDasharray="800"
        strokeDashoffset="800"
        style={{ animation: "drawRoute 2.5s ease-out forwards" }}
      />
      <circle cx="20" cy="60" r="5" fill="#F4C64E" opacity="0.9" />
      <circle cx="400" cy="60" r="4" fill="#D4A62A" />
      <circle cx="780" cy="60" r="5" fill="#F4C64E" opacity="0.9" />
    </svg>
  );
}

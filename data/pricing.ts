import type { PricingFactor } from "@/types";
import { legalNotices } from "./site";

export const pricingConfig = {
  startingPrice: 35,
  startingPriceLabel: "Starting at $35",
  headline: "Courier services starting at $35",
  subheadline:
    "Every delivery is unique. Request a custom quote for accurate pricing based on your specific route and requirements.",
  disclaimer: legalNotices.pricingDisclaimer,
  variationNote: legalNotices.pricingVariation,
} as const;

export const pricingFactors: PricingFactor[] = [
  {
    title: "Pickup & delivery distance",
    description: "Route length and number of locations affect the final price.",
  },
  {
    title: "Urgency",
    description: "Same-day and rush requests may differ from scheduled pricing.",
  },
  {
    title: "Item type",
    description: "What is being transported and any category-specific needs.",
  },
  {
    title: "Handling requirements",
    description: "Fragile items, special packaging, or careful handling instructions.",
  },
  {
    title: "Wait time",
    description: "Time spent waiting at pickup or delivery locations.",
  },
  {
    title: "Number of stops",
    description: "Multi-stop routes are priced based on the full route plan.",
  },
  {
    title: "After-hours scheduling",
    description: "Requests outside standard hours subject to availability and confirmation.",
  },
  {
    title: "Recurring route frequency",
    description: "Regular routes may receive pricing based on frequency and consistency.",
  },
];

export const deliveryTypeComparison = [
  {
    type: "Same-Day",
    description: "Delivery completed the same day when schedule allows.",
    bestFor: "Time-sensitive items needed today",
  },
  {
    type: "Rush / Expedited",
    description: "Priority handling for urgent local deliveries.",
    bestFor: "Deadlines that cannot wait",
  },
  {
    type: "Scheduled",
    description: "Pre-planned pickup and delivery at agreed times.",
    bestFor: "Predictable business workflows",
  },
  {
    type: "Recurring Routes",
    description: "Regular delivery runs on a set schedule.",
    bestFor: "Businesses with ongoing delivery needs",
  },
];

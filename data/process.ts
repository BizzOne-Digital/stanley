import type { ProcessStep } from "@/types";

export const deliveryProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Send your request",
    description:
      "Submit a quote request online or call us with your pickup, delivery, and timing details.",
  },
  {
    step: 2,
    title: "Confirm requirements",
    description:
      "We review your route, item type, and handling needs, then confirm availability and pricing.",
  },
  {
    step: 3,
    title: "Pickup",
    description:
      "Our courier arrives at the agreed pickup location and collects your item.",
  },
  {
    step: 4,
    title: "Delivery completion",
    description:
      "Your item is delivered to the specified destination. We keep you informed throughout.",
  },
];

export type NavItem = {
  label: string;
  href: string;
};

export type BusinessHours = {
  day: string;
  hours: string;
};

export type ServiceCategory =
  | "same-day"
  | "rush"
  | "scheduled"
  | "medical"
  | "legal"
  | "business"
  | "on-demand"
  | "recurring"
  | "local"
  | "after-hours";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  description: string;
  overview: string;
  customerTypes: string[];
  useCases: string[];
  process: { step: number; title: string; description: string }[];
  requirements: string[];
  disclaimer: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type AudienceItem = {
  title: string;
  description: string;
  icon: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  caption?: string;
  placeholder?: boolean;
};

export type PricingFactor = {
  title: string;
  description: string;
};

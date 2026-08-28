import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="size-3.5 text-gold/50" aria-hidden="true" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ivory/70" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

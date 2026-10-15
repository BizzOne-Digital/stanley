"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navigation } from "@/data/site";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const leftNavLinks = navigation.filter((item) =>
  ["/", "/about", "/services", "/pricing"].includes(item.href),
);
const rightNavLinks = navigation.filter((item) =>
  ["/subcontractors", "/contact"].includes(item.href),
);

function NavLink({
  href,
  label,
  pathname,
  compact = false,
}: {
  href: string;
  label: string;
  pathname: string;
  compact?: boolean;
}) {
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative whitespace-nowrap font-display font-medium uppercase tracking-[0.12em] transition-colors",
        compact
          ? "px-2 py-2 text-[11px] lg:px-2.5 lg:text-xs xl:px-3 xl:text-[13px]"
          : "px-3 py-2 text-xs lg:text-[13px]",
        isActive
          ? "text-gold-bright after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:bg-gold-bright xl:after:inset-x-3"
          : "text-ivory/75 hover:text-gold",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function NavRow({
  pathname,
  className,
}: {
  pathname: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-2",
        className,
      )}
    >
      <nav
        className="flex min-w-0 items-center gap-0.5 xl:gap-1"
        aria-label="Primary navigation — left"
      >
        {leftNavLinks.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            pathname={pathname}
            compact
          />
        ))}
      </nav>

      <div className="flex min-w-0 items-center gap-0.5 xl:gap-1">
        <nav
          className="flex items-center gap-0.5 xl:gap-1"
          aria-label="Primary navigation — right"
        >
          {rightNavLinks.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              pathname={pathname}
              compact
            />
          ))}
        </nav>
        <Link
          href="/request-a-quote"
          className={cn(
            "ml-1 shrink-0 whitespace-nowrap rounded-sm bg-gold px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-gold-bright lg:ml-2 lg:px-4 lg:text-xs xl:text-[13px]",
            pathname.startsWith("/request-a-quote") &&
              "ring-2 ring-gold-bright ring-offset-2 ring-offset-black",
          )}
          aria-current={
            pathname.startsWith("/request-a-quote") ? "page" : undefined
          }
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "relative sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-gold/25 bg-black/95 shadow-lg shadow-black/40 backdrop-blur-md"
            : "border-gold/15 bg-black/90 backdrop-blur-sm",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent",
            scrolled ? "opacity-100" : "opacity-60",
          )}
          aria-hidden="true"
        />

        {isHome ? (
          <>
            <div className="mx-auto hidden min-w-0 max-w-7xl px-4 py-3 lg:block lg:px-6 xl:px-8">
              <NavRow pathname={pathname} />
            </div>

            <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-end px-4 py-3 lg:hidden">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-sm border border-graphite text-ivory transition-colors hover:border-gold hover:text-gold"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative mx-auto hidden min-h-[5.5rem] min-w-0 max-w-7xl items-center px-4 lg:flex lg:min-h-[6.25rem] lg:px-6 xl:px-8">
              <nav
                className="flex min-w-0 flex-1 items-center justify-end gap-0.5 pr-32 lg:pr-36 xl:gap-1 xl:pr-40"
                aria-label="Primary navigation — left"
              >
                {leftNavLinks.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    pathname={pathname}
                    compact
                  />
                ))}
              </nav>

              <LogoLockup
                size="md"
                showText={false}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                imageClassName="h-12 w-auto max-w-[10rem] lg:h-14 lg:max-w-[12rem] xl:h-16 xl:max-w-[14rem]"
              />

              <div className="flex min-w-0 flex-1 items-center justify-start gap-0.5 pl-32 lg:pl-36 xl:gap-1 xl:pl-40">
                <nav
                  className="flex items-center gap-0.5 xl:gap-1"
                  aria-label="Primary navigation — right"
                >
                  {rightNavLinks.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      pathname={pathname}
                      compact
                    />
                  ))}
                </nav>
                <Link
                  href="/request-a-quote"
                  className={cn(
                    "ml-1 shrink-0 whitespace-nowrap rounded-sm bg-gold px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-gold-bright lg:ml-2 lg:px-4 lg:text-xs xl:text-[13px]",
                    pathname.startsWith("/request-a-quote") &&
                      "ring-2 ring-gold-bright ring-offset-2 ring-offset-black",
                  )}
                  aria-current={
                    pathname.startsWith("/request-a-quote") ? "page" : undefined
                  }
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="mx-auto grid min-h-[4.75rem] min-w-0 max-w-7xl grid-cols-[2.5rem_1fr_2.5rem] items-center px-4 sm:min-h-20 lg:hidden">
              <div aria-hidden="true" />
              <LogoLockup
                size="md"
                showText={false}
                className="justify-self-center"
                imageClassName="h-10 w-auto max-w-[8.5rem] sm:h-12 sm:max-w-[10rem]"
              />
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center justify-self-end rounded-sm border border-graphite text-ivory transition-colors hover:border-gold hover:text-gold"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label="Open menu"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </header>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navigation } from "@/data/site";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const navLinks = navigation.filter((item) => item.href !== "/request-a-quote");

function NavLink({
  item,
  pathname,
}: {
  item: (typeof navLinks)[number];
  pathname: string;
}) {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "relative whitespace-nowrap px-3 py-2 font-display text-xs font-medium uppercase tracking-[0.14em] transition-colors lg:px-4 lg:text-[13px]",
        isActive
          ? "text-gold-bright after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-gold-bright lg:after:inset-x-4"
          : "text-ivory/70 hover:text-gold",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
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

        <div className="mx-auto min-w-0 max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center py-3 sm:grid-cols-[3rem_1fr_3rem] sm:py-4 xl:grid-cols-1 xl:py-5">
            <div className="xl:hidden" aria-hidden="true" />

            <LogoLockup
              size="md"
              showText={false}
              priority
              className="justify-self-center xl:justify-self-center"
              imageClassName="h-20 w-20 sm:h-24 sm:w-24 xl:h-28 xl:w-28"
            />

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center justify-self-end rounded-sm border border-graphite text-ivory transition-colors hover:border-gold hover:text-gold xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            className="hidden items-center justify-center gap-0.5 border-t border-gold/10 py-2.5 xl:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <span className="mx-2 h-4 w-px bg-gold/25" aria-hidden="true" />
            <Link
              href="/request-a-quote"
              className={cn(
                "whitespace-nowrap rounded-sm bg-gold px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-gold-bright lg:text-[13px]",
                pathname.startsWith("/request-a-quote") &&
                  "ring-2 ring-gold-bright ring-offset-2 ring-offset-black",
              )}
              aria-current={
                pathname.startsWith("/request-a-quote") ? "page" : undefined
              }
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = navigation.filter((item) => item.href !== "/request-a-quote");
const navSplitIndex = Math.ceil(navLinks.length / 2);
const leftNavLinks = navLinks.slice(0, navSplitIndex);
const rightNavLinks = navLinks.slice(navSplitIndex);

function NavLink({
  item,
  pathname,
  className,
}: {
  item: (typeof navLinks)[number];
  pathname: string;
  className?: string;
}) {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "whitespace-nowrap rounded-sm px-2.5 py-2 font-display text-[13px] font-medium uppercase tracking-[0.12em] transition-colors lg:px-3 lg:text-sm",
        isActive
          ? "text-gold-bright"
          : "text-ivory/75 hover:text-gold",
        className,
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

        <div className="mx-auto grid h-[4.75rem] min-w-0 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:gap-4 lg:h-24 lg:px-8">
          <nav
            className="hidden min-w-0 items-center justify-end gap-0.5 xl:flex"
            aria-label="Primary navigation — left"
          >
            {leftNavLinks.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          <LogoLockup
            size="md"
            showText={false}
            priority
            className="justify-self-center"
            imageClassName="h-[4.25rem] w-[4.25rem] sm:h-[4.75rem] sm:w-[4.75rem] lg:h-20 lg:w-20"
          />

          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
            <nav
              className="hidden min-w-0 items-center gap-0.5 xl:flex"
              aria-label="Primary navigation — right"
            >
              {rightNavLinks.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </nav>

            <div className="hidden h-6 w-px shrink-0 bg-gold/20 xl:block" aria-hidden="true" />

            <Button
              href={siteConfig.phoneHref}
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span className="hidden lg:inline">{siteConfig.phoneDisplay}</span>
              <span className="lg:hidden">Call</span>
            </Button>
            <Button
              asChild
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/request-a-quote">Get a Quote</Link>
            </Button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-sm border border-graphite text-ivory transition-colors hover:border-gold hover:text-gold xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
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

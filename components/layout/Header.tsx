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
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-gold/20 bg-black/95 shadow-lg shadow-black/40 backdrop-blur-md"
            : "border-gold/10 bg-black/90 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto grid h-16 min-w-0 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:gap-4 lg:h-[4.5rem] lg:px-8">
          <LogoLockup size="sm" showText={false} priority />

          <nav
            className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-sm px-2.5 py-2 text-sm font-medium tracking-wide transition-colors lg:px-3",
                    isActive
                      ? "text-gold-bright"
                      : "text-ivory/80 hover:text-gold",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
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

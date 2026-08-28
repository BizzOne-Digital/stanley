"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { Button } from "@/components/ui/Button";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type MobileMenuProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const reducedMotion = prefersReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-gold/20 bg-carbon shadow-2xl"
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
              <LogoLockup size="sm" />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-sm border border-graphite text-ivory transition-colors hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6"
              aria-label="Mobile navigation"
            >
              {navigation.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.05 * index,
                      duration: reducedMotion ? 0 : 0.3,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-sm border border-transparent px-4 py-3 font-display text-lg uppercase tracking-wide transition-colors",
                        isActive
                          ? "border-gold/30 bg-gold/10 text-gold-bright"
                          : "text-ivory hover:border-gold/20 hover:bg-black hover:text-gold",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-gold/10 px-5 py-5">
              <Button asChild variant="primary" className="w-full">
                <Link href="/request-a-quote" onClick={onClose}>
                  Request a Quote
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a href={siteConfig.phoneHref} onClick={onClose}>
                  <Phone className="size-4" aria-hidden="true" />
                  Call {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

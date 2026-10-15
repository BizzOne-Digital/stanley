"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const SESSION_KEY = "conley-intro-seen";
const INTRO_DURATION_MS = 3800;

type IntroPhase = "pending" | "intro" | "ready";

function getInitialPhase(): IntroPhase {
  if (typeof window === "undefined") return "pending";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "ready";

  try {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return "ready";
  } catch {
    /* sessionStorage unavailable */
  }

  return "intro";
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>(getInitialPhase);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setPhase("ready");
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const completeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      /* sessionStorage unavailable */
    }
    document.body.style.overflow = "";
    setPhase("ready");
  }, []);

  useEffect(() => {
    if (phase === "intro") {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [phase]);

  const siteHidden = phase !== "ready";

  return (
    <>
      {siteHidden && (
        <div
          className="fixed inset-0 z-[9997] bg-black"
          aria-hidden={phase === "intro"}
        />
      )}

      {phase === "intro" && (
        <CinematicIntroOverlay onComplete={completeIntro} />
      )}

      <div
        className={cn(
          "flex min-h-full w-full min-w-0 flex-col",
          siteHidden && "invisible h-0 overflow-hidden",
        )}
        aria-hidden={siteHidden}
      >
        {phase === "ready" ? children : null}
      </div>
    </>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function CinematicIntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(dismiss, INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [visible, dismiss]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          role="presentation"
          aria-hidden="true"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-4 top-4 z-10 rounded-sm border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:border-gold hover:bg-gold/10 sm:right-6 sm:top-6 sm:text-sm"
          >
            Skip Intro
          </button>

          {isMobile ? <MobileIntro /> : <DesktopIntro />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DesktopIntro() {
  return (
    <div className="relative h-full w-full max-w-[100vw] overflow-hidden">
      <motion.div
        className="absolute inset-0 map-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <motion.path
          d="M 80 450 Q 200 350 320 380 T 560 280 T 720 180"
          initial={{ strokeDashoffset: 1000, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          stroke="#D4A62A"
          strokeWidth={2}
          fill="none"
          strokeDasharray="1000"
        />

        {[
          { cx: 80, cy: 450, delay: 0.8 },
          { cx: 320, cy: 380, delay: 1.0 },
          { cx: 560, cy: 280, delay: 1.2 },
          { cx: 720, cy: 180, delay: 1.4 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r={6}
            fill="#D4A62A"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: point.delay }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute bottom-[28%] left-[15%]"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        aria-hidden
      >
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <path
            d="M5 25 L15 15 L55 15 L65 25 L75 25 L75 30 L5 30 Z"
            fill="#1A1A1A"
            stroke="#D4A62A"
            strokeWidth="1"
          />
          <rect x="18" y="18" width="12" height="8" fill="#D4A62A" opacity="0.3" />
          <rect x="35" y="18" width="12" height="8" fill="#D4A62A" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
          fill="#101010"
        >
          <path d="M0 200 L0 120 L60 100 L120 110 L180 80 L240 90 L300 60 L360 70 L420 50 L480 65 L540 45 L600 55 L660 40 L720 50 L800 35 L800 200 Z" />
          <path
            d="M0 200 L0 140 L60 125 L120 130 L180 105 L240 115 L300 90 L360 100 L420 75 L480 90 L540 70 L600 80 L660 65 L720 75 L800 60 L800 200 Z"
            fill="#1A1A1A"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="relative overflow-hidden">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
            aria-hidden
          />
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            className="relative h-auto w-auto max-h-32 max-w-[min(100%,18rem)] object-contain sm:max-h-40 sm:max-w-[22rem]"
            priority
          />
        </div>

        <motion.p
          className="mt-6 text-center font-display text-xl uppercase tracking-[0.2em] text-gold sm:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          RELIABLE DELIVERY
        </motion.p>

        <motion.p
          className="mt-2 max-w-xs text-center text-sm uppercase tracking-[0.15em] text-muted sm:max-w-none sm:text-base"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          {siteConfig.headlineSecondary}
        </motion.p>
      </motion.div>
    </div>
  );
}

function MobileIntro() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          width={siteConfig.logo.width}
          height={siteConfig.logo.height}
          className="h-auto w-auto max-h-24 max-w-[min(100%,14rem)] object-contain"
          priority
        />
      </motion.div>

      <motion.p
        className="mt-6 text-center font-display text-lg uppercase tracking-[0.15em] text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        RELIABLE DELIVERY
      </motion.p>

      <motion.p
        className="mt-2 text-center text-xs uppercase tracking-wider text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        {siteConfig.headlineSecondary}
      </motion.p>
    </div>
  );
}

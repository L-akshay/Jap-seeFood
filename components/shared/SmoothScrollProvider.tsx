"use client";

import { type ReactNode, useEffect } from "react";
import { MotionConfig, motion } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * App-root client provider:
 *   - Lenis smooth scrolling, synced to GSAP ScrollTrigger (the canonical combo
 *     so pinned/scrub effects stay in lockstep with smooth scroll)
 *   - MotionConfig so every Motion component respects reduced-motion
 *   - A slow, controlled page entrance (server children pass straight through,
 *     so the page itself stays a Server Component)
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who prefer reduced motion — leave native scrolling intact.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis, and drive Lenis off GSAP's ticker
    // (one rAF loop for both — no double scheduling).
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* MotionConfig reducedMotion="user" neutralises the y transform for
          reduced-motion users, so a constant `initial` is safe (and avoids an
          SSR/client hydration mismatch from reading the media query in render). */}
      <motion.div
        className="flex min-h-full flex-1 flex-col"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

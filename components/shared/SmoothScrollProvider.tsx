"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "motion/react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ANCHOR_OFFSET = -96;

/**
 * App-root client provider:
 *   - Lenis smooth scrolling, synced to GSAP ScrollTrigger
 *   - MotionConfig so Motion components respect reduced-motion
 *   - Explicit scroll restoration for App Router navigations
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: ANCHOR_OFFSET },
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToCurrentLocation(lenisRef.current);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function handleSamePageLinkClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      const sameRoute =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (!sameRoute) return;

      if (url.hash) {
        window.setTimeout(() => scrollToHash(url.hash, lenisRef.current), 0);
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", url.href);
      scrollToTop(lenisRef.current);
    }

    document.addEventListener("click", handleSamePageLinkClick, true);
    return () =>
      document.removeEventListener("click", handleSamePageLinkClick, true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
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

function scrollToCurrentLocation(lenis: Lenis | null) {
  if (window.location.hash && scrollToHash(window.location.hash, lenis)) {
    return;
  }

  scrollToTop(lenis);
}

function scrollToHash(hash: string, lenis: Lenis | null) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);
  if (!target) return false;

  if (lenis) {
    lenis.scrollTo(target, {
      offset: ANCHOR_OFFSET,
      immediate: true,
      force: true,
    });
  } else {
    target.scrollIntoView({ block: "start" });
  }

  ScrollTrigger.refresh();
  return true;
}

function scrollToTop(lenis: Lenis | null) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  ScrollTrigger.refresh();
}

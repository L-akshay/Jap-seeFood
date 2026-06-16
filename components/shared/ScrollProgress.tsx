"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gold reading-progress bar pinned to the top of the viewport.
 * Reflects scroll position (not an autonomous animation), so it stays on
 * even under reduced motion.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-linear-to-r from-gold-muted via-gold to-pearl"
    />
  );
}

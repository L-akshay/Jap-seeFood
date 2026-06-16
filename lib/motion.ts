import type { Variants } from "motion/react";

/**
 * Shared motion tokens so every section animates with one consistent,
 * controlled feel. Tuned for slow, premium easing — no bounce, no overshoot.
 */

/** Primary easing curve (a refined ease-out) used across the landing page. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard fade-and-rise used by reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Container that cascades its direct children. */
export const staggerContainer = (
  stagger = 0.1,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

"use client";

import { Children, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Initial delay (seconds) before the reveal begins. */
  delay?: number;
  /** Distance (px) the element travels in on reveal. */
  y?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  className?: string;
  /** Reveal only once when it scrolls into view (default true). */
  once?: boolean;
  /**
   * When set (seconds), each direct child is revealed in sequence with this
   * gap between them. Without it, the whole block reveals as one unit.
   */
  stagger?: number;
};

/**
 * Fade-and-rise reveal driven by Motion. Animates when scrolled into view.
 * Pass `stagger` to cascade direct children one after another.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.7,
  className,
  once = true,
  stagger,
}: RevealProps) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };

  const viewport = { once, amount: 0.3 } as const;

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };

    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {Children.map(children, (child) => (
          <motion.div variants={item}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

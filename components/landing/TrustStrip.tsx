"use client";

import { motion, type Variants } from "motion/react";
import {
  Snowflake,
  Truck,
  BadgeCheck,
  ScrollText,
  Headset,
  type LucideIcon,
} from "lucide-react";

import { EASE } from "@/lib/motion";

const ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "生鮮・冷凍輸出", icon: Snowflake },
  { label: "コールドチェーン物流", icon: Truck },
  { label: "品質確認済み供給", icon: BadgeCheck },
  { label: "海外向け書類対応", icon: ScrollText },
  { label: "B2Bバイヤー支援", icon: Headset },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Trust strip directly below the hero — five credibility markers in a premium
 * horizontal band, bordered top and bottom with thin gold hairlines.
 */
export function TrustStrip() {
  return (
    <section
      id="trust"
      className="relative w-full border-y border-gold/20 bg-navy/60"
    >
      {/* faint inner glow so the band reads as its own surface */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_20rem_at_50%_50%,rgba(214,168,79,0.05),transparent)]" />

      <motion.ul
        className="container-narrow relative grid grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 sm:grid-cols-3 sm:px-8 md:py-12 lg:flex lg:items-center lg:justify-between"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {ITEMS.map(({ label, icon: Icon }, i) => (
          <motion.li
            key={label}
            variants={item}
            className="group flex flex-col items-center gap-3 text-center transition-transform duration-300 ease-out hover:-translate-y-1 sm:flex-row sm:gap-3 sm:text-left lg:flex-col lg:text-center"
          >
            {/* Icon with gold glow + very subtle pulse */}
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/5">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-gold/20 blur-md"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
              <Icon className="relative size-5 text-gold transition-transform duration-300 group-hover:scale-110" />
            </span>

            <span className="text-sm font-medium tracking-wide text-pearl/85 transition-colors duration-300 group-hover:text-pearl">
              {label}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

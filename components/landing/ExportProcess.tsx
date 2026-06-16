"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, type Variants } from "motion/react";
import {
  Send,
  Search,
  BadgeCheck,
  FileText,
  ThermometerSnowflake,
  Globe,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { EASE } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "お問い合わせ",
    description:
      "希望商品、数量、仕向け地、納品条件をお知らせください。",
    icon: Send,
  },
  {
    title: "商品マッチング",
    description:
      "バイヤー要件に合う水産物カテゴリと供給可能な商品を確認します。",
    icon: Search,
  },
  {
    title: "品質確認",
    description:
      "等級、産地、梱包形態、在庫状況を見積もり前に確認します。",
    icon: BadgeCheck,
  },
  {
    title: "梱包・書類準備",
    description:
      "出荷準備、梱包、輸出に必要な書類を調整します。",
    icon: FileText,
  },
  {
    title: "温度管理出荷",
    description:
      "生鮮、チルド、冷凍の条件に合わせて温度管理物流で出荷します。",
    icon: ThermometerSnowflake,
  },
  {
    title: "海外納品",
    description:
      "出荷状況と納品確認を共有し、海外の受け取りまで支援します。",
    icon: Globe,
  },
];

/**
 * Export workflow timeline. Vertical on mobile; alternating sides on desktop,
 * with a thin gold line that draws itself as the section scrolls into view.
 */
export function ExportProcess() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  // Smooth the draw so the line glides rather than tracking 1:1 with the wheel.
  // Under reduced motion the line is simply shown in full (no scroll drawing).
  const drawScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });
  const lineScaleY = reduceMotion ? 1 : drawScale;

  return (
    <section id="process" className="section overflow-hidden">
      <div className="container-narrow">
        <SectionHeader
          eyebrow="輸出の流れ"
          title="日本の海から、世界の市場へ。"
          description="品質、タイミング、書類、コールドチェーンを重視する海外水産物バイヤーのための明確な輸出プロセスです。"
        />

        <ol ref={trackRef} className="relative mt-16">
          {/* Connecting line — faint track + gold progress that draws on scroll */}
          <div className="absolute inset-y-0 left-5 w-px bg-gold/15 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            className="absolute inset-y-0 left-5 w-px origin-top bg-linear-to-b from-gold via-gold to-gold/40 lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: lineScaleY }}
          />

          <div className="flex flex-col gap-10 lg:gap-4">
            {STEPS.map((step, i) => (
              <TimelineStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}

const marker: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const cardReveal: Variants = {
  hidden: (fromRight: boolean) => ({
    opacity: 0,
    x: fromRight ? 36 : -36,
    y: 16,
  }),
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function TimelineStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  const onRight = index % 2 === 1; // desktop side

  return (
    <motion.li
      className="relative list-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Numbered marker */}
      <motion.div
        variants={marker}
        className="absolute left-5 top-1 z-10 -translate-x-1/2 lg:left-1/2"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-gold/40 blur-md" />
        <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 bg-navy font-jp text-sm font-semibold text-gold shadow-[0_0_20px_-4px_rgba(214,168,79,0.6)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Card */}
      <motion.div
        custom={onRight}
        variants={cardReveal}
        className={[
          "pl-16",
          "lg:w-1/2 lg:pl-0",
          onRight
            ? "lg:ml-auto lg:pl-16"
            : "lg:mr-auto lg:pr-16 lg:text-right",
        ].join(" ")}
      >
        <div
          className={[
            "glass-card group p-5",
            onRight ? "" : "lg:[&_.step-head]:flex-row-reverse",
          ].join(" ")}
        >
          <div className="step-head mb-2 flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
              <Icon className="size-4" />
            </span>
            <h3 className="text-lg text-pearl">{step.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.li>
  );
}

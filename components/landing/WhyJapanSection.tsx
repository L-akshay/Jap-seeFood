"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { CalendarRange, ShieldCheck, PackageCheck, type LucideIcon } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { EASE } from "@/lib/motion";
import { WHY_IMAGE } from "@/lib/constants";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const FEATURES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "旬を見極めた選定",
    description:
      "水産物の自然な旬に合わせ、最適な時期と品質で仕入れられるようご提案します。",
    icon: CalendarRange,
  },
  {
    title: "徹底した品質管理",
    description:
      "選別、梱包、温度管理、輸出準備まで、丁寧な取り扱いを重視しています。",
    icon: ShieldCheck,
  },
  {
    title: "輸出に適した梱包",
    description:
      "生鮮、チルド、冷凍それぞれの条件に合わせ、書類と物流要件を見据えて整えます。",
    icon: PackageCheck,
  },
];

const cardList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * "Why Japan" — split section: text + feature cards on the left, a parallax
 * ocean visual with Japanese accents on the right, over a dark ocean gradient.
 */
export function WhyJapanSection() {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ["start end", "end start"],
  });
  // Subtle vertical parallax on the image (disabled under reduced motion)
  const rawImageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageY = reduceMotion ? 0 : rawImageY;

  return (
    <section id="why-japan" className="section overflow-hidden">
      {/* Dark ocean gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-brand via-navy/40 to-brand" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_40rem_at_85%_20%,rgba(217,237,247,0.05),transparent)]" />

      <div className="container-narrow relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---- Left: text + feature cards ---- */}
        <div>
          <SectionHeader
            align="left"
            eyebrow="日本品質"
            title="日本らしい精度で、仕入れから輸出まで。"
            description="日本の水産物は鮮度、季節感、丁寧な取り扱いで評価されています。海宝は、高級外食、卸売、流通に適した輸出対応商品を海外バイヤーへつなぎます。"
          />

          {/* Gold divider */}
          <Reveal>
            <div className="my-8 h-px w-full bg-linear-to-r from-gold/50 via-gold/15 to-transparent" />
          </Reveal>

          {/* Feature cards */}
          <motion.ul
            className="flex flex-col gap-4"
            variants={cardList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {FEATURES.map(({ title, description, icon: Icon }) => (
              <motion.li
                key={title}
                variants={cardItem}
                className="group glass-card flex gap-4 p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg text-pearl">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ---- Right: parallax ocean visual ---- */}
        <motion.div
          ref={imageWrapRef}
          className="relative"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div className="img-fallback gold-border relative aspect-4/5 overflow-hidden rounded-3xl">
            {/* Parallax image (taller than frame so the shift never reveals edges) */}
            <motion.div className="absolute inset-x-0 inset-y-[-10%]" style={{ y: imageY }}>
              <Image
                src={WHY_IMAGE}
                alt="季節感と品質を感じさせる日本の海"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>

            {/* Ocean gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-brand via-brand/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-navy/50 to-transparent" />

            {/* Vertical Japanese text accent */}
            <span
              className="absolute right-5 top-6 font-jp text-sm tracking-[0.3em] text-pearl/70"
              style={{ writingMode: "vertical-rl" }}
            >
              日本の海・鮮度と品質
            </span>

            {/* Red seal / stamp */}
            <motion.div
              aria-hidden
              className="absolute bottom-6 left-6 flex size-16 -rotate-6 items-center justify-center rounded-md border-2 border-red-accent/80"
              initial={{ opacity: 0, scale: 0.7, rotate: -18 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            >
              <span className="absolute inset-1 rounded-sm border border-red-accent/50" />
              <span className="font-jp text-3xl text-red-accent">鮮</span>
            </motion.div>
          </div>

          {/* Floating gold corner lines */}
          <span className="absolute -left-3 -top-3 h-12 w-px bg-linear-to-b from-gold to-transparent" />
          <span className="absolute -left-3 -top-3 h-px w-12 bg-linear-to-r from-gold to-transparent" />
          <span className="absolute -bottom-3 -right-3 h-12 w-px bg-linear-to-t from-gold to-transparent" />
          <span className="absolute -bottom-3 -right-3 h-px w-12 bg-linear-to-l from-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

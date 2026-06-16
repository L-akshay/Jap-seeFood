"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  FileCheck,
  Globe,
  Network,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO_IMAGE, SITE } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const TRUST_BADGES: { label: string; icon: LucideIcon }[] = [
  { label: "生鮮・冷凍輸出", icon: Snowflake },
  { label: "温度管理対応", icon: ThermometerSnowflake },
  { label: "日本国内の仕入れ網", icon: Network },
  { label: "海外バイヤー支援", icon: Globe },
  { label: "輸出書類対応", icon: FileCheck },
];

const FLOATING_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "コールドチェーン対応", icon: ThermometerSnowflake },
  { label: "輸出書類の準備", icon: FileCheck },
  { label: "海外B2B供給", icon: Globe },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.18 },
          { scale: 1.06, duration: 2.2, ease: "power2.out" },
        );

        const st = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(bgRef.current, { yPercent: 18, ease: "none", scrollTrigger: st });
        gsap.to(".hero-parallax-slow", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: st,
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-20"
    >
      <div
        ref={bgRef}
        className="img-fallback absolute inset-x-0 inset-y-[-12%] will-change-transform"
      >
        <Image
          src={HERO_IMAGE}
          alt="日本の高品質な水産物を育む深い青の海"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-brand via-brand/88 to-brand/35" />
      <div className="absolute inset-0 bg-linear-to-t from-brand via-brand/45 to-brand/55" />
      <div className="absolute inset-0 bg-[radial-gradient(70rem_52rem_at_24%_30%,transparent,rgba(2,6,23,0.6))]" />

      <RouteLines />
      <SealStamp />

      <div className="container-narrow relative z-10 px-6 py-24 sm:px-8 md:py-28">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <span className="h-px w-10 bg-linear-to-r from-gold to-transparent" />
            <span className="font-jp text-xs tracking-[0.35em] text-gold sm:text-sm">
              日本水産物輸出ネットワーク
            </span>
          </motion.div>

          <h1 className="mt-6 font-jp text-4xl leading-[1.2] text-pearl sm:text-5xl md:text-6xl lg:text-7xl">
            <MaskLine delay={0.3}>日本の上質な海の恵みを、</MaskLine>
            <MaskLine delay={0.45}>
              <span className="text-gold-gradient">世界の食卓へ。</span>
            </MaskLine>
          </h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-soft-blue/82 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            まぐろ、ほたて、蟹、うに、いくら、旬の鮮魚まで。日本各地から選び抜いた水産物を、
            品質管理とコールドチェーンで海外バイヤーへつなぎます。
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
          >
            <Button
              variant="gold"
              size="xl"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              輸出見積もりを依頼
              <ArrowRight />
            </Button>
            <Button
              variant="pearl"
              size="xl"
              nativeButton={false}
              render={<a href="#showcase" />}
            >
              商品を見る
            </Button>
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
            variants={badgeContainer}
            initial="hidden"
            animate="visible"
          >
            {TRUST_BADGES.map(({ label, icon: Icon }) => (
              <motion.li
                key={label}
                variants={badgeItem}
                className="flex items-center gap-2 text-sm text-pearl/70"
              >
                <Icon className="size-4 text-gold" />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <FloatingCard />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}

function MaskLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="mb-3 block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const badgeContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 1 },
  },
};

const badgeItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SealStamp() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-6 top-28 z-10 hidden h-32 w-32 lg:block xl:right-16 xl:h-40 xl:w-40"
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.9 }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id="seal-arc"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>

        <circle cx="60" cy="60" r="58" fill="none" stroke="var(--brand-gold)" strokeOpacity="0.4" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--brand-gold)" strokeOpacity="0.25" />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "60px 60px" }}
        >
          <text
            fill="var(--brand-gold)"
            fillOpacity="0.85"
            fontSize="7.5"
            letterSpacing="3.4"
            fontFamily="var(--font-jp)"
          >
            <textPath href="#seal-arc" startOffset="0">
              日本 · 水産物 · 輸出 · 品質 ·
            </textPath>
          </text>
        </motion.g>

        <text
          x="60"
          y="68"
          textAnchor="middle"
          fill="var(--brand-gold)"
          fontSize="34"
          fontFamily="var(--font-jp)"
        >
          {SITE.nameJp}
        </text>
      </svg>
    </motion.div>
  );
}

function RouteLines() {
  return (
    <svg
      aria-hidden
      className="hero-parallax-slow pointer-events-none absolute inset-0 z-1 h-full w-full opacity-70"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand-gold)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--brand-soft-blue)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <motion.path
        d="M1180,250 C980,140 700,180 460,320 C300,410 180,360 60,300"
        fill="none"
        stroke="url(#route-grad)"
        strokeWidth="1.5"
        strokeDasharray="2 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.path
        d="M1180,250 C1020,420 760,520 520,560 C360,588 230,640 120,720"
        fill="none"
        stroke="url(#route-grad)"
        strokeWidth="1.5"
        strokeDasharray="2 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: "easeInOut", delay: 1 }}
      />

      <motion.circle
        cx="1180"
        cy="250"
        r="4"
        fill="var(--brand-gold)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
      />
      <motion.circle
        cx="1180"
        cy="250"
        r="11"
        fill="none"
        stroke="var(--brand-gold)"
        strokeOpacity="0.4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
      />
    </svg>
  );
}

function FloatingCard() {
  return (
    <motion.div
      className="glass-card relative mt-14 w-full max-w-xs p-5 lg:absolute lg:bottom-16 lg:right-8 lg:mt-0 xl:right-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
    >
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="size-4 text-gold" />
        <span className="text-xs font-medium tracking-[0.2em] text-pearl/80">
          輸出対応
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.65rem] tracking-wider text-gold">
          <span className="size-1.5 animate-pulse rounded-full bg-gold" />
          受付中
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {FLOATING_ITEMS.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <Icon className="size-4" />
            </span>
            <span className="text-sm text-pearl/90">{label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

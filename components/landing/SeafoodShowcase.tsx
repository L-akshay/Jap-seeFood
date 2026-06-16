"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Snowflake } from "lucide-react";

import { SEAFOOD, type SeafoodItem } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function SeafoodShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(".product-panel");
          const images = gsap.utils.toArray<HTMLElement>(".product-image");
          const copies = gsap.utils.toArray<HTMLElement>(".product-copy");
          const marks = gsap.utils.toArray<HTMLElement>(".product-mark");

          // Upgrade the static stacked layout into the pinned, overlapping
          // cross-fade. matchMedia reverts these on cleanup / query change, so
          // reduced-motion and no-JS users keep the plain scrollable fallback.
          gsap.set(stageRef.current, { height: "100vh", overflow: "hidden" });
          gsap.set(panels, {
            position: "absolute",
            inset: 0,
            height: "100%",
          });
          gsap.set(".showcase-chrome", { autoAlpha: 1 });

          gsap.set(panels, { autoAlpha: 0, yPercent: 8, scale: 1.02 });
          gsap.set(images, { scale: 1.12, yPercent: 0 });
          gsap.set(copies, { y: 28, autoAlpha: 0 });
          gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, scale: 1 });
          gsap.set(copies[0], { y: 0, autoAlpha: 1 });
          gsap.set(marks[0], { scaleY: 1, autoAlpha: 1 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (SEAFOOD.length - 1)}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, index) => {
            const image = images[index];
            timeline.to(
              image,
              {
                yPercent: index % 2 === 0 ? -8 : 8,
                scale: 1.04,
                ease: "none",
              },
              index,
            );

            if (index === 0) return;

            timeline
              .to(
                panels[index - 1],
                {
                  autoAlpha: 0,
                  yPercent: -6,
                  scale: 0.98,
                  duration: 0.42,
                  ease: "power2.inOut",
                },
                index - 0.45,
              )
              .to(
                copies[index - 1],
                {
                  autoAlpha: 0,
                  y: -22,
                  duration: 0.28,
                  ease: "power2.inOut",
                },
                index - 0.45,
              )
              .fromTo(
                panel,
                { autoAlpha: 0, yPercent: 7, scale: 1.03 },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  scale: 1,
                  duration: 0.48,
                  ease: "power2.out",
                },
                index - 0.25,
              )
              .fromTo(
                copies[index],
                { autoAlpha: 0, y: 30 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.42,
                  ease: "power2.out",
                },
                index - 0.12,
              )
              .to(
                marks,
                {
                  scaleY: (markIndex) => (markIndex === index ? 1 : 0.28),
                  autoAlpha: (markIndex) => (markIndex === index ? 1 : 0.38),
                  duration: 0.22,
                  ease: "power2.out",
                },
                index - 0.12,
              );
          });

          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative overflow-hidden border-y border-gold/20 bg-brand"
    >
      <div ref={stageRef} className="relative hidden lg:block">
        <div className="showcase-chrome pointer-events-none invisible absolute inset-x-0 top-0 z-40 h-28 bg-linear-to-b from-brand to-transparent opacity-0" />
        <div className="showcase-chrome pointer-events-none invisible absolute inset-x-0 bottom-0 z-40 h-32 bg-linear-to-t from-brand to-transparent opacity-0" />

        <div className="showcase-chrome invisible absolute left-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 opacity-0 xl:flex">
          {SEAFOOD.map((item, index) => (
            <span
              key={item.slug}
              className="product-mark h-12 w-0.5 origin-center rounded-full bg-gold"
              style={{ opacity: index === 0 ? 1 : 0.38, transform: "scaleY(0.28)" }}
            />
          ))}
        </div>

        <div className="showcase-chrome invisible absolute right-8 top-1/2 z-50 hidden -translate-y-1/2 font-jp text-sm tracking-[0.22em] text-gold/75 opacity-0 xl:block">
          縦にスクロール
        </div>

        {SEAFOOD.map((item, index) => (
          <DesktopPanel key={item.slug} item={item} index={index} />
        ))}
      </div>

      <div className="lg:hidden">
        <div className="px-6 py-20 text-center">
          <span className="font-jp text-xs tracking-[0.38em] text-gold">
            輸出対応商品
          </span>
          <h2 className="mt-5 font-jp text-4xl leading-tight text-pearl">
            日本の水産物を、世界の買い手へ。
          </h2>
          <p className="mt-5 text-base leading-relaxed text-soft-blue/75">
            需要の高い商品を季節と品質に合わせてご案内します。
          </p>
        </div>
        <div className="grid gap-px bg-white/10">
          {SEAFOOD.map((item, index) => (
            <MobilePanel key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopPanel({ item, index }: { item: SeafoodItem; index: number }) {
  return (
    <article className="product-panel relative h-screen w-full overflow-hidden">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="100vw"
        className="product-image object-cover will-change-transform"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-linear-to-r from-brand via-brand/38 to-brand/5" />
      <div className="absolute inset-0 bg-linear-to-t from-brand via-brand/12 to-brand/10" />
      <div className="absolute inset-0 bg-[radial-gradient(48rem_34rem_at_22%_50%,rgba(214,168,79,0.16),transparent_70%)]" />

      <div className="product-copy relative z-30 flex h-full items-center px-[8vw] pt-16 will-change-transform">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/18 bg-black/30 px-3 py-1 text-sm text-pearl backdrop-blur-md">
              <MapPin className="mr-1.5 inline size-3.5 text-gold" />
              {item.origin}
            </span>
            <span className="rounded-full border border-gold/40 bg-gold/18 px-3 py-1 text-sm text-gold backdrop-blur-md">
              <Snowflake className="mr-1.5 inline size-3.5" />
              {item.exportType}
            </span>
          </div>

          <p className="mt-8 font-jp text-xl tracking-[0.28em] text-gold/85">
            {String(index + 1).padStart(2, "0")} / {SEAFOOD.length.toString().padStart(2, "0")}
          </p>
          <span className="mt-6 block font-jp text-3xl text-pearl/78">
            {item.nameJp}
          </span>
          <h3 className="mt-4 font-jp text-6xl leading-[1.05] text-pearl xl:text-7xl">
            {item.name}
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft-blue/86">
            {item.description}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-base font-medium text-gold transition-colors hover:text-pearl"
          >
            在庫を問い合わせる
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function MobilePanel({ item, index }: { item: SeafoodItem; index: number }) {
  return (
    <article className="relative min-h-[34rem] overflow-hidden bg-brand">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-brand via-brand/54 to-brand/8" />
      <div className="relative z-10 flex min-h-[34rem] flex-col justify-end p-6">
        <p className="font-jp text-sm tracking-[0.28em] text-gold/80">
          {String(index + 1).padStart(2, "0")} / {SEAFOOD.length.toString().padStart(2, "0")}
        </p>
        <span className="mt-5 font-jp text-xl text-pearl/75">{item.nameJp}</span>
        <h3 className="mt-3 font-jp text-4xl leading-tight text-pearl">{item.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-soft-blue/82">
          {item.description}
        </p>
      </div>
    </article>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/shared/Reveal";
import { EASE } from "@/lib/motion";
import { HERO_IMAGE } from "@/lib/constants";

const FIELDS = [
  { name: "name", label: "お名前", type: "text", autoComplete: "name" },
  {
    name: "company",
    label: "会社名",
    type: "text",
    autoComplete: "organization",
  },
  { name: "email", label: "メールアドレス", type: "email", autoComplete: "email" },
  {
    name: "country",
    label: "仕向け国",
    type: "text",
    autoComplete: "country-name",
  },
] as const;

const inputClass = "h-11 rounded-xl bg-navy/40 px-3.5 placeholder:text-pearl/30";

/**
 * Closing call-to-action with an inquiry form. Submission is intercepted
 * and swapped for a polished success message.
 */
export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function focusForm() {
    const first = document.getElementById("inquiry-name");
    first?.scrollIntoView({ behavior: "smooth", block: "center" });
    (first as HTMLInputElement | null)?.focus({ preventScroll: true });
  }

  return (
    <section id="contact" className="section overflow-hidden">
      <div className="img-fallback pointer-events-none absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand via-brand/85 to-brand" />
        <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_30%_30%,rgba(214,168,79,0.08),transparent)]" />
      </div>

      <div className="container-narrow relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="max-w-xl">
          <span className="font-jp text-sm uppercase tracking-[0.35em] text-gold">
            お問い合わせ
          </span>
          <h2 className="mt-4 text-balance text-4xl text-pearl md:text-5xl">
            日本の上質な水産物を、あなたの市場へ。
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft-blue/80">
            輸出対応可能な商品や供給状況について、お気軽にご相談ください。
          </p>

          <Button
            variant="gold"
            size="xl"
            className="mt-8"
            onClick={focusForm}
          >
            輸出見積もりを依頼
            <ArrowRight />
          </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="gold-border glass-card relative p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex min-h-88 flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="mt-6 text-2xl text-pearl">
                    ありがとうございます。輸出担当より折り返しご連絡します。
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    通常、1営業日以内に返信いたします。
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {FIELDS.map((f, i) => (
                      <Field key={f.name} label={f.label}>
                        <Input
                          id={i === 0 ? "inquiry-name" : undefined}
                          name={f.name}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          required
                          placeholder={f.label}
                          className={inputClass}
                        />
                      </Field>
                    ))}
                  </div>

                  <Field label="希望商品">
                    <Input
                      name="products"
                      type="text"
                      required
                      placeholder="例：本まぐろ、ほたて、うに"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="ご相談内容">
                    <Textarea
                      name="message"
                      rows={4}
                      placeholder="希望数量、時期、条件などをご記入ください"
                      className="min-h-28 rounded-xl bg-navy/40 px-3.5 py-2.5 placeholder:text-pearl/30"
                    />
                  </Field>

                  <Button type="submit" variant="gold" size="xl" className="mt-2 w-full">
                    送信する
                    <ArrowRight />
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    法人向け輸出相談を対象としています。供給可否は季節、等級、仕向け地により異なります。
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-pearl/60">
        {label}
      </span>
      {children}
    </label>
  );
}

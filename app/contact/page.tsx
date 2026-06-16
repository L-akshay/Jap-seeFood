import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Send } from "lucide-react";

import { InfoPage } from "@/components/shared/InfoPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/constants";
import { CONTACT_PAGE } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "お問い合わせ | 海宝",
  description: CONTACT_PAGE.description,
};

export default function ContactPage() {
  return (
    <>
      <InfoPage page={CONTACT_PAGE} />
      <section className="px-6 pb-24 sm:px-8">
        <div className="container-narrow grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-card p-6 md:p-8">
            <span className="font-jp text-sm uppercase tracking-[0.35em] text-gold">
              Inquiry
            </span>
            <h2 className="mt-4 text-3xl text-pearl">お問い合わせフォーム</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              希望商品、数量、仕向け国、希望納期などをお知らせください。内容を確認後、輸出担当よりご連絡いたします。
            </p>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="text-pearl">メール:</span> {SITE.email}
              </p>
              <p>
                <span className="text-pearl">返信目安:</span> 通常1営業日以内
              </p>
            </div>
          </div>

          <form
            action={`mailto:${SITE.email}`}
            method="post"
            encType="text/plain"
            className="gold-border glass-card grid gap-5 p-6 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="お名前" htmlFor="contact-name">
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="h-11 rounded-xl bg-navy/40 px-3.5"
                />
              </Field>
              <Field label="会社名" htmlFor="contact-company">
                <Input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  className="h-11 rounded-xl bg-navy/40 px-3.5"
                />
              </Field>
              <Field label="メールアドレス" htmlFor="contact-email">
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 rounded-xl bg-navy/40 px-3.5"
                />
              </Field>
              <Field label="電話番号" htmlFor="contact-phone">
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="h-11 rounded-xl bg-navy/40 px-3.5"
                />
              </Field>
              <Field label="仕向け国" htmlFor="contact-country">
                <Input
                  id="contact-country"
                  name="destinationCountry"
                  type="text"
                  autoComplete="country-name"
                  required
                  className="h-11 rounded-xl bg-navy/40 px-3.5"
                />
              </Field>
              <Field label="希望納期" htmlFor="contact-deadline">
                <Input
                  id="contact-deadline"
                  name="preferredDelivery"
                  type="text"
                  placeholder="例: 2026年8月上旬"
                  className="h-11 rounded-xl bg-navy/40 px-3.5 placeholder:text-pearl/30"
                />
              </Field>
            </div>

            <Field label="希望商品・数量" htmlFor="contact-products">
              <Input
                id="contact-products"
                name="productsAndQuantity"
                type="text"
                required
                placeholder="例: ほたて 500kg、冷凍まぐろ 200kg"
                className="h-11 rounded-xl bg-navy/40 px-3.5 placeholder:text-pearl/30"
              />
            </Field>

            <Field label="お問い合わせ内容" htmlFor="contact-message">
              <Textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                placeholder="梱包形態、温度帯、必要書類、その他条件などをご記入ください。"
                className="min-h-36 rounded-xl bg-navy/40 px-3.5 py-3 placeholder:text-pearl/30"
              />
            </Field>

            <Button type="submit" variant="gold" size="xl" className="mt-1 w-full">
              送信する
              <Send />
            </Button>

            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              送信時にメールアプリが開きます。入力内容をご確認のうえ送信してください。
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-pearl/60">
        {label}
      </span>
      {children}
    </label>
  );
}

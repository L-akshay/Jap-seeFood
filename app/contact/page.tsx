import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InfoPage } from "@/components/shared/InfoPage";
import { Button } from "@/components/ui/button";
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
        <div className="container-narrow glass-card flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="text-2xl text-pearl">見積もりフォームへ進む</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              トップページ下部のフォームから、商品と仕向け地を添えて送信できます。
            </p>
          </div>
          <Button variant="gold" size="xl" nativeButton={false} render={<Link href="/#contact" />}>
            フォームを開く
            <ArrowRight />
          </Button>
        </div>
      </section>
    </>
  );
}

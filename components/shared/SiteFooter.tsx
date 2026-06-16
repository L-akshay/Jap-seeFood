import Link from "next/link";
import { Anchor, Mail, MapPin, Phone } from "lucide-react";

import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gold/20 bg-navy/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_24rem_at_50%_0%,rgba(214,168,79,0.08),transparent)]" />
      <div className="container-narrow relative grid gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg border border-gold/35 bg-gold/10 text-gold">
              <Anchor className="size-5" />
            </span>
            <span>
              <span className="block font-jp text-xl font-semibold tracking-[0.18em] text-pearl">
                {SITE.nameJp}
              </span>
              <span className="mt-1 block text-xs tracking-[0.24em] text-gold/75">
                日本水産物輸出
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-pearl/75">
            <a className="inline-flex items-center gap-2 hover:text-gold" href={`mailto:${SITE.email}`}>
              <Mail className="size-4 text-gold" />
              {SITE.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4 text-gold" />
              +81-3-0000-0000
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" />
              東京都中央区築地 1-1-1
            </span>
          </div>
        </div>

        <FooterColumn title="サイト">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="会社・法務">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>
      </div>

      <div className="relative border-t border-white/10 px-6 py-5 text-center text-xs text-muted-foreground">
        © 2026 {SITE.nameJp}. 無断転載を禁じます。
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-jp text-sm font-semibold tracking-[0.22em] text-gold">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-3 text-sm text-pearl/75 [&_a]:transition [&_a:hover]:text-gold">
        {children}
      </div>
    </div>
  );
}

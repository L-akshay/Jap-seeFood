import Link from "next/link";
import { Anchor, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050814]/88 backdrop-blur-2xl">
      <div className="container-narrow flex min-h-16 items-center gap-4 px-5 py-2.5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="海宝 ホーム">
          <span className="flex size-10 items-center justify-center rounded-lg border border-gold/35 bg-gold/10 text-gold shadow-[0_0_24px_-12px_rgba(214,168,79,0.9)]">
            <Anchor className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-jp text-xl font-semibold tracking-[0.2em] text-pearl">
              {SITE.nameJp}
            </span>
            <span className="mt-1 text-[0.62rem] tracking-[0.32em] text-gold/80">
              日本水産物輸出
            </span>
          </span>
        </Link>

        <nav
          aria-label="主要ナビゲーション"
          className="ml-auto hidden items-center gap-2 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghostLink"
              nativeButton={false}
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <Button
          variant="gold"
          size="lg"
          className="ml-auto md:ml-3"
          nativeButton={false}
          render={<Link href="/contact" />}
        >
          <Mail />
          相談する
        </Button>
      </div>

      <nav
        aria-label="モバイルナビゲーション"
        className="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-2 md:hidden"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-lg px-3 py-2 text-sm text-pearl/75 transition hover:bg-white/5 hover:text-pearl"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

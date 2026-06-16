import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/shared/Background";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "海宝 - 日本の高品質な水産物輸出",
  description:
    "旬を見極めた日本の水産物を、品質管理とトレーサビリティを大切に世界へお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`dark ${playfair.variable} ${inter.variable} ${notoSerifJp.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Background />
        <ScrollProgress />
        <SmoothScrollProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

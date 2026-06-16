import type { Metadata } from "next";

import { InfoPage } from "@/components/shared/InfoPage";
import { ABOUT_PAGE } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "会社概要 | 海宝",
  description: ABOUT_PAGE.description,
};

export default function AboutPage() {
  return <InfoPage page={ABOUT_PAGE} />;
}

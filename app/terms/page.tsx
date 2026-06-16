import type { Metadata } from "next";

import { InfoPage } from "@/components/shared/InfoPage";
import { TERMS_PAGE } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "利用規約 | 海宝",
  description: TERMS_PAGE.description,
};

export default function TermsPage() {
  return <InfoPage page={TERMS_PAGE} />;
}

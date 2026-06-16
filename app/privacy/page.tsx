import type { Metadata } from "next";

import { InfoPage } from "@/components/shared/InfoPage";
import { PRIVACY_PAGE } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 海宝",
  description: PRIVACY_PAGE.description,
};

export default function PrivacyPage() {
  return <InfoPage page={PRIVACY_PAGE} />;
}

import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { SeafoodShowcase } from "@/components/landing/SeafoodShowcase";
import { WhyJapanSection } from "@/components/landing/WhyJapanSection";
import { ExportProcess } from "@/components/landing/ExportProcess";
import { FinalCTA } from "@/components/landing/FinalCTA";

/**
 * Landing page composition — a single-page, landing-only experience
 * (no dashboard, auth, or backend). Sections render in narrative order from
 * hero through the closing inquiry CTA.
 */
export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <TrustStrip />
      <SeafoodShowcase />
      <WhyJapanSection />
      <ExportProcess />
      <FinalCTA />
    </main>
  );
}

import SiteHeader from "../components/layout/Header";
import SiteFooter from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import VideoSection from "../components/landing/VideoSection";
import FeatureSection from "../components/landing/FeatureSection";
import EbookSection from "../components/landing/EbookSection";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-(--bg-1)">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <FeatureSection />
        <EbookSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofBanner from "@/components/SocialProofBanner";
import ConsultationSection from "@/components/ConsultationSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-matte-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* 1. Hero Bölümü */}
      <HeroSection />

      {/* 2. Neler Kazanacaksın Bölümü */}
      <BenefitsSection />

      {/* 3. Sosyal Kanıt Bannerı */}
      <SocialProofBanner />

      {/* 4. Özel Danışmanlık & Koçluk Seansı Bölümü */}
      <ConsultationSection />

      {/* 5. Satın Alma & Fiyatlandırma Bölümü */}
      <PricingSection />

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}

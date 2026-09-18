import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import SecretLawShowcase from "@/components/SecretLawShowcase";
import SocialProofBanner from "@/components/SocialProofBanner";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
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

      {/* 3. Gizli Arşiv Vitrini: 100 Sarsılmaz Kanundan Biri (3D Sansürlü Kart) */}
      <SecretLawShowcase />

      {/* 4. Sosyal Kanıt Bannerı */}
      <SocialProofBanner />

      {/* 5. Satın Alma & Fiyatlandırma Bölümü */}
      <PricingSection />

      {/* 6. Sıkça Sorulan Sorular (SSS) Akordiyon Bölümü */}
      <FaqSection />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}

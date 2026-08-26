import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import SocialProofBanner from "@/components/SocialProofBanner";
import ConsultationSection from "@/components/ConsultationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
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

      {/* 3. Sosyal Kanıt Bannerı */}
      <SocialProofBanner />

      {/* 4. Özel Danışmanlık & Koçluk Seansı Bölümü */}
      <ConsultationSection />

      {/* 5. Sarsılmaz Sonuçlar & Danışan Yorumları (m1-m8) */}
      <TestimonialsSection />

      {/* 6. Satın Alma & Fiyatlandırma Bölümü */}
      <PricingSection />

      {/* 7. Sıkça Sorulan Sorular (SSS) Akordiyon Bölümü */}
      <FaqSection />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BookChooserSection from "@/components/BookChooserSection";
import VazgecilmezSection from "@/components/VazgecilmezSection";
import BookDivider from "@/components/BookDivider";
import BenefitsSection from "@/components/BenefitsSection";
import LawArchive from "@/components/LawArchive";
import SocialProofBanner from "@/components/SocialProofBanner";
import PricingSection from "@/components/PricingSection";
import CekicilikSection from "@/components/CekicilikSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-matte-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* 1. Hero Bölümü */}
      <HeroSection />

      {/* 1b. Hangi kitap senin için? */}
      <BookChooserSection />

      {/* 2a. Vazgeçilmez Olma Sanatı tanıtım */}
      <VazgecilmezSection />

      {/* 2b. Çekicilik Sanatı tanıtım (iki kitap tanıtımı art arda) */}
      <CekicilikSection />

      {/* 2. Neler Kazanacaksın Bölümü */}
      {/* Vazgeçilmez detaylarına geçiş ayracı */}
      <BookDivider />

      <BenefitsSection />

      {/* 3. Gizli Arşiv Vitrini: 100 Sarsılmaz Kanundan Biri (3D Sansürlü Kart) */}
      <LawArchive />

      {/* 5. Satın Alma & Fiyatlandırma Bölümü */}
      <PricingSection />


      {/* 6. Ortak: Sosyal Kanıt */}
      <SocialProofBanner />

      {/* 6. Sıkça Sorulan Sorular (SSS) Akordiyon Bölümü */}
      <FaqSection />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}

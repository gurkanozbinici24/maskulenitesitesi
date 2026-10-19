import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ConsultationSection from "@/components/ConsultationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConsultationFaq from "@/components/ConsultationFaq";
import ConsultationApply from "@/components/ConsultationApply";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Birebir Strateji Seansı (VIP) | Gürkan Özbinici",
  description:
    "Gürkan Özbinici ile birebir strateji seansı (45 dk, 3.500 TL; ilk seansa özel 2 e-kitap ve 1 hafta WhatsApp desteği hediye) ve VIP Mentörlük (ayda 4 seans + 7/24 WhatsApp desteği). Başvuru ile.",
};

export default function DanismanlikPage() {
  return (
    <main className="min-h-screen bg-matte-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Dedicated Page Content with Spacing for Fixed Navbar */}
      <div className="pt-16 sm:pt-20">
        <ConsultationSection />
        <TestimonialsSection />
        <ConsultationApply />
        <ConsultationFaq />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

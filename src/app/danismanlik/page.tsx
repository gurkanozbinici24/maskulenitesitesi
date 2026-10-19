import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ConsultationSection from "@/components/ConsultationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConsultationFaq from "@/components/ConsultationFaq";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Birebir Strateji Seansı (VIP) | Gürkan Özbinici",
  description:
    "Gürkan Özbinici ile 45 dakikalık birebir ilişki stratejisi seansı. Google Meet veya WhatsApp üzerinden, sesli ya da görüntülü. 2.500 TL.",
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
        <ConsultationFaq />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ConsultationSection from "@/components/ConsultationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Özel Danışmanlık & VIP Mentörlük | Vazgeçilmez Olma Sanatı",
  description:
    "Gürkan Özbinici ile birebir ilişki psikolojisi, stratejik çerçeve yönetimi ve kişisel kriz analizi seansları.",
};

export default function DanismanlikPage() {
  return (
    <main className="min-h-screen bg-matte-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-black">
      {/* Navigation */}
      <Navbar />

      {/* Dedicated Page Content with Spacing for Fixed Navbar */}
      <div className="pt-20 sm:pt-24">
        <ConsultationSection />
        <TestimonialsSection />
        <FaqSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ConsultationSection from "@/components/ConsultationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConsultationFaq from "@/components/ConsultationFaq";
import ConsultationApply from "@/components/ConsultationApply";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Erkekler İçin İlişki Koçluğu ve İlişki Danışmanlığı – Gürkan Özbinici",
  alternates: { canonical: "/danismanlik" },
  description:
    "Erkeklere özel birebir ilişki koçluğu ve ilişki danışmanlığı, Gürkan Özbinici ile: 45 dakikalık strateji seansı (10.000 TL, ilk seansa özel 2 fiziksel kitap ve 2 hafta WhatsApp desteği hediye) ve VIP Mentörlük. Google Meet veya WhatsApp, başvuru ile.",
  keywords: ["erkekler için ilişki koçluğu", "erkek ilişki koçu", "ilişki koçluğu", "ilişki danışmanlığı", "ilişki koçu", "online ilişki danışmanı", "gürkan özbinici danışmanlık", "maskülenite danışmanlık"],
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

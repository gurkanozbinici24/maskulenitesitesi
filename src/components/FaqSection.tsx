"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, Mail } from "lucide-react";
import { ThemeSectionHeader } from "./ui/ThemeSystem";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Fiziksel kitap tekrar basıldı mı? Yenilenmiş Edisyon nedir?",
    answer:
      "İlk 200 kişi için numaralandırılmış 1. Baskı Koleksiyon Serisi tamamen tükenmiştir. Okurlarımızdan gelen yoğun ilgi üzerine fiziksel kitabımız 'Yenilenmiş Edisyon' olarak yeniden basılmıştır. İçerik birebir aynıdır; yeni kapak tasarımı ve daha büyük, okunaklı yazı boyutu (büyük punto) ile kapıya kadar ücretsiz kargo ayrıcalığıyla sunulmaktadır.",
  },
  {
    id: 2,
    question: "Yenilenmiş Edisyon fiziksel kitabın içerik olarak E-Kitap veya 1. Baskı'dan farkı var mı?",
    answer:
      "Hayır, içerik birebir aynıdır. 227 sayfalık tüm bölümler ve ilişki psikolojisi kanunları eksiksiz olarak yer alır. Yenilenmiş Edisyon; yeni kapağı ve okuma konforunu artıran daha büyük, okunaklı puntosuyla fiziksel kitap tutkunları için hazırlandı. Kargo beklemek istemeyen okurlarımız ise E-Kitap sürümünü hemen sipariş ederek okumaya başlayabilir.",
  },
  {
    id: 3,
    question: "Dijital E-Kitap paketini satın aldığımda nasıl okuyacağım?",
    answer:
      "Siparişinizi WhatsApp üzerinden verirsiniz. Ödemeniz onaylandıktan sonra e-kitap (PDF, EPUB ve Kindle formatlarında) e-posta adresinize gönderilir. Kargo beklemeden telefon, tablet veya bilgisayarınızdan okumaya başlayabilirsiniz.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // İlk soru açık gelsin

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="sss"
      className="py-24 relative overflow-hidden bg-matte-950 border-t border-zinc-900 scroll-mt-24"
    >
      {/* Arka Plan Atmosfer Işıkları */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mahogany-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık & Rozet */}
        <ThemeSectionHeader
          theme="kitap1"
          badgeIcon={<Sparkles className="w-3.5 h-3.5 text-gold-400" />}
          badgeText="AKLINDAKİ TÜM SORULAR & CEVAPLAR"
          title="Sıkça Sorulan"
          highlightText="Sorular"
          subtitle="E-Kitap anında erişimi, Fiziksel Yenilenmiş Edisyon ve sipariş süreçleri hakkında merak edilen detaylar."
          className="mb-16"
        />

        {/* Akordiyon Listesi */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-matte-900/90 border-gold-500/60 shadow-[0_4px_30px_rgba(212,175,55,0.08)]"
                    : "bg-matte-900/50 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Soru Başlığı Butonu */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full min-h-[56px] py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 focus:outline-none select-none cursor-pointer active:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-fluid-base sm:text-fluid-lg font-bold tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-gold-500" : "text-zinc-100 hover:text-gold-300"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 border ${
                      isOpen
                        ? "rotate-180 bg-gold-500/15 border-gold-500/40 text-gold-500"
                        : "bg-zinc-800/80 border-zinc-700/80 text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Açılır Cevap Alanı */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 sm:px-8 sm:pb-7 text-fluid-sm sm:text-fluid-base text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alt Bilgi & Doğrudan E-posta İletişim */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-matte-900/60 border border-zinc-800/80 hover:border-gold-500/30 transition-colors flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300 text-center shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <span>
            Başka bir sorunuz veya kriz durumunuz mu var? Doğrudan e-posta yoluyla bize ulaşabilirsiniz:{" "}
            <a
              href="mailto:maskulenitesitesi@gmail.com"
              className="text-gold-400 hover:text-gold-300 font-bold underline decoration-gold-500/50 underline-offset-4 transition-colors"
            >
              maskulenitesitesi@gmail.com
            </a>
          </span>
        </div>

      </div>
    </section>
  );
}


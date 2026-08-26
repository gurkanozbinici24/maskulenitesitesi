"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, ShieldCheck, Mail } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Özel Koleksiyon Edisyonu (Fiziksel Kitap) ileride tekrar basılacak mı?",
    answer:
      "Hayır. Bu özel koleksiyon eseri sadece 200 adet basılmış olup yazar tarafından numaralandırılarak imzalanmaktadır. Stoklar tükendiğinde fiziksel kopya bir daha asla basılmayacak ve satışa açılmayacaktır.",
  },
  {
    id: 2,
    question: "Fiziksel kitabın kargosu ne zaman yola çıkar?",
    answer:
      "Siparişiniz sistemimize düştüğü andan itibaren maksimum 24 saat içerisinde özel paketlemesi yapılarak kargoya teslim edilir.",
  },
  {
    id: 3,
    question: "Dijital E-Kitap paketini satın aldığımda nasıl okuyacağım?",
    answer:
      "Ödemeniz tamamlandığı saniye indirme bağlantınız ekranda belirir ve kopyası e-posta adresinize otomatik olarak gönderilir. Beklemek yok, cihazınıza indirip anında okumaya başlayabilirsiniz.",
  },
  {
    id: 4,
    question: "Özel Danışmanlık seanslarında gizlilik sağlanıyor mu?",
    answer:
      "Kesinlikle. Birebir seanslarımız %100 gizlilik prensibiyle yürütülür. Paylaşılan tüm detaylar, durum analizleri ve kişisel krizler tamamen aramızda kalır.",
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
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık & Rozet */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matte-850 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>AKLINDAKİ TÜM SORULAR & CEVAPLAR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Sıkça Sorulan <span className="gold-text-gradient">Sorular</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Kitap basımları, teslimat süreci ve VIP danışmanlık hakkında en çok merak edilen detaylar.
          </p>
        </div>

        {/* Akordiyon Listesi */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-matte-900/90 border-[#D4AF37]/60 shadow-[0_4px_30px_rgba(212,175,55,0.08)]"
                    : "bg-matte-900/50 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Soru Başlığı Butonu */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 focus:outline-none select-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-[#D4AF37]" : "text-zinc-100 hover:text-gold-300"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 border ${
                      isOpen
                        ? "rotate-180 bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]"
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
                    <div className="px-6 pb-6 sm:px-8 sm:pb-7 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-4">
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

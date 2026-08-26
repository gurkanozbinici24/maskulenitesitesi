"use client";

import { useState } from "react";
import { Lock, Sparkles, EyeOff, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";

export default function SecretLawShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4; // Çok hafif ve tok 3D eğim
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-matte-950 border-t border-b border-zinc-900 w-full">
      {/* Gizemli ve Tok Bronz/Şampanya Ambiyans Işığı */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#8B7355]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-zinc-800/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matte-900/90 border border-[#8B7355]/30 text-[#C5A059] text-[11px] font-mono uppercase tracking-[0.18em] mb-4 shadow-sm">
          <EyeOff className="w-3.5 h-3.5 text-[#C5A059]/80" strokeWidth={1.5} />
          <span>KORUMALI ARŞİV KAYDI</span>
        </div>

        {/* Asil Şampanya Altını Üst Başlık */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#C5A059] tracking-[0.14em] uppercase mb-12 select-none">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN SADECE BİRİ...
        </h2>

        {/* 3D Perspektif Kapsayıcısı */}
        <div
          className="perspective-[1400px] flex justify-center items-center w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Tok, Mat Siyah, Ağır VIP Kitap Sayfası Kartı */}
          <div
            className="w-full max-w-3xl rounded-3xl p-7 sm:p-12 md:p-14 relative transition-transform duration-500 ease-out border border-[#8B7355]/30 hover:border-[#8B7355]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(139,115,85,0.12)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg, #09090c 0%, #050507 100%)",
            }}
          >
            {/* Sayfa Üst Bilgisi (SAYFA 221 Düzeltmesi) */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-zinc-800/80 text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-2 text-[#C5A059]/90 font-bold">
                <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>SAYFA 221 • KANUN #93</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-400 font-medium text-[10px] tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3 text-[#C5A059]/80" strokeWidth={1.5} />
                <span>ÖZEL BASKI METNİ</span>
              </div>
            </div>

            {/* Otoriter Serif Metin (Geniş Satır Aralığı & Ferah Tipografi) */}
            <blockquote className="font-serif text-lg sm:text-2xl md:text-[26px] text-zinc-200 leading-[1.85] sm:leading-[2] tracking-wide text-left sm:text-center select-none">
              <span className="text-[#C5A059] font-bold font-mono text-xl sm:text-2xl mr-2">
                93.
              </span>
              Bir kadınla tartışırken ona{" "}
              {/* Lüks Buzlu Cam / Mat Siyah Redacted Sansür Efekti */}
              <span className="censor relative inline-flex items-center justify-center align-middle mx-1.5 px-4 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-[#8B7355]/40 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.6)] cursor-not-allowed group/censor select-none">
                {/* Altındaki Bulanıklaştırılmış Metin */}
                <span className="filter blur-[6.5px] opacity-25 text-[#C5A059] font-sans text-sm sm:text-base select-none">
                  &quot;Sen bilirsin&quot;
                </span>
                {/* Üstündeki Minimal, İnce Çizgili Kilit İkonu */}
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                  <Lock
                    className="w-3.5 h-3.5 text-[#C5A059] opacity-75 group-hover/censor:opacity-100 transition-opacity"
                    strokeWidth={1.5}
                  />
                </span>
              </span>{" "}
              deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
              karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
              <strong className="font-serif font-bold text-[#C5A059] tracking-normal [text-shadow:0_0_15px_rgba(197,160,89,0.25)]">
                en ağır nükleer bombadır.
              </strong>
            </blockquote>

            {/* Kart Altı Notu */}
            <div className="mt-9 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="text-zinc-400">Kitaptaki 100 Kanundan Biri</span>
              <span className="text-[#C5A059]/80 font-medium">Kalan 99 Kanun Kitapta</span>
            </div>
          </div>
        </div>

        {/* Asil CTA Butonu */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-[0_4px_25px_rgba(197,160,89,0.28)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <Sparkles className="w-4 h-4 text-black animate-pulse" />
            <span>TÜM KANUNLARI DEŞİFRE ET</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-3">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

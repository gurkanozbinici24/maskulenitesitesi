"use client";

import { useState } from "react";
import { Lock, Sparkles, EyeOff, ArrowRight, BookOpen } from "lucide-react";

export default function SecretLawShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 3; // Ağır ve tok 3D eğim
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
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
          <span>KORUMALI ARŞİV DOSYASI</span>
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
          {/* Mühürlü Klasör Dosyası Kartı (Mat Siyah, Çift Çerçeve, Köşe Braketleri) */}
          <div
            className="w-full max-w-3xl rounded-2xl p-8 sm:p-12 md:p-14 relative transition-transform duration-500 ease-out border border-[#8B7355]/40 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_40px_rgba(139,115,85,0.12)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg, #09090c 0%, #040406 100%)",
            }}
          >
            {/* Klasik ve Simetrik Lüks Köşe Braketleri */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#C5A059]/70 pointer-events-none" />

            {/* Sayfa Üst Bilgisi (Ferah Nefes Boşluğu, Sayfa 221 & Mühür Rozeti) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-9 border-b border-zinc-800/80 text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-2.5 text-[#C5A059] font-bold tracking-widest text-xs">
                <BookOpen className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                <span>SAYFA 221 • KANUN #93</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0d0d11] border border-zinc-800 text-zinc-400 font-mono text-[10px] tracking-[0.16em] uppercase self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                <span>MÜHÜRLÜ METİN</span>
              </div>
            </div>

            {/* Otoriter Serif Metin (Geniş Satır Aralığı & Ağır Ton) */}
            <blockquote className="font-serif text-lg sm:text-2xl md:text-[26px] text-zinc-200 leading-[1.85] sm:leading-[2.1] tracking-wide text-left sm:text-center select-none">
              <span className="text-[#C5A059] font-bold font-mono text-xl sm:text-2xl mr-2">
                93.
              </span>
              Bir kadınla tartışırken ona{" "}
              {/* Gerçek Devlet Evrakı Redacted Bant (Siyah Sansür Şeridi) */}
              <span
                className="censor relative inline-flex items-center justify-center align-middle mx-1 px-3.5 py-0.5 bg-[#000000] border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                title="Sansürlü İçerik"
              >
                {/* Tamamen Karartılmış Metin */}
                <span className="filter blur-[8px] opacity-10 text-black select-none pointer-events-none">
                  Sen bilirsin
                </span>
                {/* Minimal İnce Çizgili Klasör Kilit Mührü */}
                <span className="absolute inset-0 flex items-center justify-center bg-black">
                  <Lock
                    className="w-3.5 h-3.5 text-[#C5A059]/70"
                    strokeWidth={1.25}
                  />
                </span>
              </span>{" "}
              deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
              karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
              <strong className="font-serif font-bold text-[#C5A059] tracking-normal [text-shadow:0_0_15px_rgba(197,160,89,0.25)]">
                en ağır nükleer bombadır.
              </strong>
            </blockquote>

            {/* Otoriter Mühür Alt Metni (Sayım Kaldırıldı, Silik & Otoriter Mühür Eklendi) */}
            <div className="mt-10 pt-5 border-t border-zinc-900/90 flex items-center justify-center text-center">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-zinc-500/80 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
              </span>
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

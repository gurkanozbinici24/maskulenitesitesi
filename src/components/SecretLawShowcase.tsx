"use client";

import { useState } from "react";
import { Lock, EyeOff, ArrowRight, BookOpen } from "lucide-react";

export default function SecretLawShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="gizli-arsiv"
      className="py-14 sm:py-18 relative overflow-hidden w-full select-none"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Saf Siyah Zemin Işığı - Kesinlikle Lacivert/Mavi Ton Barındırmaz */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-[#8B7355]/40 text-[#C5A059] text-[10px] font-mono uppercase tracking-[0.16em] mb-3 shadow-sm">
          <EyeOff className="w-3 h-3 text-[#C5A059]/80" strokeWidth={1.5} />
          <span>KORUMALI ARŞİV KAYDI</span>
        </div>

        {/* Orantılı, Dengeli ve Sıkı Üst Başlık */}
        <h2 className="font-cinzel text-base sm:text-lg md:text-xl font-bold text-[#D4AF37] tracking-[0.1em] uppercase mb-6 select-none max-w-xl mx-auto [text-shadow:0_0_15px_rgba(212,175,55,0.25)]">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN SADECE BİRİ...
        </h2>

        {/* 3D Perspektif Kapsayıcısı */}
        <div
          className="perspective-[1400px] flex justify-center items-center w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Kompakt, Şık ve Zarif Belge Kutusu (Saf Siyah #000000, Yarı Yarıya Küçültülmüş Dolgu) */}
          <div
            className="w-full max-w-2xl rounded-xl p-5 sm:p-7 md:p-8 relative transition-transform duration-500 ease-out border border-[#8B7355]/40 shadow-[0_20px_50px_rgba(0,0,0,1),0_0_30px_rgba(184,134,11,0.05)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              backgroundColor: "#000000",
            }}
          >
            {/* Simetrik Minimal Köşe Vurguları */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#C5A059]/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C5A059]/60 pointer-events-none" />

            {/* Sayfa Üst Bilgisi */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-zinc-900 text-[10px] sm:text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-2 text-[#C5A059] font-bold tracking-widest">
                <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" strokeWidth={1.5} />
                <span>SAYFA 221 • KANUN #93</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-black border border-zinc-800 text-zinc-400 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                <span>MÜHÜRLÜ METİN</span>
              </div>
            </div>

            {/* Otoriter Playfair Display Metin (Ferah ve Kompakt Manifesto) */}
            <blockquote className="font-playfair text-base sm:text-lg md:text-xl text-zinc-100 leading-[1.75] sm:leading-[1.9] tracking-normal text-left sm:text-center select-none">
              <span className="text-[#C5A059] font-bold font-mono text-base sm:text-lg mr-1.5">
                93.
              </span>
              Bir kadınla tartışırken ona{" "}
              {/* Gerçek Devlet Evrakı Redacted Bant (Siyah Sansür Şeridi) */}
              <span
                className="censor relative inline-flex items-center justify-center align-middle mx-1 px-3 py-0.5 bg-black border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_1px_3px_rgba(0,0,0,1)]"
                title="Sansürlü İçerik"
              >
                {/* Tamamen Gizlenmiş Metin */}
                <span className="filter blur-[8px] opacity-0 text-black select-none pointer-events-none text-sm">
                  Sen bilirsin
                </span>
                {/* İnce Çizgili Klasör Kilit Mührü */}
                <span className="absolute inset-0 flex items-center justify-center bg-black">
                  <Lock
                    className="w-3 h-3 text-[#C5A059]/75"
                    strokeWidth={1.25}
                  />
                </span>
              </span>{" "}
              deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
              karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
              <strong className="font-playfair font-bold text-[#C5A059] [text-shadow:0_0_12px_rgba(197,160,89,0.25)]">
                en ağır nükleer bombadır.
              </strong>
            </blockquote>

            {/* Otoriter Mühür Alt Metni */}
            <div className="mt-6 pt-3.5 border-t border-zinc-950 flex items-center justify-center text-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-zinc-500/75 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
              </span>
            </div>
          </div>
        </div>

        {/* Zincirsiz, Tek Başına, Sade ve Asil CTA Butonu */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <span>TÜM KANUNLARI DEŞİFRE ET</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </a>

          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-2.5">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

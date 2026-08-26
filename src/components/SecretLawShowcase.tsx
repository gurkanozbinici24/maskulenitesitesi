"use client";

import { useState } from "react";
import { Lock, Sparkles, EyeOff, ArrowRight, ShieldAlert, BookOpen } from "lucide-react";

export default function SecretLawShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6; // Max 3 deg tilt
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-matte-950 border-t border-b border-zinc-900 w-full">
      {/* Atmosferik Altın ve Amber Işık Hüzmeleri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet & Başlık */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matte-850 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-inner">
          <EyeOff className="w-3.5 h-3.5 text-gold-400" />
          <span>SANSÜRLÜ ARŞİV DOSYASI</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-wider uppercase mb-12 select-none [text-shadow:0_0_20px_rgba(212,175,55,0.35)]">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN SADECE BİRİ...
        </h2>

        {/* 3D Perspektif Kapsayıcısı */}
        <div
          className="perspective-[1200px] flex justify-center items-center w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Lüks 3D Kitap Sayfası Kartı */}
          <div
            className="w-full max-w-3xl rounded-3xl p-6 sm:p-10 md:p-14 relative transition-transform duration-300 ease-out border-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.18),0_25px_50px_rgba(0,0,0,0.95)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              background:
                "radial-gradient(ellipse at top, #14141a 0%, #08080a 65%, #030304 100%)",
            }}
          >
            {/* Sayfa Üst Bilgisi (VIP Doküman Başlığı) */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800/80 text-[11px] sm:text-xs font-mono text-zinc-500 tracking-wider">
              <div className="flex items-center gap-2 text-gold-400 font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SAYFA 184 • KANUN #93</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-500/30 text-red-400 font-semibold uppercase text-[10px]">
                <ShieldAlert className="w-3 h-3" />
                <span>KORUMALI İÇERİK</span>
              </div>
            </div>

            {/* Otoriter Serif Metin (Playfair / Georgia Havası) */}
            <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl text-zinc-200 leading-relaxed sm:leading-[1.7] text-left md:text-center select-none">
              <span className="text-gold-400 font-bold text-2xl sm:text-3xl font-mono mr-2">
                93.
              </span>
              Bir kadınla tartışırken ona{" "}
              {/* Sansürlü 1. Kritik Bölüm: "Sen bilirsin" */}
              <span className="censor relative inline-flex items-center justify-center align-middle mx-1 px-3 py-0.5 rounded bg-zinc-950/90 border border-gold-500/40 overflow-hidden cursor-not-allowed group/censor select-none">
                <span className="filter blur-[6.5px] opacity-30 text-gold-300 font-sans text-base sm:text-xl select-none">
                  &quot;Sen bilirsin&quot;
                </span>
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px] transition-all">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 opacity-75 group-hover/censor:opacity-100 transition-opacity" />
                </span>
              </span>{" "}
              deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
              karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
              <strong className="text-white font-extrabold text-gold-200 [text-shadow:0_0_15px_rgba(212,175,55,0.4)]">
                en ağır nükleer bombadır.
              </strong>
            </blockquote>

            {/* Kart Altı Notu */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="text-zinc-400">Kitaptaki 100 Kanundan Biri</span>
              <span className="text-gold-500/80 font-bold">Kalan 99 Kanun Gizli</span>
            </div>

            {/* Altın Köşe Vurguları */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-500/40 rounded-tl pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-500/40 rounded-tr pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-500/40 rounded-bl pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-500/40 rounded-br pointer-events-none" />
          </div>
        </div>

        {/* CTA Butonu: Tüm Kanunları Deşifre Et */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300 select-none"
          >
            <Sparkles className="w-4 h-4 text-black animate-pulse" />
            <span>TÜM KANUNLARI DEŞİFRE ET</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform" />
          </a>
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-3">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

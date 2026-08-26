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
    <section className="py-24 relative overflow-hidden bg-[#000000] border-t border-b border-zinc-900 w-full">
      {/* Tok Bronz & Altın Ambiyans Işığı (Asla Mavi/Lacivert Ton Barındırmaz) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-[#B8860B]/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#8B7355]/8 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0c] border border-[#8B7355]/30 text-[#C5A059] text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-sm">
          <EyeOff className="w-3.5 h-3.5 text-[#C5A059]/80" strokeWidth={1.5} />
          <span>KORUMALI ARŞİV KAYDI</span>
        </div>

        {/* İddialı, Lüks Cinzel Serif Üst Başlık */}
        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-[0.14em] uppercase mb-12 select-none [text-shadow:0_0_24px_rgba(212,175,55,0.3)]">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN SADECE BİRİ...
        </h2>

        {/* 3D Perspektif Kapsayıcısı */}
        <div
          className="perspective-[1400px] flex justify-center items-center w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Lüks Kasa / Mühürlü Klasör Kartı (Saf Mat Siyah, Çift Çerçeve, Simetrik Köşe Braketleri) */}
          <div
            className="w-full max-w-3xl rounded-2xl p-8 sm:p-12 md:p-14 relative transition-transform duration-500 ease-out border border-[#8B7355]/40 shadow-[0_30px_70px_rgba(0,0,0,1),0_0_40px_rgba(184,134,11,0.1)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              background: "radial-gradient(ellipse at 50% 0%, #0d0d10 0%, #050507 70%, #000000 100%)",
            }}
          >
            {/* Simetrik Lüks Köşe Detayları */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />

            {/* Sayfa Üst Bilgisi (SAYFA 221 & Mühür Rozeti Arasında Ferah Nefes Alanı) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-zinc-800/80 text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-2.5 text-[#C5A059] font-bold tracking-widest text-xs">
                <BookOpen className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                <span>SAYFA 221 • KANUN #93</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0b0b0e] border border-zinc-800 text-zinc-400 font-mono text-[10px] tracking-[0.16em] uppercase self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
                <span>MÜHÜRLÜ METİN</span>
              </div>
            </div>

            {/* Otoriter Playfair Display Metin (Geniş Satır Aralığı & Ağır VIP Manifesto) */}
            <blockquote className="font-playfair text-lg sm:text-2xl md:text-[26px] text-zinc-100 leading-[1.9] sm:leading-[2.2] tracking-wide text-left sm:text-center select-none">
              <span className="text-[#C5A059] font-bold font-mono text-xl sm:text-2xl mr-2">
                93.
              </span>
              Bir kadınla tartışırken ona{" "}
              {/* Gerçek Devlet Evrakı Redacted Bant (Siyah Sansür Şeridi) */}
              <span
                className="censor relative inline-flex items-center justify-center align-middle mx-1 px-4 py-0.5 bg-[#000000] border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                title="Sansürlü İçerik"
              >
                {/* Tamamen Gizlenmiş Metin */}
                <span className="filter blur-[8px] opacity-0 text-black select-none pointer-events-none">
                  Sen bilirsin
                </span>
                {/* İnce Çizgili Klasör Kilit Mührü */}
                <span className="absolute inset-0 flex items-center justify-center bg-black">
                  <Lock
                    className="w-3.5 h-3.5 text-[#C5A059]/75"
                    strokeWidth={1.25}
                  />
                </span>
              </span>{" "}
              deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
              karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
              <strong className="font-playfair font-bold text-[#C5A059] tracking-normal [text-shadow:0_0_15px_rgba(197,160,89,0.25)]">
                en ağır nükleer bombadır.
              </strong>
            </blockquote>

            {/* Otoriter Mühür Alt Metni */}
            <div className="mt-11 pt-5 border-t border-zinc-900/90 flex items-center justify-center text-center">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-zinc-500/75 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
              </span>
            </div>
          </div>
        </div>

        {/* 3D Zincir Motifi & CTA Butonu Bloğu */}
        <div className="mt-14 flex flex-col items-center justify-center group/chain">
          
          {/* 3D Metalik Ağır Zincir Motifi (Kilit Açılıyor Mikro Hissi) */}
          <div className="relative mb-3 flex items-center justify-center select-none transition-transform duration-300 ease-out group-hover/chain:scale-105 group-hover/chain:-translate-y-1">
            <svg
              className="w-48 sm:w-56 h-10 overflow-visible text-[#8B7355]"
              viewBox="0 0 200 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metalik Demir/Bronz Degrade */}
                <linearGradient id="chainMetal" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4A453F" />
                  <stop offset="35%" stopColor="#C5A059" />
                  <stop offset="65%" stopColor="#2A2724" />
                  <stop offset="100%" stopColor="#141312" />
                </linearGradient>
                <linearGradient id="lockGold" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="60%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#8B7355" />
                </linearGradient>
                <filter id="chainShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Sol Zincir Baklaları */}
              <g filter="url(#chainShadow)" className="transition-transform duration-300 group-hover/chain:-translate-x-1">
                <rect x="25" y="12" width="30" height="16" rx="8" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
                <rect x="45" y="10" width="32" height="20" rx="9" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
                <rect x="68" y="12" width="30" height="16" rx="8" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
              </g>

              {/* Sağ Zincir Baklaları */}
              <g filter="url(#chainShadow)" className="transition-transform duration-300 group-hover/chain:translate-x-1">
                <rect x="102" y="12" width="30" height="16" rx="8" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
                <rect x="123" y="10" width="32" height="20" rx="9" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
                <rect x="145" y="12" width="30" height="16" rx="8" stroke="url(#chainMetal)" strokeWidth="4.5" fill="#070709" />
              </g>

              {/* Merkez Kilit & Ağır Mühür Halkası */}
              <g filter="url(#chainShadow)" className="transition-all duration-300 group-hover/chain:scale-110 origin-center">
                <rect x="86" y="8" width="28" height="24" rx="6" fill="#141418" stroke="url(#lockGold)" strokeWidth="2" />
                {/* Asma Kilit Halkası */}
                <path d="M94 8V5C94 2.8 95.8 1 98 1H102C104.2 1 106 2.8 106 5V8" stroke="url(#lockGold)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Anahtar Deliği */}
                <circle cx="100" cy="18" r="2" fill="#D4AF37" />
                <path d="M100 20V24" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          {/* Asil CTA Butonu */}
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-[0_4px_25px_rgba(197,160,89,0.28)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <Sparkles className="w-4 h-4 text-black animate-pulse" />
            <span>TÜM KANUNLARI DEŞİFRE ET</span>
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
          </a>

          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-3">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

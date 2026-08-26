"use client";

import { useState } from "react";
import { Lock, EyeOff, ArrowRight, BookOpen } from "lucide-react";

export default function SecretLawShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="gizli-arsiv"
      className="py-24 relative overflow-hidden w-full select-none"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Saf Siyah Zemin - Kesinlikle Lacivert/Mavi Işık Barındırmaz */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808] border border-[#8B7355]/40 text-[#C5A059] text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-sm">
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
          {/* Lüks Kasa / Mühürlü Klasör Kartı (Tamamen Saf Siyah #000000) */}
          <div
            className="w-full max-w-3xl rounded-2xl p-8 sm:p-12 md:p-14 relative transition-transform duration-500 ease-out border border-[#8B7355]/40 shadow-[0_30px_70px_rgba(0,0,0,1),0_0_40px_rgba(184,134,11,0.06)]"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: "preserve-3d",
              backgroundColor: "#000000",
            }}
          >
            {/* Simetrik Lüks Köşe Detayları */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none" />

            {/* Sayfa Üst Bilgisi (SAYFA 221 & Mühür Rozeti) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-zinc-900 text-[11px] font-mono tracking-wider">
              <div className="flex items-center gap-2.5 text-[#C5A059] font-bold tracking-widest text-xs">
                <BookOpen className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                <span>SAYFA 221 • KANUN #93</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#080808] border border-zinc-800 text-zinc-400 font-mono text-[10px] tracking-[0.16em] uppercase self-start sm:self-auto">
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
                className="censor relative inline-flex items-center justify-center align-middle mx-1 px-4 py-0.5 bg-[#000000] border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_2px_4px_rgba(0,0,0,1)]"
                title="Sansürlü İçerik"
              >
                {/* Tamamen Karartılmış Metin */}
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
            <div className="mt-11 pt-5 border-t border-zinc-950 flex items-center justify-center text-center">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-zinc-500/75 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
              </span>
            </div>
          </div>
        </div>

        {/* Profesyonel Metalik Zincir Kurgusu & CTA Butonu */}
        <div className="mt-14 flex flex-col items-center justify-center">
          <div className="relative inline-flex flex-col items-center group/btn">
            
            {/* Butonun Üst Sınırına Binek Olarak Oturan ve Kenarlardan Sarkan Ağır Çelik Zincir */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[114%] sm:w-[118%] h-12 pointer-events-none z-20 flex items-center justify-center select-none">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 400 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Ağır Metalik Krom / Paslanmaz Çelik Degrade */}
                  <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#d1d5db" />
                    <stop offset="25%" stopColor="#9ca3af" />
                    <stop offset="55%" stopColor="#374151" />
                    <stop offset="85%" stopColor="#1f2937" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>

                  {/* Altın / Bronz Kilit Gövdesi */}
                  <linearGradient id="lockForged" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFDF73" />
                    <stop offset="40%" stopColor="#D4AF37" />
                    <stop offset="80%" stopColor="#8C6200" />
                    <stop offset="100%" stopColor="#4A3400" />
                  </linearGradient>

                  {/* Derin Gölge */}
                  <filter id="chainHeavyShadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.95" />
                  </filter>
                </defs>

                {/* Sol Kanat Zincir Halkaları (Kenardan Hafif Sarkan ve Gerilen) */}
                <g filter="url(#chainHeavyShadow)" className="transition-transform duration-300 ease-out group-hover/btn:-translate-x-1.5 group-hover/btn:-rotate-1 origin-right">
                  {/* Sarkan Uç Halka */}
                  <rect x="10" y="24" width="38" height="18" rx="9" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" transform="rotate(15 10 24)" />
                  <rect x="42" y="16" width="42" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" transform="rotate(6 42 16)" />
                  <rect x="80" y="13" width="44" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                  <rect x="120" y="14" width="44" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                  <rect x="158" y="15" width="40" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                </g>

                {/* Sağ Kanat Zincir Halkaları (Kenardan Hafif Sarkan ve Gerilen) */}
                <g filter="url(#chainHeavyShadow)" className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1.5 group-hover/btn:rotate-1 origin-left">
                  <rect x="202" y="15" width="40" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                  <rect x="238" y="14" width="44" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                  <rect x="278" y="13" width="44" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" />
                  <rect x="318" y="16" width="42" height="20" rx="10" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" transform="rotate(-6 318 16)" />
                  {/* Sarkan Sağ Uç Halka */}
                  <rect x="354" y="24" width="38" height="18" rx="9" stroke="url(#steelGrad)" strokeWidth="4.5" fill="#030303" transform="rotate(-15 354 24)" />
                </g>

                {/* Merkez: Buton Sınırına Oturan Ağır Çelik Kasa Kilidi */}
                <g filter="url(#chainHeavyShadow)" className="transition-all duration-300 ease-out group-hover/btn:scale-105 origin-center">
                  {/* Kilit Demir Kelepçesi */}
                  <path
                    d="M192 14V7C192 3 195.5 0 200 0C204.5 0 208 3 208 7V14"
                    stroke="url(#steelGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5"
                  />
                  {/* Dövme Kilit Gövdesi */}
                  <rect x="184" y="12" width="32" height="26" rx="6" fill="#0d0d0f" stroke="url(#lockForged)" strokeWidth="2.5" />
                  {/* Kilit Perçinleri */}
                  <circle cx="189" cy="17" r="1.2" fill="#D4AF37" />
                  <circle cx="211" cy="17" r="1.2" fill="#D4AF37" />
                  {/* Anahtar Deliği */}
                  <circle cx="200" cy="23" r="2.5" fill="#D4AF37" />
                  <path d="M200 25.5V29.5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            {/* Asil ve Tok CTA Butonu */}
            <a
              href="#fiyat-kartlari"
              className="relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-4.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-[0_4px_30px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_40px_rgba(212,175,55,0.55)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 select-none z-10"
            >
              <span className="tracking-widest">TÜM KANUNLARI DEŞİFRE ET</span>
              <ArrowRight className="w-4 h-4 text-black group-hover/btn:translate-x-1.5 transition-transform" />
            </a>

          </div>

          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-3.5">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

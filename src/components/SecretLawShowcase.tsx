"use client";

import { Lock, EyeOff, ArrowRight } from "lucide-react";

export default function SecretLawShowcase() {
  return (
    <section
      id="gizli-arsiv"
      className="py-18 sm:py-24 relative overflow-hidden w-full select-none"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Saf Siyah Zemin Işığı - Asla Lacivert/Mavi Ton Barındırmaz */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-[#D4AF37]/5 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-[#8B7355]/40 text-[#C5A059] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 shadow-sm">
          <EyeOff className="w-3.5 h-3.5 text-[#C5A059]/80" strokeWidth={1.5} />
          <span>KORUMALI ARŞİV KAYITLARI</span>
        </div>

        {/* 3 Seçkin Örnek Üst Başlığı */}
        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-[0.14em] uppercase mb-14 select-none max-w-3xl mx-auto [text-shadow:0_0_20px_rgba(212,175,55,0.25)]">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN 3 SEÇKİN ÖRNEK
        </h2>

        {/* Kart Dizilimi (Ortadaki Kart 100% Keskin 2D, Yan Kartlar Ayrı 3D Açıyla Katlanmış) */}
        <div className="relative flex flex-col md:flex-row items-center justify-center mb-16 gap-8 md:gap-0">
          
          {/* ========================================================= */}
          {/* 1. SOL KANAT KARTI: KANUN #41 (Sayfa 148 - 3D Açılı & Buzlu) */}
          {/* ========================================================= */}
          <div
            className="group relative flex flex-col justify-between w-full max-w-sm md:max-w-md lg:max-w-[400px] min-h-[380px] sm:min-h-[410px] rounded-2xl p-7 sm:p-8 border border-[#8B7355]/30 shadow-[0_20px_50px_rgba(0,0,0,1)] transition-all duration-500 overflow-hidden z-10 md:origin-right md:-mr-16 lg:-mr-20 opacity-75 hover:opacity-95"
            style={{
              backgroundColor: "#000000",
              transform: "perspective(1000px) rotateY(48deg)",
            }}
          >
            {/* Köşe Braketleri */}
            <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#C5A059]/40 pointer-events-none z-10" />

            {/* Arka Planda Yoğun Bulanık Metin */}
            <div className="filter blur-[9px] opacity-20 select-none pointer-events-none">
              <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-zinc-900 text-[10px] sm:text-[11px] font-mono tracking-[0.22em]">
                <span className="text-[#C5A059] uppercase font-bold">SAYFA 148</span>
                <span className="text-zinc-500 uppercase">KORUMALI METİN</span>
              </div>
              <blockquote className="font-playfair text-[17px] sm:text-[18px] text-[#E2DFD8] leading-[1.85] text-left">
                <span className="font-normal mr-2">41 ·</span>
                Bir kadını elinde tutmanın tek yolu, onu her an bırakıp gidebilecek o sarsılmaz güce sahip olmaktır. Çünkü zayıf bir adamın asla sahip olamayacağı o tek gerçek kozu elinde tutuyorsun.
              </blockquote>
            </div>

            {/* ÖN KATMAN: Karartma & Parlayan Büyük Kilit */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[7px] flex flex-col items-center justify-center p-6 select-none z-20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-black/90 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-3 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                <Lock className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-mono tracking-[0.22em] text-[#D4AF37] uppercase font-bold text-center">
                SAYFA 148 • KANUN #41
              </span>
              <span className="text-[10px] font-mono tracking-[0.16em] text-zinc-400 uppercase mt-1 text-center">
                MÜHÜRLÜ VE KİLİTLİ METİN
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase mt-2 text-center">
                Tam İçerik Yalnızca Kitapta
              </span>
            </div>

            {/* Mühür Alt Metni */}
            <div className="mt-8 pt-4 border-t border-zinc-950 flex items-center justify-center text-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-zinc-600 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ.
              </span>
            </div>
          </div>


          {/* ========================================================= */}
          {/* 2. ORTA KART: KANUN #93 (Sayfa 221 - 100% NET, KESKİN & ODAK) */}
          {/* ========================================================= */}
          <div
            className="relative flex flex-col justify-between w-full max-w-lg md:max-w-xl lg:max-w-[490px] min-h-[410px] sm:min-h-[440px] rounded-2xl p-8 sm:p-9 lg:p-10 border-2 border-[#D4AF37]/80 shadow-[0_35px_90px_rgba(0,0,0,1),0_0_60px_rgba(212,175,55,0.18)] z-30 select-text"
            style={{
              backgroundColor: "#000000",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "optimizeLegibility",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Simetrik Lüks Altın Köşe Braketleri */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

            <div>
              {/* Sayfa Üst Bilgisi (Daktilo / Arşiv Stili - Keskin Font) */}
              <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-zinc-900 text-[11px] font-mono tracking-[0.22em] select-none">
                <span className="text-[#D4AF37] uppercase font-bold">
                  SAYFA 221 • KANUN #93
                </span>
                <span className="text-zinc-500 uppercase">
                  KORUMALI METİN
                </span>
              </div>

              {/* Kristal Netliğinde Playfair Display Metin (Bıçak Gibi Keskin) */}
              <blockquote className="font-playfair text-[17px] sm:text-[18px] lg:text-[19px] text-[#F3F1EC] leading-[1.85] sm:leading-[1.95] tracking-normal text-left">
                <span className="font-playfair text-[#F3F1EC] font-normal mr-2">
                  93<span className="text-[#D4AF37] ml-1 opacity-90">·</span>
                </span>
                Bir kadınla tartışırken ona{" "}
                {/* Sadece "Sen bilirsin" Sansürlü Siyah Redacted Bant */}
                <span
                  className="censor relative inline-flex items-center justify-center align-middle mx-1 px-3.5 py-0.5 bg-black border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_1px_3px_rgba(0,0,0,1)]"
                  title="Sansürlü İçerik"
                >
                  <span className="opacity-0 text-black select-none pointer-events-none text-xs sm:text-sm">
                    Sen bilirsin
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center bg-black">
                    <Lock
                      className="w-3.5 h-3.5 text-[#D4AF37]"
                      strokeWidth={1.25}
                    />
                  </span>
                </span>{" "}
                deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime,
                karşındakini kendi çaresizliğiyle baş başa bırakan{" "}
                <strong className="font-playfair font-semibold text-[#D4AF37] tracking-normal">
                  en ağır nükleer bombadır.
                </strong>
              </blockquote>
            </div>

            {/* Otoriter Mühür Alt Metni */}
            <div className="mt-8 pt-4 border-t border-zinc-950 flex items-center justify-center text-center">
              <span className="text-[10px] font-mono tracking-[0.22em] text-zinc-500 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
              </span>
            </div>
          </div>


          {/* ========================================================= */}
          {/* 3. SAĞ KANAT KARTI: KANUN #62 (Sayfa 84 - 3D Açılı & Buzlu) */}
          {/* ========================================================= */}
          <div
            className="group relative flex flex-col justify-between w-full max-w-sm md:max-w-md lg:max-w-[400px] min-h-[380px] sm:min-h-[410px] rounded-2xl p-7 sm:p-8 border border-[#8B7355]/30 shadow-[0_20px_50px_rgba(0,0,0,1)] transition-all duration-500 overflow-hidden z-10 md:origin-left md:-ml-16 lg:-ml-20 opacity-75 hover:opacity-95"
            style={{
              backgroundColor: "#000000",
              transform: "perspective(1000px) rotateY(-48deg)",
            }}
          >
            {/* Köşe Braketleri */}
            <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#C5A059]/40 pointer-events-none z-10" />
            <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#C5A059]/40 pointer-events-none z-10" />

            {/* Arka Planda Yoğun Bulanık Metin */}
            <div className="filter blur-[9px] opacity-20 select-none pointer-events-none">
              <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-zinc-900 text-[10px] sm:text-[11px] font-mono tracking-[0.22em]">
                <span className="text-[#C5A059] uppercase font-bold">SAYFA 84</span>
                <span className="text-zinc-500 uppercase">KORUMALI METİN</span>
              </div>
              <blockquote className="font-playfair text-[17px] sm:text-[18px] text-[#E2DFD8] leading-[1.85] text-left">
                <span className="font-normal mr-2">62 ·</span>
                Kriz anında sızlanma. Darbeyi al, o suyu yut ve onu yeni büyüme motoruna çevirerek Anti-Kırılgan ol.
              </blockquote>
            </div>

            {/* ÖN KATMAN: Karartma & Parlayan Büyük Kilit */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[7px] flex flex-col items-center justify-center p-6 select-none z-20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-black/90 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-3 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                <Lock className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-mono tracking-[0.22em] text-[#D4AF37] uppercase font-bold text-center">
                SAYFA 84 • KANUN #62
              </span>
              <span className="text-[10px] font-mono tracking-[0.16em] text-zinc-400 uppercase mt-1 text-center">
                MÜHÜRLÜ VE KİLİTLİ METİN
              </span>
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase mt-2 text-center">
                Tam İçerik Yalnızca Kitapta
              </span>
            </div>

            {/* Mühür Alt Metni */}
            <div className="mt-8 pt-4 border-t border-zinc-950 flex items-center justify-center text-center">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-zinc-600 uppercase select-none">
                BU ARŞİV DIŞARI SIZDIRILMAZ.
              </span>
            </div>
          </div>

        </div>

        {/* Ortalanmış Asil Kasa Anahtarı CTA Butonu */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-3.5 px-9 sm:px-14 py-4 sm:py-4.5 font-cinzel text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-black bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#B8860B] rounded-xl border border-[#FFF0B3]/50 shadow-[0_6px_30px_rgba(212,175,55,0.35),0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] transition-all duration-300 select-none"
          >
            <span>100 KANUNUN TAM METNİNE ERİŞ</span>
            <ArrowRight
              className="w-3.5 h-3.5 text-black/85 group-hover:translate-x-1 transition-transform"
              strokeWidth={1.5}
            />
          </a>

          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.16em] mt-3 select-none">
            Doğrudan Paket Seçeneklerine İlerle
          </span>
        </div>

      </div>
    </section>
  );
}

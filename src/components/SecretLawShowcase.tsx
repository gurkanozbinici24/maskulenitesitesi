"use client";

import { Lock, EyeOff, ArrowRight } from "lucide-react";

interface LawItem {
  id: number;
  page: number;
  lawNumber: number;
  preText: string;
  censoredText: string;
  midText?: string;
  highlightText?: string;
}

const laws: LawItem[] = [
  {
    id: 1,
    page: 221,
    lawNumber: 93,
    preText: "Bir kadınla tartışırken ona ",
    censoredText: "Sen bilirsin",
    midText: " deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime, karşındakini kendi çaresizliğiyle baş başa bırakan ",
    highlightText: "en ağır nükleer bombadır.",
  },
  {
    id: 2,
    page: 148,
    lawNumber: 41,
    preText: "Bir kadını elinde tutmanın tek yolu, ",
    censoredText: "onu her an bırakıp gidebilecek o sarsılmaz güce",
    midText: " sahip olmaktır. Çünkü zayıf bir adamın asla sahip olamayacağı o tek gerçek kozu elinde tutuyorsun.",
    highlightText: "",
  },
  {
    id: 3,
    page: 84,
    lawNumber: 62,
    preText: "Kriz anında sızlanma. Darbeyi al, o suyu yut ve onu yeni büyüme motoruna çevirerek ",
    censoredText: "Anti-Kırılgan ol",
    midText: ".",
    highlightText: "",
  },
];

export default function SecretLawShowcase() {
  return (
    <section
      id="gizli-arsiv"
      className="py-18 sm:py-24 relative overflow-hidden w-full select-none"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Saf Siyah Zemin Işığı - Asla Lacivert/Mavi Ton Barındırmaz */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-[#8B7355]/40 text-[#C5A059] text-[11px] font-mono uppercase tracking-[0.2em] mb-4 shadow-sm">
          <EyeOff className="w-3.5 h-3.5 text-[#C5A059]/80" strokeWidth={1.5} />
          <span>KORUMALI ARŞİV KAYITLARI</span>
        </div>

        {/* 3 Seçkin Örnek Üst Başlığı */}
        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-[0.14em] uppercase mb-12 select-none max-w-3xl mx-auto [text-shadow:0_0_20px_rgba(212,175,55,0.25)]">
          GİZLİ ARŞİVDEN: 100 SARSILMAZ KANUNDAN 3 SEÇKİN ÖRNEK
        </h2>

        {/* 3'lü Yatay Tok ve Dengeli Kart Grid Düzeni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-14">
          {laws.map((law) => (
            <div
              key={law.id}
              className="flex flex-col justify-between min-h-[380px] sm:min-h-[410px] rounded-2xl p-7 sm:p-8 lg:p-9 relative border border-[#8B7355]/40 hover:border-[#C5A059]/60 shadow-[0_25px_60px_rgba(0,0,0,1),0_0_35px_rgba(184,134,11,0.04)] transition-all duration-300 group"
              style={{ backgroundColor: "#000000" }}
            >
              {/* Simetrik Lüks Köşe Braketleri */}
              <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#C5A059]/70 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#C5A059]/70 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#C5A059]/70 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#C5A059]/70 pointer-events-none" />

              <div>
                {/* Sayfa Üst Bilgisi (Daktilo / Arşiv Stili) */}
                <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-zinc-900/90 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] select-none">
                  <span className="text-[#C5A059]/90 uppercase font-bold">
                    SAYFA {law.page}
                  </span>
                  <span className="text-zinc-500/80 uppercase">
                    KORUMALI METİN
                  </span>
                </div>

                {/* Otoriter Playfair Display Metin (Kırık Fildişi & Asil Altın Vurgu) */}
                <blockquote className="font-playfair text-[17px] sm:text-[18px] lg:text-[19px] text-[#E2DFD8] leading-[1.85] sm:leading-[1.95] tracking-normal text-left select-none">
                  {/* Kural Numarası: Metinle Uyumlu Serif Font ve Zarif Ayıraç */}
                  <span className="font-playfair text-[#E2DFD8] font-normal mr-2">
                    {law.lawNumber}<span className="text-[#C5A059] ml-1 opacity-80">·</span>
                  </span>

                  {/* Ön Metin */}
                  {law.preText}

                  {/* Gerçek Devlet Evrakı Redacted Bant (Siyah Sansür Şeridi) */}
                  <span
                    className="censor relative inline-flex items-center justify-center align-middle mx-1 px-3.5 py-0.5 bg-black border-y border-zinc-800 select-none cursor-not-allowed shadow-[0_1px_3px_rgba(0,0,0,1)]"
                    title="Sansürlü İçerik"
                  >
                    {/* Tamamen Gizlenmiş Metin */}
                    <span className="filter blur-[8px] opacity-0 text-black select-none pointer-events-none text-xs sm:text-sm">
                      {law.censoredText}
                    </span>
                    {/* İnce Çizgili Klasör Kilit Mührü */}
                    <span className="absolute inset-0 flex items-center justify-center bg-black">
                      <Lock
                        className="w-3.5 h-3.5 text-[#C5A059]/80 group-hover:text-[#D4AF37] transition-colors"
                        strokeWidth={1.25}
                      />
                    </span>
                  </span>

                  {/* Ara Metin */}
                  {law.midText}

                  {/* Vurgulanan Asil Mat Altın Metin */}
                  {law.highlightText && (
                    <strong className="font-playfair font-semibold text-[#C5A059] tracking-normal ml-1">
                      {law.highlightText}
                    </strong>
                  )}
                </blockquote>
              </div>

              {/* Otoriter Mühür Alt Metni */}
              <div className="mt-8 pt-4 border-t border-zinc-950 flex items-center justify-center text-center">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-zinc-500/75 uppercase select-none">
                  BU ARŞİV DIŞARI SIZDIRILMAZ. TAM METİN SADECE 200 KİŞİYE ÖZELDİR.
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Kartın Altında Ortalanmış Tek ve Güçlü CTA Butonu */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="#fiyat-kartlari"
            className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <span>TÜM KANUNLARI DEŞİFRE ET</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
          </a>

          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-3">
            Tıkla ve doğrudan satın alma paketlerine kaydır
          </span>
        </div>

      </div>
    </section>
  );
}

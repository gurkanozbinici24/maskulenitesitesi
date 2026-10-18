"use client";

import Image from "next/image";
import { Crown, Gem, HeartHandshake } from "lucide-react";
import { BookCountdown } from "./ui/BookCountdown";
import { ThemeSectionHeader } from "./ui/ThemeSystem";
import { CEKICILIK_SANATI_CONFIG } from "@/config/cekicilikConfig";

/**
 * Çekicilik Sanatı bölümü (id="cekicilik-sanati").
 * Satış öncesi: kapak, tanıtım, büyük geri sayım ve haber al butonları.
 * Satış başlayınca (RELEASE_DATE): aynı yerde E-Kitap 600 TL / Fiziksel 1000 TL kartları.
 * Metinleri değiştirmek için aşağıdaki HIGHLIGHTS ve paragrafları düzenleyin.
 */
const HIGHLIGHTS = [
  {
    icon: Crown,
    title: "Çekim Gücü",
    text: "Varlığınla fark edilen, aranan ve özlenen kadının iç dünyasını keşfet.",
  },
  {
    icon: Gem,
    title: "Vazgeçilmezlik",
    text: "Kendi değerini bilerek ilişkide dengeyi ve saygıyı nasıl koruyacağını öğren.",
  },
  {
    icon: HeartHandshake,
    title: "İlişki Sanatı",
    text: "Erkek psikolojisini anlayarak ilişkinin dinamiklerini lehine çevir.",
  },
];

export default function CekicilikSection() {
  return (
    <section
      id="cekicilik-sanati"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-matte-950 via-[#12040a] to-matte-950 scroll-mt-24"
    >
      {/* Arka plan kırmızı / zümrüt ışık */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-crimson-700/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-emerald-600/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap2"
          badgeText="2. KİTAP • KADINLAR İÇİN"
          title="Çekicilik"
          highlightText="Sanatı"
          subtitle="Çekim gücü ve arzu duyulan vazgeçilmez kadının ilişki sanatı."
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
          {/* Kapak */}
          <div className="flex justify-center">
            <div className="relative w-[230px] sm:w-[280px] lg:w-[340px] aspect-[2/3]">
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-crimson-600/40 via-crimson-900/30 to-emerald-500/20 blur-3xl" />
              <div className="relative h-full w-full rounded-r-xl rounded-l-[4px] overflow-hidden border border-crimson-600/50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(185,28,28,0.3)]">
                <Image
                  src={CEKICILIK_SANATI_CONFIG.coverImage}
                  alt="Çekicilik Sanatı - Gürkan Özbinici"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 70vw, 340px"
                  className="object-cover object-[50%_68%]"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-white/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* Tanıtım + geri sayım / satış */}
          <div>
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl border border-crimson-900/60 bg-black/40 p-4"
                >
                  <Icon className="w-5 h-5 text-emerald-400 mb-2" />
                  <h3 className="font-cinzel text-sm font-bold text-white tracking-wide mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <BookCountdown theme="kitap2" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

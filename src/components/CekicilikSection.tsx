"use client";

import { useState } from "react";
import { Book3DModel } from "./HeroSection";
import { Crown, Gem, HeartHandshake } from "lucide-react";
import { BookCountdown } from "./ui/BookCountdown";
import { ThemeSectionHeader } from "./ui/ThemeSystem";
import { CEKICILIK_SANATI_CONFIG, CEKICILIK_PREVIEW_PAGES } from "@/config/cekicilikConfig";
import BookPreview from "./BookPreview";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";

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
  const [focused, setFocused] = useState(false);
  const { isOnSale } = useCekicilikLaunchStatus();
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
          {/* 3D Kapak */}
          <div
            className="book-3d-scene relative flex flex-col items-center justify-center py-6"
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            onClick={() => setFocused((f) => !f)}
          >
            <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-crimson-600/40 via-crimson-900/30 to-emerald-500/20 blur-3xl transition-transform duration-500 ${focused ? "scale-125" : ""}`} />
            <Book3DModel
              book="kitap2"
              orientation="left"
              isFocused={focused}
              isDimmed={false}
              sizeClassName="w-[210px] h-[315px] sm:w-[250px] sm:h-[375px] lg:w-[300px] lg:h-[450px]"
              imageSizes="(max-width: 1024px) 60vw, 300px"
            />
            <div className="pointer-events-none mt-8 h-4 w-[70%] max-w-[260px] rounded-full bg-crimson-600/40 blur-lg" />
            <div className="pointer-events-none -mt-3 h-3 w-[55%] max-w-[200px] rounded-full bg-black/90 blur-md" />
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

            <div data-sticky-hide>
              <BookCountdown theme="kitap2" size="lg" />
            </div>
            <div className="mt-6">
            {CEKICILIK_PREVIEW_PAGES.length > 0 && (
              <BookPreview
                variant="card"
                theme="kitap2"
                heading="İlk Sayfaları Oku"
                pages={CEKICILIK_PREVIEW_PAGES}
                cta={
                  isOnSale
                    ? {
                        label: "Hemen Tamamına Eriş – 600 TL",
                        href: CEKICILIK_SANATI_CONFIG.products.ebook.whatsappUrl,
                        external: true,
                      }
                    : {
                        label: "5 Kasım'da Tamamına Eriş – Haber Al",
                        href: CEKICILIK_SANATI_CONFIG.notifyWhatsappUrl,
                        external: true,
                      }
                }
              />
            )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Book3DModel } from "./HeroSection";
import { Shield, Compass, Flame, MessageCircle, Truck, Zap, Clock } from "lucide-react";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";
import { ThemeBadge, ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { VAZGECILMEZ_CONFIG, VAZGECILMEZ_PREVIEW_PAGES } from "@/config/cekicilikConfig";
import BookPreview from "./BookPreview";

/**
 * Vazgeçilmez Olma Sanatı tanıtım bölümü (id="vazgecilmez").
 * Çekicilik Sanatı bölümünün altın/maun temalı eşi.
 * E-kitap şimdi satışta; Yenilenmiş Edisyon fiziksel kitap RELEASE_DATE'te otomatik satışa açılır.
 */
const HIGHLIGHTS = [
  {
    icon: Flame,
    title: "Yıkılan Doğrular",
    text: "Sana dayatılan onay arayan yalanları bırak, oyunun gerçek kurallarını gör.",
  },
  {
    icon: Shield,
    title: "Sarsılmaz Çerçeve",
    text: "Krizlerde eğilmeyen, manipülasyona kapalı bir karakter inşa et.",
  },
  {
    icon: Compass,
    title: "Oyunun Kuralları",
    text: "Çekim ve güç dinamiklerini oku, ilişkiyi sen yönet.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function VazgecilmezSection() {
  const [focused, setFocused] = useState(false);
  const { mounted, isOnSale, timeLeft } = useCekicilikLaunchStatus();
  const { ebook, physicalRenovated } = VAZGECILMEZ_CONFIG;

  const units = [
    { label: "Gün", value: timeLeft.days },
    { label: "Saat", value: timeLeft.hours },
    { label: "Dakika", value: timeLeft.minutes },
    { label: "Saniye", value: timeLeft.seconds },
  ];

  return (
    <section
      id="vazgecilmez"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-matte-950 via-[#140c06] to-matte-950 scroll-mt-24"
    >
      {/* Arka plan altın / konyak ışık */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-gold-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-mahogany-600/20 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap1"
          badgeText="1. KİTAP • ERKEKLER İÇİN"
          title="Vazgeçilmez Olma"
          highlightText="Sanatı"
          subtitle={"İlişkilerde kazanma sanatı. Kuralları koyan taraf\u00a0ol."}
          titleClassName="text-[min(6.2vw,1.8rem)] sm:text-fluid-3xl whitespace-nowrap"
          className="lg:hidden"
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
          {/* Sol sütun: bilgisayarda başlık + 3D kapak */}
          <div className="flex flex-col items-center">
          <div className="hidden lg:block text-center mb-2">
            <ThemeBadge theme="kitap1" status="etiket" className="text-[10px]">
              <span>1. KİTAP • ERKEKLER İÇİN</span>
            </ThemeBadge>
            <h2 className="mt-4 font-black uppercase tracking-tight leading-[1.05] text-white text-[2.6rem] xl:text-[2.9rem]">
              Vazgeçilmez Olma <span className="gold-text-gradient">Sanatı</span>
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              İlişkilerde kazanma sanatı. Kuralları koyan taraf{"\u00a0"}ol.
            </p>
          </div>
          <div
            className="book-3d-scene relative flex flex-col items-center justify-center py-6 lg:py-4"
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            onClick={() => setFocused((f) => !f)}
          >
            <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-gold-500/35 via-mahogany-600/35 to-amber-400/20 blur-3xl transition-transform duration-500 ${focused ? "scale-125" : ""}`} />
            <Book3DModel
              book="kitap1"
              orientation="left"
              isFocused={focused}
              isDimmed={false}
              sizeClassName="w-[210px] h-[315px] sm:w-[250px] sm:h-[375px] lg:h-[min(390px,40svh)] lg:w-[calc(min(390px,40svh)*0.6667)]"
              imageSizes="(max-width: 1024px) 60vw, 300px"
            />
            <div className="pointer-events-none mt-8 h-4 w-[70%] max-w-[260px] rounded-full bg-gold-500/40 blur-lg" />
            <div className="pointer-events-none -mt-3 h-3 w-[55%] max-w-[200px] rounded-full bg-black/90 blur-md" />
            <div
              aria-label="227 sayfa"
              className="pointer-events-none relative mt-5 select-none rounded-full border border-gold-200/70 bg-[linear-gradient(180deg,#fff3c4_0%,#e6c46f_35%,#c9a55c_55%,#8a6420_100%)] px-7 py-2.5 font-cinzel text-sm font-black uppercase tracking-[0.3em] text-[#2a1a08] shadow-[0_0_28px_rgba(250,204,21,0.55),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(90,60,10,0.6)]"
            >
              227 Sayfa
            </div>
          </div>
          </div>

          {/* Tanıtım + satın alma */}
          <div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4 lg:mb-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-xl border border-gold-500/20 bg-black/40 p-4"
                >
                  <Icon className="w-5 h-5 text-gold-400 mb-2" />
                  <h3 className="font-cinzel text-sm font-bold text-white tracking-wide mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4" data-sticky-hide>
              {/* E-Kitap: şimdi satışta */}
              <div className="rounded-2xl border border-gold-500/50 bg-gradient-to-br from-mahogany-950/80 to-matte-950 p-5 flex flex-col shadow-gold-glow">
                <ThemeBadge theme="kitap1" status="satista" className="self-start text-[10px]">
                  <Zap className="w-3 h-3 fill-black text-black" />
                  <span>E-KİTAP SATIŞTA</span>
                </ThemeBadge>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-black text-white">{ebook.price}</span>
                  <span className="text-sm font-bold text-gold-400">TL</span>
                </div>
                <p className="mt-1 mb-4 text-xs text-zinc-400">
                  PDF, EPUB ve Kindle. Ödemenin ardından e-postanıza gönderilir.
                </p>
                <ThemeButton
                  theme="kitap1"
                  variant="primary"
                  size="md"
                  fullWidth
                  href={ebook.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Hemen Al</span>
                </ThemeButton>
              </div>

              {/* Fiziksel Yenilenmiş Edisyon */}
              <div className="rounded-2xl border border-mahogany-700/70 bg-gradient-to-br from-mahogany-950/60 to-matte-950 p-5 flex flex-col">
                <ThemeBadge
                  theme="kitap1"
                  status={isOnSale ? "satista" : "yakinda"}
                  className="self-start text-[10px]"
                >
                  {isOnSale ? <Truck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  <span>{isOnSale ? "FİZİKSEL KİTAP SATIŞTA" : "YENİLENMİŞ EDİSYON"}</span>
                </ThemeBadge>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-black text-white">
                    {physicalRenovated.price}
                  </span>
                  <span className="text-sm font-bold text-gold-400">TL</span>
                </div>
                <p className="mt-1 mb-4 text-xs text-zinc-400">
                  Yeni kapak, büyük punto. Kapıya kadar ücretsiz kargo.
                </p>

                {isOnSale ? (
                  <ThemeButton
                    theme="kitap1"
                    variant="primary"
                    size="md"
                    fullWidth
                    href={physicalRenovated.orderWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Sipariş Ver</span>
                  </ThemeButton>
                ) : (
                  <div className="mt-auto">
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      {units.map((u) => (
                        <div
                          key={u.label}
                          className="rounded-lg border border-gold-500/25 bg-black/50 py-1.5 text-center"
                        >
                          <div className="font-cinzel text-lg font-bold text-gold-300 leading-none">
                            {mounted ? pad(u.value) : "--"}
                          </div>
                          <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                            {u.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <ThemeButton
                      theme="kitap1"
                      variant="outline"
                      size="md"
                      fullWidth
                      href={physicalRenovated.notifyWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Çıkınca Haber Ver</span>
                    </ThemeButton>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <BookPreview
                  variant="card"
                  theme="kitap1"
                  heading="İlk Sayfaları Oku"
                  pages={VAZGECILMEZ_PREVIEW_PAGES}
                  cta={{
                    label: "Hemen Tamamına Eriş – 600 TL",
                    href: ebook.whatsappUrl,
                    external: true,
                  }}
                />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

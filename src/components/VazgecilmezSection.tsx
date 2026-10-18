"use client";

import Image from "next/image";
import { Shield, Compass, Flame, MessageCircle, Truck, Zap, Clock } from "lucide-react";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";
import { ThemeBadge, ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { VAZGECILMEZ_CONFIG } from "@/config/cekicilikConfig";

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
          subtitle="İlişkilerde kazanma sanatı. Kuralları koyan taraf ol."
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
          {/* Kapak */}
          <div className="flex justify-center">
            <div className="relative w-[230px] sm:w-[280px] lg:w-[340px] aspect-[2/3]">
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-gold-500/35 via-mahogany-600/35 to-amber-400/20 blur-3xl" />
              <div className="relative h-full w-full rounded-r-xl rounded-l-[4px] overflow-hidden border border-gold-500/50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.25)]">
                <Image
                  src={VAZGECILMEZ_CONFIG.coverImage}
                  alt="Vazgeçilmez Olma Sanatı - Gürkan Özbinici"
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 70vw, 340px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-white/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* Tanıtım + satın alma */}
          <div>
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
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

            <div className="grid sm:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}

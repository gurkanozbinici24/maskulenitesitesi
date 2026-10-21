"use client";

import { useState } from "react";
import { Check, CreditCard, Heart, MessageCircle, Package, Sparkles, Truck } from "lucide-react";
import { Book3DModel } from "./HeroSection";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";
import { ThemeButton } from "./ui/ThemeSystem";
import PhysicalPerks from "./ui/PhysicalPerks";
import AnindaTeslim from "./ui/AnindaTeslim";
import GiftLink from "./ui/GiftLink";
import { KART_ODEME_AKTIF, KOLEKSIYON_SETI_CONFIG as SET } from "@/config/cekicilikConfig";
import { odemeLinki } from "@/lib/odeme/urunler";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Koleksiyon Seti: iki fiziksel kitap birlikte (üstü çizili 2000 TL → 1700 TL).
 * 5 Kasım'a kadar geri sayım + haber al, sonra otomatik "Seti Sipariş Et".
 */
export default function BundleSection() {
  const [hover, setHover] = useState(false);
  const { mounted, isOnSale, timeLeft } = useCekicilikLaunchStatus(SET.releaseDate);
  const special = useCekicilikLaunchStatus(SET.launchSpecialUntil);
  const showSpecial = !special.isOnSale; // bitiş anı gelince etiket kalkar
  const units = [
    { l: "Gün", v: timeLeft.days },
    { l: "Saat", v: timeLeft.hours },
    { l: "Dakika", v: timeLeft.minutes },
    { l: "Saniye", v: timeLeft.seconds },
  ];

  return (
    <section id="koleksiyon-seti" className="relative overflow-hidden py-14 sm:py-24 scroll-mt-24">
      {/* İkiye bölünmüş arka plan: sol altın-maun, sağ kırmızı-siyah */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#1a1008_0%,#120b06_38%,#0d0607_50%,#160406_62%,#1d0508_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[620px] -translate-y-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[620px] -translate-y-1/2 rounded-full bg-crimson-700/15 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* İki kitap: kutu set gibi yan yana */}
        <div
          className="book-3d-scene relative flex items-center justify-center py-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setHover((h) => !h)}
        >
          <div className="pointer-events-none absolute left-[18%] top-1/2 h-[70%] w-[45%] -translate-y-1/2 rounded-full bg-gold-500/25 blur-3xl" />
          <div className="pointer-events-none absolute right-[18%] top-1/2 h-[70%] w-[45%] -translate-y-1/2 rounded-full bg-crimson-600/30 blur-3xl" />
          <div
            className={`relative z-10 transition-transform duration-700 ease-out ${
              hover ? "-translate-x-4 -rotate-3" : "translate-x-3 -rotate-1"
            }`}
          >
            <Book3DModel
              book="kitap1"
              isFocused={false}
              isDimmed={false}
              sizeClassName="w-[128px] h-[192px] sm:w-[190px] sm:h-[285px]"
              imageSizes="(max-width: 640px) 45vw, 200px"
            />
          </div>
          <div
            className={`relative z-20 transition-transform duration-700 ease-out ${
              hover ? "translate-x-4 rotate-3" : "-translate-x-3 rotate-1"
            }`}
          >
            <Book3DModel
              book="kitap2"
              isFocused={false}
              isDimmed={false}
              sizeClassName="w-[128px] h-[192px] sm:w-[190px] sm:h-[285px]"
              imageSizes="(max-width: 640px) 45vw, 200px"
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-4 w-[70%] -translate-x-1/2 rounded-full bg-black/80 blur-lg" />
        </div>

        {/* Teklif */}
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-black/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              <Package className="h-3.5 w-3.5" />
              {SET.name} · 2 Fiziksel Kitap
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson-500/50 bg-gradient-to-r from-crimson-900/70 to-crimson-700/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-crimson-100">
              <Heart className="h-3.5 w-3.5 fill-crimson-400 text-crimson-400" />
              Sevgilinle Birlikte Oku
            </div>
          </div>
          <h2 className="mt-4 font-cinzel text-[clamp(1.8rem,4.5vw,2.9rem)] font-bold leading-tight text-white">
            Aynı Oyunun <span className="gold-text-gradient">İki</span>{" "}
            <span className="bg-gradient-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Tarafı</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            O kendi kitabında güçlenecek, sen kendininkinde.{" "}
            <span className="text-zinc-200">Aynı masada, iki güçlü taraf.</span>
          </p>

          {/* Fiyat */}
          {showSpecial && (
          <div className="mt-6 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-gold-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Lansmana Özel
            </span>
          </div>
          )}
          <div className={`${showSpecial ? "mt-3" : "mt-6"} flex items-end justify-center gap-4 lg:justify-start`}>
            <span className="relative pb-1.5 font-mono text-2xl font-bold text-zinc-500">
              {SET.oldPrice} TL
              <span className="absolute left-[-4%] top-1/2 h-[2px] w-[108%] -rotate-6 bg-crimson-500" />
            </span>
            <span className="font-mono text-5xl sm:text-6xl font-black leading-none text-white [text-shadow:0_0_30px_rgba(212,175,55,0.45)]">
              {SET.price}
              <span className="ml-1 text-2xl text-gold-400">TL</span>
            </span>
          </div>

          <ul className="mx-auto mt-6 max-w-md space-y-2.5 text-left text-sm text-zinc-300 lg:mx-0">
            {[
              "Vazgeçilmez Olma Sanatı (Yenilenmiş Edisyon) + Çekicilik Sanatı",
              "Kapıya kadar ücretsiz kargo",
              "İki kitap da isminize özel imzalı",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-gold-500/50 bg-gold-500/15 text-gold-400">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-center lg:justify-start"><AnindaTeslim tip="fiziksel" metin="İmzalı kitapların 2 gün içinde kapında" /></div>
          <PhysicalPerks theme="kitap1" className="mx-auto mt-4 max-w-md lg:mx-0" />

          <div className="mx-auto mt-7 max-w-md lg:mx-0" data-sticky-hide>
            {isOnSale && KART_ODEME_AKTIF ? (
              <ThemeButton
                theme="kitap1"
                variant="primary"
                size="lg"
                fullWidth
                href={odemeLinki("koleksiyon-seti")}
                className="mb-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Kartla Hemen Al – {SET.price} TL</span>
              </ThemeButton>
            ) : null}
            {isOnSale ? (
              <ThemeButton
                theme="kitap1"
                variant={KART_ODEME_AKTIF ? "secondary" : "primary"}
                size="lg"
                fullWidth
                href={SET.orderWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className={`h-5 w-5 ${KART_ODEME_AKTIF ? "text-gold-400" : ""}`} />
                <span>{KART_ODEME_AKTIF ? `WhatsApp'tan Sipariş Et – ${SET.price} TL` : `Seti Sipariş Et – ${SET.price} TL`}</span>
              </ThemeButton>
            ) : null}
            {isOnSale ? (
              <GiftLink href={SET.giftWhatsappUrl} className="mt-2" />
            ) : (
              <>
                <div className="mb-3 grid grid-cols-4 gap-2">
                  {units.map((u) => (
                    <div
                      key={u.l}
                      className="rounded-lg border border-gold-500/25 bg-black/50 py-2 text-center"
                    >
                      <div className="font-cinzel text-xl font-bold leading-none text-gold-300">
                        {mounted ? pad(u.v) : "--"}
                      </div>
                      <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                        {u.l}
                      </div>
                    </div>
                  ))}
                </div>
                <ThemeButton
                  theme="kitap1"
                  variant="primary"
                  size="lg"
                  fullWidth
                  href={SET.notifyWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>5 Kasım&apos;da Satışta · Haber Al</span>
                </ThemeButton>
              </>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500 lg:justify-start">
              <Truck className="h-3.5 w-3.5 text-gold-500" />
              Siparişler WhatsApp üzerinden alınır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

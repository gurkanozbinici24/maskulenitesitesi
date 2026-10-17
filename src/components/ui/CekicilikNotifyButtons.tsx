"use client";

import React from "react";
import { Instagram, MessageCircle } from "lucide-react";
import {
  CEKICILIK_SANATI_CONFIG,
  KART_ODEME_AKTIF,
  RELEASE_DATE,
  TRAILER_URL,
  type CekicilikProductOption,
} from "@/config/cekicilikConfig";
import { ThemeButton } from "./ThemeSystem";
import {
  CekicilikSalesOptions,
  TrailerModalButton,
  useCekicilikLaunchStatus,
  type CountdownSize,
} from "./BookCountdown";

export interface CekicilikNotifyButtonsProps {
  /** Boyut: "sm" / "kucuk" (kitap kartı altı için) veya "lg" / "buyuk" (bölüm için) */
  size?: CountdownSize;
  /** Özel çıkış tarihi (varsayılan: config RELEASE_DATE) */
  releaseDate?: string;
  /** Tanıtım videosu linki (doluysa yanında küçük modal butonu görünür) */
  trailerUrl?: string;
  /** Satış başladığında otomatik olarak satın alma seçeneklerini göster (varsayılan: true) */
  showSalesWhenExpired?: boolean;
  /** Kartla ödeme aktif mi (varsayılan: config KART_ODEME_AKTIF) */
  kartOdemeAktif?: boolean;
  /** İleride iyzico bağlandığında Sepete Ekle callback'i */
  onAddToCart?: (product: CekicilikProductOption) => void;
  className?: string;
}

/**
 * Çekicilik Sanatı — Satış Öncesi "Haber Al" Buton Grubu
 * - İsim veya e-posta toplamaz (form yoktur).
 * - "WhatsApp'tan Haber Al" (905455207999 — "Çekicilik Sanatı çıktığında haber almak istiyorum.")
 * - "Instagram'da Takip Et" (https://www.instagram.com/maskulenitesitesi)
 * - Kitap2 (kırmızı/zümrüt) temasında, en az 48px dokunmatik yüksekliğinde.
 * - useCekicilikLaunchStatus ile süre dolduğunda sayfa yenilenmeden otomatik gizlenir ve
 *   yerine satış seçenekleri (E-Kitap 600 TL / Fiziksel Kitap 1000 TL) çıkar.
 */
export function CekicilikNotifyButtons({
  size = "lg",
  releaseDate = RELEASE_DATE,
  trailerUrl = TRAILER_URL,
  showSalesWhenExpired = true,
  kartOdemeAktif = KART_ODEME_AKTIF,
  onAddToCart,
  className = "",
}: CekicilikNotifyButtonsProps) {
  const isCompact = size === "sm" || size === "kucuk";
  const { isOnSale } = useCekicilikLaunchStatus(releaseDate);

  // Süre dolduğunda "Haber Al" buton grubu otomatik gizlenir, yerine satış seçenekleri çıkar
  if (isOnSale) {
    if (!showSalesWhenExpired) {
      return null;
    }
    return (
      <CekicilikSalesOptions
        size={size}
        kartOdemeAktif={kartOdemeAktif}
        onAddToCart={onAddToCart}
        className={className}
      />
    );
  }

  return (
    <div
      className={`w-full flex flex-col ${
        isCompact
          ? "gap-2.5"
          : "sm:flex-row items-stretch sm:items-center justify-center gap-3"
      } ${className}`}
    >
      {/* 1. WhatsApp'tan Haber Al (Kitap2 Birincil Kırmızı/Zümrüt Vurgulu Buton) */}
      <ThemeButton
        theme="kitap2"
        variant="primary"
        size={isCompact ? "sm" : "md"}
        fullWidth={isCompact}
        href={CEKICILIK_SANATI_CONFIG.notifyWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-[48px]"
      >
        <MessageCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
        <span>WhatsApp&apos;tan Haber Al</span>
      </ThemeButton>

      {/* 2. Instagram'da Takip Et (Kitap2 İkincil Bordo/Zümrüt Çerçeveli Buton) */}
      <ThemeButton
        theme="kitap2"
        variant="secondary"
        size={isCompact ? "sm" : "md"}
        fullWidth={isCompact}
        href={CEKICILIK_SANATI_CONFIG.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-[48px] border-emerald-500/35 hover:border-emerald-400/60"
      >
        <Instagram className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Instagram&apos;da Takip Et</span>
      </ThemeButton>

      {/* İsteğe Bağlı: TRAILER_URL doluysa küçük "Tanıtım Filmini İzle" modal butonu */}
      <TrailerModalButton
        trailerUrl={trailerUrl}
        size={isCompact ? "sm" : "md"}
        className={isCompact ? "w-full" : ""}
      />
    </div>
  );
}

export default CekicilikNotifyButtons;

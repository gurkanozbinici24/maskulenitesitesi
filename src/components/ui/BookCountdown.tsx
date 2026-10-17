"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  Check,
  Clock,
  Flame,
  Mail,
  MessageCircle,
  Package,
  PlayCircle,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
  Zap,
} from "lucide-react";
import {
  CEKICILIK_PRODUCTS,
  CEKICILIK_SANATI_CONFIG,
  KART_ODEME_AKTIF,
  RELEASE_DATE,
  TRAILER_URL,
  type CekicilikProductOption,
} from "@/config/cekicilikConfig";
import { ThemeBadge, ThemeButton, ThemeCard } from "./ThemeSystem";

export type CountdownSize = "sm" | "lg" | "kucuk" | "buyuk";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface CekicilikLaunchState {
  /** İstemci tarafında mount edildi mi (Hydration güvenliği) */
  mounted: boolean;
  /** Süre doldu mu / kitap satışta mı */
  isOnSale: boolean;
  /** Rozet durumu: "yakinda" veya "satista" */
  badgeStatus: "yakinda" | "satista";
  /** Rozet metni: "Yakında" veya "SATIŞTA" */
  badgeLabel: "Yakında" | "SATIŞTA";
  /** Kalan süre detayları */
  timeLeft: TimeLeft;
}

type ParsedTrailer =
  | { type: "empty" }
  | { type: "youtube"; embedUrl: string; originalUrl: string }
  | { type: "instagram"; embedUrl: string; originalUrl: string }
  | { type: "external"; originalUrl: string };

/**
 * YouTube veya Instagram URL'lerini gömülebilir (embed) formata dönüştürür.
 */
export function parseTrailerUrl(rawUrl: string): ParsedTrailer {
  const url = rawUrl.trim();
  if (!url) {
    return { type: "empty" };
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    // YouTube (youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/..., youtube.com/embed/...)
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      let videoId = "";
      if (host === "youtu.be") {
        videoId = parsed.pathname.slice(1).split("/")[0];
      } else if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v") || "";
      } else if (
        parsed.pathname.startsWith("/shorts/") ||
        parsed.pathname.startsWith("/embed/")
      ) {
        videoId = parsed.pathname.split("/")[2] || "";
      }

      if (videoId) {
        return {
          type: "youtube",
          embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
          originalUrl: url,
        };
      }
    }

    // Instagram (instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/...)
    if (host === "instagram.com" || host === "instagr.am") {
      const segments = parsed.pathname.split("/").filter(Boolean);
      const kind = segments[0]; // "reel" | "p" | "tv"
      const shortcode = segments[1];
      if (
        (kind === "reel" || kind === "reels" || kind === "p" || kind === "tv") &&
        shortcode
      ) {
        const normalizedKind = kind === "reels" ? "reel" : kind;
        return {
          type: "instagram",
          embedUrl: `https://www.instagram.com/${normalizedKind}/${shortcode}/embed`,
          originalUrl: url,
        };
      }
    }
  } catch {
    // Geçersiz URL ise harici bağlantı olarak ele al
  }

  return { type: "external", originalUrl: url };
}

/**
 * Hedef tarihe kalan süreyi evrensel UTC zaman damgası üzerinden hesaplar.
 * Ziyaretçi hangi ülkede olursa olsun aynı Türkiye saatine (+03:00) göre sayar.
 */
export function calculateTimeLeft(targetIsoDate: string = RELEASE_DATE): TimeLeft {
  const targetTimestamp = new Date(targetIsoDate).getTime();
  const nowTimestamp = Date.now();
  const diff = targetTimestamp - nowTimestamp;

  if (Number.isNaN(targetTimestamp) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}

function formatTwoDigits(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Sitedeki her yerde (ana sayfa, kitap kartları, alt bar, tanıtım sayfası)
 * aynı anda ve sayfa yenilemeye gerek kalmadan satış moduna geçişi sağlayan ortak hook.
 */
export function useCekicilikLaunchStatus(
  releaseDate: string = RELEASE_DATE
): CekicilikLaunchState {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setTimeLeft(calculateTimeLeft(releaseDate));
    };

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, [releaseDate]);

  const isOnSale = mounted && timeLeft.isExpired;

  return {
    mounted,
    isOnSale,
    badgeStatus: isOnSale ? "satista" : "yakinda",
    badgeLabel: isOnSale ? "SATIŞTA" : "Yakında",
    timeLeft,
  };
}

/**
 * Otomatik "Yakında" -> "SATIŞTA" Rozeti
 * Süre dolduğu anda sayfa yenilenmeden otomatik olarak "SATIŞTA" rozetine dönüşür.
 */
export function CekicilikStatusBadge({
  releaseDate = RELEASE_DATE,
  className = "",
}: {
  releaseDate?: string;
  className?: string;
}) {
  const { isOnSale, badgeStatus, badgeLabel } = useCekicilikLaunchStatus(releaseDate);

  return (
    <ThemeBadge theme="kitap2" status={badgeStatus} className={className}>
      {isOnSale ? (
        <>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span>{badgeLabel}</span>
        </>
      ) : (
        <>
          <Clock className="w-3.5 h-3.5 text-crimson-300" />
          <span>{badgeLabel}</span>
        </>
      )}
    </ThemeBadge>
  );
}

/**
 * Tanıtım Filmi Açılır Pencere (Modal) Bileşeni
 * TRAILER_URL dolu olduğunda küçük bir buton gösterir ve videoyu modal pencerede oynatır.
 */
export function TrailerModalButton({
  trailerUrl = TRAILER_URL,
  size = "sm",
  className = "",
}: {
  trailerUrl?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const parsed = parseTrailerUrl(trailerUrl);

  if (parsed.type === "empty") {
    return null;
  }

  return (
    <>
      <ThemeButton
        theme="kitap2"
        variant="secondary"
        size={size}
        onClick={() => setIsOpen(true)}
        className={`min-h-[48px] ${className}`}
      >
        <PlayCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Tanıtım Filmini İzle</span>
      </ThemeButton>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-matte-950/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Çekicilik Sanatı Tanıtım Filmi"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-crimson-800/80 bg-matte-900 p-4 sm:p-6 shadow-kitap2-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Çekicilik Sanatı — Resmi Tanıtım Filmi</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Kapat"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg border border-zinc-800 bg-matte-850 text-zinc-300 hover:text-white hover:border-crimson-600/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {parsed.type === "youtube" && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-crimson-900/70 bg-matte-950">
                <iframe
                  src={parsed.embedUrl}
                  title="Çekicilik Sanatı Tanıtım Filmi"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

            {parsed.type === "instagram" && (
              <div className="relative w-full max-w-md mx-auto aspect-[9/12] sm:aspect-[9/11] rounded-xl overflow-hidden border border-crimson-900/70 bg-matte-950">
                <iframe
                  src={parsed.embedUrl}
                  title="Çekicilik Sanatı Instagram Tanıtım Filmi"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            {parsed.type === "external" && (
              <div className="py-8 text-center">
                <ThemeButton
                  theme="kitap2"
                  variant="primary"
                  size="md"
                  href={parsed.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayCircle className="w-5 h-5 text-gold-300" />
                  <span>Videoyu Yeni Sekmede Aç</span>
                </ThemeButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export interface CekicilikSalesOptionsProps {
  /** Görünüm boyutu: "sm" (kart altı / dar alan) veya "lg" (bölüm / tam boy fiyat kartları) */
  size?: CountdownSize;
  /** Kartla ödeme (Sepete Ekle) aktif mi (varsayılan: config KART_ODEME_AKTIF) */
  kartOdemeAktif?: boolean;
  /** İleride iyzico bağlandığında Sepete Ekle tetikleyicisi */
  onAddToCart?: (product: CekicilikProductOption) => void;
  className?: string;
}

/**
 * Satış Modu Satın Alma Kartları (E-Kitap 600 TL & Fiziksel Kitap 1000 TL - Kapıya kadar ücretsiz kargo)
 * Mevcut kitabın fiyat kartlarıyla birebir aynı kalitede, "kitap2" (kırmızı/zümrüt) temasında.
 */
export function CekicilikSalesOptions({
  size = "lg",
  kartOdemeAktif = KART_ODEME_AKTIF,
  onAddToCart,
  className = "",
}: CekicilikSalesOptionsProps) {
  const isCompact = size === "sm" || size === "kucuk";
  const { ebook, physical } = CEKICILIK_PRODUCTS;

  // Küçük Boyut (Kitap kartının altı veya dar bileşenler için)
  if (isCompact) {
    return (
      <div className={`w-full space-y-3 ${className}`}>
        {[ebook, physical].map((item) => {
          const isPhysical = item.type === "physical";
          return (
            <div
              key={item.id}
              className="rounded-xl border border-crimson-800/70 bg-gradient-to-b from-crimson-950/75 via-matte-900/95 to-matte-950 p-3.5 shadow-kitap2-card"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-crimson-300 block">
                    {item.shortTitle}
                  </span>
                  {item.shippingNote && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-0.5">
                      <Truck className="w-3 h-3" />
                      <span>{item.shippingNote}</span>
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-white font-mono">
                    {item.price}
                  </span>
                  <span className="text-xs font-bold text-gold-400 font-mono ml-1">
                    {item.currency}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2.5">
                <ThemeButton
                  theme="kitap2"
                  variant={isPhysical ? "primary" : "secondary"}
                  size="sm"
                  fullWidth
                  href={item.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>WhatsApp ile Sipariş Ver</span>
                </ThemeButton>

                {kartOdemeAktif && (
                  <ThemeButton
                    theme="kitap2"
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onAddToCart?.(item)}
                    className="min-h-[48px]"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>Sepete Ekle ({item.price} TL)</span>
                  </ThemeButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Büyük Boyut (Tam boy yan yana 2'li Fiyat Kartları — PricingSection kalitesinde, kitap2 temasında)
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch ${className}`}
    >
      {/* 1. KART: E-KİTAP (600 TL) */}
      <ThemeCard
        theme="kitap2"
        variant="elevated"
        className="flex flex-col justify-between p-6 sm:p-8 lg:p-9 border-crimson-800/70"
      >
        <div className="absolute -top-3.5 left-6 sm:left-8 z-20">
          <ThemeBadge theme="kitap2" status="satista" className="px-4 py-1.5 tracking-wider">
            <Zap className="w-3.5 h-3.5 text-emerald-300" />
            <span>{ebook.badgeText}</span>
          </ThemeBadge>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 pt-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-crimson-400 font-mono">
              <Sparkles className="w-4 h-4 text-crimson-400" />
              <span>DİJİTAL SÜRÜM</span>
            </div>
            <div className="p-2 rounded-lg bg-crimson-900/40 text-crimson-300 border border-crimson-700/40">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-fluid-2xl font-black text-white tracking-tight leading-snug">
            {ebook.title} <br />
            <span className="crimson-text-gradient">{ebook.subtitle}</span>
          </h3>

          <p className="text-fluid-sm text-zinc-300 mt-2 mb-6 leading-relaxed">
            {ebook.description}
          </p>

          {/* Price Tag */}
          <div className="py-4 my-4 border-y border-crimson-800/50 flex items-baseline gap-2 bg-crimson-950/35 -mx-6 sm:-mx-8 lg:-mx-9 px-6 sm:px-8 lg:px-9">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">
              {ebook.price}
            </span>
            <span className="text-xl font-bold text-gold-400 font-mono">
              {ebook.currency}
            </span>
            <span className="text-xs text-zinc-400 font-medium ml-2">
              / Tek Seferlik Ödeme
            </span>
          </div>

          {/* Feature List */}
          <div className="space-y-3.5 my-6">
            {ebook.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 border border-emerald-500/40">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-zinc-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-6 mt-4 space-y-3">
          <ThemeButton
            theme="kitap2"
            variant="primary"
            size="lg"
            fullWidth
            href={ebook.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
            <span>WhatsApp ile Sipariş Ver ({ebook.price} TL)</span>
          </ThemeButton>

          {kartOdemeAktif && (
            <ThemeButton
              theme="kitap2"
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => onAddToCart?.(ebook)}
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <span>Sepete Ekle</span>
            </ThemeButton>
          )}

          <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-zinc-400 font-medium">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>E-posta adresinize anında dijital teslimat.</span>
          </div>
        </div>
      </ThemeCard>

      {/* 2. KART: FİZİKSEL KİTAP (1000 TL — KAPIYA KADAR ÜCRETSİZ KARGO) */}
      <ThemeCard
        theme="kitap2"
        variant="glow"
        className="flex flex-col justify-between p-6 sm:p-8 lg:p-9"
      >
        <div className="absolute -top-3.5 left-6 sm:left-8 z-20">
          <ThemeBadge theme="kitap2" status="satista" className="px-4 py-1.5 tracking-wider">
            <Truck className="w-3.5 h-3.5 text-emerald-300" />
            <span>{physical.badgeText}</span>
          </ThemeBadge>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4 pt-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>ÖZEL KOLEKSİYON BASKISI</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-fluid-2xl font-black text-white tracking-tight leading-snug">
            {physical.title} <br />
            <span className="emerald-text-gradient">{physical.subtitle}</span>
          </h3>

          <p className="text-fluid-sm text-zinc-300 mt-2 mb-6 leading-relaxed">
            {physical.description}
          </p>

          {/* Price Tag + Free Shipping Highlight */}
          <div className="py-4 my-4 border-y border-emerald-500/30 flex flex-wrap items-baseline justify-between gap-2 bg-emerald-950/25 -mx-6 sm:-mx-8 lg:-mx-9 px-6 sm:px-8 lg:px-9">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                {physical.price}
              </span>
              <span className="text-xl font-bold text-gold-400 font-mono">
                {physical.currency}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{physical.shippingNote}</span>
            </span>
          </div>

          {/* Feature List */}
          <div className="space-y-3.5 my-6">
            {physical.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 border border-emerald-500/40">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-zinc-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-6 mt-4 space-y-3">
          <ThemeButton
            theme="kitap2"
            variant="primary"
            size="lg"
            fullWidth
            href={physical.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
            <span>WhatsApp ile Sipariş Ver ({physical.price} TL)</span>
          </ThemeButton>

          {kartOdemeAktif && (
            <ThemeButton
              theme="kitap2"
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => onAddToCart?.(physical)}
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <span>Sepete Ekle</span>
            </ThemeButton>
          )}

          <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-emerald-400 font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>Kapıya kadar ücretsiz ve gizli paketleme ile kargo.</span>
          </div>
        </div>
      </ThemeCard>
    </div>
  );
}

export interface BookCountdownProps {
  /** Boyut: "sm" / "kucuk" (kitap kartının altı için) veya "lg" / "buyuk" (bölüm için) */
  size?: CountdownSize;
  /** İsteğe bağlı özel çıkış tarihi (varsayılan: config içindeki RELEASE_DATE) */
  releaseDate?: string;
  /** İsteğe bağlı özel tanıtım videosu linki (varsayılan: config içindeki TRAILER_URL) */
  trailerUrl?: string;
  /** Kartla ödeme aktif mi (varsayılan: config içindeki KART_ODEME_AKTIF) */
  kartOdemeAktif?: boolean;
  /** Üstte durum rozetini ("Yakında" / "SATIŞTA") göster (varsayılan: true) */
  showStatusBadge?: boolean;
  /** Altta aksiyon alanını ("Haber Al" / Satış kartları) göster (varsayılan: true) */
  showActionArea?: boolean;
  /** İleride iyzico bağlandığında Sepete Ekle callback'i */
  onAddToCart?: (product: CekicilikProductOption) => void;
  /** Ekstra kapsayıcı sınıfı */
  className?: string;
}

export function BookCountdown({
  size = "lg",
  releaseDate = RELEASE_DATE,
  trailerUrl = TRAILER_URL,
  kartOdemeAktif = KART_ODEME_AKTIF,
  showStatusBadge = true,
  showActionArea = true,
  onAddToCart,
  className = "",
}: BookCountdownProps) {
  const isCompact = size === "sm" || size === "kucuk";
  const { mounted, isOnSale, timeLeft } = useCekicilikLaunchStatus(releaseDate);

  // SÜRE DOLDUĞUNDA: Sayaç kaybolur, rozet "SATIŞTA" olur ve iki satın alma seçeneği çıkar
  if (isOnSale) {
    return (
      <div className={`w-full transition-all duration-500 ${className}`}>
        {showStatusBadge && (
          <div
            className={`flex flex-wrap items-center gap-3 ${
              isCompact ? "mb-3" : "justify-center mb-6"
            }`}
          >
            <CekicilikStatusBadge releaseDate={releaseDate} />
            <TrailerModalButton
              trailerUrl={trailerUrl}
              size={isCompact ? "sm" : "md"}
            />
          </div>
        )}

        {showActionArea && (
          <CekicilikSalesOptions
            size={size}
            kartOdemeAktif={kartOdemeAktif}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    );
  }

  // SÜRE DOLMADAN ÖNCE: "Yakında" rozeti, Geri Sayım ve "Haber Al" butonu
  const units = [
    {
      key: "days",
      label: "Gün",
      value: mounted ? formatTwoDigits(timeLeft.days) : "--",
    },
    {
      key: "hours",
      label: "Saat",
      value: mounted ? formatTwoDigits(timeLeft.hours) : "--",
    },
    {
      key: "minutes",
      label: "Dakika",
      value: mounted ? formatTwoDigits(timeLeft.minutes) : "--",
    },
    {
      key: "seconds",
      label: "Saniye",
      value: mounted ? formatTwoDigits(timeLeft.seconds) : "--",
    },
  ];

  return (
    <div
      className={`w-full select-none ${
        isCompact ? "max-w-md" : "max-w-2xl mx-auto"
      } ${className}`}
      role="timer"
      aria-live="polite"
      aria-label="Çekicilik Sanatı çıkış geri sayımı"
    >
      {/* Üst Rozet: Yakında */}
      {showStatusBadge && (
        <div
          className={`flex items-center ${
            isCompact ? "justify-start mb-2.5" : "justify-center mb-4"
          }`}
        >
          <CekicilikStatusBadge releaseDate={releaseDate} />
        </div>
      )}

      {/* Telefonda (375px) tek satıra sığması için 4 sütunlu sıkı grid */}
      <div
        className={`grid grid-cols-4 items-stretch ${
          isCompact ? "gap-1.5 sm:gap-2.5" : "gap-2 sm:gap-4"
        }`}
      >
        {units.map((unit) => (
          <div
            key={unit.key}
            className={`relative flex flex-col items-center justify-center overflow-hidden border border-crimson-950 bg-gradient-to-b from-crimson-950/75 via-matte-900/95 to-matte-950 shadow-[inset_0_1px_0_rgba(220,38,38,0.22),0_8px_20px_rgba(92,0,0,0.35)] transition-colors duration-300 hover:border-crimson-700/70 ${
              isCompact
                ? "rounded-xl py-2 px-1 sm:py-2.5 sm:px-2.5"
                : "rounded-xl sm:rounded-2xl py-3 px-1.5 sm:py-5 sm:px-4"
            }`}
          >
            {/* Üst koyu bordo/altın ince yansıma çizgisi */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-500/45 to-transparent" />

            {/* Rakam Alanı (Yumuşak geçiş animasyonlu altın rakamlar) */}
            <div
              className={`relative flex items-center justify-center overflow-hidden ${
                isCompact ? "h-7 sm:h-8" : "h-8 sm:h-12 md:h-14"
              }`}
            >
              <span
                key={`${unit.key}-${unit.value}`}
                className={`animate-countdown-digit font-cinzel font-black tabular-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600 drop-shadow-[0_2px_10px_rgba(212,175,55,0.28)] leading-none ${
                  isCompact
                    ? "text-[clamp(1.05rem,4.2vw,1.45rem)]"
                    : "text-[clamp(1.35rem,5.8vw,2.65rem)]"
                }`}
              >
                {unit.value}
              </span>
            </div>

            {/* Birim Etiketi (Gün / Saat / Dakika / Saniye) */}
            <span
              className={`font-sans font-semibold uppercase text-zinc-300/90 leading-none ${
                isCompact
                  ? "mt-1 text-[9px] sm:text-[10px] tracking-wider"
                  : "mt-1.5 sm:mt-2 text-[10px] sm:text-xs tracking-[0.14em]"
              }`}
            >
              {unit.label}
            </span>

            {/* Alt köşe hafif altın ambiyans */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Aksiyon Alanı: Haber Al Butonu + (Varsa) Tanıtım Filmini İzle */}
      {showActionArea && (
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ${
            isCompact ? "mt-3" : "justify-center mt-5"
          }`}
        >
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
            <Bell className="w-4 h-4 text-gold-300 flex-shrink-0" />
            <span>Haber Al</span>
          </ThemeButton>

          <TrailerModalButton
            trailerUrl={trailerUrl}
            size={isCompact ? "sm" : "md"}
            className={isCompact ? "w-full" : ""}
          />
        </div>
      )}
    </div>
  );
}

export default BookCountdown;

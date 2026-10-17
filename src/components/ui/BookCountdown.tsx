"use client";

import React, { useEffect, useState } from "react";
import { Instagram, PlayCircle, Sparkles } from "lucide-react";
import {
  RELEASE_DATE,
  TRAILER_URL,
  INSTAGRAM_URL,
} from "@/config/cekicilikConfig";
import { ThemeButton } from "./ThemeSystem";

export type CountdownSize = "sm" | "lg" | "kucuk" | "buyuk";

export interface BookCountdownProps {
  /** Boyut: "sm" / "kucuk" (kitap kartının altı için) veya "lg" / "buyuk" (bölüm için) */
  size?: CountdownSize;
  /** İsteğe bağlı özel çıkış tarihi (varsayılan: config içindeki RELEASE_DATE) */
  releaseDate?: string;
  /** İsteğe bağlı özel tanıtım videosu linki (varsayılan: config içindeki TRAILER_URL) */
  trailerUrl?: string;
  /** İsteğe bağlı özel Instagram linki (varsayılan: config içindeki INSTAGRAM_URL) */
  instagramUrl?: string;
  /** Ekstra kapsayıcı sınıfı */
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

type ParsedTrailer =
  | { type: "empty" }
  | { type: "youtube"; embedUrl: string; originalUrl: string }
  | { type: "instagram"; embedUrl: string; originalUrl: string }
  | { type: "external"; originalUrl: string };

/**
 * YouTube veya Instagram URL'lerini gömülebilir (embed) formata dönüştürür.
 */
function parseTrailerUrl(rawUrl: string): ParsedTrailer {
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
          embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
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
function calculateTimeLeft(targetIsoDate: string): TimeLeft {
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

export function BookCountdown({
  size = "lg",
  releaseDate = RELEASE_DATE,
  trailerUrl = TRAILER_URL,
  instagramUrl = INSTAGRAM_URL,
  className = "",
}: BookCountdownProps) {
  const isCompact = size === "sm" || size === "kucuk";

  // Hydration uyumu için ilk render'da mounted=false tutulur
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

  // Süre dolduğunda sayacı gizleyip tanıtım videosu veya Instagram yönlendirmesi göster
  if (mounted && timeLeft.isExpired) {
    const parsedTrailer = parseTrailerUrl(trailerUrl);

    return (
      <div className={`w-full transition-all duration-500 ${className}`}>
        <div
          className={`relative overflow-hidden rounded-2xl border border-crimson-950 bg-gradient-to-b from-crimson-950/60 via-matte-900/95 to-matte-950 shadow-kitap2-glow ${
            isCompact ? "p-3.5 sm:p-4" : "p-5 sm:p-7"
          }`}
        >
          {/* Üst zümrüt/bordo ışık çizgisi */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          {parsedTrailer.type === "youtube" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tanıtım Filmi Yayında</span>
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-crimson-800/70 bg-matte-950 shadow-lg">
                <iframe
                  src={parsedTrailer.embedUrl}
                  title="Çekicilik Sanatı Tanıtım Filmi"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {parsedTrailer.type === "instagram" && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tanıtım Filmi Yayında</span>
              </div>
              <div className="relative w-full max-w-md mx-auto aspect-[9/12] sm:aspect-[9/11] rounded-xl overflow-hidden border border-crimson-800/70 bg-matte-950 shadow-lg">
                <iframe
                  src={parsedTrailer.embedUrl}
                  title="Çekicilik Sanatı Instagram Tanıtım Filmi"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {(parsedTrailer.type === "empty" || parsedTrailer.type === "external") && (
            <div className="flex flex-col items-center text-center gap-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tanıtım filmi yayında</span>
              </div>

              <ThemeButton
                theme="kitap2"
                variant="primary"
                size={isCompact ? "sm" : "md"}
                href={
                  parsedTrailer.type === "external"
                    ? parsedTrailer.originalUrl
                    : instagramUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                fullWidth={isCompact}
                className="min-h-[48px]"
              >
                {parsedTrailer.type === "external" ? (
                  <>
                    <PlayCircle className="w-4 h-4 text-gold-300 flex-shrink-0" />
                    <span>Tanıtım Filmini İzle</span>
                  </>
                ) : (
                  <>
                    <Instagram className="w-4 h-4 text-gold-300 flex-shrink-0" />
                    <span>Instagram&apos;da Tanıtım Filmini İzle</span>
                  </>
                )}
              </ThemeButton>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                isCompact
                  ? "h-7 sm:h-8"
                  : "h-8 sm:h-12 md:h-14"
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
    </div>
  );
}

export default BookCountdown;

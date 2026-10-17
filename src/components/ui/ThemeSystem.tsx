"use client";

import React from "react";

export type BookTheme = "kitap1" | "kitap2";

/* ============================================================================
 * 1. ORTAK BUTON BİLEŞENİ (ThemeButton)
 * - Mobile-First: En az 48px yükseklik (min-h-[48px]), dokunmatik aktif durumları (active:scale-[0.98])
 * - Temalar: "kitap1" (Altın / Çelik) & "kitap2" (Kırmızı / Zümrüt)
 * ========================================================================== */

export interface ThemeButtonProps {
  theme?: BookTheme;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  title?: string;
  ariaLabel?: string;
}

export function ThemeButton({
  theme = "kitap1",
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
  className = "",
  children,
  title,
  ariaLabel,
}: ThemeButtonProps) {
  const effectiveVariant = disabled ? "disabled" : variant;

  const sizeClasses = {
    sm: "min-h-[48px] md:min-h-[40px] px-4 py-2 text-xs",
    md: "min-h-[48px] px-6 py-3.5 text-xs sm:text-sm",
    lg: "min-h-[52px] px-8 py-4 text-sm sm:text-base",
  }[size];

  const themeVariantClasses: Record<BookTheme, Record<string, string>> = {
    kitap1: {
      primary:
        "text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow hover:shadow-gold-glow-lg active:shadow-gold-glow hover:brightness-110 active:brightness-95 active:scale-[0.98] font-extrabold",
      secondary:
        "text-mahogany-200 hover:text-gold-300 active:text-gold-200 bg-mahogany-900/85 hover:bg-mahogany-800/90 active:bg-mahogany-850 border border-mahogany-700/70 hover:border-gold-500/45 active:border-gold-400/60 active:scale-[0.98] font-semibold shadow-sm",
      outline:
        "bg-transparent hover:bg-gold-500/10 active:bg-gold-500/15 border border-gold-500/50 hover:border-gold-400 active:border-gold-300 text-gold-300 hover:text-gold-200 active:scale-[0.98] font-black",
      disabled:
        "bg-matte-850/80 border border-zinc-700 text-zinc-500 cursor-not-allowed font-black",
    },
    kitap2: {
      primary:
        "text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 shadow-emerald-glow hover:shadow-emerald-glow-lg active:shadow-emerald-glow hover:brightness-110 active:brightness-95 active:scale-[0.98] font-extrabold",
      secondary:
        "text-zinc-200 hover:text-crimson-300 active:text-crimson-200 bg-matte-900 hover:bg-crimson-950/60 active:bg-crimson-950/80 border border-crimson-900/60 hover:border-crimson-500/50 active:border-crimson-400/70 active:scale-[0.98] font-semibold shadow-sm",
      outline:
        "bg-transparent hover:bg-crimson-500/10 active:bg-crimson-500/20 border border-crimson-500/50 hover:border-crimson-400 active:border-crimson-300 text-crimson-300 hover:text-crimson-200 active:scale-[0.98] font-black",
      disabled:
        "bg-matte-850/80 border border-zinc-700 text-zinc-500 cursor-not-allowed font-black",
    },
  };

  const baseClasses = `group relative inline-flex items-center justify-center gap-2 rounded-xl uppercase tracking-wider transition-all duration-200 select-none touch-manipulation ${sizeClasses} ${
    fullWidth ? "w-full" : ""
  } ${themeVariantClasses[theme][effectiveVariant]} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseClasses}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/* ============================================================================
 * 2. ORTAK ROZET BİLEŞENİ (ThemeBadge)
 * - Durumlar: "satista" (Satışta / Anında Teslimat), "yakinda" (Yakında), "tukendi" (Tükendi), "etiket" (Bölüm üst rozeti)
 * - Temalar: "kitap1" (Altın / Maun-Konyak Kahvesi) & "kitap2" (Kırmızı / Zümrüt)
 * ========================================================================== */

export interface ThemeBadgeProps {
  theme?: BookTheme;
  status?: "satista" | "yakinda" | "tukendi" | "etiket";
  children: React.ReactNode;
  className?: string;
}

export function ThemeBadge({
  theme = "kitap1",
  status = "etiket",
  children,
  className = "",
}: ThemeBadgeProps) {
  const statusStyles: Record<BookTheme, Record<string, string>> = {
    kitap1: {
      satista:
        "bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-black font-black shadow-gold-glow border border-gold-200/50",
      yakinda:
        "bg-mahogany-800/95 text-gold-200 font-bold border border-mahogany-500/70 shadow-mahogany-glow",
      tukendi:
        "bg-mahogany-900 text-mahogany-300 font-black shadow-md border border-mahogany-600/50",
      etiket:
        "bg-mahogany-900/90 border border-gold-500/35 text-gold-300 font-bold shadow-inner",
    },
    kitap2: {
      satista:
        "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-black font-black shadow-emerald-glow border border-emerald-200/50",
      yakinda:
        "bg-crimson-950/90 text-crimson-300 font-black border border-crimson-500/50 shadow-crimson-glow",
      tukendi:
        "bg-crimson-700 text-white font-black shadow-md border border-crimson-400/40",
      etiket:
        "bg-crimson-950/70 border border-crimson-500/40 text-crimson-300 font-bold shadow-inner",
    },
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-fluid-xs uppercase tracking-widest ${statusStyles[theme][status]} ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================================
 * 3. ORTAK KART BİLEŞENİ (ThemeCard)
 * - Temalar: "kitap1" (Altın / Maun-Konyak Kahvesi) & "kitap2" (Kırmızı / Zümrüt)
 * ========================================================================== */

export interface ThemeCardProps {
  theme?: BookTheme;
  variant?: "elevated" | "glow" | "muted";
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function ThemeCard({
  theme = "kitap1",
  variant = "elevated",
  className = "",
  children,
  onClick,
}: ThemeCardProps) {
  const cardStyles: Record<BookTheme, Record<string, string>> = {
    kitap1: {
      elevated:
        "bg-gradient-to-b from-mahogany-900/75 via-matte-900/95 to-matte-950 border border-mahogany-700/60 hover:border-gold-500/50 active:border-gold-500/60 shadow-card-elevated hover:shadow-gold-glow",
      glow:
        "bg-gradient-to-b from-mahogany-800/55 via-matte-900 to-matte-950 border-2 border-gold-500 shadow-gold-glow hover:shadow-gold-glow-lg",
      muted:
        "bg-mahogany-950/60 border border-mahogany-800/70 text-zinc-300",
    },
    kitap2: {
      elevated:
        "bg-gradient-to-b from-crimson-950/40 to-matte-900/95 border border-crimson-900/60 hover:border-crimson-500/50 active:border-crimson-500/60 shadow-card-elevated hover:shadow-crimson-glow",
      glow:
        "bg-gradient-to-b from-crimson-950/70 via-matte-900 to-matte-950 border-2 border-emerald-500 shadow-emerald-glow hover:shadow-emerald-glow-lg",
      muted:
        "bg-matte-900/50 border border-zinc-800 text-zinc-400",
    },
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl sm:rounded-3xl transition-all duration-300 ${cardStyles[theme][variant]} ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================================
 * 4. ORTAK BÖLÜM BAŞLIĞI BİLEŞENİ (ThemeSectionHeader)
 * - Clamp() ölçeklenebilir başlık ve alt metin ile mobil-öncelikli yapı
 * ========================================================================== */

export interface ThemeSectionHeaderProps {
  theme?: BookTheme;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  highlightText?: string;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function ThemeSectionHeader({
  theme = "kitap1",
  badgeText,
  badgeIcon,
  title,
  highlightText,
  subtitle,
  align = "center",
  className = "",
}: ThemeSectionHeaderProps) {
  const gradientClass =
    theme === "kitap1" ? "gold-text-gradient" : "crimson-text-gradient";

  return (
    <div
      className={`${
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl"
      } mb-12 sm:mb-16 ${className}`}
    >
      {badgeText && (
        <div className="mb-4">
          <ThemeBadge theme={theme} status="etiket">
            {badgeIcon}
            <span>{badgeText}</span>
          </ThemeBadge>
        </div>
      )}

      <h2 className="text-fluid-3xl font-black text-white tracking-tight uppercase leading-tight">
        {title}{" "}
        {highlightText && (
          <span className={gradientClass}>{highlightText}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-fluid-base text-zinc-400 font-normal leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

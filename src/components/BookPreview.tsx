"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Lock, X } from "lucide-react";
import { ThemeButton, type BookTheme } from "./ui/ThemeSystem";

export interface PreviewPage {
  src: string;
  title: string;
  /** Sayfanın yüzde kaçı net görünsün (geri kalanı bulanık) */
  clearUntil: number;
}

export interface PreviewCta {
  label: string;
  href: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Kitaptan sayfa önizlemesi: sayfaların üst kısmı net, alt kısmı bulanık ve kilitli.
 * Sayfaya tıklanınca büyük okuma penceresi açılır; altta "tamamına eriş" butonu çıkar.
 */
export default function BookPreview({
  theme,
  heading,
  pages,
  cta,
}: {
  theme: BookTheme;
  heading: string;
  pages: PreviewPage[];
  cta: PreviewCta;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const isGold = theme === "kitap1";

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + pages.length) % pages.length)),
    [pages.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const accent = isGold ? "text-gold-400" : "text-crimson-300";
  const ring = isGold
    ? "border-gold-500/40 hover:border-gold-300 hover:shadow-[0_25px_60px_-20px_rgba(212,175,55,0.45)]"
    : "border-crimson-700/50 hover:border-crimson-400 hover:shadow-[0_25px_60px_-20px_rgba(220,38,38,0.45)]";
  const fade = isGold ? "via-[#0d0905]/90 to-[#0d0905]" : "via-[#120408]/90 to-[#120408]";

  const LockedOverlay = ({ page, big }: { page: PreviewPage; big?: boolean }) => (
    <div
      className={`absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center backdrop-blur-[5px] bg-gradient-to-b from-black/20 ${fade} ${
        big ? "p-5 sm:p-7" : "p-3 sm:p-4"
      }`}
      style={{ top: `${page.clearUntil}%` }}
    >
      <div
        className={`pointer-events-none absolute top-0 inset-x-0 h-px ${
          isGold ? "bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" : "bg-gradient-to-r from-transparent via-crimson-500/70 to-transparent"
        }`}
      />
      <div
        className={`mb-2 w-10 h-10 rounded-full border flex items-center justify-center ${
          isGold ? "border-gold-500/60 bg-black/70 text-gold-300" : "border-crimson-500/60 bg-black/70 text-crimson-300"
        }`}
      >
        <Lock className="w-4 h-4" />
      </div>
      <p className={`font-cinzel font-bold tracking-wider text-white ${big ? "text-base sm:text-lg" : "text-xs sm:text-sm"}`}>
        Devamı kitapta
      </p>
      {big && (
        <>
          <p className="mt-1 mb-4 text-xs sm:text-sm text-zinc-400">
            Bu sayfanın ve tüm bölümlerin tamamını okumak için kitaba eriş.
          </p>
          <ThemeButton
            theme={theme}
            variant="primary"
            size="md"
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              cta.onClick?.(e);
              if (!cta.external) close();
            }}
            className="w-full max-w-xs"
          >
            <span>{cta.label}</span>
          </ThemeButton>
        </>
      )}
    </div>
  );

  return (
    <div className="mt-16 sm:mt-20">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase ${accent}`}>
          <Eye className="w-4 h-4" />
          Kitaptan Önizleme
        </div>
        <h3 className="mt-2 font-cinzel text-[clamp(1.3rem,3.2vw,2rem)] font-bold text-white">{heading}</h3>
        <p className="mt-2 text-sm text-zinc-400">Sayfaya dokunarak büyüt ve oku.</p>
      </div>

      {/* Sayfalar: telefonda yatay kaydırma, bilgisayarda yan yana */}
      <div className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible [scrollbar-width:none]">
        {pages.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${p.title} sayfasını büyüt`}
            className={`group relative flex-shrink-0 w-[78%] sm:w-auto snap-center aspect-[2/3] overflow-hidden rounded-lg border bg-black text-left transition-all duration-500 hover:-translate-y-1.5 ${ring}`}
          >
            <Image
              src={p.src}
              alt={p.title}
              fill
              sizes="(max-width: 640px) 80vw, 400px"
              className="object-cover object-top"
            />
            <LockedOverlay page={p} />
            <span className="absolute top-2 right-2 rounded-full bg-black/70 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Büyüt
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <ThemeButton
          theme={theme}
          variant="primary"
          size="lg"
          href={cta.href}
          target={cta.external ? "_blank" : undefined}
          rel={cta.external ? "noopener noreferrer" : undefined}
          onClick={cta.onClick}
          className="w-full sm:w-auto"
        >
          <span>{cta.label}</span>
        </ThemeButton>
      </div>

      {/* Büyük okuma penceresi */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[560px]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className={`font-cinzel text-sm font-bold tracking-wider ${accent}`}>
                {open + 1} / {pages.length} · {pages[open].title}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Kapat"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mx-auto aspect-[2/3] max-h-[78svh] overflow-hidden rounded-lg border border-white/10 bg-black">
              <Image
                src={pages[open].src}
                alt={pages[open].title}
                fill
                sizes="560px"
                quality={95}
                className="object-contain object-top"
              />
              <LockedOverlay page={pages[open]} big />
            </div>

            {pages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Önceki sayfa"
                  className="absolute left-1 sm:-left-14 top-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/80 border border-white/15 text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Sonraki sayfa"
                  className="absolute right-1 sm:-right-14 top-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/80 border border-white/15 text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

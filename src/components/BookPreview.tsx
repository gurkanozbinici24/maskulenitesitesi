"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Crown, Eye, Lock, X, ZoomIn, ZoomOut } from "lucide-react";
import { ThemeButton, type BookTheme } from "./ui/ThemeSystem";

export interface PreviewPage {
  src: string;
  title: string;
  /** Sayfanın yüzde kaçı net görünsün (geri kalanı bulanık) */
  clearUntil: number;
  /** Telefonda "Büyüt" ile açılan okuma modu için sayfa metni (yoksa görsel büyütülür) */
  text?: string[];
  /** Kilitli sayfada okuma modunda gösterilecek paragraf sayısı */
  visibleParas?: number;
}

/** "**metin**" bölümlerini altın vurguya çevirir */
function renderRich(t: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <em key={i} className="font-semibold italic text-[#f0d27e]">
        {part.slice(2, -2)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
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
  variant = "section",
}: {
  theme: BookTheme;
  heading: string;
  pages: PreviewPage[];
  cta: PreviewCta;
  /** "section": büyük ayrı bölüm; "card": satın alma kartlarının yanında kompakt kutu */
  variant?: "section" | "card";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Sayfa değişince veya büyütünce okuma penceresini en üste al
  useEffect(() => {
    document.getElementById("book-reader")?.scrollTo({ top: 0 });
  }, [open, zoom]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const isGold = theme === "kitap1";

  const close = useCallback(() => {
    setOpen(null);
    setZoom(false);
  }, []);
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
            className="w-full max-w-sm"
          >
            <span>{cta.label}</span>
          </ThemeButton>
        </>
      )}
    </div>
  );

  const cardBorder = isGold
    ? "border-gold-500/40 bg-gradient-to-br from-mahogany-950/70 via-matte-950 to-matte-950 hover:border-gold-400/70"
    : "border-crimson-700/50 bg-gradient-to-br from-crimson-950/60 via-matte-950 to-matte-950 hover:border-crimson-500/70";

  const ReadingView = ({ page }: { page: PreviewPage }) => {
    const paras = page.text ?? [];
    const locked = page.clearUntil < 100;
    const shown = locked ? paras.slice(0, page.visibleParas ?? Math.ceil(paras.length / 2)) : paras;
    const teaser = locked ? paras[shown.length] : undefined;
    return (
      <article
        className={`font-book relative overflow-hidden rounded-xl border px-5 py-7 ${
          isGold
            ? "border-gold-500/40 bg-gradient-to-b from-[#1c1208] via-[#0d0905] to-black"
            : "border-crimson-700/50 bg-gradient-to-b from-[#2a0609] via-[#120305] to-black"
        }`}
      >
        <div className="text-center">
          <Crown className="mx-auto h-6 w-6 text-gold-400" strokeWidth={1.5} />
          <h4 className="mt-2 font-cinzel text-2xl font-bold tracking-[0.12em] gold-text-gradient uppercase">
            {page.title}
          </h4>
          <div className="mx-auto mt-3 mb-6 flex w-40 items-center gap-2">
            <span className="h-px flex-1 bg-gold-500/50" />
            <span className={`h-2 w-2 rotate-45 ${isGold ? "bg-gold-400" : "bg-crimson-600"}`} />
            <span className="h-px flex-1 bg-gold-500/50" />
          </div>
        </div>

        <div className="space-y-4 text-[17px] leading-[1.75] text-[#f4ece2]">
          {shown.map((p, i) =>
            p.startsWith(">") ? (
              <p
                key={i}
                className={`border-y border-gold-500/40 py-3 text-center text-[18px] font-semibold italic ${
                  isGold ? "text-gold-300" : "text-[#ff9b9b]"
                }`}
              >
                {renderRich(p.slice(1))}
              </p>
            ) : (
              <p
                key={i}
                className={
                  i === 0
                    ? `first-letter:float-left first-letter:mr-2 first-letter:font-cinzel first-letter:text-[3.2em] first-letter:font-bold first-letter:leading-[0.85] ${
                        isGold ? "first-letter:text-gold-400" : "first-letter:text-crimson-500"
                      }`
                    : ""
                }
              >
                {renderRich(p)}
              </p>
            )
          )}
        </div>

        {locked && (
          <div className="relative mt-4">
            {teaser && (
              <p className="select-none text-[17px] leading-[1.75] text-[#f4ece2] blur-[5px]" aria-hidden="true">
                {teaser.replace(/\*\*/g, "")}
              </p>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
            <div className="relative -mt-16 flex flex-col items-center pt-2 text-center">
              <div
                className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full border bg-black/80 ${
                  isGold ? "border-gold-500/60 text-gold-300" : "border-crimson-500/60 text-crimson-300"
                }`}
              >
                <Lock className="h-5 w-5" />
              </div>
              <p className="font-cinzel text-lg font-bold tracking-wider text-white">Devamı kitapta</p>
              <p className="mt-1 mb-4 font-sans text-sm text-zinc-400">
                Bu sayfanın ve tüm bölümlerin tamamını okumak için kitaba eriş.
              </p>
              <ThemeButton
                theme={theme}
                variant="primary"
                size="md"
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                onClick={cta.onClick}
                className="w-full font-sans"
              >
                <span>{cta.label}</span>
              </ThemeButton>
            </div>
          </div>
        )}
      </article>
    );
  };

  const body =
    variant === "card" ? (
      <button
        type="button"
        onClick={() => setOpen(0)}
        className={`group w-full rounded-2xl border p-5 lg:py-4 text-left transition-all duration-500 ${cardBorder}`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-5 lg:flex-1 min-w-0">
          {/* Yelpaze gibi açılmış küçük sayfalar */}
          <div className="relative flex-shrink-0 w-[104px] h-[100px] sm:w-[120px] sm:h-[110px] lg:w-[104px] lg:h-[96px]">
            {pages.slice(0, 3).map((p, i) => (
              <div
                key={p.src}
                className="absolute top-1 w-[62px] sm:w-[70px] lg:w-[60px] aspect-[2/3] overflow-hidden rounded-[4px] border border-white/15 bg-black shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-500"
                style={{
                  left: `${i * 20}px`,
                  zIndex: 3 - i,
                  transform: `rotate(${(i - 1) * 7}deg) translateY(${i === 1 ? -4 : 0}px)`,
                }}
              >
                <Image src={p.src} alt="" fill sizes="80px" className="object-cover object-top" />
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] uppercase ${accent}`}>
              <Eye className="w-3.5 h-3.5" />
              Kitaptan Önizleme
            </div>
            <div className="mt-1 font-cinzel text-lg sm:text-xl font-bold text-white leading-tight">{heading}</div>
            <p className="mt-1 text-xs text-zinc-400 leading-snug">
              İlk sayfalar sana hediye. Dokun, büyüt ve oku.
            </p>
          </div>
        </div>

        <span
          className={`flex min-h-[44px] w-full lg:w-auto lg:flex-shrink-0 lg:px-5 items-center justify-center gap-2 rounded-xl border text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors ${
            isGold
              ? "border-gold-500/50 text-gold-300 group-hover:bg-gold-500/10"
              : "border-crimson-500/50 text-crimson-200 group-hover:bg-crimson-500/10"
          }`}
        >
          <Eye className="w-4 h-4" />
          İlk {pages.length} Sayfayı Oku
        </span>
        </div>
      </button>
    ) : (
    <div className="mt-16 sm:mt-20">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase ${accent}`}>
          <Eye className="w-4 h-4" />
          Kitaptan Önizleme
        </div>
        <h3 className="mt-2 font-cinzel text-[clamp(1.3rem,3.2vw,2rem)] font-bold text-white">{heading}</h3>
        <p className="mt-2 text-sm text-zinc-400">İlk sayfalar sana hediye. Sayfaya dokunarak büyüt ve oku.</p>
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
            {p.clearUntil < 100 && <LockedOverlay page={p} />}
            <span className="absolute top-2 right-2 rounded-full bg-black/70 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Büyüt
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center" data-sticky-hide>
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
    </div>
    );

  return (
    <>
      {body}

      {/* Büyük okuma penceresi */}
      {open !== null && (
        <div
          className={`fixed inset-0 z-[60] flex justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 ${zoom ? "items-start overflow-y-auto" : "items-center"}`}
          onClick={close}
          role="dialog"
          aria-modal="true"
          id="book-reader"
        >
          <div className={`relative w-full transition-[max-width] duration-300 ${zoom ? "max-w-[min(495px,100%)]" : "max-w-[560px]"}`} onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className={`font-cinzel text-sm font-bold tracking-wider ${accent}`}>
                {open + 1} / {pages.length} · {pages[open].title}
              </span>
              <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                aria-label={zoom ? "Küçült" : "Büyüt"}
                className="min-h-[44px] flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-700 px-4 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white"
              >
                {zoom ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                {zoom ? "Küçült" : "Büyüt"}
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Kapat"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              </div>
            </div>

            {zoom && isMobile && pages[open].text ? (
              <ReadingView page={pages[open]} />
            ) : (
            <div className={zoom ? "-mx-3 overflow-x-auto px-3 sm:mx-0 sm:overflow-visible sm:px-0" : ""}>
            <div
              onDoubleClick={() => setZoom((z) => !z)}
              className={`relative mx-auto aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-black ${zoom ? "w-[150%] max-w-none sm:w-full cursor-zoom-out" : "max-h-[70svh] cursor-zoom-in"}`}
            >
              <Image
                src={pages[open].src}
                alt={pages[open].title}
                fill
                sizes={zoom ? "(max-width: 640px) 160vw, 495px" : "560px"}
                quality={95}
                className="object-contain object-top"
              />
              {pages[open].clearUntil < 100 && <LockedOverlay page={pages[open]} big />}
            </div>
            </div>
            )}

            {pages[open].clearUntil >= 100 && (
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                {open < pages.length - 1 && (
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="min-h-[44px] w-full sm:w-auto px-5 rounded-xl border border-white/15 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:bg-white/5"
                  >
                    Sonraki Sayfa →
                  </button>
                )}
                <ThemeButton
                  theme={theme}
                  variant="primary"
                  size="md"
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                  onClick={cta.onClick}
                  className="w-full sm:w-auto"
                >
                  <span>{cta.label}</span>
                </ThemeButton>
              </div>
            )}

            {pages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Önceki sayfa"
                  className={`${zoom ? "fixed left-6 hidden sm:flex" : "absolute left-1 sm:-left-14 flex"} top-1/2 z-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/80 border border-white/15 text-white`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Sonraki sayfa"
                  className={`${zoom ? "fixed right-6 hidden sm:flex" : "absolute right-1 sm:-right-14 flex"} top-1/2 z-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-black/80 border border-white/15 text-white`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

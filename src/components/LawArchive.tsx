"use client";

import { useRef, useState } from "react";
import { Lock, Unlock, ArrowRight, ScrollText } from "lucide-react";
import { ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { scrollToSection } from "@/lib/scrollToSection";

/**
 * "100 Kanunun Arşivi": 100 numaralı kutucuk; üçü açık, gerisi kilitli.
 * Açık kanuna dokununca sağda (telefonda altta) okunur; kilitliye dokununca satın alma çağrısı çıkar.
 */
interface OpenLaw {
  no: number;
  page: number;
  content: React.ReactNode;
}

const OPEN_LAWS: OpenLaw[] = [
  {
    no: 41,
    page: 148,
    content: (
      <>
        Bir kadını elinde tutmanın tek yolu, onu her an bırakıp gidebilecek o sarsılmaz güce sahip
        olmaktır. Çünkü zayıf bir adamın asla sahip olamayacağı{" "}
        <strong className="gold-text-gradient font-bold">o tek gerçek kozu</strong> elinde tutuyorsun.
      </>
    ),
  },
  {
    no: 62,
    page: 84,
    content: (
      <>
        Uzun bir sitem mesajına uzun bir savunmayla cevap verme. Sakin tek bir kelime, sayfalarca
        açıklamadan ağır basar:{" "}
        <span
          className="relative mx-1 inline-flex items-center justify-center rounded-sm border-y border-zinc-800 bg-black px-3 align-middle"
          title="Sansürlü"
        >
          <span className="invisible text-sm">Anladım.</span>
          <Lock className="absolute h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
        </span>{" "}
        Gerisini{" "}
        <strong className="gold-text-gradient font-bold">onun kendi düşüncelerine bırakırsın.</strong>
      </>
    ),
  },
  {
    no: 93,
    page: 221,
    content: (
      <>
        Bir kadınla tartışırken ona{" "}
        <span
          className="relative mx-1 inline-flex items-center justify-center rounded-sm border-y border-zinc-800 bg-black px-3 align-middle"
          title="Sansürlü"
        >
          <span className="invisible text-sm">Sen bilirsin</span>
          <Lock className="absolute h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
        </span>{" "}
        deyip konuyu kapattığında, o oyunu sen kazanmış olursun. O iki kelime, karşındakini kendi
        çaresizliğiyle baş başa bırakan{" "}
        <strong className="gold-text-gradient font-bold">en ağır nükleer bombadır.</strong>
      </>
    ),
  },
];

const OPEN_MAP = new Map(OPEN_LAWS.map((l) => [l.no, l]));
const TOTAL = 100;

export default function LawArchive() {
  const [selected, setSelected] = useState<number>(93);
  const law = OPEN_MAP.get(selected);
  const panelRef = useRef<HTMLDivElement>(null);

  // Telefonda panel ızgaranın altında kaldığı için seçimden sonra panele kaydır
  const choose = (n: number) => {
    setSelected(n);
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < 90 || r.bottom > window.innerHeight - 20) {
        window.scrollTo({ top: r.top + window.scrollY - 110, behavior: "smooth" });
      }
    });
  };

  const goPricing = (e: React.MouseEvent<HTMLElement>) => {
    if (scrollToSection("fiyatlandirma")) e.preventDefault();
  };

  return (
    <section
      id="gizli-arsiv"
      className="relative overflow-hidden bg-gradient-to-b from-matte-950 via-black to-matte-950 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap1"
          badgeText="GİZLİ ARŞİV"
          title="100 Sarsılmaz"
          highlightText="Kanun"
          subtitle="Kitapta 100 kanun var. Üçü senin için açıldı; parlayanlara dokun ve oku. Kalan 97'si yalnızca kitapta."
          className="mb-10 sm:mb-14"
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          {/* 100'lük ızgara */}
          <div>
            <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="text-gold-400">Arşiv</span>
              <span className="text-zinc-500">
                <span className="text-gold-300">3</span> / {TOTAL} açık
              </span>
            </div>
            <div className="mb-4 h-1 overflow-hidden rounded-full bg-zinc-900">
              <div className="h-full w-[3%] rounded-full bg-gradient-to-r from-gold-300 to-gold-600 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            </div>

            <div className="grid grid-cols-10 gap-1 sm:gap-1.5" role="list">
              {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => {
                const isOpen = OPEN_MAP.has(n);
                const isSel = selected === n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="listitem"
                    onClick={() => choose(n)}
                    aria-label={isOpen ? `Kanun ${n}: oku` : `Kanun ${n}: kilitli`}
                    className={`relative flex aspect-square items-center justify-center rounded-[4px] border font-cinzel text-[9px] font-bold transition-all duration-300 sm:text-[11px] ${
                      isSel
                        ? isOpen
                          ? "scale-110 border-gold-300 bg-gradient-to-br from-gold-300 to-gold-600 text-black shadow-[0_0_20px_rgba(212,175,55,0.7)] z-10"
                          : "border-gold-500/60 bg-mahogany-900 text-gold-300 z-10"
                        : isOpen
                        ? "border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_0_14px_rgba(212,175,55,0.45)] hover:bg-gold-500/30 animate-[lawPulse_2.4s_ease-in-out_infinite]"
                        : "border-zinc-800/80 bg-black/40 text-zinc-700 hover:border-gold-500/30 hover:text-zinc-500"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <span className="inline-block h-3 w-3 rounded-[3px] border border-gold-400/80 bg-gold-500/20" />
              Açık kanun
              <span className="ml-3 inline-block h-3 w-3 rounded-[3px] border border-zinc-800 bg-black/40" />
              Kitapta mühürlü
            </p>
          </div>

          {/* Okuma paneli */}
          <div ref={panelRef} className="relative rounded-2xl bg-gradient-to-b from-gold-500/50 via-gold-500/15 to-mahogany-700/40 p-px lg:sticky lg:top-28">
            <div
              key={selected}
              className="law-fade relative min-h-[320px] overflow-hidden rounded-[15px] bg-gradient-to-br from-[#17100a] via-matte-950 to-black p-7 sm:p-9"
            >
              <span className="pointer-events-none absolute -right-3 -top-8 select-none font-cinzel text-[8.5rem] font-black leading-none text-gold-500/[0.07]">
                {selected}
              </span>

              {law ? (
                <>
                  <div className="relative flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400 sm:text-[11px]">
                    <Unlock className="h-3.5 w-3.5" />
                    Sayfa {law.page} • Kanun #{law.no}
                  </div>
                  <div className="relative my-5 h-px bg-gradient-to-r from-gold-500/60 to-transparent" />
                  <blockquote className="relative font-playfair text-[1.15rem] leading-[1.9] text-zinc-100 sm:text-[1.35rem]">
                    {law.content}
                  </blockquote>
                  <div className="relative mt-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-gold-500/60" />
                    <span className="font-cinzel text-[11px] font-bold tracking-[0.3em] text-gold-500/90">
                      Vazgeçilmez Olma Sanatı
                    </span>
                  </div>
                </>
              ) : (
                <div className="relative flex min-h-[260px] flex-col items-center justify-center text-center">
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/60 bg-black text-gold-400 shadow-[0_0_35px_rgba(212,175,55,0.35)]">
                    <Lock className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div className="font-cinzel text-xl font-bold text-white sm:text-2xl">
                    Kanun #{selected} mühürlü
                  </div>
                  <p className="mt-2 max-w-xs text-sm text-zinc-400">
                    Bu kanun ve kalan 96'sı yalnızca kitapta. Mührü açmak için kitaba eriş.
                  </p>
                  <ThemeButton
                    theme="kitap1"
                    variant="primary"
                    size="md"
                    href="#fiyat-kartlari"
                    onClick={goPricing}
                    className="mt-6"
                  >
                    <span>Mührü Aç</span>
                    <ArrowRight className="h-4 w-4" />
                  </ThemeButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center" data-sticky-hide>
          <ThemeButton
            theme="kitap1"
            variant="primary"
            size="lg"
            href="#fiyat-kartlari"
            onClick={goPricing}
            className="w-full sm:w-auto"
          >
            <ScrollText className="h-5 w-5" />
            <span>100 Kanunun Tamamına Eriş</span>
            <ArrowRight className="h-4 w-4" />
          </ThemeButton>
          <span className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Bu arşiv dışarı sızdırılmaz
          </span>
        </div>
      </div>
    </section>
  );
}

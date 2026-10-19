"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Bell, Clock, Flame, Sparkles, Zap } from "lucide-react";
import { ThemeBadge, ThemeButton } from "./ui/ThemeSystem";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";
import { scrollToSection } from "@/lib/scrollToSection";

// Lazy-load react-three-fiber sahnesi (SSR kapalı, açılış hızını etkilemez)
const HeroParticlesCanvas = dynamic(() => import("./HeroParticlesCanvas"), {
  ssr: false,
});

type BookFocus = "kitap1" | "kitap2" | null;
type MobileBookSelection = "kitap1" | "kitap2";

function formatTwoDigits(val: number): string {
  return String(val).padStart(2, "0");
}

/**
 * Her iki kitap için birebir aynı boyutta ve 2:3 klasik kitap oranında 3D Kitap Objesi
 */
export function Book3DModel({
  book,
  isFocused,
  isDimmed,
  sizeClassName,
  orientation,
  imageSizes = "(max-width: 1024px) 45vw, 420px",
}: {
  book: "kitap1" | "kitap2";
  isFocused: boolean;
  isDimmed: boolean;
  sizeClassName: string;
  /** Kitabın hangi yöne dönük duracağı (varsayılan: kitap1 sol, kitap2 sağ) */
  orientation?: "left" | "right";
  imageSizes?: string;
}) {
  const isKitap1 = book === "kitap1";
  const facesLeft = orientation ? orientation === "left" : isKitap1;

  const baseClass = facesLeft
    ? "book-3d-object-left"
    : "book-3d-object-right";

  const stateClass = isFocused
    ? "book-3d-object-focused"
    : isDimmed
    ? facesLeft
      ? "book-3d-object-dimmed-left"
      : "book-3d-object-dimmed-right"
    : "";

  return (
    <div
      className={`book-3d-object ${baseClass} ${stateClass} ${sizeClassName} aspect-[2/3] cursor-pointer flex-shrink-0`}
    >
      {/* Sol Kitap Sırtı (Spine) */}
      <div
        className={`book-3d-spine flex flex-col items-center justify-between py-3 shadow-inner border-y border-l ${
          isKitap1
            ? "bg-gradient-to-b from-mahogany-800 via-mahogany-900 to-mahogany-950 border-gold-500/45"
            : "bg-gradient-to-b from-crimson-950 via-matte-950 to-crimson-950 border-crimson-600/45"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isKitap1 ? "bg-gold-400/75" : "bg-emerald-400/75"
          }`}
        />
        <span
          className="font-cinzel text-[8px] font-bold tracking-[0.2em] text-gold-300/95 uppercase whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          {isKitap1 ? "VAZGEÇİLMEZ OLMA SANATI" : "ÇEKİCİLİK SANATI"}
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isKitap1 ? "bg-gold-400/75" : "bg-emerald-400/75"
          }`}
        />
      </div>

      {/* Sağ Beyazımsı Sayfa Kalınlığı */}
      <div className="book-3d-pages" />
      {/* Üst ve Alt Sayfa Kenarları */}
      <div className="book-3d-top" />
      <div className="book-3d-bottom" />
      {/* Arka Kapak */}
      <div
        className={`book-3d-back border ${
          isKitap1 ? "border-gold-500/25" : "border-crimson-800/30"
        }`}
      />

      {/* Ön Kapak (Birebir 2:3 oran, object-fit: cover) */}
      <div
        className={`book-3d-front w-full h-full rounded-r-xl rounded-l-[3px] overflow-hidden border ${
          isKitap1
            ? "border-gold-500/55 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.95),0_0_28px_rgba(212,175,55,0.25)] bg-mahogany-950"
            : "border-crimson-600/55 shadow-[0_22px_50px_-12px_rgba(0,0,0,0.95),0_0_28px_rgba(185,28,28,0.28)] bg-matte-900"
        }`}
      >
        {/* Sol kenar gerçekçi cilt oluğu izi */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/65 via-white/10 to-transparent z-10" />
        <Image
          src={
            isKitap1
              ? "/vazgecilmez-yeni-kapak.jpg"
              : "/cekicilik-sanati-kapak.jpg"
          }
          alt={
            isKitap1
              ? "Vazgeçilmez Olma Sanatı - Gürkan Özbinici"
              : "Çekicilik Sanatı - Gürkan Özbinici"
          }
          fill
          priority
          sizes={imageSizes}
          quality={90}
          className={`object-cover ${
            isKitap1 ? "object-center" : "object-[50%_68%]"
          }`}
        />
        {/* Lüks Parlama Katmanı */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  // Masaüstü hover odağı
  const [desktopHoverBook, setDesktopHoverBook] = useState<BookFocus>(null);
  // Mobil seçili kitap (varsayılan: kitap1, 4 saniyede bir otomatik geçiş)
  const [mobileSelectedBook, setMobileSelectedBook] =
    useState<MobileBookSelection>("kitap1");
  const [userInteractedMobile, setUserInteractedMobile] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const { mounted, isOnSale, timeLeft } = useCekicilikLaunchStatus();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setStageTilt({ x: 0, y: 0 });
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Alt bar: kullanıcı bir kitabın bölümündeyken o kitabın butonunu göstersin
  const [sectionBook, setSectionBook] = useState<MobileBookSelection | null>(null);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const inRange = (startId: string, endId: string, y: number) => {
      const a = document.getElementById(startId);
      const b = document.getElementById(endId);
      if (!a || !b) return false;
      const top = a.getBoundingClientRect().top + window.scrollY;
      const bottom = b.getBoundingClientRect().bottom + window.scrollY;
      return y >= top && y < bottom;
    };
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.9);
      const y = window.scrollY + window.innerHeight / 2;
      if (inRange("cekicilik-sanati", "cekicilik-sanati", y)) setSectionBook("kitap2");
      else if (inRange("vazgecilmez", "fiyatlandirma", y)) setSectionBook("kitap1");
      else setSectionBook(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sayfada satın alma alanı görünürken alttaki sabit bar gizlensin (iki buton üst üste binmesin)
  const [hideBar, setHideBar] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHideBar(visible.size > 0);
      },
      { rootMargin: "0px", threshold: 0 }
    );
    const els = document.querySelectorAll("[data-sticky-hide]");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobilde kullanıcı dokunmadığı sürece 4 saniyede bir otomatik kitap geçişi
  useEffect(() => {
    if (prefersReducedMotion || userInteractedMobile) return;
    const timer = window.setInterval(() => {
      setMobileSelectedBook((prev) => (prev === "kitap1" ? "kitap2" : "kitap1"));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, userInteractedMobile]);

  const handleSelectMobileBook = useCallback((book: MobileBookSelection) => {
    setUserInteractedMobile(true);
    setMobileSelectedBook(book);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 32) {
      setUserInteractedMobile(true);
      if (deltaX < 0) {
        setMobileSelectedBook("kitap2");
      } else {
        setMobileSelectedBook("kitap1");
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const normX = (event.clientX - rect.left) / rect.width - 0.5;
      const normY = (event.clientY - rect.top) / rect.height - 0.5;

      setStageTilt({
        x: Number((-normY * 4).toFixed(2)),
        y: Number((normX * 5.5).toFixed(2)),
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setStageTilt({ x: 0, y: 0 });
    setDesktopHoverBook(null);
  }, []);

  const scrollToTarget = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      primaryId: string,
      fallbackId?: string
    ) => {
      if (typeof document === "undefined") return;
      const target =
        document.getElementById(primaryId) ||
        (fallbackId ? document.getElementById(fallbackId) : null);

      if (target) {
        e.preventDefault();
        if (target.tagName === "SECTION" && target.id) {
          scrollToSection(target.id, prefersReducedMotion);
        } else {
          target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }
    },
    [prefersReducedMotion]
  );

  // Aktif atmosfer rengi (Masaüstünde hover, mobilde seçili kitap)
  const effectiveAtmosphere: BookFocus = desktopHoverBook ?? mobileSelectedBook;

  return (
    <>
      <section
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[100svh] lg:h-[100svh] w-full max-w-full flex flex-col justify-between pt-[116px] pb-[84px] lg:pt-[108px] lg:pb-8 overflow-hidden bg-matte-950 select-none"
      >
        {/* =================================================================== */}
        {/* 1. ARKA PLAN ATMOSFERİ, IŞIK SAHNESİ VE PARTİKÜLLER                 */}
        {/* =================================================================== */}
        <div className="pointer-events-none absolute inset-0 bg-dark-radial" />

        {/* İnce lüks mimari ızgara dokusu */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Sahne Işıkları (Her iki kitabın kendi renginde kalıcı hâle + seçimde güçlenme) */}
        <div className="pointer-events-none absolute inset-0 animate-hero-light">
          {/* Sol Kitap (Kitap 1 — Sıcak Altın / Maun-Konyak) */}
          <div
            className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full blur-[120px] transition-all duration-700 ${
              effectiveAtmosphere === "kitap1"
                ? "bg-gold-500/28 scale-110 opacity-100"
                : "bg-mahogany-600/20 scale-95 opacity-60"
            }`}
          />
          {/* Sağ Kitap (Kitap 2 — Kırmızı / Zümrüt) */}
          <div
            className={`absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full blur-[120px] transition-all duration-700 ${
              effectiveAtmosphere === "kitap2"
                ? "bg-crimson-600/32 scale-110 opacity-100"
                : "bg-crimson-800/20 scale-95 opacity-60"
            }`}
          />
        </div>

        {/* Lazy-Loaded react-three-fiber Altın Toz Parçacıkları & Hafif Duman */}
        {!prefersReducedMotion && (
          <HeroParticlesCanvas activeBook={effectiveAtmosphere} />
        )}

        {/* =================================================================== */}
        {/* 2. ANA İÇERİK KAPSAYICISI (100svh İlk Ekrana Tam Sığan Yapı)         */}
        {/* =================================================================== */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
          {/* ----------------------------------------------------------------- */}
          {/* ÜST MERKEZ BAŞLIK ALANI (Kompakt, Maks 2 Satır Başlık)            */}
          {/* ----------------------------------------------------------------- */}
          <div className="animate-hero-title text-center max-w-4xl mx-auto pt-1 sm:pt-2">

            <p className="mb-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400/80">
              Maskülenite · Gürkan Özbinici
            </p>
            <h1 className="font-cinzel text-[clamp(1.6rem,5vw,2.9rem)] font-black tracking-tight text-white leading-[1.1] mb-2">
              <span className="gold-text-gradient">
                İlişkilerin Gizli Kanunları
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-snug max-w-xl lg:max-w-none mx-auto lg:whitespace-nowrap">
              Biri erkek için, biri kadın için. Aynı oyunun iki tarafı.{" "}
              <strong className="text-white font-semibold">
                800.000+ kişinin
              </strong>{" "}
              takip ettiği vizyon, şimdi iki kitapta.
            </p>
          </div>

          {/* ================================================================= */}
          {/* A) MASAÜSTÜ DÜZENİ (lg:grid — İki Kitap Yan Yana, Aynı Hizada)    */}
          {/* ================================================================= */}
          <div
            className="hidden lg:block hero-perspective-stage w-full my-auto transition-transform duration-300 ease-out"
            style={{
              transform: prefersReducedMotion
                ? undefined
                : `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
            }}
          >
            <div className="relative grid grid-cols-2 gap-10 xl:gap-16 items-stretch max-w-5xl mx-auto">
              {/* Ortada İnce Dikey Altın Ayırıcı Çizgi ve Parıltı */}
              <div
                className="pointer-events-none absolute left-1/2 top-6 bottom-6 -translate-x-1/2 flex flex-col items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-px h-full bg-gradient-to-b from-transparent via-gold-500/35 to-transparent" />
                <div className="absolute w-2 h-2 rotate-45 bg-gold-400/80 shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SOL KİTAP: VAZGEÇİLMEZ OLMA SANATI (KİTAP 1 — ALTIN & MAUN)    */}
              {/* ------------------------------------------------------------- */}
              <div
                onMouseEnter={() => setDesktopHoverBook("kitap1")}
                onFocus={() => setDesktopHoverBook("kitap1")}
                className="animate-hero-book-left flex flex-col items-center justify-between text-center group"
              >
                {/* 3D Kitap + Kalıcı Sıcak Altın/Konyak Işık Hâlesi */}
                <div className="book-3d-scene relative flex flex-col items-center justify-center py-1">
                  <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[26rem] rounded-full blur-3xl transition-all duration-500 ${
                      desktopHoverBook === "kitap1"
                        ? "bg-gradient-to-tr from-gold-500/50 via-mahogany-500/45 to-amber-400/35 scale-125 opacity-100"
                        : "bg-gradient-to-tr from-mahogany-600/45 via-gold-500/28 to-amber-500/20 opacity-90"
                    }`}
                  />

                  <Book3DModel
                    book="kitap1"
                    isFocused={desktopHoverBook === "kitap1"}
                    isDimmed={desktopHoverBook === "kitap2"}
                    sizeClassName="h-[min(46svh,420px)] w-[calc(min(46svh,420px)*0.6667)]"
                  />

                  {/* Zemin Yansıması & Gölge */}
                  <div
                    className={`pointer-events-none mt-4 h-4 w-60 rounded-full blur-lg transition-all duration-500 ${
                      desktopHoverBook === "kitap1"
                        ? "bg-gold-500/50 scale-110"
                        : "bg-gold-500/28"
                    }`}
                  />
                  <div className="pointer-events-none -mt-2.5 h-3 w-52 rounded-full bg-black/90 blur-md" />
                </div>

                {/* Kitabın Hemen Altı: Rozet, Kitap Adı, Kısa Not ve Buton (Birebir Aynı Hizada) */}
                <div className="w-full max-w-sm mt-2 flex flex-col items-center">
                  {/* 1. Rozet Satırı (Sabit Yükseklik) */}
                  <div className="h-7 flex items-center justify-center">
                    <ThemeBadge
                      theme="kitap1"
                      status="satista"
                      className="px-3.5 py-1 text-[11px]"
                    >
                      <Zap className="w-3 h-3 fill-black text-black" />
                      <span>E-KİTAP SATIŞTA</span>
                    </ThemeBadge>
                  </div>

                  {/* 2. Kitap Adı */}
                  <h2 className="font-cinzel text-lg xl:text-xl font-bold text-white tracking-wide mt-1.5">
                    Vazgeçilmez Olma Sanatı
                  </h2>

                  {/* 3. Kısa Not Alanı (Sabit Yükseklik - İki Kitapta Eşit) */}
                  <div className="h-11 flex flex-col items-center justify-center mt-0.5 mb-2.5">
                    <span className="text-[11px] font-semibold text-mahogany-200">
                      Erkekler için
                    </span>
                    {isOnSale ? (
                      <span className="text-[11px] font-medium text-gold-300/90 mt-0.5">
                        Fiziksel Yenilenmiş Edisyon Şimdi Satışta
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 mt-0.5 px-2.5 py-0.5 rounded-md bg-mahogany-950/90 border border-gold-500/50 text-[11px] font-mono font-bold text-gold-200 shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                        <span className="font-sans font-semibold text-gold-400/90 mr-0.5">Fiziksel:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.days) : "--"}G</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.hours) : "--"}S</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.minutes) : "--"}D</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.seconds) : "--"}Sn</span>
                      </div>
                    )}
                  </div>

                  {/* 4. Satın Alma Butonu (İki Kitapta Aynı Boyut ve Hiza) */}
                  <ThemeButton
                    theme="kitap1"
                    variant="primary"
                    size="md"
                    fullWidth
                    href="#fiyat-kartlari"
                    onClick={(e) =>
                      scrollToTarget(e, "fiyat-kartlari", "fiyatlandirma")
                    }
                    className="w-full max-w-[320px] min-h-[48px] h-[48px]"
                  >
                    <span>E-Kitabı Hemen Al – 600 TL</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </ThemeButton>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SAĞ KİTAP: ÇEKİCİLİK SANATI (KİTAP 2 — KIRMIZI & ZÜMRÜT)       */}
              {/* ------------------------------------------------------------- */}
              <div
                onMouseEnter={() => setDesktopHoverBook("kitap2")}
                onFocus={() => setDesktopHoverBook("kitap2")}
                className="animate-hero-book-right flex flex-col items-center justify-between text-center group"
              >
                {/* 3D Kitap + Kalıcı Kırmızı ve Hafif Zümrüt Işık Hâlesi */}
                <div className="book-3d-scene relative flex flex-col items-center justify-center py-1">
                  <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[26rem] rounded-full blur-3xl transition-all duration-500 ${
                      desktopHoverBook === "kitap2"
                        ? "bg-gradient-to-tl from-crimson-500/55 via-crimson-800/45 to-emerald-500/35 scale-125 opacity-100"
                        : "bg-gradient-to-tl from-crimson-600/45 via-crimson-900/35 to-emerald-500/20 opacity-90"
                    }`}
                  />

                  <Book3DModel
                    book="kitap2"
                    isFocused={desktopHoverBook === "kitap2"}
                    isDimmed={desktopHoverBook === "kitap1"}
                    sizeClassName="h-[min(46svh,420px)] w-[calc(min(46svh,420px)*0.6667)]"
                  />

                  {/* Zemin Yansıması & Gölge */}
                  <div
                    className={`pointer-events-none mt-4 h-4 w-60 rounded-full blur-lg transition-all duration-500 ${
                      desktopHoverBook === "kitap2"
                        ? "bg-crimson-500/50 scale-110"
                        : "bg-crimson-600/30"
                    }`}
                  />
                  <div className="pointer-events-none -mt-2.5 h-3 w-52 rounded-full bg-black/90 blur-md" />
                </div>

                {/* Kitabın Hemen Altı: Rozet, Kitap Adı, Kısa Not + Sayaç ve Buton */}
                <div className="w-full max-w-sm mt-2 flex flex-col items-center">
                  {/* 1. Rozet Satırı (Sabit Yükseklik) */}
                  <div className="h-7 flex items-center justify-center">
                    {isOnSale ? (
                      <ThemeBadge
                        theme="kitap2"
                        status="satista"
                        className="px-3.5 py-1 text-[11px]"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span>SATIŞTA</span>
                      </ThemeBadge>
                    ) : (
                      <ThemeBadge
                        theme="kitap2"
                        status="yakinda"
                        className="px-3.5 py-1 text-[11px]"
                      >
                        <Clock className="w-3 h-3 text-crimson-300" />
                        <span>5 KASIM&apos;DA GELİYOR</span>
                      </ThemeBadge>
                    )}
                  </div>

                  {/* 2. Kitap Adı */}
                  <h2 className="font-cinzel text-lg xl:text-xl font-bold text-white tracking-wide mt-1.5">
                    Çekicilik Sanatı
                  </h2>

                  {/* 3. Kısa Not + Kompakt Tek Satır Geri Sayım (Sabit Yükseklik) */}
                  <div className="h-11 flex flex-col items-center justify-center mt-0.5 mb-2.5">
                    <span className="text-[11px] font-semibold text-crimson-300">
                      Kadınlar için
                    </span>
                    {!isOnSale ? (
                      <div className="inline-flex items-center gap-1.5 mt-0.5 px-2.5 py-0.5 rounded-md bg-crimson-950/80 border border-crimson-800/70 text-[11px] font-mono font-bold text-gold-300">
                        <span>
                          {mounted ? formatTwoDigits(timeLeft.days) : "--"}G
                        </span>
                        <span className="text-crimson-400">:</span>
                        <span>
                          {mounted ? formatTwoDigits(timeLeft.hours) : "--"}S
                        </span>
                        <span className="text-crimson-400">:</span>
                        <span>
                          {mounted ? formatTwoDigits(timeLeft.minutes) : "--"}D
                        </span>
                        <span className="text-crimson-400">:</span>
                        <span>
                          {mounted ? formatTwoDigits(timeLeft.seconds) : "--"}Sn
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-400 mt-0.5">
                        E-Kitap ve Fiziksel Kitap Şimdi Satışta
                      </span>
                    )}
                  </div>

                  {/* 4. Satın Alma / Haber Al Butonu (Sol Kitapla Birebir Aynı Boyut ve Hizada) */}
                  {!isOnSale ? (
                    <ThemeButton
                      theme="kitap2"
                      variant="primary"
                      size="md"
                      fullWidth
                      href="#cekicilik-sanati"
                      onClick={(e) =>
                        scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
                      }
                      className="w-full max-w-[320px] min-h-[48px] h-[48px]"
                    >
                      <Bell className="w-4 h-4 text-gold-300 flex-shrink-0" />
                      <span>Haber Al</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </ThemeButton>
                  ) : (
                    <ThemeButton
                      theme="kitap2"
                      variant="primary"
                      size="md"
                      fullWidth
                      href="#cekicilik-sanati"
                      onClick={(e) =>
                        scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
                      }
                      className="w-full max-w-[320px] min-h-[48px] h-[48px]"
                    >
                      <Flame className="w-4 h-4 text-white flex-shrink-0" />
                      <span>Hemen Satın Al – 600 TL&apos;den başlayan</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </ThemeButton>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* B) TELEFON & TABLET DÜZENİ (lg:hidden — Yelpaze 2 Kitap + Seçim)   */}
          {/* ================================================================= */}
          <div
            className="lg:hidden flex-1 flex flex-col items-center justify-between py-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. Yelpaze (Fan) Düzeninde Yan Yana İki 3D Kitap */}
            <div className="relative w-full max-w-[390px] h-[min(300px,38svh)] sm:h-[320px] flex items-center justify-center gap-5 my-auto">
              {/* Sol Kitap Arkası Kalıcı Sıcak Altın/Konyak Hâle */}
              <div
                className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-40 h-56 rounded-full blur-2xl transition-all duration-500 ${
                  mobileSelectedBook === "kitap1"
                    ? "bg-gradient-to-tr from-gold-500/55 via-mahogany-500/45 to-amber-400/35 scale-115 opacity-100"
                    : "bg-mahogany-600/35 opacity-65"
                }`}
              />

              {/* Sağ Kitap Arkası Kalıcı Kırmızı/Zümrüt Hâle */}
              <div
                className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-40 h-56 rounded-full blur-2xl transition-all duration-500 ${
                  mobileSelectedBook === "kitap2"
                    ? "bg-gradient-to-tl from-crimson-500/60 via-crimson-800/45 to-emerald-500/30 scale-115 opacity-100"
                    : "bg-crimson-700/35 opacity-65"
                }`}
              />

              {/* SOL KİTAP (Vazgeçilmez Olma Sanatı — Hafif Sola Yatık, Seçilince Öne Gelir) */}
              <div
                onClick={() => handleSelectMobileBook("kitap1")}
                role="button"
                tabIndex={0}
                aria-label="Vazgeçilmez Olma Sanatı kitabını seç"
                className={`relative transition-all duration-500 ease-out cursor-pointer ${
                  mobileSelectedBook === "kitap1"
                    ? "z-20 scale-105 translate-y-0"
                    : "z-10 scale-[0.9] -rotate-3 translate-y-2 opacity-70"
                }`}
              >
                <Book3DModel
                  book="kitap1"
                  isFocused={mobileSelectedBook === "kitap1"}
                  isDimmed={false}
                  sizeClassName="h-[min(243px,30svh)] w-[calc(min(243px,30svh)*0.6667)] sm:w-[180px] sm:h-[270px]"
                />
              </div>

              {/* SAĞ KİTAP (Çekicilik Sanatı — Hafif Sağa Yatık, Seçilince Öne Gelir) */}
              <div
                onClick={() => handleSelectMobileBook("kitap2")}
                role="button"
                tabIndex={0}
                aria-label="Çekicilik Sanatı kitabını seç"
                className={`relative transition-all duration-500 ease-out cursor-pointer ${
                  mobileSelectedBook === "kitap2"
                    ? "z-20 scale-105 translate-y-0"
                    : "z-10 scale-[0.9] rotate-3 translate-y-2 opacity-70"
                }`}
              >
                <Book3DModel
                  book="kitap2"
                  isFocused={mobileSelectedBook === "kitap2"}
                  isDimmed={false}
                  sizeClassName="h-[min(243px,30svh)] w-[calc(min(243px,30svh)*0.6667)] sm:w-[180px] sm:h-[270px]"
                />
              </div>
            </div>

            {/* 2. Seçili Kitabın Rozeti, Adı ve Kısa Bilgisi (Yumuşak Geçişli) */}
            <div className="w-full max-w-sm flex flex-col items-center text-center pb-1">
              {/* Kitap Seçim Sekmeleri */}
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-matte-900/90 border border-zinc-800/90 mb-2">
                <button
                  type="button"
                  onClick={() => handleSelectMobileBook("kitap1")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    mobileSelectedBook === "kitap1"
                      ? "bg-gradient-to-r from-gold-300 to-gold-500 text-black shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  1. Vazgeçilmez Olma
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectMobileBook("kitap2")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    mobileSelectedBook === "kitap2"
                      ? "bg-gradient-to-r from-crimson-600 to-crimson-800 text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  2. Çekicilik Sanatı
                </button>
              </div>

              {mobileSelectedBook === "kitap1" ? (
                <div
                  key="mobile-kitap1"
                  className="animate-countdown-digit flex flex-col items-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-1 whitespace-nowrap">
                    <ThemeBadge
                      theme="kitap1"
                      status="satista"
                      className="px-2.5 py-0.5 text-[9px] whitespace-nowrap"
                    >
                      <Zap className="w-3 h-3 fill-black text-black" />
                      <span>E-KİTAP SATIŞTA</span>
                    </ThemeBadge>
                    <span className="text-[11px] font-semibold text-mahogany-200">
                      Erkekler için
                    </span>
                  </div>

                  <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-tight">
                    Vazgeçilmez Olma Sanatı
                  </h2>
                  {isOnSale ? (
                    <p className="text-xs text-gold-300/90 mt-1">
                      Fiziksel Yenilenmiş Edisyon Şimdi Satışta
                    </p>
                  ) : (
                    <div className="mt-1">
                      <div className="inline-flex items-center gap-1.5 mt-0.5 px-2.5 py-0.5 rounded-md bg-mahogany-950/90 border border-gold-500/50 text-xs font-mono font-bold text-gold-200 shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                        <span className="font-sans font-semibold text-gold-400/90 mr-0.5">Fiziksel:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.days) : "--"}G</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.hours) : "--"}S</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.minutes) : "--"}D</span>
                        <span className="text-gold-500/70">:</span>
                        <span>{mounted ? formatTwoDigits(timeLeft.seconds) : "--"}Sn</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key="mobile-kitap2"
                  className="animate-countdown-digit flex flex-col items-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-1 whitespace-nowrap">
                    {isOnSale ? (
                      <ThemeBadge
                        theme="kitap2"
                        status="satista"
                        className="px-2.5 py-0.5 text-[9px] whitespace-nowrap"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span>SATIŞTA</span>
                      </ThemeBadge>
                    ) : (
                      <ThemeBadge
                        theme="kitap2"
                        status="yakinda"
                        className="px-2.5 py-0.5 text-[9px] whitespace-nowrap"
                      >
                        <Clock className="w-3 h-3 text-crimson-300" />
                        <span>5 KASIM&apos;DA</span>
                      </ThemeBadge>
                    )}
                    <span className="text-[11px] font-semibold text-crimson-300">
                      Kadınlar için
                    </span>
                  </div>

                  <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-tight">
                    Çekicilik Sanatı
                  </h2>

                  {!isOnSale ? (
                    <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-0.5 rounded-md bg-crimson-950/90 border border-crimson-800/70 text-xs font-mono font-bold text-gold-300">
                      <span>
                        {mounted ? formatTwoDigits(timeLeft.days) : "--"}G
                      </span>
                      <span className="text-crimson-400">:</span>
                      <span>
                        {mounted ? formatTwoDigits(timeLeft.hours) : "--"}S
                      </span>
                      <span className="text-crimson-400">:</span>
                      <span>
                        {mounted ? formatTwoDigits(timeLeft.minutes) : "--"}D
                      </span>
                      <span className="text-crimson-400">:</span>
                      <span>
                        {mounted ? formatTwoDigits(timeLeft.seconds) : "--"}Sn
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-400 font-medium mt-1">
                      E-Kitap ve Fiziksel Kitap Şimdi Satışta
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* MOBİL SABİT ALT BAR (Yarı saydam bulanık, seçili kitaba göre tek büyük buton) */}
      {/* ===================================================================== */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${hideBar ? "translate-y-full" : "translate-y-0"} bg-matte-950/80 backdrop-blur-xl border-t border-white/10 px-4 pt-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.85)]`}
        role="region"
        aria-label="Hızlı satın alma çubuğu"
      >
        <div className="max-w-md mx-auto">
          {(sectionBook ?? (pastHero ? "kitap1" : mobileSelectedBook)) === "kitap1" ? (
            <ThemeButton
              theme="kitap1"
              variant="primary"
              size="lg"
              fullWidth
              href="#fiyat-kartlari"
              onClick={(e) =>
                scrollToTarget(e, "fiyat-kartlari", "fiyatlandirma")
              }
              className="min-h-[50px] py-3 text-sm font-black"
            >
              <span>E-Kitabı Hemen Al – 600 TL</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </ThemeButton>
          ) : !isOnSale ? (
            <ThemeButton
              theme="kitap2"
              variant="primary"
              size="lg"
              fullWidth
              href="#cekicilik-sanati"
              onClick={(e) =>
                scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
              }
              className="min-h-[50px] py-3 text-sm font-black"
            >
              <Bell className="w-4 h-4 text-gold-300 flex-shrink-0" />
              <span>Haber Al — Çekicilik Sanatı</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </ThemeButton>
          ) : (
            <ThemeButton
              theme="kitap2"
              variant="primary"
              size="lg"
              fullWidth
              href="#cekicilik-sanati"
              onClick={(e) =>
                scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
              }
              className="min-h-[50px] py-3 text-sm font-black"
            >
              <Flame className="w-4 h-4 text-white flex-shrink-0" />
              <span>Hemen Satın Al – 600 TL&apos;den başlayan</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </ThemeButton>
          )}
        </div>
      </div>
    </>
  );
}

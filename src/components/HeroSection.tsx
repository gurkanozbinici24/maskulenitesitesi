"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Bell, Clock, Flame, Sparkles, Zap } from "lucide-react";
import { ThemeBadge, ThemeButton } from "./ui/ThemeSystem";
import {
  BookCountdown,
  useCekicilikLaunchStatus,
} from "./ui/BookCountdown";

// Lazy-load react-three-fiber sahnesi (SSR kapalı, açılış hızını etkilemez)
const HeroParticlesCanvas = dynamic(() => import("./HeroParticlesCanvas"), {
  ssr: false,
});

type BookFocus = "kitap1" | "kitap2" | null;

export default function HeroSection() {
  const [activeBook, setActiveBook] = useState<BookFocus>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLElement>(null);

  const { isOnSale } = useCekicilikLaunchStatus();

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

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const normX = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const normY = (event.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5

      setStageTilt({
        x: Number((-normY * 4.5).toFixed(2)),
        y: Number((normX * 6.5).toFixed(2)),
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setStageTilt({ x: 0, y: 0 });
    setActiveBook(null);
  }, []);

  const scrollToTarget = useCallback(
    (e: React.MouseEvent<HTMLElement>, primaryId: string, fallbackId?: string) => {
      if (typeof document === "undefined") return;
      const target =
        document.getElementById(primaryId) ||
        (fallbackId ? document.getElementById(fallbackId) : null);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [prefersReducedMotion]
  );

  return (
    <section
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-matte-950 select-none"
    >
      {/* ===================================================================== */}
      {/* 1. ARKA PLAN ATMOSFERİ, IŞIK SAHNESİ VE PARTİKÜLLER                   */}
      {/* ===================================================================== */}
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

      {/* Karanlıktan yükselen sahne ışığı + seçili kitaba göre renk değişimi */}
      <div className="pointer-events-none absolute inset-0 animate-hero-light">
        {/* Sol Kitap (Kitap 1 — Altın / Çelik) Atmosfer Işığı */}
        <div
          className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full blur-[130px] transition-all duration-700 ${
            activeBook === "kitap1"
              ? "bg-gold-500/25 scale-115 opacity-100"
              : activeBook === "kitap2"
              ? "bg-steel-700/5 scale-90 opacity-25"
              : "bg-gold-500/12 opacity-80"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full blur-[140px] transition-all duration-700 ${
            activeBook === "kitap1"
              ? "bg-steel-400/20 opacity-95"
              : "bg-steel-600/10 opacity-45"
          }`}
        />

        {/* Sağ Kitap (Kitap 2 — Koyu Bordo / Zümrüt) Atmosfer Işığı */}
        <div
          className={`absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full blur-[135px] transition-all duration-700 ${
            activeBook === "kitap2"
              ? "bg-crimson-600/30 scale-115 opacity-100"
              : activeBook === "kitap1"
              ? "bg-crimson-950/10 scale-90 opacity-25"
              : "bg-crimson-800/18 opacity-85"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/3 translate-x-1/2 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full blur-[140px] transition-all duration-700 ${
            activeBook === "kitap2"
              ? "bg-emerald-500/18 opacity-95"
              : "bg-emerald-700/8 opacity-40"
          }`}
        />
      </div>

      {/* Lazy-Loaded react-three-fiber Altın Toz Parçacıkları & Hafif Duman */}
      {!prefersReducedMotion && <HeroParticlesCanvas activeBook={activeBook} />}

      {/* ===================================================================== */}
      {/* 2. ANA İÇERİK KAPSAYICISI                                             */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ------------------------------------------------------------------- */}
        {/* ÜST MERKEZ BAŞLIK ALANI                                             */}
        {/* ------------------------------------------------------------------- */}
        <div className="animate-hero-title text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matte-900/90 border border-gold-500/30 shadow-gold-glow mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-gold-300">
              GÜRKAN ÖZBİNİCİ
            </span>
          </div>

          <h1 className="font-cinzel text-fluid-hero font-black tracking-tight text-white leading-[1.08] mb-4 sm:mb-5">
            <span className="gold-text-gradient">
              İlişkilerin Gizli Kanunları
            </span>
          </h1>

          <p className="font-sans text-fluid-base sm:text-fluid-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Biri erkek için, biri kadın için. Aynı oyunun iki tarafı.{" "}
            <strong className="text-white font-semibold">
              800.000+ kişinin
            </strong>{" "}
            takip ettiği vizyon, şimdi iki kitapta.
          </p>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 3D İKİ KİTAP SAHNESİ (Masaüstünde Fare Eğimine Duyarlı)             */}
        {/* ------------------------------------------------------------------- */}
        <div
          className="hero-perspective-stage w-full transition-transform duration-300 ease-out"
          style={{
            transform: prefersReducedMotion
              ? undefined
              : `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-14 items-start justify-items-center max-w-6xl mx-auto">
            {/* =============================================================== */}
            {/* SOL KİTAP: VAZGEÇİLMEZ OLMA SANATI (KİTAP 1 TEMASI)             */}
            {/* =============================================================== */}
            <div
              onMouseEnter={() => setActiveBook("kitap1")}
              onFocus={() => setActiveBook("kitap1")}
              className="animate-hero-book-left w-full max-w-md flex flex-col items-center text-center group"
            >
              {/* Üst Rozet ve Not */}
              <div className="flex flex-col items-center gap-2 mb-5">
                <ThemeBadge theme="kitap1" status="satista" className="px-4 py-1.5">
                  <Zap className="w-3.5 h-3.5 fill-black text-black" />
                  <span>SATIŞTA</span>
                </ThemeBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-300">
                  Erkekler için ilişki psikolojisi
                </span>
              </div>

              {/* 3D Kitap Sahnesi */}
              <div className="book-3d-scene relative flex flex-col items-center py-2">
                {/* Kitap Arkası Lokal Işık Halesi */}
                <div
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-72 h-80 sm:h-96 rounded-full blur-3xl transition-all duration-500 ${
                    activeBook === "kitap1"
                      ? "bg-gold-500/35 scale-110"
                      : "bg-gold-500/15"
                  }`}
                />

                {/* CSS 3D Kitap Objesi (Ön Kapak + Sırt + Sayfa Kalınlığı + Arka Kapak) */}
                <div
                  className={`book-3d-object book-3d-object-left w-[220px] sm:w-[255px] md:w-[275px] cursor-pointer ${
                    activeBook === "kitap1"
                      ? "book-3d-object-focused"
                      : activeBook === "kitap2"
                      ? "book-3d-object-dimmed-left"
                      : ""
                  }`}
                >
                  {/* Sol Kitap Sırtı (Spine) */}
                  <div className="book-3d-spine bg-gradient-to-b from-steel-900 via-matte-950 to-steel-950 border-y border-l border-gold-500/40 flex flex-col items-center justify-between py-4 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400/70" />
                    <span
                      className="font-cinzel text-[9px] font-bold tracking-[0.22em] text-gold-400/90 uppercase whitespace-nowrap"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      VAZGEÇİLMEZ OLMA SANATI
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400/70" />
                  </div>

                  {/* Sağ Beyazımsı Sayfa Kalınlığı */}
                  <div className="book-3d-pages" />
                  {/* Üst ve Alt Sayfa Kenarları */}
                  <div className="book-3d-top" />
                  <div className="book-3d-bottom" />
                  {/* Arka Kapak */}
                  <div className="book-3d-back border border-gold-500/20" />

                  {/* Ön Kapak */}
                  <div className="book-3d-front rounded-r-xl rounded-l-[3px] overflow-hidden border border-gold-500/45 shadow-[0_25px_55px_-12px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.22)] bg-matte-900">
                    {/* Cilt oluğu izi (Sol kenar gerçekçi kapak kıvrımı) */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/65 via-white/10 to-transparent z-10" />
                    <Image
                      src="/kapak.jpg"
                      alt="Vazgeçilmez Olma Sanatı - Gürkan Özbinici"
                      width={400}
                      height={600}
                      priority
                      sizes="(max-width: 640px) 220px, (max-width: 768px) 255px, 275px"
                      className="w-full h-auto object-cover block"
                    />
                    {/* Lüks Işık Yansıması */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15" />
                  </div>
                </div>

                {/* Zemine Yansıyan Yumuşak Işık ve Gölge */}
                <div
                  className={`pointer-events-none mt-6 h-5 w-48 sm:w-56 rounded-full blur-xl transition-all duration-500 ${
                    activeBook === "kitap1"
                      ? "bg-gold-500/45 scale-110"
                      : "bg-gold-500/25"
                  }`}
                />
                <div className="pointer-events-none -mt-3 h-3 w-40 sm:w-48 rounded-full bg-black/90 blur-md" />
              </div>

              {/* Kitap Başlığı ve Satın Alma Aksiyonu */}
              <div className="w-full mt-5 pt-4 border-t border-steel-800/80 flex flex-col items-center">
                <h2 className="font-cinzel text-fluid-xl font-bold text-white tracking-wide mb-1">
                  Vazgeçilmez Olma Sanatı
                </h2>
                <p className="text-xs text-zinc-400 mb-4">
                  227 Sayfa • Kuralları Sen Koy, İlişkiyi Sen Yönet
                </p>

                <ThemeButton
                  theme="kitap1"
                  variant="primary"
                  size="lg"
                  fullWidth
                  href="#fiyat-kartlari"
                  onClick={(e) =>
                    scrollToTarget(e, "fiyat-kartlari", "fiyatlandirma")
                  }
                  className="max-w-sm"
                >
                  <span>E-Kitabı Hemen Al – 600 TL</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </ThemeButton>
              </div>
            </div>

            {/* =============================================================== */}
            {/* SAĞ KİTAP: ÇEKİCİLİK SANATI (KİTAP 2 TEMASI)                    */}
            {/* =============================================================== */}
            <div
              onMouseEnter={() => setActiveBook("kitap2")}
              onFocus={() => setActiveBook("kitap2")}
              className="animate-hero-book-right w-full max-w-md flex flex-col items-center text-center group"
            >
              {/* Üst Rozet (useCekicilikLaunchStatus'a göre otomatik değişir) ve Not */}
              <div className="flex flex-col items-center gap-2 mb-5">
                {isOnSale ? (
                  <ThemeBadge theme="kitap2" status="satista" className="px-4 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>SATIŞTA</span>
                  </ThemeBadge>
                ) : (
                  <ThemeBadge theme="kitap2" status="yakinda" className="px-4 py-1.5">
                    <Clock className="w-3.5 h-3.5 text-crimson-300" />
                    <span>5 KASIM&apos;DA GELİYOR</span>
                  </ThemeBadge>
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-300">
                  Kadınlar için ilişki psikolojisi
                </span>
              </div>

              {/* 3D Kitap Sahnesi */}
              <div className="book-3d-scene relative flex flex-col items-center py-2">
                {/* Kitap Arkası Lokal Işık Halesi */}
                <div
                  className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-72 h-80 sm:h-96 rounded-full blur-3xl transition-all duration-500 ${
                    activeBook === "kitap2"
                      ? "bg-crimson-600/40 scale-110"
                      : "bg-crimson-800/20"
                  }`}
                />

                {/* CSS 3D Kitap Objesi (Ön Kapak + Sırt + Sayfa Kalınlığı + Arka Kapak) */}
                <div
                  className={`book-3d-object book-3d-object-right w-[220px] sm:w-[255px] md:w-[275px] cursor-pointer ${
                    activeBook === "kitap2"
                      ? "book-3d-object-focused"
                      : activeBook === "kitap1"
                      ? "book-3d-object-dimmed-right"
                      : ""
                  }`}
                >
                  {/* Sol Kitap Sırtı (Spine) */}
                  <div className="book-3d-spine bg-gradient-to-b from-crimson-950 via-matte-950 to-crimson-950 border-y border-l border-crimson-600/45 flex flex-col items-center justify-between py-4 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                    <span
                      className="font-cinzel text-[9px] font-bold tracking-[0.22em] text-gold-300/90 uppercase whitespace-nowrap"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      ÇEKİCİLİK SANATI
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                  </div>

                  {/* Sağ Beyazımsı Sayfa Kalınlığı */}
                  <div className="book-3d-pages" />
                  {/* Üst ve Alt Sayfa Kenarları */}
                  <div className="book-3d-top" />
                  <div className="book-3d-bottom" />
                  {/* Arka Kapak */}
                  <div className="book-3d-back border border-crimson-800/30" />

                  {/* Ön Kapak */}
                  <div className="book-3d-front rounded-r-xl rounded-l-[3px] overflow-hidden border border-crimson-700/55 shadow-[0_25px_55px_-12px_rgba(0,0,0,0.95),0_0_32px_rgba(185,28,28,0.28)] bg-matte-900">
                    {/* Cilt oluğu izi (Sol kenar gerçekçi kapak kıvrımı) */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/65 via-white/10 to-transparent z-10" />
                    <Image
                      src="/cekicilik-sanati-kapak.jpg"
                      alt="Çekicilik Sanatı - Gürkan Özbinici"
                      width={400}
                      height={600}
                      priority
                      sizes="(max-width: 640px) 220px, (max-width: 768px) 255px, 275px"
                      className="w-full h-auto object-cover block"
                    />
                    {/* Lüks Işık Yansıması */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15" />
                  </div>
                </div>

                {/* Zemine Yansıyan Yumuşak Işık ve Gölge */}
                <div
                  className={`pointer-events-none mt-6 h-5 w-48 sm:w-56 rounded-full blur-xl transition-all duration-500 ${
                    activeBook === "kitap2"
                      ? "bg-crimson-600/50 scale-110"
                      : "bg-crimson-700/25"
                  }`}
                />
                <div className="pointer-events-none -mt-3 h-3 w-40 sm:w-48 rounded-full bg-black/90 blur-md" />
              </div>

              {/* Kitap Başlığı, Küçük Geri Sayım ve Aksiyon Butonu */}
              <div className="w-full mt-5 pt-4 border-t border-crimson-950/90 flex flex-col items-center">
                <h2 className="font-cinzel text-fluid-xl font-bold text-white tracking-wide mb-2">
                  Çekicilik Sanatı
                </h2>

                {!isOnSale ? (
                  <>
                    {/* Satış Öncesi: Küçük Geri Sayım + Haber Al Butonu */}
                    <div className="w-full max-w-sm mb-3.5">
                      <BookCountdown
                        size="sm"
                        showStatusBadge={false}
                        showActionArea={false}
                      />
                    </div>

                    <ThemeButton
                      theme="kitap2"
                      variant="primary"
                      size="lg"
                      fullWidth
                      href="#cekicilik-sanati"
                      onClick={(e) =>
                        scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
                      }
                      className="max-w-sm"
                    >
                      <Bell className="w-4 h-4 text-gold-300 flex-shrink-0" />
                      <span>Haber Al</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </ThemeButton>
                  </>
                ) : (
                  <>
                    {/* Satış Başlayınca: Hemen Satın Al Butonu */}
                    <p className="text-xs text-emerald-400 font-semibold mb-4">
                      E-Kitap ve Fiziksel Kitap Seçenekleriyle Şimdi Satışta
                    </p>

                    <ThemeButton
                      theme="kitap2"
                      variant="primary"
                      size="lg"
                      fullWidth
                      href="#cekicilik-sanati"
                      onClick={(e) =>
                        scrollToTarget(e, "cekicilik-sanati", "fiyat-kartlari")
                      }
                      className="max-w-sm"
                    >
                      <Flame className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      <span>Hemen Satın Al – 600 TL&apos;den başlayan</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </ThemeButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeButton } from "./ui/ThemeSystem";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOnSale } = useCekicilikLaunchStatus();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full max-w-full overflow-x-clip">
      {/* 1. Lüks VIP Duyuru Çubuğu (Tek satıra sığan kompakt şerit) */}
      <a
        href="#fiyat-kartlari"
        className="w-full h-7 sm:h-8 bg-matte-950 border-b border-gold-500/40 px-2.5 sm:px-4 text-center select-none flex items-center justify-center gap-1.5 overflow-hidden shadow-[0_2px_18px_rgba(212,175,55,0.18)] hover:bg-mahogany-950 active:bg-mahogany-900 transition-colors cursor-pointer"
      >
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gold-500"></span>
        </span>
        <span className="text-gold-300 font-extrabold text-[10px] sm:text-xs tracking-[0.08em] sm:tracking-[0.14em] uppercase whitespace-nowrap truncate">
          {isOnSale
            ? "YENİLENMİŞ EDİSYON VE YENİ KİTAP: ŞİMDİ SATIŞTA"
            : "YENİLENMİŞ EDİSYON VE YENİ KİTAP: 5 KASIM'DA"}
        </span>
      </a>

      {/* 2. Ana Navbar Başlığı */}
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-matte-950/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-2"
            : "bg-matte-950/85 backdrop-blur-sm py-2.5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Sol: Küçük Logo ve GÜRKAN ÖZBİNİCİ */}
            <a
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none min-w-0"
            >
              <Image
                src="/aslan-logo.png"
                alt="Gürkan Özbinici aslan logosu"
                width={486}
                height={664}
                priority
                className="h-9 sm:h-10 w-auto flex-shrink-0 drop-shadow-[0_0_8px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-cinzel font-bold tracking-[0.14em] sm:tracking-[0.18em] text-xs sm:text-sm md:text-base text-zinc-100 uppercase group-hover:text-gold-300 transition-colors truncate">
                GÜRKAN ÖZBİNİCİ
              </span>
            </a>

            {/* Desktop Nav Items & Kompakt Satın Alma Butonu */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 ml-auto flex-shrink-0">
              <a
                href="/#vazgecilmez"
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-gold-300 active:text-gold-200 transition-colors whitespace-nowrap"
              >
                Vazgeçilmez Olma Sanatı
              </a>

              <a
                href="/#cekicilik-sanati"
                className="text-xs lg:text-sm font-semibold text-crimson-300 hover:text-crimson-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                Çekicilik Sanatı
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-crimson-700 text-white">YAKINDA</span>
              </a>

              <a
                href="/#sosyal-kanit"
                className="hidden text-xs lg:text-sm font-medium text-zinc-300 hover:text-gold-300 active:text-gold-200 transition-colors whitespace-nowrap"
              >
                Topluluk & Güven
              </a>

              <a
                href="/danismanlik"
                className="text-xs lg:text-sm font-semibold text-gold-300 hover:text-gold-200 active:text-gold-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Özel Danışmanlık</span>
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-inner">
                  VIP
                </span>
              </a>

              <ThemeButton
                theme="kitap1"
                variant="primary"
                size="sm"
                href="/#fiyat-kartlari"
                className="rounded-lg whitespace-nowrap font-black"
              >
                <span>E-KİTABI HEMEN OKU (600 TL)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </ThemeButton>
            </nav>

            {/* Sağ: Mobile Menu Button (Asla ekrandan taşmaz) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-matte-850 border border-zinc-800 text-zinc-300 hover:text-white active:scale-95 transition-all"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-matte-900/95 border-b border-zinc-800 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1.5">
            <a
              href="/#vazgecilmez"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-zinc-200 hover:text-gold-400 active:text-gold-300 hover:bg-zinc-800/40 rounded-md"
            >
              Vazgeçilmez Olma Sanatı
            </a>
            <a
              href="/#cekicilik-sanati"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center gap-2 px-3 py-2 text-sm font-semibold text-crimson-300 hover:bg-zinc-800/40 rounded-md"
            >
              Çekicilik Sanatı
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-crimson-700 text-white">YAKINDA</span>
            </a>

            <a
              href="/#sosyal-kanit"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 text-sm font-semibold text-zinc-200 hover:text-gold-400 active:text-gold-300 hover:bg-zinc-800/40 rounded-md"
            >
              Topluluk & Güven
            </a>
            <a
              href="/danismanlik"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center justify-between px-3 py-2 text-sm font-bold text-gold-300 hover:bg-zinc-800/40 rounded-md"
            >
              <span>Özel Danışmanlık</span>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40">
                VIP
              </span>
            </a>

            <div className="pt-2">
              <ThemeButton
                theme="kitap1"
                variant="primary"
                size="md"
                fullWidth
                href="/#fiyat-kartlari"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg font-black"
              >
                <span>E-KİTABI HEMEN OKU (600 TL)</span>
                <ArrowUpRight className="w-4 h-4" />
              </ThemeButton>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

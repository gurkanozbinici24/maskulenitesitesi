"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, BookOpen } from "lucide-react";
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
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Lüks VIP Duyuru Çubuğu (Yenilenmiş Edisyon ve Yeni Kitap Duyurusu) */}
      <a
        href="#fiyat-kartlari"
        className="w-full bg-matte-950 border-b border-gold-500/45 py-2.5 px-3 sm:px-4 text-center select-none flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 shadow-[0_4px_25px_rgba(212,175,55,0.2)] hover:bg-mahogany-950 active:bg-mahogany-900 transition-colors cursor-pointer group"
      >
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
        </span>
        <span className="text-gold-300 font-black text-[11px] sm:text-[13px] tracking-[0.12em] uppercase px-3 py-0.5 rounded-md bg-mahogany-900/90 border border-gold-500/50 shadow-gold-glow">
          {isOnSale
            ? "YENİLENMİŞ EDİSYON VE YENİ KİTAP: ŞİMDİ SATIŞTA"
            : "YENİLENMİŞ EDİSYON VE YENİ KİTAP: 5 KASIM'DA"}
        </span>
      </a>

      {/* 2. Ana Navbar Başlığı */}
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-matte-950/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3"
            : "bg-matte-950/80 backdrop-blur-sm py-4 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 lg:gap-12">
            
            {/* Logo - Vazgeçilmez Olma Sanatı */}
            <a
              href="/"
              className="flex items-center gap-3 group focus:outline-none flex-shrink-0 mr-6 sm:mr-8 lg:mr-12"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-950 border border-gold-500/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold-400 transition-colors flex-shrink-0">
                <BookOpen className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-zinc-100 uppercase group-hover:text-gold-300 transition-colors whitespace-nowrap">
                Vazgeçilmez Olma Sanatı
              </span>
            </a>

            {/* Desktop Nav Items & Kompakt Satın Alma Butonu */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto flex-shrink-0">
              <a
                href="/#kazanimlar"
                className="text-sm font-medium text-zinc-400 hover:text-gold-300 active:text-gold-200 transition-colors whitespace-nowrap"
              >
                Neler Kazanacaksın?
              </a>
              
              <a
                href="/#sosyal-kanit"
                className="text-sm font-medium text-zinc-400 hover:text-gold-300 active:text-gold-200 transition-colors whitespace-nowrap"
              >
                Topluluk & Güven
              </a>

              <a
                href="/danismanlik"
                className="text-sm font-semibold text-gold-300 hover:text-gold-200 active:text-gold-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Özel Danışmanlık</span>
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-inner">
                  VIP
                </span>
              </a>

              {/* Dikeyde Kusursuz Ortalanmış Kompakt Satın Alma Butonu */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[48px] min-w-[48px] flex items-center justify-center p-2 rounded-lg bg-matte-850 border border-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-matte-900/95 border-b border-zinc-800 backdrop-blur-xl px-4 pt-4 pb-6 space-y-2">
            <a
              href="/#kazanimlar"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center px-3 py-2 text-base font-semibold text-zinc-300 hover:text-gold-400 active:text-gold-300 hover:bg-zinc-800/40 active:bg-zinc-800/60 rounded-md"
            >
              Neler Kazanacaksın?
            </a>
            <a
              href="/#sosyal-kanit"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center px-3 py-2 text-base font-semibold text-zinc-300 hover:text-gold-400 active:text-gold-300 hover:bg-zinc-800/40 active:bg-zinc-800/60 rounded-md"
            >
              Topluluk & Güven
            </a>
            <a
              href="/danismanlik"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between px-3 py-2 text-base font-bold text-gold-300 hover:bg-zinc-800/40 active:bg-zinc-800/60 rounded-md"
            >
              <span>Özel Danışmanlık</span>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40">
                VIP
              </span>
            </a>

            {/* Mobilde Sade & Kompakt Buton */}
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


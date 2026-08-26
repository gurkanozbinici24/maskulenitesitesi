"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-matte-950/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Vazgeçilmez Olma Sanatı */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-950 border border-gold-500/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold-400 transition-colors">
              <BookOpen className="w-5 h-5 text-gold-400" />
            </div>
            <span className="font-extrabold tracking-wider text-base sm:text-lg text-zinc-100 uppercase group-hover:text-gold-300 transition-colors">
              Vazgeçilmez Olma Sanatı
            </span>
          </a>

          {/* Desktop Nav Items & Tek Satın Alma Buton Bloğu */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#kazanimlar"
              className="text-sm font-medium text-zinc-400 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              Neler Kazanacaksın?
            </a>
            
            <a
              href="#sosyal-kanit"
              className="text-sm font-medium text-zinc-400 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              Topluluk & Güven
            </a>

            <a
              href="#danismanlik"
              className="text-sm font-semibold text-gold-300 hover:text-gold-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Özel Danışmanlık</span>
              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-inner">
                VIP
              </span>
            </a>

            {/* 'Özel Danışmanlık VIP' Linkinin Hemen Sağındaki Tek ve Vurucu Satın Alma Bloğu */}
            <div className="flex flex-col items-center justify-center pl-2">
              <span
                className="text-[10px] font-black tracking-wider text-[#FFD700] uppercase mb-1 select-none whitespace-nowrap"
                style={{
                  textShadow: "0 0 10px #FFD700, 0 0 22px #E5A93C",
                }}
              >
                ⚡ SINIRLI SAYIDA (SADECE 200 İMZALI KOPYA)
              </span>
              <a
                href="#fiyat-kartlari"
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-lg shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                <span>KİTABI SATIN AL</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-matte-850 border border-zinc-800 text-zinc-400 hover:text-white"
            aria-label="Menüyü Aç/Kapat"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-matte-900/95 border-b border-zinc-800 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4">
          <a
            href="#kazanimlar"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-zinc-300 hover:text-gold-400 hover:bg-zinc-800/40 rounded-md"
          >
            Neler Kazanacaksın?
          </a>
          <a
            href="#sosyal-kanit"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-zinc-300 hover:text-gold-400 hover:bg-zinc-800/40 rounded-md"
          >
            Topluluk & Güven
          </a>
          <a
            href="#danismanlik"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-bold text-gold-300 hover:bg-zinc-800/40 rounded-md"
          >
            <span>Özel Danışmanlık</span>
            <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-gold-500/20 text-gold-300 border border-gold-500/40">
              VIP
            </span>
          </a>

          {/* Mobilde Tek ve Dikkat Çekici Buton Bloğu */}
          <div className="pt-3 flex flex-col items-center">
            <span
              className="text-[11px] font-black tracking-wider text-[#FFD700] uppercase mb-1.5 text-center"
              style={{
                textShadow: "0 0 10px #FFD700, 0 0 20px #E5A93C",
              }}
            >
              ⚡ SINIRLI SAYIDA (SADECE 200 İMZALI KOPYA)
            </span>
            <a
              href="#fiyat-kartlari"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-lg shadow-gold-glow"
            >
              KİTABI SATIN AL
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

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
          ? "bg-matte-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Sadece Kitabın Adı: Vazgeçilmez Ol */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-950 border border-gold-500/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold-400 transition-colors">
              <BookOpen className="w-5 h-5 text-gold-400" />
            </div>
            <span className="font-extrabold tracking-wider text-base sm:text-lg text-zinc-100 uppercase group-hover:text-gold-300 transition-colors">
              Vazgeçilmez Olma Sanatı
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#kazanimlar"
              className="text-sm font-medium text-zinc-400 hover:text-gold-300 transition-colors"
            >
              Neler Kazanacaksın?
            </a>
            <a
              href="#sosyal-kanit"
              className="text-sm font-medium text-zinc-400 hover:text-gold-300 transition-colors"
            >
              Topluluk & Güven
            </a>
            <a
              href="#fiyatlandirma"
              className="text-sm font-medium text-zinc-400 hover:text-gold-300 transition-colors"
            >
              Satın Al
            </a>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#fiyatlandirma"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-lg shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <span>Hemen Sipariş Ver</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>

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
            href="#fiyatlandirma"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-zinc-300 hover:text-gold-400 hover:bg-zinc-800/40 rounded-md"
          >
            Satın Alma Seçenekleri
          </a>
          <div className="pt-2">
            <a
              href="#fiyatlandirma"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-black bg-gold-400 hover:bg-gold-300 rounded-lg shadow-gold-glow"
            >
              Hemen Sipariş Ver
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

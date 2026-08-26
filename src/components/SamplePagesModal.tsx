"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  FileText,
  Lock,
} from "lucide-react";

interface SamplePagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const samplePages = [
  {
    id: 0,
    title: "Bu Kitabı Okumadan Önce",
    badge: "Bölüm Girişi",
    imageSrc: "/sayfa1.png",
    description: "İlişkilerde vazgeçilmez bir adam olmanın tavizsiz temelleri.",
    hasBlur: false,
    blurTop: "top-[54.5%]",
  },
  {
    id: 1,
    title: "Bu Kitabı Okuduktan Sonra",
    badge: "Dönüşüm Rehberi",
    imageSrc: "/sayfa2.png",
    description: "Sarsılmaz duruş, seçilen değil seçen adam olma vizyonu.",
    hasBlur: true,
    // 'Eğer şu an hayatında kimse yoksa; çok şanslısın...' cümlesinin bittiği noktanın tam altı
    blurTop: "top-[54.5%]",
  },
  {
    id: 2,
    title: "İlk Giriş",
    badge: "Bölüm I",
    imageSrc: "/sayfa3.png",
    description: "İyi Çocuk Masalının Sonu ve Zihniyet İnşası.",
    hasBlur: true,
    blurTop: "top-[52%]",
  },
];

export default function SamplePagesModal({
  isOpen,
  onClose,
}: SamplePagesModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "all">("single");

  // ESC ile kapatma ve scroll engelleme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && viewMode === "single") {
        setActiveIndex((prev) => (prev < samplePages.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft" && viewMode === "single") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : samplePages.length - 1));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, viewMode]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl bg-matte-900 border border-gold-500/40 shadow-[0_0_60px_-10px_rgba(212,175,55,0.3)] p-4 sm:p-6 md:p-8 text-left flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-start justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                    Kitaptan Örnek Kesitler
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> Önizleme
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Vazgeçilmez Olma Sanatı kitabından doğrudan sayfalar.
                </p>
              </div>
            </div>

            {/* Kapat Butonu */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-matte-850 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation & View Mode Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            {/* Sayfa Seçim Sekmeleri */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-matte-950 border border-zinc-800">
              {samplePages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setViewMode("single");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    viewMode === "single" && activeIndex === index
                      ? "bg-gradient-to-r from-gold-400 to-gold-600 text-black shadow-gold-glow"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="opacity-70">{index + 1}.</span>
                  <span>{page.title}</span>
                  {page.hasBlur && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        viewMode === "single" && activeIndex === index
                          ? "bg-black/30 text-black"
                          : "bg-gold-500/20 text-gold-400"
                      }`}
                    >
                      Kilitli
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Görünüm Modu Değiştirici */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-matte-950 border border-zinc-800">
              <button
                onClick={() => setViewMode("single")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                  viewMode === "single"
                    ? "bg-zinc-800 text-gold-400"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Tek Sayfa Okuma Modu"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Tek Sayfa</span>
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                  viewMode === "all"
                    ? "bg-zinc-800 text-gold-400"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Tüm Sayfaları Listele"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Tüm Sayfalar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="my-2">
          {viewMode === "single" ? (
            /* Tek Sayfa Okuma Modu (Maksimum Netlik) */
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/40 bg-black">
                <Image
                  src={samplePages[activeIndex].imageSrc}
                  alt={samplePages[activeIndex].title}
                  width={700}
                  height={1050}
                  priority
                  className="w-full h-auto object-contain block"
                />

                {/* BUĞULU (BLUR) ALAN & CTA OVERLAY */}
                {samplePages[activeIndex].hasBlur && (
                  <div
                    className={`absolute inset-x-0 ${
                      samplePages[activeIndex].blurTop || "top-[54.5%]"
                    } bottom-0 bg-gradient-to-b from-black/60 via-matte-950/95 to-matte-950 backdrop-blur-[8px] flex flex-col items-center justify-between p-4 sm:p-6 text-center rounded-b-2xl border-t border-gold-500/40 z-20`}
                  >
                    {/* Üst İnce Altın Çizgi */}
                    <div className="w-full flex items-center justify-center -mt-2 mb-2">
                      <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                    </div>

                    <div className="flex flex-col items-center my-auto">
                      {/* Kilit Rozeti */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-inner">
                        <Lock className="w-3.5 h-3.5 text-gold-400" />
                        <span>Bu Bölümün Devamı ve Tüm Kitap Kilitli</span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-200 font-medium mb-3.5 max-w-md leading-snug">
                        Bu kritik bölümün devamını ve ilişkinin tüm kurallarını eksiksiz okumak için kitabı hemen indirin.
                      </p>

                      {/* VURUCU CTA BUTONU */}
                      <a
                        href="#fiyat-kartlari"
                        onClick={onClose}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200"
                      >
                        <span>KONTROLÜ ELE AL – KİTABI İNDİR ➔</span>
                      </a>
                    </div>

                    <div className="text-[10px] text-zinc-500 font-mono">
                      256-Bit SSL • Anında Teslimat
                    </div>
                  </div>
                )}

                {/* Sayfa Değiştirme Sol Buton */}
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev > 0 ? prev - 1 : samplePages.length - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-gold-400 transition-all shadow-lg backdrop-blur-sm z-30"
                  aria-label="Önceki Sayfa"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Sayfa Değiştirme Sağ Buton */}
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev < samplePages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-gold-400 transition-all shadow-lg backdrop-blur-sm z-30"
                  aria-label="Sonraki Sayfa"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Sayfa Başlığı ve Açıklaması */}
              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-zinc-200">
                  {samplePages[activeIndex].title}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {samplePages[activeIndex].description}
                </div>
                <div className="text-[11px] font-mono text-gold-400/80 mt-1 font-semibold">
                  Sayfa {activeIndex + 1} / {samplePages.length}
                </div>
              </div>
            </div>
          ) : (
            /* Tüm Sayfalar Modu (3'lü Akış) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {samplePages.map((page, index) => (
                <div
                  key={page.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setViewMode("single");
                  }}
                  className="group relative flex flex-col rounded-2xl bg-black border border-zinc-800 hover:border-gold-400 overflow-hidden shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full aspect-[2/3] bg-black">
                    <Image
                      src={page.imageSrc}
                      alt={page.title}
                      width={400}
                      height={600}
                      className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 block"
                    />

                    {/* Kilitli Kartlar için Önizleme Göstergesi */}
                    {page.hasBlur && (
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-[4px] flex flex-col items-center justify-end p-3 text-center">
                        <div className="p-1.5 rounded-full bg-gold-500 text-black mb-1">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-gold-300 uppercase">
                          Kilitli Önizleme
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-matte-950 border-t border-zinc-800 flex items-center justify-between">
                    <div className="text-xs font-bold text-zinc-200 group-hover:text-gold-300 transition-colors">
                      {index + 1}. {page.title}
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                      BÜYÜT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            Kitabın tamamına erişmek ve tüm bölümleri okumak için hemen sipariş verin.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-matte-850 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors"
            >
              Kapat
            </button>
            <a
              href="#fiyat-kartlari"
              onClick={onClose}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black text-xs font-black uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200"
            >
              <span>Satın Al</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

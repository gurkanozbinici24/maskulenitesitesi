"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  X,
  ArrowRight,
  Flame,
} from "lucide-react";

const testimonials = [
  { id: 1, src: "/m1.jpg", title: "Danışan Dönüşümü #1", tag: "Kriz Çözümü" },
  { id: 2, src: "/m2.jpg", title: "Danışan Dönüşümü #2", tag: "Çerçeve Kontrolü" },
  { id: 3, src: "/m3.jpg", title: "Danışan Dönüşümü #3", tag: "Güç Dengesi" },
  { id: 4, src: "/m4.jpg", title: "Danışan Dönüşümü #4", tag: "Tavizsiz Duruş" },
  { id: 5, src: "/m5.jpg", title: "Danışan Dönüşümü #5", tag: "Saygı İnşası" },
  { id: 6, src: "/m6.jpg", title: "Danışan Dönüşümü #6", tag: "İlişki Yönetimi" },
  { id: 7, src: "/m7.jpg", title: "Danışan Dönüşümü #7", tag: "Stratejik Hamle" },
  { id: 8, src: "/m8.jpg", title: "Danışan Dönüşümü #8", tag: "Mutlak Hakimiyet" },
];

export default function TestimonialsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll durumunu kontrol et
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = sliderRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  // Slider buton kaydırmaları
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = 320; // Ortalama kart genişliği
      const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // ESC ile Lightbox kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section
      id="danisan-yorumlari"
      className="py-24 relative overflow-hidden bg-matte-950 border-t border-zinc-900 scroll-mt-24"
    >
      {/* Arka Plan Işık Hüzmeleri */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gold-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık Grubu */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matte-850 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-inner">
              <Flame className="w-3.5 h-3.5 text-gold-400" />
              <span>KANITLANMIŞ ETKİ & GERÇEK DÖNÜŞÜMLER</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              Sarsılmaz Sonuçlar & <span className="gold-text-gradient">Danışan Yorumları</span>
            </h2>
            
            <p className="mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Birebir strateji seanslarımızda durumunu baştan inşa eden, karşı tarafın ucuz manipülasyonlarını 
              çöpe atıp saygıyı ve kontrolü geri kazanan erkeklerin gerçek mesajları.
            </p>
          </div>

          {/* Slider Gezinme Okları */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                canScrollLeft
                  ? "bg-matte-850 hover:bg-zinc-800 border-gold-500/40 text-gold-300 hover:text-white shadow-md active:scale-95"
                  : "bg-matte-900/60 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50"
              }`}
              aria-label="Önceki Yorumlar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                canScrollRight
                  ? "bg-matte-850 hover:bg-zinc-800 border-gold-500/40 text-gold-300 hover:text-white shadow-md active:scale-95"
                  : "bg-matte-900/60 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50"
              }`}
              aria-label="Sonraki Yorumlar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Kaydırılabilir Kartlar (Carousel Track) */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 no-scrollbar cursor-grab active:cursor-grabbing select-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.src)}
              className="group relative flex-shrink-0 w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl sm:rounded-3xl bg-matte-900/90 border border-gold-500/30 hover:border-gold-400 p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.12)] hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Kart Başlığı & Rozeti */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-mono font-bold">
                    #{index + 1}
                  </div>
                  <span className="text-xs font-bold text-zinc-200 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {item.tag}
                </span>
              </div>

              {/* Ekran Görüntüsü Kapsayıcısı (Siyah temaya gömülü, şık çerçeveli) */}
              <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black border border-zinc-800/80 group-hover:border-gold-500/40 transition-colors">
                <Image
                  src={item.src}
                  alt={`Danışan Yorumu ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 270px, 330px"
                  className="object-contain w-full h-full group-hover:scale-[1.02] transition-transform duration-300 block"
                />
                
                {/* Karartma ve Lüks Büyütme Hover Katmanı */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-matte-900/90 border border-gold-500/60 text-gold-300 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Büyüt ve Oku</span>
                  </div>
                </div>
              </div>

              {/* Alt Bilgi */}
              <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 px-1 font-mono">
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Doğrulanmış Seans</span>
                </div>
                <span className="text-zinc-500 uppercase tracking-wider">Gizli Danışan</span>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Dönüşüm ve Harekete Geçirici CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-matte-900 via-matte-850 to-matte-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0 hidden sm:flex">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Kendi Hikayeni Yeniden Yazmaya Hazır mısın?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Aynı hataları tekrarlayarak farklı bir sonuç alamazsın. Durumu kontrol altına almanın tam zamanı.
              </p>
            </div>
          </div>

          <a
            href="http://www.sopsy.com/d/F0AuRX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
          >
            <span>Hemen Seans Al</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal (Tıklanan Görseli Tam Ekran Okuma) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[92vh] rounded-3xl bg-matte-950 border-2 border-gold-500/50 shadow-[0_0_60px_rgba(212,175,55,0.3)] p-3 sm:p-4 overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Kapat Butonu */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-gold-400 transition-colors shadow-lg"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Tam Görsel */}
            <div className="relative w-full h-[78vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Büyük Danışan Geri Bildirimi"
                fill
                priority
                className="object-contain w-full h-full block"
              />
            </div>

            <div className="w-full pt-3 flex items-center justify-between text-xs text-zinc-400 px-2">
              <span className="font-mono text-gold-400">Danışan Geri Bildirimi • %100 Gizli</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="font-bold text-zinc-300 hover:text-gold-400 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Zap,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Package,
  BookOpen,
  Lock,
  Clock,
  MessageCircle,
  Flame,
  Mail,
} from "lucide-react";

export default function PricingSection() {
  const [hasRequested, setHasRequested] = useState(false);
  const [demandCount, setDemandCount] = useState(11);

  useEffect(() => {
    let requested = false;
    try {
      requested = localStorage.getItem("vazgecilmez_demand_requested") === "true";
    } catch {
      // Ignore storage errors
    }
    setHasRequested(requested);

    // 18 Eylül 2026 başlangıç referans noktası
    const BASE_COUNT = 11;
    const START_TIMESTAMP = new Date("2026-09-18T00:00:00Z").getTime();
    const now = Date.now();
    const elapsedMs = Math.max(0, now - START_TIMESTAMP);
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    const timeIncrement = Math.floor(elapsedHours / 8); // Her 8 saatte +1 artış

    setDemandCount(BASE_COUNT + timeIncrement + (requested ? 1 : 0));
  }, []);

  const handleDemandClick = () => {
    if (!hasRequested) {
      setHasRequested(true);
      setDemandCount((prev) => prev + 1);
      try {
        localStorage.setItem("vazgecilmez_demand_requested", "true");
      } catch {
        // Ignore storage errors
      }
    }
  };
  return (
    <section id="fiyatlandirma" className="py-20 sm:py-24 relative overflow-hidden bg-matte-950">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Package className="w-3.5 h-3.5 text-gold-400" />
            <span>KÜTÜPHANENİ DONAT</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            VAZGEÇİLMEZ OLMAYA <span className="gold-text-gradient">İLK ADIMI AT</span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            1. Baskı Özel Koleksiyon Serimiz tamamen tükenmiştir. Gösterdiğiniz yoğun ilgiye teşekkür ederiz. Kuralları koyan taraf olmak ve taktikleri hemen uygulamaya başlamak için e-kitap sürümüne anında erişebilirsiniz.
          </p>
        </div>

        {/* 2-Card Side-by-Side Pricing Grid */}
        <div
          id="fiyat-kartlari"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch scroll-mt-24"
        >
          
          {/* ========================================================================= */}
          {/* SOL KART (AKTİF / YILDIZ ÜRÜN): E-KİTAP PAKETİ (GOLD GLOW ÖNE ÇIKAN KART) */}
          {/* ========================================================================= */}
          <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-9 rounded-3xl bg-gradient-to-b from-matte-850 via-matte-900 to-matte-950 border-2 border-gold-500 shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300">
            
            {/* ANINDA TESLİMAT BADGE */}
            <div className="absolute -top-3.5 left-6 sm:left-8 z-20">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-black text-xs font-black uppercase tracking-wider shadow-gold-glow border border-yellow-200/50">
                <Zap className="w-3.5 h-3.5 fill-black text-black" />
                <span>ANINDA TESLİMAT</span>
              </div>
            </div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gold-400 font-mono">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>DİJİTAL SÜRÜM</span>
                </div>
                <div className="p-2 rounded-lg bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span className="gold-text-gradient">E-Kitap Paketi</span>
              </h3>
              
              <p className="text-sm text-zinc-300 mt-2 mb-6 leading-relaxed">
                Kargo bekleme veya adres girme süreçleriyle vakit kaybetmeyin. Ödemenizin ardından e-kitabınız (dijital formatta) doğrudan e-posta adresinize gönderilir. Telefon, tablet veya bilgisayarınızdan saniyeler içinde okumaya başlayın.
              </p>

              {/* Price Tag */}
              <div className="py-4 my-4 border-y border-gold-500/30 flex items-baseline gap-2 bg-gold-500/5 -mx-6 sm:-mx-8 lg:-mx-9 px-6 sm:px-8 lg:px-9">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  600
                </span>
                <span className="text-xl font-bold text-gold-400 font-mono">TL</span>
                <span className="text-xs text-zinc-400 font-medium ml-2">/ Tek Seferlik Ödeme</span>
              </div>

              {/* Feature List */}
              <div className="space-y-3.5 my-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-200">
                    <strong>Tam Metin</strong> (Tüm bölümler ve ilişki psikolojisi protokolleri)
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-200">
                    <strong>PDF, EPUB ve Kindle (.mobi)</strong> formatlarında anında indirme
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-200">
                    <strong>Ömür boyu erişim</strong> ve dijital revizyon güncellemeleri
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-200">
                    Fiziksel kargo beklemeden, e-posta adresinize anında dijital teslimat.
                  </span>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-6 mt-4">
              <a
                href="https://wa.me/905455207999?text=Merhaba,%20Vazgeçilmez%20Olma%20Sanatı%20e-kitap%20paketini%20satın%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-black text-sm font-extrabold uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 fill-black/15 text-black" />
                <span>E-KİTABI HEMEN OKU (600 TL)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-zinc-400 font-medium">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>Otomatik sistem ile e-posta adresinize saniyeler içinde teslimat.</span>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* SAĞ KART (TÜKENMİŞ / PASİF ÜRÜN): FİZİKSEL KİTAP (TALEP TOPLAMA)         */}
          {/* ========================================================================= */}
          <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-9 rounded-3xl bg-matte-900/50 border border-zinc-800 text-zinc-400 transition-all duration-300">
            
            {/* TÜKENDİ ŞERİT / ROZETİ */}
            <div className="absolute -top-3.5 right-6 sm:right-8 z-20">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-crimson-600 text-white text-xs font-black uppercase tracking-widest shadow-md border border-red-400/40">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>TÜKENDİ</span>
              </div>
            </div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
                  <Package className="w-4 h-4 text-zinc-500" />
                  <span>1. BASKI KOLEKSİYON SERİSİ</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-800/60 text-zinc-500 border border-zinc-700/50">
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-300 tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span className="text-zinc-500">Fiziksel Kitap</span>
              </h3>
              
              <p className="text-sm text-zinc-400 mt-2 mb-6 leading-relaxed">
                Koleksiyon serisi tamamen tükenmiştir ve bir daha basılmayacaktır. Yeni bir fiziksel versiyon üretmek gibi bir mecburiyetimiz yok. Ancak bu bilgilere ulaşmak isteyenlerin yoğun baskısı üzerine, standart bir edisyon değerlendirmeye alınabilir. Kararı, oluşturduğunuz talep belirleyecek.
              </p>

              {/* Price Tag (Üstü Çizili) */}
              <div className="py-4 my-4 border-y border-zinc-800/80 flex items-baseline gap-2 bg-zinc-900/30 -mx-6 sm:-mx-8 lg:-mx-9 px-6 sm:px-8 lg:px-9">
                <span className="text-4xl sm:text-5xl font-black text-zinc-500 line-through decoration-crimson-500 decoration-2 font-mono">
                  1000
                </span>
                <span className="text-xl font-bold text-zinc-600 font-mono">TL</span>
                <span className="text-xs text-crimson-400 font-bold uppercase tracking-wider ml-2">
                  (1. BASKI TÜKENDİ)
                </span>
              </div>

              {/* Feature List (Soluk Gri Liste) */}
              <div className="space-y-3.5 my-6 text-zinc-400">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-500 border border-zinc-700">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-400">
                    Yazardan İsme Özel Islak İmza ve kişisel not
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-500 border border-zinc-700">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-400">
                    Sert Ciltli (Hardcover) & Altın Varak kabartmalı lüks kapak
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-500 border border-zinc-700">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-zinc-400">
                    1/200 Numaralandırılmış resmi koleksiyon damgası (200/200 Tükendi)
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary CTA Button (Action Button) & Talep Sayacı */}
            <div className="pt-6 mt-4">
              <button
                type="button"
                onClick={handleDemandClick}
                disabled={hasRequested}
                className={`w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                  hasRequested
                    ? "bg-zinc-850/80 border border-zinc-700 text-zinc-500 cursor-not-allowed"
                    : "bg-transparent hover:bg-gold-500/10 border border-gold-500/50 hover:border-gold-400 text-gold-300 hover:text-gold-200 cursor-pointer active:scale-[0.98]"
                }`}
              >
                {hasRequested ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>TALEBİNİZ ALINDI</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                    <span>YENİ BASKI İÇİN TALEP OLUŞTUR</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs sm:text-[13px] text-zinc-400 font-medium text-center">
                <span>🔥 Şu an <strong className="text-gold-300 font-bold">{demandCount} kişi</strong> yeni baskı talep ediyor.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Security & Guarantee Strip */}
        <div className="mt-14 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold-400" />
            <span>256-Bit SSL Uçtan Uca Şifreli Güvenlik</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gold-400" />
            <span>Doğrudan Yazar Onaylı Orijinal Eser</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold-400" />
            <span>Satın Alma Sonrası Anında Erişim</span>
          </div>
        </div>

      </div>
    </section>
  );
}

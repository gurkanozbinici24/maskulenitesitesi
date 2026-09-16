"use client";

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
} from "lucide-react";

export default function PricingSection() {
  return (
    <section id="fiyatlandirma" className="py-24 relative overflow-hidden bg-matte-950">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Package className="w-3.5 h-3.5" />
            <span>KÜTÜPHANENİ DONAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Vazgeçilmez Olmaya <span className="gold-text-gradient">İlk Adımı At</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal">
            İster hemen dijital olarak okumaya başlayın, ister koleksiyonunuza özel imzalı fiziksel
            baskıyı dahil edin.
          </p>
        </div>

        {/* 2-Card Side-by-Side Pricing Grid */}
        <div
          id="fiyat-kartlari"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch scroll-mt-24"
        >
          {/* Card 1: Özel Üretim İmzalı Fiziksel Kitap (PREMIUM CARD) - 1. Sıra (Kırmızı Çerçeve & Aciliyet) */}
          <div className="relative flex flex-col justify-between p-5 sm:p-7 lg:p-8 rounded-3xl bg-gradient-to-b from-matte-850 via-matte-900 to-matte-950 border-2 border-crimson-500 shadow-[0_0_35px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.45)] transition-all duration-300">
            
            {/* VIBRANT RED LIMITED BADGE */}
            <div className="absolute -top-3.5 left-4 sm:left-8 z-20">
              <div className="inline-flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-crimson-glow border border-red-300/40 animate-bounce">
                <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>SADECE 200 ADET KOLEKSİYON EDİSYONU</span>
              </div>
            </div>

            <div>
              {/* Header: KOLEKSİYON BASKISI + SON 18 ADET */}
              <div className="flex items-center justify-between mb-3 pt-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-gold-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>KOLEKSİYON BASKISI</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-crimson-600/90 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider border border-red-400/40 shadow-crimson-glow animate-pulse">
                    🔥 SON 18 ADET
                  </span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-crimson-500/20 text-crimson-400 border border-crimson-500/40">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span>İmzalı Fiziksel Kitap</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 mb-4 sm:mb-5">
                Yazardan isminize özel ıslak imzalı, numaralandırılmış sert kapaklı prestij koleksiyon versiyonu.
              </p>

              {/* Price Tag */}
              <div className="py-3.5 sm:py-4 my-3 sm:my-4 border-y border-crimson-500/40 flex items-baseline gap-2 bg-crimson-950/20 -mx-5 sm:-mx-7 lg:-mx-8 px-5 sm:px-7 lg:px-8">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono">
                  1000
                </span>
                <span className="text-lg sm:text-xl font-bold text-gold-400 font-mono">TL</span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-medium ml-1">/ Ücretsiz Özel Kargo Dahil</span>
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 sm:space-y-3 my-4 sm:my-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-crimson-500/20 flex items-center justify-center flex-shrink-0 text-crimson-400 border border-crimson-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    <strong>Yazardan İsme Özel Islak İmza</strong> ve kişisel not
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-crimson-500/20 flex items-center justify-center flex-shrink-0 text-crimson-400 border border-crimson-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    <strong>Sert Ciltli (Hardcover) & Altın Varak</strong> kabartmalı lüks kapak
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-crimson-500/20 flex items-center justify-center flex-shrink-0 text-crimson-400 border border-crimson-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    <strong>1/200 Numaralandırılmış</strong> resmi koleksiyon damgası
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-crimson-500/20 flex items-center justify-center flex-shrink-0 text-crimson-400 border border-crimson-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-200">
                    <strong>Bonus:</strong> 600 TL Değerindeki E-Kitap Sürümü Hediye
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 sm:pt-5 mt-2">
              <a
                href="https://wa.me/905455207999?text=Merhaba,%20Vazgeçilmez%20Olma%20Sanatı%20imzalı%20kitabını%20satın%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-black text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-black/15 text-black" />
                <span>WhatsApp ile Sipariş Ver</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              {/* BÜYÜK VE GÖZE ÇARPAN STOK UYARISI */}
              <div className="mt-3 p-2 sm:p-2.5 rounded-xl bg-crimson-950/60 border border-crimson-500/50 shadow-[0_0_15px_rgba(220,38,38,0.25)] flex items-center justify-center gap-1.5 text-center animate-pulse">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-crimson-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-black tracking-wide text-zinc-100 uppercase">
                  KALAN STOK: <strong className="text-crimson-400 font-black text-xs sm:text-sm ml-0.5">SON 18 ADET</strong> <span className="text-crimson-300 font-bold ml-0.5">(TÜKENMEK ÜZERE)</span>
                </span>
              </div>
            </div>

          </div>

          {/* Card 2: E-Kitap Paketi - 2. Sıra (Sağda / Altta) */}
          <div className="relative flex flex-col justify-between p-5 sm:p-7 lg:p-8 rounded-3xl bg-matte-900/90 border border-zinc-800 hover:border-zinc-700 shadow-xl transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                  DİJİTAL SÜRÜM
                </span>
                <div className="p-1.5 sm:p-2 rounded-lg bg-zinc-800/80 text-zinc-300">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-100 tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span className="inline-block whitespace-nowrap">E-Kitap Paketi</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 mb-4 sm:mb-5">
                Ödemenin ardından anında cihazınıza indirin. Telefon, tablet ve e-okuyucularda kesintisiz okuyun.
              </p>

              {/* Price Tag */}
              <div className="py-3.5 sm:py-4 my-3 sm:my-4 border-y border-zinc-800/80 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono">
                  600
                </span>
                <span className="text-lg sm:text-xl font-bold text-gold-400 font-mono">TL</span>
                <span className="text-[11px] sm:text-xs text-zinc-500 font-medium ml-1">/ Tek Seferlik Ödeme</span>
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 sm:space-y-3 my-4 sm:my-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300">
                    <strong>Tam Metin</strong> (Tüm bölümler ve ilişki psikolojisi protokolleri)
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300">
                    <strong>PDF, EPUB ve Kindle (.mobi)</strong> formatlarında anında indirme
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300">
                    Ömür boyu erişim ve dijital revizyon güncellemeleri
                  </span>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300">
                    Satın alma anında otomatik e-posta teslimatı
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 sm:pt-5 mt-2">
              <a
                href="https://wa.me/905455207999?text=Merhaba,%20Vazgeçilmez%20Olma%20Sanatı%20e-kitap%20paketini%20satın%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-matte-800 hover:bg-zinc-800 border border-zinc-700 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-gold-400" />
                <span>WhatsApp ile Sipariş Ver</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] sm:text-[11px] text-zinc-500 font-medium">
                <Zap className="w-3.5 h-3.5 text-gold-400" />
                <span>WhatsApp üzerinden anında teslimat</span>
              </div>
            </div>
          </div>

        </div>

        {/* Security & Guarantee Strip */}
        <div className="mt-14 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold-400" />
            <span>256-Bit SSL Uçtan Uca Şifreli Ödeme</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gold-400" />
            <span>Hasarsız Özel Koruma Paketi</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold-400" />
            <span>Aynı Gün Hızlı Kargo İmkanı</span>
          </div>
        </div>

      </div>
    </section>
  );
}

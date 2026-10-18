"use client";

import React from "react";
import {
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  Package,
  BookOpen,
  MessageCircle,
  Mail,
  Clock,
  Truck,
  ShoppingBag,
  Info,
} from "lucide-react";
import {
  ThemeButton,
  ThemeBadge,
  ThemeCard,
  ThemeSectionHeader,
} from "./ui/ThemeSystem";
import {
  BookCountdown,
  useCekicilikLaunchStatus,
} from "./ui/BookCountdown";
import {
  KART_ODEME_AKTIF,
  VAZGECILMEZ_CONFIG,
} from "@/config/cekicilikConfig";

export default function PricingSection() {
  const { isOnSale } = useCekicilikLaunchStatus(VAZGECILMEZ_CONFIG.releaseDate);
  const { physicalRenovated } = VAZGECILMEZ_CONFIG;

  return (
    <section
      id="fiyatlandirma"
      className="py-20 sm:py-24 relative overflow-hidden bg-matte-950"
    >
      {/* Background Ambience (Sıcak Altın & Maun Kütüphane Işığı) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-mahogany-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ThemeSectionHeader
          theme="kitap1"
          badgeIcon={<Package className="w-3.5 h-3.5 text-gold-400" />}
          badgeText="KÜTÜPHANENİ DONAT"
          title="VAZGEÇİLMEZ OLMAYA"
          highlightText={"İLK\u00a0ADIMI\u00a0AT"}
          subtitle={"Kuralları koyan taraf olmak için E\u2011Kitap sürümünü hemen sipariş edebilir ya da yeni kapaklı, büyük puntolu Fiziksel Yenilenmiş Edisyon'u tercih edebilirsin."}
          className="mb-14 sm:mb-16 lg:mb-10 lg:max-w-5xl"
          titleClassName="text-fluid-3xl lg:whitespace-nowrap"
          subtitleClassName="lg:max-w-4xl lg:text-base"
        />

        {/* 2-Card Side-by-Side Pricing Grid */}
        <div
          id="fiyat-kartlari"
          data-sticky-hide
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 max-w-5xl mx-auto items-stretch scroll-mt-24"
        >
          {/* ========================================================================= */}
          {/* SOL KART (AKTİF / YILDIZ ÜRÜN): E-KİTAP PAKETİ (HEMEN ALINABİLİR)         */}
          {/* ========================================================================= */}
          <ThemeCard
            theme="kitap1"
            variant="glow"
            className="flex flex-col justify-between p-5 sm:p-8 lg:px-8 lg:py-7"
          >
            {/* ANINDA TESLİMAT BADGE */}
            <div className="absolute -top-3.5 left-6 sm:left-8 z-20">
              <ThemeBadge
                theme="kitap1"
                status="satista"
                className="px-4 py-1.5 tracking-wider"
              >
                <Zap className="w-3.5 h-3.5 fill-black text-black" />
                <span>E-KİTAP SATIŞTA</span>
              </ThemeBadge>
            </div>

            <div>
              {/* Header */}
              <div className="hidden sm:flex lg:hidden items-center justify-between mb-4 pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-gold-400 font-mono">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>DİJİTAL SÜRÜM</span>
                </div>
                <div className="p-2 rounded-lg bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <h3 className="pt-3 sm:pt-0 lg:pt-3 text-xl sm:text-fluid-2xl lg:text-[1.65rem] font-black text-white tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span className="gold-text-gradient">E-Kitap Paketi</span>
              </h3>

              <p className="hidden sm:block text-fluid-sm text-zinc-300 mt-2 mb-6 lg:mb-3 lg:text-sm leading-relaxed">
                Kargo bekleme veya adres girme süreçleriyle vakit kaybetmeyin.
                Ödemenizin ardından e-kitabınız (dijital formatta) doğrudan
                e-posta adresinize gönderilir. Telefon, tablet veya
                bilgisayarınızdan hemen okumaya başlayın.
              </p>

              {/* Price Tag */}
              <div className="py-3 sm:py-4 lg:py-3 my-3 sm:my-4 lg:my-3 border-y border-gold-500/30 flex items-baseline gap-2 bg-gold-500/5 -mx-5 sm:-mx-8 px-5 sm:px-8">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  600
                </span>
                <span className="text-xl font-bold text-gold-400 font-mono">
                  TL
                </span>
                <span className="text-xs text-zinc-400 font-medium ml-2">
                  / Tek Seferlik Ödeme
                </span>
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 sm:space-y-3.5 lg:space-y-2.5 my-4 sm:my-6 lg:my-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>Tam Metin</strong> (Tüm bölümler ve ilişki
                    psikolojisi protokolleri)
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>PDF, EPUB ve Kindle (.mobi)</strong> formatlarında
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>Ömür boyu erişim</strong> ve dijital revizyon
                    güncellemeleri
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    Fiziksel kargo beklemeden, e-posta adresinize dijital
                    teslimat.
                  </span>
                </div>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-2 sm:pt-6 lg:pt-2 mt-2 sm:mt-4 lg:mt-2">
              <ThemeButton
                theme="kitap1"
                variant="primary"
                size="lg"
                fullWidth
                href="https://wa.me/905455207999?text=Merhaba,%20Vazgeçilmez%20Olma%20Sanatı%20e-kitap%20paketini%20satın%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 fill-black/15 text-black" />
                <span className="sm:hidden">Hemen Al – 600 TL</span>
                <span className="hidden sm:inline">E-KİTABI HEMEN OKU (600 TL)</span>
                <ArrowRight className="w-4 h-4" />
              </ThemeButton>
              <div className="flex items-start justify-center gap-1.5 mt-3 text-[11px] sm:text-xs text-zinc-400 font-medium text-center">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  WhatsApp'tan sipariş verin, ödemenin ardından e-kitabınız
                  e-postanıza gönderilsin.
                </span>
              </div>
            </div>
          </ThemeCard>

          {/* ========================================================================= */}
          {/* SAĞ KART: FİZİKSEL KİTAP — YENİLENMİŞ EDİSYON (5 KASIM LANSMAN / SATIŞ)   */}
          {/* ========================================================================= */}
          <ThemeCard
            theme="kitap1"
            variant="elevated"
            className="flex flex-col justify-between p-5 sm:p-8 lg:px-8 lg:py-7 border-mahogany-600/70"
          >
            {/* ÜST ROZET: Satış Öncesi "Yenilenmiş Edisyon – 5 Kasım'da Satışta", Satışta "SATIŞTA" */}
            <div className="absolute -top-3.5 left-6 sm:left-8 z-20">
              {isOnSale ? (
                <ThemeBadge
                  theme="kitap1"
                  status="satista"
                  className="px-4 py-1.5 tracking-wider"
                >
                  <Truck className="w-3.5 h-3.5 text-black" />
                  <span>SATIŞTA • ÜCRETSİZ KARGO</span>
                </ThemeBadge>
              ) : (
                <ThemeBadge
                  theme="kitap1"
                  status="yakinda"
                  className="px-4 py-1.5 tracking-wider"
                >
                  <Clock className="w-3.5 h-3.5 text-gold-300" />
                  <span className="sm:hidden">5 KASIM&apos;DA SATIŞTA</span>
                  <span className="hidden sm:inline">{physicalRenovated.preLaunchBadgeText}</span>
                </ThemeBadge>
              )}
            </div>

            <div>
              {/* Header */}
              <div className="hidden sm:flex lg:hidden items-center justify-between mb-4 pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-mahogany-200 font-mono">
                  <Package className="w-4 h-4 text-gold-400" />
                  <span>YENİLENMİŞ EDİSYON FİZİKSEL BASKI</span>
                </div>
                <div className="p-2 rounded-lg bg-mahogany-800/80 text-gold-400 border border-mahogany-600/60">
                  <Package className="w-5 h-5" />
                </div>
              </div>

              <h3 className="pt-3 sm:pt-0 lg:pt-3 text-xl sm:text-fluid-2xl lg:text-[1.65rem] font-black text-white tracking-tight leading-snug">
                Vazgeçilmez Olma Sanatı <br />
                <span className="gold-text-gradient">
                  Fiziksel Kitap
                  <span className="hidden sm:inline lg:hidden"> (Yenilenmiş Edisyon)</span>
                </span>
              </h3>

              {/* Kısa Bilgilendirme Notu */}
              <div className="hidden sm:flex mt-3 mb-5 lg:mb-2 p-3.5 lg:p-0 lg:mt-2 rounded-xl lg:rounded-none bg-mahogany-900/70 lg:bg-transparent border border-mahogany-700/70 lg:border-0 items-start gap-2.5 text-left">
                <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-mahogany-200 leading-relaxed">
                  {VAZGECILMEZ_CONFIG.editionNote}
                </p>
              </div>

              {/* Fiyat ve Ücretsiz Kargo Bandı */}
              <div className="py-3 sm:py-4 lg:py-3 my-3 sm:my-4 lg:my-3 border-y border-mahogany-700/70 flex flex-wrap items-center justify-between gap-2 bg-mahogany-900/40 -mx-5 sm:-mx-8 px-5 sm:px-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    {physicalRenovated.price}
                  </span>
                  <span className="text-xl font-bold text-gold-400 font-mono">
                    {physicalRenovated.currency}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-[10px] sm:text-xs font-bold text-gold-300 uppercase tracking-wider">
                  <Truck className="w-3.5 h-3.5 text-gold-400" />
                  <span>{physicalRenovated.shippingNote}</span>
                </span>
              </div>

              {/* Özellik Listesi */}
              <div className="space-y-2.5 sm:space-y-3 lg:space-y-2.5 my-4 sm:my-5 lg:my-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>Birebir aynı tavizsiz içerik</strong> (227 sayfa tam
                    metin)
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>Yeni kapak tasarımı</strong> ve göz yormayan{" "}
                    <strong>daha okunaklı büyük punto</strong>
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 text-gold-400 border border-gold-500/40">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-[13px] sm:text-sm text-zinc-200 leading-snug">
                    <strong>Kapıya kadar ücretsiz kargo</strong> ve gizli/korumalı
                    özel paketleme
                  </span>
                </div>
              </div>
            </div>

            {/* Alt Aksiyon Alanı: Satış Öncesi Geri Sayım + Haber Al / Satışta Sipariş Ver */}
            <div className="pt-1 sm:pt-4 lg:pt-1 mt-1 sm:mt-2 lg:mt-1">
              {!isOnSale ? (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gold-300/90 mb-2 text-center">
                      <span className="sm:hidden">Satışa kalan süre</span>
                      <span className="hidden sm:inline">5 Kasım 18:00 Satış Başlangıcına Kalan Süre</span>
                    </div>
                    <BookCountdown
                      theme="kitap1"
                      size="sm"
                      releaseDate={VAZGECILMEZ_CONFIG.releaseDate}
                      showStatusBadge={false}
                      showActionArea={false}
                      className="mx-auto"
                    />
                  </div>

                  <ThemeButton
                    theme="kitap1"
                    variant="secondary"
                    size="md"
                    fullWidth
                    href={physicalRenovated.notifyWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <span>WhatsApp&apos;tan Haber Al</span>
                    <ArrowRight className="w-4 h-4" />
                  </ThemeButton>
                </div>
              ) : (
                <div className="space-y-3">
                  <ThemeButton
                    theme="kitap1"
                    variant="primary"
                    size="lg"
                    fullWidth
                    href={physicalRenovated.orderWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 fill-black/15 text-black flex-shrink-0" />
                    <span className="sm:hidden">Sipariş Ver – 1000 TL</span>
                    <span className="hidden sm:inline">WhatsApp ile Sipariş Ver (1000 TL)</span>
                    <ArrowRight className="w-4 h-4" />
                  </ThemeButton>

                  {KART_ODEME_AKTIF && (
                    <ThemeButton
                      theme="kitap1"
                      variant="secondary"
                      size="lg"
                      fullWidth
                    >
                      <ShoppingBag className="w-5 h-5 text-gold-400 flex-shrink-0" />
                      <span>Sepete Ekle (1000 TL)</span>
                    </ThemeButton>
                  )}

                  <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-gold-300 font-medium">
                    <Truck className="w-3.5 h-3.5 text-gold-400" />
                    <span>Kapıya kadar ücretsiz kargo ile gönderim.</span>
                  </div>
                </div>
              )}
            </div>
          </ThemeCard>
        </div>
      </div>
    </section>
  );
}

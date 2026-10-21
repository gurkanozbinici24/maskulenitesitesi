"use client";

import React from "react";
import { Bell, BookOpen, CreditCard, MessageCircle, Package, Sparkles, Truck, Zap } from "lucide-react";
import { odemeLinki } from "@/lib/odeme/urunler";
import Image from "next/image";
import { ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { useCekicilikLaunchStatus } from "./ui/BookCountdown";
import AnindaTeslim from "./ui/AnindaTeslim";
import {
  CEKICILIK_SANATI_CONFIG,
  KART_ODEME_AKTIF,
  KOLEKSIYON_SETI_CONFIG as SET,
  VAZGECILMEZ_CONFIG,
} from "@/config/cekicilikConfig";

/**
 * Sayfa sonu "son çağrı" alanı (id="fiyat-kartlari"): tek sırada 3 sade kart.
 * Vazgeçilmez · Çekicilik · Koleksiyon Seti — kapak, fiyat ve satın alma butonları.
 * Ayrıntılar yukarıdaki bölümlerde; burası sadece hızlı karar ve ödeme için.
 */
export default function PricingSection() {
  const vazgecilmez = useCekicilikLaunchStatus(VAZGECILMEZ_CONFIG.releaseDate);
  const cekicilik = useCekicilikLaunchStatus();
  const set = useCekicilikLaunchStatus(SET.releaseDate);
  const lansman = useCekicilikLaunchStatus(SET.launchSpecialUntil);
  const { ebook: vEbook, physicalRenovated: vFiz } = VAZGECILMEZ_CONFIG;
  const { ebook: cEbook, physical: cFiz } = CEKICILIK_SANATI_CONFIG.products;

  /** Kartla ödeme açıksa ödeme sayfası, değilse WhatsApp */
  const al = (id: Parameters<typeof odemeLinki>[0], whatsapp: string) =>
    KART_ODEME_AKTIF
      ? { href: odemeLinki(id) }
      : { href: whatsapp, target: "_blank", rel: "noopener noreferrer" };

  return (
    <section id="fiyatlandirma" className="relative overflow-hidden bg-matte-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-[45%] bg-gold-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-[45%] bg-crimson-700/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap1"
          badgeIcon={<Package className="h-3.5 w-3.5 text-gold-400" />}
          badgeText="SON ADIM"
          title="KÜTÜPHANENİ"
          highlightText="TAMAMLA"
          subtitle="Kitabını seç, kartla öde. E-kitap saniyeler içinde e-postanda, imzalı kitap 2 günde kapında."
          className="mb-10 sm:mb-12"
        />

        <div id="fiyat-kartlari" data-sticky-hide className="grid scroll-mt-24 gap-5 md:grid-cols-3">
          {/* 1 · VAZGEÇİLMEZ */}
          <Kart
            tema="kitap1"
            etiket="1. Kitap · Erkekler için"
            baslik="Vazgeçilmez Olma Sanatı"
            fiyat={
              <>
                {vEbook.price} <Kucuk>/ {vFiz.price} TL</Kucuk>
              </>
            }
            altBilgi="E-kitap · Fiziksel (isme özel imzalı)"
          >
            <ThemeButton theme="kitap1" variant="primary" size="md" fullWidth className="whitespace-nowrap" {...al(vEbook.id, vEbook.whatsappUrl)}>
              <Zap className="h-4 w-4 flex-shrink-0" />
              <span>E-Kitap · {vEbook.price} TL</span>
            </ThemeButton>
            {vazgecilmez.isOnSale ? (
              <ThemeButton theme="kitap1" variant="outline" size="md" fullWidth className="whitespace-nowrap" {...al(vFiz.id, vFiz.orderWhatsappUrl)}>
                <Package className="h-4 w-4 flex-shrink-0" />
                <span>Fiziksel · {vFiz.price} TL</span>
              </ThemeButton>
            ) : (
              <ThemeButton theme="kitap1" variant="outline" size="md" fullWidth className="whitespace-nowrap" href={vFiz.notifyWhatsappUrl} target="_blank" rel="noopener noreferrer">
                <Bell className="h-4 w-4 flex-shrink-0" />
                <span>Fiziksel · 5 Kasım&apos;da</span>
              </ThemeButton>
            )}
          </Kart>

          {/* 2 · ÇEKİCİLİK */}
          <Kart
            tema="kitap2"
            etiket="2. Kitap · Kadınlar için"
            baslik="Çekicilik Sanatı"
            fiyat={
              <>
                {cEbook.price} <Kucuk>/ {cFiz.price} TL</Kucuk>
              </>
            }
            altBilgi="E-kitap · Fiziksel (isme özel imzalı)"
          >
            {cekicilik.isOnSale ? (
              <>
                <ThemeButton theme="kitap2" variant="primary" size="md" fullWidth className="whitespace-nowrap" {...al(cEbook.id, cEbook.whatsappUrl)}>
                  <Zap className="h-4 w-4 flex-shrink-0" />
                  <span>E-Kitap · {cEbook.price} TL</span>
                </ThemeButton>
                <ThemeButton theme="kitap2" variant="outline" size="md" fullWidth className="whitespace-nowrap" {...al(cFiz.id, cFiz.whatsappUrl)}>
                  <Package className="h-4 w-4 flex-shrink-0" />
                  <span>Fiziksel · {cFiz.price} TL</span>
                </ThemeButton>
              </>
            ) : (
              <>
                <ThemeButton theme="kitap2" variant="primary" size="md" fullWidth className="whitespace-nowrap" href={CEKICILIK_SANATI_CONFIG.notifyWhatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Bell className="h-4 w-4 flex-shrink-0" />
                  <span>5 Kasım&apos;da · Haber Al</span>
                </ThemeButton>
                <ThemeButton theme="kitap2" variant="outline" size="md" fullWidth className="whitespace-nowrap" href="#cekicilik-sanati">
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span>Kitabı İncele</span>
                </ThemeButton>
              </>
            )}
          </Kart>

          {/* 3 · KOLEKSİYON SETİ */}
          <Kart
            tema="set"
            etiket={!lansman.isOnSale ? "Lansmana Özel · 2 Kitap" : "2 Fiziksel Kitap"}
            baslik="Koleksiyon Seti"
            fiyat={
              <>
                <span className="mr-2 align-middle text-lg font-bold text-zinc-500 line-through decoration-crimson-500 decoration-2">
                  {SET.oldPrice}
                </span>
                {SET.price} <Kucuk>TL</Kucuk>
              </>
            }
            altBilgi="İkisi de imzalı · 6 taksite kadar"
          >
            {set.isOnSale ? (
              <>
                <ThemeButton theme="kitap1" variant="primary" size="md" fullWidth className="whitespace-nowrap" {...al("koleksiyon-seti", SET.orderWhatsappUrl)}>
                  <CreditCard className="h-4 w-4 flex-shrink-0" />
                  <span>{KART_ODEME_AKTIF ? "Kartla Hemen Al" : "Seti Sipariş Et"}</span>
                </ThemeButton>
                <ThemeButton theme="kitap1" variant="outline" size="md" fullWidth className="whitespace-nowrap" href={SET.orderWhatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>WhatsApp&apos;tan Al</span>
                </ThemeButton>
              </>
            ) : (
              <>
                <ThemeButton theme="kitap1" variant="primary" size="md" fullWidth className="whitespace-nowrap" href={SET.notifyWhatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Bell className="h-4 w-4 flex-shrink-0" />
                  <span>5 Kasım&apos;da · Haber Al</span>
                </ThemeButton>
                <ThemeButton theme="kitap1" variant="outline" size="md" fullWidth className="whitespace-nowrap" href="#koleksiyon-seti">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span>Seti İncele</span>
                </ThemeButton>
              </>
            )}
          </Kart>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <AnindaTeslim size="sm" />
          <AnindaTeslim tip="fiziksel" size="sm" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-zinc-300">
            <Truck className="h-3.5 w-3.5 text-gold-400" />
            Kapıya kadar ücretsiz kargo
          </span>
        </div>
      </div>
    </section>
  );
}

function Kucuk({ children }: { children: React.ReactNode }) {
  return <span className="text-base font-bold text-gold-400">{children}</span>;
}

function Kart({
  tema,
  etiket,
  baslik,
  fiyat,
  altBilgi,
  children,
}: {
  tema: "kitap1" | "kitap2" | "set";
  etiket: string;
  baslik: string;
  fiyat: React.ReactNode;
  altBilgi: string;
  children: React.ReactNode;
}) {
  const stil = {
    kitap1: "border-gold-500/40 bg-gradient-to-b from-mahogany-950/70 to-matte-950",
    kitap2: "border-crimson-600/50 bg-gradient-to-b from-crimson-950/70 to-matte-950",
    set: "border-gold-400/70 bg-[linear-gradient(160deg,rgba(212,175,55,0.14),rgba(0,0,0,0)_45%),linear-gradient(180deg,#1a1008,#0b0606)] shadow-gold-glow",
  }[tema];
  const etiketRenk = tema === "kitap2" ? "text-crimson-300" : "text-gold-300";

  return (
    <div className={`relative flex flex-col rounded-2xl border p-5 ${stil}`}>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {tema === "set" ? (
            <div className="relative h-[88px] w-[92px]">
              <Kapak kitap="kitap1" className="absolute left-0 top-0 -rotate-6" />
              <Kapak kitap="kitap2" className="absolute right-0 top-0 rotate-3" />
            </div>
          ) : (
            <Kapak kitap={tema} />
          )}
        </div>
        <div className="min-w-0">
          <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${etiketRenk}`}>{etiket}</div>
          <h3 className="mt-1 font-cinzel text-lg font-bold leading-tight text-white">{baslik}</h3>
          <div className="mt-1.5 whitespace-nowrap font-mono text-3xl font-black leading-none text-white">{fiyat}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-400">{altBilgi}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

/** Küçük düz kapak (3D model küçük boyutta sırt/kenar taşması yaptığı için) */
function Kapak({ kitap, className = "" }: { kitap: "kitap1" | "kitap2"; className?: string }) {
  return (
    <div
      className={`relative h-[84px] w-[56px] overflow-hidden rounded-[3px] shadow-[0_8px_20px_rgba(0,0,0,0.7)] ring-1 ring-white/15 ${className}`}
    >
      <Image
        src={kitap === "kitap1" ? "/vazgecilmez-yeni-kapak.jpg" : "/cekicilik-sanati-kapak.jpg"}
        alt={kitap === "kitap1" ? "Vazgeçilmez Olma Sanatı kapağı" : "Çekicilik Sanatı kapağı"}
        fill
        sizes="60px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[5px] bg-gradient-to-r from-black/50 to-transparent" />
    </div>
  );
}

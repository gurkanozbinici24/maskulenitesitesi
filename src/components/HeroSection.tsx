"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ArrowRight, Zap, Lock, Sparkles, BookOpen } from "lucide-react";
import SamplePagesModal from "./SamplePagesModal";

export default function HeroSection() {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background Ambience & Grid */}
        <div className="absolute inset-0 bg-dark-radial pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(to right, #d4af37 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gold Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Assertive Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matte-850 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>İlişki Psikolojisi</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                <span className="gold-text-gradient block">
                  Vazgeçilmez Olma Sanatı
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed mb-8 max-w-2xl">
                Bütün ilişki deneyimlerini unut. Bir daha asla o ucuz manipülasyonlara düşmeyeceksin.
                İlişkinde sınırlarını nasıl çizeceğini öğreneceksin ve karşındaki kişi sana gönüllü itaat edecek.
                Tüm karanlık sır perdelerini deşifre etmeye ve davranışlarını kökünden değiştirmeye hazır mısın?
              </p>

              {/* CTA Group */}
              <div className="w-full sm:w-auto flex flex-col items-start gap-3 mb-10">
                {/* Dikkat Çekici Altın Parlamalı Rozet / Yazı */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black tracking-wide text-[#FFD700] uppercase select-none"
                  style={{
                    textShadow: "0 0 12px #FFD700, 0 0 24px #E5A93C",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-pulse flex-shrink-0" />
                  <span>İLK VE TEK BASKI (BİR DAHA ASLA BASILMAYACAK - 200 ÖZEL KOPYA)</span>
                </div>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="#fiyat-kartlari"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Kitabı Satın Al</span>
                    <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1.5 transition-transform" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSampleModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold text-zinc-300 bg-matte-900 hover:bg-matte-800 border border-zinc-800 hover:border-gold-500/40 rounded-xl transition-all duration-200 cursor-pointer hover:text-gold-300 shadow-sm"
                  >
                    <BookOpen className="w-4 h-4 text-gold-400" />
                    <span>İçindekileri İncele</span>
                  </button>
                </div>
              </div>

              {/* Trust Metrics & Micro Proofs */}
              <div className="pt-6 border-t border-zinc-800/80 w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-gold-500/10 text-gold-400">
                    <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-200">4.9 / 5.0</div>
                    <div className="text-[11px] text-zinc-500">Okuyucu Puanı</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-md bg-zinc-800 text-gold-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-200">Anında Teslimat</div>
                    <div className="text-[11px] text-zinc-500">E-Kitap & Kargo</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-300">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-200">256-Bit SSL</div>
                    <div className="text-[11px] text-zinc-500">Güvenli Ödeme</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Gerçek Kitap Kapağı Görseli ve Altındaki Rozet */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Ambient Back Glow */}
              <div className="absolute w-80 h-[500px] bg-gradient-to-tr from-amber-600/30 to-gold-400/20 blur-3xl rounded-full pointer-events-none" />

              {/* Gerçek Kapak Kartı */}
              <div className="relative group select-none flex flex-col items-center">
                <div className="relative w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.25)] border-2 border-gold-500/40 group-hover:border-gold-400 transition-all duration-500 group-hover:scale-[1.02]">
                  <Image
                    src="/kapak.jpg"
                    alt="Vazgeçilmez Olma Sanatı - İlişki Psikolojisi Kitap Kapağı"
                    width={400}
                    height={600}
                    priority
                    className="w-full h-auto object-cover block"
                  />
                  
                  {/* Lüks Parlama ve Yansıma Katmanı */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                </div>

                {/* KAPAK GÖRSELİNİN ALTINDAKİ TIKLANABİLİR ROZET */}
                <a
                  href="#fiyat-kartlari"
                  className="mt-5 group/badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-matte-850/95 border border-gold-500/40 hover:border-gold-400 text-gold-300 hover:text-gold-200 text-xs sm:text-sm font-bold shadow-gold-glow hover:shadow-gold-glow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Satın alma seçeneklerine git"
                >
                  <span>📖 237 Sayfa – Kuralları Sen Koy, İlişkiyi Sen Yönet</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover/badge:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Kitaptan Örnek Kesitler Modalı */}
      <SamplePagesModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </>
  );
}

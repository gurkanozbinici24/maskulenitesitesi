"use client";

import { useEffect, useState } from "react";
import { kampanyaAktif, kampanyaBitisMs } from "@/lib/odeme/kampanya";

/** Kampanya aktifse kalan süreyi "SS:DD:ss" olarak döner; değilse null (sunucu render'ında da null) */
export function useKampanya() {
  const [simdi, setSimdi] = useState<number | null>(null);
  useEffect(() => {
    setSimdi(Date.now());
    const t = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (simdi === null || !kampanyaAktif(simdi)) return null;
  const k = Math.max(0, Math.floor((kampanyaBitisMs() - simdi) / 1000));
  const p = (n: number) => String(n).padStart(2, "0");
  return { kalan: `${p(Math.floor(k / 3600))}:${p(Math.floor((k % 3600) / 60))}:${p(k % 60)}` };
}

/** Fiziksel kitap butonlarının üstündeki küçük kampanya rozeti */
export function KampanyaRozet({ deger, fiyat, className = "" }: { deger: number; fiyat: number; className?: string }) {
  const k = useKampanya();
  if (!k) return null;
  return (
    <div
      className={`flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-xl border border-gold-500/50 bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-gold-500/15 px-3 py-1.5 text-center ${className}`}
    >
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-200">🎁 E-kitap hediye</span>
      <span className="text-[11px] font-bold text-zinc-300">
        <span className="text-zinc-500 line-through decoration-crimson-500 decoration-2">{deger} TL</span>{" "}
        <span className="text-white">{fiyat} TL</span>
      </span>
      <span className="font-mono text-[11px] font-bold tabular-nums text-crimson-300">⏳ {k.kalan}</span>
    </div>
  );
}

/** Ödeme sayfasındaki kampanya kutusu */
export function KampanyaKutusu({
  fizikselFiyat,
  ekitapFiyat,
  ekitapAdi,
}: {
  fizikselFiyat: number;
  ekitapFiyat: number;
  ekitapAdi: string;
}) {
  const k = useKampanya();
  if (!k) return null;
  return (
    <div className="mt-3 rounded-2xl border border-gold-400/60 bg-gradient-to-br from-gold-500/15 via-gold-500/5 to-transparent p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold-300">🎁 48 saatlik kampanya</span>
        <span className="rounded-full border border-crimson-500/50 bg-crimson-950/50 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-crimson-200">
          ⏳ {k.kalan}
        </span>
      </div>
      <p className="mt-2 text-[15px] font-bold leading-snug text-white">
        {ekitapFiyat} TL değerindeki {ekitapAdi} e-kitabı HEDİYE
      </p>
      <p className="mt-1.5 font-mono text-sm text-zinc-300">
        Fiziksel {fizikselFiyat} TL + E-kitap {ekitapFiyat} TL ={" "}
        <span className="text-zinc-500 line-through decoration-crimson-500 decoration-2">
          {fizikselFiyat + ekitapFiyat} TL
        </span>{" "}
        → <strong className="text-gold-200">{fizikselFiyat} TL</strong>
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
        PDF ödeme onaylanır onaylanmaz e-postana gelir, hemen okumaya başlarsın. İsme özel imzalı kitabın da ücretsiz
        kargoyla kapına gelir.
      </p>
    </div>
  );
}

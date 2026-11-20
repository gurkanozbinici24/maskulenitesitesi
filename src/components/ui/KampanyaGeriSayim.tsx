"use client";

import { useEffect, useState } from "react";
import {
  HAVALE_KAMPANYA,
  havaleKampanyaAktif,
  havaleKampanyaBitisMs,
  kampanyaAktif,
  kampanyaBitisMs,
} from "@/lib/odeme/kampanya";

function useSaat() {
  const [simdi, setSimdi] = useState<number | null>(null);
  useEffect(() => {
    setSimdi(Date.now());
    const t = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return simdi;
}

const kalanYaz = (ms: number) => {
  const k = Math.max(0, Math.floor(ms / 1000));
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(k / 3600))}:${p(Math.floor((k % 3600) / 60))}:${p(k % 60)}`;
};

/** 24 saatlik havale indirimi aktifse kalan süreyi döner; değilse null */
export function useHavaleKampanya() {
  const simdi = useSaat();
  if (simdi === null || !havaleKampanyaAktif(simdi)) return null;
  return { kalan: kalanYaz(havaleKampanyaBitisMs() - simdi), yuzde: HAVALE_KAMPANYA.yuzde };
}

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
export function KampanyaRozet({ deger, fiyat, className = "", ince = false }: { deger: number; fiyat: number; className?: string; ince?: boolean }) {
  const k = useKampanya();
  const h = useHavaleKampanya();
  if (h) return <FirsatRozet className={className} ince={ince} />;
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

/** 24 saatlik havale fırsatı rozeti: büyük geri sayım, kampanya hissi */
export function FirsatRozet({ className = "", ince = false }: { className?: string; ince?: boolean }) {
  const h = useHavaleKampanya();
  if (!h) return null;
  if (ince)
    return (
      <div
        className={`flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-crimson-500/70 bg-crimson-800/40 px-3 py-1 shadow-[0_0_16px_rgba(220,38,38,0.3)] ${className}`}
      >
        <span className="text-[11px] font-black uppercase tracking-wide text-white">🔥 24 saatlik fırsat</span>
        <span className="text-crimson-300">·</span>
        <span className="text-[10px] font-bold uppercase text-crimson-100">bitmesine</span>
        <span className="font-mono text-[13px] font-black tabular-nums text-white">{h.kalan}</span>
      </div>
    );
  return (
    <div
      className={`relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-xl border border-crimson-500/70 bg-gradient-to-r from-crimson-700/40 via-crimson-900/40 to-crimson-700/40 px-3 py-2 shadow-[0_0_22px_rgba(220,38,38,0.35)] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 animate-pulse bg-crimson-500/10" />
      <span className="relative flex flex-col items-start leading-tight">
        <span className="text-[11px] font-black uppercase tracking-wider text-white">🔥 24 saatlik fırsat</span>
        <span className="text-[10px] font-bold text-crimson-100">Havale ile %{h.yuzde} indirim</span>
      </span>
      <span className="relative flex flex-col items-end leading-tight">
        <span className="text-[9px] font-bold uppercase tracking-wider text-crimson-200">Bitmesine</span>
        <span className="font-mono text-base font-black tabular-nums text-white">{h.kalan}</span>
      </span>
    </div>
  );
}

/** Ödeme sayfasındaki ürün kartının fiyatı: havale indirimi sürerken indirimli fiyat + küçük geri sayım */
export function UrunKartiFiyat({ kartFiyat, havaleFiyat }: { kartFiyat: number; havaleFiyat: number }) {
  const h = useHavaleKampanya();
  if (!h || havaleFiyat >= kartFiyat) {
    return (
      <div className="whitespace-nowrap font-mono text-2xl font-black text-white">
        {kartFiyat}
        <span className="ml-1 text-sm text-gold-400">TL</span>
      </div>
    );
  }
  return (
    <div className="text-right">
      <div className="whitespace-nowrap font-mono text-sm font-bold text-zinc-500 line-through decoration-crimson-500 decoration-2">
        {kartFiyat} TL
      </div>
      <div className="whitespace-nowrap font-mono text-2xl font-black text-emerald-300">
        {havaleFiyat}
        <span className="ml-1 text-sm">TL</span>
      </div>
      <div className="whitespace-nowrap text-[11px] font-bold text-zinc-400">havale ile</div>
    </div>
  );
}

/** Ödeme sayfasındaki 24 saatlik havale indirimi kutusu */
export function HavaleKampanyaKutusu({ kartFiyat, havaleFiyat }: { kartFiyat: number; havaleFiyat: number }) {
  const h = useHavaleKampanya();
  if (!h || havaleFiyat >= kartFiyat) return null;
  return (
    <div className="mt-3 rounded-2xl border border-emerald-400/60 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">🏦 24 saatlik havale indirimi</span>
        <span className="rounded-full border border-crimson-500/50 bg-crimson-950/50 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-crimson-200">
          ⏳ {h.kalan}
        </span>
      </div>
      <p className="mt-2 text-[15px] font-bold leading-snug text-white">
        Havale / EFT ile öde:{" "}
        <span className="text-zinc-500 line-through decoration-crimson-500 decoration-2">{kartFiyat} TL</span>{" "}
        <span className="text-emerald-200">{havaleFiyat} TL</span>
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
        İndirim yalnızca Havale / EFT ödemelerinde ve süre bitene kadar geçerli. Kartla ödemede fiyat {kartFiyat} TL.
        Kitaplar 500 TL (ikisi 1000 TL), e-kitaplar 300 TL (ikisi 600 TL).
      </p>
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

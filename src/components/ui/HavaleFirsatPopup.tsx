"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HAVALE_IKILI_FIYAT, HAVALE_REFERANS_FIYAT } from "@/lib/odeme/kampanya";
import { useHavaleKampanya } from "./KampanyaGeriSayim";

type Adim = "tek" | "ikili";
/** İki kitap ekranındaki "Hemen al": iki kitap sepete girmiş, havale ile ödeme ekranında açılır */
const IKILI_ODEME_URL = "/odeme?urun=ikili-fiziksel";

const anahtar = (adim: Adim) => `havale-firsat-${adim}-kapatildi`;

const kapatildi = (adim: Adim) => {
  try {
    return sessionStorage.getItem(anahtar(adim)) === "1";
  } catch {
    return false;
  }
};

const isaretle = (adim: Adim) => {
  try {
    sessionStorage.setItem(anahtar(adim), "1");
  } catch {
    /* oturum depolaması yoksa yalnızca bu sayfada kapanır */
  }
};

/**
 * 3 saatlik havale kampanyası sürerken çıkan ekranlar, bir tarayıcı oturumunda birer kez:
 * 1) havale ile tüm sitede %25, 2) iki kitap %35 indirimle 1300 TL, kargo ücretsiz; "Hemen al" ikili paketi havale ödeme ekranında açar.
 * Ödeme sayfasında ve yönetim panelinde gösterilmez.
 */
export default function HavaleFirsatPopup() {
  const kampanya = useHavaleKampanya();
  const yol = usePathname();
  const [adim, setAdim] = useState<Adim | null>(null);

  useEffect(() => {
    if (!kampanya || yol?.startsWith("/odeme") || yol?.startsWith("/yonetim")) {
      setAdim(null);
      return;
    }
    if (!kapatildi("tek")) setAdim("tek");
    else if (!kapatildi("ikili")) setAdim("ikili");
    else setAdim(null);
    // Sayaç her saniye güncellendiği için yalnızca açık/kapalı durumuna bakılır
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!kampanya, yol]);

  const kapat = () => {
    if (adim) isaretle(adim);
    // Tek kitap ekranı kapanınca iki kitap ekranı, o da kapanınca site görünür
    setAdim(adim === "tek" && !kapatildi("ikili") ? "ikili" : null);
  };

  const hemenAl = () => {
    isaretle("ikili");
    window.location.href = IKILI_ODEME_URL;
  };

  if (!adim || !kampanya) return null;

  const kapak = (src: string, alt: string) => (
    <img src={src} alt={alt} className="h-36 w-auto rounded-md border border-white/15 object-cover shadow-xl sm:h-44" />
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="havale-firsat-baslik"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={kapat}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-crimson-500/60 bg-gradient-to-b from-crimson-800/70 via-matte-950 to-matte-950 p-6 text-center shadow-[0_0_60px_rgba(220,38,38,0.35)] sm:p-8"
      >
        <button
          type="button"
          onClick={kapat}
          aria-label="Kapat"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
        >
          ✕
        </button>

        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-crimson-300">🔥 3 saatlik fırsat</p>

        {adim === "tek" ? (
          <>
            <h2 id="havale-firsat-baslik" className="mt-3 font-serif text-3xl font-black leading-tight text-white sm:text-4xl">
              Havale ile tüm sitede <span className="text-gold-300">%{kampanya.yuzde} indirim</span>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
              Kitaplarda, ikili pakette ve PDF'lerde geçerli. Ödemeyi havale / EFT ile yap.
            </p>
          </>
        ) : (
          <>
            <h2 id="havale-firsat-baslik" className="mt-3 font-serif text-3xl font-black leading-tight text-white sm:text-4xl">
              İki kitap <span className="text-gold-300">%35 indirimle</span>
            </h2>
            <div className="mt-5 flex items-center justify-center gap-4">
              {kapak("/vazgecilmez-yeni-kapak.jpg", "Vazgeçilmez Olma Sanatı kapağı")}
              {kapak("/cekicilik-sanati-kapak.jpg", "Çekicilik Sanatı kapağı")}
            </div>
            <p className="mt-5 text-zinc-500 line-through decoration-crimson-500 decoration-2">{HAVALE_REFERANS_FIYAT["koleksiyon-seti"]} TL</p>
            <p className="font-mono text-4xl font-black text-white">{HAVALE_IKILI_FIYAT} TL</p>
            <p className="mt-2 text-[15px] font-bold text-emerald-300">
              Havale ile · Kargo ücretsiz · İsme özel imzalı
            </p>
          </>
        )}

        <div className="mt-5 rounded-xl border border-gold-500/40 bg-black/50 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Bitmesine</p>
          <p className="font-mono text-3xl font-black tabular-nums text-white">{kampanya.kalan}</p>
        </div>

        {adim === "tek" ? (
          <button
            type="button"
            onClick={kapat}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 px-5 py-3.5 text-[15px] font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)] transition-transform hover:scale-[1.01]"
          >
            Devam et
          </button>
        ) : (
          <button
            type="button"
            onClick={hemenAl}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 px-5 py-3.5 text-[15px] font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)] transition-transform hover:scale-[1.01]"
          >
            Hemen al
          </button>
        )}

        <p className="mt-3 text-[12px] text-zinc-500">İndirim yalnızca havale / EFT ödemelerinde geçerlidir.</p>
      </div>
    </div>
  );
}

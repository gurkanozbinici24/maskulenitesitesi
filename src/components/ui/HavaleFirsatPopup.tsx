"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useHavaleKampanya } from "./KampanyaGeriSayim";

const ANAHTAR = "havale-firsat-popup-kapatildi";

/**
 * 24 saatlik havale kampanyası sürerken, ziyaretçi siteye ilk girdiğinde çıkan ekran.
 * Her tarayıcı oturumunda bir kez gösterilir; kapatılınca tekrar açılmaz.
 * Ödeme sayfasında gösterilmez (orada kampanya zaten kutu olarak görünüyor).
 */
export default function HavaleFirsatPopup() {
  const kampanya = useHavaleKampanya();
  const yol = usePathname();
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    if (!kampanya || yol?.startsWith("/odeme") || yol?.startsWith("/yonetim")) {
      setAcik(false);
      return;
    }
    let kapatildi = false;
    try {
      kapatildi = sessionStorage.getItem(ANAHTAR) === "1";
    } catch {
      kapatildi = false;
    }
    setAcik(!kapatildi);
    // Kampanya ilk kez aktif olduğunda açılır; sayaç her saniye güncellendiği için yalnızca açık/kapalı durumuna bakılır
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!kampanya, yol]);

  const kapat = () => {
    try {
      sessionStorage.setItem(ANAHTAR, "1");
    } catch {
      /* oturum depolaması yoksa sadece bu sayfada kapanır */
    }
    setAcik(false);
  };

  if (!acik || !kampanya) return null;

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

        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-crimson-300">🔥 24 saatlik fırsat</p>

        <h2 id="havale-firsat-baslik" className="mt-3 font-serif text-3xl font-black leading-tight text-white sm:text-4xl">
          Havale ile kitaplarda <span className="text-gold-300">%{kampanya.kitapYuzde} indirim</span>
        </h2>

        <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
          Tek fiziksel kitapta %{kampanya.kitapYuzde}, ikili paket ve PDF'lerde %{kampanya.yuzde} indirim. Ödemeyi havale / EFT ile yap, indirim seni bekliyor.
        </p>

        <div className="mt-5 rounded-xl border border-gold-500/40 bg-black/50 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Bitmesine</p>
          <p className="font-mono text-3xl font-black tabular-nums text-white">{kampanya.kalan}</p>
        </div>

        <button
          type="button"
          onClick={kapat}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-700 px-5 py-3.5 text-[15px] font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)] transition-transform hover:scale-[1.01]"
        >
          Fırsatı gör
        </button>

        <p className="mt-3 text-[12px] text-zinc-500">İndirim yalnızca havale / EFT ödemelerinde geçerlidir.</p>
      </div>
    </div>
  );
}

import { Zap } from "lucide-react";
import { PHYSICAL_PERKS } from "@/config/cekicilikConfig";

/**
 * E-kitap kartları için "7/24 FLASH HIZDA TESLİM" kutusu.
 * Fiziksel kartlardaki "FLASH HIZDA KARGO" kutusunun e-kitap eşi.
 * theme: "kitap1" (altın) veya "kitap2" (bordo/zümrüt); size: "sm" dar kartlar için.
 */
export default function FlashTeslim({
  tip = "ekitap",
  theme = "kitap1",
  size = "lg",
  className = "",
}: {
  /** "ekitap": 7/24 Flash Hızda Teslim · "kargo": Flash Hızda Kargo, 2 günde elinde */
  tip?: "ekitap" | "kargo";
  theme?: "kitap1" | "kitap2";
  size?: "sm" | "lg";
  className?: string;
}) {
  const k1 = theme === "kitap1";
  const accent = k1 ? "text-gold-300" : "text-emerald-300";
  const ring = k1
    ? "border-gold-500/45 bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-transparent"
    : "border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent";
  const bolt = k1
    ? "bg-gold-400 text-black shadow-[0_0_18px_rgba(212,175,55,0.6)]"
    : "bg-emerald-400 text-black shadow-[0_0_18px_rgba(52,211,153,0.55)]";
  const compact = size === "sm";
  const kargo = tip === "kargo";
  const baslik = kargo ? PHYSICAL_PERKS.cargoTitle : "7/24 Flash Hızda Otomatik Teslim";
  const etiket = kargo ? PHYSICAL_PERKS.cargoDelivery : "Saniyeler içinde";
  const detay = kargo
    ? PHYSICAL_PERKS.cargoDetail
    : "Kartla öde, PDF anında e-postana gelsin. Gece gündüz, bekleme yok.";

  return (
    <div className={`relative overflow-hidden rounded-xl border text-left ${ring} ${compact ? "px-3 py-2.5" : "px-4 py-3"} ${className}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex flex-shrink-0 items-center justify-center rounded-full ${bolt} ${compact ? "h-7 w-7" : "h-9 w-9"} motion-safe:animate-pulse`}
        >
          <Zap className={`${compact ? "h-4 w-4" : "h-5 w-5"} fill-black`} />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className={`font-black uppercase tracking-[0.14em] text-white ${compact ? "text-xs" : "text-sm"}`}>
              {baslik}
            </span>
            <span className={`rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accent}`}>
              {etiket}
            </span>
          </div>
          <p className={`mt-0.5 leading-snug text-zinc-400 ${compact ? "text-[11px]" : "text-xs"}`}>
            {detay}
          </p>
        </div>
      </div>
    </div>
  );
}

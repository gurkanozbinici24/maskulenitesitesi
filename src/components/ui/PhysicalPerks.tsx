import { PenLine, Zap } from "lucide-react";
import { PHYSICAL_PERKS } from "@/config/cekicilikConfig";

/**
 * Fiziksel kitap ayrıcalıkları: "Flash Hızda Kargo" ibaresi + "İsme Özel İmzalı" premium mesajı.
 * Tıklanabilir değildir; fiziksel kitap kartlarında ve Koleksiyon Seti'nde fiyatın altında durur.
 *
 * theme: "kitap1" (altın/maun) veya "kitap2" (bordo/zümrüt)
 * size:  "lg" tam kart, "sm" dar kartlar için sıkı görünüm
 */
export default function PhysicalPerks({
  theme = "kitap1",
  size = "lg",
  className = "",
}: {
  theme?: "kitap1" | "kitap2";
  size?: "sm" | "lg";
  className?: string;
}) {
  const p = PHYSICAL_PERKS;
  const k1 = theme === "kitap1";
  const accent = k1 ? "text-gold-300" : "text-emerald-300";
  const ring = k1
    ? "border-gold-500/45 bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-transparent"
    : "border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent";
  const bolt = k1
    ? "bg-gold-400 text-black shadow-[0_0_18px_rgba(212,175,55,0.6)]"
    : "bg-emerald-400 text-black shadow-[0_0_18px_rgba(52,211,153,0.55)]";
  const compact = size === "sm";

  return (
    <div className={`space-y-2.5 text-left ${className}`}>
      {/* FLASH HIZDA KARGO */}
      <div className={`relative overflow-hidden rounded-xl border ${ring} ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}>
        <div className="flex items-center gap-3">
          <span className={`flex flex-shrink-0 items-center justify-center rounded-full ${bolt} ${compact ? "h-7 w-7" : "h-9 w-9"} motion-safe:animate-pulse`}>
            <Zap className={`${compact ? "h-4 w-4" : "h-5 w-5"} fill-black`} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className={`font-black uppercase tracking-[0.14em] text-white ${compact ? "text-xs" : "text-sm"}`}>
                {p.cargoTitle}
              </span>
              <span className={`rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${accent}`}>
                {p.cargoDelivery}
              </span>
            </div>
            <p className={`mt-0.5 text-zinc-400 leading-snug ${compact ? "text-[11px]" : "text-xs"}`}>
              {p.cargoDetail}
            </p>
          </div>
        </div>
      </div>

      {/* İSME ÖZEL İMZALI */}
      <div
        className={`relative overflow-hidden rounded-xl border border-gold-500/35 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.14),transparent_60%),linear-gradient(180deg,#14100a,#0a0806)] ${
          compact ? "px-3 py-3" : "px-4 py-4"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
          <PenLine className="h-3.5 w-3.5" />
          <span>{p.signatureTitle}</span>
        </div>
        <p
          className={`mt-2 font-playfair italic leading-snug text-zinc-100 ${
            compact ? "text-[13px]" : "text-[15px] sm:text-base"
          }`}
        >
          &ldquo;{p.signatureMessage}&rdquo;
        </p>
        <div className="mt-1.5 flex justify-end">
          <span
            className={`font-signature leading-none text-gold-300 [text-shadow:0_0_14px_rgba(212,175,55,0.35)] ${
              compact ? "text-2xl" : "text-[1.9rem]"
            }`}
          >
            {p.signatureAuthor}
          </span>
        </div>
      </div>
    </div>
  );
}

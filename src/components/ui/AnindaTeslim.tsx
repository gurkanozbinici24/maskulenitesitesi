import { Truck, Zap } from "lucide-react";
import { KART_ODEME_AKTIF } from "@/config/cekicilikConfig";

/** E-kitap için "7/24 saniyeler içinde otomatik teslimat" rozeti. Kartla ödeme kapalıysa gösterilmez. */
export default function AnindaTeslim({
  size = "md",
  tip = "ekitap",
  className = "",
}: {
  size?: "sm" | "md";
  /** "ekitap": 7/24 e-posta teslimatı (kartla ödemeye bağlı), "fiziksel": 2 günde kapında */
  tip?: "ekitap" | "fiziksel";
  className?: string;
}) {
  const fiziksel = tip === "fiziksel";
  if (!fiziksel && !KART_ODEME_AKTIF) return null;
  const Ikon = fiziksel ? Truck : Zap;
  const sm = size === "sm";
  return (
    <div
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/15 text-emerald-200 font-bold ${
        sm ? "px-2.5 py-1 text-[10px] tracking-wide" : "px-3.5 py-1.5 text-[11px] sm:text-xs tracking-wide"
      } ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <Ikon className={`${sm ? "h-3 w-3" : "h-3.5 w-3.5"} ${fiziksel ? "" : "fill-emerald-300"} text-emerald-300 flex-shrink-0`} />
      <span>{fiziksel ? "İmzalı kitabın 2 gün içinde kapında" : "E-kitap 7/24 saniyeler içinde e-postanda"}</span>
    </div>
  );
}

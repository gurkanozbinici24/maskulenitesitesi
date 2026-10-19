import { CalendarCheck } from "lucide-react";

/** Görünür aylık kontenjan göstergesi (değerler config'den, elle güncellenir). */
export default function KontenjanBar({
  ay,
  total,
  left,
  tone = "gold",
}: {
  ay: string;
  total: number;
  left: number;
  tone?: "gold" | "zinc";
}) {
  const dolu = left <= 0;
  const oran = Math.min(100, Math.max(0, ((total - left) / total) * 100));
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-300">
          <CalendarCheck className={`h-3.5 w-3.5 ${tone === "gold" ? "text-gold-400" : "text-zinc-400"}`} />
          {ay} kontenjanı
        </span>
        {dolu ? (
          <span className="font-bold text-crimson-400">Doldu</span>
        ) : (
          <span className="font-bold text-white">
            {left}/{total} <span className="font-normal text-zinc-400">yer açık</span>
          </span>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${dolu ? "bg-crimson-500" : "bg-gradient-to-r from-gold-300 to-gold-600"}`}
          style={{ width: `${dolu ? 100 : Math.max(oran, 4)}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">
        {dolu
          ? "Bu ayın kontenjanı doldu. Başvurun bir sonraki aya sıralanır."
          : "Her ay sınırlı sayıda danışanla çalışıyorum. Her başvuru kabul edilmez."}
      </p>
    </div>
  );
}

/**
 * 3D görünümlü bölüm ayracı: üstte ince parlama, altta gölge, ortada parlayan elmas.
 * variant "split": sol yarı altın (Vazgeçilmez), sağ yarı kırmızı (Çekicilik).
 */
export default function SectionDivider({
  variant = "split",
}: {
  variant?: "split" | "gold" | "red";
}) {
  const left =
    variant === "red"
      ? "from-transparent via-crimson-700 to-crimson-500"
      : "from-transparent via-gold-700 to-gold-400";
  const right =
    variant === "gold"
      ? "from-gold-400 via-gold-700 to-transparent"
      : "from-crimson-500 via-crimson-700 to-transparent";
  const leftGlow = variant === "red" ? "bg-crimson-500/30" : "bg-gold-500/30";
  const rightGlow = variant === "gold" ? "bg-gold-500/30" : "bg-crimson-600/35";
  const gem =
    variant === "split"
      ? "bg-[linear-gradient(135deg,#f5d77a_0%,#c9a55c_45%,#b91c1c_55%,#5c0000_100%)]"
      : variant === "gold"
      ? "bg-[linear-gradient(135deg,#fdf3c8_0%,#d4af37_50%,#7a5a16_100%)]"
      : "bg-[linear-gradient(135deg,#fca5a5_0%,#dc2626_50%,#5c0000_100%)]";

  return (
    <div aria-hidden="true" className="relative z-20 h-0 w-full">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2">
        {/* Yumuşak ışık hâlesi */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-10 -translate-y-1/2">
          <div className={`absolute left-0 top-0 h-full w-1/2 blur-2xl ${leftGlow}`} />
          <div className={`absolute right-0 top-0 h-full w-1/2 blur-2xl ${rightGlow}`} />
        </div>

        {/* Kabartmalı çizgi: üst parlama + renkli gövde + alt gölge */}
        <div className="relative flex h-[5px] w-full">
          <div className={`h-full w-1/2 bg-gradient-to-r ${left}`} />
          <div className={`h-full w-1/2 bg-gradient-to-r ${right}`} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[3px] bg-gradient-to-b from-black/80 to-transparent" />
        </div>

        {/* Ortadaki 3D elmas */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-4 w-4 rotate-45 rounded-[2px] border border-white/30 shadow-[0_0_18px_rgba(212,175,55,0.7),0_0_18px_rgba(220,38,38,0.5),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.5)] ${gem}`}
          />
        </div>
      </div>
    </div>
  );
}

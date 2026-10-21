/**
 * Kitabın arkasından yukarı süzülen altın/kor kıvılcımlar (sadece CSS, hafif).
 * tema: "kitap1" altın, "kitap2" kırmızı-altın kor.
 */
const PARCALAR = [
  { l: 8, s: 3, d: 0, t: 4.2, x: -30 },
  { l: 16, s: 2, d: 1.4, t: 3.6, x: 20 },
  { l: 24, s: 4, d: 2.6, t: 5.0, x: -10 },
  { l: 32, s: 2, d: 0.8, t: 3.9, x: 35 },
  { l: 40, s: 3, d: 3.1, t: 4.6, x: -25 },
  { l: 48, s: 5, d: 1.9, t: 5.4, x: 10 },
  { l: 56, s: 2, d: 0.3, t: 3.4, x: -40 },
  { l: 63, s: 3, d: 2.2, t: 4.4, x: 25 },
  { l: 70, s: 4, d: 3.6, t: 5.2, x: -15 },
  { l: 77, s: 2, d: 1.1, t: 3.7, x: 30 },
  { l: 84, s: 3, d: 2.9, t: 4.8, x: -20 },
  { l: 91, s: 2, d: 0.6, t: 4.0, x: 15 },
  { l: 20, s: 2, d: 4.0, t: 4.3, x: 40 },
  { l: 52, s: 3, d: 4.4, t: 4.9, x: -35 },
  { l: 80, s: 2, d: 4.8, t: 3.8, x: 5 },
];

export default function Kivilcimlar({ tema = "kitap1", className = "" }: { tema?: "kitap1" | "kitap2"; className?: string }) {
  const renk =
    tema === "kitap1"
      ? ["#fff3c4", "#f5d76e", "#d4af37"]
      : ["#ffd8a8", "#f59e0b", "#ef4444"];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`} aria-hidden="true">
      {PARCALAR.map((p, i) => {
        const c = renk[i % renk.length];
        return (
          <span
            key={i}
            className="kivilcim"
            style={
              {
                left: `${p.l}%`,
                width: p.s,
                height: p.s,
                background: c,
                boxShadow: `0 0 ${p.s * 3}px ${p.s}px ${c}`,
                "--kd": `${p.d}s`,
                "--ks": `${p.t}s`,
                "--kx": `${p.x}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCheck, PenLine, Quote, ShieldCheck, X, Zap } from "lucide-react";
import { ThemeSectionHeader } from "./ui/ThemeSystem";
import { FEATURED, FLOATING, MESSAGES, PHONE_STORY, PHOTOS, type Cat } from "@/config/readersData";

/**
 * Gerçek okurlar bölümü:
 *  1) Okur fotoğrafları (iki sıra akan duvar)
 *  2) Sayaç şeridi
 *  3) "Canlı WhatsApp Sahnesi": 3D telefon, içinde gerçek ekran görüntüleri hikâye gibi akar; etrafta süzülen gerçek mesajlar
 *  4) Öne çıkan yorum
 *  5) Filtrelenebilir mesaj duvarı (orijinal ekran görüntüleri, hepsi aynı ölçekte)
 */

const TABS: { key: "tumu" | Cat; label: string; icon?: typeof Zap }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "kargo", label: "Flash Hızda Kargo", icon: Zap },
  { key: "imza", label: "İsme Özel İmza", icon: PenLine },
  { key: "yorum", label: "Okur Yorumları", icon: Quote },
];
const CAT_LABEL: Record<Cat, string> = { kargo: "Flash Hızda Kargo", imza: "İsme Özel İmza", yorum: "Okur Yorumu" };
const CAT_STYLE: Record<Cat, string> = {
  kargo: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  imza: "border-gold-400/50 bg-gold-500/10 text-gold-300",
  yorum: "border-white/15 bg-white/5 text-zinc-300",
};
/** Ekran görüntüleri 1.5x çekildi: hepsi bu oranla küçültülünce gerçek WhatsApp boyutunda, eşit puntoda görünür */
const SHOT_SCALE = 1 / 1.5;

/* ---------------------------------------------------------------- Sayaç */
function Counter({ to, decimals = 0, prefix = "", suffix = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {v.toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------- WhatsApp varsayılan profil simgesi */
export function WaAvatar({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 212 212" className="flex-shrink-0 rounded-full" aria-hidden>
      <path fill="#6a7175" d="M106 0C47.5 0 0 47.5 0 106s47.5 106 106 106 106-47.5 106-106S164.5 0 106 0z" />
      <path fill="#cfd4d6" d="M173.6 164.9c-16.9 19.6-41.8 32-69.6 32s-52.7-12.4-69.6-32c8.4-17.3 25.7-29.6 46.1-31.5 7 4.3 14.9 6.6 23.5 6.6s16.5-2.3 23.5-6.6c20.4 1.9 37.7 14.2 46.1 31.5zM106 46.2c21.6 0 39.1 17.5 39.1 39.1S127.6 124.4 106 124.4 66.9 106.9 66.9 85.3 84.4 46.2 106 46.2z" />
    </svg>
  );
}

const byId = (id: string) => MESSAGES.find((m) => m.id === id)!;

/* ---------------------------------------------------------------- Canlı WhatsApp Sahnesi */
function PhoneStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(false);
  const STORY_MS = 4200;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % PHONE_STORY.length), STORY_MS);
    return () => clearTimeout(t);
  }, [idx, active]);

  // Fare ile 3D eğim (masaüstü); telefonda sürekli hafif salınım CSS ile
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }, []);
  const onLeave = () => {
    stageRef.current?.style.setProperty("--mx", "0");
    stageRef.current?.style.setProperty("--my", "0");
  };

  const cur = byId(PHONE_STORY[idx]);
  const floatPos = [
    "left-0 top-[8%] -rotate-[4deg]",
    "right-0 top-[10%] rotate-[3deg]",
    "left-[3%] bottom-[10%] rotate-[3deg]",
    "right-[2%] bottom-[14%] -rotate-[3deg]",
  ];
  const depth = [30, 38, 22, 30];

  return (
    <div
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex min-h-[640px] max-w-7xl items-center justify-center [--mx:0] [--my:0] [perspective:1300px] sm:min-h-[700px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.24),rgba(31,163,90,0.08)_45%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-12 w-[320px] -translate-x-1/2 rounded-full bg-black/90 blur-2xl" />

      {/* Süzülen gerçek ekran görüntüleri (geniş ekran) */}
      {FLOATING.map((id, i) => {
        const m = byId(id);
        return (
          <div
            key={id}
            className={`pointer-events-none absolute hidden xl:block ${floatPos[i]}`}
            style={{
              transform: `translate3d(calc(var(--mx) * ${depth[i]}px), calc(var(--my) * ${depth[i] * 0.7}px), 0)`,
              transition: "transform 0.25s ease-out",
            }}
          >
            <div className="animate-[readerFloat_7s_ease-in-out_infinite]" style={{ animationDelay: `${i * -1.7}s` }}>
              <div className="rounded-2xl border border-white/10 bg-[#0b141a]/90 p-2 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.1)]">
                <div className="mb-1.5 flex items-center gap-2 px-1 pt-0.5">
                  <WaAvatar size={20} />
                  <span className="text-[11px] font-semibold text-[#e9edef]">{m.who}</span>
                  <span className="text-[10px] text-[#8696a0]">· {m.date}</span>
                </div>
                <Image
                  src={`/okurlar/mesaj/${m.id}.webp`}
                  alt={m.text}
                  width={m.w}
                  height={m.h}
                  style={{ width: Math.min(m.w * SHOT_SCALE, 400), height: "auto" }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* 3D Telefon: sürekli salınım + fareyle eğim */}
      <div className="relative z-10 animate-[phoneSway_9s_ease-in-out_infinite] [transform-style:preserve-3d]">
        <div
          className="[transform-style:preserve-3d]"
          style={{
            transform: "rotateY(calc(var(--mx) * 14deg)) rotateX(calc(var(--my) * -9deg))",
            transition: "transform 0.3s ease-out",
          }}
        >
          <div className="relative h-[600px] w-[300px] rounded-[50px] bg-gradient-to-b from-zinc-600 via-zinc-900 to-zinc-700 p-[10px] shadow-[0_60px_110px_-25px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.4),0_0_70px_-10px_rgba(212,175,55,0.4)] sm:h-[640px] sm:w-[320px]">
            <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-zinc-500" />
            <span className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-zinc-500" />
            <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-zinc-500" />

            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[40px] bg-[#0b141a]">
              {/* hikâye ilerleme çubukları */}
              <div className="absolute inset-x-3 top-9 z-20 flex gap-1">
                {PHONE_STORY.map((_, i) => (
                  <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
                    <span
                      key={`${idx}-${i}`}
                      className="block h-full bg-white"
                      style={
                        i < idx
                          ? { width: "100%" }
                          : i === idx
                            ? { width: "100%", animation: active ? `storyBar ${STORY_MS}ms linear both` : undefined }
                            : { width: 0 }
                      }
                    />
                  </span>
                ))}
              </div>
              {/* durum çubuğu */}
              <div className="relative flex h-8 flex-shrink-0 items-center justify-between bg-[#202c33] px-6 text-[10px] font-semibold text-white/80">
                <span>{cur.time}</span>
                <span className="absolute left-1/2 top-1.5 h-[20px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
                <span>5G ▮▮▮</span>
              </div>
              {/* gerçek sohbet başlığı (numara/kullanıcı adı kısmen gizli) */}
              <div className="flex flex-shrink-0 items-center gap-2.5 bg-[#202c33] px-3 pb-2.5 pt-4">
                <span className="text-lg leading-none text-[#aebac1]">‹</span>
                <WaAvatar size={34} />
                <div className="min-w-0 leading-tight">
                  <div key={cur.who} className="truncate text-[13.5px] font-semibold text-[#e9edef] animate-[readerPop_0.4s_ease-out_both]">
                    {cur.who}
                  </div>
                  <div className="truncate text-[10.5px] text-[#8696a0]">WhatsApp Business · okur mesajı</div>
                </div>
              </div>
              {/* mesaj alanı: orijinal ekran görüntüsü */}
              <button
                type="button"
                onClick={() => setIdx((i) => (i + 1) % PHONE_STORY.length)}
                aria-label="Sonraki okur mesajı"
                className="relative flex flex-1 flex-col justify-end gap-2 overflow-hidden px-2.5 pb-4 pt-3 text-left"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
                  backgroundSize: "22px 22px, 11px 11px",
                  backgroundPosition: "0 0, 6px 6px",
                }}
              >
                <span className="mx-auto rounded-md bg-[#182229] px-2.5 py-1 text-[10.5px] font-medium text-[#8696a0]">
                  {cur.date} 2026
                </span>
                <div key={cur.id} className="animate-[readerPop_0.5s_cubic-bezier(.2,.9,.3,1.2)_both]">
                  <Image
                    src={`/okurlar/mesaj/${cur.id}.webp`}
                    alt={cur.text}
                    width={cur.w}
                    height={cur.h}
                    style={{ width: Math.min(cur.w * SHOT_SCALE, 280), height: "auto" }}
                    className="max-w-full"
                  />
                </div>
              </button>
              <div className="flex flex-shrink-0 items-center gap-2 bg-[#0b141a] px-2.5 pb-5 pt-1.5">
                <div className="h-9 flex-1 rounded-full bg-[#202c33] px-3.5 text-[11.5px] leading-9 text-[#8696a0]">Mesaj</div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884]">
                  <CheckCheck className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            {/* cam yansıması + altın kenar */}
            <span className="pointer-events-none absolute inset-[10px] rounded-[40px] bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,transparent_26%,transparent_100%)]" />
            <span className="pointer-events-none absolute inset-0 rounded-[50px] bg-[linear-gradient(135deg,rgba(255,240,179,0.35),transparent_30%,transparent_70%,rgba(212,175,55,0.25))] opacity-70 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 3D eğilen mesaj kartı */
function TiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const move = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 9}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 11}deg`);
    el.style.setProperty("--px", `${px * 100}%`);
    el.style.setProperty("--py", `${py * 100}%`);
  };
  const leave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`group/card relative mb-5 break-inside-avoid [--px:50%] [--py:0%] [--rx:0deg] [--ry:0deg] [perspective:1000px] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))] group-hover/card:border-gold-400/50 group-hover/card:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95),0_0_40px_-10px_rgba(212,175,55,0.35)]">
        {/* imleci izleyen altın parıltı */}
        <span className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(420px_circle_at_var(--px)_var(--py),rgba(212,175,55,0.16),transparent_45%)]" />
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Ana bölüm */
export default function ReadersSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("tumu");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const featured = byId(FEATURED.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const i = TABS.findIndex((t) => t.key === tab);
    const b = tabRefs.current[i];
    if (b) setInd({ left: b.offsetLeft, width: b.offsetWidth });
  }, [tab]);
  useEffect(() => {
    const on = () => {
      const i = TABS.findIndex((t) => t.key === tab);
      const b = tabRefs.current[i];
      if (b) setInd({ left: b.offsetLeft, width: b.offsetWidth });
    };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [tab]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const wall = MESSAGES.filter((m) => m.id !== FEATURED.id);
  const filtered = wall.filter((m) => tab === "tumu" || m.cat === tab);
  const LIMIT = 8;
  const visible = showAll || tab !== "tumu" ? filtered : filtered.slice(0, LIMIT);
  const rowA = PHOTOS.filter((_, i) => i % 2 === 0);
  const rowB = PHOTOS.filter((_, i) => i % 2 === 1);

  const PhotoRow = ({ items, dir }: { items: typeof PHOTOS; dir: "left" | "right" }) => (
    <div className="group relative overflow-hidden">
      <div
        className={`flex w-max gap-3 sm:gap-4 ${
          dir === "left" ? "animate-marquee-left" : "animate-marquee-right"
        } group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {[...items, ...items].map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => setLightbox(p.src)}
            aria-label="Okur fotoğrafını büyüt"
            className="group/ph relative h-52 flex-shrink-0 overflow-hidden rounded-2xl bg-black p-[3px] shadow-[0_14px_40px_rgba(0,0,0,0.7)] ring-1 ring-gold-500/30 transition-all duration-500 hover:-translate-y-1.5 hover:ring-gold-400/80 hover:shadow-[0_18px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] sm:h-72"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            <Image
              src={p.src}
              alt="Okurumuzun elindeki Vazgeçilmez Olma Sanatı kitabı"
              fill
              sizes="(max-width: 640px) 130px, 220px"
              className="rounded-[13px] object-cover transition-transform duration-700 group-hover/ph:scale-105"
            />
            <span className="pointer-events-none absolute inset-[3px] rounded-[13px] bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.65)_100%)] shadow-[inset_0_0_25px_rgba(0,0,0,0.55)]" />
            <span className="pointer-events-none absolute inset-x-6 top-[3px] h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent" />
            <span className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-500/40 bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm">
              ✓ Okur
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="okurlar" className="relative overflow-hidden bg-matte-950 py-16 scroll-mt-24 sm:py-24">
      <style>{`
        @keyframes readerFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes readerPop { from { opacity: 0; transform: translateY(14px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes storyBar { from { transform: translateX(-100%) } to { transform: translateX(0) } }
        @keyframes phoneSway {
          0%,100% { transform: rotateY(-16deg) rotateX(6deg) translateY(0) }
          50% { transform: rotateY(10deg) rotateX(2deg) translateY(-14px) }
        }
      `}</style>
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[80%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap1"
          badgeText="Gerçek Okurlar · Gerçek Mesajlar"
          badgeIcon={<ShieldCheck className="h-3.5 w-3.5" />}
          title="Kitap Ellerinde,"
          highlightText="Sözleri Burada"
          subtitle="Okurlarımızın kitap eline ulaştığında gönderdiği fotoğraflar ve WhatsApp mesajları. Hiçbiri kurgu değil."
          className="!mb-10"
        />
      </div>

      {/* 1) Fotoğraf duvarı */}
      <div className="relative space-y-3 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] sm:space-y-4">
        <PhotoRow items={rowA} dir="left" />
        <PhotoRow items={rowB} dir="right" />
      </div>

      {/* 2) Sayaç şeridi */}
      <div className="relative mx-auto mt-12 max-w-4xl px-4">
        <div className="grid grid-cols-3 divide-x divide-gold-500/20 overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-r from-black/60 via-matte-900/80 to-black/60 shadow-[0_0_50px_-20px_rgba(212,175,55,0.5)] backdrop-blur">
          {[
            { node: <Counter to={200} suffix="+" />, label: "Kitap Satışı" },
            { node: <Counter to={200} suffix="+" />, label: "Memnun Okur" },
            { node: <Counter to={99.4} decimals={1} prefix="%" />, label: "Memnuniyet" },
          ].map((s) => (
            <div key={s.label} className="px-2 py-5 text-center sm:py-6">
              <div className="gold-text-gradient font-cinzel text-3xl font-bold leading-none sm:text-5xl">{s.node}</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3) Canlı WhatsApp sahnesi */}
      <div className="relative mt-6 px-4">
        <PhoneStage />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 4) Öne çıkan yorum: orijinal ekran görüntüsü + vurgulanan cümle */}
        <figure className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-gold-500/30 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.14),transparent_55%),linear-gradient(180deg,#14100a,#09070a)] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] sm:p-10 md:grid-cols-[auto_1fr]">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
          <div className="order-2 mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#0b141a] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9)] md:order-1">
            <div className="flex items-center gap-2 bg-[#202c33] px-3 py-2">
              <WaAvatar size={26} />
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-[#e9edef]">{featured.who}</div>
                <div className="text-[10px] text-[#8696a0]">{featured.date} 2026 · {featured.time}</div>
              </div>
            </div>
            <div className="p-3">
              <Image
                src={`/okurlar/mesaj/${featured.id}.webp`}
                alt={featured.text}
                width={featured.w}
                height={featured.h}
                style={{ width: featured.w * SHOT_SCALE, height: "auto" }}
                className="max-w-full"
              />
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <Quote className="absolute -left-3 -top-6 h-20 w-20 rotate-180 text-gold-500/15" />
            <div className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
              <Quote className="h-3.5 w-3.5" />
              Öne Çıkan Okur Yorumu
            </div>
            <blockquote className="relative font-playfair text-xl italic leading-snug text-zinc-100 sm:text-[1.7rem] sm:leading-[1.35]">
              “{FEATURED.pull}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-zinc-400">
              {featured.who} · {featured.date} 2026 · <span className="text-zinc-500">mesajın tamamı yanda, olduğu gibi</span>
            </figcaption>
          </div>
        </figure>

        {/* 5) Mesaj duvarı */}
        <div className="mt-16 flex justify-center">
          <div className="relative flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur [scrollbar-width:none]">
            <span
              className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 shadow-gold-glow transition-all duration-500 ease-[cubic-bezier(.2,.9,.3,1)]"
              style={{ left: ind.left, width: ind.width }}
            />
            {TABS.map(({ key, label, icon: Icon }, i) => (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setTab(key)}
                className={`relative z-10 inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 sm:px-5 sm:text-xs ${
                  tab === key ? "text-black" : "text-zinc-300 hover:text-gold-300"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 columns-1 gap-5 md:columns-2" key={tab}>
          {visible.map((m, i) => (
            <TiltCard key={m.id} delay={(i % 4) * 80}>
              <div className="flex items-center justify-between gap-2 border-b border-white/5 bg-[#202c33]/70 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <WaAvatar size={32} />
                  <div className="min-w-0 leading-tight">
                    <div className="truncate text-[12.5px] font-semibold text-[#e9edef]">{m.who}</div>
                    <div className="text-[10.5px] text-[#8696a0]">
                      {m.date} 2026 · {m.time}
                    </div>
                  </div>
                </div>
                <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${CAT_STYLE[m.cat]}`}>
                  {CAT_LABEL[m.cat]}
                </span>
              </div>
              <div
                className="px-3 py-3"
                style={{
                  backgroundColor: "#0b141a",
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              >
                <Image
                  src={`/okurlar/mesaj/${m.id}.webp`}
                  alt={m.text}
                  width={m.w}
                  height={m.h}
                  sizes="(max-width: 768px) 92vw, 450px"
                  style={{ width: m.w * SHOT_SCALE, height: "auto" }}
                  className="max-w-full"
                />
              </div>
            </TiltCard>
          ))}
        </div>

        {tab === "tumu" && !showAll && filtered.length > LIMIT && (
          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-black/50 px-7 py-3.5 text-sm font-bold text-gold-300 shadow-[0_0_30px_-10px_rgba(212,175,55,0.5)] transition-all hover:-translate-y-0.5 hover:bg-gold-500/10"
            >
              <CheckCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
              {filtered.length - LIMIT} mesaj daha göster
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[11px] text-zinc-500">
          Tüm mesajlar WhatsApp Business hattımıza gelen mesajların düzenlenmemiş ekran görüntüleridir. Okurlarımızın
          izniyle paylaşılmış, gizlilikleri için numara ve kullanıcı adlarının bir kısmı gizlenmiştir.
        </p>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button type="button" aria-label="Kapat" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[85vh] w-full max-w-md">
            <Image src={lightbox} alt="Okur fotoğrafı" fill sizes="(max-width: 640px) 100vw, 448px" quality={90} className="rounded-2xl object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

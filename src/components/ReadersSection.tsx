"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck, CheckCheck, Eye, PenLine, Quote, ShieldCheck, X, Zap } from "lucide-react";
import { ThemeSectionHeader } from "./ui/ThemeSystem";
import {
  FEATURED,
  FLOATING,
  MESSAGES,
  PHONE_CHAT,
  PHOTOS,
  type Cat,
  type ChatMsg,
} from "@/config/readersData";

/**
 * Gerçek okurlar bölümü:
 *  1) Okur fotoğrafları (iki sıra akan duvar)
 *  2) Sayaç şeridi
 *  3) "Canlı WhatsApp Sahnesi": 3D telefon + etrafında süzülen mesajlar (birebir okur metinleri)
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

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

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

/* ---------------------------------------------------------------- Telefon içi baloncuk */
function Bubble({ m, className = "" }: { m: ChatMsg | { time: string; text: string; quote?: ChatMsg["quote"] }; className?: string }) {
  return (
    <div className={`relative max-w-[88%] rounded-lg rounded-tl-none bg-[#202c33] px-2.5 pb-1.5 pt-1.5 text-[12.5px] leading-[1.35] text-[#e9edef] shadow-[0_1px_0.5px_rgba(0,0,0,0.3)] ${className}`}>
      <span className="absolute -left-1.5 top-0 h-0 w-0 border-r-[8px] border-t-[8px] border-r-transparent border-t-[#202c33]" style={{ borderRightColor: "transparent" }} />
      {m.quote && (
        <div className="mb-1 rounded-md border-l-4 border-[#d65a8b] bg-black/25 px-2 py-1">
          <div className="text-[11px] font-semibold text-[#d65a8b]">{m.quote.from}</div>
          <div className="text-[11.5px] text-[#aebac1]">{m.quote.text}</div>
        </div>
      )}
      <span className="whitespace-pre-wrap break-words">{m.text}</span>
      <span className="float-right ml-2 mt-1.5 translate-y-0.5 text-[10px] text-[#8696a0]">{m.time}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- Canlı WhatsApp Sahnesi */
function PhoneStage() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [active, setActive] = useState(false);

  // Sahne ekrana girince sohbet başlar
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setCount(PHONE_CHAT.length);
      return;
    }
    if (!active) return;
    let t: ReturnType<typeof setTimeout>;
    if (count < PHONE_CHAT.length) {
      setTyping(true);
      t = setTimeout(() => {
        setTyping(false);
        setCount((c) => c + 1);
      }, count === 0 ? 900 : 1700);
    } else {
      t = setTimeout(() => setCount(0), 5000);
    }
    return () => clearTimeout(t);
  }, [count, active, reduced]);

  // Fare ile 3D paralaks (sadece hassas imleçli cihazlarda)
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    },
    [reduced],
  );
  const onLeave = () => {
    stageRef.current?.style.setProperty("--mx", "0");
    stageRef.current?.style.setProperty("--my", "0");
  };

  const shown = PHONE_CHAT.slice(0, count);
  const floatPos = [
    "left-[2%] top-[10%] -rotate-3",
    "right-[1%] top-[6%] rotate-2",
    "left-[6%] bottom-[12%] rotate-2",
    "right-[5%] bottom-[16%] -rotate-2",
  ];
  const depth = [26, 34, 18, 28];

  return (
    <div
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex min-h-[620px] max-w-6xl items-center justify-center [--mx:0] [--my:0] [perspective:1400px] sm:min-h-[680px]"
    >
      {/* Arka ışık */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),rgba(31,163,90,0.08)_45%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-10 w-[300px] -translate-x-1/2 rounded-full bg-black/80 blur-2xl" />

      {/* Süzülen mesajlar (masaüstü) */}
      {FLOATING.map((f, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute hidden w-[270px] lg:block xl:w-[300px] ${floatPos[i]}`}
          style={{
            transform: `translate3d(calc(var(--mx) * ${depth[i]}px), calc(var(--my) * ${depth[i] * 0.7}px), 0)`,
            transition: "transform 0.25s ease-out",
          }}
        >
          <div className={reduced ? "" : "animate-[readerFloat_7s_ease-in-out_infinite]"} style={{ animationDelay: `${i * -1.7}s` }}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,175,55,0.08)] backdrop-blur-md">
              <div className="mb-1.5 flex items-center gap-1.5 px-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-300/90">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                {f.tag}
              </div>
              <Bubble m={f} className="!max-w-full" />
            </div>
          </div>
        </div>
      ))}

      {/* 3D Telefon */}
      <div
        className="relative z-10"
        style={{
          transform: reduced
            ? undefined
            : "rotateY(calc(var(--mx) * 12deg - 8deg)) rotateX(calc(var(--my) * -8deg + 4deg))",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="relative h-[580px] w-[290px] rounded-[48px] bg-gradient-to-b from-zinc-700 via-zinc-900 to-zinc-800 p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.95),0_0_0_1px_rgba(212,175,55,0.35),0_0_60px_-10px_rgba(212,175,55,0.35)] sm:h-[620px] sm:w-[310px]">
          {/* yan tuşlar */}
          <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-zinc-600" />
          <span className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-zinc-600" />
          <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-zinc-600" />
          {/* altın kenar ışığı */}
          <span className="pointer-events-none absolute inset-0 rounded-[48px] bg-[linear-gradient(135deg,rgba(255,240,179,0.35),transparent_30%,transparent_70%,rgba(212,175,55,0.25))] opacity-70 mix-blend-overlay" />

          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-[#0b141a]">
            {/* durum çubuğu + çentik */}
            <div className="relative flex h-7 flex-shrink-0 items-center justify-between bg-[#202c33] px-6 text-[10px] font-semibold text-white/80">
              <span>9:41</span>
              <span className="absolute left-1/2 top-1.5 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
              <span>5G ▮▮▮</span>
            </div>
            {/* sohbet başlığı */}
            <div className="flex flex-shrink-0 items-center gap-2.5 bg-[#202c33] px-3 pb-2.5 pt-1">
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-gold-300 to-gold-700">
                <Image src="/vazgecilmez-yeni-kapak.jpg" alt="" fill sizes="36px" className="object-cover" />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-[13.5px] font-semibold text-[#e9edef]">Okur Mesajları</div>
                <div className="truncate text-[10.5px] text-[#8696a0]">
                  {typing ? <span className="text-emerald-400">bir okur yazıyor…</span> : "gerçek mesajlardan derlendi"}
                </div>
              </div>
            </div>
            {/* mesajlar */}
            <div
              className="relative flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-3 pt-2"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "22px 22px, 11px 11px",
                backgroundPosition: "0 0, 6px 6px",
              }}
            >
              {shown.map((m, i) => {
                const newDay = i === 0 || shown[i - 1].day !== m.day;
                return (
                  <div key={`${count}-${i}`} className="flex flex-col animate-[readerPop_0.45s_cubic-bezier(.2,.9,.3,1.2)_both]">
                    {newDay && (
                      <span className="mx-auto mb-1 mt-1 rounded-md bg-[#182229] px-2 py-0.5 text-[10px] font-medium text-[#8696a0]">
                        {m.day}
                      </span>
                    )}
                    <Bubble m={m} />
                  </div>
                );
              })}
              {typing && (
                <div className="flex w-14 items-center justify-center gap-1 rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>
            {/* yazma çubuğu (dekoratif) */}
            <div className="flex flex-shrink-0 items-center gap-2 bg-[#0b141a] px-2.5 pb-4 pt-1.5">
              <div className="h-8 flex-1 rounded-full bg-[#202c33] px-3 text-[11px] leading-8 text-[#8696a0]">Mesaj</div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884]">
                <CheckCheck className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          {/* cam yansıması */}
          <span className="pointer-events-none absolute inset-[10px] rounded-[38px] bg-[linear-gradient(115deg,rgba(255,255,255,0.09)_0%,transparent_28%,transparent_100%)]" />
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
  const [showOriginal, setShowOriginal] = useState(false);
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
            { node: <Counter to={MESSAGES.length} />, label: "Okur Mesajı" },
            { node: <Counter to={PHOTOS.length} />, label: "Okur Fotoğrafı" },
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
        {/* 4) Öne çıkan yorum */}
        <figure className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.14),transparent_55%),linear-gradient(180deg,#14100a,#09070a)] p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.95)] sm:p-12">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
          <Quote className="absolute -left-2 -top-2 h-28 w-28 rotate-180 text-gold-500/10 sm:h-40 sm:w-40" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
              <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
              Öne Çıkan Okur Yorumu · {FEATURED.day}
            </div>
            {!showOriginal ? (
              <blockquote className="font-playfair text-[1.05rem] italic leading-relaxed text-zinc-100 sm:text-[1.35rem] sm:leading-[1.7]">
                “{FEATURED.text}”
              </blockquote>
            ) : (
              <div className="flex justify-center rounded-2xl bg-[#0b141a] p-4">
                <Image
                  src={`/okurlar/mesaj/${FEATURED.id}.webp`}
                  alt={FEATURED.text}
                  width={532}
                  height={456}
                  style={{ width: 532 * SHOT_SCALE * 1.15, height: "auto" }}
                  className="max-w-full"
                />
              </div>
            )}
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gold-500/15 pt-5">
              <span className="text-sm text-zinc-400">
                Vazgeçilmez Olma Sanatı okuru · WhatsApp, {FEATURED.time}
              </span>
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-300 transition-colors hover:bg-gold-500/10"
              >
                <Eye className="h-3.5 w-3.5" />
                {showOriginal ? "Metne dön" : "Orijinal mesajı gör"}
              </button>
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
              <div className="flex items-center justify-between gap-2 border-b border-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-zinc-500 to-zinc-800 ring-1 ring-white/10">
                    <span className="absolute inset-0 m-auto h-3 w-3 -translate-y-1 rounded-full bg-zinc-300/50 blur-[1px]" />
                    <span className="absolute bottom-[-6px] left-1/2 h-4 w-6 -translate-x-1/2 rounded-full bg-zinc-300/40 blur-[1px]" />
                  </span>
                  <div className="leading-tight">
                    <div className="flex items-center gap-1 text-[12px] font-semibold text-zinc-100">
                      Doğrulanmış Okur <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[10.5px] text-zinc-500">WhatsApp · {m.date}</div>
                  </div>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${CAT_STYLE[m.cat]}`}>
                  {CAT_LABEL[m.cat]}
                </span>
              </div>
              <div
                className="px-3 py-3"
                style={{
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
          Mesaj ve fotoğraflar okurlarımızın izniyle, isimleri ve numaraları gizlenerek paylaşılmıştır. Telefon
          ekranındaki mesajlar, farklı okurlardan gelen gerçek mesajların birebir metnidir.
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

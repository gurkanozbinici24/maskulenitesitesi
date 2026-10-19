"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Crown,
  Headphones,
  Instagram,
  Landmark,
  Gift,
  Lock,
  MessageCircle,
  Send,
  Infinity as InfinityIcon,
  Users,
  ShieldCheck,
  Sparkles,
  Target,
  Video,
  Zap,
} from "lucide-react";
import { ThemeButton } from "./ui/ThemeSystem";
import { DANISMANLIK_CONFIG as C } from "@/config/cekicilikConfig";

/**
 * Özel Danışmanlık (VIP) sayfası — premium yeniden tasarım.
 * Fiyat, süre ve platformlar DANISMANLIK_CONFIG'den gelir.
 */

const AGENDA = [
  { min: "0–10", icon: Headphones, title: "Durumunu dinliyorum", text: "Yaşadığın süreci baştan sona, hiçbir yargı olmadan anlatıyorsun. Gerçek resmi birlikte ortaya çıkarıyoruz." },
  { min: "10–30", icon: Target, title: "Kriz ve güç dinamikleri analizi", text: "Yapılan hataları, sana oynanan oyunları ve ilişkideki dengeyi tek tek çözümlüyoruz." },
  { min: "30–40", icon: Zap, title: "Sana özel aksiyon planı", text: "Ne söyleyeceğin, ne zaman geri çekileceğin, sınırlarını nasıl koruyacağın: net ve uygulanabilir adımlar." },
  { min: "40–45", icon: Sparkles, title: "Soruların ve sonraki adım", text: "Aklında kalan her soruyu soruyorsun, seanstan ne yapacağını bilerek ayrılıyorsun." },
];

const STEPS = [
  { icon: Send, title: "Başvurunu gönder", text: "Aşağıdaki kısa formu doldur; başvurun hazır mesaj olarak WhatsApp'tan bize ulaşsın." },
  { icon: CalendarCheck, title: "Değerlendirme ve dönüş", text: "Her başvuruyu tek tek okuyup WhatsApp'tan dönüş yapıyor, randevu saatini birlikte belirliyoruz." },
  { icon: Landmark, title: "Ödemeyi yap", text: "Havale/EFT ile ödemeni yap, yerin kesinleşsin." },
  { icon: Video, title: "Başlıyoruz", text: "Saatinde Google Meet linki ya da WhatsApp sesli/görüntülü arama ile bağlanıyoruz." },
];

function Check({ gold = false }: { gold?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${gold ? "border-gold-400 bg-gold-400 text-black" : "border-gold-500/50 bg-gold-500/15 text-gold-300"}`}>
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
        <path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ConsultationSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 10}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }, []);
  const onLeave = () => {
    cardRef.current?.style.setProperty("--ry", "0deg");
    cardRef.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section id="danismanlik" className="relative scroll-mt-20 overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16">
        <style>{`
          @keyframes consFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
          @keyframes consSway { 0%,100% { transform: rotateY(-7deg) rotateX(3deg) } 50% { transform: rotateY(6deg) rotateX(1deg) } }
        `}</style>
        <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[620px] rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[560px] rounded-full bg-amber-600/10 blur-[150px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
          {/* Sol */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-black/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
              <Crown className="h-3.5 w-3.5" /> VIP Birebir Strateji Seansı
            </div>
            <h1 className="mt-5 font-cinzel text-[clamp(2.1rem,5.2vw,3.9rem)] font-bold leading-[1.05] text-white">
              İlişkinde <span className="gold-text-gradient">kontrolü</span>
              <br /> geri al.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Bu bir dertleşme değil; durumunu, sana oynanan oyunları ve ilişkideki güç dengesini birlikte çözümlediğimiz{" "}
              <strong className="text-white">{C.durationMin} dakikalık stratejik bir seans</strong>. Erkek ya da kadın, masadan ne
              yapacağını bilerek kalkarsın.
            </p>

            {/* Bilgi çipleri */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: Clock, t: `${C.durationMin} dakika birebir` },
                { icon: Video, t: "Google Meet veya WhatsApp" },
                { icon: Headphones, t: "Sesli ya da görüntülü" },
                { icon: Lock, t: "%100 gizlilik" },
              ].map(({ icon: I, t }) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-zinc-200 backdrop-blur">
                  <I className="h-4 w-4 text-gold-400" /> {t}
                </span>
              ))}
            </div>

            {/* Fiyat + CTA */}
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex items-baseline gap-2">
                <span className="relative mr-1 font-cinzel text-2xl font-bold text-zinc-500">
                  {C.totalValueLabel}
                  <span className="absolute left-[-6%] top-1/2 h-[2px] w-[112%] -rotate-6 bg-crimson-500" />
                </span>
                <span className="font-cinzel text-5xl font-bold text-white [text-shadow:0_0_30px_rgba(212,175,55,0.4)] sm:text-6xl">{C.priceLabel}</span>
                <span className="text-xl font-bold text-gold-400">{C.currency}</span>
                <span className="ml-1 text-sm text-zinc-500">/ {C.durationMin} dk seans</span>
              </div>
              <ThemeButton theme="kitap1" variant="primary" size="lg" href="#basvuru" className="font-black">
                <Send className="h-5 w-5" />
                <span>Başvur</span>
                <ArrowRight className="h-4 w-4" />
              </ThemeButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-black">
                <Gift className="h-3.5 w-3.5" /> İlk seansına özel hediye
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-100">
                📚 2 e-kitap <span className="text-gold-300">(1.200 TL değerinde)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                💬 1 hafta WhatsApp desteği <span className="text-emerald-300">(3.500 TL değerinde)</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">İlk seansında toplam {C.totalValueLabel} TL değerindeki paket, yalnızca {C.priceLabel} TL.</p>
            <a href="#paketler" className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-4 py-2 text-xs font-semibold text-gold-200 transition-colors hover:bg-gold-500/10">
              <Crown className="h-4 w-4 text-gold-400" /> {C.vip.name}: ayda {C.vip.sessionsPerMonth} seans + 7/24 canlı mesaj koçluğu · {C.vip.priceLabel} TL / {C.vip.period}
            </a>
            <a
              href={C.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-gold-300"
            >
              <Instagram className="h-4 w-4" /> Önce sorun mu var? Instagram&apos;dan yaz
            </a>
          </div>

          {/* Sağ: 3D portre kartı */}
          <div className="relative lg:col-span-5 [perspective:1200px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="motion-safe:animate-[consSway_10s_ease-in-out_infinite] [transform-style:preserve-3d]">
              <div
                ref={cardRef}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="group relative mx-auto max-w-md [--gx:50%] [--gy:0%] [--rx:0deg] [--ry:0deg] [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] transition-transform duration-300 ease-out"
              >
                <div className="relative overflow-hidden rounded-[28px] p-[2px] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.95),0_0_60px_-10px_rgba(212,175,55,0.35)] [background:linear-gradient(135deg,#f5e2a8,#8c6200_35%,#2a1d08_55%,#d4af37)]">
                  <div className="relative overflow-hidden rounded-[26px] bg-black">
                    <Image
                      src="/insta_profile_800k.jpg"
                      alt="Gürkan Özbinici — birebir strateji seansı"
                      width={1254}
                      height={1254}
                      priority
                      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(500px_circle_at_var(--gx)_var(--gy),rgba(255,226,150,0.18),transparent_45%)]" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 pt-16">
                      <div className="font-cinzel text-lg font-bold text-white">Gürkan Özbinici</div>
                      <div className="text-xs font-semibold text-gold-300">@maskulenitesitesi · 800K+ topluluk</div>
                    </div>
                  </div>
                </div>

                {/* Süzülen rozetler */}
                <div className="absolute -left-4 top-8 [transform:translateZ(60px)] sm:-left-10">
                  <div className="motion-safe:animate-[consFloat_6s_ease-in-out_infinite] rounded-2xl border border-gold-500/40 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-md">
                    <div className="font-cinzel text-2xl font-bold leading-none text-gold-300">{C.durationMin} dk</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Birebir seans</div>
                  </div>
                </div>
                <div className="absolute -right-3 top-1/2 [transform:translateZ(80px)] sm:-right-8">
                  <div className="motion-safe:animate-[consFloat_7s_ease-in-out_infinite] rounded-2xl border border-emerald-500/40 bg-black/80 px-4 py-3 shadow-2xl backdrop-blur-md [animation-delay:-2s]">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-300">
                      <ShieldCheck className="h-4 w-4" /> Gizlilik
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Her şey aramızda</div>
                  </div>
                </div>
                <div className="absolute -bottom-5 left-8 [transform:translateZ(50px)]">
                  <div className="motion-safe:animate-[consFloat_8s_ease-in-out_infinite] flex items-center gap-2 rounded-full border border-white/15 bg-black/85 px-4 py-2 text-xs font-semibold text-zinc-200 shadow-2xl backdrop-blur-md [animation-delay:-4s]">
                    <Video className="h-4 w-4 text-gold-400" /> Google Meet · WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEANS AKIŞI ================= */}
      <section className="relative border-t border-white/5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">{C.durationMin} dakikada neler oluyor?</div>
            <h2 className="font-cinzel text-[clamp(1.7rem,4vw,2.6rem)] font-bold text-white">
              Seansın <span className="gold-text-gradient">Akışı</span>
            </h2>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-400/70 via-gold-500/30 to-transparent md:left-0 md:right-0 md:top-[22px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r" />
            <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
              {AGENDA.map((a) => (
                <li key={a.min} className="relative flex gap-4 md:flex-col">
                  <span className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold-400/60 bg-gradient-to-br from-gold-300 to-gold-700 text-black shadow-gold-glow">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5 transition-colors hover:border-gold-500/40">
                    <div className="font-mono text-xs font-bold text-gold-400">{a.min}. dakika</div>
                    <h3 className="mt-1 text-base font-bold text-white">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= PAKETLER ================= */}
      <section id="paketler" className="relative scroll-mt-24 py-16 sm:py-24">
        <style>{`@keyframes vipSpin { to { transform: rotate(360deg) } }`}</style>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Sana uygun yol</div>
            <h2 className="font-cinzel text-[clamp(1.7rem,4vw,2.6rem)] font-bold text-white">
              Birebir <span className="gold-text-gradient">Paketler</span>
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">Her iki paket de başvuru ile. Başvurunu gönder, dönüş yapalım.</p>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            {/* Strateji Seansı */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] sm:p-9">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                <Target className="h-4 w-4" /> Tek seans
              </div>
              <h3 className="mt-3 font-cinzel text-2xl font-bold text-white">Birebir Strateji Seansı</h3>
              <p className="mt-2 text-sm text-zinc-400">Belirli bir kriz ya da karar anı için, tek bir derin görüşme.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="relative mr-1 font-cinzel text-xl font-bold text-zinc-500">
                  {C.totalValueLabel}
                  <span className="absolute left-[-6%] top-1/2 h-[2px] w-[112%] -rotate-6 bg-crimson-500" />
                </span>
                <span className="font-cinzel text-5xl font-bold text-white">{C.priceLabel}</span>
                <span className="text-xl font-bold text-gold-400">{C.currency}</span>
                <span className="text-sm text-zinc-500">/ {C.durationMin} dk</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-gold-300">İlk seansına özel: toplam {C.totalValueLabel} TL değerinde paket</div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-b from-gold-500/15 to-black/40 p-4">
                  <span className="absolute right-2 top-2 rounded-full bg-gold-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">İlk seansa</span>
                  <Gift className="h-5 w-5 text-gold-400" />
                  <div className="mt-2 font-cinzel text-2xl font-bold text-white">2 e-kitap</div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400">iki kitabın dijital sürümü</div>
                  <div className="mt-2 text-xs font-bold text-gold-300">1.200 TL değerinde</div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-500/15 to-black/40 p-4">
                  <span className="absolute right-2 top-2 rounded-full bg-emerald-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">İlk seansa</span>
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  <div className="mt-2 font-cinzel text-2xl font-bold text-white">1 hafta</div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400">WhatsApp desteği</div>
                  <div className="mt-2 text-xs font-bold text-emerald-300">3.500 TL değerinde</div>
                  <div className="text-[10px] text-zinc-500">seansla ilgili soruların için</div>
                </div>
              </div>
              <ul className="mb-8 mt-6 space-y-3 text-sm text-zinc-200">
                {[
                  `${C.durationMin} dakika kesintisiz birebir görüşme`,
                  "Google Meet veya WhatsApp, sesli ya da görüntülü",
                  "Durumuna özel kriz ve güç dinamikleri analizi",
                  "Uygulanabilir, kişiye özel aksiyon planı",
                  "Konuşulan her şey %100 gizli kalır",
                  "İlk seansına özel hediye: Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı e-kitapları (1.200 TL değerinde)",
                  "İlk seansına özel hediye: seansla ilgili soruların için 1 hafta WhatsApp desteği (3.500 TL değerinde)",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
              <ThemeButton theme="kitap1" variant="secondary" size="lg" fullWidth href="#basvuru" className="mt-auto font-black">
                <Send className="h-5 w-5" />
                <span>Seans için başvur</span>
              </ThemeButton>
            </div>

            {/* VIP Mentörlük */}
            <div className="group relative rounded-3xl p-[2px] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.95),0_0_70px_-15px_rgba(212,175,55,0.55)]">
              {/* dönen altın çerçeve */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[vipSpin_6s_linear_infinite] [background:conic-gradient(from_0deg,transparent_0deg,#f5e2a8_40deg,#d4af37_80deg,transparent_140deg,transparent_220deg,#8c6200_280deg,transparent_340deg)]" />
              </div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.22),transparent_55%),linear-gradient(180deg,#17110a,#060406)] p-7 sm:p-9">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    <Crown className="h-4 w-4" /> Aylık mentörlük
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-gold-300 to-gold-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                    En kapsamlı
                  </span>
                </div>
                <h3 className="mt-3 font-cinzel text-3xl font-bold text-white">{C.vip.name}</h3>
                <p className="mt-2 text-sm text-zinc-300">Süreç boyunca yanında olduğum, birebir ve sürekli bir yol arkadaşlığı.</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-cinzel text-5xl font-bold text-white [text-shadow:0_0_30px_rgba(212,175,55,0.5)] sm:text-6xl">{C.vip.priceLabel}</span>
                  <span className="text-xl font-bold text-gold-400">{C.currency}</span>
                  <span className="text-sm text-zinc-400">/ {C.vip.period}</span>
                </div>
                <p className="mt-2 rounded-xl border border-gold-500/20 bg-black/30 px-3 py-2 text-xs leading-relaxed text-zinc-300">
                  Tek tek alsan: 4 seans <span className="text-white">(14.000 TL)</span> + 4 hafta mesaj koçluğu{" "}
                  <span className="text-white">(14.000 TL)</span> + acil kriz görüşmesi + imzalı kitaplar.{" "}
                  <span className="font-semibold text-gold-300">Hepsi tek pakette, aylık {C.vip.priceLabel} TL.</span>
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gold-500/30 bg-black/40 p-4">
                    <Users className="h-5 w-5 text-gold-400" />
                    <div className="mt-2 font-cinzel text-2xl font-bold text-white">{C.vip.sessionsPerMonth} seans</div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">her ay, birebir</div>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/30 bg-black/40 p-4">
                    <InfinityIcon className="h-5 w-5 text-emerald-400" />
                    <div className="mt-2 font-cinzel text-2xl font-bold text-white">7/24</div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">Canlı mesaj koçluğu</div>
                  </div>
                  <div className="relative col-span-2 overflow-hidden rounded-2xl border border-gold-400/60 bg-gradient-to-b from-gold-500/20 to-black/40 p-4 sm:col-span-1">
                    <span className="absolute right-2 top-2 rounded-full bg-gold-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">Hediye</span>
                    <Gift className="h-5 w-5 text-gold-300" />
                    <div className="mt-2 font-cinzel text-2xl font-bold text-white">2 kitap</div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-400">ismine imzalı, kapına</div>
                  </div>
                </div>
                <ul className="mt-6 space-y-3.5 text-sm text-zinc-100">
                  {[
                    { t: `Her ay ${C.vip.sessionsPerMonth} birebir seans`, d: "Google Meet veya WhatsApp, sesli ya da görüntülü." },
                    { t: "7/24 Canlı Mesaj Koçluğu", d: `Karşı tarafla yazışmanın ekran görüntüsünü at; ne cevap vereceğini, ne zaman susacağını birlikte belirleyelim. ${C.vip.supportNote}` },
                    { t: "Her seans sonrası yazılı aksiyon planı", d: "Konuştuklarımızın özeti ve atacağın adımlar elinde kalır." },
                    { t: "Ayda 1 acil kriz görüşmesi", d: "Plan dışı, 15 dakikalık hızlı bir arama hakkı." },
                    { t: "Hoş geldin hediyesi", d: "İki kitap da ismine özel imzalı olarak kapına gelir." },
                    { t: "%100 gizlilik", d: "Konuşulan her şey aramızda kalır." },
                  ].map(({ t, d }) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check gold />
                      <span>
                        <span className="font-semibold text-white">{t}</span>
                        <span className="block text-xs leading-relaxed text-zinc-400">{d}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <ThemeButton theme="kitap1" variant="primary" size="lg" fullWidth href="#basvuru" className="mt-8 font-black">
                  <Crown className="h-5 w-5" />
                  <span>VIP Mentörlüğe başvur</span>
                </ThemeButton>
              </div>
            </div>
          </div>

          {/* Adımlar */}
          <div className="mt-20">
            <div className="mb-8 text-center">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Nasıl işliyor?</div>
              <h2 className="font-cinzel text-[clamp(1.6rem,3.5vw,2.3rem)] font-bold text-white">
                Başvurudan <span className="gold-text-gradient">İlk Seansa</span>
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-0.5 hover:border-gold-500/40">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-black text-black">{i + 1}</span>
                  <div className="mt-3 flex items-center gap-2 font-bold text-white">
                    <s.icon className="h-4 w-4 text-gold-400" /> {s.title}
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

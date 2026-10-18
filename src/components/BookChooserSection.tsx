"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ThemeBadge, ThemeButton } from "./ui/ThemeSystem";
import { scrollToSection } from "@/lib/scrollToSection";
import { VAZGECILMEZ_CONFIG, CEKICILIK_SANATI_CONFIG } from "@/config/cekicilikConfig";

/**
 * "Hangi kitap senin için?" — karşılamanın hemen altında iki kitaba yönlendiren bölünmüş ekran.
 * Sol: Vazgeçilmez Olma Sanatı (erkekler, altın). Sağ: Çekicilik Sanatı (kadınlar, kırmızı).
 */
const BOOKS = [
  {
    theme: "kitap1" as const,
    target: "vazgecilmez",
    label: "ERKEKLER İÇİN",
    title: "Vazgeçilmez Olma Sanatı",
    tagline: "İlişkide kuralları koyan taraf ol.",
    cover: VAZGECILMEZ_CONFIG.coverImage,
    points: [
      "Manipülasyona karşı sarsılmaz bir çerçeve kur",
      "İlişkide sınırlarını net ve tavizsiz çiz",
      "Kadın psikolojisini ve çekim dinamiklerini çöz",
    ],
    cta: "Vazgeçilmez'i Keşfet",
  },
  {
    theme: "kitap2" as const,
    target: "cekicilik-sanati",
    label: "KADINLAR İÇİN",
    title: "Çekicilik Sanatı",
    tagline: "Arzu duyulan, vazgeçilmez kadın ol.",
    cover: CEKICILIK_SANATI_CONFIG.coverImage,
    points: [
      "Çekim gücünü ve özgüvenini keşfet",
      "Erkek psikolojisini derinden anla",
      "İlişkide değerini ve dengeni koru",
    ],
    cta: "Çekicilik'i Keşfet",
  },
];

export default function BookChooserSection() {
  const scrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    if (scrollToSection(id)) e.preventDefault();
  };

  return (
    <section
      id="kitap-secimi"
      className="relative py-20 sm:py-24 bg-matte-950 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gold-500/[0.06] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-crimson-700/[0.10] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="font-cinzel text-[clamp(1.6rem,4.5vw,2.6rem)] font-black text-white leading-tight">
            Hangi Kitap <span className="gold-text-gradient">Senin İçin?</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Aynı oyunun iki tarafı. Kendi tarafını seç.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8" data-sticky-hide>
          {BOOKS.map((b) => {
            const isGold = b.theme === "kitap1";
            return (
              <div
                key={b.title}
                className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                  isGold
                    ? "border-gold-500/30 bg-gradient-to-br from-mahogany-950/80 via-matte-900 to-matte-950 hover:border-gold-400/60 hover:shadow-[0_25px_60px_-20px_rgba(212,175,55,0.35)]"
                    : "border-crimson-800/50 bg-gradient-to-br from-crimson-950/70 via-matte-900 to-matte-950 hover:border-crimson-500/60 hover:shadow-[0_25px_60px_-20px_rgba(220,38,38,0.4)]"
                }`}
              >
                <div className="flex gap-5 sm:gap-6 items-start">
                  <div
                    className={`relative flex-shrink-0 w-[92px] sm:w-[120px] aspect-[2/3] rounded-r-lg rounded-l-[3px] overflow-hidden border transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 ${
                      isGold
                        ? "border-gold-500/50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)]"
                        : "border-crimson-600/50 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.9),0_0_25px_rgba(220,38,38,0.25)]"
                    }`}
                  >
                    <Image
                      src={b.cover}
                      alt={`${b.title} - Gürkan Özbinici`}
                      fill
                      sizes="(max-width: 640px) 184px, 240px"
                      className={`object-cover ${isGold ? "" : "object-[50%_68%]"}`}
                    />
                  </div>

                  <div className="min-w-0">
                    <ThemeBadge theme={b.theme} status="etiket" className="text-[10px]">
                      <span>{b.label}</span>
                    </ThemeBadge>
                    <h3 className="mt-3 font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight">
                      {b.title}
                    </h3>
                    <p className={`mt-1 text-sm font-medium ${isGold ? "text-gold-300" : "text-crimson-300"}`}>
                      {b.tagline}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border ${
                          isGold
                            ? "bg-gold-500/15 border-gold-500/40 text-gold-400"
                            : "bg-crimson-600/15 border-crimson-500/40 text-crimson-300"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <ThemeButton
                  theme={b.theme}
                  variant="primary"
                  size="md"
                  fullWidth
                  href={`#${b.target}`}
                  onClick={(e) => scrollTo(e, b.target)}
                  className="mt-7"
                >
                  <span>{b.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </ThemeButton>
              </div>
            );
          })}
        </div>
        {/* Koleksiyon Seti kısa yolu */}
        <a
          href="#koleksiyon-seti"
          onClick={(e) => scrollTo(e, "koleksiyon-seti")}
          className="group mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-[linear-gradient(90deg,rgba(212,175,55,0.10),rgba(0,0,0,0.4)_50%,rgba(185,28,28,0.14))] px-5 py-3.5 text-center transition-colors hover:border-gold-500/40 sm:flex-row sm:gap-3"
        >
          <span className="text-sm text-zinc-300"><span className="mr-2 rounded bg-gold-500/90 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">Lansmana Özel</span>Kararsız mısın? İkisini birden al:</span>
          <span className="flex items-baseline gap-2">
            <span className="text-sm text-zinc-500 line-through decoration-crimson-500">2000 TL</span>
            <span className="font-mono text-lg font-black text-gold-300">1700 TL</span>
            <span className="text-gold-400 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}

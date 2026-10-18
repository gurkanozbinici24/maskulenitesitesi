"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Shield, Compass, Check, ArrowRight, Quote } from "lucide-react";
import { ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { scrollToSection } from "@/lib/scrollToSection";

interface Benefit {
  numeral: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  before: string;
  after: string;
  takeaways: string[];
}

const benefits: Benefit[] = [
  {
    numeral: "I",
    icon: Flame,
    title: "Yıkılan Doğrular",
    subtitle: "Acımasız gerçeklerle yüzleş",
    description:
      "Bugüne kadar sana dayatılan tüm o pasif, onay arayan yalanları çöpe atıyoruz. Neden sürekli kaybettiğini ve manipüle edildiğini yüzüne çarpacak gerçeklerle uyanmaya hazır ol.",
    before: "Onay arayan, oyunlara düşen",
    after: "Oyunu gören, anında deşifre eden",
    takeaways: [
      "Toplumun dayattığı zayıf zihniyeti tamamen yıkmak.",
      "Geçmişteki o çaresiz hallerine sonsuza dek veda etmek.",
      "Sana oynanan zihin oyunlarını anında deşifre etmek.",
    ],
  },
  {
    numeral: "II",
    icon: Shield,
    title: "Sarsılmaz Çerçeve",
    subtitle: "Kaya gibi bir karakter inşası",
    description:
      "Ne yaşanırsa yaşansın eğilmeyen, krizlerde sarsılmayan bir güç merkezi ol. İlişkinin merkezinde sen olacaksın ve senin çerçeven geçerli olacak.",
    before: "Krizde savrulan, taviz veren",
    after: "Kaya gibi duran, net karar veren",
    takeaways: [
      "Duygusal manipülasyonlara karşı mutlak bağışıklık.",
      "Kadın doğasının saygı duyduğu o \"sarsılmaz çerçeveyi\" kurmak.",
      "Kriz anlarında tavizsiz ve net kararlar alabilmek.",
    ],
  },
  {
    numeral: "III",
    icon: Compass,
    title: "Oyunun Kuralları",
    subtitle: "Mutlak otorite ve güç dinamikleri",
    description:
      "İlişkiler tesadüf değil, güç dinamikleridir. Çekim yasalarını lehine çevir, gizli dinamikleri yönet ve partnerinin sana saygı duymasını sağla. Oyunu sen yöneteceksin.",
    before: "Kuralları başkasının koyduğu",
    after: "Oyunu yöneten, vazgeçilmez olan",
    takeaways: [
      "Gizli güç dinamiklerini okuma ve ustaca yönetme.",
      "Karşındakinin seni \"vazgeçilmez bir alfa\" olarak görmesi.",
      "İlişkilerde ultra başarı ve mutlak hakimiyet.",
    ],
  },
];

/** Ekrana girince bir kez görünür olur (yumuşak belirme için). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function BenefitCard({ b, index }: { b: Benefit; index: number }) {
  const Icon = b.icon;
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -ny * 6, y: nx * 8 });
  };

  return (
    <div
      ref={ref}
      className={`benefit-reveal ${visible ? "benefit-reveal-in" : ""}`}
      style={{ transitionDelay: `${index * 140}ms`, perspective: "1200px" }}
    >
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="group relative h-full rounded-2xl p-px bg-gradient-to-b from-gold-500/40 via-gold-500/10 to-mahogany-700/30 hover:from-gold-300 hover:via-gold-500/50 hover:to-mahogany-500/60 transition-[background,box-shadow] duration-500 hover:shadow-[0_30px_70px_-25px_rgba(212,175,55,0.45)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 300ms ease-out, background 500ms, box-shadow 500ms",
        }}
      >
        <div className="relative h-full overflow-hidden rounded-[15px] bg-gradient-to-b from-[#16100a] via-matte-950 to-matte-950 p-7 sm:p-8 flex flex-col">
          {/* Dev Romen rakamı filigranı */}
          <span className="pointer-events-none absolute -top-6 -right-2 font-cinzel text-[9rem] font-black leading-none text-gold-500/[0.06] group-hover:text-gold-500/[0.12] transition-colors duration-500 select-none">
            {b.numeral}
          </span>
          {/* Üst ışık */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 rounded-full bg-gold-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-md group-hover:bg-gold-400/40 transition-colors" />
              <div className="relative w-14 h-14 rounded-full border border-gold-500/60 bg-gradient-to-br from-mahogany-800 to-matte-950 flex items-center justify-center text-gold-300 shadow-inner">
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-gold-500/80 uppercase">
                Adım {b.numeral}
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-gold-200 transition-colors">
                {b.title}
              </h3>
            </div>
          </div>

          <div className="relative text-xs font-semibold text-gold-400 italic font-playfair mb-3">
            {b.subtitle}
          </div>
          <p className="relative text-sm text-zinc-400 leading-relaxed mb-6">{b.description}</p>

          {/* Önce / Sonra dönüşümü */}
          <div className="relative rounded-xl border border-gold-500/15 bg-black/40 p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase w-12 flex-shrink-0">
                Önce
              </span>
              <span className="text-sm text-zinc-500 line-through decoration-zinc-600">
                {b.before}
              </span>
            </div>
            <div className="my-2.5 ml-[3.75rem] h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[10px] font-bold tracking-widest text-gold-400 uppercase w-12 flex-shrink-0">
                Sonra
              </span>
              <span className="text-sm font-semibold text-gold-200">{b.after}</span>
            </div>
          </div>

          <ul className="relative mt-auto space-y-2.5">
            {b.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center flex-shrink-0 text-gold-400">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span className="text-xs text-zinc-300 leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  const quote = useReveal<HTMLDivElement>();

  return (
    <section
      id="kazanimlar"
      className="relative py-24 sm:py-28 overflow-hidden bg-gradient-to-b from-matte-950 via-[#0f0a06] to-matte-950 border-t border-zinc-900"
    >
      {/* Arka plan: altın ışık ve ince ızgara */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-gold-500/[0.07] blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap1"
          badgeText="DÖNÜŞÜM REHBERİ"
          title="Vazgeçilmez Olma Sanatı ile"
          highlightText="Neler Kazanacaksın?"
          subtitle="Bu bir tavsiye kitabı değil, bir güç manifestosudur. İlişkilerde kontrolü eline almak, kadın doğasını şifrelerine kadar çözmek ve vazgeçilmez bir otorite olmak isteyenler için yazıldı."
          className="mb-14 sm:mb-16"
        />

        {/* Üç adımlık dönüşüm yolu */}
        <div className="relative">
          <div className="pointer-events-none hidden md:block absolute top-[4.6rem] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} b={b} index={i} />
            ))}
          </div>
        </div>

        {/* Alıntı */}
        <div
          ref={quote.ref}
          className={`benefit-reveal ${quote.visible ? "benefit-reveal-in" : ""} mt-14 sm:mt-16`}
        >
          <div className="relative rounded-2xl p-px bg-gradient-to-r from-gold-500/10 via-gold-400/60 to-gold-500/10">
            <div className="relative overflow-hidden rounded-[15px] bg-gradient-to-br from-[#1a110a] via-matte-950 to-matte-950 px-6 py-10 sm:px-14 sm:py-14 text-center">
              <Quote className="pointer-events-none absolute -top-4 left-4 w-28 h-28 text-gold-500/[0.08] rotate-180" />
              <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full bg-gold-500/15 blur-3xl" />

              <blockquote className="relative font-playfair italic text-[clamp(1.15rem,2.6vw,1.75rem)] leading-relaxed text-zinc-100 max-w-4xl mx-auto">
                &ldquo;Saygı dilenerek kazanılmaz, tavizsiz bir çerçeveyle inşa edilir. Ya kendi
                hayatının kurallarını koyup{" "}
                <span className="gold-text-gradient font-semibold not-italic">vazgeçilmez</span>{" "}
                olursun, ya da başkalarının oyununda manipüle edilen bir soytarı olarak kalırsın.
                Seçim senin.&rdquo;
              </blockquote>

              <div className="relative mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold-500/60" />
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.3em] text-gold-400">
                  GÜRKAN ÖZBİNİCİ
                </span>
                <span className="h-px w-10 bg-gold-500/60" />
              </div>

              <ThemeButton
                theme="kitap1"
                variant="primary"
                size="lg"
                href="#fiyat-kartlari"
                onClick={(e) => {
                  if (scrollToSection("fiyatlandirma")) e.preventDefault();
                }}
                className="relative mt-8 w-full sm:w-auto"
              >
                <span>Gücü Eline Al</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ThemeButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

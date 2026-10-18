"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCheck, MessageCircle, PenLine, Quote, ShieldCheck, X, Zap } from "lucide-react";
import { ThemeSectionHeader } from "./ui/ThemeSystem";

/**
 * Gerçek okur fotoğrafları ve WhatsApp memnuniyet mesajları.
 * Tüm görseller okurların izniyle; isim, numara ve profil fotoğrafı görünmez.
 * Yeni fotoğraf: /public/okurlar/okur-XX.webp ekleyip PHOTO_HEIGHTS listesine yüksekliğini yazın.
 * Yeni mesaj: /public/okurlar/mesaj/mXX.webp ekleyip MESSAGES listesine satır ekleyin.
 */

const PHOTO_HEIGHTS = [
  1280, 960, 960, 1280, 1281, 1280, 1280, 1280, 1281, 960, 1280, 1281, 1280, 1280, 960, 1281, 1280, 1280, 960, 1280, 1281, 959, 957, 1281, 1161, 965,
];
const PHOTOS = PHOTO_HEIGHTS.map((h, i) => ({
  src: `/okurlar/okur-${String(i + 1).padStart(2, "0")}.webp`,
  w: 720,
  h,
}));

type Cat = "kargo" | "imza" | "yorum";
const MESSAGES: { id: string; w: number; h: number; cat: Cat; date: string; text: string }[] = [
  { id: "m08", w: 532, h: 456, cat: "yorum", date: "16 Eylül", text: "Kitap pazartesi günü elime ulaştı. Açıkçası beklediğimden çok daha iyi çıktı. ‘Vazgeçilmez Olma Sanatı’ gerçekten isminin hakkını veren bir çalışma olmuş." },
  { id: "m21", w: 672, h: 525, cat: "yorum", date: "26 Eylül", text: "Kitabınızı bitirdim. Benim gerçekten çok beğendiğim ve çokça istifade ettiğim bir kitap olmuş. Bir kadın olarak annemden aldığım birçok nasihati satır aralarında bulduğumu itiraf etmeliyim." },
  { id: "m16", w: 631, h: 160, cat: "kargo", date: "18 Eylül", text: "Ben de beklemezdim bu kadar hızlı gelebileceğini." },
  { id: "m01", w: 397, h: 190, cat: "kargo", date: "16 Eylül", text: "Kitabım elime ulaştı, bu kadar hızlı gelmesini beklemiyordum, notunuz için de çok teşekkür ederim." },
  { id: "m04", w: 397, h: 150, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı. İsme özel not çok şık olmuş. Çok teşekkür ederim." },
  { id: "m07", w: 671, h: 301, cat: "yorum", date: "22 Eylül", text: "Bu, bir kere okunacak bir kitap değil. Baş ucu kitabı olması gereken bir kitap." },
  { id: "m02", w: 671, h: 121, cat: "kargo", date: "12 Eylül", text: "Kitap şimdi elime ulaştı. Bir günde gelen kargo için teşekkür ederim. Değişime seninle başlıyoruz." },
  { id: "m06", w: 671, h: 144, cat: "imza", date: "17 Eylül", text: "Kargo ulaştı çok teşekkür ederim, imza için de ayrıca teşekkür, çok ince bir düşünce." },
  { id: "m09", w: 671, h: 144, cat: "yorum", date: "11 Eylül", text: "Çok güzel çok faydalı bir kitap, dışarıda bulunamayan bilgiler için teşekkürler, alan pişman olmaz." },
  { id: "m03", w: 671, h: 264, cat: "kargo", date: "16 Eylül", text: "Kitap bugün geldi, üstelik çok çabuk elimize ulaştı. Eline emeğine yüreğine sağlık, çok güzel." },
  { id: "m05", w: 671, h: 139, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı teşekkür ederim. İsme özel yazınız da çok güzel bir hava katmış." },
  { id: "m10", w: 671, h: 144, cat: "yorum", date: "21 Eylül", text: "Kitabı okumaya devam ediyorum. 36. bölüme geldim, bakış açım değişti, eksiklerimi ve hatalarımı gördüm." },
  { id: "m12", w: 397, h: 201, cat: "yorum", date: "8 Eylül", text: "Daha ilk bölümden gerçekten insanı derinden uyandırma gücüne sahip." },
  { id: "m11", w: 671, h: 121, cat: "yorum", date: "11 Eylül", text: "Emeğine sağlık, çok güzel bir kitap olmuş. Daha önce kendime hiç saygım yokmuş, bunu anladım." },
  { id: "m14", w: 671, h: 181, cat: "yorum", date: "14 Eylül", text: "Kitap çok güzel, keşke daha önce alsaydım." },
  { id: "m13", w: 671, h: 146, cat: "yorum", date: "30 Eylül", text: "Kitap güzel, anlatımı açık ve anlaşılır. Şu an 70. sayfadayım." },
  { id: "m22", w: 397, h: 417, cat: "yorum", date: "13 Eylül", text: "Büyük bir farkındalıkla okuyorum. Gayet başarılı ve özenle düşünülüp emek verilerek yazılmış bir eser." },
  { id: "m17", w: 397, h: 100, cat: "kargo", date: "19 Eylül", text: "Elime şimdi ulaştı, çok teşekkür ederim." },
  { id: "m26", w: 456, h: 76, cat: "imza", date: "12 Eylül", text: "Not için de ayrıca teşekkür ederim." },
  { id: "m20", w: 672, h: 106, cat: "kargo", date: "18 Eylül", text: "Kargo geldi, gayet iyi. Elinize emeğinize sağlık." },
  { id: "m23", w: 672, h: 135, cat: "yorum", date: "9 Eylül", text: "Vakit buldukça kitabı okuyorum, en son ilişkimde yaptığım hatalar önüme geliyor, kitap çok iyi." },
  { id: "m19", w: 397, h: 129, cat: "kargo", date: "10 Eylül", text: "Kitabım elime ulaştı, emeğine sağlık, en kısa zamanda başlayacağım." },
  { id: "m24", w: 672, h: 136, cat: "yorum", date: "7 Eylül", text: "E-kitap PDF olarak gelmiş. Çok teşekkürler, şimdiden eline emeğine yüreğine sağlık." },
  { id: "m18", w: 561, h: 76, cat: "kargo", date: "10 Eylül", text: "Kargo elime geldi, ellerine sağlık emeğine sağlık." },
  { id: "m25", w: 672, h: 106, cat: "yorum", date: "13 Eylül", text: "1 saattir okuyorum, 20 sayfa okudum, dediğin gibi kafama soka soka okuyorum." },
  { id: "m15", w: 644, h: 84, cat: "yorum", date: "5 Ekim", text: "İlk 12 sayfayı okudum, gerçekten şahane, kalemine sağlık." },
];

const TABS: { key: "tumu" | Cat; label: string; icon?: typeof Zap }[] = [
  { key: "tumu", label: "Tümü" },
  { key: "kargo", label: "Flash Hızda Kargo", icon: Zap },
  { key: "imza", label: "İsme Özel İmza", icon: PenLine },
  { key: "yorum", label: "Okur Yorumları", icon: Quote },
];

const CAT_LABEL: Record<Cat, string> = { kargo: "Flash Hızda Kargo", imza: "İsme Özel İmza", yorum: "Okur Yorumu" };

export default function ReadersSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("tumu");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const filtered = MESSAGES.filter((m) => tab === "tumu" || m.cat === tab);
  const visible = showAll || tab !== "tumu" ? filtered : filtered.slice(0, 6);
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
            className="group/ph relative h-52 sm:h-72 flex-shrink-0 overflow-hidden rounded-2xl bg-black p-[3px] shadow-[0_14px_40px_rgba(0,0,0,0.7)] ring-1 ring-gold-500/30 transition-all duration-500 hover:-translate-y-1.5 hover:ring-gold-400/80 hover:shadow-[0_18px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)]"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
          >
            <Image
              src={p.src}
              alt="Okurumuzun elindeki Vazgeçilmez Olma Sanatı kitabı"
              fill
              sizes="(max-width: 640px) 130px, 220px"
              className="rounded-[13px] object-cover transition-transform duration-700 group-hover/ph:scale-105"
            />
            {/* premium çerçeve: altta karartma + altın parıltı */}
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
    <section id="okurlar" className="relative overflow-hidden py-16 sm:py-24 scroll-mt-24 bg-matte-950">
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

      {/* Fotoğraf duvarı: iki sıra, zıt yönlere akan */}
      <div className="relative space-y-3 sm:space-y-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <PhotoRow items={rowA} dir="left" />
        <PhotoRow items={rowB} dir="right" />
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500">
        {PHOTOS.length}+ okur kitabını eline aldığı an bu fotoğrafları gönderdi.
      </p>

      {/* WhatsApp mesajları */}
      <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                tab === key
                  ? "border-gold-400 bg-gold-400 text-black"
                  : "border-zinc-700 bg-black/40 text-zinc-300 hover:border-gold-500/60 hover:text-gold-300"
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {label}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-4xl columns-1 gap-4 md:columns-2 [&>*]:mb-4">
          {visible.map((m) => (
            <figure
              key={m.id}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-emerald-500/15 bg-[#0b141a] shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/5 bg-[#202c33] px-3.5 py-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  Okur · {m.date}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    m.cat === "kargo"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : m.cat === "imza"
                        ? "bg-gold-500/15 text-gold-300"
                        : "bg-white/10 text-zinc-300"
                  }`}
                >
                  {CAT_LABEL[m.cat]}
                </span>
              </div>
              <Image
                src={`/okurlar/mesaj/${m.id}.webp`}
                alt={m.text}
                width={m.w}
                height={m.h}
                sizes="(max-width: 640px) 92vw, 440px"
                className="h-auto w-full"
              />
              <figcaption className="sr-only">{m.text}</figcaption>
            </figure>
          ))}
        </div>

        {tab === "tumu" && !showAll && filtered.length > 6 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-black/50 px-6 py-3 text-sm font-bold text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              <CheckCheck className="h-4 w-4" />
              {filtered.length - 6} mesaj daha göster
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[11px] text-zinc-500">
          Mesaj ve fotoğraflar okurlarımızın izniyle, isimleri ve numaraları gizlenerek paylaşılmıştır.
        </p>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
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

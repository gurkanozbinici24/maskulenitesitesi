import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INSTAGRAM_URL } from "@/config/cekicilikConfig";

const SITE = "https://www.maskulenitesitesi.com.tr";
const URL = `${SITE}/gurkan-ozbinici`;

export const metadata: Metadata = {
  title: "Gürkan Özbinici Kimdir? Hayatı, Eğitimi ve Kitapları",
  description:
    "Gürkan Özbinici kimdir? 1999 İzmir doğumlu, sosyoloji eğitimli yazar ve ilişki koçu. 2019'dan beri maskülenlik ve ilişkiler üzerine içerik üretiyor; 1 milyonu aşkın takipçi, Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı kitapları.",
  alternates: { canonical: "/gurkan-ozbinici" },
  keywords: [
    "gürkan özbinici",
    "gürkan özbinici kimdir",
    "gurkan ozbinici",
    "gürkan özbinici kaç yaşında",
    "gürkan özbinici nereli",
    "gürkan özbinici kitapları",
    "maskulenitesitesi",
    "maskülenite",
  ],
  openGraph: {
    type: "profile",
    url: "/gurkan-ozbinici",
    title: "Gürkan Özbinici Kimdir?",
    description:
      "Sosyoloji eğitimli yazar ve ilişki koçu. Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı'nın yazarı, 1 milyonu aşkın takipçi.",
    images: ["/insta_profile_800k.jpg"],
  },
};

const FACTS: [string, string][] = [
  ["Doğum", "1999, İzmir"],
  ["Yaşadığı şehirler", "İzmir, Trabzon"],
  ["Eğitim", "Sosyoloji (4 yıllık lisans)"],
  ["Alanı", "İlişki dinamikleri, maskülenlik, toplumsal ilişkiler"],
  ["İçerik üretimi", "2019'dan bu yana"],
  ["Takipçi", "1 milyonun üzerinde (Instagram 800 bin+, Facebook 100 bin+)"],
  ["Kitapları", "Vazgeçilmez Olma Sanatı, Çekicilik Sanatı"],
  ["Hizmet", "Erkeklere özel birebir ilişki koçluğu"],
];

const STATS = [
  { v: "1M+", l: "toplam takipçi" },
  { v: "800K+", l: "Instagram" },
  { v: "2019", l: "yılından beri içerik" },
  { v: "1 hafta", l: "200 özel baskı tükendi" },
];

const FAQ = [
  {
    q: "Gürkan Özbinici kimdir?",
    a: "Gürkan Özbinici, ilişki dinamikleri, maskülenlik ve toplumsal ilişkiler üzerine içerik üreten, sosyoloji eğitimli bir yazar ve ilişki koçudur. 2019'dan bu yana sosyal medyada içerik üretmekte; Instagram'da 800 bini, tüm platformlarda toplam 1 milyonu aşan takipçiye ulaşmıştır. Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı kitaplarının yazarıdır.",
  },
  {
    q: "Gürkan Özbinici kaç yaşında, nereli?",
    a: "1999 yılında İzmir'de doğdu. Hayatının büyük kısmını İzmir'de geçirdi, uzun bir dönem de Trabzon'da yaşadı.",
  },
  {
    q: "Gürkan Özbinici'nin eğitimi nedir?",
    a: "Sosyoloji eğitimi aldı. Sosyoloji; toplumsal ilişkileri, aile yapısını ve ikili ilişkileri inceleyen 4 yıllık bir lisans programıdır. Bu temeli seminerler, forumlar, yabancı literatür ve felsefe okumalarıyla derinleştirdi.",
  },
  {
    q: "Gürkan Özbinici'nin kitapları nelerdir?",
    a: "Erkekler için yazdığı Vazgeçilmez Olma Sanatı (227 sayfa, 100 kanun) ve kadınlar için yazdığı Çekicilik Sanatı. Vazgeçilmez Olma Sanatı'nın 200 adetlik numaralı özel baskısı bir haftada tükendi; ardından Yenilenmiş Edisyon basıldı. Çekicilik Sanatı 5 Kasım 2026'da çıkıyor.",
  },
  {
    q: "Gürkan Özbinici danışmanlık veriyor mu?",
    a: "Evet. Yalnızca erkeklere özel, başvuru ile birebir strateji seansı ve aylık VIP Mentörlük veriyor. Görüşmeler Google Meet veya WhatsApp üzerinden yapılıyor.",
  },
  {
    q: "Gürkan Özbinici'nin Instagram hesabı hangisi?",
    a: "Resmi Instagram hesabı @maskulenitesitesi, resmi web sitesi maskulenitesitesi.com.tr'dir.",
  },
];

function H2({ children }: { children: string }) {
  return (
    <h2 className="mb-4 mt-14 font-cinzel text-[clamp(1.35rem,3vw,1.8rem)] font-bold text-white">
      {children.toLocaleUpperCase("tr-TR")}
    </h2>
  );
}

export default function GurkanOzbiniciPage() {
  const person = {
    "@type": "Person",
    "@id": `${SITE}/#gurkan-ozbinici`,
    name: "Gürkan Özbinici",
    alternateName: ["Gurkan Ozbinici", "maskulenitesitesi"],
    url: URL,
    image: `${SITE}/insta_profile_800k.jpg`,
    birthDate: "1999",
    birthPlace: { "@type": "Place", name: "İzmir, Türkiye" },
    nationality: { "@type": "Country", name: "Türkiye" },
    jobTitle: ["Yazar", "İlişki Koçu"],
    knowsAbout: ["Sosyoloji", "İlişki dinamikleri", "Maskülenlik", "Toplumsal ilişkiler", "İlişki koçluğu"],
    hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Lisans", about: "Sosyoloji" },
    description:
      "Sosyoloji eğitimli yazar ve ilişki koçu. 2019'dan beri maskülenlik ve ilişkiler üzerine içerik üretiyor; Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı kitaplarının yazarı.",
    sameAs: [INSTAGRAM_URL],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfilePage", "@id": `${URL}#sayfa`, url: URL, name: "Gürkan Özbinici Kimdir?", inLanguage: "tr-TR", mainEntity: { "@id": person["@id"] } },
      person,
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE },
          { "@type": "ListItem", position: 2, name: "Gürkan Özbinici Kimdir?", item: URL },
        ],
      },
    ],
  };

  const p = "mt-4 leading-[1.85] text-zinc-300 sm:text-[1.05rem]";
  const quote = "my-8 border-l-2 border-gold-400 pl-5 font-playfair text-xl italic leading-relaxed text-gold-100";

  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <article className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[70%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Konum" className="mb-8 text-xs text-zinc-500">
            <Link href="/" className="hover:text-gold-300">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <span>Gürkan Özbinici Kimdir?</span>
          </nav>

          <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold-400/70 shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] sm:h-32 sm:w-32">
              <Image src="/insta_profile_800k.jpg" alt="Gürkan Özbinici" fill priority sizes="128px" className="object-cover" />
            </div>
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Yazar · İlişki Koçu</div>
              <h1 className="font-cinzel text-[clamp(1.9rem,5vw,3rem)] font-bold leading-tight text-white">
                {"Gürkan Özbinici Kimdir?".toLocaleUpperCase("tr-TR")}
              </h1>
            </div>
          </header>

          <p className="mt-8 text-lg leading-relaxed text-zinc-200 sm:text-xl">
            <strong className="text-white">Gürkan Özbinici</strong> (1999, İzmir), ilişki dinamikleri, maskülenlik ve toplumsal
            ilişkiler üzerine içerik üreten, sosyoloji eğitimli bir yazar ve ilişki koçudur. 2019&apos;dan bu yana sosyal medyada
            içerik üretmekte; Instagram&apos;da 800 bini, tüm platformlarda toplam 1 milyonu aşan takipçiye ulaşmıştır.{" "}
            <Link href="/#vazgecilmez" className="text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200">
              Vazgeçilmez Olma Sanatı
            </Link>{" "}
            ve{" "}
            <Link href="/#cekicilik-sanati" className="text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200">
              Çekicilik Sanatı
            </Link>{" "}
            kitaplarının yazarıdır ve erkeklere özel birebir ilişki koçluğu vermektedir.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-black/40 p-4 text-center">
                <div className="font-cinzel text-2xl font-bold text-white">{s.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">{s.l}</div>
              </div>
            ))}
          </div>

          <dl className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {FACTS.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3 text-sm sm:grid-cols-[11rem_1fr] ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <dt className="font-semibold text-gold-300">{k}</dt>
                <dd className="text-zinc-200">{v}</dd>
              </div>
            ))}
          </dl>

          <H2>Eğitimi: İlişkilere sosyolojinin gözünden bakmak</H2>
          <p className={p}>
            Gürkan Özbinici sosyoloji eğitimi aldı. Bilmeyenler için kısaca: Sosyoloji; toplumsal ilişkileri, aile yapısını,
            ikili ilişkileri ve toplumsal cinsiyet rollerini inceleyen 4 yıllık bir lisans programıdır. Yani ilişkiler onun için
            bir hobi değil, akademik olarak çalıştığı alanın tam merkezidir.
          </p>
          <p className={p}>
            Bu akademik temeli yıllar içinde katıldığı seminerler, forumlarda yazdığı yazılar, yabancı kaynaklardan yaptığı
            okumalar ve felsefe çalışmalarıyla derinleştirdi. İçeriklerinin ve kitaplarının ayırt edici yanı da buradan gelir:
            Duygusal tavsiyeler yerine gözleme, mantığa ve neden-sonuç ilişkisine dayanan bir anlatım.
          </p>

          <H2>Nasıl başladı: Kampüste başlayan tartışmalar</H2>
          <p className={p}>
            Her şey İzmir&apos;de, Dokuz Eylül Üniversitesi kampüsünde başladı. Gürkan Özbinici, psikoloji okuyan arkadaşlarıyla
            kurduğu dört kişilik grupta ikili ilişkiler ve toplumsal ilişkiler üzerine düzenli olarak tartışıyordu.
          </p>
          <p className={p}>
            Arkadaşları onun görüşlerini ve tezlerini başlarda aykırı buldu. Ama maskülenite ve &quot;red pill&quot; olarak bilinen
            ilişki dinamikleri yaklaşımı hakkında anlattıkça, bu görüşlerin gündelik hayatta karşılık bulduğunu fark ettiler.
            Akıcı, anlaşılır ve özellikle mantığa dayanan yorumları grupta o kadar ilgi gördü ki, bu konuları sosyal medyada
            daha geniş bir kitleyle paylaşması için ısrarlar giderek arttı.
          </p>

          <H2>Kırılma noktası</H2>
          <p className={p}>
            O dönem böyle bir sayfa açmak aklında değildi. Fikrini değiştiren, kendi hayatında yaşadığı bir olay oldu:
            Yöneticilik yaptığı iş yerinde, bir kadın yöneticinin tek taraflı beyanı üzerine, kendi ifadesiyle bir iftira
            sonucu hakkında uzaklaştırma kararı alındı.
          </p>
          <p className={p}>
            Bu deneyim, yıllardır üzerine düşündüğü konuların kâğıt üzerinde kalmadığını, insanların hayatına doğrudan
            dokunduğunu gösterdi. Gürkan Özbinici bunun üzerine sosyal medyada hem ilişki dinamiklerini hem de bu tür
            süreçlerdeki yasal düzenlemeleri ve uygulamaları konuşmaya, eleştirmeye başladı.
          </p>
          <blockquote className={quote}>Saygı dilenerek kazanılmaz, tavizsiz bir çerçeveyle inşa edilir.</blockquote>

          <H2>1 milyonu aşan bir kitle</H2>
          <p className={p}>
            2019&apos;da başlayan içerikler kısa sürede geniş bir kitleye ulaştı. Bugün Gürkan Özbinici&apos;nin{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200">
              @maskulenitesitesi
            </a>{" "}
            Instagram hesabında 800 binin, Facebook&apos;ta 100 binin üzerinde; diğer platformlarla birlikte toplamda 1 milyonun
            üzerinde gerçek takipçisi var. Kitlesinin 300 bini aşkın kısmı kadınlardan oluşuyor; bu da anlattığı dinamiklerin
            yalnızca erkeklere değil, ilişkinin iki tarafına da hitap ettiğini gösteriyor.
          </p>

          <H2>Kitapları</H2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link href="/blog/vazgecilmez-olma-sanati-kitabi" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold-500/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gold-400">Erkekler için</div>
              <div className="mt-1 font-playfair text-xl font-bold text-white group-hover:text-gold-200">Vazgeçilmez Olma Sanatı</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                227 sayfa, 100 kanun. İlk olarak 200 adetlik numaralı özel seri olarak basıldı ve bir haftada tükendi.
                Okurlardan gelen yoğun istek üzerine Yenilenmiş Edisyon olarak yeniden basıldı.
              </p>
            </Link>
            <Link href="/blog/cekicilik-sanati-kitabi" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold-500/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-crimson-400">Kadınlar için</div>
              <div className="mt-1 font-playfair text-xl font-bold text-white group-hover:text-gold-200">Çekicilik Sanatı</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                300 binin üzerindeki kadın takipçisinden gelen istek üzerine yazıldı. Bir erkeğin zihninin nasıl çalıştığını
                kadınlara anlatıyor. 5 Kasım 2026&apos;da çıkıyor.
              </p>
            </Link>
          </div>

          <H2>Yaklaşımı</H2>
          <p className={p}>Gürkan Özbinici&apos;nin içeriklerinde ve kitaplarında tekrar eden birkaç temel fikir var:</p>
          <ul className="mt-4 space-y-3 text-zinc-300">
            {[
              ["Kendine saygı her şeyin başıdır.", "İlişkide değer, karşı tarafa kendini kanıtlayarak değil, kendine duyduğun tavizsiz saygıyla başlar."],
              ["Seçilen değil, seçen ol.", "Hayatının merkezine bir başkasını değil, kendi hedeflerini ve misyonunu koy."],
              ["Taktik değil, karakter.", "Kurallar ezberlenip oynanacak oyunlar değil, kişiliğe dönüşmesi gereken duruşlardır."],
              ["Duygu değil, mantık.", "İlişkiler neden-sonuç ilişkisiyle, gözlemle ve sağduyuyla okunabilir."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="font-semibold text-white">{t}</span> <span className="text-zinc-400">{d}</span>
              </li>
            ))}
          </ul>

          <H2>Birebir danışmanlık</H2>
          <p className={p}>
            Gürkan Özbinici, yalnızca erkeklere özel olarak birebir ilişki koçluğu veriyor: 45 dakikalık strateji seansı ve
            aylık VIP Mentörlük. Görüşmeler başvuru ile ve sınırlı kontenjanla yapılıyor.{" "}
            <Link href="/danismanlik" className="text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200">
              Danışmanlık sayfasını incele →
            </Link>
          </p>

          <H2>Resmi hesapları</H2>
          <ul className="mt-4 space-y-2 text-zinc-300">
            <li>
              Instagram:{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer me" className="text-gold-300 hover:text-gold-200">
                @maskulenitesitesi
              </a>
            </li>
            <li>
              Web sitesi:{" "}
              <Link href="/" className="text-gold-300 hover:text-gold-200">maskulenitesitesi.com.tr</Link>
            </li>
            <li>
              Blog:{" "}
              <Link href="/blog" className="text-gold-300 hover:text-gold-200">maskulenitesitesi.com.tr/blog</Link>
            </li>
          </ul>

          <section className="mt-14">
            <h2 className="mb-5 font-cinzel text-[clamp(1.35rem,3vw,1.8rem)] font-bold text-white">
              {"Sık Sorulan Sorular".toLocaleUpperCase("tr-TR")}
            </h2>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:border-gold-500/40">
                  <summary className="cursor-pointer list-none font-semibold text-white marker:hidden">
                    <span className="mr-2 inline-block text-gold-400 transition-transform group-open:rotate-45">+</span>
                    {f.q}
                  </summary>
                  <p className="mt-3 leading-relaxed text-zinc-300">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}

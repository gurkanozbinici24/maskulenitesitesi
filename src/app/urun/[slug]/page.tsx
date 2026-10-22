import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditCard, PenLine, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { KART_ODEME_AKTIF, WHATSAPP_PHONE } from "@/config/cekicilikConfig";
import { odemeLinki } from "@/lib/odeme/urunler";
import YorumlarBolumu from "@/components/yorum/YorumlarBolumu";
import { GOSTERIM_ESIGI, ozetCikar, yayindakiYorumlar } from "@/lib/yorum/depo";
import { urundekiKitaplar } from "@/lib/yorum/token";
import { SITE, URUN_SAYFALARI, stokDurumu, urunLinki, urunSayfasiBul, urunVerisi } from "@/lib/merchant/urunSayfalari";

/** Satış tarihi geldiğinde sayfa ve stok bilgisi yeniden yayın gerekmeden güncellensin */
export const revalidate = 600;

export function generateStaticParams() {
  return URUN_SAYFALARI.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = urunSayfasiBul(params.slug);
  if (!s) return {};
  const u = urunVerisi(s);
  return {
    title: s.baslik,
    description: `${s.aciklama.slice(0, 150).trim()}…`,
    alternates: { canonical: `/urun/${s.slug}` },
    openGraph: { type: "website", url: `/urun/${s.slug}`, title: `${s.baslik} – ${u.fiyat} TL`, images: [s.gorsel] },
  };
}

const tarihYaz = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString("tr-TR", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Istanbul",
      })
    : "";

export default async function UrunSayfasi({ params }: { params: { slug: string } }) {
  const s = urunSayfasiBul(params.slug);
  if (!s) notFound();
  const u = urunVerisi(s);
  const stok = stokDurumu(s);
  const kartlaAlinabilir = stok.satista && KART_ODEME_AKTIF;
  const kitaplar = urundekiKitaplar(u.id);
  const yorumlar = (await Promise.all(kitaplar.map(yayindakiYorumlar))).flat();
  const ozet = ozetCikar(yorumlar);
  // Google yıldızları yalnızca tek kitaplı ürün sayfasında ve yeterli değerlendirme varsa
  const yildizVerisi =
    kitaplar.length === 1 && ozet.sayi >= GOSTERIM_ESIGI
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: String(ozet.ortalama), reviewCount: ozet.sayi, bestRating: "5", worstRating: "1" },
          review: [...yorumlar]
            .sort((a, b) => b.tarih - a.tarih)
            .slice(0, 5)
            .map((y) => ({
              "@type": "Review",
              author: { "@type": "Person", name: y.gorunenAd },
              datePublished: new Date(y.tarih).toISOString().slice(0, 10),
              reviewBody: y.metin,
              reviewRating: { "@type": "Rating", ratingValue: String(y.puan), bestRating: "5", worstRating: "1" },
            })),
        }
      : {};
  const whatsappMetni = encodeURIComponent(`Merhaba, "${u.ad}" için sipariş vermek istiyorum.`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${urunLinki(s)}#urun`,
    name: s.baslik,
    description: s.aciklama,
    image: [`${SITE}${s.gorsel}`],
    sku: u.id,
    brand: { "@type": "Brand", name: "Maskülenite" },
    category: "Kitaplar",
    ...yildizVerisi,
    offers: {
      "@type": "Offer",
      url: urunLinki(s),
      price: String(u.fiyat),
      priceCurrency: "TRY",
      availability: stok.schema,
      ...(stok.satista || !stok.satisTarihi ? {} : { availabilityStarts: stok.satisTarihi }),
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Maskülenite", url: SITE },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "TRY" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "TR" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "TR",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
  };

  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-full max-w-3xl -translate-x-1/2 bg-mahogany-600/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gold-500/20 bg-black/40 shadow-2xl md:sticky md:top-28">
            <Image
              src={s.gorsel}
              alt={s.baslik}
              width={1024}
              height={1536}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Gürkan Özbinici</p>
            <h1 className="mt-2 font-cinzel text-[clamp(1.6rem,3.6vw,2.3rem)] font-bold leading-tight text-white">{s.baslik}</h1>
            <p className="mt-2 text-sm text-zinc-400">{s.altBaslik}</p>
            {ozet.sayi >= GOSTERIM_ESIGI && (
              <a href="#degerlendirmeler" className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-gold-300">
                <span className="text-gold-400">{"★".repeat(Math.round(ozet.ortalama))}{"☆".repeat(5 - Math.round(ozet.ortalama))}</span>
                <span className="font-semibold">{ozet.ortalama.toLocaleString("tr-TR")}</span>
                <span className="text-zinc-500">({ozet.sayi} değerlendirme)</span>
              </a>
            )}

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <div className="font-mono text-4xl font-black text-white">
                {u.fiyat.toLocaleString("tr-TR")}
                <span className="ml-1 text-lg text-gold-400">TL</span>
              </div>
              <span
                className={`mb-1 rounded-full px-3 py-1 text-xs font-bold ${
                  stok.satista
                    ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border border-gold-500/40 bg-gold-500/10 text-gold-300"
                }`}
              >
                {stok.satista ? "Stokta · Hemen gönderilir" : `Ön sipariş · ${tarihYaz(stok.satisTarihi)}'de satışta`}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {kartlaAlinabilir ? (
                <Link
                  href={odemeLinki(u.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-6 py-4 text-base font-bold text-black transition hover:brightness-110"
                >
                  <CreditCard className="h-5 w-5" /> Kartla Hemen Al
                </Link>
              ) : (
                <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 px-4 py-3 text-sm text-gold-100">
                  {stok.satista
                    ? "Kartla ödeme şu an kapalı. WhatsApp'tan hemen sipariş verebilirsin."
                    : `Kartla satış ${tarihYaz(stok.satisTarihi)}'de açılıyor. Şimdiden WhatsApp'tan ön sipariş verebilirsin; kitabın çıkış gününde kargoya verilir.`}
                </div>
              )}
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMetni}`}
                className="flex w-full items-center justify-center rounded-xl border border-zinc-700 px-6 py-3.5 text-sm font-bold text-zinc-200 transition hover:border-gold-500/60"
              >
                WhatsApp&apos;tan sipariş ver
              </a>
            </div>

            <ul className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                Türkiye&apos;nin her yerine ücretsiz kargo, 1-3 iş gününde kapında
              </li>
              <li className="flex items-start gap-2">
                <PenLine className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                Yazar tarafından isme özel imzalı
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                iyzico güvencesiyle kartla ödeme, 3 taksit seçeneği
              </li>
              <li className="flex items-start gap-2">
                <RotateCcw className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                Hatalı ya da hasarlı kitap ücretsiz değiştirilir
              </li>
            </ul>

            <div className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-zinc-300">
              {s.paragraflar.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                Kitabın konusunu ve bölümlerini{" "}
                <Link href={s.blogLinki} className="font-semibold text-gold-400 underline underline-offset-4 hover:text-gold-300">
                  bu yazıda detaylı anlattım
                </Link>
                .
              </p>
            </div>

            <dl className="mt-8 divide-y divide-zinc-800 rounded-2xl border border-zinc-800">
              {s.ozellikler.map((o) => (
                <div key={o.etiket} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-zinc-400">{o.etiket}</dt>
                  <dd className="text-right font-semibold text-zinc-100">{o.deger}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-white/[0.02] p-5 text-sm leading-relaxed text-zinc-400">
              <h2 className="mb-2 font-bold text-zinc-200">Teslimat ve iade</h2>
              <p>
                Saat 14:00&apos;e kadar onaylanan siparişler aynı iş günü kargoya verilir. Kitaplar isme özel imzalandığı için
                Mesafeli Sözleşmeler Yönetmeliği gereği cayma hakkı kapsamı dışındadır; hatalı basım ya da kargo hasarında
                kitabın ücretsiz olarak yenisiyle değiştirilir. Ayrıntılar:{" "}
                <Link href="/teslimat-ve-iade" className="text-gold-400 underline underline-offset-4">
                  Teslimat ve İade Şartları
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <YorumlarBolumu yorumlar={yorumlar} kitaplar={kitaplar} />
      </section>
      <Footer />
    </main>
  );
}

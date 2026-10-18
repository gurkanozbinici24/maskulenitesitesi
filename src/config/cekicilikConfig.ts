/**
 * Merkezi Lansman, Geri Sayım ve Satış Yapılandırması (İki Kitap Ortak Config)
 *
 * Hem "Çekicilik Sanatı" hem de "Vazgeçilmez Olma Sanatı — Yenilenmiş Edisyon"
 * aynı çıkış tarihini (5 Kasım 2026 20:00 TSİ), aynı geri sayımı ve aynı
 * ödeme bayrağını (KART_ODEME_AKTIF) kullanır.
 */

/** Satış başlangıç ve geri sayım hedef tarihi (Türkiye saati, UTC+3) */
export const RELEASE_DATE = "2026-11-05T20:00:00+03:00";

/** Tanıtım filmi linki (YouTube veya Instagram). Boş bırakılırsa buton gizlenir, doluysa açılır pencerede oynatılır. */
export const TRAILER_URL = "";

/** iyzico kartla ödeme onayı geldiğinde true yapılacak bayrak */
export const KART_ODEME_AKTIF = false;

/** Sipariş ve bilgilendirme için resmi WhatsApp hattı */
export const WHATSAPP_PHONE = "905455207999";

/** Resmi Instagram adresi */
export const INSTAGRAM_URL = "https://www.instagram.com/maskulenitesitesi";

export interface CekicilikProductOption {
  id:
    | "cekicilik-ekitap"
    | "cekicilik-fiziksel"
    | "vazgecilmez-ekitap"
    | "vazgecilmez-fiziksel-yenilenmis";
  type: "ebook" | "physical";
  title: string;
  shortTitle: string;
  subtitle: string;
  badgeText: string;
  price: number;
  currency: string;
  shippingNote?: string;
  description: string;
  features: string[];
  whatsappMessage: string;
  whatsappUrl: string;
}

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/* ============================================================================
 * 1. KİTAP: VAZGEÇİLMEZ OLMA SANATI (E-Kitap + Yenilenmiş Edisyon Fiziksel)
 * ========================================================================== */

const VAZGECILMEZ_EBOOK_WHATSAPP_MESSAGE =
  "Merhaba, Vazgeçilmez Olma Sanatı e-kitap paketini satın almak istiyorum.";

const VAZGECILMEZ_PHYSICAL_NOTIFY_MESSAGE =
  "Merhaba, Vazgeçilmez Olma Sanatı Yenilenmiş Edisyon fiziksel kitabı çıktığında haber almak istiyorum.";

const VAZGECILMEZ_PHYSICAL_ORDER_MESSAGE =
  "Merhaba, Vazgeçilmez Olma Sanatı Yenilenmiş Edisyon fiziksel kitabını satın almak istiyorum.";

/**
 * Kitaptan önizleme sayfaları. clearUntil: sayfanın yüzde kaçı net görünür (gerisi bulanık).
 * 100 = sayfa tamamen açık. Öneri: ilk sayfalar açık, son sayfa en can alıcı yerde kilitli.
 * Yeni sayfa eklemek için görseli /public klasörüne koyup buraya ekleyin.
 */
export const VAZGECILMEZ_PREVIEW_PAGES = [
  { src: "/sayfa1.png", title: "Bu Kitabı Okumadan Önce", clearUntil: 100 },
  { src: "/sayfa2.png", title: "Bu Kitabı Bitirdiğinde", clearUntil: 100 },
  { src: "/sayfa3.png", title: "Bölüm 1: İyi Çocuk Masalının Sonu", clearUntil: 46 },
];

/** Çekicilik Sanatı önizleme sayfaları: görseller gelince doldurulacak (boşken bölüm gizli). */
export const CEKICILIK_PREVIEW_PAGES: { src: string; title: string; clearUntil: number }[] = [];

export const VAZGECILMEZ_CONFIG = {
  bookTitle: "Vazgeçilmez Olma Sanatı",
  coverImage: "/vazgecilmez-yeni-kapak.jpg",
  releaseDate: RELEASE_DATE,
  kartOdemeAktif: KART_ODEME_AKTIF,
  editionNote:
    "1. Baskı Koleksiyon Serisi (200 adet) tükendi. Yenilenmiş Edisyon: aynı içerik, yeni kapak, daha okunaklı büyük punto.",
  ebook: {
    id: "vazgecilmez-ekitap" as const,
    type: "ebook" as const,
    title: "Vazgeçilmez Olma Sanatı",
    shortTitle: "E-Kitap",
    subtitle: "E-Kitap Paketi",
    badgeText: "E-KİTAP SATIŞTA",
    price: 600,
    currency: "TL",
    whatsappMessage: VAZGECILMEZ_EBOOK_WHATSAPP_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(VAZGECILMEZ_EBOOK_WHATSAPP_MESSAGE),
  },
  physicalRenovated: {
    id: "vazgecilmez-fiziksel-yenilenmis" as const,
    type: "physical" as const,
    title: "Vazgeçilmez Olma Sanatı",
    shortTitle: "Fiziksel Kitap (Yenilenmiş Edisyon)",
    subtitle: "Yenilenmiş Edisyon — Fiziksel Kitap",
    preLaunchBadgeText: "Yenilenmiş Edisyon – 5 Kasım'da Satışta",
    saleBadgeText: "SATIŞTA • ÜCRETSİZ KARGO",
    price: 1000,
    currency: "TL",
    shippingNote: "Kapıya kadar ücretsiz kargo",
    notifyWhatsappMessage: VAZGECILMEZ_PHYSICAL_NOTIFY_MESSAGE,
    notifyWhatsappUrl: buildWhatsAppUrl(VAZGECILMEZ_PHYSICAL_NOTIFY_MESSAGE),
    orderWhatsappMessage: VAZGECILMEZ_PHYSICAL_ORDER_MESSAGE,
    orderWhatsappUrl: buildWhatsAppUrl(VAZGECILMEZ_PHYSICAL_ORDER_MESSAGE),
  },
} as const;

/* ============================================================================
 * 2. KİTAP: ÇEKİCİLİK SANATI (E-Kitap + Fiziksel Kitap)
 * ========================================================================== */

const EBOOK_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı E-Kitap paketini satın almak istiyorum.";

const PHYSICAL_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı Fiziksel Kitap'ı satın almak istiyorum.";

const NOTIFY_WHATSAPP_MESSAGE =
  "Çekicilik Sanatı çıktığında haber almak istiyorum.";

export const CEKICILIK_PRODUCTS: {
  ebook: CekicilikProductOption;
  physical: CekicilikProductOption;
} = {
  ebook: {
    id: "cekicilik-ekitap",
    type: "ebook",
    title: "Çekicilik Sanatı",
    shortTitle: "E-Kitap",
    subtitle: "E-Kitap Paketi",
    badgeText: "DİJİTAL SÜRÜM",
    price: 600,
    currency: "TL",
    description:
      "Kargo bekleme veya adres girme süreçleriyle vakit kaybetmeyin. Ödemenizin ardından e-kitabınız (dijital formatta) doğrudan e-posta adresinize gönderilir. Telefon, tablet veya bilgisayarınızdan hemen okumaya başlayın.",
    features: [
      "Tam Metin (Tüm bölümler ve karanlık çekim yasaları)",
      "PDF, EPUB ve Kindle (.mobi) formatlarında",
      "Ömür boyu erişim ve dijital revizyon güncellemeleri",
      "Fiziksel kargo beklemeden, e-posta ile dijital teslimat",
    ],
    whatsappMessage: EBOOK_WHATSAPP_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(EBOOK_WHATSAPP_MESSAGE),
  },
  physical: {
    id: "cekicilik-fiziksel",
    type: "physical",
    title: "Çekicilik Sanatı",
    shortTitle: "Fiziksel Kitap",
    subtitle: "Fiziksel Kitap",
    badgeText: "ÜCRETSİZ KARGO",
    price: 1000,
    currency: "TL",
    shippingNote: "Kapıya kadar ücretsiz kargo",
    description:
      "Birinci sınıf özel dokulu kapak ve yüksek gramajlı kitap kağıdıyla kütüphaneniz için üretilmiş koleksiyon baskısı. Kapıya kadar ücretsiz kargo ve korumalı özel paketleme ile adresinize teslim edilir.",
    features: [
      "Kapıya kadar ücretsiz kargo (Tüm Türkiye'ye ek ücreti olmadan)",
      "1. Sınıf özel dokulu mat kapak ve yüksek kalite baskı",
      "Özel korumalı, dışarıdan içeriği görünmeyen gizli paketleme",
      "Kargo takip numarası ile adım adım teslimat bilgilendirmesi",
    ],
    whatsappMessage: PHYSICAL_WHATSAPP_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(PHYSICAL_WHATSAPP_MESSAGE),
  },
};

export const CEKICILIK_SANATI_CONFIG = {
  bookTitle: "Çekicilik Sanatı",
  coverImage: "/cekicilik-sanati-kapak.jpg",
  releaseDate: RELEASE_DATE,
  trailerUrl: TRAILER_URL,
  kartOdemeAktif: KART_ODEME_AKTIF,
  whatsappPhone: WHATSAPP_PHONE,
  instagramUrl: INSTAGRAM_URL,
  notifyWhatsappMessage: NOTIFY_WHATSAPP_MESSAGE,
  notifyWhatsappUrl: buildWhatsAppUrl(NOTIFY_WHATSAPP_MESSAGE),
  products: CEKICILIK_PRODUCTS,
} as const;

import { VAZGECILMEZ_PREVIEW_TEXT } from "./vazgecilmezPreviewText";
import { CEKICILIK_PREVIEW_TEXT } from "./cekicilikPreviewText";

/**
 * Merkezi Lansman, Geri Sayım ve Satış Yapılandırması (İki Kitap Ortak Config)
 *
 * Hem "Çekicilik Sanatı" hem de "Vazgeçilmez Olma Sanatı — Yenilenmiş Edisyon"
 * aynı çıkış tarihini (5 Kasım 2026 18:00 TSİ), aynı geri sayımı ve aynı
 * ödeme bayrağını (KART_ODEME_AKTIF) kullanır.
 */

/** Satış başlangıç ve geri sayım hedef tarihi (Türkiye saati, UTC+3) */
export const RELEASE_DATE = "2026-11-05T18:00:00+03:00";

/** Tanıtım filmi linki (YouTube veya Instagram). Boş bırakılırsa buton gizlenir, doluysa açılır pencerede oynatılır. */
export const TRAILER_URL = "";

/** iyzico kartla ödeme onayı geldiğinde true yapılacak bayrak */
export const KART_ODEME_AKTIF = false;

/** Sipariş ve bilgilendirme için resmi WhatsApp hattı */
export const WHATSAPP_PHONE = "905455207999";

/** Resmi Instagram adresi */
export const INSTAGRAM_URL = "https://www.instagram.com/maskulenitesitesi";

/* ============================================================================
 * FİZİKSEL KİTAP AYRICALIKLARI: Flash Hızda Kargo + İsme Özel İmza
 * Tüm fiziksel kitap kartları ve Koleksiyon Seti bu metinleri kullanır.
 * ========================================================================== */
export const PHYSICAL_PERKS = {
  cargoTitle: "Flash Hızda Kargo",
  cargoDetail: "14:00'e kadar verilen siparişler aynı gün Yurtiçi Kargo'da",
  cargoDelivery: "2 günde elinde",
  signatureTitle: "İsme Özel İmzalı",
  signatureMessage: "Senin adını yazarak, sana özel imzalayıp gönderiyorum.",
  signatureAuthor: "Gürkan Özbinici",
} as const;

/** Fiziksel sipariş mesajlarına eklenen satır: imza için isim sipariş anında alınır */
const IMZA_SATIRI = "\n\nİmza için isim: ";
/** Hediye siparişleri için mesaj eki */
const HEDIYE_SATIRI = "\n\nHediye edeceğim kişinin adı (imza için): ";
const hediyeMesaji = (urun: string) => `Merhaba, ${urun} hediye olarak göndermek istiyorum.` + HEDIYE_SATIRI;

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
  /** Sadece fiziksel ürünlerde: "Hediye olarak gönder" WhatsApp linki */
  giftWhatsappUrl?: string;
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
  "Merhaba, Vazgeçilmez Olma Sanatı Yenilenmiş Edisyon fiziksel kitabını satın almak istiyorum." + IMZA_SATIRI;

/**
 * Kitaptan önizleme sayfaları. clearUntil: sayfanın yüzde kaçı net görünür (gerisi bulanık).
 * 100 = sayfa tamamen açık. Öneri: ilk sayfalar açık, son sayfa en can alıcı yerde kilitli.
 * Yeni sayfa eklemek için görseli /public klasörüne koyup buraya ekleyin.
 */
export const VAZGECILMEZ_PREVIEW_PAGES: {
  src: string;
  title: string;
  clearUntil: number;
  text?: string[];
  visibleParas?: number;
}[] = [
  { src: "/vazgecilmez-sayfa1.jpg", title: "Bu Kitabı Okumadan Önce", clearUntil: 100, text: VAZGECILMEZ_PREVIEW_TEXT[0] },
  { src: "/vazgecilmez-sayfa2.jpg", title: "Bu Kitabı Bitirdiğinde", clearUntil: 100, text: VAZGECILMEZ_PREVIEW_TEXT[1] },
  // 3. sayfa ikinci paragrafın ilk satırlarından sonra kilitlenir
  { src: "/vazgecilmez-sayfa3.jpg", title: "İyi Çocuk Masalının Sonu", clearUntil: 45, text: VAZGECILMEZ_PREVIEW_TEXT[2], visibleParas: 1 },
];

/** Çekicilik Sanatı önizleme sayfaları (sıra: Kadın, İstediğinde, Her Kapının). */
export const CEKICILIK_PREVIEW_PAGES: {
  src: string;
  title: string;
  clearUntil: number;
  /** Telefondaki okuma modu için sayfa metni */
  text?: string[];
  /** Kilitli sayfada okuma modunda gösterilecek paragraf sayısı */
  visibleParas?: number;
}[] = [
  { src: "/cekicilik-sayfa1.jpg", title: "Kadın", clearUntil: 100, text: CEKICILIK_PREVIEW_TEXT[0] },
  { src: "/cekicilik-sayfa2.jpg", title: "İstediğinde", clearUntil: 100, text: CEKICILIK_PREVIEW_TEXT[1] },
  // Son sayfa: "…her kapıyı açacağını fısıldadılar, değil mi?" satırından sonra kilitlenir (merak noktası).
  // 4. sayfa ("Anahtarıdır") önceki sayfaların tekrarı gibi durduğu için önizlemeden çıkarıldı.
  { src: "/cekicilik-sayfa3.jpg", title: "Her Kapının", clearUntil: 70, text: CEKICILIK_PREVIEW_TEXT[2], visibleParas: 5 },
];

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
    giftWhatsappUrl: buildWhatsAppUrl(hediyeMesaji("Vazgeçilmez Olma Sanatı (Yenilenmiş Edisyon) kitabını")),
  },
} as const;

/* ============================================================================
 * 2. KİTAP: ÇEKİCİLİK SANATI (E-Kitap + Fiziksel Kitap)
 * ========================================================================== */

const EBOOK_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı E-Kitap paketini satın almak istiyorum.";

const PHYSICAL_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı Fiziksel Kitap'ı satın almak istiyorum." + IMZA_SATIRI;

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
      "Yazarın kendi elinden, isminize özel imzalı gönderim",
      "Kargo takip numarası ile adım adım teslimat bilgilendirmesi",
    ],
    whatsappMessage: PHYSICAL_WHATSAPP_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(PHYSICAL_WHATSAPP_MESSAGE),
    giftWhatsappUrl: buildWhatsAppUrl(hediyeMesaji("Çekicilik Sanatı fiziksel kitabını")),
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

/* ============================================================================
 * 3. KOLEKSİYON SETİ: İki fiziksel kitap birlikte (5 Kasım'da satışta)
 * ========================================================================== */

const SET_NOTIFY_MESSAGE =
  "Merhaba, Koleksiyon Seti (2 fiziksel kitap) satışa çıktığında haber almak istiyorum.";
const SET_ORDER_MESSAGE =
  "Merhaba, Koleksiyon Seti'ni (Vazgeçilmez Olma Sanatı + Çekicilik Sanatı, 2 fiziksel kitap, 1700 TL) satın almak istiyorum." +
  "\n\nVazgeçilmez Olma Sanatı imzası için isim: \nÇekicilik Sanatı imzası için isim: ";

export const KOLEKSIYON_SETI_CONFIG = {
  name: "Koleksiyon Seti",
  oldPrice: 2000,
  price: 1700,
  currency: "TL",
  releaseDate: RELEASE_DATE,
  /** "Lansmana Özel" etiketinin kendiliğinden kalkacağı an */
  launchSpecialUntil: "2026-11-30T23:59:59+03:00",
  notifyWhatsappUrl: buildWhatsAppUrl(SET_NOTIFY_MESSAGE),
  orderWhatsappUrl: buildWhatsAppUrl(SET_ORDER_MESSAGE),
  giftWhatsappUrl: buildWhatsAppUrl(hediyeMesaji("Koleksiyon Seti'ni (2 fiziksel kitap)")),
} as const;

/* ============================================================================
 * 4. BİREBİR DANIŞMANLIK (VIP strateji seansı)
 * ========================================================================== */
const DANISMANLIK_MESAJ =
  "Merhaba, 45 dakikalık birebir strateji seansı (6.500 TL) için randevu almak istiyorum." +
  "\n\nTercih ettiğim platform (Google Meet / WhatsApp): " +
  "\nUygun olduğum gün ve saatler: ";

export const DANISMANLIK_CONFIG = {
  price: 6500,
  priceLabel: "6.500",
  currency: "TL",
  /** Seans + hediyelerin toplam değeri (6.500 seans + 1.200 e-kitap + 3.500 WhatsApp desteği) */
  totalValueLabel: "11.200",
  gifts: [
    { label: "2 e-kitap", value: "1.200" },
    { label: "1 hafta WhatsApp desteği", value: "3.500" },
  ],
  durationMin: 45,
  platforms: ["Google Meet", "WhatsApp"],
  formats: "Sesli veya görüntülü",
  whatsappUrl: buildWhatsAppUrl(DANISMANLIK_MESAJ),
  instagramUrl: INSTAGRAM_URL,
  /** VIP Mentörlük (aylık) */
  vip: {
    name: "VIP Mentörlük",
    price: 45000,
    priceLabel: "45.000",
    period: "ay",
    sessionsPerMonth: 4,
    /**
     * LANSMAN FİYATI: ilk 3 VIP danışana özel.
     * Her VIP satışında launchSlotsLeft'i 1 azaltın; 0 olunca site otomatik olarak liste fiyatına (priceLabel) döner.
     */
    /** Paketteki kalemlerin tek tek değeri (toplamı fiyattan düşükse sitede üstü çizili "değer" gösterilmez) */
    items: [
      { label: "4 birebir seans", value: 26000 },
      { label: "4 hafta boyunca ulaşılabilir mesaj koçluğu", value: 14000 },
      { label: "2 imzalı fiziksel kitap", value: 2000 },
      { label: "Acil kriz görüşmesi (15 dk)", value: 2200 },
    ],
    totalValue: 44200,
    totalValueLabel: "44.200",
    launchPrice: 20000,
    launchPriceLabel: "20.000",
    launchSlotsTotal: 3,
    launchSlotsLeft: 0,
    monthlySlots: 5,
    supportNote: "24:00'ten sonra yazılan mesajlar ertesi gün cevaplanır.",
  },
  /** Başvurunun gönderileceği WhatsApp hattı */
  phone: WHATSAPP_PHONE,
} as const;

/** VIP için şu an geçerli fiyat (lansman kontenjanı varsa lansman fiyatı) */
export const VIP_LAUNCH_ACTIVE = DANISMANLIK_CONFIG.vip.launchSlotsLeft > 0;
/** Paket değeri fiyattan yüksekse üstü çizili değer gösterilir */
export const VIP_SHOW_VALUE =
  DANISMANLIK_CONFIG.vip.totalValue >
  (VIP_LAUNCH_ACTIVE ? DANISMANLIK_CONFIG.vip.launchPrice : DANISMANLIK_CONFIG.vip.price);
export const VIP_PRICE_LABEL = VIP_LAUNCH_ACTIVE
  ? DANISMANLIK_CONFIG.vip.launchPriceLabel
  : DANISMANLIK_CONFIG.vip.priceLabel;

/**
 * Çekicilik Sanatı — Merkezi Lansman, Geri Sayım ve Satış Yapılandırması
 *
 * Sitedeki tüm bileşenler (ana sayfa, kitap kartları, alt bar, tanıtım sayfası)
 * durumunu, fiyatlarını ve butonlarını tek bir merkezden (bu dosyadan) alır.
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
  id: "cekicilik-ekitap" | "cekicilik-fiziksel";
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

const EBOOK_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı E-Kitap paketini satın almak istiyorum.";

const PHYSICAL_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı Fiziksel Kitap'ı satın almak istiyorum.";

const NOTIFY_WHATSAPP_MESSAGE =
  "Merhaba, Çekicilik Sanatı kitabı satışa çıktığında haberdar olmak istiyorum.";

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

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
    badgeText: "ANINDA TESLİMAT",
    price: 600,
    currency: "TL",
    description:
      "Kargo bekleme veya adres girme süreçleriyle vakit kaybetmeyin. Ödemenizin ardından e-kitabınız (dijital formatta) doğrudan e-posta adresinize gönderilir. Telefon, tablet veya bilgisayarınızdan saniyeler içinde okumaya başlayın.",
    features: [
      "Tam Metin (Tüm bölümler ve karanlık çekim yasaları)",
      "PDF, EPUB ve Kindle (.mobi) formatlarında anında indirme",
      "Ömür boyu erişim ve dijital revizyon güncellemeleri",
      "Fiziksel kargo beklemeden, e-posta adresinize anında dijital teslimat",
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
  releaseDate: RELEASE_DATE,
  trailerUrl: TRAILER_URL,
  kartOdemeAktif: KART_ODEME_AKTIF,
  whatsappPhone: WHATSAPP_PHONE,
  instagramUrl: INSTAGRAM_URL,
  notifyWhatsappMessage: NOTIFY_WHATSAPP_MESSAGE,
  notifyWhatsappUrl: buildWhatsAppUrl(NOTIFY_WHATSAPP_MESSAGE),
  products: CEKICILIK_PRODUCTS,
} as const;

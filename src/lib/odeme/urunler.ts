/**
 * Kartla ödeme (iyzico) ürün kataloğu.
 * Fiyatlar sunucu tarafında BURADAN okunur; tarayıcıdan gelen fiyata asla güvenilmez.
 * Fiyatlar sitedeki config ile aynı kaynaktan gelir, böylece tek yerden değişir.
 */
import {
  CEKICILIK_PRODUCTS,
  KOLEKSIYON_SETI_CONFIG,
  RELEASE_DATE,
  VAZGECILMEZ_CONFIG,
} from "@/config/cekicilikConfig";

export type UrunId =
  | "vazgecilmez-ekitap"
  | "vazgecilmez-fiziksel-yenilenmis"
  | "cekicilik-ekitap"
  | "cekicilik-fiziksel"
  | "koleksiyon-seti"
  | "ikili-ekitap"
  | "ikili-fiziksel";

/** Fiziksel kitap ödemesinde "diğer kitabı da ekle" kutusuyla 2. fiziksel kitabın fiyatı */
export const IKINCI_FIZIKSEL_FIYAT = 700;

export interface OdemeUrunu {
  id: UrunId;
  ad: string;
  fiyat: number;
  /** ebook: e-posta ile teslim (adres istenmez), physical: kargo (adres + imza ismi istenir) */
  tip: "ebook" | "physical";
  /** Kaç kitap imzalanacak (fiziksel ürünlerde imza ismi alanı sayısı) */
  imzaSayisi: number;
  /** Bu tarihten önce satın alınamaz (ISO). Boşsa her zaman satışta. */
  satisBaslangic?: string;
}

export const ODEME_URUNLERI: Record<UrunId, OdemeUrunu> = {
  "vazgecilmez-ekitap": {
    id: "vazgecilmez-ekitap",
    ad: "Vazgeçilmez Olma Sanatı – E-Kitap",
    fiyat: VAZGECILMEZ_CONFIG.ebook.price,
    tip: "ebook",
    imzaSayisi: 0,
  },
  "vazgecilmez-fiziksel-yenilenmis": {
    id: "vazgecilmez-fiziksel-yenilenmis",
    ad: "Vazgeçilmez Olma Sanatı – Fiziksel Kitap (Yenilenmiş Edisyon)",
    fiyat: VAZGECILMEZ_CONFIG.physicalRenovated.price,
    tip: "physical",
    imzaSayisi: 1,
    satisBaslangic: RELEASE_DATE,
  },
  "cekicilik-ekitap": {
    id: "cekicilik-ekitap",
    ad: "Çekicilik Sanatı – E-Kitap",
    fiyat: CEKICILIK_PRODUCTS.ebook.price,
    tip: "ebook",
    imzaSayisi: 0,
    satisBaslangic: RELEASE_DATE,
  },
  "cekicilik-fiziksel": {
    id: "cekicilik-fiziksel",
    ad: "Çekicilik Sanatı – Fiziksel Kitap",
    fiyat: CEKICILIK_PRODUCTS.physical.price,
    tip: "physical",
    imzaSayisi: 1,
    satisBaslangic: RELEASE_DATE,
  },
  "koleksiyon-seti": {
    id: "koleksiyon-seti",
    ad: "Koleksiyon Seti – Vazgeçilmez Olma Sanatı + Çekicilik Sanatı (2 Fiziksel Kitap)",
    fiyat: KOLEKSIYON_SETI_CONFIG.price,
    tip: "physical",
    imzaSayisi: 2,
    satisBaslangic: RELEASE_DATE,
  },
  // Sitede ayrı kartı yok: sadece ödeme sayfasındaki "diğer kitabı da ekle" kutusuyla seçilir.
  "ikili-ekitap": {
    id: "ikili-ekitap",
    ad: "Vazgeçilmez Olma Sanatı + Çekicilik Sanatı – 2 E-Kitap",
    fiyat: VAZGECILMEZ_CONFIG.ebook.price + CEKICILIK_PRODUCTS.ebook.price,
    tip: "ebook",
    imzaSayisi: 0,
    satisBaslangic: RELEASE_DATE,
  },
  "ikili-fiziksel": {
    id: "ikili-fiziksel",
    ad: `Vazgeçilmez Olma Sanatı + Çekicilik Sanatı – 2 Fiziksel Kitap (2. kitap ${IKINCI_FIZIKSEL_FIYAT} TL)`,
    fiyat: VAZGECILMEZ_CONFIG.physicalRenovated.price + IKINCI_FIZIKSEL_FIYAT,
    tip: "physical",
    imzaSayisi: 2,
    satisBaslangic: RELEASE_DATE,
  },
};

/** Ödeme sayfasındaki "diğer kitabı da ekle" kutusu: hangi üründen hangi ikiliye geçilir */
export interface Ekleme {
  hedef: UrunId;
  /** Kutuda yazan kitap adı */
  kitap: string;
  ekFiyat: number;
  /** Eklenince imza alanında asıl kitabın sırası (0: Vazgeçilmez, 1: Çekicilik) */
  asilSira: 0 | 1;
}

export const EKLEMELER: Partial<Record<UrunId, Ekleme>> = {
  "vazgecilmez-ekitap": { hedef: "ikili-ekitap", kitap: "Çekicilik Sanatı", ekFiyat: CEKICILIK_PRODUCTS.ebook.price, asilSira: 0 },
  "cekicilik-ekitap": { hedef: "ikili-ekitap", kitap: "Vazgeçilmez Olma Sanatı", ekFiyat: VAZGECILMEZ_CONFIG.ebook.price, asilSira: 1 },
  "vazgecilmez-fiziksel-yenilenmis": { hedef: "ikili-fiziksel", kitap: "Çekicilik Sanatı", ekFiyat: IKINCI_FIZIKSEL_FIYAT, asilSira: 0 },
  "cekicilik-fiziksel": { hedef: "ikili-fiziksel", kitap: "Vazgeçilmez Olma Sanatı (Yenilenmiş Edisyon)", ekFiyat: IKINCI_FIZIKSEL_FIYAT, asilSira: 1 },
};

/** Bu ürünün ödeme sayfasında ekleme kutusu gösterilsin mi? (hedef ürün satışta olmalı) */
export function eklemeBul(urun: OdemeUrunu, simdi = Date.now()): (Ekleme & { hedefUrun: OdemeUrunu }) | null {
  const e = EKLEMELER[urun.id];
  if (!e) return null;
  const hedefUrun = ODEME_URUNLERI[e.hedef];
  return satistaMi(hedefUrun, simdi) ? { ...e, hedefUrun } : null;
}

export function urunBul(id: string | null | undefined): OdemeUrunu | null {
  if (!id) return null;
  return (ODEME_URUNLERI as Record<string, OdemeUrunu>)[id] ?? null;
}

export function satistaMi(urun: OdemeUrunu, simdi = Date.now()): boolean {
  return !urun.satisBaslangic || simdi >= new Date(urun.satisBaslangic).getTime();
}

/** Ödeme sayfasının linki (butonlarda kullanılır) */
export const odemeLinki = (id: UrunId) => `/odeme?urun=${id}`;

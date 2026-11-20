import type { UrunId } from "./urunler";

/**
 * 48 saatlik "fiziksel kitaba e-kitap hediye" kampanyası.
 * Süre dolunca site bandı, ödeme sayfası kutusu ve otomatik PDF gönderimi kendiliğinden kapanır.
 */
export const HEDIYE_KAMPANYA = {
  bas: "2026-11-06T05:00:00+03:00",
  bitis: "2026-11-08T05:30:00+03:00",
};

export const kampanyaBitisMs = () => Date.parse(HEDIYE_KAMPANYA.bitis);
export const kampanyaAktif = (t: number = Date.now()) =>
  t >= Date.parse(HEDIYE_KAMPANYA.bas) && t < kampanyaBitisMs();

/** Fiziksel ürün -> hediye edilecek e-kitap ürünü */
export const HEDIYE_EKITAP: Partial<Record<UrunId, UrunId>> = {
  "vazgecilmez-fiziksel-yenilenmis": "vazgecilmez-ekitap",
  "cekicilik-fiziksel": "cekicilik-ekitap",
  "koleksiyon-seti": "ikili-ekitap",
  "ikili-fiziksel": "ikili-ekitap",
};

/**
 * 24 saatlik "Havale / EFT ile indirim" kampanyası.
 * Fiziksel: tek kitap 500 TL, iki kitap 1000 TL (%50). E-kitap (PDF): tek 300 TL, iki 600 TL (%50).
 * E-kitapta havale yalnızca bu kampanya sürerken açık (PDF, ödeme görülünce tek tıkla gönderilir).
 * Kartla ödemede fiyat değişmez. Süre dolunca indirim, bant ve rozetler kendiliğinden kapanır.
 * Fiyat sunucuda buradan hesaplanır; tarayıcıdan gelen tutara güvenilmez.
 */
export const HAVALE_KAMPANYA = {
  bas: "2026-11-20T03:00:00+03:00",
  bitis: "2026-11-20T16:40:00+03:00",
  yuzde: 50,
};

export const HAVALE_KAMPANYA_FIYAT: Partial<Record<UrunId, number>> = {
  "vazgecilmez-fiziksel-yenilenmis": 500,
  "cekicilik-fiziksel": 500,
  "koleksiyon-seti": 1000,
  "ikili-fiziksel": 1000,
  "vazgecilmez-ekitap": 300,
  "cekicilik-ekitap": 300,
  "ikili-ekitap": 600,
};

export const havaleKampanyaBitisMs = () => Date.parse(HAVALE_KAMPANYA.bitis);
export const havaleKampanyaAktif = (t: number = Date.now()) =>
  t >= Date.parse(HAVALE_KAMPANYA.bas) && t < havaleKampanyaBitisMs();

/** Havale indiriminde üstü çizili gösterilecek fiyat (boşsa ürünün kart fiyatı) */
export const HAVALE_REFERANS_FIYAT: Partial<Record<UrunId, number>> = {
  "koleksiyon-seti": 2000,
  "ikili-fiziksel": 2000,
};
export const referansFiyati = (urun: { id: UrunId; fiyat: number }) => HAVALE_REFERANS_FIYAT[urun.id] ?? urun.fiyat;

/** E-kitapta havale seçeneği: yalnızca kampanya sürerken */
export const ekitapHavaleAcik = (t: number = Date.now()) => havaleKampanyaAktif(t);

/** Havale ile ödenecek tutar: kampanya aktifse indirimli, değilse normal fiyat */
export function havaleFiyati(urun: { id: UrunId; fiyat: number }, t: number = Date.now()): number {
  const k = HAVALE_KAMPANYA_FIYAT[urun.id];
  return havaleKampanyaAktif(t) && k != null ? k : urun.fiyat;
}

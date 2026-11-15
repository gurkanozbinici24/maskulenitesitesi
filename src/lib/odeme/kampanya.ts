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
 * Fiziksel: tek kitap 800 TL, iki kitap 1600 TL. E-kitap (PDF): tek 499 TL, iki 949 TL.
 * E-kitapta havale yalnızca bu kampanya sürerken açık (PDF, ödeme görülünce tek tıkla gönderilir).
 * Kartla ödemede fiyat değişmez. Süre dolunca indirim, bant ve rozetler kendiliğinden kapanır.
 * Fiyat sunucuda buradan hesaplanır; tarayıcıdan gelen tutara güvenilmez.
 */
export const HAVALE_KAMPANYA = {
  bas: "2026-11-15T07:30:00+03:00",
  bitis: "2026-11-16T08:00:00+03:00",
  yuzde: 20,
};

export const HAVALE_KAMPANYA_FIYAT: Partial<Record<UrunId, number>> = {
  "vazgecilmez-fiziksel-yenilenmis": 800,
  "cekicilik-fiziksel": 800,
  "koleksiyon-seti": 1600,
  "ikili-fiziksel": 1600,
  "vazgecilmez-ekitap": 499,
  "cekicilik-ekitap": 499,
  "ikili-ekitap": 949,
};

export const havaleKampanyaBitisMs = () => Date.parse(HAVALE_KAMPANYA.bitis);
export const havaleKampanyaAktif = (t: number = Date.now()) =>
  t >= Date.parse(HAVALE_KAMPANYA.bas) && t < havaleKampanyaBitisMs();

/** E-kitapta havale seçeneği: yalnızca kampanya sürerken */
export const ekitapHavaleAcik = (t: number = Date.now()) => havaleKampanyaAktif(t);

/** Havale ile ödenecek tutar: kampanya aktifse indirimli, değilse normal fiyat */
export function havaleFiyati(urun: { id: UrunId; fiyat: number }, t: number = Date.now()): number {
  const k = HAVALE_KAMPANYA_FIYAT[urun.id];
  return havaleKampanyaAktif(t) && k != null ? k : urun.fiyat;
}

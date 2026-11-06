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

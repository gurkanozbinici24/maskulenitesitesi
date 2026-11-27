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
 * 4 saatlik havale / EFT indirimi. Yalnızca havale ile ödemede geçerlidir; kartla ödemede fiyat değişmez.
 * Tek fiziksel kitap 1000 -> 700 TL (%30), iki fiziksel kitap 2000 -> 1400 TL (%30),
 * e-kitap 600 -> 400 TL (%33), iki e-kitap 1200 -> 750 TL (%38). Kargo ücretsiz.
 * Süre dolunca indirim, bant ve rozetler kendiliğinden kapanır.
 * Fiyat sunucuda buradan hesaplanır; tarayıcıdan gelen tutara güvenilmez.
 */
export const HAVALE_KAMPANYA = {
  bas: "2026-11-27T17:30:00+03:00",
  bitis: "2026-11-28T01:30:00+03:00",
  /** Tek fiziksel kitap */
  kitapYuzde: 30,
  /** İki fiziksel kitap (koleksiyon seti ve ikili paket) */
  ikiliYuzde: 30,
  /** Tek e-kitap */
  ekitapYuzde: 33,
  /** İki e-kitap */
  ikiliEkitapYuzde: 38,
};

/** Havale ile ödenecek birim fiyatlar */
export const HAVALE_KAMPANYA_FIYAT: Partial<Record<UrunId, number>> = {
  "vazgecilmez-fiziksel-yenilenmis": 700,
  "cekicilik-fiziksel": 700,
  "koleksiyon-seti": 1400,
  "ikili-fiziksel": 1400,
  "vazgecilmez-ekitap": 500,
  "cekicilik-ekitap": 500,
  "ikili-ekitap": 850,
};

/** İki fiziksel kitap havale ile fiyatı (popup ve ödeme ekranı bunu kullanır) */
export const HAVALE_IKILI_FIYAT = 1400;

export const havaleKampanyaBitisMs = () => Date.parse(HAVALE_KAMPANYA.bitis);
export const havaleKampanyaAktif = (t: number = Date.now()) =>
  t >= Date.parse(HAVALE_KAMPANYA.bas) && t < havaleKampanyaBitisMs();

/** Havale indiriminde üstü çizili gösterilecek fiyat: iki kitapta 2000 TL, diğerlerinde kart fiyatı */
export const HAVALE_REFERANS_FIYAT: Partial<Record<UrunId, number>> = {
  "koleksiyon-seti": 2000,
  "ikili-fiziksel": 2000,
};

/** Havale indirim oranı (%), üstü çizili referans fiyata göre */
export const havaleIndirimYuzde = (id: UrunId): number => {
  if (id === "koleksiyon-seti" || id === "ikili-fiziksel") return HAVALE_KAMPANYA.ikiliYuzde;
  if (id === "ikili-ekitap") return HAVALE_KAMPANYA.ikiliEkitapYuzde;
  if (id === "vazgecilmez-ekitap" || id === "cekicilik-ekitap") return HAVALE_KAMPANYA.ekitapYuzde;
  return HAVALE_KAMPANYA.kitapYuzde;
};
export const referansFiyati = (urun: { id: UrunId; fiyat: number }) => HAVALE_REFERANS_FIYAT[urun.id] ?? urun.fiyat;

/** E-kitapta havale seçeneği: yalnızca kampanya sürerken */
export const ekitapHavaleAcik = (t: number = Date.now()) => havaleKampanyaAktif(t);

/** Havale ile ödenecek tutar: kampanya aktifse indirimli, değilse normal fiyat */
export function havaleFiyati(urun: { id: UrunId; fiyat: number }, t: number = Date.now()): number {
  const k = HAVALE_KAMPANYA_FIYAT[urun.id];
  return havaleKampanyaAktif(t) && k != null ? k : urun.fiyat;
}

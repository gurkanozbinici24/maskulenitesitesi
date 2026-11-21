import { ODEME_URUNLERI, type UrunId } from "./urunler";

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
 * 24 saatlik "Havale / EFT ile indirim" kampanyası: tek fiziksel kitapta %25, diğer ürünlerde %20.
 * E-kitapta havale yalnızca bu kampanya sürerken açık (PDF, ödeme görülünce tek tıkla gönderilir).
 * Kartla ödemede fiyat değişmez. Süre dolunca indirim, bant ve rozetler kendiliğinden kapanır.
 * Fiyat sunucuda buradan hesaplanır; tarayıcıdan gelen tutara güvenilmez.
 */
export const HAVALE_KAMPANYA = {
  bas: "2026-11-21T05:35:00+03:00",
  bitis: "2026-11-22T05:35:00+03:00",
  /** Tek fiziksel kitap */
  kitapYuzde: 25,
  /** İkili paketler ve e-kitaplar (PDF) */
  yuzde: 20,
};

/** Havale indirim oranı: tek fiziksel kitap %25, diğer tüm ürünler (PDF) %20 */
const havaleYuzde = (id: UrunId) =>
  id === "vazgecilmez-fiziksel-yenilenmis" || id === "cekicilik-fiziksel"
    ? HAVALE_KAMPANYA.kitapYuzde
    : HAVALE_KAMPANYA.yuzde;

/** İki fiziksel kitap (koleksiyon seti ve ikili paket) havale ile sabit 1200 TL, kargo ücretsiz */
export const HAVALE_IKILI_FIYAT = 1200;
const SABIT_HAVALE: Partial<Record<UrunId, number>> = {
  "koleksiyon-seti": HAVALE_IKILI_FIYAT,
  "ikili-fiziksel": HAVALE_IKILI_FIYAT,
};

const havaleIndirimli = (id: UrunId) =>
  SABIT_HAVALE[id] ?? Math.round((ODEME_URUNLERI[id].fiyat * (100 - havaleYuzde(id))) / 100);

/** Havale ile ödenecek birim fiyatlar (kart fiyatının indirimli hali) */
export const HAVALE_KAMPANYA_FIYAT: Partial<Record<UrunId, number>> = Object.fromEntries(
  (Object.keys(ODEME_URUNLERI) as UrunId[]).map((id) => [id, havaleIndirimli(id)]),
) as Partial<Record<UrunId, number>>;

export const havaleKampanyaBitisMs = () => Date.parse(HAVALE_KAMPANYA.bitis);
export const havaleKampanyaAktif = (t: number = Date.now()) =>
  t >= Date.parse(HAVALE_KAMPANYA.bas) && t < havaleKampanyaBitisMs();

/** Havale indiriminde üstü çizili gösterilecek fiyat: iki kitapta 2000 TL, diğerlerinde kart fiyatı */
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

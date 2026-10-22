import crypto from "crypto";
import { cokluKomut, komut, veritabaniVarMi } from "./redis";
import type { DegerlendirmeBileti, KitapKey } from "./token";

/**
 * Okur değerlendirmeleri.
 *
 * Kurallar (Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği md. 28/B ile uyumlu):
 *  - Yalnızca satın alan değerlendirebilir (imzalı, siparişe özel link).
 *  - Bir sipariş + bir kitap = bir yorum.
 *  - Yorumlar puandan bağımsız yayınlanır; yalnızca hakaret, kişisel veri, ilgisiz içerik veya spam
 *    gerekçesiyle yayınlanmayabilir. Sıralama tarihe göredir.
 */
export type YorumDurumu = "beklemede" | "yayinda" | "reddedildi";

export const RET_GEREKCELERI = {
  hakaret: "Hakaret, küfür veya nefret söylemi içeriyor",
  kisisel: "Kişisel bilgi içeriyor (telefon, adres, e-posta vb.)",
  ilgisiz: "Kitapla ilgisi yok / reklam",
  spam: "Tekrarlanan veya anlamsız içerik",
} as const;
export type RetGerekcesi = keyof typeof RET_GEREKCELERI;

export interface Yorum {
  id: string;
  kitap: KitapKey;
  siparis: string;
  kanal: "kart" | "elle";
  puan: number;
  metin: string;
  /** sitede görünen isim, ör. "Ahmet Y." */
  gorunenAd: string;
  tarih: number;
  durum: YorumDurumu;
  retGerekcesi?: RetGerekcesi;
  cevap?: { metin: string; tarih: number };
}

/** Bölüm bu sayıya ulaşmadan sitede gösterilmez (boş/az yorum izlenimi vermemek için) */
export const GOSTERIM_ESIGI = 3;

const k = {
  yorum: (id: string) => `yorum:${id}`,
  liste: (kitap: KitapKey, durum: YorumDurumu) => `yorumlar:${kitap}:${durum}`,
  kullanildi: (siparis: string, kitap: KitapKey) => `yorum-kullanildi:${siparis}:${kitap}`,
  siparis: (no: string) => `siparis:${no}`,
  davetKuyrugu: "yorum-davet-kuyrugu",
};

export function gorunenAdUret(ad: string, soyad: string, sadeceBasHarf: boolean) {
  const temiz = (x: string) => x.trim().split(/\s+/)[0] || "";
  const a = temiz(ad);
  const s = temiz(soyad);
  const bas = (x: string) => (x ? `${x[0].toLocaleUpperCase("tr-TR")}.` : "");
  if (sadeceBasHarf) return [bas(a), bas(s)].filter(Boolean).join(" ") || "Okur";
  const ilk = a ? a[0].toLocaleUpperCase("tr-TR") + a.slice(1).toLocaleLowerCase("tr-TR") : "Okur";
  return s ? `${ilk} ${bas(s)}` : ilk;
}

export async function dahaOnceYorumYapildiMi(b: DegerlendirmeBileti) {
  return (await komut<number>("EXISTS", k.kullanildi(b.n, b.k))) === 1;
}

export async function yorumEkle(
  b: DegerlendirmeBileti,
  veri: { puan: number; metin: string; sadeceBasHarf: boolean },
): Promise<"eklendi" | "zaten-var"> {
  const id = crypto.randomBytes(8).toString("hex");
  // Tek sipariş tek yorum: kilit atomik olarak alınır
  const kilit = await komut<string | null>("SET", k.kullanildi(b.n, b.k), id, "NX");
  if (kilit !== "OK") return "zaten-var";
  const y: Yorum = {
    id,
    kitap: b.k,
    siparis: b.n,
    kanal: b.c,
    puan: Math.min(5, Math.max(1, Math.round(veri.puan))),
    metin: veri.metin.trim().slice(0, 2000),
    gorunenAd: gorunenAdUret(b.ad, b.soyad, veri.sadeceBasHarf),
    tarih: Date.now(),
    durum: "beklemede",
  };
  await cokluKomut([
    ["SET", k.yorum(id), JSON.stringify(y)],
    ["ZADD", k.liste(b.k, "beklemede"), y.tarih, id],
  ]);
  return "eklendi";
}

async function yorumlariOku(ids: string[]): Promise<Yorum[]> {
  if (ids.length === 0) return [];
  const ham = await komut<(string | null)[]>("MGET", ...ids.map(k.yorum));
  return ham.filter((x): x is string => !!x).map((x) => JSON.parse(x) as Yorum);
}

export async function yorumlariGetir(kitap: KitapKey, durum: YorumDurumu, limit = 200): Promise<Yorum[]> {
  const ids = await komut<string[]>("ZRANGE", k.liste(kitap, durum), "+inf", "-inf", "BYSCORE", "REV", "LIMIT", 0, limit);
  return yorumlariOku(ids);
}

export async function yorumGetir(id: string): Promise<Yorum | null> {
  const ham = await komut<string | null>("GET", k.yorum(id));
  return ham ? (JSON.parse(ham) as Yorum) : null;
}

async function kaydet(y: Yorum, eskiDurum: YorumDurumu) {
  const islemler: (string | number)[][] = [["SET", k.yorum(y.id), JSON.stringify(y)]];
  if (eskiDurum !== y.durum) {
    islemler.push(["ZREM", k.liste(y.kitap, eskiDurum), y.id], ["ZADD", k.liste(y.kitap, y.durum), y.tarih, y.id]);
  }
  await cokluKomut(islemler);
}

export async function yorumYayinla(id: string) {
  const y = await yorumGetir(id);
  if (!y) return;
  const eski = y.durum;
  y.durum = "yayinda";
  delete y.retGerekcesi;
  await kaydet(y, eski);
}

export async function yorumReddet(id: string, gerekce: RetGerekcesi) {
  if (!(gerekce in RET_GEREKCELERI)) throw new Error("Geçersiz gerekçe");
  const y = await yorumGetir(id);
  if (!y) return;
  const eski = y.durum;
  y.durum = "reddedildi";
  y.retGerekcesi = gerekce;
  await kaydet(y, eski);
}

export async function cevapYaz(id: string, metin: string) {
  const y = await yorumGetir(id);
  if (!y) return;
  const t = metin.trim().slice(0, 1500);
  if (t) y.cevap = { metin: t, tarih: Date.now() };
  else delete y.cevap;
  await kaydet(y, y.durum);
}

export interface Ozet {
  sayi: number;
  ortalama: number;
  dagilim: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function ozetCikar(yorumlar: Yorum[]): Ozet {
  const dagilim = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Ozet["dagilim"];
  for (const y of yorumlar) dagilim[y.puan as 1 | 2 | 3 | 4 | 5]++;
  const sayi = yorumlar.length;
  const ortalama = sayi ? Math.round((yorumlar.reduce((t, y) => t + y.puan, 0) / sayi) * 10) / 10 : 0;
  return { sayi, ortalama, dagilim };
}

/** Sitede gösterilecek yayındaki yorumlar; veritabanı yoksa ya da hata olursa boş döner (site asla bozulmaz) */
export async function yayindakiYorumlar(kitap: KitapKey): Promise<Yorum[]> {
  if (!veritabaniVarMi()) return [];
  try {
    return await yorumlariGetir(kitap, "yayinda");
  } catch (e) {
    console.error("[yorum] okunamadı", e);
    return [];
  }
}

/* ---------- Fiziksel siparişlerde gecikmeli davet ---------- */

export interface DavetKaydi {
  n: string;
  ad: string;
  soyad: string;
  eposta: string;
  kitaplar: KitapKey[];
  t: number;
}

/** Kargo ile giden siparişi davet kuyruğuna ekler; davet birkaç gün sonra günlük görevle gönderilir */
export async function davetKuyrugunaEkle(d: DavetKaydi) {
  if (!veritabaniVarMi()) return;
  await cokluKomut([
    ["SET", k.siparis(d.n), JSON.stringify(d), "EX", 60 * 60 * 24 * 90],
    ["ZADD", k.davetKuyrugu, d.t, d.n],
  ]);
}

export async function zamaniGelenDavetler(oncesi: number): Promise<DavetKaydi[]> {
  const nolar = await komut<string[]>("ZRANGE", k.davetKuyrugu, 0, oncesi, "BYSCORE", "LIMIT", 0, 50);
  if (nolar.length === 0) return [];
  const ham = await komut<(string | null)[]>("MGET", ...nolar.map(k.siparis));
  const kayip = nolar.filter((_, i) => !ham[i]);
  if (kayip.length) await komut("ZREM", k.davetKuyrugu, ...kayip);
  return ham.filter((x): x is string => !!x).map((x) => JSON.parse(x) as DavetKaydi);
}

export async function davetGonderildi(no: string) {
  await komut("ZREM", k.davetKuyrugu, no);
}

import http from "http";
import https from "https";

/**
 * Upstash Redis (Vercel Marketplace) için küçük REST istemcisi — ek paket gerektirmez.
 * Vercel'de veritabanı bağlandığında şu değişkenlerden biri otomatik eklenir:
 *   KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel Marketplace / Upstash, "KV" önekiyle)
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *
 * Not: Next.js'in fetch'i yerine Node'un http(s) modülü kullanılıyor. Böylece ürün sayfaları
 * önceden hazırlanırken (ISR) veritabanı okunabiliyor ve Next.js'in önbellek kuralları
 * yayını bozmuyor. Güncellik, sayfaların revalidate süresi ve panelden yapılan yenilemelerle sağlanır.
 */
type Deger = string | number;

function ayarlar() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.STORAGE_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.STORAGE_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export const veritabaniVarMi = () => ayarlar() !== null;

function postJson(adres: string, token: string, govde: unknown): Promise<{ durum: number; veri: unknown }> {
  return new Promise((coz, reddet) => {
    const u = new URL(adres);
    const istemci = u.protocol === "http:" ? http : https;
    const icerik = JSON.stringify(govde);
    const istek = istemci.request(
      u,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(icerik),
        },
        timeout: 8000,
      },
      (cevap) => {
        let ham = "";
        cevap.setEncoding("utf8");
        cevap.on("data", (p) => (ham += p));
        cevap.on("end", () => {
          try {
            coz({ durum: cevap.statusCode || 0, veri: JSON.parse(ham) });
          } catch {
            reddet(new Error(`Redis: geçersiz cevap (${cevap.statusCode})`));
          }
        });
      },
    );
    istek.on("timeout", () => istek.destroy(new Error("Redis: zaman aşımı")));
    istek.on("error", reddet);
    istek.end(icerik);
  });
}

export async function komut<T = unknown>(...args: Deger[]): Promise<T> {
  const a = ayarlar();
  if (!a) throw new Error("Veritabanı bağlı değil (KV_REST_API_URL / KV_REST_API_TOKEN yok)");
  const { durum, veri } = await postJson(a.url, a.token, args.map(String));
  const j = veri as { result?: T; error?: string };
  if (durum >= 400 || j.error) throw new Error(`Redis: ${j.error || durum}`);
  return j.result as T;
}

export async function cokluKomut(komutlar: Deger[][]): Promise<unknown[]> {
  const a = ayarlar();
  if (!a) throw new Error("Veritabanı bağlı değil");
  if (komutlar.length === 0) return [];
  const { durum, veri } = await postJson(`${a.url}/pipeline`, a.token, komutlar.map((k) => k.map(String)));
  if (durum >= 400 || !Array.isArray(veri)) throw new Error(`Redis pipeline: ${durum}`);
  return (veri as { result?: unknown; error?: string }[]).map((x) => {
    if (x.error) throw new Error(`Redis: ${x.error}`);
    return x.result;
  });
}

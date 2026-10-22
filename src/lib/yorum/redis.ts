/**
 * Upstash Redis (Vercel Marketplace) için küçük REST istemcisi — ek paket gerektirmez.
 * Vercel'de veritabanı bağlandığında şu değişkenlerden biri otomatik eklenir:
 *   KV_REST_API_URL + KV_REST_API_TOKEN   (Vercel Marketplace / Upstash)
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 */
type Deger = string | number;

function ayarlar() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export const veritabaniVarMi = () => ayarlar() !== null;

export async function komut<T = unknown>(...args: Deger[]): Promise<T> {
  const a = ayarlar();
  if (!a) throw new Error("Veritabanı bağlı değil (KV_REST_API_URL / KV_REST_API_TOKEN yok)");
  const res = await fetch(a.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${a.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args.map(String)),
    cache: "no-store",
  });
  const j = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || j.error) throw new Error(`Redis: ${j.error || res.status}`);
  return j.result as T;
}

export async function cokluKomut(komutlar: Deger[][]): Promise<unknown[]> {
  const a = ayarlar();
  if (!a) throw new Error("Veritabanı bağlı değil");
  if (komutlar.length === 0) return [];
  const res = await fetch(`${a.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${a.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(komutlar.map((k) => k.map(String))),
    cache: "no-store",
  });
  const j = (await res.json()) as { result?: unknown; error?: string }[];
  if (!res.ok) throw new Error(`Redis pipeline: ${res.status}`);
  return j.map((x) => {
    if (x.error) throw new Error(`Redis: ${x.error}`);
    return x.result;
  });
}

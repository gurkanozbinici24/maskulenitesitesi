import crypto from "crypto";
import { env } from "./env";
import type { UrunId } from "./urunler";

/**
 * Sipariş bilgileri veritabanı olmadan taşınır: ödeme başlarken imzalanıp
 * iyzico'nun geri dönüş adresine eklenir, dönüşte imza doğrulanır.
 * Böylece kimse adresteki bilgiyi değiştiremez.
 */
export interface Siparis {
  /** sipariş no */
  n: string;
  u: UrunId;
  ad: string;
  soyad: string;
  eposta: string;
  tel: string;
  il?: string;
  ilce?: string;
  adres?: string;
  /** teslim alacak kişi (hediye ise farklı olabilir) */
  alici?: string;
  /** imza isim(ler)i */
  imza?: string[];
  hediye?: boolean;
  not?: string;
}

function anahtar() {
  const k = process.env.ODEME_IMZA_ANAHTARI || env("IYZICO_SECRET_KEY");
  if (!k) throw new Error("İmza anahtarı yok");
  return k;
}

export function siparisPaketle(s: Siparis): { d: string; s: string } {
  const d = Buffer.from(JSON.stringify(s), "utf8").toString("base64url");
  const imza = crypto.createHmac("sha256", anahtar()).update(d).digest("base64url");
  return { d, s: imza };
}

export function siparisAc(d: string | null, s: string | null): Siparis | null {
  if (!d || !s) return null;
  const beklenen = crypto.createHmac("sha256", anahtar()).update(d).digest("base64url");
  const a = Buffer.from(beklenen);
  const b = Buffer.from(s);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(d, "base64url").toString("utf8")) as Siparis;
  } catch {
    return null;
  }
}

export function siparisNoUret() {
  const t = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `MSK${String(t.getFullYear()).slice(2)}${p(t.getMonth() + 1)}${p(t.getDate())}-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;
}

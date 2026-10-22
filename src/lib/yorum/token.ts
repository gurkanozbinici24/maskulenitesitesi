import crypto from "crypto";
import { env } from "@/lib/odeme/env";
import type { UrunId } from "@/lib/odeme/urunler";

export type KitapKey = "vazgecilmez" | "cekicilik";

export const KITAP_ADLARI: Record<KitapKey, string> = {
  vazgecilmez: "Vazgeçilmez Olma Sanatı",
  cekicilik: "Çekicilik Sanatı",
};

/** Bir üründe hangi kitaplar var (set ikisini de içerir) */
export function urundekiKitaplar(u: UrunId): KitapKey[] {
  if (u === "koleksiyon-seti") return ["vazgecilmez", "cekicilik"];
  return u.startsWith("cekicilik") ? ["cekicilik"] : ["vazgecilmez"];
}

/**
 * Değerlendirme linkinin içeriği. İmzalıdır; kimse değiştiremez ya da uyduramaz.
 * Link sadece siparişi veren kişiye gönderilir. Bir sipariş + bir kitap = en fazla bir yorum (veritabanında kontrol edilir).
 */
export interface DegerlendirmeBileti {
  /** sipariş no (WhatsApp/havale siparişlerinde yönetim panelinde oluşturulan no) */
  n: string;
  k: KitapKey;
  /** müşterinin adı ve soyadı (görünen isim bundan üretilir) */
  ad: string;
  soyad: string;
  /** kanal: kart (iyzico) veya elle (yönetim panelinden) */
  c: "kart" | "elle";
  /** oluşturulma zamanı (ms) */
  t: number;
}

function anahtar() {
  const k = process.env.YORUM_IMZA_ANAHTARI || process.env.ODEME_IMZA_ANAHTARI || env("IYZICO_SECRET_KEY");
  if (!k) throw new Error("Yorum imza anahtarı yok");
  return `yorum:${k}`;
}

export function biletOlustur(b: DegerlendirmeBileti): string {
  const d = Buffer.from(JSON.stringify(b), "utf8").toString("base64url");
  const s = crypto.createHmac("sha256", anahtar()).update(d).digest("base64url").slice(0, 32);
  return `${d}.${s}`;
}

export function biletAc(t: string | null | undefined): DegerlendirmeBileti | null {
  if (!t) return null;
  const i = t.lastIndexOf(".");
  if (i <= 0) return null;
  const d = t.slice(0, i);
  const s = t.slice(i + 1);
  const beklenen = crypto.createHmac("sha256", anahtar()).update(d).digest("base64url").slice(0, 32);
  const a = Buffer.from(beklenen);
  const b = Buffer.from(s);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const j = JSON.parse(Buffer.from(d, "base64url").toString("utf8")) as DegerlendirmeBileti;
    return j.n && (j.k === "vazgecilmez" || j.k === "cekicilik") ? j : null;
  } catch {
    return null;
  }
}

export const SITE = "https://www.maskulenitesitesi.com.tr";
export const degerlendirmeLinki = (b: DegerlendirmeBileti) => `${SITE}/degerlendir?t=${biletOlustur(b)}`;

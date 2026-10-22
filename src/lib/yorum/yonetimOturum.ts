import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * Yönetim paneli oturumu. Şifre Vercel'de YONETIM_SIFRESI değişkeninde durur.
 * Çerezde şifrenin kendisi değil, ondan türetilmiş imza saklanır.
 */
export const YONETIM_CEREZI = "msk_yonetim";

const imza = (sifre: string) => crypto.createHmac("sha256", `yonetim:${sifre}`).update("msk-yonetim-oturum").digest("base64url");

export const yonetimSifresiTanimliMi = () => !!process.env.YONETIM_SIFRESI && process.env.YONETIM_SIFRESI.length >= 8;

export function sifreDogruMu(girilen: string) {
  const s = process.env.YONETIM_SIFRESI;
  if (!s || s.length < 8) return false;
  const a = Buffer.from(imza(girilen));
  const b = Buffer.from(imza(s));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function oturumAc() {
  cookies().set(YONETIM_CEREZI, imza(process.env.YONETIM_SIFRESI!), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function oturumKapat() {
  cookies().delete(YONETIM_CEREZI);
}

export function oturumVarMi() {
  const s = process.env.YONETIM_SIFRESI;
  if (!s || s.length < 8) return false;
  const c = cookies().get(YONETIM_CEREZI)?.value;
  if (!c) return false;
  const a = Buffer.from(c);
  const b = Buffer.from(imza(s));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

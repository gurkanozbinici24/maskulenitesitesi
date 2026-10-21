import crypto from "crypto";
import { env } from "./env";
import fs from "fs/promises";
import path from "path";
import type { Siparis } from "./siparis";
import type { OdemeUrunu, UrunId } from "./urunler";

/**
 * E-kitap otomatik teslimatı: başarılı ödemede PDF müşterinin e-postasına ek olarak gönderilir.
 *
 * Dosyalar repo herkese açık olduğu için /ekitaplar klasöründe ŞİFRELİ durur
 * (scripts/ekitap-sifrele.mjs). Çözmek için Vercel'de gereken değişkenler:
 *  - EKITAP_SIFRE_ANAHTARI : şifreleme anahtarı (base64)
 *  - RESEND_API_KEY        : resend.com anahtarı
 *  - EKITAP_GONDEREN       : "Gürkan Özbinici <kitap@maskulenitesitesi.com.tr>" (alan adı Resend'de doğrulanmış olmalı)
 *  - EKITAP_YANIT_ADRESI   : (isteğe bağlı) müşterinin "yanıtla" dediğinde gideceği adres
 */

const DOSYALAR: Partial<Record<UrunId, { enc: string; ad: string; kitap: string }>> = {
  "vazgecilmez-ekitap": {
    enc: "vazgecilmez.enc",
    ad: "Vazgecilmez-Olma-Sanati-Gurkan-Ozbinici.pdf",
    kitap: "Vazgeçilmez Olma Sanatı",
  },
  "cekicilik-ekitap": {
    enc: "cekicilik.enc",
    ad: "Cekicilik-Sanati-Gurkan-Ozbinici.pdf",
    kitap: "Çekicilik Sanatı",
  },
};

async function pdfCoz(dosya: string): Promise<Buffer> {
  const key = Buffer.from(env("EKITAP_SIFRE_ANAHTARI") || "", "base64");
  if (key.length !== 32) throw new Error("EKITAP_SIFRE_ANAHTARI tanımlı değil");
  const veri = await fs.readFile(path.join(process.cwd(), "ekitaplar", dosya));
  const iv = veri.subarray(0, 12);
  const tag = veri.subarray(12, 28);
  const d = crypto.createDecipheriv("aes-256-gcm", key, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(veri.subarray(28)), d.final()]);
}

const kacis = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sonuç: "gonderildi" | "atlandi" (bu üründe e-kitap yok) — hata olursa fırlatır */
export async function ekitapGonder(s: Siparis, urun: OdemeUrunu): Promise<"gonderildi" | "atlandi"> {
  const bilgi = DOSYALAR[urun.id];
  if (urun.tip !== "ebook" || !bilgi) return "atlandi";
  const apiKey = env("RESEND_API_KEY");
  const gonderen = process.env.EKITAP_GONDEREN;
  if (!apiKey || !gonderen) throw new Error("RESEND_API_KEY veya EKITAP_GONDEREN tanımlı değil");

  const pdf = await pdfCoz(bilgi.enc);
  const ad = kacis(s.ad);
  const html = `<!doctype html><html><body style="margin:0;background:#0b0b0d;font-family:Georgia,serif;color:#e4e4e7">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
  <div style="font-size:12px;letter-spacing:3px;color:#d4af37;text-transform:uppercase">Maskülenite</div>
  <h1 style="font-size:24px;color:#fff;margin:12px 0 4px">${kacis(bilgi.kitap)}</h1>
  <p style="color:#a1a1aa;margin:0 0 24px;font-size:14px">Sipariş no: ${kacis(s.n)}</p>
  <p style="font-size:16px;line-height:1.6">Merhaba ${ad},</p>
  <p style="font-size:16px;line-height:1.6">Ödemen başarıyla alındı. <strong style="color:#d4af37">${kacis(
    bilgi.kitap,
  )}</strong> e-kitabın bu e-postanın <strong>ekinde (PDF)</strong>.</p>
  <p style="font-size:16px;line-height:1.6">Dosyayı telefonuna, tabletine veya bilgisayarına kaydedip hemen okumaya başlayabilirsin. Kindle kullanıyorsan PDF'i Kindle e-posta adresine göndermen yeterli.</p>
  <p style="font-size:16px;line-height:1.6">Bu kopya sana özeldir; lütfen paylaşma.</p>
  <p style="font-size:16px;line-height:1.6;margin-top:28px">Kuralları koyan taraf ol.<br><strong style="color:#fff">Gürkan Özbinici</strong></p>
  <hr style="border:none;border-top:1px solid #27272a;margin:28px 0">
  <p style="font-size:12px;color:#71717a;line-height:1.5">Bir sorun yaşarsan bu e-postayı yanıtlayabilir ya da WhatsApp'tan (+90 545 520 79 99) yazabilirsin. maskulenitesitesi.com.tr</p>
</div></body></html>`;

  const text = `Merhaba ${s.ad},

Ödemen başarıyla alındı. ${bilgi.kitap} e-kitabın bu e-postanın ekinde (PDF).
Sipariş no: ${s.n}

Bu kopya sana özeldir; lütfen paylaşma.

Gürkan Özbinici
maskulenitesitesi.com.tr · WhatsApp: +90 545 520 79 99`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: gonderen,
      to: [s.eposta],
      reply_to: process.env.EKITAP_YANIT_ADRESI || "maskulenitesitesi@gmail.com",
      subject: `${bilgi.kitap} — E-kitabın hazır 📖`,
      html,
      text,
      attachments: [{ filename: bilgi.ad, content: pdf.toString("base64") }],
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return "gonderildi";
}

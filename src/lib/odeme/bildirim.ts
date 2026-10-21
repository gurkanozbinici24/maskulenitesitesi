import type { Siparis } from "./siparis";
import { env } from "./env";
import type { OdemeUrunu } from "./urunler";

/**
 * Başarılı ödemede Gürkan'a sipariş bildirimi: e-posta + WhatsApp.
 *
 * E-POSTA (Resend, ücretsiz katman):
 *  - RESEND_API_KEY         : resend.com > API Keys
 *  - SIPARIS_BILDIRIM_EPOSTA : bildirimin gideceği adres (Resend hesabını açtığın e-posta)
 *  - SIPARIS_GONDEREN        : (isteğe bağlı) "Maskülenite <siparis@alanadi>"; alan adı doğrulanmadıysa boş bırak
 *
 * WHATSAPP (CallMeBot, ücretsiz kişisel bildirim):
 *  - CALLMEBOT_TELEFON : 905455207999 gibi, başında + olmadan
 *  - CALLMEBOT_APIKEY  : CallMeBot'un WhatsApp'tan gönderdiği anahtar
 *
 * Değişkenlerden biri eksikse o kanal sessizce atlanır; ödeme akışı asla bu yüzden bozulmaz.
 */

export interface OdemeOzeti {
  /** e-kitap otomatik gönderim sonucu */
  ekitap?: "gonderildi" | "hata";
  paymentId?: string;
  paidPrice?: number;
  installment?: number;
  kart?: string;
}

const tl = (n?: number) =>
  n == null ? "-" : `${n.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} TL`;

export function siparisMetni(s: Siparis, urun: OdemeUrunu, o: OdemeOzeti): string {
  const satirlar = [
    `🛒 YENİ SİPARİŞ (Kartla ödendi)`,
    `Sipariş no: ${s.n}`,
    `Ürün: ${urun.ad}`,
    `Ödenen: ${tl(o.paidPrice ?? urun.fiyat)}${o.installment && o.installment > 1 ? ` (${o.installment} taksit)` : ""}`,
    "",
    `Müşteri: ${s.ad} ${s.soyad}`,
    `Telefon: ${s.tel}`,
    `E-posta: ${s.eposta}`,
  ];
  if (urun.tip === "physical" && s.eksik) {
    satirlar.push(
      "",
      "⚠️ ADRES VE İMZA İSMİ ALINAMADI. Müşteriyi arayıp adresini ve imza için ismi sor.",
    );
  } else if (urun.tip === "physical") {
    satirlar.push(
      "",
      s.hediye ? `🎁 HEDİYE — Teslim alacak: ${s.alici || "-"}` : `Teslim alacak: ${s.alici || `${s.ad} ${s.soyad}`}`,
      `Adres: ${s.adres || "-"}`,
      `${s.ilce || "-"} / ${s.il || "-"}`,
      "",
      ...(s.imza || []).map((isim, i) =>
        urun.imzaSayisi > 1
          ? `✍️ ${i === 0 ? "Vazgeçilmez Olma Sanatı" : "Çekicilik Sanatı"} imzası: ${isim}`
          : `✍️ İmza için isim: ${isim}`,
      ),
    );
  } else {
    satirlar.push(
      "",
      o.ekitap === "gonderildi"
        ? "✅ E-kitap (PDF) müşterinin e-postasına OTOMATİK gönderildi."
        : "⚠️ E-kitap otomatik GÖNDERİLEMEDİ — lütfen bu e-postaya elle gönder.",
    );
  }
  if (s.not) satirlar.push("", `Not: ${s.not}`);
  if (o.paymentId) satirlar.push("", `iyzico ödeme no: ${o.paymentId}${o.kart ? ` · ${o.kart}` : ""}`);
  return satirlar.join("\n");
}

function zamanAsimi(ms: number) {
  const c = new AbortController();
  setTimeout(() => c.abort(), ms);
  return c.signal;
}

async function epostaGonder(konu: string, metin: string) {
  const key = env("RESEND_API_KEY");
  const kime = process.env.SIPARIS_BILDIRIM_EPOSTA;
  if (!key || !kime) return "atlandi";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.SIPARIS_GONDEREN || (process.env.EKITAP_GONDEREN ? "Maskülenite Sipariş <siparis@maskulenitesitesi.com.tr>" : "Maskülenite Sipariş <onboarding@resend.dev>"),
      to: kime.split(",").map((x) => x.trim()),
      subject: konu,
      text: metin,
    }),
    signal: zamanAsimi(6000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return "gonderildi";
}

async function whatsappGonder(metin: string) {
  const tel = process.env.CALLMEBOT_TELEFON;
  const key = process.env.CALLMEBOT_APIKEY;
  if (!tel || !key) return "atlandi";
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(tel)}&text=${encodeURIComponent(
    metin,
  )}&apikey=${encodeURIComponent(key)}`;
  const res = await fetch(url, { signal: zamanAsimi(8000) });
  if (!res.ok) throw new Error(`CallMeBot ${res.status}`);
  return "gonderildi";
}

export async function siparisBildir(s: Siparis, urun: OdemeUrunu, o: OdemeOzeti) {
  const metin = siparisMetni(s, urun, o);
  const konu = `Yeni sipariş: ${urun.ad} — ${s.ad} ${s.soyad} (${s.n})`;
  const [eposta, whatsapp] = await Promise.allSettled([epostaGonder(konu, metin), whatsappGonder(metin)]);
  if (eposta.status === "rejected") console.error("[siparis] e-posta bildirimi başarısız", eposta.reason);
  if (whatsapp.status === "rejected") console.error("[siparis] whatsapp bildirimi başarısız", whatsapp.reason);
  // Bildirim kanalları çökse bile sipariş Vercel kayıtlarında kalsın
  console.log("[siparis] BAŞARILI ÖDEME\n" + metin);
}

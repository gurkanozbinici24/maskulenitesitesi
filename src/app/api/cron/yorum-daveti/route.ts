import { NextResponse } from "next/server";
import { env } from "@/lib/odeme/env";
import { davetGonderildi, zamaniGelenDavetler, type DavetKaydi } from "@/lib/yorum/depo";
import { veritabaniVarMi } from "@/lib/yorum/redis";
import { KITAP_ADLARI, degerlendirmeLinki } from "@/lib/yorum/token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Kargo siparişinden kaç gün sonra davet gitsin (kargo 1-3 gün + okumaya başlama süresi) */
const BEKLEME_GUN = 7;

const kacis = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function davetGonder(d: DavetKaydi) {
  const apiKey = env("RESEND_API_KEY");
  const gonderen = process.env.EKITAP_GONDEREN;
  if (!apiKey || !gonderen) throw new Error("RESEND_API_KEY veya EKITAP_GONDEREN tanımlı değil");
  const linkler = d.kitaplar.map((k) => ({ kitap: KITAP_ADLARI[k], link: degerlendirmeLinki({ n: d.n, k, ad: d.ad, soyad: d.soyad, c: "kart", t: Date.now() }) }));
  const baslik = linkler.map((l) => l.kitap).join(" ve ");

  const butonlar = linkler
    .map(
      (l) =>
        `<p style="margin:12px 0"><a href="${kacis(l.link)}" style="display:inline-block;background:#d4af37;color:#000;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:8px;font-family:Arial,sans-serif">${kacis(l.kitap)} — değerlendir ★</a></p>`,
    )
    .join("");
  const html = `<!doctype html><html><body style="margin:0;background:#0b0b0d;font-family:Georgia,serif;color:#e4e4e7">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
  <div style="font-size:12px;letter-spacing:3px;color:#d4af37;text-transform:uppercase">Maskülenite</div>
  <p style="font-size:16px;line-height:1.6;margin-top:20px">Merhaba ${kacis(d.ad)},</p>
  <p style="font-size:16px;line-height:1.6">İmzalı kitabın birkaç gündür elinde. Umarım okumaya başlamışsındır.</p>
  <p style="font-size:16px;line-height:1.6">Okuduktan sonra iki dakikanı ayırıp dürüst görüşünü yazarsan, kitabı almayı düşünen diğer okurlara çok yardımcı olursun. Beğendiğin yanları da, beğenmediğin yanları da yazabilirsin. Linkler sadece sana özel:</p>
  ${butonlar}
  <p style="font-size:16px;line-height:1.6;margin-top:28px">Teşekkürler.<br><strong style="color:#fff">Gürkan Özbinici</strong></p>
  <hr style="border:none;border-top:1px solid #27272a;margin:28px 0">
  <p style="font-size:12px;color:#71717a;line-height:1.5">Sipariş no: ${kacis(d.n)} · Bu e-postayı siparişin nedeniyle bir kez gönderiyoruz. maskulenitesitesi.com.tr</p>
</div></body></html>`;
  const text = `Merhaba ${d.ad},

İmzalı kitabın birkaç gündür elinde. Okuduktan sonra dürüst görüşünü yazarsan diğer okurlara çok yardımcı olursun. Linkler sadece sana özel:

${linkler.map((l) => `${l.kitap}: ${l.link}`).join("\n")}

Teşekkürler.
Gürkan Özbinici
Sipariş no: ${d.n}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: gonderen,
      to: [d.eposta],
      reply_to: process.env.EKITAP_YANIT_ADRESI || "maskulenitesitesi@gmail.com",
      subject: `${baslik} — görüşün benim için değerli`,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

/** Vercel Cron her gün çağırır (vercel.json). Yetkisiz çağrılar reddedilir. */
export async function GET(req: Request) {
  const gizli = process.env.CRON_SECRET;
  if (!gizli || req.headers.get("authorization") !== `Bearer ${gizli}`) {
    return NextResponse.json({ hata: "yetkisiz" }, { status: 401 });
  }
  if (!veritabaniVarMi()) return NextResponse.json({ atlandi: "veritabani yok" });

  const davetler = await zamaniGelenDavetler(Date.now() - BEKLEME_GUN * 24 * 60 * 60 * 1000);
  let gonderilen = 0;
  for (const d of davetler) {
    try {
      await davetGonder(d);
      await davetGonderildi(d.n);
      gonderilen++;
    } catch (e) {
      console.error("[yorum-daveti] gönderilemedi", d.n, e);
    }
  }
  console.log("[yorum-daveti]", gonderilen, "/", davetler.length, "davet gönderildi");
  return NextResponse.json({ gonderilen, toplam: davetler.length });
}

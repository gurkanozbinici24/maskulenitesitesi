import { siparisAc } from "@/lib/odeme/siparis";
import { urunBul } from "@/lib/odeme/urunler";
import { ekitapGonder } from "@/lib/odeme/ekitapTeslim";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Havale ile alınan e-kitap siparişlerinde, ödeme hesaba geçince PDF'i Gürkan'ın tek tıkla göndermesi için.
 * GET: onay sayfası (e-posta tarayıcıları linki önizlese bile gönderim olmaz), POST: gönderir.
 * Link imzalıdır; sadece bildirim e-postasındaki/WhatsApp'taki link çalışır.
 */
const sayfa = (baslik: string, govde: string) =>
  new Response(
    `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${baslik}</title></head>
<body style="margin:0;background:#0b0b0d;color:#e4e4e7;font-family:system-ui,-apple-system,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px">
<div style="max-width:420px;width:100%;border:1px solid #3f3f46;border-radius:16px;padding:28px;background:#111113">
<div style="font-size:12px;letter-spacing:3px;color:#d4af37;text-transform:uppercase">Maskülenite · Havale e-kitap</div>
<h1 style="font-size:20px;color:#fff;margin:12px 0">${baslik}</h1>${govde}</div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function oku(url: URL) {
  const s = siparisAc(url.searchParams.get("d"), url.searchParams.get("s"));
  const hu = s ? urunBul(s.u) : null;
  return s && hu && hu.tip === "ebook" && s.eposta ? { s, hu } : null;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const r = oku(url);
  if (!r) return sayfa("Link geçersiz", "<p>Bu link doğrulanamadı.</p>");
  return sayfa(
    "E-kitabı gönder (havale)",
    `<p style="line-height:1.6">Sipariş <b>${esc(r.s.n)}</b> · ${esc(r.s.ad)} ${esc(r.s.soyad)}</p>
<p style="line-height:1.6"><b>${esc(r.hu.ad)}</b> PDF'i <b>${esc(r.s.eposta)}</b> adresine gönderilecek.</p>
<p style="color:#a1a1aa;font-size:14px">Havale ödemesinin hesabına geçtiğinden emin olduktan sonra gönder.</p>
<form method="post"><button style="margin-top:12px;width:100%;padding:14px;border:0;border-radius:10px;background:#d4af37;color:#000;font-weight:800;font-size:16px">Ödeme geldi, e-kitabı gönder</button></form>`,
  );
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const r = oku(url);
  if (!r) return sayfa("Link geçersiz", "<p>Bu link doğrulanamadı.</p>");
  try {
    await ekitapGonder(r.s, r.hu);
    console.log("[havale] e-kitap gönderildi", r.s.n);
    return sayfa("Gönderildi ✅", `<p style="line-height:1.6">E-kitap <b>${esc(r.s.eposta)}</b> adresine gönderildi.</p>`);
  } catch (e) {
    console.error("[havale] e-kitap gönderilemedi", r.s.n, e);
    return sayfa("Gönderilemedi", "<p>Bir hata oluştu. Lütfen biraz sonra tekrar dene ya da PDF'i elle gönder.</p>");
  }
}

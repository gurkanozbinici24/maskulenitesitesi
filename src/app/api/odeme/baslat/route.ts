import { NextResponse } from "next/server";
import { iyzicoHazirMi, iyzicoIstek, type CheckoutBaslatCevap } from "@/lib/odeme/iyzico";
import { siparisNoUret, siparisPaketle, type Siparis } from "@/lib/odeme/siparis";
import { satistaMi, urunBul } from "@/lib/odeme/urunler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const temiz = (v: unknown, max = 120) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

const hata = (mesaj: string, status = 400) => NextResponse.json({ hata: mesaj }, { status });

/** Telefonu iyzico'nun istediği +90XXXXXXXXXX biçimine çevirir */
function telefonDuzelt(t: string) {
  const d = t.replace(/\D/g, "");
  if (d.length === 10 && d.startsWith("5")) return `+90${d}`;
  if (d.length === 11 && d.startsWith("05")) return `+9${d}`;
  if (d.length === 12 && d.startsWith("90")) return `+${d}`;
  return null;
}

export async function POST(req: Request) {
  if (!iyzicoHazirMi()) return hata("Kartla ödeme şu an aktif değil. Lütfen WhatsApp'tan sipariş verin.", 503);

  let g: Record<string, unknown>;
  try {
    g = await req.json();
  } catch {
    return hata("Geçersiz istek.");
  }

  const urun = urunBul(temiz(g.urun, 60));
  if (!urun) return hata("Ürün bulunamadı.");
  if (!satistaMi(urun)) return hata("Bu ürün henüz satışta değil.");

  const ad = temiz(g.ad, 50);
  const soyad = temiz(g.soyad, 50);
  const eposta = temiz(g.eposta, 100).toLowerCase();
  const tel = telefonDuzelt(temiz(g.tel, 20));
  const il = temiz(g.il, 40);
  const ilce = temiz(g.ilce, 40);
  const adres = temiz(g.adres, 250);
  const alici = temiz(g.alici, 80);
  const hediye = g.hediye === true;
  const not = temiz(g.not, 200);
  const imza = Array.isArray(g.imza) ? g.imza.slice(0, urun.imzaSayisi).map((x) => temiz(x, 60)) : [];

  if (!ad || !soyad) return hata("Ad ve soyad gerekli.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) return hata("Geçerli bir e-posta adresi girin.");
  if (!tel) return hata("Geçerli bir cep telefonu girin (5XX XXX XX XX).");
  if (g.sozlesme !== true) return hata("Devam etmek için sözleşmeyi onaylamanız gerekiyor.");
  if (urun.tip === "physical") {
    if (!il || !ilce || adres.length < 10) return hata("Kargo için il, ilçe ve açık adres gerekli.");
    if (imza.length < urun.imzaSayisi || imza.some((x) => !x)) return hata("İmza için isim gerekli.");
  }

  const siparis: Siparis = {
    n: siparisNoUret(),
    u: urun.id,
    ad,
    soyad,
    eposta,
    tel,
    ...(urun.tip === "physical" ? { il, ilce, adres, alici: alici || `${ad} ${soyad}`, imza, hediye } : { il }),
    ...(not ? { not } : {}),
  };

  const origin = new URL(req.url).origin;
  const { d, s } = siparisPaketle(siparis);
  const callbackUrl = `${origin}/api/odeme/sonuc?d=${d}&s=${s}`;
  const fiyat = urun.fiyat.toFixed(1);
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "85.34.78.112";
  const sehir = il || "Türkiye";
  const adresMetni = urun.tip === "physical" ? `${adres} ${ilce}/${il}` : "Dijital ürün - e-posta ile teslim";
  const adresObj = {
    contactName: urun.tip === "physical" ? siparis.alici : `${ad} ${soyad}`,
    city: sehir,
    country: "Turkey",
    address: adresMetni,
  };

  const istek: Record<string, unknown> = {
    locale: "tr",
    conversationId: siparis.n,
    price: fiyat,
    paidPrice: fiyat,
    currency: "TRY",
    basketId: siparis.n,
    paymentGroup: "PRODUCT",
    callbackUrl,
    // Taksit: müşteri seçer, vade farkını müşteri öder (oranlar iyzico panelinde "Taksit ve Komisyon Oranları").
    enabledInstallments: [1, 2, 3, 6, 9, 12],
    buyer: {
      id: siparis.n,
      name: ad,
      surname: soyad,
      gsmNumber: tel,
      email: eposta,
      identityNumber: "11111111111",
      registrationAddress: adresMetni,
      ip,
      city: sehir,
      country: "Turkey",
    },
    billingAddress: { ...adresObj, contactName: `${ad} ${soyad}` },
    ...(urun.tip === "physical" ? { shippingAddress: adresObj } : {}),
    basketItems: [
      {
        id: urun.id,
        name: urun.ad,
        category1: "Kitap",
        itemType: urun.tip === "physical" ? "PHYSICAL" : "VIRTUAL",
        price: fiyat,
      },
    ],
  };

  try {
    const c = await iyzicoIstek<CheckoutBaslatCevap>(
      "/payment/iyzipos/checkoutform/initialize/auth/ecom",
      istek,
    );
    if (c.status !== "success" || !c.paymentPageUrl) {
      console.error("[odeme] başlatılamadı", c.errorCode, c.errorMessage);
      return hata(c.errorMessage || "Ödeme başlatılamadı. Lütfen tekrar deneyin.", 502);
    }
    return NextResponse.json({ url: c.paymentPageUrl });
  } catch (e) {
    console.error("[odeme] iyzico hatası", e);
    return hata("Ödeme sistemine ulaşılamadı. Lütfen biraz sonra tekrar deneyin.", 502);
  }
}

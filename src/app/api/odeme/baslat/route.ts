import { NextResponse } from "next/server";
import { iyzicoHazirMi, iyzicoIstek, type CheckoutBaslatCevap } from "@/lib/odeme/iyzico";
import { SIPARIS_CEREZI, cerezYaz, kisaSiparis, siparisPaketle } from "@/lib/odeme/siparis";
import { taksitler } from "@/lib/odeme/urunler";
import { siparisOlustur } from "@/lib/odeme/dogrula";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hata = (mesaj: string, status = 400) => NextResponse.json({ hata: mesaj }, { status });

export async function POST(req: Request) {
  if (!iyzicoHazirMi()) return hata("Kartla ödeme şu an aktif değil. Lütfen WhatsApp'tan sipariş verin.", 503);

  let g: Record<string, unknown>;
  try {
    g = await req.json();
  } catch {
    return hata("Geçersiz istek.");
  }

  const r = siparisOlustur(g);
  if ("hata" in r) return hata(r.hata);
  const { urun, siparis } = r;
  const { ad, soyad, tel, il } = siparis;
  // Fizikselde e-posta isteğe bağlı; iyzico zorunlu tuttuğu için boşsa sipariş numarasıyla bir adres üretilir
  const eposta = siparis.eposta || `siparis+${siparis.n.toLowerCase()}@maskulenitesitesi.com.tr`;
  const ilce = siparis.ilce || "";
  const adres = siparis.adres || "";

  const origin = new URL(req.url).origin;
  let p = siparisPaketle(kisaSiparis(siparis));
  let callbackUrl = `${origin}/api/odeme/sonuc?d=${p.d}&s=${p.s}`;
  if (callbackUrl.length > 500) {
    // iyzico sınırı 512 karakter: çok uzun isimlerde isimsiz kısa özete düş (tam bilgi çerezde)
    p = siparisPaketle({ ...kisaSiparis(siparis), ad: "", soyad: "" });
    callbackUrl = `${origin}/api/odeme/sonuc?d=${p.d}&s=${p.s}`;
  }
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
    enabledInstallments: taksitler(urun),
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
    const res = NextResponse.json({ url: c.paymentPageUrl });
    // Tam sipariş bilgisi (adres, imza ismi, not) imzalı çerezde; iyzico'dan dönüşte okunur
    res.cookies.set(SIPARIS_CEREZI, cerezYaz(siparis), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/api/odeme",
      maxAge: 60 * 60 * 3,
    });
    return res;
  } catch (e) {
    console.error("[odeme] iyzico hatası", e);
    return hata("Ödeme sistemine ulaşılamadı. Lütfen biraz sonra tekrar deneyin.", 502);
  }
}

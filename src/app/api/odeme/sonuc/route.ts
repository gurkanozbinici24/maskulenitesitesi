import { NextResponse } from "next/server";
import { iyzicoIstek, type CheckoutSonucCevap } from "@/lib/odeme/iyzico";
import { siparisAc } from "@/lib/odeme/siparis";
import { siparisBildir } from "@/lib/odeme/bildirim";
import { urunBul } from "@/lib/odeme/urunler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * iyzico ödeme ekranı bittiğinde müşterinin tarayıcısını buraya POST ile yollar (token ile).
 * Sonucu iyzico'dan kendimiz sorgulayıp doğruluyoruz; sadece doğrulanmış ödemede bildirim gider.
 */
async function isle(req: Request) {
  const url = new URL(req.url);
  const git = (yol: string) => NextResponse.redirect(new URL(yol, url.origin), 303);

  let token = url.searchParams.get("token");
  if (!token && req.method === "POST") {
    try {
      const form = await req.formData();
      token = (form.get("token") as string) || null;
    } catch {
      /* boş gövde */
    }
  }

  const siparis = siparisAc(url.searchParams.get("d"), url.searchParams.get("s"));
  if (!token || !siparis) return git("/odeme/basarisiz?neden=dogrulama");

  const urun = urunBul(siparis.u);
  if (!urun) return git("/odeme/basarisiz?neden=urun");

  let c: CheckoutSonucCevap;
  try {
    c = await iyzicoIstek<CheckoutSonucCevap>("/payment/iyzipos/checkoutform/auth/ecom/detail", {
      locale: "tr",
      conversationId: siparis.n,
      token,
    });
  } catch (e) {
    console.error("[odeme] sonuç sorgulanamadı", siparis.n, e);
    return git(`/odeme/basarisiz?neden=baglanti&no=${siparis.n}`);
  }

  const tutarDogru = Number(c.paidPrice) >= urun.fiyat;
  const basarili =
    c.status === "success" &&
    c.paymentStatus === "SUCCESS" &&
    c.basketId === siparis.n &&
    tutarDogru;

  if (!basarili) {
    console.warn("[odeme] başarısız/eksik ödeme", siparis.n, c.paymentStatus, c.errorMessage);
    return git(`/odeme/basarisiz?no=${siparis.n}`);
  }

  await siparisBildir(siparis, urun, {
    paymentId: c.paymentId,
    paidPrice: Number(c.paidPrice),
    installment: c.installment,
    kart: c.lastFourDigits ? `${c.cardAssociation || "Kart"} **** ${c.lastFourDigits}` : undefined,
  });

  const q = new URLSearchParams({ no: siparis.n, tip: urun.tip, ad: siparis.ad });
  return git(`/odeme/basarili?${q.toString()}`);
}

export const POST = isle;
export const GET = isle;

import { NextResponse } from "next/server";
import { iyzicoIstek, type CheckoutSonucCevap } from "@/lib/odeme/iyzico";
import { SIPARIS_CEREZI, cerezOku, siparisAc, type Siparis } from "@/lib/odeme/siparis";
import { cookies } from "next/headers";
import { siparisBildir } from "@/lib/odeme/bildirim";
import { urunBul } from "@/lib/odeme/urunler";
import { ekitapGonder } from "@/lib/odeme/ekitapTeslim";

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

  const kisa = siparisAc(url.searchParams.get("d"), url.searchParams.get("s"));
  if (!kisa) return git("/odeme/basarisiz?neden=dogrulama");
  const tam = cerezOku(cookies().get(SIPARIS_CEREZI)?.value);
  const siparis: Siparis = tam && tam.n === kisa.n ? tam : { ...kisa, eksik: true };

  const urun = urunBul(siparis.u);
  if (!urun) return git("/odeme/basarisiz?neden=urun");

  let c: CheckoutSonucCevap;
  try {
    // iyzico bazen geri dönüşü token olmadan (GET ile) yapıyor; o durumda ödemeyi sipariş numarasıyla sorguluyoruz.
    c = token
      ? await iyzicoIstek<CheckoutSonucCevap>("/payment/iyzipos/checkoutform/auth/ecom/detail", {
          locale: "tr",
          conversationId: siparis.n,
          token,
        })
      : await iyzicoIstek<CheckoutSonucCevap>("/payment/detail", {
          locale: "tr",
          conversationId: siparis.n,
          paymentConversationId: siparis.n,
        });
    console.log("[odeme] sonuç", siparis.n, token ? "token" : "siparis-no", c.status, c.paymentStatus, c.errorMessage || "");
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

  let ekitap: "gonderildi" | "hata" | undefined;
  if (urun.tip === "ebook") {
    try {
      ekitap = (await ekitapGonder(siparis, urun)) === "gonderildi" ? "gonderildi" : "hata";
    } catch (e) {
      console.error("[odeme] e-kitap gönderilemedi", siparis.n, e);
      ekitap = "hata";
    }
  }

  await siparisBildir(siparis, urun, {
    ekitap,
    paymentId: c.paymentId,
    paidPrice: Number(c.paidPrice),
    installment: c.installment,
    kart: c.lastFourDigits ? `${c.cardAssociation || "Kart"} **** ${c.lastFourDigits}` : undefined,
  });

  const q0 = new URLSearchParams({ no: siparis.n, tip: urun.tip, ad: siparis.ad, ...(ekitap ? { ek: ekitap } : {}) });
  const yanit = git(`/odeme/basarili?${q0.toString()}`);
  yanit.cookies.set(SIPARIS_CEREZI, "", { path: "/api/odeme", maxAge: 0, secure: true, sameSite: "none" });
  return yanit;
}

export const POST = isle;
export const GET = isle;

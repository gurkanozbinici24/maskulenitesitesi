import { NextResponse } from "next/server";
import { siparisOlustur } from "@/lib/odeme/dogrula";
import { HAVALE, havaleHazirMi } from "@/lib/odeme/havale";
import { siparisBildir, type OdemeOzeti } from "@/lib/odeme/bildirim";
import { HEDIYE_EKITAP, kampanyaAktif } from "@/lib/odeme/kampanya";
import { kisaSiparis, siparisPaketle } from "@/lib/odeme/siparis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hata = (mesaj: string, status = 400) => NextResponse.json({ hata: mesaj }, { status });

/** Havale / EFT siparişi: kaydı oluşturur, Gürkan'a "ödeme bekleniyor" bildirimi atar, IBAN bilgisini döner. */
export async function POST(req: Request) {
  if (!havaleHazirMi()) return hata("Havale ile ödeme şu an aktif değil.", 503);
  let g: Record<string, unknown>;
  try {
    g = await req.json();
  } catch {
    return hata("Geçersiz istek.");
  }
  if (typeof g.web === "string" && g.web) return hata("Geçersiz istek."); // bot tuzağı
  const r = siparisOlustur(g);
  if ("hata" in r) return hata(r.hata);
  const { urun, siparis } = r;
  if (urun.tip !== "physical") return hata("Havale ile ödeme yalnızca fiziksel kitaplarda geçerlidir.");

  const ozet: OdemeOzeti = { havale: true };
  if (kampanyaAktif() && HEDIYE_EKITAP[urun.id]) {
    if (!siparis.eposta) ozet.hediye = "eposta-yok";
    else {
      try {
        const p = siparisPaketle(kisaSiparis(siparis));
        ozet.hediye = "bekliyor";
        ozet.hediyeLink = `${new URL(req.url).origin}/api/odeme/hediye?d=${p.d}&s=${p.s}`;
      } catch (e) {
        console.error("[kampanya] hediye linki oluşturulamadı", e);
        ozet.hediye = "hata";
      }
    }
  }
  await siparisBildir(siparis, urun, ozet);
  return NextResponse.json({
    n: siparis.n,
    tutar: urun.fiyat,
    urun: urun.ad,
    iban: HAVALE.iban,
    aliciAdi: HAVALE.aliciAdi,
    banka: HAVALE.banka,
  });
}

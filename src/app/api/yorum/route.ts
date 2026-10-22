import { NextResponse } from "next/server";
import { biletAc } from "@/lib/yorum/token";
import { yorumEkle } from "@/lib/yorum/depo";
import { veritabaniVarMi } from "@/lib/yorum/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Değerlendirme formu buraya gönderir. Yalnızca imzalı, siparişe özel linkle gelen yorum kabul edilir. */
export async function POST(req: Request) {
  let g: { t?: string; puan?: number; metin?: string; basHarf?: boolean; onay?: boolean };
  try {
    g = await req.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek" }, { status: 400 });
  }
  const bilet = biletAc(g.t);
  if (!bilet) return NextResponse.json({ hata: "Değerlendirme linki geçersiz." }, { status: 403 });
  if (!veritabaniVarMi()) return NextResponse.json({ hata: "Değerlendirmeler şu an alınamıyor." }, { status: 503 });

  const puan = Number(g.puan);
  const metin = String(g.metin || "").trim();
  if (!Number.isInteger(puan) || puan < 1 || puan > 5) return NextResponse.json({ hata: "Lütfen 1-5 arası puan ver." }, { status: 400 });
  if (metin.length < 20) return NextResponse.json({ hata: "Yorumun en az 20 karakter olmalı." }, { status: 400 });
  if (metin.length > 2000) return NextResponse.json({ hata: "Yorumun en fazla 2000 karakter olabilir." }, { status: 400 });
  if (!g.onay) return NextResponse.json({ hata: "Yorumunun sitede yayınlanmasına onay vermelisin." }, { status: 400 });

  try {
    const sonuc = await yorumEkle(bilet, { puan, metin, sadeceBasHarf: !!g.basHarf });
    if (sonuc === "zaten-var") return NextResponse.json({ hata: "Bu sipariş için kitabı zaten değerlendirdin. Teşekkürler!" }, { status: 409 });
    console.log("[yorum] yeni değerlendirme", bilet.n, bilet.k, puan);
    return NextResponse.json({ tamam: true });
  } catch (e) {
    console.error("[yorum] kaydedilemedi", e);
    return NextResponse.json({ hata: "Bir sorun oluştu, lütfen tekrar dene." }, { status: 500 });
  }
}

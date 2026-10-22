import type { Metadata } from "next";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { BadgeCheck, Star } from "lucide-react";
import { KITAP_ADLARI, degerlendirmeLinki, type KitapKey } from "@/lib/yorum/token";
import {
  GOSTERIM_ESIGI,
  RET_GEREKCELERI,
  cevapYaz,
  ozetCikar,
  yorumReddet,
  yorumYayinla,
  yorumlariGetir,
  type RetGerekcesi,
  type Yorum,
} from "@/lib/yorum/depo";
import { veritabaniVarMi } from "@/lib/yorum/redis";
import { oturumAc, oturumKapat, oturumVarMi, sifreDogruMu, yonetimSifresiTanimliMi } from "@/lib/yorum/yonetimOturum";
import { URUN_SAYFALARI } from "@/lib/merchant/urunSayfalari";

export const metadata: Metadata = { title: "Yönetim · Değerlendirmeler", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const KITAPLAR: KitapKey[] = ["vazgecilmez", "cekicilik"];

function sayfalariYenile() {
  for (const u of URUN_SAYFALARI) revalidatePath(`/urun/${u.slug}`);
}

async function girisYap(form: FormData) {
  "use server";
  const sifre = String(form.get("sifre") || "");
  if (!sifreDogruMu(sifre)) {
    await new Promise((r) => setTimeout(r, 1500));
    redirect("/yonetim/yorumlar?hata=sifre");
  }
  oturumAc();
  redirect("/yonetim/yorumlar");
}

async function cikisYap() {
  "use server";
  oturumKapat();
  redirect("/yonetim/yorumlar");
}

function yetkiKontrol() {
  if (!oturumVarMi()) redirect("/yonetim/yorumlar");
}

async function yayinla(form: FormData) {
  "use server";
  yetkiKontrol();
  await yorumYayinla(String(form.get("id")));
  sayfalariYenile();
  redirect("/yonetim/yorumlar?ok=yayinlandi");
}

async function reddet(form: FormData) {
  "use server";
  yetkiKontrol();
  const gerekce = String(form.get("gerekce") || "") as RetGerekcesi;
  if (!(gerekce in RET_GEREKCELERI)) redirect("/yonetim/yorumlar?hata=gerekce");
  await yorumReddet(String(form.get("id")), gerekce);
  sayfalariYenile();
  redirect("/yonetim/yorumlar?ok=reddedildi");
}

async function cevapla(form: FormData) {
  "use server";
  yetkiKontrol();
  await cevapYaz(String(form.get("id")), String(form.get("cevap") || ""));
  sayfalariYenile();
  redirect("/yonetim/yorumlar?ok=cevap");
}

async function linkOlustur(form: FormData) {
  "use server";
  yetkiKontrol();
  const ad = String(form.get("ad") || "").trim();
  const soyad = String(form.get("soyad") || "").trim();
  const kitap = String(form.get("kitap")) as KitapKey;
  if (!ad || !KITAPLAR.includes(kitap)) redirect("/yonetim/yorumlar?hata=link");
  const not = String(form.get("not") || "").trim().replace(/[^\p{L}\p{N}-]/gu, "").slice(0, 24);
  const n = `EL-${not ? `${not}-` : ""}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const link = degerlendirmeLinki({ n, k: kitap, ad, soyad, c: "elle", t: Date.now() });
  redirect(`/yonetim/yorumlar?link=${encodeURIComponent(link)}&ad=${encodeURIComponent(ad)}&kitap=${kitap}`);
}

const tarih = (t: number) => new Date(t).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" });

function Yildizlar({ puan }: { puan: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-4 w-4 ${i <= puan ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
      ))}
    </span>
  );
}

function YorumKarti({ y, bekleyen }: { y: Yorum; bekleyen: boolean }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Yildizlar puan={y.puan} />
        <strong className="text-white">{y.gorunenAd}</strong>
        <span className="text-zinc-500">· {tarih(y.tarih)} · {y.siparis} · {y.kanal === "kart" ? "kartla ödeme" : "elle oluşturulan link"}</span>
      </div>
      <p className="mt-2 whitespace-pre-line text-zinc-200">{y.metin}</p>

      <div className="mt-4 flex flex-wrap items-start gap-3">
        {bekleyen && (
          <form action={yayinla}>
            <input type="hidden" name="id" value={y.id} />
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-black hover:brightness-110">Yayınla</button>
          </form>
        )}
        <form action={reddet} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={y.id} />
          <select name="gerekce" required defaultValue="" className="rounded-lg border border-zinc-700 bg-black px-2 py-2 text-sm text-zinc-200">
            <option value="" disabled>
              {bekleyen ? "Yayınlamama gerekçesi…" : "Kaldırma gerekçesi…"}
            </option>
            {Object.entries(RET_GEREKCELERI).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <button className="rounded-lg border border-red-500/50 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10">
            {bekleyen ? "Yayınlama" : "Yayından kaldır"}
          </button>
        </form>
      </div>

      <form action={cevapla} className="mt-3">
        <input type="hidden" name="id" value={y.id} />
        <textarea
          name="cevap"
          defaultValue={y.cevap?.metin || ""}
          rows={2}
          placeholder="Yazar olarak cevap yaz (isteğe bağlı, sitede yorumun altında görünür)"
          className="w-full rounded-lg border border-zinc-700 bg-black p-2 text-sm text-zinc-100"
        />
        <button className="mt-1 rounded-lg border border-zinc-600 px-3 py-1.5 text-xs text-zinc-200 hover:border-amber-400">Cevabı kaydet</button>
      </form>
    </div>
  );
}

export default async function YonetimYorumlar({
  searchParams,
}: {
  searchParams: { hata?: string; ok?: string; link?: string; ad?: string; kitap?: string };
}) {
  const kabuk = (icerik: React.ReactNode) => (
    <main className="min-h-screen bg-black px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-3xl">{icerik}</div>
    </main>
  );

  if (!yonetimSifresiTanimliMi()) {
    return kabuk(
      <p className="text-zinc-300">
        Yönetim paneli için Vercel&apos;de en az 8 karakterlik bir <code>YONETIM_SIFRESI</code> ortam değişkeni tanımlanmalı.
      </p>,
    );
  }

  if (!oturumVarMi()) {
    return kabuk(
      <form action={girisYap} className="mx-auto mt-20 max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Yönetim girişi</h1>
        {searchParams.hata === "sifre" && <p className="text-sm text-red-300">Şifre yanlış.</p>}
        <input
          type="password"
          name="sifre"
          required
          autoComplete="current-password"
          placeholder="Şifre"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
        />
        <button className="w-full rounded-lg bg-amber-400 py-3 font-bold text-black">Giriş</button>
      </form>,
    );
  }

  if (!veritabaniVarMi()) {
    return kabuk(<p className="text-zinc-300">Veritabanı henüz bağlı değil. Vercel&apos;de Upstash Redis bağlandıktan sonra bu sayfa çalışır.</p>);
  }

  const veriler = await Promise.all(
    KITAPLAR.map(async (k) => ({
      k,
      bekleyen: await yorumlariGetir(k, "beklemede"),
      yayinda: await yorumlariGetir(k, "yayinda"),
    })),
  );

  const whatsappMetni = searchParams.link
    ? `Merhaba ${searchParams.ad || ""}, ${KITAP_ADLARI[(searchParams.kitap as KitapKey) || "vazgecilmez"]} kitabını okuduysan görüşün benim için çok değerli. Sadece sana özel bu linkten puan verip kısa bir yorum bırakabilirsin: ${searchParams.link}`
    : "";

  return kabuk(
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Okur değerlendirmeleri</h1>
        <form action={cikisYap}>
          <button className="text-sm text-zinc-400 underline">Çıkış</button>
        </form>
      </div>

      <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed text-amber-100">
        <strong>Kural:</strong> Yorumlar puandan bağımsız yayınlanmalı. Düşük puan tek başına yayınlamama sebebi değildir; yalnızca
        listedeki gerekçelerden biri varsa yayınlama. Olumsuz bir yoruma sakin bir yazar cevabı yazmak her zaman daha iyi sonuç verir.
      </div>

      {searchParams.ok && <p className="mt-4 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">Kaydedildi.</p>}

      <section className="mt-8 rounded-xl border border-zinc-800 p-5">
        <h2 className="text-lg font-bold">WhatsApp / havale müşterisi için değerlendirme linki</h2>
        <p className="mt-1 text-sm text-zinc-400">Sadece kitabı gerçekten satın almış kişiler için oluştur. Her link tek yorumluktur.</p>
        <form action={linkOlustur} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="ad" required placeholder="Ad" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2" />
          <input name="soyad" placeholder="Soyad" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2" />
          <select name="kitap" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2">
            {KITAPLAR.map((k) => (
              <option key={k} value={k}>
                {KITAP_ADLARI[k]}
              </option>
            ))}
          </select>
          <input name="not" placeholder="Not (isteğe bağlı, ör. 1BASKI)" className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2" />
          <button className="rounded-lg bg-amber-400 py-2 font-bold text-black sm:col-span-2">Link oluştur</button>
        </form>
        {searchParams.link && (
          <div className="mt-4 space-y-3 rounded-lg bg-zinc-900 p-4 text-sm">
            <p className="break-all text-zinc-200">{searchParams.link}</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappMetni)}`}
              target="_blank"
              rel="noopener"
              className="inline-block rounded-lg bg-emerald-500 px-4 py-2 font-bold text-black"
            >
              WhatsApp&apos;ta gönder
            </a>
          </div>
        )}
      </section>

      {veriler.map(({ k, bekleyen, yayinda }) => {
        const o = ozetCikar(yayinda);
        return (
          <section key={k} className="mt-10">
            <h2 className="text-xl font-bold">{KITAP_ADLARI[k]}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              Yayında {o.sayi} değerlendirme{o.sayi ? ` · ortalama ${o.ortalama}` : ""}
              {o.sayi < GOSTERIM_ESIGI && ` · sitede görünmesi için ${GOSTERIM_ESIGI - o.sayi} değerlendirme daha gerekli`}
            </p>

            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-amber-300">Onay bekleyen ({bekleyen.length})</h3>
            <div className="mt-2 space-y-3">
              {bekleyen.length === 0 && <p className="text-sm text-zinc-500">Bekleyen yok.</p>}
              {bekleyen.map((y) => (
                <YorumKarti key={y.id} y={y} bekleyen />
              ))}
            </div>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-zinc-400">Yayında ({yayinda.length})</h3>
            <div className="mt-2 space-y-3">
              {yayinda.map((y) => (
                <YorumKarti key={y.id} y={y} bekleyen={false} />
              ))}
            </div>
          </section>
        );
      })}
    </>,
  );
}

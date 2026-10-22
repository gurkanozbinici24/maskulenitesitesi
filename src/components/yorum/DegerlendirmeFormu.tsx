"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { gorunenAdUret } from "@/lib/yorum/isim";

const ETIKETLER = ["", "Hiç beğenmedim", "Beğenmedim", "İdare eder", "Beğendim", "Çok beğendim"];

export default function DegerlendirmeFormu({ bilet, kitap, sabitAd }: { bilet: string; kitap: string; sabitAd: { ad: string; soyad: string } | null }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const kullanilanAd = sabitAd ? sabitAd.ad : ad;
  const kullanilanSoyad = sabitAd ? sabitAd.soyad : soyad;
  const ornekAd = gorunenAdUret(kullanilanAd, kullanilanSoyad, false);
  const ornekBasHarf = gorunenAdUret(kullanilanAd, kullanilanSoyad, true);
  const [puan, setPuan] = useState(0);
  const [uzerinde, setUzerinde] = useState(0);
  const [metin, setMetin] = useState("");
  const [basHarf, setBasHarf] = useState(false);
  const [onay, setOnay] = useState(false);
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "tamam">("bos");
  const [hata, setHata] = useState("");

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (!sabitAd && ad.trim().length < 2) return setHata("Lütfen adını yaz.");
    if (!puan) return setHata("Lütfen yıldızlardan birini seç.");
    if (metin.trim().length < 20) return setHata("Yorumun en az 20 karakter olmalı.");
    if (!onay) return setHata("Yorumunun sitede yayınlanmasına onay vermelisin.");
    setDurum("gonderiliyor");
    try {
      const r = await fetch("/api/yorum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: bilet, puan, metin, basHarf, onay, ad, soyad }),
      });
      const j = await r.json();
      if (!r.ok) {
        setHata(j.hata || "Bir sorun oluştu.");
        setDurum("bos");
        return;
      }
      setDurum("tamam");
    } catch {
      setHata("Bağlantı sorunu, lütfen tekrar dene.");
      setDurum("bos");
    }
  }

  if (durum === "tamam") {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
        <p className="font-cinzel text-xl font-bold text-white">Teşekkürler!</p>
        <p className="mt-2 text-zinc-300">
          Değerlendirmen alındı. Kısa bir kontrolden sonra {kitap} sayfasında yayınlanacak.
        </p>
      </div>
    );
  }

  const gosterilen = uzerinde || puan;
  return (
    <form onSubmit={gonder} className="space-y-6">
      {!sabitAd && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="ad" className="mb-2 block text-sm font-semibold text-zinc-200">Adın</label>
            <input id="ad" value={ad} onChange={(e) => setAd(e.target.value)} maxLength={30} autoComplete="given-name"
              className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-zinc-100 focus:border-gold-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="soyad" className="mb-2 block text-sm font-semibold text-zinc-200">Soyadın <span className="font-normal text-zinc-500">(sadece baş harfi görünür)</span></label>
            <input id="soyad" value={soyad} onChange={(e) => setSoyad(e.target.value)} maxLength={30} autoComplete="family-name"
              className="w-full rounded-xl border border-zinc-700 bg-black/40 px-4 py-3 text-zinc-100 focus:border-gold-500 focus:outline-none" />
          </div>
        </div>
      )}
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-200">Puanın</p>
        <div className="flex items-center gap-1" onMouseLeave={() => setUzerinde(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i} yıldız`}
              onClick={() => setPuan(i)}
              onMouseEnter={() => setUzerinde(i)}
              className="p-1"
            >
              <Star className={`h-9 w-9 transition ${i <= gosterilen ? "fill-gold-400 text-gold-400" : "text-zinc-600"}`} />
            </button>
          ))}
          <span className="ml-3 text-sm text-zinc-400">{ETIKETLER[gosterilen]}</span>
        </div>
      </div>

      <div>
        <label htmlFor="metin" className="mb-2 block text-sm font-semibold text-zinc-200">
          Yorumun
        </label>
        <textarea
          id="metin"
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
          rows={6}
          maxLength={2000}
          placeholder="Kitap sana ne kattı? Kime tavsiye edersin?"
          className="w-full rounded-xl border border-zinc-700 bg-black/40 p-4 text-zinc-100 placeholder:text-zinc-500 focus:border-gold-500 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-zinc-500">{metin.length}/2000</p>
      </div>

      <div className="space-y-3 text-sm text-zinc-300">
        <label className="flex items-start gap-3">
          <input type="checkbox" checked={basHarf} onChange={(e) => setBasHarf(e.target.checked)} className="mt-1 h-4 w-4 accent-yellow-500" />
          <span>
            Sitede adım yerine sadece baş harflerim görünsün (<strong>{basHarf ? ornekBasHarf : ornekAd}</strong> olarak görünecek)
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" checked={onay} onChange={(e) => setOnay(e.target.checked)} className="mt-1 h-4 w-4 accent-yellow-500" />
          <span>
            Puanımın ve yorumumun yukarıdaki isimle maskulenitesitesi.com.tr&apos;de yayınlanmasına onay veriyorum. Yorumlar yalnızca
            hakaret, kişisel bilgi veya kitapla ilgisi olmayan içerik barındırıyorsa yayınlanmaz.
          </span>
        </label>
      </div>

      {hata && <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{hata}</p>}

      <button
        type="submit"
        disabled={durum === "gonderiliyor"}
        className="w-full rounded-xl bg-gold-400 px-6 py-4 font-bold text-black transition hover:brightness-110 disabled:opacity-60"
      >
        {durum === "gonderiliyor" ? "Gönderiliyor…" : "Değerlendirmeyi Gönder"}
      </button>
    </form>
  );
}

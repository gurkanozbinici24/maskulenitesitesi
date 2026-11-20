"use client";

import { useState } from "react";
import { BookPlus, Check, Copy, Minus, Plus, CreditCard, Gift, Landmark, Loader2, Lock, MessageCircle, PenLine, ShieldCheck, Truck, Mail } from "lucide-react";
import { WHATSAPP_PHONE } from "@/config/cekicilikConfig";
import { useKampanya } from "@/components/ui/KampanyaGeriSayim";
import LegalModal from "@/components/LegalModal";
import type { OdemeUrunu } from "@/lib/odeme/urunler";

const giris =
  "w-full rounded-xl border border-zinc-700 bg-matte-900 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-gold-500/70 focus:ring-2 focus:ring-gold-500/20";
const etiket = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-400";

function Alan({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={etiket}>{label}</span>
      {children}
    </label>
  );
}

/** Ödeme sayfasındaki "diğer kitabı da ekle" kutusunun bilgisi (sunucuda hesaplanır) */
export interface EklemeBilgisi {
  kitap: string;
  ekFiyat: number;
  hedefFiyat: number;
  hedefTaksit: number;
  asilSira: 0 | 1;
  /** Fizikselde ikinci kitabın normal fiyatı (üstü çizili gösterilir) */
  normalFiyat?: number;
  /** Havale ile ödemede hedef ürünün fiyatı (kampanya indirimi dahil) */
  hedefHavaleFiyat?: number;
  /** Havale indiriminde hedef ürünün üstü çizili fiyatı */
  hedefReferans?: number;
}

const KITAP_ADI = ["Vazgeçilmez Olma Sanatı", "Çekicilik Sanatı"] as const;

interface HavaleSonuc {
  n: string;
  tip?: "ebook" | "physical";
  tutar: number;
  urun: string;
  iban: string;
  aliciAdi: string;
  banka: string;
}

function Kopyala({ deger, etiketi }: { deger: string; etiketi: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(deger.replace(/\s/g, etiketi === "IBAN" ? "" : " ")).then(() => {
          setOk(true);
          setTimeout(() => setOk(false), 1800);
        });
      }}
      className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-gold-500/50 px-3 py-2 text-xs font-bold text-gold-200 transition hover:bg-gold-500/10"
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}

function AdetSecici({ adet, setAdet }: { adet: number; setAdet: (n: number) => void }) {
  const ayarla = (n: number) => setAdet(Math.min(100, Math.max(1, Math.floor(n) || 1)));
  const btn =
    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-matte-900 text-gold-300 transition hover:border-gold-500/60 disabled:opacity-40";
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Azalt" className={btn} disabled={adet <= 1} onClick={() => ayarla(adet - 1)}>
        <Minus className="h-5 w-5" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={100}
        aria-label="Adet"
        value={adet}
        onChange={(e) => ayarla(Number(e.target.value))}
        className="h-12 w-20 rounded-xl border border-zinc-700 bg-matte-900 text-center font-mono text-lg font-bold text-white outline-none focus:border-gold-500/70"
      />
      <button type="button" aria-label="Artır" className={btn} disabled={adet >= 100} onClick={() => ayarla(adet + 1)}>
        <Plus className="h-5 w-5" />
      </button>
      <span className="ml-1 text-xs text-zinc-500">en fazla 100</span>
    </div>
  );
}

function HavaleEkrani({ h }: { h: HavaleSonuc }) {
  const mesaj = `Merhaba, ${h.n} numaralı siparişimin (${h.urun}, ${h.tutar} TL) havale dekontunu gönderiyorum.`;
  const satir = (etiketi: string, deger: string, kopya = true) => (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-3 last:border-0">
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{etiketi}</div>
        <div className="break-words font-mono text-[15px] font-bold text-white">{deger}</div>
      </div>
      {kopya && <Kopyala deger={deger} etiketi={etiketi} />}
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
        <p className="flex items-center gap-2 font-cinzel text-lg font-bold text-white">
          <Check className="h-5 w-5 text-emerald-400" /> Siparişin alındı
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Aşağıdaki hesaba <strong className="text-white">{h.tutar} TL</strong> gönder. Açıklama kısmına sipariş
          numaranı ya da adını soyadını yaz.{" "}
          {h.tip === "ebook"
            ? "Ödemen hesabımıza geçince e-kitabın (PDF) e-postana gönderilir."
            : "Ödemen hesabımıza geçince kitabın isme özel imzalanıp ücretsiz kargoyla yola çıkar."}
        </p>
        <p className="mt-3 rounded-lg border border-crimson-600/50 bg-crimson-950/40 px-3 py-2 text-[13px] font-semibold text-crimson-100">
          Son adım (zorunlu): Ödemeyi yaptıktan sonra dekontu aşağıdaki butonla WhatsApp&apos;tan gönder. Dekont
          ulaşmadan {h.tip === "ebook" ? "e-kitabın gönderilmez" : "siparişin kargoya verilmez"}.
        </p>
      </div>
      <div className="rounded-2xl border border-gold-500/40 bg-white/[0.03] px-5 py-2">
        {satir("Sipariş no", h.n)}
        {satir("IBAN", h.iban)}
        {satir("Alıcı adı", h.aliciAdi)}
        {satir("Banka", h.banka)}
        {satir("Tutar", `${h.tutar} TL`, false)}
      </div>
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mesaj)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-base font-extrabold text-black transition hover:brightness-110"
      >
        <MessageCircle className="h-5 w-5" /> Dekontu WhatsApp&apos;tan Gönder (Zorunlu)
      </a>
      <p className="text-center text-xs text-zinc-500">
        Butona dokununca sipariş numaranla hazır bir mesaj açılır; dekontun ekran görüntüsünü ekleyip gönder. Bu
        sayfanın ekran görüntüsünü almanı öneririz.
      </p>
    </div>
  );
}

export default function OdemeForm({
  urun,
  ekleme,
  havaleAktif = false,
  ekitapHavale = false,
  havaleBilgi,
  havaleFiyat,
  referansFiyat,
  hediyeVar = false,
}: {
  urun: OdemeUrunu;
  ekleme?: EklemeBilgisi | null;
  havaleAktif?: boolean;
  /** E-kitapta havale açık mı (kampanya sürerken) */
  ekitapHavale?: boolean;
  havaleBilgi?: { iban: string; aliciAdi: string; banka: string };
  /** Havale ile birim fiyat (kampanya indirimi dahil) */
  havaleFiyat?: number;
  /** Havale indiriminde üstü çizili fiyat */
  referansFiyat?: number;
  hediyeVar?: boolean;
}) {
  const fiziksel = urun.tip === "physical";
  const kampanya = useKampanya() && !!hediyeVar;
  const havaleVar = (fiziksel || ekitapHavale) && havaleAktif && !!havaleBilgi;
  // Havale varsa varsayılan ve önerilen yöntem havale (nakit hemen hesaba geçer)
  const [yontem, setYontem] = useState<"kart" | "havale">(havaleVar ? "havale" : "kart");
  const [adet, setAdet] = useState(1);
  const havale = havaleVar && yontem === "havale";
  // Sade form: imza her zaman sipariş verenin adına, hediye seçeneği yok
  const farkliImza = false;
  const [havaleSonuc, setHavaleSonuc] = useState<HavaleSonuc | null>(null);
  const [web, setWeb] = useState("");
  const [ekle, setEkle] = useState(false);
  const [imzaEk, setImzaEk] = useState("");
  const ekli = !!ekleme && ekle;
  const kartBirim = ekli ? ekleme!.hedefFiyat : urun.fiyat;
  const havaleBirim = ekli ? (ekleme!.hedefHavaleFiyat ?? ekleme!.hedefFiyat) : (havaleFiyat ?? urun.fiyat);
  const kartToplam = kartBirim * adet;
  const havaleToplam = havaleBirim * adet;
  const toplam = havale ? havaleToplam : kartToplam;
  const havaleIndirimVar = havaleVar && havaleBirim < kartBirim;
  const referansBirim = ekli ? (ekleme!.hedefReferans ?? kartBirim) : (referansFiyat ?? kartBirim);
  const referansToplam = referansBirim * adet;
  const maxTaksit = ekli ? ekleme!.hedefTaksit : (urun.maxTaksit ?? 3);
  const [f, setF] = useState({
    ad: "",
    soyad: "",
    eposta: "",
    tel: "",
    il: "",
    ilce: "",
    adres: "",
    alici: "",
    not: "",
  });
  const [imza, setImza] = useState<string[]>(Array(urun.imzaSayisi).fill(""));
  const hediye = false;
  const [sozlesme, setSozlesme] = useState(false);
  const [modal, setModal] = useState<null | { t: string; type: "iade" | "sozlesme" | "gizlilik" }>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (!sozlesme) {
      setHata("Devam etmek için sözleşmeyi onaylamanız gerekiyor.");
      return;
    }
    setYukleniyor(true);
    try {
      const imzaGonder = !fiziksel || !farkliImza
        ? []
        : ekli
          ? ekleme!.asilSira === 0 ? [imza[0], imzaEk] : [imzaEk, imza[0]]
          : imza;
      const res = await fetch(havale ? "/api/odeme/havale" : "/api/odeme/baslat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, urun: urun.id, adet: fiziksel ? adet : 1, ekle: ekli, imza: imzaGonder, hediye, sozlesme, web }),
      });
      const j = await res.json();
      if (havale) {
        if (!res.ok || !j.n) throw new Error(j.hata || "Sipariş oluşturulamadı.");
        setHavaleSonuc(j);
        setYukleniyor(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!res.ok || !j.url) throw new Error(j.hata || "Ödeme başlatılamadı.");
      window.location.href = j.url;
    } catch (err) {
      setHata(err instanceof Error ? err.message : "Bir hata oluştu, lütfen tekrar deneyin.");
      setYukleniyor(false);
    }
  }

  const ekGoster = ekleme
    ? havale && ekleme.hedefHavaleFiyat != null
      ? ekleme.hedefHavaleFiyat - (havaleFiyat ?? urun.fiyat)
      : ekleme.ekFiyat
    : 0;

  const imzaEtiketi = (i: number) =>
    urun.imzaSayisi > 1
      ? `${KITAP_ADI[i === 0 ? 0 : 1]} — imza için isim`
      : ekli
        ? `${KITAP_ADI[ekleme!.asilSira]} — imza için isim`
        : "İmza için isim";

  if (havaleSonuc) return <HavaleEkrani h={havaleSonuc} />;

  const ilk = (x: string) => x.trim().split(" ")[0];
  const imzaIsmi = hediye ? ilk(f.alici) : ilk(f.ad);
  const kitapSayisi = urun.imzaSayisi + (ekli ? 1 : 0);
  const butonMetni = yukleniyor
    ? havale ? "Sipariş oluşturuluyor..." : "Güvenli ödeme ekranı açılıyor..."
    : havale ? `Siparişi Oluştur – Havale ile ${toplam} TL` : `Kartla Güvenli Öde – ${toplam} TL`;

  return (
    <form id="odeme-formu" onSubmit={gonder} className="space-y-8 pb-24 sm:pb-0">
      <input
        type="text"
        name="web"
        value={web}
        onChange={(e) => setWeb(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Diğer kitabı da ekle (tek tık) — formun en üstünde, en belirgin yerde */}
      {ekleme && (
        <fieldset className="space-y-2">
          <legend className="mb-1 font-cinzel text-lg font-bold text-white">
            İkinci kitabı da avantajlı fiyattan eklemek ister misin?
          </legend>
        <label
          className={`group relative block cursor-pointer overflow-hidden rounded-2xl border p-4 transition sm:p-5 ${
            ekle
              ? "border-gold-400/80 bg-gradient-to-br from-gold-500/15 via-gold-500/5 to-transparent shadow-gold-glow"
              : "border-dashed border-gold-500/50 bg-white/[0.02] hover:border-gold-400/80 hover:bg-gold-500/5"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
          <div className="flex items-start gap-3.5">
            <input
              type="checkbox"
              className="sr-only"
              checked={ekle}
              onChange={(e) => setEkle(e.target.checked)}
            />
            <span
              aria-hidden
              className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition ${
                ekle ? "border-gold-400 bg-gold-400 text-black" : "border-gold-500/60 bg-black/40 text-transparent"
              }`}
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="flex items-center gap-2 text-[15px] font-extrabold text-white">
                  <BookPlus className="h-4 w-4 flex-shrink-0 text-gold-400" />
                  {ekleme.kitap} {fiziksel ? "kitabını" : "e-kitabını"} da ekle
                </span>
                <span className="flex items-baseline gap-2 whitespace-nowrap font-mono">
                  {ekleme.normalFiyat && (
                    <span className="text-sm font-bold text-zinc-500 line-through decoration-crimson-500 decoration-2">
                      {ekleme.normalFiyat} TL
                    </span>
                  )}
                  <span className="text-lg font-black text-gold-300">+{ekGoster} TL</span>
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
                {fiziksel
                  ? `İkinci kitap ${ekleme.normalFiyat ?? ""} TL yerine ${ekGoster} TL${havale && havaleIndirimVar ? " (havale fiyatı)" : ""}. İkisi de isme özel imzalı, aynı pakette, kapına kadar ücretsiz kargo.${ekleme.hedefTaksit > 3 ? ` Kredi kartına ${ekleme.hedefTaksit} taksite kadar.` : ""}`
                  : havale
                    ? `İkisi birlikte havale ile ${havaleToplam && ekli ? havaleBirim : (ekleme.hedefHavaleFiyat ?? ekleme.hedefFiyat)} TL. İki PDF aynı e-postada. Aynı oyunun diğer tarafı.`
                    : "İki kitap da saniyeler içinde aynı e-postada. Aynı oyunun diğer tarafı."}
              </p>
              {ekle && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gold-300">
                  Eklendi · Toplam {toplam} TL{maxTaksit > 3 ? ` · ${maxTaksit} taksite kadar` : ""}
                </p>
              )}
            </div>
          </div>
        </label>
        </fieldset>
      )}

      {/* Ödeme yöntemi (havale fizikselde; e-kitapta kampanya sürerken) */}
      {havaleVar && (
        <fieldset className="space-y-3">
          <legend className="mb-1 font-cinzel text-lg font-bold text-white">Nasıl ödemek istersin?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              [
                "havale",
                Landmark,
                "Havale / EFT",
                havaleIndirimVar ? `Önerilen · ${havaleToplam} TL · tek çekim` : "Önerilen · IBAN'a gönder · tek çekim",
              ],
              ["kart", CreditCard, "Kredi / banka kartı", fiziksel ? `${kartToplam} TL · ${maxTaksit} taksite kadar` : `${kartToplam} TL · PDF anında e-postanda`],
            ] as const).map(([k, Ikon, baslik, alt]) => (
              <label
                key={k}
                className={`relative flex min-h-[64px] cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  yontem === k
                    ? k === "havale"
                      ? "border-emerald-400/80 bg-emerald-500/10"
                      : "border-gold-400/80 bg-gold-500/10"
                    : "border-zinc-700 hover:border-gold-500/50"
                }`}
              >
                {k === "havale" && havaleIndirimVar && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-black">
                    %{Math.round((1 - havaleBirim / referansBirim) * 100)} indirim
                  </span>
                )}
                <input
                  type="radio"
                  name="yontem"
                  className="mt-1 h-4 w-4 accent-gold-500"
                  checked={yontem === k}
                  onChange={() => setYontem(k)}
                />
                <span>
                  <span className="flex items-center gap-2 text-[15px] font-bold text-white">
                    <Ikon className="h-4 w-4 text-gold-400" /> {baslik}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-400">{alt}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {fiziksel && (
        <fieldset className="space-y-2">
          <legend className="mb-1 font-cinzel text-lg font-bold text-white">Kaç adet?</legend>
          <AdetSecici adet={adet} setAdet={setAdet} />
          {adet > 1 && (
            <p className="text-xs text-zinc-400">
              {adet} adet × {havale ? havaleBirim : kartBirim} TL = <strong className="text-white">{toplam} TL</strong>. Hepsi
              aynı pakette, ücretsiz kargo.
            </p>
          )}
        </fieldset>
      )}


      {havale && (
        <div className="space-y-4 rounded-2xl border border-gold-500/40 bg-gradient-to-b from-gold-500/10 to-transparent p-4 sm:p-5">
          <p className="flex items-center gap-2 font-cinzel text-base font-bold text-white">
            <Landmark className="h-4 w-4 text-gold-400" /> Ödeme bilgileri
          </p>
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-1">
            {([
              ["IBAN", havaleBilgi!.iban],
              ["Alıcı adı", havaleBilgi!.aliciAdi],
              ["Banka", havaleBilgi!.banka],
            ] as const).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 border-b border-white/5 py-3 last:border-0">
                <div className="min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{k}</div>
                  <div className="break-words font-mono text-[15px] font-bold text-white">{v}</div>
                </div>
                <Kopyala deger={v} etiketi={k} />
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 py-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Tutar</div>
                <div className="font-mono text-[15px] font-bold text-gold-200">
                  {havaleIndirimVar && (
                    <span className="mr-2 text-zinc-500 line-through decoration-crimson-500 decoration-2">{referansToplam} TL</span>
                  )}
                  {toplam} TL
                </div>
              </div>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-zinc-300">
            Açıklama kısmına <strong className="text-white">adını soyadını</strong> yaz. Aşağıdaki bilgileri doldurup
            siparişini oluştur;{" "}
            {fiziksel
              ? "ödemen hesabımıza geçince kitabın isme özel imzalanıp ücretsiz kargoyla yola çıkar."
              : "ödemen hesabımıza geçince e-kitabın (PDF) e-postana gönderilir. Anında teslim istersen kartla öde."}
          </p>
          <p className="rounded-lg border border-crimson-600/50 bg-crimson-950/40 px-3 py-2 text-[13px] leading-relaxed text-crimson-100">
            <strong>Önemli:</strong> Ödemeyi yaptıktan sonra dekontu WhatsApp&apos;tan göndermen zorunludur. Dekont
            ulaşmadan sipariş işleme alınmaz.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Merhaba, havale ile sipariş vermek istiyorum, yardımcı olur musunuz?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#25D366]/50 px-3 py-2 text-xs font-bold text-[#7ee2a8] transition hover:bg-[#25D366]/10"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Sorun mu var? WhatsApp destek
          </a>
        </div>
      )}


      {/* İletişim */}
      <fieldset className="space-y-4">
        <legend className="mb-1 font-cinzel text-lg font-bold text-white">
          {hediye ? "Senin bilgilerin (gönderen)" : "İletişim bilgileri"}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Alan label="Ad">
            <input required autoComplete="given-name" className={giris} value={f.ad} onChange={set("ad")} />
          </Alan>
          <Alan label="Soyad">
            <input required autoComplete="family-name" className={giris} value={f.soyad} onChange={set("soyad")} />
          </Alan>
          <Alan label={fiziksel ? (kampanya ? "E-posta (hediye e-kitap için)" : "E-posta (isteğe bağlı)") : "E-posta"}>
            <input
              required={!fiziksel}
              type="email"
              autoComplete="email"
              className={giris}
              value={f.eposta}
              onChange={set("eposta")}
              placeholder={fiziksel ? (kampanya ? "Hediye PDF bu adrese gelir" : "Sipariş onayı için") : "E-kitap bu adrese gönderilecek"}
            />
          </Alan>
          <Alan label="Cep telefonu">
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={giris}
              value={f.tel}
              onChange={set("tel")}
              placeholder="5XX XXX XX XX"
            />
          </Alan>
          {!fiziksel && (
            <Alan label="Şehir" className="sm:col-span-2">
              <input required autoComplete="address-level1" className={giris} value={f.il} onChange={set("il")} />
            </Alan>
          )}
        </div>
        {!fiziksel && (
          <p className="flex items-start gap-2 text-xs text-zinc-400">
            <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold-400" />
            {havale
              ? "Havale ödemen hesabımıza geçince e-kitabın (PDF) bu e-posta adresine gönderilir."
              : "Ödeme onaylandığı anda e-kitabın (PDF) bu e-posta adresine otomatik gönderilir."}
          </p>
        )}
      </fieldset>

      {fiziksel && (
        <>
          {/* Teslimat */}
          <fieldset className="space-y-4">
            <legend className="mb-1 flex items-center gap-2 font-cinzel text-lg font-bold text-white">
              <Truck className="h-4 w-4 text-gold-400" /> Teslimat adresi
            </legend>
            {hediye && (
              <Alan label="Teslim alacak kişinin adı soyadı">
                <input required className={giris} value={f.alici} onChange={set("alici")} />
              </Alan>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <Alan label="İl">
                <input required autoComplete="address-level1" className={giris} value={f.il} onChange={set("il")} />
              </Alan>
              <Alan label="İlçe">
                <input required autoComplete="address-level2" className={giris} value={f.ilce} onChange={set("ilce")} />
              </Alan>
            </div>
            <Alan label="Açık adres">
              <textarea
                required
                rows={3}
                autoComplete="street-address"
                className={giris}
                value={f.adres}
                onChange={set("adres")}
                placeholder="Mahalle, sokak, bina ve daire no"
              />
            </Alan>
          </fieldset>

          {/* İmza: her zaman sipariş verenin adına; farklı isim isteyen nota yazar */}
          <p className="-mt-4 flex items-center gap-2 text-sm text-zinc-400">
            <PenLine className="h-4 w-4 flex-shrink-0 text-gold-400" />
            {kitapSayisi > 1 || adet > 1 ? "Kitaplar" : "Kitap"}{" "}
            {imzaIsmi ? <strong className="text-gold-200">&quot;{imzaIsmi}&quot;</strong> : "senin"} adına imzalanır.
          </p>
        </>
      )}

      <Alan label="Sipariş notu (isteğe bağlı)">
        <input className={giris} value={f.not} onChange={set("not")} maxLength={200} />
      </Alan>

      {/* Sözleşme */}
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-300">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 flex-shrink-0 accent-gold-500"
          checked={sozlesme}
          onChange={(e) => setSozlesme(e.target.checked)}
        />
        <span>
          <button
            type="button"
            className="text-gold-300 underline underline-offset-2 hover:text-gold-200"
            onClick={() => setModal({ t: "Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme", type: "sozlesme" })}
          >
            Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu
          </button>
          &apos;nu,{" "}
          <a href="/teslimat-ve-iade" target="_blank" className="text-gold-300 underline underline-offset-2 hover:text-gold-200">
            Teslimat ve İade Şartları
          </a>
          &apos;nı ve{" "}
          <button
            type="button"
            className="text-gold-300 underline underline-offset-2 hover:text-gold-200"
            onClick={() => setModal({ t: "Gizlilik Politikası ve KVKK Aydınlatma Metni", type: "gizlilik" })}
          >
            KVKK Aydınlatma Metni
          </button>
          &apos;ni okudum, onaylıyorum.
        </span>
      </label>

      {hata && (
        <div role="alert" className="rounded-xl border border-crimson-600/60 bg-crimson-950/50 px-4 py-3 text-sm text-crimson-100">
          {hata}
        </div>
      )}

      <button
        type="submit"
        disabled={yukleniyor}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-6 text-base font-extrabold text-black shadow-gold-glow transition hover:brightness-110 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
      >
        {yukleniyor ? <Loader2 className="h-5 w-5 animate-spin" /> : havale ? <Landmark className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
        {butonMetni}
      </button>

      {/* Mobilde ekranın altında sabit ödeme çubuğu: toplam + tek dokunuşla sipariş */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/30 bg-matte-950/95 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5 backdrop-blur-md sm:hidden">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-300">
            {havale ? "Havale / EFT" : "Kartla"}
            {fiziksel && adet > 1 ? ` · ${adet} adet` : ""}
          </span>
          <span className="font-mono font-bold text-white">
            {havale && havaleIndirimVar && (
              <span className="mr-1.5 text-zinc-500 line-through decoration-crimson-500">{referansToplam} TL</span>
            )}
            {toplam} TL
          </span>
        </div>
        <button
          type="submit"
          form="odeme-formu"
          disabled={yukleniyor}
          className={`flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl px-4 text-[15px] font-extrabold text-black transition active:scale-[0.99] disabled:opacity-70 ${
            havale ? "bg-emerald-400" : "bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
          }`}
        >
          {yukleniyor ? <Loader2 className="h-5 w-5 animate-spin" /> : havale ? <Landmark className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          {yukleniyor ? (havale ? "Oluşturuluyor..." : "Açılıyor...") : havale ? `Siparişi Oluştur – ${toplam} TL` : `Kartla Öde – ${toplam} TL`}
        </button>
      </div>

      {havale ? (
        <p className="text-center text-xs text-zinc-500">
          Siparişi oluşturunca IBAN bilgileri ekranda görünür. Ödemen hesabımıza geçince{" "}
          {fiziksel ? "kitabın kargoya verilir." : "e-kitabın e-postana gönderilir."}
        </p>
      ) : (
      <>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        Kart bilgilerin bu siteye değil, doğrudan iyzico&apos;nun 3D Secure ödeme ekranına girilir.
      </p>

      <p className="-mt-4 text-center text-xs text-zinc-500">
        Kredi kartına <strong className="text-zinc-300">{maxTaksit} taksite kadar</strong> seçenek ödeme ekranında. Tek çekim
        fiyatı {toplam} TL; taksitli seçeneklerde vade farkı uygulanır.
      </p>
      </>
      )}

      <LegalModal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.t || ""}
        type={modal?.type || "sozlesme"}
      />
    </form>
  );
}

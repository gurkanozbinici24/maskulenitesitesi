"use client";

import { useState } from "react";
import { BookPlus, Check, Gift, Loader2, Lock, PenLine, ShieldCheck, Truck, Mail } from "lucide-react";
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
}

const KITAP_ADI = ["Vazgeçilmez Olma Sanatı", "Çekicilik Sanatı"] as const;

export default function OdemeForm({ urun, ekleme }: { urun: OdemeUrunu; ekleme?: EklemeBilgisi | null }) {
  const fiziksel = urun.tip === "physical";
  const [ekle, setEkle] = useState(false);
  const [imzaEk, setImzaEk] = useState("");
  const ekli = !!ekleme && ekle;
  const toplam = ekli ? ekleme!.hedefFiyat : urun.fiyat;
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
  const [hediye, setHediye] = useState(false);
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
      const res = await fetch("/api/odeme/baslat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          urun: urun.id,
          ekle: ekli,
          imza: ekli && fiziksel ? (ekleme!.asilSira === 0 ? [imza[0], imzaEk] : [imzaEk, imza[0]]) : imza,
          hediye,
          sozlesme,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.url) throw new Error(j.hata || "Ödeme başlatılamadı.");
      window.location.href = j.url;
    } catch (err) {
      setHata(err instanceof Error ? err.message : "Bir hata oluştu, lütfen tekrar deneyin.");
      setYukleniyor(false);
    }
  }

  const imzaEtiketi = (i: number) =>
    urun.imzaSayisi > 1
      ? `${KITAP_ADI[i === 0 ? 0 : 1]} — imza için isim`
      : ekli
        ? `${KITAP_ADI[ekleme!.asilSira]} — imza için isim`
        : "İmza için isim";

  return (
    <form onSubmit={gonder} className="space-y-8">
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
          <Alan label="E-posta">
            <input
              required
              type="email"
              autoComplete="email"
              className={giris}
              value={f.eposta}
              onChange={set("eposta")}
              placeholder={fiziksel ? "ornek@mail.com" : "E-kitap bu adrese gönderilecek"}
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
            Ödeme onaylandığı anda e-kitabın (PDF) bu e-posta adresine otomatik gönderilir.
          </p>
        )}
      </fieldset>

      {fiziksel && (
        <>
          {/* Hediye seçeneği */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-crimson-700/40 bg-crimson-950/30 px-4 py-3">
            <input
              type="checkbox"
              className="h-5 w-5 accent-crimson-500"
              checked={hediye}
              onChange={(e) => setHediye(e.target.checked)}
            />
            <Gift className="h-4 w-4 text-crimson-300" />
            <span className="text-sm text-zinc-200">Hediye olarak başka birine gönderiyorum</span>
          </label>

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

          {/* İmza */}
          <fieldset className="space-y-4">
            <legend className="mb-1 flex items-center gap-2 font-cinzel text-lg font-bold text-white">
              <PenLine className="h-4 w-4 text-gold-400" /> İsme özel imza
            </legend>
            {imza.map((v, i) => (
              <Alan key={i} label={imzaEtiketi(i)}>
                <input
                  required
                  className={giris}
                  value={v}
                  onChange={(e) => setImza((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder={hediye ? "Hediye edeceğin kişinin adı" : "Kitaba yazılacak isim"}
                />
              </Alan>
            ))}
            {ekli && (
              <Alan label={`${KITAP_ADI[ekleme!.asilSira === 0 ? 1 : 0]} — imza için isim`}>
                <input
                  required
                  className={giris}
                  value={imzaEk}
                  onChange={(e) => setImzaEk(e.target.value)}
                  placeholder={hediye ? "Hediye edeceğin kişinin adı" : "Kitaba yazılacak isim"}
                />
              </Alan>
            )}
          </fieldset>
        </>
      )}

      <Alan label="Sipariş notu (isteğe bağlı)">
        <input className={giris} value={f.not} onChange={set("not")} maxLength={200} />
      </Alan>

      {/* Diğer kitabı da ekle (tek tık) */}
      {ekleme && (
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
                  <span className="text-lg font-black text-gold-300">+{ekleme.ekFiyat} TL</span>
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
                {fiziksel
                  ? `İkinci kitap ${ekleme.normalFiyat ?? ""} TL yerine ${ekleme.ekFiyat} TL. İkisi de isme özel imzalı, aynı pakette, kapına kadar ücretsiz kargo.${ekleme.hedefTaksit > 3 ? ` Kredi kartına ${ekleme.hedefTaksit} taksite kadar.` : ""}`
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
      )}

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
        {yukleniyor ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
        {yukleniyor ? "Güvenli ödeme ekranı açılıyor..." : `Kartla Güvenli Öde – ${toplam} TL`}
      </button>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        Kart bilgilerin bu siteye değil, doğrudan iyzico&apos;nun 3D Secure ödeme ekranına girilir.
      </p>

      <p className="-mt-4 text-center text-xs text-zinc-500">
        Kredi kartına <strong className="text-zinc-300">{maxTaksit} taksite kadar</strong> seçenek ödeme ekranında. Tek çekim
        fiyatı {toplam} TL; taksitli seçeneklerde vade farkı uygulanır.
      </p>

      <LegalModal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.t || ""}
        type={modal?.type || "sozlesme"}
      />
    </form>
  );
}

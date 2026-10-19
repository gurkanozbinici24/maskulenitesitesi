"use client";

import { useState } from "react";
import { Crown, Lock, Send, Target } from "lucide-react";
import { DANISMANLIK_CONFIG as C, VIP_LAUNCH_ACTIVE, VIP_PRICE_LABEL, buildWhatsAppUrl } from "@/config/cekicilikConfig";

type Paket = "seans" | "vip";

/**
 * Başvuru formu: bilgiler sitede SAKLANMAZ; doldurulan başvuru hazır bir WhatsApp mesajına
 * dönüştürülüp resmi hatta gönderilir.
 */
export default function ConsultationApply() {
  const [paket, setPaket] = useState<Paket>("seans");
  const [ad, setAd] = useState("");
  const [yas, setYas] = useState("");
  const [durum, setDurum] = useState("");
  const [platform, setPlatform] = useState("Google Meet");
  const [zaman, setZaman] = useState("");
  const [hata, setHata] = useState("");

  const gonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ad.trim() || durum.trim().length < 20) {
      setHata("Lütfen adını ve durumunu en az birkaç cümleyle yaz.");
      return;
    }
    setHata("");
    const paketAd =
      paket === "vip"
        ? `${C.vip.name} (${VIP_PRICE_LABEL} TL / ${C.vip.period}${VIP_LAUNCH_ACTIVE ? ", lansman fiyatı" : ""})`
        : `Birebir Strateji Seansı (${C.priceLabel} TL / ${C.durationMin} dk)`;
    const mesaj = [
      "Merhaba, danışmanlık başvurusu yapmak istiyorum.",
      "",
      `Paket: ${paketAd}`,
      `Ad: ${ad.trim()}`,
      yas.trim() ? `Yaş: ${yas.trim()}` : "",
      `Platform tercihi: ${platform}`,
      zaman.trim() ? `Uygun olduğum gün/saatler: ${zaman.trim()}` : "",
      "",
      "Durumum:",
      durum.trim(),
    ]
      .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
      .join("\n");
    window.open(buildWhatsAppUrl(mesaj, C.phone), "_blank", "noopener,noreferrer");
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-gold-400/70 focus:bg-black/70";

  return (
    <section id="basvuru" className="relative scroll-mt-24 border-t border-white/5 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-[70%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Başvuru ile görüşme</div>
          <h2 className="font-cinzel text-[clamp(1.7rem,4vw,2.6rem)] font-bold text-white">
            Başvurunu <span className="gold-text-gradient">Gönder</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
            Her başvuruyu tek tek okuyorum. Durumunu kısaca anlat; uygun gördüğüm başvurulara WhatsApp&apos;tan dönüş yapıp
            randevunu birlikte belirliyoruz.
          </p>
        </div>

        <form
          onSubmit={gonder}
          className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-[linear-gradient(180deg,rgba(20,16,10,0.9),rgba(8,6,8,0.95))] p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)] sm:p-9"
        >
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />

          {/* Paket seçimi */}
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                { k: "seans", icon: Target, t: "Birebir Strateji Seansı", d: `${C.priceLabel} TL · ${C.durationMin} dk` },
                { k: "vip", icon: Crown, t: C.vip.name, d: `${VIP_PRICE_LABEL} TL / ${C.vip.period}${VIP_LAUNCH_ACTIVE ? " · lansman" : ""}` },
              ] as const
            ).map(({ k, icon: I, t, d }) => (
              <button
                type="button"
                key={k}
                onClick={() => setPaket(k)}
                aria-pressed={paket === k}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  paket === k
                    ? "border-gold-400 bg-gold-500/10 shadow-[0_0_30px_-10px_rgba(212,175,55,0.6)]"
                    : "border-white/10 bg-black/40 hover:border-gold-500/40"
                }`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${paket === k ? "bg-gold-400 text-black" : "bg-white/5 text-gold-400"}`}>
                  <I className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-white">{t}</span>
                  <span className="block text-xs text-gold-300">{d}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-zinc-300">Adın (takma ad olabilir) *</span>
              <input className={input} value={ad} onChange={(e) => setAd(e.target.value)} placeholder="Adın" maxLength={40} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-zinc-300">Yaşın</span>
              <input className={input} value={yas} onChange={(e) => setYas(e.target.value.replace(/\D/g, "").slice(0, 2))} placeholder="Örn. 28" inputMode="numeric" />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-semibold text-zinc-300">Durumunu kısaca anlat *</span>
            <textarea
              className={`${input} min-h-[130px] resize-y`}
              value={durum}
              onChange={(e) => setDurum(e.target.value)}
              placeholder="İlişkinde ya da hayatında şu an neler oluyor? Görüşmeden ne bekliyorsun?"
              maxLength={900}
            />
            <span className="mt-1 block text-right text-[10px] text-zinc-500">{durum.length}/900</span>
          </label>

          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-zinc-300">Platform tercihin</span>
              <div className="flex gap-2">
                {["Google Meet", "WhatsApp"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`flex-1 rounded-xl border px-3 py-3 text-xs font-bold transition-colors ${
                      platform === p ? "border-gold-400 bg-gold-500/10 text-gold-200" : "border-white/10 bg-black/40 text-zinc-300 hover:border-gold-500/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-zinc-300">Uygun olduğun gün/saatler</span>
              <input className={input} value={zaman} onChange={(e) => setZaman(e.target.value)} placeholder="Örn. hafta içi 20:00 sonrası" maxLength={80} />
            </label>
          </div>

          {hata && <p className="mt-4 text-sm font-semibold text-red-400">{hata}</p>}

          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-6 py-4 text-sm font-black uppercase tracking-wider text-black shadow-gold-glow transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Başvuruyu WhatsApp&apos;tan Gönder
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-500">
            <Lock className="h-3.5 w-3.5" />
            Bilgilerin sitede saklanmaz; başvurun yalnızca WhatsApp üzerinden doğrudan bize iletilir.
          </p>
        </form>
      </div>
    </section>
  );
}

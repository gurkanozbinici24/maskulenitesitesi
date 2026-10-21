import { CreditCard, Landmark, Lock, MessageCircle, PenLine, ShieldCheck, Truck } from "lucide-react";
import { KART_ODEME_AKTIF } from "@/config/cekicilikConfig";

/**
 * "Nasıl Sipariş Verilir?" — iki yol:
 *  - WhatsApp + Havale/EFT (her zaman)
 *  - Kart ile güvenli ödeme (iyzico) — yalnızca KART_ODEME_AKTIF true olduğunda görünür.
 */
type Step = { icon: typeof MessageCircle; title: string; text: string };

const WHATSAPP_STEPS: Step[] = [
  { icon: MessageCircle, title: "WhatsApp'tan yaz", text: "Butona dokun, hazır sipariş mesajı açılsın. İmza için ismi yazman yeterli." },
  { icon: Landmark, title: "Havale / EFT ile öde", text: "Ödeme bilgilerini WhatsApp'tan iletiyoruz, ödemen onaylanınca sipariş hazırlanır." },
  { icon: PenLine, title: "İsmine imzalanır", text: "Kitabın, adına özel imzalanıp gizli ve korumalı paketlenir." },
  { icon: Truck, title: "Aynı gün kargoda", text: "14:00'e kadar verilen siparişler aynı gün Yurtiçi Kargo'da, 2 günde elinde." },
];

const CARD_STEPS: Step[] = [
  { icon: CreditCard, title: "Kartla Öde'ye dokun", text: "Kitabını seç, adresini ve imza ismini gir." },
  { icon: Lock, title: "Kartla güvenli öde", text: "Kredi veya banka kartıyla, iyzico 3D Secure güvencesiyle öde." },
  { icon: PenLine, title: "İsmine imzalanır", text: "Kitabın, adına özel imzalanıp gizli ve korumalı paketlenir." },
  { icon: Truck, title: "Aynı gün kargoda", text: "14:00'e kadar verilen siparişler aynı gün Yurtiçi Kargo'da, 2 günde elinde." },
];

function Path({ label, badge, steps, accent }: { label: string; badge: string; steps: Step[]; accent: "gold" | "emerald" }) {
  const ring = accent === "gold" ? "border-gold-500/30" : "border-emerald-500/30";
  const chip = accent === "gold" ? "bg-gold-400 text-black" : "bg-emerald-400 text-black";
  const num = accent === "gold" ? "from-gold-300 to-gold-600 text-black" : "from-emerald-300 to-emerald-600 text-black";
  return (
    <div className={`relative overflow-hidden rounded-3xl border ${ring} bg-gradient-to-b from-white/[0.05] to-transparent p-5 sm:p-7`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-cinzel text-lg font-bold text-white sm:text-xl">{label}</h3>
        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${chip}`}>{badge}</span>
      </div>
      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-3 lg:flex-col">
            <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-black shadow-gold-glow ${num}`}>
              {i + 1}
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                <s.icon className="h-4 w-4 text-gold-400" />
                {s.title}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function OrderStepsSection() {
  return (
    <section id="nasil-siparis" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Kolay ve Güvenli
          </div>
          <h2 className="font-cinzel text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white">
            Nasıl <span className="gold-text-gradient">Sipariş Verilir?</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            {KART_ODEME_AKTIF
              ? "İster WhatsApp'tan yaz, ister kartınla saniyeler içinde öde. İki yolda da kitabın ismine imzalanıp aynı gün kargoda."
              : "Dört adımda kitabın kapında. Siparişin ismine imzalanıp aynı gün kargoya verilir."}
          </p>
        </div>

        <div className="grid gap-5">
          {KART_ODEME_AKTIF && (
            <Path label="Kartla Hızlı Ödeme" badge="iyzico güvencesi" steps={CARD_STEPS} accent="emerald" />
          )}
          <Path label="WhatsApp ile Sipariş" badge="Havale / EFT" steps={WHATSAPP_STEPS} accent="gold" />
        </div>
      </div>
    </section>
  );
}

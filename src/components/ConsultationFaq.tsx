import { ChevronDown } from "lucide-react";
import { DANISMANLIK_CONFIG as C } from "@/config/cekicilikConfig";

const FAQS = [
  {
    q: "Seans nasıl yapılıyor?",
    a: `Seans ${C.durationMin} dakika sürer ve Google Meet ya da WhatsApp üzerinden yapılır. Hangisi sana daha rahat gelirse onu seçebilirsin.`,
  },
  {
    q: "Kamerayı açmak zorunda mıyım?",
    a: "Hayır. Seansı sesli ya da görüntülü yapabilirsin; tercih tamamen sana ait.",
  },
  {
    q: "Seans ücreti ne kadar, ödemeyi nasıl yapıyorum?",
    a: `Birebir seans ücreti ${C.priceLabel} TL'dir. Randevu saatini WhatsApp'tan birlikte belirledikten sonra ödemeyi havale/EFT ile yapıyorsun ve randevun kesinleşiyor.`,
  },
  {
    q: "Konuştuklarımız gizli kalır mı?",
    a: "Evet. Seansta konuşulan her konu ve paylaştığın tüm detaylar tamamen gizli tutulur.",
  },
  {
    q: "Danışmanlık sadece erkekler için mi?",
    a: "Hayır. İlişkisinde kontrolü ve öz saygıyı geri kazanmak isteyen kadın ve erkek herkes seans alabilir.",
  },
  {
    q: "Randevu saatini nasıl belirliyoruz?",
    a: "WhatsApp'tan uygun olduğun gün ve saatleri yazıyorsun, sana uygun bir zaman dilimini birlikte netleştiriyoruz.",
  },
];

export default function ConsultationFaq() {
  return (
    <section id="danismanlik-sss" className="relative border-t border-white/5 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Merak edilenler</div>
          <h2 className="font-cinzel text-[clamp(1.6rem,3.5vw,2.3rem)] font-bold text-white">
            Seans Hakkında <span className="gold-text-gradient">Sorular</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors open:border-gold-500/40 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-gold-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

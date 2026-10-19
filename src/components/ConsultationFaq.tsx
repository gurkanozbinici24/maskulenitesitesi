import { ChevronDown } from "lucide-react";
import { DANISMANLIK_CONFIG as C, VIP_LAUNCH_ACTIVE, VIP_PRICE_LABEL } from "@/config/cekicilikConfig";

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
    q: "Ücretler ne kadar, ödemeyi nasıl yapıyorum?",
    a: `Birebir Strateji Seansı ${C.priceLabel} TL (${C.durationMin} dk), ${C.vip.name} aylık ${VIP_PRICE_LABEL} TL'dir${VIP_LAUNCH_ACTIVE ? ` (ilk ${C.vip.launchSlotsTotal} danışana özel lansman fiyatı; normal fiyatı ${C.vip.priceLabel} TL)` : ""}. Başvurun değerlendirilip randevu netleşince ödemeyi havale/EFT ile yapıyorsun.`,
  },
  {
    q: "Strateji Seansı'nda hediyeler neler?",
    a: "İlk seansına özel olarak 2.000 TL değerindeki Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı fiziksel kitapları kapına kadar hediye gönderilir (Çekicilik Sanatı 5 Kasım'da çıktığında gönderilir). Ayrıca ilk seansının ardından 10.000 TL değerinde 2 haftalık WhatsApp desteği hediyedir; seansla ilgili aklına takılanları bu süre boyunca sorabilirsin. Düzenli ve sürekli destek için VIP Mentörlük paketi önerilir.",
  },
  {
    q: "VIP Mentörlük nasıl işliyor?",
    a: `Her ay ${C.vip.sessionsPerMonth} birebir seans yapıyoruz. 4 hafta boyunca seanslar arasında WhatsApp'tan bana ulaşabiliyorsun (${C.vip.supportNote.toLocaleLowerCase("tr")}). Her seanstan sonra yazılı aksiyon planı alıyorsun, ayda bir 15 dakikalık acil kriz görüşmesi hakkın var ve iki kitap ismine imzalı olarak hediye gönderiliyor. Ücret aylıktır.`,
  },
  {
    q: "Neden başvuru ile çalışıyorsunuz?",
    a: "Her görüşmeye tam hazırlıkla girmek için başvuruları tek tek okuyorum. Böylece seansın ilk dakikasından itibaren doğrudan senin durumuna odaklanabiliyoruz.",
  },
  {
    q: "Her başvuru kabul ediliyor mu?",
    a: `Hayır. Her ay sınırlı sayıda danışanla çalışıyorum (ayda ${C.quota.total} strateji seansı, ${C.vip.quota.total} VIP danışan). Başvuruları tek tek okuyup durumuna gerçekten katkı sağlayabileceğimi düşündüğüm, sürece ciddi yaklaşan kişilerle ilerliyorum. Kontenjan dolduysa başvurun bir sonraki aya sıralanır.`,
  },
  {
    q: "Konuştuklarımız gizli kalır mı?",
    a: "Evet. Seansta konuşulan her konu ve paylaştığın tüm detaylar tamamen gizli tutulur.",
  },
  {
    q: "Danışmanlık sadece erkekler için mi?",
    a: "Evet. Birebir strateji seansı ve VIP Mentörlük yalnızca erkeklere veriliyor. Kadın okurlarım için ilişki dinamiklerini kadın tarafından anlattığım Çekicilik Sanatı kitabını yazdım; 5 Kasım'da çıkıyor.",
  },
  {
    q: "Randevu saatini nasıl belirliyoruz?",
    a: "Başvuru formunda uygun olduğun gün ve saatleri yazıyorsun; dönüş yaparken sana uygun bir zaman dilimini birlikte netleştiriyoruz.",
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

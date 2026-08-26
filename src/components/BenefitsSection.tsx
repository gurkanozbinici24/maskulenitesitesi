import { Flame, Shield, Compass, Check, ArrowRight } from "lucide-react";

interface BenefitCardProps {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  takeaways: string[];
}

const benefits: BenefitCardProps[] = [
  {
    number: "01",
    icon: Flame,
    title: "Yıkılan Doğrular",
    subtitle: "ACIMASIZ GERÇEKLERLE YÜZLEŞ",
    description:
      "Bugüne kadar sana dayatılan tüm o pasif, onay arayan yalanları çöpe atıyoruz. Neden sürekli kaybettiğini ve manipüle edildiğini yüzüne çarpacak gerçeklerle uyanmaya hazır ol.",
    takeaways: [
      "Toplumun dayattığı zayıf zihniyeti tamamen yıkmak.",
      "Geçmişteki o çaresiz hallerine sonsuza dek veda etmek.",
      "Sana oynanan zihin oyunlarını anında deşifre etmek.",
    ],
  },
  {
    number: "02",
    icon: Shield,
    title: "Sarsılmaz Çerçeve",
    subtitle: "KAYA GİBİ BİR KARAKTER İNŞASI",
    description:
      "Ne yaşanırsa yaşansın eğilmeyen, krizlerde sarsılmayan bir güç merkezi ol. İlişkinin merkezinde sen olacaksın ve senin çerçeven geçerli olacak.",
    takeaways: [
      "Duygusal manipülasyonlara karşı mutlak bağışıklık.",
      "Kadın doğasının saygı duyduğu o \"sarsılmaz çerçeveyi\" kurmak.",
      "Kriz anlarında tavizsiz ve net kararlar alabilmek.",
    ],
  },
  {
    number: "03",
    icon: Compass,
    title: "Oyunun Kuralları",
    subtitle: "MUTLAK OTORİTE VE GÜÇ DİNAMİKLERİ",
    description:
      "İlişkiler tesadüf değil, güç dinamikleridir. Çekim yasalarını lehine çevir, gizli dinamikleri yönet ve partnerinin sana saygı duymasını sağla. Oyunu sen yöneteceksin.",
    takeaways: [
      "Gizli güç dinamiklerini okuma ve ustaca yönetme.",
      "Karşındakinin seni \"vazgeçilmez bir alfa\" olarak görmesi.",
      "İlişkilerde ultra başarı ve mutlak hakimiyet.",
    ],
  },
];

export default function BenefitsSection() {
  return (
    <section id="kazanimlar" className="py-24 bg-matte-900/60 relative border-t border-zinc-900">
      
      {/* Decorative Grid Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span>DÖNÜŞÜM REHBERİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Neler <span className="gold-text-gradient">Kazanacaksın?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
            Bu bir tavsiye kitabı değil, bir güç manifestosudur. İlişkilerde kontrolü eline almak, kadın doğasını şifrelerine kadar çözmek ve vazgeçilmez bir otorite olmak isteyenler için yazıldı.
          </p>
        </div>

        {/* 3-Column Authority Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-b from-matte-800 to-matte-900/90 border border-zinc-800/80 hover:border-gold-500/50 shadow-card-elevated hover:shadow-gold-glow transition-all duration-300"
              >
                {/* Top Subtle Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-matte-850 border border-zinc-700/60 flex items-center justify-center text-gold-400 group-hover:border-gold-400 group-hover:bg-gold-500/10 transition-colors shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-zinc-700 group-hover:text-gold-500/50 transition-colors font-mono">
                      {benefit.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-gold-300 transition-colors mb-2 tracking-tight">
                    {benefit.title}
                  </h3>
                  <div className="text-xs font-bold text-gold-500 uppercase tracking-wider mb-4">
                    {benefit.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {benefit.description}
                  </p>
                </div>

                {/* Takeaways List */}
                <div className="pt-6 border-t border-zinc-800/80 space-y-3 mt-4">
                  {benefit.takeaways.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-gold-400">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-xs text-zinc-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Corner Decorative Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute transform rotate-45 bg-gold-500/10 -top-8 -right-8 w-16 h-16 group-hover:bg-gold-500/20 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-matte-850 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12 bg-gradient-to-b from-gold-400 to-amber-600 rounded-full hidden sm:block flex-shrink-0" />
            <div>
              <blockquote className="text-sm sm:text-base font-semibold text-zinc-200 italic leading-relaxed">
                &ldquo;Saygı dilenerek kazanılmaz, tavizsiz bir çerçeveyle inşa edilir. Ya kendi hayatının kurallarını koyup vazgeçilmez olursun, ya da başkalarının oyununda manipüle edilen bir soytarı olarak kalırsın. Seçim senin.&rdquo;
              </blockquote>
              <div className="text-xs text-gold-500/90 mt-2 uppercase tracking-widest font-mono font-bold">
                - GÜRKAN ÖZBİNİCİ / MASKÜLENİTE SİTESİ
              </div>
            </div>
          </div>
          <a
            href="#fiyat-kartlari"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-black text-xs font-black uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-200"
          >
            <span>GÜCÜ ELİNE AL ➔</span>
          </a>
        </div>

      </div>
    </section>
  );
}

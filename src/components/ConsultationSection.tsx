"use client";

import Image from "next/image";
import {
  Calendar,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Instagram,
  CheckCircle2,
  Lock,
  Crown,
  Sparkles,
  PhoneCall,
} from "lucide-react";

export default function ConsultationSection() {
  return (
    <section
      id="danismanlik"
      className="py-24 relative overflow-hidden bg-matte-900/90 border-t border-zinc-800/80 scroll-mt-20"
    >
      {/* Arka Plan Atmosfer Işıkları */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık ve Tanıtım */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-matte-850 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-gold-glow">
            <Crown className="w-3.5 h-3.5 text-gold-400" />
            <span>VIP BİREBİR STRATEJİ & MENTÖRLÜK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Özel Danışmanlık & <span className="gold-text-gradient">Koçluk Seansı</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            İlişkilerinde kontrolü kaybettiğin kritik bir krizde misin? 
            Kendi kurallarını koyup karşındakinin sana gönüllü saygı duymasını sağlayacak 
            tavizsiz stratejileri doğrudan 1-e-1 masaya yatırıyoruz.
          </p>
        </div>

        {/* Ana İçerik Izgarası: Sol İçerik & Sağ Görsel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Sol Kolon: Detaylar, Değer Maddeleri ve Butonlar */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold-400 tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>1 Saatlik Canlı Sesli / Görüntülü Seans</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-5">
              Acımasız Gerçeklerle Yüzleş, Durumu Kökünden Değiştir.
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
              Bu sıradan bir dertleşme değil; kadının zihnini, sana oynanan manipülasyonları 
              ve ilişkideki güç dengelerini cerrahi bir hassasiyetle parçalarına ayırdığımız 
              <strong> stratejik bir operasyondur</strong>. Mevcut durumunu bizzat dinliyor, 
              yapılan ölümcül hataları deşifre ediyor ve masadan <strong>çerçevesi sarsılmaz bir erkek</strong> olarak 
              kalkman için sana özel yol haritası çiziyoruz.
            </p>

            {/* Özellik Listesi */}
            <div className="w-full space-y-4 mb-10">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-matte-850/80 border border-zinc-800 hover:border-gold-500/30 transition-colors">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">60 Dakika Kesintisiz Birebir Görüşme</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Google Meet / Zoom üzerinden sesli veya görüntülü doğrudan birebir analiz.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-matte-850/80 border border-zinc-800 hover:border-gold-500/30 transition-colors">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Kriz Çözümü & Güç Dinamikleri Analizi</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">İlişkinde sınırlarını nasıl koruyacağını ve kaybettiğin saygıyı nasıl geri alacağını netleştiriyoruz.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-matte-850/80 border border-zinc-800 hover:border-gold-500/30 transition-colors">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Kişiye Özel Aksiyon ve Mesajlaşma Stratejisi</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Hangi durumda ne söyleyeceğini, ne zaman geri çekileceğini ve nasıl tavizsiz duracağını öğren.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-matte-850/80 border border-zinc-800 hover:border-gold-500/30 transition-colors">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">%100 Gizlilik & Tavizsiz Güvence</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Konuşulan her konu ve paylaşılan tüm detaylar mutlak gizlilik prensibiyle korunur.</p>
                </div>
              </div>
            </div>

            {/* İki Adet Buton */}
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Ana Buton: Altın Sarısı, Vurucu */}
              <a
                href="http://www.sopsy.com/d/F0AuRX"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-300"
              >
                <span>HEMEN SEANS AL</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* İkincil Buton: Instagram İletişim / Sade & Şık */}
              <a
                href="https://www.instagram.com/maskulenitesitesi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-zinc-200 hover:text-white bg-matte-850 hover:bg-zinc-800/90 border border-zinc-700 hover:border-pink-500/40 rounded-xl transition-all duration-200 group"
              >
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <span>Instagram ile İletişim / Sorunuz mu var?</span>
              </a>
            </div>

            {/* Mikro Güven İpuçları */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Haftalık Sınırlı 5 Seans Kontenjanı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Size Uygun Güne Randevu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Güvenli Ödeme</span>
              </div>
            </div>

          </div>

          {/* Sağ Kolon: Otoriter Profil Görseli Kartı */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Arka Ambiyans */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Çerçeveli Görsel Kartı */}
            <div className="relative group w-full max-w-md mx-auto">
              <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/40 group-hover:border-gold-400 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 bg-matte-950">
                <Image
                  src="/insta_profile_800k.jpg"
                  alt="Maskülenite Sitesi Özel Danışmanlık ve Koçluk"
                  width={600}
                  height={800}
                  priority
                  className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Alt Kısım Şık Rozet & Otorite İmzası */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-extrabold text-sm sm:text-base tracking-tight">
                        Gürkan Özbinici
                      </div>
                      <div className="text-gold-400 text-xs font-mono font-semibold">
                        @maskulenitesitesi • 800K+ Topluluk
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-[10px] font-bold uppercase tracking-wider">
                      Resmi Mentörlük
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

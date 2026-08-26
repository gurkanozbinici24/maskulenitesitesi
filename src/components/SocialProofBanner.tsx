import { Users, Award, ShieldCheck, Flame, ShieldAlert, Sparkles } from "lucide-react";

export default function SocialProofBanner() {
  return (
    <section id="sosyal-kanit" className="py-16 relative overflow-hidden bg-matte-950 border-y border-zinc-800/80">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-matte-850 via-matte-900 to-matte-850 border border-gold-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          
          {/* Subtle Corner Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content: Key Headline Proof */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>BÜYÜK TOPLULUK & ETKİ ALANI</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <span className="gold-text-gradient">800.000&apos;den fazla</span> takipçinin güvendiği vizyon.
              </h3>
              
              <p className="mt-3 text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                Maskulenitesitesi hesabımızda milyonlarca kez izlenen o acımasız gerçekler. Milyonlarca erkeğin hayatını kökten değiştiren tavizsiz stratejiler, şimdi tek bir başucu kaynağında toplandı.
              </p>
            </div>

            {/* Right Content: Stats Grid */}
            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 flex-shrink-0">
              
              {/* Stat 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-matte-950/80 border border-zinc-800 text-center flex flex-col items-center justify-center shadow-inner">
                <div className="text-2xl sm:text-3xl font-black text-gold-400 font-mono">
                  800K+
                </div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  AKTİF TAKİPÇİ
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-matte-950/80 border border-zinc-800 text-center flex flex-col items-center justify-center shadow-inner">
                <div className="text-2xl sm:text-3xl font-black text-zinc-100 font-mono">
                  %99.4
                </div>
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  MEMNUNİYET & SONUÇ
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-matte-950/80 border border-gold-500/40 text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1 shadow-gold-glow">
                <div className="text-xl sm:text-2xl font-black text-gold-400 font-mono whitespace-nowrap">
                  SADECE 200
                </div>
                <div className="text-[11px] font-bold text-gold-300 uppercase tracking-wider mt-1">
                  ÖZEL İMZALI KOPYA
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Trust Signatures */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-center lg:justify-between gap-4 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-gold-400" />
              <span>237 Sayfa Tavizsiz İlişki Psikolojisi</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Manipülasyona Karşı Mutlak Kalkan</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>İlişki Psikolojisinde Çerçeve Kontrolü</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

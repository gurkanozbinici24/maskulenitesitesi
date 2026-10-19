import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown, Gift } from "lucide-react";

/**
 * Ana sayfanın sonunda (SSS'den sonra) sakin bir mentörlük şeridi.
 * Kitaplarla yarışmaması için bilinçli olarak küçük ve sade tutuldu.
 */
export default function MentorshipTeaser() {
  return (
    <section aria-label="Birebir danışmanlık" className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/danismanlik"
          className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-gold-500/25 bg-[linear-gradient(90deg,rgba(20,15,8,0.9),rgba(8,6,8,0.95))] p-5 text-center transition-colors hover:border-gold-400/60 sm:flex-row sm:p-6 sm:text-left"
        >
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/50">
            <Image src="/insta_profile_800k.jpg" alt="Gürkan Özbinici" fill sizes="56px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400 sm:justify-start">
              <Crown className="h-3.5 w-3.5" /> Kitabın ötesine geçmek isteyenlere
            </div>
            <p className="mt-1 text-sm font-semibold text-white sm:text-base">Birebir strateji seansı ve VIP Mentörlük</p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-zinc-400 sm:justify-start">
              <Gift className="h-3.5 w-3.5 text-gold-400" />
              İlk seansına özel 2 e-kitap ve 1 hafta WhatsApp desteği hediye
            </p>
          </div>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-gold-500/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-300 transition-colors group-hover:bg-gold-500/10">
            Danışmanlığı incele <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DegerlendirmeFormu from "@/components/yorum/DegerlendirmeFormu";
import { KITAP_ADLARI, biletAc } from "@/lib/yorum/token";
import { dahaOnceYorumYapildiMi } from "@/lib/yorum/depo";
import { veritabaniVarMi } from "@/lib/yorum/redis";

export const metadata: Metadata = {
  title: "Kitabı Değerlendir",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Kabuk({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <Navbar />
      <section className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="relative mx-auto max-w-xl px-4 sm:px-6">{children}</div>
      </section>
      <Footer />
    </main>
  );
}

export default async function DegerlendirSayfasi({ searchParams }: { searchParams: { t?: string } }) {
  const bilet = biletAc(searchParams.t);

  if (!bilet) {
    return (
      <Kabuk>
        <h1 className="font-cinzel text-3xl font-bold text-white">Link geçersiz</h1>
        <p className="mt-4 text-zinc-300">
          Bu değerlendirme linki geçersiz ya da eksik kopyalanmış. Değerlendirme yalnızca kitabı satın alanlara gönderilen
          kişisel linkle yapılabilir. Bir sorun olduğunu düşünüyorsan WhatsApp&apos;tan yazabilirsin.
        </p>
        <Link href="/" className="mt-6 inline-block text-gold-400 underline underline-offset-4">
          Ana sayfaya dön
        </Link>
      </Kabuk>
    );
  }

  const kitap = KITAP_ADLARI[bilet.k];
  let yapildi = false;
  if (veritabaniVarMi()) {
    try {
      yapildi = await dahaOnceYorumYapildiMi(bilet);
    } catch {
      /* form yine gösterilir; API tekrar kontrol eder */
    }
  }

  return (
    <Kabuk>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
        <BadgeCheck className="h-3.5 w-3.5" /> Doğrulanmış alıcı
      </div>
      <h1 className="font-cinzel text-[clamp(1.6rem,4vw,2.2rem)] font-bold leading-tight text-white">{kitap}&apos;nı değerlendir</h1>
      <p className="mt-3 text-zinc-300">
        Merhaba{bilet.ad ? ` ${bilet.ad.split(" ")[0]}` : ""}, kitabı okuduğun için teşekkürler. Dürüst görüşün diğer okurların karar vermesine yardım ediyor;
        beğendiğin kadar beğenmediğin yanları da yazabilirsin.
      </p>

      <div className="mt-8">
        {yapildi ? (
          <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-6 text-center text-zinc-200">
            Bu sipariş için {kitap}&apos;nı zaten değerlendirdin. Teşekkürler!
          </div>
        ) : (
          <DegerlendirmeFormu
            bilet={searchParams.t!}
            kitap={kitap}
            sabitAd={bilet.ad ? { ad: bilet.ad, soyad: bilet.soyad } : null}
          />
        )}
      </div>
    </Kabuk>
  );
}

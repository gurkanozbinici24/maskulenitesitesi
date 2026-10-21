import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OdemeForm from "@/components/odeme/OdemeForm";
import FlashTeslim from "@/components/ui/FlashTeslim";
import { KART_ODEME_AKTIF, WHATSAPP_PHONE } from "@/config/cekicilikConfig";
import { eklemeBul, satistaMi, urunBul } from "@/lib/odeme/urunler";
import { Lock, Package, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Güvenli Ödeme",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function Kabuk({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <Navbar />
      <section className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-full max-w-3xl -translate-x-1/2 bg-mahogany-600/10 blur-[120px]" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6">{children}</div>
      </section>
      <Footer />
    </main>
  );
}

export default function OdemeSayfasi({ searchParams }: { searchParams: { urun?: string } }) {
  const urun = urunBul(searchParams.urun);

  if (!KART_ODEME_AKTIF || !urun || !satistaMi(urun)) {
    return (
      <Kabuk>
        <h1 className="font-cinzel text-3xl font-bold text-white">Ödeme sayfası</h1>
        <p className="mt-4 text-zinc-300">
          {!urun
            ? "Seçtiğin ürün bulunamadı."
            : !satistaMi(urun)
              ? "Bu ürün henüz satışta değil."
              : "Kartla ödeme şu an aktif değil."}{" "}
          WhatsApp&apos;tan da kolayca sipariş verebilirsin.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            className="rounded-xl bg-gold-400 px-5 py-3 font-bold text-black hover:brightness-110"
          >
            WhatsApp&apos;tan yaz
          </a>
          <Link href="/" className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-200 hover:border-gold-500/60">
            Ana sayfaya dön
          </Link>
        </div>
      </Kabuk>
    );
  }

  const Ikon = urun.tip === "physical" ? Package : BookOpen;
  const e = eklemeBul(urun);
  const ekleme = e
    ? {
        kitap: e.kitap,
        ekFiyat: e.ekFiyat,
        hedefFiyat: e.hedefUrun.fiyat,
        asilSira: e.asilSira,
        ...(urun.tip === "physical" ? { normalFiyat: urun.fiyat } : {}),
      }
    : null;

  return (
    <Kabuk>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
        <Lock className="h-3.5 w-3.5" /> iyzico güvencesiyle ödeme
      </div>
      <h1 className="font-cinzel text-[clamp(1.7rem,4.2vw,2.4rem)] font-bold leading-tight text-white">
        Siparişini <span className="gold-text-gradient">Tamamla</span>
      </h1>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-gold-500/30 bg-gradient-to-b from-white/[0.05] to-transparent p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-2.5 text-gold-400">
            <Ikon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white sm:text-base">{urun.ad}</div>
            <div className="text-xs text-zinc-400">
              {urun.tip === "physical"
                ? "İsme özel imzalı · Kapıya kadar ücretsiz kargo"
                : "PDF · Ödemeden hemen sonra e-postana"}
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap font-mono text-2xl font-black text-white">
          {urun.fiyat}
          <span className="ml-1 text-sm text-gold-400">TL</span>
        </div>
      </div>

      <FlashTeslim tip={urun.tip === "physical" ? "kargo" : "ekitap"} className="mt-3" />

      <div className="mt-8">
        <OdemeForm urun={urun} ekleme={ekleme} />
      </div>
    </Kabuk>
  );
}

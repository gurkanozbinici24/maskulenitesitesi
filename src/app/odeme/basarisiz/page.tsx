import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { XCircle } from "lucide-react";
import { WHATSAPP_PHONE } from "@/config/cekicilikConfig";

export const metadata: Metadata = { title: "Ödeme Tamamlanamadı", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function Basarisiz({ searchParams }: { searchParams: { no?: string } }) {
  const no = (searchParams.no || "").slice(0, 30);
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100">
      <Navbar />
      <section className="flex-1 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <XCircle className="mx-auto h-16 w-16 text-crimson-400" />
          <h1 className="mt-5 font-cinzel text-[clamp(1.7rem,4.2vw,2.4rem)] font-bold text-white">
            Ödeme tamamlanamadı
          </h1>
          <p className="mt-3 text-zinc-300">
            Kartından para çekilmedi. Kart bilgilerini, limitini veya 3D Secure onayını kontrol edip tekrar
            deneyebilirsin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#fiyat-kartlari" className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-black hover:brightness-110">
              Tekrar dene
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                `Merhaba, kartla ödeme yaparken sorun yaşadım${no ? ` (${no})` : ""}. WhatsApp'tan sipariş vermek istiyorum.`,
              )}`}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-200 hover:border-gold-500/60"
            >
              WhatsApp&apos;tan sipariş ver
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

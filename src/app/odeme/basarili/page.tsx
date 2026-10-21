import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Mail, Truck, PenLine } from "lucide-react";
import { WHATSAPP_PHONE } from "@/config/cekicilikConfig";

export const metadata: Metadata = { title: "Siparişin Alındı", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function Basarili({ searchParams }: { searchParams: { no?: string; tip?: string; ad?: string; ek?: string } }) {
  const fiziksel = searchParams.tip === "physical";
  const ad = (searchParams.ad || "").slice(0, 40);
  const no = (searchParams.no || "").slice(0, 30);
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100">
      <Navbar />
      <section className="flex-1 pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
          <h1 className="mt-5 font-cinzel text-[clamp(1.7rem,4.2vw,2.4rem)] font-bold text-white">
            Teşekkürler{ad ? `, ${ad}` : ""}!
          </h1>
          <p className="mt-3 text-zinc-300">Ödemen başarıyla alındı, siparişin bana ulaştı.</p>
          {no && (
            <p className="mt-2 text-sm text-zinc-500">
              Sipariş no: <span className="font-mono text-gold-300">{no}</span>
            </p>
          )}

          <div className="mt-8 space-y-3 rounded-2xl border border-gold-500/30 bg-white/[0.03] p-5 text-left text-sm text-zinc-300">
            {fiziksel ? (
              <>
                <p className="flex gap-3">
                  <PenLine className="h-5 w-5 flex-shrink-0 text-gold-400" />
                  Kitabını verdiğin isme özel imzalayıp gizli, korumalı paketle hazırlıyorum.
                </p>
                <p className="flex gap-3">
                  <Truck className="h-5 w-5 flex-shrink-0 text-gold-400" />
                  14:00&apos;e kadar verilen siparişler aynı gün Yurtiçi Kargo&apos;ya verilir. Kargo takip
                  bilgisini WhatsApp&apos;tan ileteceğim.
                </p>
              </>
            ) : (
              <p className="flex gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-gold-400" />
                {searchParams.ek === "gonderildi"
                  ? "E-kitabın (PDF) şu an e-posta adresine gönderildi. Birkaç dakika içinde gelen kutunda göremezsen spam/gereksiz klasörüne de bak."
                  : "E-kitabın kısa süre içinde siparişte yazdığın e-posta adresine gönderilecek. Gelen kutunda göremezsen spam/gereksiz klasörüne de bak."}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Merhaba, ${no} numaralı siparişim hakkında yazıyorum.`)}`}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-200 hover:border-gold-500/60"
            >
              Soru sor (WhatsApp)
            </a>
            <Link href="/blog" className="rounded-xl bg-gold-400 px-5 py-3 text-sm font-bold text-black hover:brightness-110">
              Bu arada blogu oku
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POSTS } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog – Maskülenlik, İlişkiler ve Kitaplar Üzerine Yazılar",
  description:
    "Gürkan Özbinici'nin blogu: Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı kitapları, maskülenlik, ilişkiler ve ilişki psikolojisi üzerine yazılar.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: "Blog | Maskülenite", images: ["/og-paylasim.jpg"] },
};

const fmt = (d: string) =>
  new Date(d + "T12:00:00+03:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <Navbar />
      <div className="relative flex-1 pb-24 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[70%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">Maskülenite Blog</div>
            <h1 className="font-cinzel text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight text-white">
              Yazılar <span className="gold-text-gradient">&amp; Kanunlar</span>
            </h1>
            <p className="mt-4 text-sm text-zinc-400 sm:text-base">
              Maskülenlik, ilişkiler ve kitaplarım üzerine; okuyup hemen uygulayabileceğin yazılar.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-950 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gold-400/80">
                    {fmt(p.date)} · {p.readMin} dk okuma
                  </div>
                  <h2 className="font-playfair text-xl font-bold leading-snug text-white group-hover:text-gold-200">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.excerpt}</p>
                  <span className="mt-5 text-sm font-bold text-gold-400 group-hover:text-gold-300">Yazıyı oku →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

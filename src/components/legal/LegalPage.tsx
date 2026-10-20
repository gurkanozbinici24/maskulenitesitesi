import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogBody from "@/components/blog/BlogBody";
import { LEGAL, type LegalDoc } from "@/content/legal";

const fmt = (d: string) =>
  new Date(d + "T12:00:00+03:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <Navbar />
      <article className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Konum" className="mb-8 text-xs text-zinc-500">
            <Link href="/" className="hover:text-gold-300">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <span>{doc.title}</span>
          </nav>
          <h1 className="font-cinzel text-[clamp(1.7rem,4.2vw,2.6rem)] font-bold leading-[1.15] text-white">
            {doc.title.toLocaleUpperCase("tr-TR")}
          </h1>
          <p className="mt-3 text-xs text-zinc-500">Son güncelleme: {fmt(doc.updated)}</p>
          <div className="mt-10">
            <BlogBody body={doc.body} />
          </div>
          <div className="mt-14 border-t border-white/10 pt-6 text-sm text-zinc-400">
            Diğer koşullar:{" "}
            {LEGAL.filter((d) => d.slug !== doc.slug).map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className="text-gold-300 hover:text-gold-200">
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

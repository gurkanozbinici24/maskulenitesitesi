import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogBody from "@/components/blog/BlogBody";
import { BOOK_CTA, POSTS, getPost } from "@/content/blog";

const SITE = "https://www.maskulenitesitesi.com.tr";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/blog/${p.slug}` },
    authors: [{ name: "Gürkan Özbinici", url: SITE }],
    openGraph: {
      type: "article",
      url: `/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: ["Gürkan Özbinici"],
      images: [p.cover],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [p.cover] },
  };
}

const fmt = (d: string) =>
  new Date(d + "T12:00:00+03:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const cta = BOOK_CTA[p.book];
  const relatedFixed = (p.related ?? []).map((r) => getPost(r)).filter(Boolean) as typeof POSTS;
  const related = [
    ...relatedFixed,
    ...POSTS.filter((x) => x.slug !== p.slug && x.book === p.book && !relatedFixed.includes(x)),
    ...POSTS.filter((x) => x.slug !== p.slug),
  ]
    .filter((x, i, a) => x.slug !== p.slug && a.indexOf(x) === i)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        image: `${SITE}${p.cover}`,
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        inLanguage: "tr-TR",
        mainEntityOfPage: `${SITE}/blog/${p.slug}`,
        author: { "@id": `${SITE}/#gurkan-ozbinici`, "@type": "Person", name: "Gürkan Özbinici", url: SITE },
        publisher: { "@id": `${SITE}/#gurkan-ozbinici` },
        keywords: p.keywords.join(", "),
      },
      ...(p.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: p.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: p.title, item: `${SITE}/blog/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col bg-matte-950 text-zinc-100 selection:bg-gold-500 selection:text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <article className="relative flex-1 pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[70%] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Konum" className="mb-8 text-xs text-zinc-500">
            <Link href="/" className="hover:text-gold-300">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-gold-300">Blog</Link>
          </nav>

          <header>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gold-400/80">
              {fmt(p.date)} · {p.readMin} dk okuma
            </div>
            <h1 className="font-cinzel text-[clamp(1.8rem,4.6vw,2.9rem)] font-bold leading-[1.15] text-white">{p.title.toLocaleUpperCase("tr-TR")}</h1>
            <div className="mt-6 flex items-center gap-3">
              <Image src="/insta_profile_800k.jpg" alt="Gürkan Özbinici" width={44} height={44} className="rounded-full border border-gold-500/50" />
              <div>
                <div className="text-sm font-bold text-white">Gürkan Özbinici</div>
                <div className="text-xs text-zinc-400">Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı&apos;nın yazarı</div>
              </div>
            </div>
          </header>

          <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black">
            <Image src={p.cover} alt={p.title} fill priority sizes="(min-width:768px) 768px, 100vw" className="object-cover" />
          </div>

          <BlogBody body={p.body} />

          {p.faq?.length ? (
            <section className="mt-14">
              <h2 className="mb-5 font-cinzel text-[clamp(1.35rem,3vw,1.8rem)] font-bold text-white">
                {"Sık Sorulan Sorular".toLocaleUpperCase("tr-TR")}
              </h2>
              <div className="space-y-3">
                {p.faq.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:border-gold-500/40">
                    <summary className="cursor-pointer list-none font-semibold text-white marker:hidden">
                      <span className="mr-2 text-gold-400 transition-transform group-open:rotate-45 inline-block">+</span>
                      {f.q}
                    </summary>
                    <p className="mt-3 leading-relaxed text-zinc-300">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {/* Kitap çağrısı */}
          <aside className="relative mt-16 overflow-hidden rounded-3xl border border-gold-500/40 bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(10,8,6,0.9)_55%)] p-7 sm:p-9">
            <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Kitapta devamı var</div>
            <div className="mt-2 font-cinzel text-2xl font-bold text-white">{cta.title.toLocaleUpperCase("tr-TR")}</div>
            <p className="mt-2 text-sm text-zinc-300 sm:text-base">{cta.text}</p>
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 px-6 py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-gold-glow transition-transform hover:-translate-y-0.5"
            >
              {cta.label} →
            </Link>
          </aside>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-400">Diğer yazılar</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold-500/50"
                  >
                    <div className="font-playfair text-lg font-bold leading-snug text-white">{r.title}</div>
                    <div className="mt-2 text-xs text-zinc-500">{r.readMin} dk okuma</div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}

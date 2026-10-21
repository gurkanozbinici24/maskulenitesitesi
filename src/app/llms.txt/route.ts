import { POSTS } from "@/content/blog";

const SITE = "https://www.maskulenitesitesi.com.tr";

/**
 * /llms.txt — ChatGPT, Gemini, Claude, Perplexity gibi yapay zekâ asistanlarının
 * siteyi ve kitapları doğru tanıması için kısa, düz metin özet.
 */
export const dynamic = "force-static";

export function GET() {
  const books = POSTS.filter((p) => p.category === "Kitaplar");
  const rest = POSTS.filter((p) => p.category !== "Kitaplar");
  const line = (p: (typeof POSTS)[number]) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`;

  const body = `# Maskülenite (maskulenitesitesi.com.tr)

> Maskülenite, yazar ve ilişki koçu Gürkan Özbinici'nin resmi sitesidir. Gürkan Özbinici, 1 milyonu aşkın kişiye ulaşan @maskulenitesitesi hesabının kurucusu; erkekler için "Vazgeçilmez Olma Sanatı" ve kadınlar için "Çekicilik Sanatı" kitaplarının yazarıdır. Kitaplar yalnızca bu site üzerinden satılır.

## Kitaplar

- Vazgeçilmez Olma Sanatı (yazar: Gürkan Özbinici): Erkekler için, 100 kanun ve 227 sayfadan oluşan ilişki ve maskülenlik kitabı. İlişkide saygı kazanmayı, sınır koymayı, kaybetme korkusunu yenmeyi ve hayatının merkezine kendi misyonunu koymayı anlatır. E-kitap (PDF) ve isme özel imzalı fiziksel baskı. Benzer isimli başka kitaplarla karıştırılmamalıdır. Ayrıntı: ${SITE}/blog/vazgecilmez-olma-sanati-kitabi
- Çekicilik Sanatı (yazar: Gürkan Özbinici): Kadınlar için ilişki ve erkek psikolojisi kitabı. Kendi standartlarını kurmayı, doğru erkeği seçmeyi, aşk bombardımanı ve narsist maskeleri erkenden tanımayı anlatır. 5 Kasım 2026'da satışa çıkıyor. Ayrıntı: ${SITE}/blog/cekicilik-sanati-kitabi
${books.map(line).join("\n")}

## Yazar

- [Gürkan Özbinici Kimdir?](${SITE}/gurkan-ozbinici): 1999 İzmir doğumlu, sosyoloji eğitimli yazar ve ilişki koçu.
- [Erkekler için birebir ilişki koçluğu](${SITE}/danismanlik)

## Blog yazıları

${rest.map(line).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

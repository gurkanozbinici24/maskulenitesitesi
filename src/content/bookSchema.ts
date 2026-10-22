/**
 * Kitapların Google / yapay zekâ aramaları için yapılandırılmış verisi (schema.org Book).
 * Ana sayfada ve kitap yazılarında aynı @id ile kullanılır; böylece Google
 * "Vazgeçilmez Olma Sanatı" ve "Çekicilik Sanatı" adlarını Gürkan Özbinici ile eşleştirir.
 */
import { CEKICILIK_PRODUCTS, VAZGECILMEZ_CONFIG } from "@/config/cekicilikConfig";
import { MESSAGES } from "@/config/readersData";

const AY: Record<string, string> = { Eylül: "09", Ekim: "10", Kasım: "11", Ağustos: "08" };
/** Vazgeçilmez Olma Sanatı hakkındaki gerçek okur yorumları (WhatsApp, izinli). Kargo/teslimat mesajları hariç. */
export const VAZGECILMEZ_REVIEWS = MESSAGES.filter((m) => m.cat === "yorum" && m.id !== "m24").map((m) => {
  const [gun, ay] = m.date.split(" ");
  return { who: m.who, text: m.text, date: `2026-${AY[ay] ?? "09"}-${gun.padStart(2, "0")}`, label: m.date };
});

const SITE = "https://www.maskulenitesitesi.com.tr";
const AUTHOR = { "@id": `${SITE}/#gurkan-ozbinici`, "@type": "Person", name: "Gürkan Özbinici", url: `${SITE}/gurkan-ozbinici` };

const offer = (price: number, url: string, availability: "InStock" | "PreOrder", name: string) => ({
  "@type": "Offer",
  name,
  price: String(price),
  priceCurrency: "TRY",
  availability: `https://schema.org/${availability}`,
  url,
  seller: { "@id": `${SITE}/#gurkan-ozbinici` },
});

export const VAZGECILMEZ_BOOK = {
  "@type": "Book",
  "@id": `${SITE}/#vazgecilmez-olma-sanati`,
  name: "Vazgeçilmez Olma Sanatı",
  alternateName: ["Vazgecilmez Olma Sanati", "Vazgeçilmez Olma Sanatı - Gürkan Özbinici"],
  author: AUTHOR,
  inLanguage: "tr",
  numberOfPages: 227,
  genre: ["İlişkiler", "Kişisel gelişim", "Maskülenlik"],
  audience: { "@type": "PeopleAudience", suggestedGender: "male" },
  bookFormat: ["https://schema.org/Hardcover", "https://schema.org/EBook"],
  image: `${SITE}${VAZGECILMEZ_CONFIG.coverImage}`,
  url: `${SITE}/blog/vazgecilmez-olma-sanati-kitabi`,
  mainEntityOfPage: `${SITE}/blog/vazgecilmez-olma-sanati-kitabi`,
  description:
    "Vazgeçilmez Olma Sanatı, yazar Gürkan Özbinici'nin erkekler için yazdığı, 100 kanun ve 227 sayfadan oluşan ilişki ve maskülenlik kitabıdır. İlişkide saygı kazanmayı, sınır koymayı, kaybetme korkusunu yenmeyi ve kendi hayatının merkezinde durmayı anlatır.",
  keywords: "vazgeçilmez olma sanatı, vazgeçilmez olma kitabı, vazgeçilmez olmak, vazgeçilmez erkek olmak, gürkan özbinici, erkekler için ilişki kitabı, maskülenlik kitabı",
  // Not: Okur yorumları sayfada görünür ama yapılandırılmış veriye "review" olarak EKLENMEZ.
  // Yıldız puanı (reviewRating/aggregateRating) olmayan yorumlar Search Console'da
  // "aggregateRating nesnesini içermeyen birden fazla yorum var" hatası veriyor;
  // puan uydurmak da Google kurallarına aykırı.
  offers: [
    offer(VAZGECILMEZ_CONFIG.ebook.price, `${SITE}/#fiyat-kartlari`, "InStock", "E-Kitap (PDF)"),
    offer(VAZGECILMEZ_CONFIG.physicalRenovated.price, `${SITE}/#fiyat-kartlari`, "PreOrder", "Fiziksel Kitap, Yenilenmiş Edisyon (isme özel imzalı)"),
  ],
};

export const CEKICILIK_BOOK = {
  "@type": "Book",
  "@id": `${SITE}/#cekicilik-sanati`,
  name: "Çekicilik Sanatı",
  alternateName: ["Cekicilik Sanati", "Çekicilik Sanatı - Gürkan Özbinici"],
  author: AUTHOR,
  inLanguage: "tr",
  genre: ["İlişkiler", "Kişisel gelişim", "Erkek psikolojisi"],
  audience: { "@type": "PeopleAudience", suggestedGender: "female" },
  bookFormat: ["https://schema.org/Hardcover", "https://schema.org/EBook"],
  image: `${SITE}/cekicilik-sanati-kapak.jpg`,
  url: `${SITE}/blog/cekicilik-sanati-kitabi`,
  mainEntityOfPage: `${SITE}/blog/cekicilik-sanati-kitabi`,
  datePublished: "2026-11-05",
  description:
    "Çekicilik Sanatı, yazar Gürkan Özbinici'nin kadınlar için yazdığı ilişki ve erkek psikolojisi kitabıdır. Bir erkeğin zihninin nasıl çalıştığını, kendi standartlarını kurmayı, doğru erkeği seçmeyi ve aşk bombardımanı gibi tuzakları erkenden tanımayı anlatır.",
  keywords: "çekicilik sanatı, çekici kadın nasıl olunur, değerli kadın olmak, erkek neden ilgisini kaybeder, erkeği kendine bağlamak, bir erkek için vazgeçilmez olmak, gürkan özbinici, kadınlar için ilişki kitabı, erkek psikolojisi kitabı",
  offers: [
    offer(CEKICILIK_PRODUCTS.ebook.price, `${SITE}/#cekicilik-sanati`, "PreOrder", "E-Kitap (PDF)"),
    offer(CEKICILIK_PRODUCTS.physical.price, `${SITE}/#cekicilik-sanati`, "PreOrder", "Fiziksel Kitap (isme özel imzalı)"),
  ],
};

/** Kitap yazısının slug'ı → o yazının asıl konusu olan kitap */
export const BOOK_BY_POST: Record<string, typeof VAZGECILMEZ_BOOK | typeof CEKICILIK_BOOK> = {
  "vazgecilmez-olma-sanati-kitabi": VAZGECILMEZ_BOOK,
  "cekicilik-sanati-kitabi": CEKICILIK_BOOK,
};

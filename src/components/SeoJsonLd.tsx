import { INSTAGRAM_URL } from "@/config/cekicilikConfig";

const SITE = "https://www.maskulenitesitesi.com.tr";

/**
 * Google'a sitenin kim/ne olduğunu anlatan yapılandırılmış veri (schema.org JSON-LD).
 * Ekranda görünmez; arama sonuçlarında marka adı, yazar ve kitapların doğru eşleşmesine yardım eder.
 */
export default function SeoJsonLd() {
  const author = { "@id": `${SITE}/#gurkan-ozbinici` };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Maskülenite",
        alternateName: ["Maskulenite", "Maskülenite Sitesi", "maskulenitesitesi", "Gürkan Özbinici"],
        inLanguage: "tr-TR",
        publisher: author,
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#gurkan-ozbinici`,
        name: "Gürkan Özbinici",
        alternateName: "Gurkan Ozbinici",
        url: SITE,
        image: `${SITE}/insta_profile_800k.jpg`,
        jobTitle: ["Yazar", "İlişki Koçu", "İlişki Danışmanı"],
        knowsAbout: ["Maskülenlik", "İlişkiler", "İlişki psikolojisi", "İlişki koçluğu", "Çekim dinamikleri"],
        description:
          "Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı kitaplarının yazarı; @maskulenitesitesi hesabının kurucusu.",
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "Service",
        "@id": `${SITE}/danismanlik#hizmet`,
        name: "İlişki Koçluğu ve İlişki Danışmanlığı",
        serviceType: "İlişki koçluğu",
        provider: author,
        areaServed: { "@type": "Country", name: "Türkiye" },
        availableChannel: { "@type": "ServiceChannel", serviceUrl: `${SITE}/danismanlik` },
        url: `${SITE}/danismanlik`,
        offers: { "@type": "Offer", price: "3500", priceCurrency: "TRY", url: `${SITE}/danismanlik` },
      },
      {
        "@type": "Book",
        "@id": `${SITE}/#vazgecilmez-olma-sanati`,
        name: "Vazgeçilmez Olma Sanatı",
        alternateName: "Vazgecilmez Olma Sanati",
        author,
        inLanguage: "tr",
        numberOfPages: 227,
        bookFormat: ["https://schema.org/Hardcover", "https://schema.org/EBook"],
        image: `${SITE}/vazgecilmez-yeni-kapak.jpg`,
        url: `${SITE}/#vazgecilmez`,
        description: "Erkekler için ilişki psikolojisi ve çekim dinamikleri üzerine kitap.",
      },
      {
        "@type": "Book",
        "@id": `${SITE}/#cekicilik-sanati`,
        name: "Çekicilik Sanatı",
        alternateName: ["Cekicilik Sanati"],
        author,
        inLanguage: "tr",
        bookFormat: ["https://schema.org/Hardcover", "https://schema.org/EBook"],
        image: `${SITE}/cekicilik-sanati-kapak.jpg`,
        url: `${SITE}/#cekicilik-sanati`,
        description: "Kadınlar için ilişki psikolojisi ve çekim dinamikleri üzerine kitap.",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

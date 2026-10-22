import { SITE, URUN_SAYFALARI, stokDurumu, urunLinki, urunVerisi } from "@/lib/merchant/urunSayfalari";

/**
 * Google Merchant Center ürün listesi (feed).
 * Merchant Center'da "Ürünler > Ürün ekle > Dosya > Planlanmış getirme" ile bu adres verilir:
 *   https://www.maskulenitesitesi.com.tr/google-urunler.xml
 * Fiyat ve stok durumu sitedeki ayarlardan otomatik gelir.
 * Not: E-kitaplar Google Alışveriş'te kabul edilmediği için listede yalnızca fiziksel kitaplar var.
 */
export const revalidate = 600;

const kacis = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = URUN_SAYFALARI.map((s) => {
    const u = urunVerisi(s);
    const stok = stokDurumu(s);
    return `    <item>
      <g:id>${kacis(u.id)}</g:id>
      <title>${kacis(s.baslik)}</title>
      <description>${kacis(s.aciklama)}</description>
      <link>${kacis(urunLinki(s))}</link>
      <g:image_link>${kacis(`${SITE}${s.gorsel}`)}</g:image_link>
      <g:availability>${stok.feed}</g:availability>${
        stok.satista || !stok.satisTarihi ? "" : `\n      <g:availability_date>${kacis(stok.satisTarihi)}</g:availability_date>`
      }
      <g:price>${u.fiyat}.00 TRY</g:price>
      <g:condition>new</g:condition>
      <g:brand>Maskülenite</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>784</g:google_product_category>
      <g:product_type>Kitaplar &gt; İlişkiler ve Kişisel Gelişim</g:product_type>
      <g:shipping>
        <g:country>TR</g:country>
        <g:price>0.00 TRY</g:price>
        <g:min_handling_time>0</g:min_handling_time>
        <g:max_handling_time>1</g:max_handling_time>
        <g:min_transit_time>1</g:min_transit_time>
        <g:max_transit_time>3</g:max_transit_time>
      </g:shipping>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Maskülenite – Gürkan Özbinici Kitapları</title>
    <link>${SITE}</link>
    <description>Gürkan Özbinici'nin isme özel imzalı kitapları</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

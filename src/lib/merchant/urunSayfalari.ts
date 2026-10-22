/**
 * Google Merchant Center (ücretsiz ürün listelemeleri) için fiziksel ürünler.
 *
 * Google, e-kitapları (dijital kitapları) Alışveriş'te kabul etmez; bu yüzden burada
 * yalnızca kargoyla gönderilen fiziksel ürünler var. Her ürünün kendi sayfası
 * (/urun/<slug>) ve Google ürün listesindeki (/google-urunler.xml) kaydı buradan üretilir.
 * Fiyat ve satış tarihi tek kaynaktan (urunler.ts) gelir; elle güncellemeye gerek yok.
 */
import { ODEME_URUNLERI, satistaMi, type OdemeUrunu, type UrunId } from "@/lib/odeme/urunler";

export const SITE = "https://www.maskulenitesitesi.com.tr";

export interface UrunSayfasi {
  slug: string;
  urunId: UrunId;
  /** Google'da ve sayfada görünen ürün adı */
  baslik: string;
  altBaslik: string;
  /** Google ürün açıklaması (düz metin, 500-1500 karakter ideal) */
  aciklama: string;
  /** Sayfadaki kısa tanıtım paragrafları */
  paragraflar: string[];
  gorsel: string;
  ozellikler: { etiket: string; deger: string }[];
  /** Kitabı detaylı anlatan blog yazısı */
  blogLinki: string;
  kimIcin: string;
}

export const URUN_SAYFALARI: UrunSayfasi[] = [
  {
    slug: "vazgecilmez-olma-sanati-fiziksel-kitap",
    urunId: "vazgecilmez-fiziksel-yenilenmis",
    baslik: "Vazgeçilmez Olma Sanatı – Gürkan Özbinici (İsme Özel İmzalı Kitap)",
    altBaslik: "Yenilenmiş Edisyon · Fiziksel Kitap · 227 sayfa",
    aciklama:
      "Vazgeçilmez Olma Sanatı, yazar ve ilişki koçu Gürkan Özbinici'nin erkekler için yazdığı, 100 kanun ve 227 sayfadan oluşan ilişki ve maskülenlik kitabıdır. Kitap; ilişkide saygı kazanmayı, sınır koymayı, kaybetme korkusunu yenmeyi, iyi çocuk masalından çıkmayı ve hayatının merkezine kendi misyonunu koymayı anlatır. Yenilenmiş Edisyon yeni kapak ve büyük punto ile basılmıştır. Her kitap alıcının adına özel olarak yazar tarafından imzalanır. Türkiye'nin her yerine ücretsiz kargo.",
    paragraflar: [
      "Vazgeçilmez Olma Sanatı, ilişkide sürekli taviz veren, saygı görmediğini hisseden ya da ilişkiye sağlam bir temelle başlamak isteyen erkekler için yazıldı.",
      "Kitap 100 kanunla iyi çocuk masalından çıkmayı, kaybetme korkusunu yenmeyi, hayır diyebilmeyi, sınır koymayı ve hayatının merkezine kendi misyonunu koymayı anlatıyor.",
      "Yenilenmiş Edisyon, ilk baskıyla birebir aynı içeriğe sahip; yeni kapak ve daha okunaklı büyük punto ile basıldı. Her kitap senin adına özel olarak imzalanır.",
    ],
    gorsel: "/vazgecilmez-yeni-kapak.jpg",
    ozellikler: [
      { etiket: "Yazar", deger: "Gürkan Özbinici" },
      { etiket: "Baskı", deger: "Yenilenmiş Edisyon" },
      { etiket: "Sayfa", deger: "227 sayfa, 100 kanun" },
      { etiket: "Dil", deger: "Türkçe" },
      { etiket: "Kimin için", deger: "Erkekler" },
      { etiket: "İmza", deger: "İsme özel, yazar tarafından" },
    ],
    blogLinki: "/blog/vazgecilmez-olma-sanati-kitabi",
    kimIcin: "erkek",
  },
  {
    slug: "cekicilik-sanati-fiziksel-kitap",
    urunId: "cekicilik-fiziksel",
    baslik: "Çekicilik Sanatı – Gürkan Özbinici (İsme Özel İmzalı Kitap)",
    altBaslik: "Fiziksel Kitap · Kadınlar için ilişki ve erkek psikolojisi",
    aciklama:
      "Çekicilik Sanatı (Çekim Gücü ve Arzu Duyulan Vazgeçilmez Kadının İlişki Sanatı), yazar ve ilişki koçu Gürkan Özbinici'nin kadınlar için yazdığı ilişki ve erkek psikolojisi kitabıdır. Kitap; bir erkeğin zihninin nasıl çalıştığını, kendi standartlarını kurmayı, doğru erkeği seçmeyi, aşk bombardımanı ve narsist maskeler gibi tuzakları erkenden tanımayı anlatır. Her bölümde 'Erkeğin Karanlık Notu' kısımları ve sonunda 30 günlük uygulama programı vardır. Her kitap alıcının adına özel olarak yazar tarafından imzalanır. Türkiye'nin her yerine ücretsiz kargo.",
    paragraflar: [
      "Çekicilik Sanatı; çok verip karşılığını alamayan, ilginin azaldığını hisseden, aynı tip adamı tekrar tekrar seçen kadınlar için yazıldı.",
      "Kitap bir erkeğin zihninde neyin 'cepte', neyin 'uğruna emek verilecek' olarak kodlandığını, kendi standardını kurmayı ve doğru erkeği seçmeyi anlatıyor. Her bölümde bir erkeğin o anda gerçekten ne düşündüğünü anlatan 'Erkeğin Karanlık Notu' kısımları var.",
      "Sonunda okuduklarını uygulamaya dönüştüren 30 günlük bir program ve panik anlarında kullanacağın hazır cümleler yer alıyor. Her kitap senin adına özel olarak imzalanır.",
    ],
    gorsel: "/cekicilik-sanati-kapak.jpg",
    ozellikler: [
      { etiket: "Yazar", deger: "Gürkan Özbinici" },
      { etiket: "Alt başlık", deger: "Çekim Gücü ve Arzu Duyulan Vazgeçilmez Kadının İlişki Sanatı" },
      { etiket: "Dil", deger: "Türkçe" },
      { etiket: "Kimin için", deger: "Kadınlar" },
      { etiket: "İmza", deger: "İsme özel, yazar tarafından" },
    ],
    blogLinki: "/blog/cekicilik-sanati-kitabi",
    kimIcin: "kadın",
  },
  {
    slug: "koleksiyon-seti-iki-kitap",
    urunId: "koleksiyon-seti",
    baslik: "Gürkan Özbinici Koleksiyon Seti – Vazgeçilmez Olma Sanatı + Çekicilik Sanatı (2 İmzalı Kitap)",
    altBaslik: "2 fiziksel kitap · İkisi de isme özel imzalı",
    aciklama:
      "Gürkan Özbinici'nin iki kitabı bir arada: erkekler için yazılan Vazgeçilmez Olma Sanatı ve kadınlar için yazılan Çekicilik Sanatı. Biri ilişkinin erkek tarafını, diğeri kadın tarafını anlatır; birlikte okunduğunda aynı masanın iki tarafını gösterir. İki fiziksel kitap da alıcının adına özel olarak yazar tarafından imzalanır. Türkiye'nin her yerine ücretsiz kargo.",
    paragraflar: [
      "Biri erkekler için, biri kadınlar için. Aynı masanın iki tarafı.",
      "Vazgeçilmez Olma Sanatı ilişkide saygı kazanmayı, sınır koymayı ve kaybetme korkusunu yenmeyi; Çekicilik Sanatı bir erkeğin zihninin nasıl çalıştığını, kendi standardını kurmayı ve doğru erkeği seçmeyi anlatıyor.",
      "Çiftler, ilişkinin iki tarafını da anlamak isteyenler ve hediye olarak almak isteyenler için hazırlandı. İki kitap da isme özel imzalanır.",
    ],
    gorsel: "/koleksiyon-seti.jpg",
    ozellikler: [
      { etiket: "Yazar", deger: "Gürkan Özbinici" },
      { etiket: "İçerik", deger: "Vazgeçilmez Olma Sanatı + Çekicilik Sanatı" },
      { etiket: "Adet", deger: "2 fiziksel kitap" },
      { etiket: "Dil", deger: "Türkçe" },
      { etiket: "İmza", deger: "İki kitap da isme özel imzalı" },
    ],
    blogLinki: "/blog/hangi-kitap-sana-gore",
    kimIcin: "ikisi",
  },
];

export const urunSayfasiBul = (slug: string) => URUN_SAYFALARI.find((u) => u.slug === slug);

export function urunVerisi(s: UrunSayfasi): OdemeUrunu {
  return ODEME_URUNLERI[s.urunId];
}

/** Google'a bildirilen stok durumu. Satış tarihinden önce ön sipariş. */
export function stokDurumu(s: UrunSayfasi, simdi = Date.now()) {
  const u = urunVerisi(s);
  const satista = satistaMi(u, simdi);
  return {
    satista,
    /** Google ürün listesi formatı */
    feed: satista ? "in_stock" : "preorder",
    /** schema.org formatı */
    schema: satista ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    satisTarihi: u.satisBaslangic,
  };
}

export const urunLinki = (s: UrunSayfasi) => `${SITE}/urun/${s.slug}`;

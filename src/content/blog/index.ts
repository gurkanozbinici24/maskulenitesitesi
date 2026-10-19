// Bu dosya otomatik üretilir: yeni yazı için posts/ klasörüne dosya ekleyip listeye import edin.
import type { BlogPost, BookKey } from "./types";
import eskiSevgiliGeriDonerMi from "./posts/eski-sevgili-geri-doner-mi";
import ayrilikAcisiNeKadarSurer from "./posts/ayrilik-acisi-ne-kadar-surer";
import noContactKurali from "./posts/no-contact-kurali";
import eskiSevgiliYazincaNeYapmali from "./posts/eski-sevgili-yazinca-ne-yapmali";
import toksikIliskidenSonraToparlanmak from "./posts/toksik-iliskiden-sonra-toparlanmak";
import askBombardimaniNedir from "./posts/ask-bombardimani-nedir";
import gaslightingNedir from "./posts/gaslighting-nedir";
import breadcrumbingNedir from "./posts/breadcrumbing-nedir";
import guiltTripNedir from "./posts/guilt-trip-nedir";
import itmeCekmeDongusu from "./posts/itme-cekme-dongusu";
import narsistSevgiliBelirtileri from "./posts/narsist-sevgili-belirtileri";
import iliskideSaygiNasilKazanilir from "./posts/iliskide-saygi-nasil-kazanilir";
import ozdegerNedir from "./posts/ozdeger-nedir";
import simpNeDemek from "./posts/simp-ne-demek";
import kadinlaraCekiciGelenErkekOzellikleri from "./posts/kadinlara-cekici-gelen-erkek-ozellikleri";
import guvensizlikIsaretleri from "./posts/guvensizlik-isaretleri";
import iyiCocukSendromu from "./posts/iyi-cocuk-sendromu";
import hangiKitapSanaGore from "./posts/hangi-kitap-sana-gore";
import vazgecilmezOlmaSanatiKitabi from "./posts/vazgecilmez-olma-sanati-kitabi";
import cekicilikSanatiKitabi from "./posts/cekicilik-sanati-kitabi";

export type { BlogPost, BookKey, BlogFaq } from "./types";

export const POSTS: BlogPost[] = [
  eskiSevgiliGeriDonerMi,
  ayrilikAcisiNeKadarSurer,
  noContactKurali,
  eskiSevgiliYazincaNeYapmali,
  toksikIliskidenSonraToparlanmak,
  askBombardimaniNedir,
  gaslightingNedir,
  breadcrumbingNedir,
  guiltTripNedir,
  itmeCekmeDongusu,
  narsistSevgiliBelirtileri,
  iliskideSaygiNasilKazanilir,
  ozdegerNedir,
  simpNeDemek,
  kadinlaraCekiciGelenErkekOzellikleri,
  guvensizlikIsaretleri,
  iyiCocukSendromu,
  hangiKitapSanaGore,
  vazgecilmezOlmaSanatiKitabi,
  cekicilikSanatiKitabi,
].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const BOOK_CTA: Record<BookKey, { label: string; href: string; title: string; text: string }> = {
  vazgecilmez: {
    title: "Vazgeçilmez Olma Sanatı",
    text: "100 kanun, 227 sayfa. İlk sayfaları ücretsiz oku; e-kitap ödemenin ardından e-postana gelsin.",
    label: "Kitabı incele",
    href: "/#vazgecilmez",
  },
  cekicilik: {
    title: "Çekicilik Sanatı",
    text: "Kadınlar için yazıldı. İlk sayfaları şimdiden oku, çıkış günü haberin olsun.",
    label: "Kitabı incele",
    href: "/#cekicilik-sanati",
  },
  ikisi: {
    title: "Koleksiyon Seti",
    text: "Vazgeçilmez Olma Sanatı ve Çekicilik Sanatı birlikte, isme özel imzalı.",
    label: "Seçenekleri gör",
    href: "/#fiyat-kartlari",
  },
};

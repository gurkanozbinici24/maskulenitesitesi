// Bu dosya otomatik üretilir: yeni yazı için posts/ klasörüne dosya ekleyip listeye import edin.
import type { BlogPost, BookKey } from "./types";
import maskuleniteNedir from "./posts/maskulenite-nedir";
import alfaErkekNedir from "./posts/alfa-erkek-nedir";
import sigmaErkekNedir from "./posts/sigma-erkek-nedir";
import kiskanclikSevgidenMiGelir from "./posts/kiskanclik-sevgiden-mi-gelir";
import maskulenErkekOzellikleri from "./posts/maskulen-erkek-ozellikleri";
import redPillNedir from "./posts/red-pill-nedir";
import maskulenVeFeminenEnerji from "./posts/maskulen-ve-feminen-enerji";
import bluePillRedPillBlackPill from "./posts/blue-pill-red-pill-black-pill";
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
import ilkBulusmadanSonraIlkMesaj from "./posts/ilk-bulusmadan-sonra-ilk-mesaj";
import mesajlasmaHatalari from "./posts/mesajlasma-hatalari";
import baglanmaStilleri from "./posts/baglanma-stilleri";
import limeransSaplantiliAsk from "./posts/limerans-saplantili-ask";
import iyiCocukSendromu from "./posts/iyi-cocuk-sendromu";
import hangiKitapSanaGore from "./posts/hangi-kitap-sana-gore";
import vazgecilmezOlmaSanatiKitabi from "./posts/vazgecilmez-olma-sanati-kitabi";
import cekicilikSanatiKitabi from "./posts/cekicilik-sanati-kitabi";
import vazgecilmezOlmaKitabi from "./posts/vazgecilmez-olma-kitabi";
import vazgecilmezOlmak from "./posts/vazgecilmez-olmak";
import vazgecilmezErkekOlmak from "./posts/vazgecilmez-erkek-olmak";
import birErkekIcinVazgecilmezOlmak from "./posts/bir-erkek-icin-vazgecilmez-olmak";
import vazgecilmezOlmakSozleri from "./posts/vazgecilmez-olmak-sozleri";
import cekiciKadinNasilOlunur from "./posts/cekici-kadin-nasil-olunur";
import erkekNedenIlgisiniKaybeder from "./posts/erkek-neden-ilgisini-kaybeder";
import erkekCiddiMiNasilAnlasilir from "./posts/erkek-ciddi-mi-nasil-anlasilir";
import erkegiKendineBaglamak from "./posts/erkegi-kendine-baglamak";
import degerliKadinOzellikleri from "./posts/degerli-kadin-ozellikleri";

export type { BlogPost, BookKey, BlogFaq } from "./types";

export const POSTS: BlogPost[] = [
  maskuleniteNedir,
  alfaErkekNedir,
  sigmaErkekNedir,
  kiskanclikSevgidenMiGelir,
  maskulenErkekOzellikleri,
  redPillNedir,
  maskulenVeFeminenEnerji,
  bluePillRedPillBlackPill,
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
  ilkBulusmadanSonraIlkMesaj,
  mesajlasmaHatalari,
  baglanmaStilleri,
  limeransSaplantiliAsk,
  iyiCocukSendromu,
  hangiKitapSanaGore,
  vazgecilmezOlmaSanatiKitabi,
  cekicilikSanatiKitabi,
  vazgecilmezOlmaKitabi,
  vazgecilmezOlmak,
  vazgecilmezErkekOlmak,
  birErkekIcinVazgecilmezOlmak,
  vazgecilmezOlmakSozleri,
  cekiciKadinNasilOlunur,
  erkekNedenIlgisiniKaybeder,
  erkekCiddiMiNasilAnlasilir,
  erkegiKendineBaglamak,
  degerliKadinOzellikleri,
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

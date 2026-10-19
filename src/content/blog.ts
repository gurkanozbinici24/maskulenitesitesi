/**
 * Blog yazıları.
 * Yeni yazı eklemek için POSTS dizisine bir nesne ekleyin; sayfa, site haritası ve liste otomatik güncellenir.
 *
 * body biçimi (basit markdown):
 *   boş satır      = yeni paragraf
 *   "## Başlık"    = ara başlık
 *   "> metin"      = vurgulu alıntı
 *   "- madde"      = liste maddesi (art arda satırlar tek liste olur)
 *   **kalın**      = altın vurgu
 *   [metin](/link) = bağlantı
 */

export type BookKey = "vazgecilmez" | "cekicilik" | "ikisi";

export interface BlogPost {
  slug: string;
  title: string;
  /** Google'da başlığın altında görünen açıklama (150-160 karakter ideal) */
  description: string;
  /** Liste kartında görünen kısa özet */
  excerpt: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  readMin: number;
  book: BookKey;
  cover: string;
  keywords: string[];
  body: string;
}

export const POSTS: BlogPost[] = [
  {
    slug: "vazgecilmez-olma-sanati-kitabi",
    title: "Vazgeçilmez Olma Sanatı: Kitap Ne Anlatıyor, Kimin İçin Yazıldı?",
    description:
      "Gürkan Özbinici'nin Vazgeçilmez Olma Sanatı kitabı ne anlatıyor? 100 kanun, 227 sayfa, kimler okumalı, e-kitap ve fiziksel baskı seçenekleri tek yazıda.",
    excerpt:
      "100 kanun, 227 sayfa ve tek bir hedef: ilişkide kuralları koyan taraf olmak. Kitabın ne anlattığını, kimin için yazıldığını ve nasıl okunması gerektiğini anlattım.",
    date: "2026-10-19",
    readMin: 6,
    book: "vazgecilmez",
    cover: "/vazgecilmez-yeni-kapak.jpg",
    keywords: ["vazgeçilmez olma sanatı", "vazgeçilmez olma sanatı kitabı", "gürkan özbinici kitap", "erkekler için ilişki kitabı", "maskülenlik"],
    body: `**Vazgeçilmez Olma Sanatı**, ilişkilerde sürekli kendini kanıtlamaya çalışan, alttan alan, taviz verdikçe değersizleşen erkekler için yazdığım bir kitap. Bir tavsiye kitabı değil; ilişkilerin arkasında işleyen güç dinamiklerini, çekim yasalarını ve saygının nasıl kazanıldığını açık açık anlatan bir yol haritası.

Bu yazıda kitabın ne anlattığını, kimin için yazıldığını ve nasıl okunması gerektiğini anlatacağım.

## Kitap ne anlatıyor?

Kitabın temel fikri tek cümle: **Saygı dilenerek kazanılmaz, tavizsiz bir çerçeveyle inşa edilir.**

Bize küçüklükten beri "Kadınlara hep iyi davran, her dediğini yap, gün gelir değerini anlar" dendi. Kitabın ilk bölümlerinden biri olan "İyi Çocuk Masalının Sonu" tam olarak bu yalanla yüzleşiyor. Aşırı fedakârlığın neden saygı değil, "cepte" olma hissi getirdiğini; sınırları olmayan bir adamın neden arzulanmadığını anlatıyor.

Kitap üç ana eksen üzerinde ilerliyor:

- **Acımasız gerçeklerle yüzleşmek:** Onay arayan, oyunlara düşen tavırları bırakıp sana oynanan zihin oyunlarını görmeyi öğrenmek.
- **Kaya gibi bir karakter inşası:** Krizlerde savrulmayan, duygusal manipülasyona kapalı, net karar veren bir duruş kurmak.
- **Güç dinamiklerini okumak:** İlişkinin tesadüf değil, dengeler üzerine kurulu olduğunu görmek ve o dengeyi lehine çevirmek.

## 100 kanun

Kitabın omurgası 100 kanundan oluşuyor. Her kanun gündelik bir ilişki anına karşılık geliyor: uzun bir sitem mesajına nasıl cevap verileceği, tartışmanın nasıl bitirileceği, "gidersen git" restine nasıl durulacağı gibi.

Sitede bu kanunlardan üçünü herkese açtım. [Kanun arşivine göz atabilirsin](/#gizli-arsiv); kalan 97 kanun yalnızca kitapta.

## Kimin için yazıldı?

Kitap şu durumlardan birini yaşayan erkekler için:

- İlişkisinde sürekli restler yiyen, "işine gelirse" cevabıyla karşılaşan,
- Her mesaja anında cevap verip saatlerce bekletilen,
- Fedakârlık yaptıkça daha az saygı gördüğünü hisseden,
- Ayrılık sonrası kendini toparlamak ve aynı hataları tekrarlamamak isteyen,
- Şu an hayatında kimse olmayan ve temeli baştan sağlam atmak isteyen.

Son madde özellikle önemli. Hayatında şu an kimse yoksa bu kitap belki de en çok senin işine yarar; çünkü geçmişin enkazını temizlemekle uğraşmadan, duruşunu baştan kurarsın.

> Seçilen değil, seçen adam ol.

## Nasıl okunmalı?

Bu kitabı roman gibi bir oturuşta bitirip kenara koyma. Yavaş oku, kendi hayatınla karşılaştır, altını çiz, not al. Okuyup gaza gelmek tek başına bir şey değiştirmez; değişim, öğrendiğini ertesi gün uygulamaya başladığında gelir.

Kadınlar için yazdığım ikinci kitap [Çekicilik Sanatı](/blog/cekicilik-sanati-kitabi) ise aynı dinamiklere diğer taraftan bakıyor. İlişkinin iki tarafını da anlamak isteyenler ikisini birlikte okuyabilir.

## E-kitap mı, fiziksel kitap mı?

- **E-Kitap (600 TL):** PDF, EPUB ve Kindle formatlarında, ödemenin ardından e-postana gönderilir. Kargo beklemeden hemen okumaya başlarsın.
- **Fiziksel Kitap – Yenilenmiş Edisyon (1000 TL):** İçerik birebir aynı; yeni kapak ve daha okunaklı büyük punto. 5 Kasım 2026'dan itibaren satışta. Her kitap senin adına özel imzalanır, kapıya kadar ücretsiz kargoyla gelir.

İlk 200 kişiye özel numaralandırılmış 1. Baskı Koleksiyon Serisi tükendi; Yenilenmiş Edisyon bu yoğun ilgi üzerine basıldı.

Kitabın ilk sayfalarını [sitede ücretsiz okuyabilirsin](/#vazgecilmez).`,
  },
  {
    slug: "cekicilik-sanati-kitabi",
    title: "Çekicilik Sanatı: Kadınlar İçin Yazılan Yeni Kitap Hakkında Her Şey",
    description:
      "Gürkan Özbinici'nin kadınlar için yazdığı Çekicilik Sanatı kitabı ne anlatıyor, ne zaman çıkıyor, nasıl sipariş verilir? Çıkış tarihi, fiyatlar ve içerik.",
    excerpt:
      "Çekicilik Sanatı 5 Kasım'da çıkıyor. Kitabın kimin için yazıldığını, ne anlattığını ve çıkış gününde nasıl sipariş verebileceğini anlattım.",
    date: "2026-10-19",
    readMin: 5,
    book: "cekicilik",
    cover: "/cekicilik-sanati-kapak.jpg",
    keywords: ["çekicilik sanatı", "çekicilik sanatı kitabı", "kadınlar için ilişki kitabı", "gürkan özbinici yeni kitap", "erkek psikolojisi"],
    body: `**Çekicilik Sanatı**, kadınlar için yazdığım ikinci kitabım. **5 Kasım 2026, saat 18:00'de** satışa çıkıyor.

Yıllarca erkeklere ilişkide gücü nasıl ellerinde tutacaklarını anlattım. Bu kitapta aynı masanın diğer tarafına oturuyorum ve bir erkeğin zihninin nasıl çalıştığını, kadınlara anlatıyorum.

## Kitap ne anlatıyor?

Kitabın çıkış noktası, kadınlara küçüklükten beri fısıldanan o cümle: "Sen sadece fedakâr ol, uyumlu ol; elbet biri gelir ve değerini anlar."

Peki o sabrın, o bitmeyen tavizlerin sonucu ne oldu? Gece yarısı telefon ekranına bakıp "Bana neden eskisi gibi davranmıyor?" diye kendini yiyip bitirmek. İki saat mesaj gelmeyince kurulan senaryolar. Aradaki soğukluğu kırmak için yazılan sayfalar dolusu mesajlar.

Çekicilik Sanatı bu döngüyü kırmak için yazıldı. Kitap üç şeye odaklanıyor:

- **Varlığınla fark edilmek:** Aranan, özlenen ve vazgeçilmeyen kadının iç dünyasını keşfetmek.
- **Değerini ve dengeyi korumak:** Kendi değerini bilerek ilişkide saygıyı ve dengeyi nasıl koruyacağını öğrenmek.
- **Erkek psikolojisini anlamak:** Bir erkeğin neden ilgisini kaybettiğini, neyin onu bağladığını anlayıp ilişkinin dinamiklerini lehine çevirmek.

> Kendi hayatının merkezini boş bıraktığında, bir adamın tek bir mesajı bütün dünyanı yönetmeye başlar.

## Kimin için yazıldı?

- İlişkisinde ilginin azaldığını hissedip ne yapacağını bilemeyen,
- Çok verdiği hâlde karşılığını alamayan,
- Aynı tip ilişkiyi tekrar tekrar yaşayan,
- Bir erkeğin ne düşündüğünü, neden uzaklaştığını anlamak isteyen kadınlar için.

Erkekler için yazdığım [Vazgeçilmez Olma Sanatı](/blog/vazgecilmez-olma-sanati-kitabi) ile aynı oyunun iki tarafını anlatıyor. İkisini birlikte okumak, ilişkiye her iki pencereden bakmanı sağlar.

## Ne zaman çıkıyor, fiyatı ne?

Çekicilik Sanatı **5 Kasım 2026, saat 18:00**'de satışa açılıyor.

- **E-Kitap:** 600 TL. PDF, EPUB ve Kindle formatlarında e-postana gönderilir.
- **Fiziksel Kitap:** 1000 TL. Senin adına özel imzalanır, kapıya kadar ücretsiz kargoyla gönderilir.
- **Koleksiyon Seti:** İki fiziksel kitap birlikte 1700 TL (ayrı ayrı 2000 TL).

Çıkış günü haber almak için [kitap sayfasındaki "Haber Al" butonunu](/#cekicilik-sanati) kullanabilirsin. Satış başladığında aynı yerde satın alma butonları otomatik olarak açılıyor.

## Kitaptan ilk sayfalar

Kitabın ilk sayfalarını çıkıştan önce sitede paylaştım. "Kadın", "İstediğinde" ve "Her Kapının" bölümlerinin başlarını [buradan okuyabilirsin](/#cekicilik-sanati).`,
  },
  {
    slug: "hangi-kitap-sana-gore",
    title: "Vazgeçilmez Olma Sanatı mı, Çekicilik Sanatı mı? Hangi Kitap Sana Göre",
    description:
      "Vazgeçilmez Olma Sanatı ile Çekicilik Sanatı arasındaki fark ne? Hangi kitabı okumalısın, ikisini birlikte okumak mantıklı mı? Kısa bir rehber.",
    excerpt:
      "Biri erkekler, biri kadınlar için; ama ikisi aynı oyunun iki tarafını anlatıyor. Hangi kitapla başlaman gerektiğini ve ikisini birlikte okumanın ne kazandırdığını anlattım.",
    date: "2026-10-19",
    readMin: 4,
    book: "ikisi",
    cover: "/og-paylasim.jpg",
    keywords: ["vazgeçilmez olma sanatı", "çekicilik sanatı", "gürkan özbinici kitapları", "ilişki kitapları", "hangi kitap"],
    body: `Bana en çok gelen sorulardan biri: "Hangi kitabı okumalıyım?" Kısa cevap şu: **Vazgeçilmez Olma Sanatı erkekler için, Çekicilik Sanatı kadınlar için yazıldı.** Ama işin aslı biraz daha ilginç, çünkü iki kitap aynı ilişki dinamiklerini iki farklı taraftan anlatıyor.

## Vazgeçilmez Olma Sanatı: Kuralları koyan taraf ol

[Vazgeçilmez Olma Sanatı](/blog/vazgecilmez-olma-sanati-kitabi), ilişkide sürekli alttan alan, taviz verdikçe değersizleşen erkekler için. Kitap şunları anlatıyor:

- Manipülasyona karşı sarsılmaz bir çerçeve kurmak,
- İlişkide sınırları net ve tavizsiz çizmek,
- Kadın psikolojisini ve çekim dinamiklerini çözmek.

100 kanundan oluşuyor ve 227 sayfa. E-kitabı şu an satışta.

## Çekicilik Sanatı: Arzu duyulan, vazgeçilmez kadın ol

[Çekicilik Sanatı](/blog/cekicilik-sanati-kitabi), çok verip karşılığını alamayan, ilginin azaldığını hisseden kadınlar için. Kitap şunlara odaklanıyor:

- Çekim gücünü ve özgüvenini keşfetmek,
- Erkek psikolojisini derinden anlamak,
- İlişkide değerini ve dengeni korumak.

5 Kasım 2026'da çıkıyor.

## İkisini birlikte okumak

İlişki iki kişilik bir oyun. Sadece kendi tarafını bilmek, oyunun yarısını görmek demek.

> Erkek, kadının neye saygı duyduğunu; kadın, erkeğin neye bağlandığını anladığında ilişki tesadüf olmaktan çıkar.

O yüzden şunları öneriyorum:

- **Erkeksen:** Vazgeçilmez Olma Sanatı ile başla. Sonra Çekicilik Sanatı'nı oku; bir kadına ilişkide neyin değer kaybettirdiğini onun penceresinden görmek, kendi duruşunu daha da netleştirir.
- **Kadınsan:** Çekicilik Sanatı ile başla. Vazgeçilmez Olma Sanatı ise bir erkeğe ilişkide nasıl davranılmasının öğretildiğini birebir gösterir.
- **Hediye almak istiyorsan:** Fiziksel kitaplar, hediye edeceğin kişinin adına imzalanıp doğrudan onun adresine gönderilebilir.

İki fiziksel kitabı birlikte almak isteyenler için **Koleksiyon Seti** var: ayrı ayrı 2000 TL yerine 1700 TL. [Satın alma seçeneklerine buradan bakabilirsin](/#fiyat-kartlari).

## Karar veremedin mi?

İki kitabın da ilk sayfaları sitede ücretsiz. Birkaç sayfa oku, hangisinin sana hitap ettiğini kendin gör: [kitaplara göz at](/#kitap-secimi).`,
  },
  {
    slug: "iyi-cocuk-sendromu",
    title: "İyi Çocuk Sendromu: Fazla Fedakârlık Neden Saygı Getirmez?",
    description:
      "Her dediğini yapıp alttan aldığın hâlde neden değer görmüyorsun? İyi çocuk sendromunun işaretleri ve ilişkide sınır koymanın yolları.",
    excerpt:
      "Her mesajına saniyesinde cevap verdin, her isteğini yaptın, yine de o başkasını seçti. Bunun bir tesadüf olmadığını ve döngüden nasıl çıkılacağını anlattım.",
    date: "2026-10-19",
    readMin: 5,
    book: "vazgecilmez",
    cover: "/vazgecilmez-sayfa3.jpg",
    keywords: ["iyi çocuk sendromu", "ilişkide değer görmemek", "ilişkide sınır koymak", "maskülenlik", "ilişki tavsiyeleri"],
    body: `Bize küçüklükten beri aynı şey söylendi: "Kadınlara her zaman iyi davran, alttan al, her dediğini yap; gün gelir değerini anlarlar."

Sen de buna inandın. O mükemmel "iyi çocuk" oldun. Peki ne oldu?

Sen her mesajına saniyesinde cevap vermek için telefon başında beklerken o seni saatlerce bekletti. Sen onun sorunlarını çözmek için kendi hayatından vazgeçerken, o senin en ufak derdinde ortadan kayboldu. Sonra da gidip sınırları olan, ona "hayır" diyebilen birine saygı duydu.

Bu bir tesadüf değil. Buna **iyi çocuk sendromu** diyorum.

## İyi çocuk sendromunun işaretleri

Kendine dürüstçe sor:

- Tartışmalarda haklı olsan bile özür dileyen taraf hep sen misin?
- "Aman kırılmasın" diye istemediğin şeylere evet diyor musun?
- Mesajına geç cevap geldiğinde günün mahvoluyor mu?
- Onu mutlu etmek için kendi planlarını, arkadaşlarını, hobilerini kenara koydun mu?
- Sınırlarını çiğneyen bir davranışa "zamanla düzelir" deyip göz yumuyor musun?

Bunların birkaçına evet diyorsan, ilişkide kontrolü çoktan kaybetmiş olabilirsin.

## Neden işe yaramıyor?

Çünkü aşırı fedakârlığın altında aslında şu düşünce yatıyor: "Benim kendi başıma bir değerim yok; ancak sürekli verirsem beni bırakmazlar."

Karşındaki bunu hisseder. Ve kimse, kendi kararı olmayan, her şeye boyun eğen birine gerçekten saygı duymaz. Saygı duyulmayan adam da arzulanmaz.

> Çok taviz verdin diye vazgeçilmez olmazsın. Garantili, sıkıcı, "cepte" biri olursun.

## Döngüden nasıl çıkılır?

Bu, kaba ya da umursamaz biri olman gerektiği anlamına gelmiyor. Kendi zamanının, emeğinin ve gururunun bekçisi olman gerektiği anlamına geliyor.

- **Kendi hayatını merkeze al.** İşin, hedeflerin, arkadaşların, sporun... İlişki hayatının tamamı değil, bir parçası olmalı.
- **Sınırlarını söyle ve arkasında dur.** Sınır, söylenip uygulanmadığında sadece bir rica olarak kalır.
- **Her şeye anında cevap verme zorunluluğunu bırak.** Ulaşılabilir olmak ile her an hazırda beklemek aynı şey değil.
- **Gitmeyi göze alabilecek kadar kendine saygı duy.** Bir ilişkide gerçek güç, gerektiğinde masadan kalkabilmekten gelir.

## Daha fazlası

"İyi Çocuk Masalının Sonu", [Vazgeçilmez Olma Sanatı](/blog/vazgecilmez-olma-sanati-kitabi) kitabımın ilk bölümlerinden biri. Bölümün başını [sitede ücretsiz okuyabilirsin](/#vazgecilmez). Kitapta bu döngüden çıkmanın adımlarını 100 kanunla tek tek anlattım.

Durumunu birebir konuşmak istersen [birebir strateji seansı](/danismanlik) için de başvurabilirsin.`,
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const BOOK_CTA: Record<BookKey, { label: string; href: string; title: string; text: string }> = {
  vazgecilmez: {
    title: "Vazgeçilmez Olma Sanatı",
    text: "100 kanun, 227 sayfa. İlk sayfaları ücretsiz oku, e-kitabı hemen e-postana gelsin.",
    label: "Kitabı incele",
    href: "/#vazgecilmez",
  },
  cekicilik: {
    title: "Çekicilik Sanatı",
    text: "5 Kasım 18:00'de çıkıyor. İlk sayfaları şimdiden oku, çıkış günü haberin olsun.",
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

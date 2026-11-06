/**
 * Yasal sayfaların metinleri (iyzico ve Mesafeli Sözleşmeler Yönetmeliği gereği ayrı, linklenebilir sayfalar).
 * Basit biçim: "## " ara başlık, "- " madde, **kalın**, boş satır = paragraf (BlogBody ile render edilir).
 */
export const SELLER = {
  name: "Gürkan Özbinici",
  brand: "Maskülenite (maskulenitesitesi.com.tr)",
  email: "maskulenitesitesi@gmail.com",
  phone: "+90 545 520 79 99",
  web: "https://www.maskulenitesitesi.com.tr",
  /** Mesafeli Sözleşmeler Yönetmeliği gereği satıcının açık adresi */
  address: "[SATICI AÇIK ADRESİ]",
  /** Varsa vergi dairesi ve vergi/T.C. kimlik no (boşsa gösterilmez) */
  tax: "",
};

const saticiBilgileri = `- **Satıcı:** ${SELLER.name}
- **Marka / Web sitesi:** ${SELLER.brand}
- **Adres:** ${SELLER.address}
- **Telefon / WhatsApp:** ${SELLER.phone}
- **E-posta:** ${SELLER.email}${SELLER.tax ? `\n- **Vergi bilgisi:** ${SELLER.tax}` : ""}`;

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: string;
}

const iletisim = `## İletişim

Her türlü iade, iptal ve teslimat talebiniz için:

- **E-posta:** ${SELLER.email}
- **WhatsApp:** ${SELLER.phone}
- **Satıcı:** ${SELLER.name}, ${SELLER.brand}`;

export const LEGAL: LegalDoc[] = [
  {
    slug: "teslimat-ve-iade",
    title: "Teslimat ve İade Şartları",
    description:
      "Maskülenite kitap siparişlerinde teslimat süreleri, kargo, cayma hakkı, iade ve değişim koşulları. E-kitap, fiziksel kitap ve isme özel imzalı kitaplar.",
    updated: "2026-10-20",
    body: `Bu sayfa, maskulenitesitesi.com.tr üzerinden satın alınan **Vazgeçilmez Olma Sanatı**, **Çekicilik Sanatı** ve **Koleksiyon Seti** ürünlerinin teslimat ve iade koşullarını açıklar. Koşullar, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'ne uygun olarak hazırlanmıştır.

## 1. Teslimat

**E-kitap (PDF):** Ödemeniz onaylandıktan sonra e-kitap dosyaları sipariş sırasında verdiğiniz e-posta adresine gönderilir. Teslimat genellikle aynı gün içinde yapılır.

**Fiziksel kitap:** Kitaplar isme özel imzalanarak hazırlanır ve kargo ile gönderilir.

- Saat 14:00'e kadar onaylanan siparişler aynı iş günü, sonrasında verilen siparişler ertesi iş günü kargoya teslim edilir.
- Kargo firmasına teslimden sonra kitabınız genellikle 1-3 iş günü içinde adresinize ulaşır.
- Türkiye'nin her yerine **kargo ücretsizdir.**
- Kargo takip numarası, kargoya verildiği gün size WhatsApp veya e-posta ile iletilir.
- **Ön sipariş:** Henüz çıkmamış bir kitap için verilen siparişler, ürün sayfasında belirtilen çıkış tarihinde kargoya verilir.

Yasal olarak teslimat süresi, siparişin onaylanmasından itibaren 30 günü geçemez. Herhangi bir gecikme olursa sizi önceden bilgilendiririz.

## 2. Teslim alırken

Kargo paketini teslim alırken kontrol etmenizi rica ederiz. Paket hasarlıysa kargo görevlisine **hasar tespit tutanağı** tutturarak teslim almayın ya da tutanakla teslim alın; ardından bize bildirin. Bu durumda kitabınız ücretsiz olarak yenisiyle değiştirilir.

## 3. Cayma hakkı ve iade

**Fiziksel kitap (isimsiz / imzasız):** Ürünü teslim aldığınız tarihten itibaren **14 gün içinde** hiçbir gerekçe göstermeden ve cezai şart ödemeden cayma hakkınızı kullanabilirsiniz. İade edilecek kitabın kullanılmamış, yıpranmamış ve tekrar satılabilir durumda olması gerekir.

**İsme özel imzalı kitaplar:** İsme özel imzalanan kitaplar, alıcının kişisel isteği doğrultusunda hazırlanan ürünlerdir. Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca bu ürünlerde **cayma hakkı kullanılamaz.** Ancak kitap hatalı basılmış ya da hasarlı ulaşmışsa ücretsiz olarak değiştirilir.

**E-kitap:** Elektronik ortamda anında teslim edilen dijital içerik olduğu için, Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca **cayma hakkı kullanılamaz.** Dosyada açılmama, eksik sayfa gibi teknik bir sorun olursa dosya yeniden gönderilir.

## 4. İade nasıl yapılır?

- İade talebinizi 14 gün içinde e-posta veya WhatsApp ile bildirin; sipariş adınızı ve iade sebebinizi (zorunlu değil) yazın.
- Size iade adresini iletiriz. Kitabı orijinal ambalajıyla birlikte kargoya verin.
- Cayma hakkı kapsamındaki iadelerde **geri gönderim kargo ücreti alıcıya aittir.** Ürün hatalı veya hasarlıysa kargo ücreti bize aittir.

## 5. Para iadesi

İade talebinizin bize ulaşmasından itibaren **en geç 14 gün içinde**, ödemeyi yaptığınız yöntemle (kredi kartına iade veya banka hesabınıza havale) ücretiniz iade edilir. Kartla yapılan ödemelerde iadenin hesabınıza yansıma süresi bankanıza bağlıdır.

## 6. Hatalı veya hasarlı ürün

Hatalı basım, eksik sayfa ya da kargoda hasar görmüş kitaplar, bildiriminizin ardından **koşulsuz ve ücretsiz** olarak yenisiyle değiştirilir. Bunun için hasarın fotoğrafını göndermeniz yeterlidir.

${iletisim}`,
  },
  {
    slug: "hizmet-iptal-ve-iade",
    title: "Danışmanlık Hizmeti İptal ve İade Koşulları",
    description:
      "Birebir strateji seansı ve VIP Mentörlük danışmanlık hizmetlerinde randevu iptali, erteleme ve ücret iadesi koşulları.",
    updated: "2026-10-20",
    body: `Bu sayfa, maskulenitesitesi.com.tr üzerinden satın alınan **Birebir Strateji Seansı** ve **VIP Mentörlük** danışmanlık hizmetlerinin iptal ve iade koşullarını açıklar.

## 1. Hizmetin tanımı

Danışmanlık hizmeti, Gürkan Özbinici ile online (Google Meet veya WhatsApp üzerinden sesli/görüntülü) gerçekleştirilen birebir görüşmelerden oluşur. Seans tarihi ve saati, ödeme sonrasında danışan ile birlikte belirlenir.

Danışmanlık hizmeti bir psikolojik danışmanlık, terapi ya da tıbbi tedavi değildir.

## 2. Randevu iptali ve ücret iadesi

- Randevu saatinden **en az 24 saat önce** yapılan iptallerde ücretin **tamamı iade edilir.**
- Randevu saatine **24 saatten az** kala yapılan iptallerde ve randevuya katılınmaması durumunda **ücret iadesi yapılmaz.**
- Gerçekleşmiş seanslar için ücret iadesi yapılmaz.

## 3. Randevu erteleme

Randevu saatinden en az 24 saat önce bildirmek şartıyla seansınızı **bir kez ücretsiz** olarak başka bir tarihe erteleyebilirsiniz.

## 4. VIP Mentörlük (aylık paket)

- İlk seans gerçekleşmeden önce, ilk seans saatinden en az 24 saat önce yapılan iptallerde ücretin tamamı iade edilir.
- İlk seans gerçekleştikten sonra o aya ait paket ücreti iade edilmez; dilerseniz bir sonraki ay için paketi yenilemeyebilirsiniz.
- Paketteki her bir seans için yukarıdaki 24 saat iptal ve erteleme kuralları geçerlidir.

## 5. Bizim tarafımızdan iptal

Seans, danışman tarafından iptal edilirse size yeni bir tarih önerilir. Önerilen tarihi kabul etmezseniz ücretin tamamı iade edilir.

## 6. Cayma hakkı

Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, cayma süresi dolmadan önce sizin onayınızla ifasına başlanan (gerçekleştirilen) hizmetlerde cayma hakkı kullanılamaz. Henüz başlamamış hizmetler için yukarıdaki iptal koşulları geçerlidir.

## 7. Para iadesi

İptal talebinizin bize ulaşmasından itibaren **en geç 14 gün içinde**, ödemeyi yaptığınız yöntemle (kredi kartına iade veya banka hesabınıza havale) ücretiniz iade edilir.

${iletisim}`,
  },
  {
    slug: "mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "maskulenitesitesi.com.tr üzerinden yapılan kitap (fiziksel ve e-kitap) ve danışmanlık hizmeti satışlarına ilişkin Mesafeli Satış Sözleşmesi.",
    updated: "2026-11-07",
    body: `## MADDE 1 – TARAFLAR

**1.1. SATICI**

${saticiBilgileri}

**1.2. ALICI**

maskulenitesitesi.com.tr üzerinden sipariş veren kişidir. Alıcının adı, soyadı, teslimat adresi, telefonu ve e-posta adresi, sipariş sırasında ödeme sayfasındaki forma girdiği bilgilerdir. İşbu sözleşmede "Alıcı" olarak anılır.

## MADDE 2 – SÖZLEŞMENİN KONUSU

İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait maskulenitesitesi.com.tr internet sitesi üzerinden elektronik ortamda siparişini verdiği, aşağıda nitelikleri ve satış fiyatı belirtilen ürün veya hizmetin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.

## MADDE 3 – SÖZLEŞME KONUSU ÜRÜN VE HİZMETLER

Sözleşme konusu ürün veya hizmetin adı, türü (fiziksel kitap, e-kitap veya danışmanlık), adedi, KDV dahil satış bedeli, ödeme şekli ve teslimat bilgileri, siparişin tamamlandığı anda ödeme sayfasında ve sipariş özetinde gösterildiği gibidir. Sitede satışa sunulan ürün ve hizmetler şunlardır:

- **Vazgeçilmez Olma Sanatı:** Gürkan Özbinici'nin kitabı. Fiziksel (isme özel imzalı, basılı) veya e-kitap (PDF) olarak.
- **Çekicilik Sanatı:** Gürkan Özbinici'nin kitabı. Fiziksel (isme özel imzalı, basılı) veya e-kitap (PDF) olarak.
- **Koleksiyon Seti:** İki fiziksel kitabın birlikte satışı.
- **Danışmanlık hizmeti:** Birebir Strateji Seansı ve VIP Mentörlük (online görüşme).

Sitede ilan edilen fiyatlar ve kampanyalar, güncelleme yapılana veya kampanya süresi bitene kadar geçerlidir. Tüm fiyatlara KDV dahildir. Türkiye içi kargo ücreti Satıcı'ya aittir; Alıcı'dan ayrıca kargo ücreti alınmaz.

## MADDE 4 – ÖDEME

- Ödeme, kredi kartı veya banka kartı ile **iyzico** güvenli ödeme altyapısı (3D Secure) üzerinden ya da fiziksel kitap siparişlerinde **Havale/EFT** ile yapılır.
- Kart bilgileri Satıcı'nın sitesine girilmez ve Satıcı tarafından saklanmaz; doğrudan iyzico'nun ödeme ekranına girilir.
- Kredi kartıyla taksitli ödemede, ödeme ekranında gösterilen taksit seçenekleri geçerlidir. Taksitli seçeneklerde oluşan vade farkı Alıcı'ya aittir ve ödeme ekranında Alıcı'ya gösterilir.
- Havale/EFT ile verilen siparişlerde ürün, ödeme Satıcı'nın hesabına geçtikten sonra kargoya verilir.

## MADDE 5 – TESLİMAT

- **E-kitap (PDF):** Ödeme onaylandıktan sonra Alıcı'nın sipariş sırasında bildirdiği e-posta adresine gönderilir.
- **Fiziksel kitap:** Alıcı'nın bildirdiği teslimat adresine kargo ile gönderilir. Saat 14:00'e kadar onaylanan siparişler aynı iş günü, sonrasında verilenler ertesi iş günü kargoya teslim edilir. Ön sipariş ürünlerinde ürün sayfasında belirtilen çıkış tarihi esas alınır.
- **Danışmanlık hizmeti:** Seans tarihi ve saati, ödemeden sonra Alıcı ile birlikte belirlenir ve görüşme online olarak yapılır.
- Teslimat, her durumda siparişin onaylanmasından itibaren yasal süre olan **30 günü** aşmaz. Teslimat Alıcı'nın bildirdiği adrese yapılır; Alıcı'nın kendisi dışında bir kişiye (hediye siparişlerinde belirtilen kişiye) yapılan teslimat da Alıcı'ya yapılmış sayılır.
- Teslimat ve iade süreçlerinin ayrıntıları [Teslimat ve İade Şartları](/teslimat-ve-iade) sayfasında, danışmanlık hizmetinin iptal koşulları [Danışmanlık İptal ve İade Koşulları](/hizmet-iptal-ve-iade) sayfasında yer alır ve bu sözleşmenin ekidir.

## MADDE 6 – GENEL HÜKÜMLER

**6.1.** Alıcı, sözleşme konusu ürün veya hizmetin temel nitelikleri, satış fiyatı, ödeme şekli, teslimat ve cayma hakkına ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve siparişi verirken bu bilgileri elektronik ortamda onayladığını kabul eder.

**6.2.** Satıcı, sözleşme konusu ürünü eksiksiz, siparişte belirtilen niteliklere uygun ve sağlam olarak teslim etmekle yükümlüdür.

**6.3.** Ürünün teslimi, ödemenin onaylanması şartına bağlıdır. Kartla yapılan ödemenin herhangi bir sebeple banka tarafından onaylanmaması veya iptal edilmesi halinde Satıcı ürünü teslim etmekle yükümlü değildir.

**6.4.** Satıcı, mücbir sebepler (doğal afet, salgın, grev, kargo firmalarındaki olağanüstü aksaklıklar vb.) veya stok tükenmesi gibi öngörülemeyen nedenlerle siparişi teslim edemezse durumu Alıcı'ya bildirir. Bu halde Alıcı siparişi iptal edebilir; iptal halinde ödenen bedel **14 gün içinde** Alıcı'ya iade edilir.

**6.5.** Kargo paketinin teslim alınırken kontrol edilmesi önerilir. Hasarlı paketler için kargo görevlisine hasar tespit tutanağı tutturulmalıdır. Hatalı basım veya hasarlı ürünler ücretsiz olarak yenisiyle değiştirilir.

**6.6.** Kitapların ve tüm içeriğin telif hakları Gürkan Özbinici'ye aittir. Fiziksel veya dijital kopyaların izinsiz çoğaltılması, paylaşılması veya ticari amaçla kullanılması 5846 sayılı Fikir ve Sanat Eserleri Kanunu uyarınca yasaktır. E-kitap dosyaları yalnızca Alıcı'nın kişisel kullanımı içindir.

## MADDE 7 – CAYMA HAKKI

**7.1.** Alıcı, fiziksel ürünlerde ürünü teslim aldığı tarihten itibaren **14 gün** içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir (Madde 8'deki istisnalar saklıdır). Hizmet sözleşmelerinde cayma süresi sözleşmenin kurulduğu gün başlar.

**7.2.** Cayma hakkının kullanıldığına dair bildirimin bu süre içinde Satıcı'ya yazılı olarak (e-posta: ${SELLER.email}) veya WhatsApp üzerinden (${SELLER.phone}) yapılması yeterlidir.

**7.3.** Cayma hakkı kullanılan ürün, bildirimden itibaren 10 gün içinde Satıcı'nın bildireceği adrese kullanılmamış ve yeniden satılabilir durumda gönderilir. Cayma hakkı kapsamındaki iadelerde geri gönderim kargo ücreti Alıcı'ya aittir; ürün hatalı veya hasarlıysa kargo ücreti Satıcı'ya aittir.

**7.4.** Satıcı, cayma bildiriminin kendisine ulaştığı tarihten itibaren **en geç 14 gün içinde** ürün bedelini Alıcı'nın ödeme yaptığı yönteme (kredi kartına iade veya banka hesabına havale) uygun şekilde iade eder. Kart iadelerinin hesaba yansıma süresi Alıcı'nın bankasına bağlıdır.

## MADDE 8 – CAYMA HAKKININ KULLANILAMAYACAĞI HALLER

Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca aşağıdaki ürün ve hizmetlerde cayma hakkı kullanılamaz:

- **İsme özel imzalı kitaplar:** Alıcı'nın istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerdir (Yönetmelik m.15/1-c).
- **E-kitaplar (PDF):** Elektronik ortamda anında ifa edilen ve tüketiciye anında teslim edilen gayrimaddi mallardır (Yönetmelik m.15/1-ğ).
- **Danışmanlık hizmeti:** Cayma süresi dolmadan önce Alıcı'nın onayıyla ifasına başlanan (gerçekleştirilen) hizmetlerdir (Yönetmelik m.15/1-ç). Henüz başlamamış seanslarda [Danışmanlık İptal ve İade Koşulları](/hizmet-iptal-ve-iade) geçerlidir.

Bu ürünlerde hatalı basım, eksik sayfa, kargo hasarı veya dosyanın açılmaması gibi durumlarda ürün ücretsiz olarak yenilenir veya dosya yeniden gönderilir.

## MADDE 9 – TEMERRÜT HALİ

Alıcı'nın kredi kartı ile yaptığı ödemelerde temerrüde düşmesi halinde, kart sahibi bankanın Alıcı ile arasındaki kredi kartı sözleşmesi hükümleri uygulanır.

## MADDE 10 – UYUŞMAZLIKLARIN ÇÖZÜMÜ

İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı'nca her yıl ilan edilen parasal sınırlar dahilinde Alıcı'nın veya Satıcı'nın yerleşim yerindeki **Tüketici Hakem Heyetleri**, bu sınırları aşan uyuşmazlıklarda **Tüketici Mahkemeleri** yetkilidir. Alıcı, şikayet ve başvurularını Ticaret Bakanlığı'nın E-Devlet üzerinden erişilen **TÜBİS** sistemiyle de yapabilir.

## MADDE 11 – YÜRÜRLÜK

Alıcı, ödeme sayfasında işbu sözleşmeyi okuduğunu ve kabul ettiğini onaylayarak siparişi tamamladığı anda sözleşme kurulmuş ve yürürlüğe girmiş sayılır. Sözleşmenin bir kopyası, talep halinde Alıcı'nın e-posta adresine gönderilir.

**Satıcı:** ${SELLER.name}

**Alıcı:** Sipariş formunda bilgileri yer alan kişi

**Tarih:** Siparişin verildiği tarih`,
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
    description:
      "maskulenitesitesi.com.tr'de hangi kişisel verilerin, hangi amaçla işlendiği, kimlerle paylaşıldığı, çerezler ve 6698 sayılı KVKK kapsamındaki haklarınız.",
    updated: "2026-11-07",
    body: `Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, maskulenitesitesi.com.tr internet sitesini ziyaret eden, sipariş veren veya danışmanlık başvurusu yapan kişilerin kişisel verilerinin nasıl işlendiğini açıklar.

## 1. Veri sorumlusu

${saticiBilgileri}

## 2. Hangi kişisel verileri işliyoruz?

- **Kimlik bilgileri:** Ad, soyad; isme özel imza için bildirdiğiniz isimler.
- **İletişim bilgileri:** E-posta adresi, telefon numarası, teslimat adresi (il, ilçe, açık adres), hediye siparişlerinde teslim alacak kişinin adı.
- **Sipariş ve işlem bilgileri:** Satın alınan ürün veya hizmet, sipariş numarası, tutar, ödeme yöntemi, sipariş notları, kargo takip bilgileri.
- **Danışmanlık başvuru bilgileri:** Başvuru formunda kendi isteğinizle yazdığınız yanıtlar.
- **Yorum bilgileri:** Ürün değerlendirmesi bıraktığınızda adınız ve yorumunuz.
- **İşlem güvenliği ve kullanım bilgileri:** IP adresi, tarayıcı ve cihaz bilgisi, sayfa ziyaretleri ve tıklama istatistikleri.

**Kart bilgileriniz** (kart numarası, son kullanma tarihi, CVV) sitemize girilmez, tarafımızca görülmez ve saklanmaz. Kart ile ödemeler, BDDK lisanslı ödeme kuruluşu **iyzico**'nun 3D Secure ödeme ekranında gerçekleşir.

## 3. Kişisel verilerinizi hangi amaçlarla işliyoruz?

- Siparişinizi almak, ödemenizi tahsil etmek, kitabınızı imzalayıp kargolamak ve e-kitabınızı e-postanıza göndermek,
- Danışmanlık seansınızı planlamak ve gerçekleştirmek,
- Sipariş, kargo, iade ve iptal süreçleriyle ilgili sizinle iletişim kurmak,
- Fatura düzenlemek ve yasal kayıt yükümlülüklerini yerine getirmek,
- İade, cayma ve şikayet taleplerinizi yanıtlamak,
- Sitenin güvenliğini sağlamak, kötüye kullanımı ve dolandırıcılığı önlemek,
- Siteyi geliştirmek için anonim ziyaret istatistiklerini incelemek.

## 4. Hukuki sebepler

Kişisel verileriniz KVKK'nın 5. maddesinde yer alan şu hukuki sebeplere dayanarak işlenir:

- Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (m.5/2-c): sipariş, teslimat, danışmanlık hizmeti,
- Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi (m.5/2-ç): vergi ve tüketici mevzuatı kapsamındaki kayıtlar,
- Bir hakkın tesisi, kullanılması veya korunması (m.5/2-e): uyuşmazlık ve iade süreçleri,
- Veri sorumlusunun meşru menfaati (m.5/2-f): site güvenliği ve anonim istatistikler.

Bunların dışında bir amaçla (örneğin kampanya bildirimi) veri işlenecekse ayrıca açık rızanız alınır.

## 5. Kişisel verilerinizi kimlerle paylaşıyoruz?

Verileriniz satılmaz ve reklam amacıyla üçüncü kişilere verilmez. Yalnızca yukarıdaki amaçların gerektirdiği ölçüde şu hizmet sağlayıcılarla paylaşılır:

- **iyzico Ödeme Hizmetleri A.Ş.:** Kartla ödemenin alınması.
- **Kargo firması:** Fiziksel kitabın teslimatı için ad, adres ve telefon.
- **E-posta gönderim hizmeti:** E-kitap ve sipariş bilgilendirme e-postalarının gönderilmesi.
- **Barındırma ve analiz hizmeti (Vercel):** Sitenin çalıştırılması ve anonim ziyaret istatistikleri.
- **Yetkili kamu kurum ve kuruluşları:** Yasal olarak talep edilmesi halinde.

E-posta gönderimi, barındırma ve analiz hizmeti sağlayıcılarının sunucuları yurt dışında bulunabilir. Bu kapsamdaki aktarımlar KVKK'nın 9. maddesine uygun olarak yapılır.

## 6. Çerezler

Sitemiz, ödeme sırasında sipariş bilgilerinizi güvenli şekilde taşımak için zorunlu bir çerez ve sitenin nasıl kullanıldığını anonim olarak ölçen istatistik araçları kullanır. Reklam veya yeniden pazarlama çerezi kullanılmaz. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz; ancak zorunlu çerezleri engellemek ödeme işleminin tamamlanmasını engelleyebilir.

## 7. Saklama süresi

Sipariş ve fatura kayıtları, ilgili mevzuatta öngörülen süre boyunca (vergi mevzuatı kapsamında 10 yıla kadar) saklanır. Bu süre sona erdiğinde veya işleme amacı ortadan kalktığında verileriniz silinir, yok edilir veya anonim hale getirilir.

## 8. Güvenlik

Sitemiz SSL sertifikası ile şifreli bağlantı kullanır. Kişisel verilerinize yetkisiz erişimi önlemek için makul teknik ve idari tedbirler alınır.

## 9. KVKK kapsamındaki haklarınız

KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak;

- Kişisel verilerinizin işlenip işlenmediğini öğrenme,
- İşlenmişse buna ilişkin bilgi talep etme,
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
- Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
- Eksik veya yanlış işlenmişse düzeltilmesini isteme,
- KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,
- Düzeltme ve silme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
- Münhasıran otomatik sistemlerle analiz edilmesi sonucunda aleyhinize bir sonuç çıkmasına itiraz etme,
- Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme

haklarına sahipsiniz.

## 10. Başvuru

Haklarınıza ilişkin taleplerinizi **${SELLER.email}** adresine, kimliğinizi doğrulayacak bilgilerle birlikte e-posta göndererek iletebilirsiniz. Başvurunuz en geç **30 gün** içinde ücretsiz olarak yanıtlanır.

## 11. Değişiklikler

Bu metin gerektiğinde güncellenebilir. Güncel metin her zaman bu sayfada yayımlanır; sayfanın üst kısmında son güncelleme tarihi yer alır.`,
  },
];

export const getLegal = (slug: string) => LEGAL.find((d) => d.slug === slug);

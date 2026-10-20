/**
 * Yasal sayfaların metinleri (iyzico ve Mesafeli Sözleşmeler Yönetmeliği gereği ayrı, linklenebilir sayfalar).
 * Basit biçim: "## " ara başlık, "- " madde, **kalın**, boş satır = paragraf (BlogBody ile render edilir).
 */
export const SELLER = {
  name: "Gürkan Özbinici",
  brand: "Maskülenite (maskulenitesitesi.com.tr)",
  email: "maskulenitesitesi@gmail.com",
  phone: "+90 545 520 79 99",
};

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

**E-kitap (PDF, EPUB, Kindle):** Ödemeniz onaylandıktan sonra e-kitap dosyaları sipariş sırasında verdiğiniz e-posta adresine gönderilir. Teslimat genellikle aynı gün içinde yapılır.

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
];

export const getLegal = (slug: string) => LEGAL.find((d) => d.slug === slug);

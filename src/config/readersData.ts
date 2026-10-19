/**
 * Okur bölümü verileri. Tüm mesajlar okurlarımızın gerçek WhatsApp mesajlarıdır (izinli).
 * Yeni fotoğraf: /public/okurlar/okur-XX.webp + PHOTO_HEIGHTS'e yüksekliği.
 * Yeni mesaj: /public/okurlar/mesaj/mXX.webp + MESSAGES'a satır (w/h = görsel piksel boyutu).
 */
export const PHOTO_HEIGHTS = [
  1280, 960, 960, 1280, 1281, 1280, 1280, 1280, 1281, 960, 1280, 1281, 1280, 1280, 960, 1281, 1280, 1280, 960, 1280, 1281, 959, 957, 1281, 1161, 965,
];
export const PHOTOS = PHOTO_HEIGHTS.map((h, i) => ({
  src: `/okurlar/okur-${String(i + 1).padStart(2, "0")}.webp`,
  w: 720,
  h,
}));

export type Cat = "kargo" | "imza" | "yorum";
export const MESSAGES: { id: string; w: number; h: number; cat: Cat; date: string; text: string }[] = [
  { id: "m08", w: 532, h: 456, cat: "yorum", date: "16 Eylül", text: "Kitap pazartesi günü elime ulaştı. Açıkçası beklediğimden çok daha iyi çıktı. ‘Vazgeçilmez Olma Sanatı’ gerçekten isminin hakkını veren bir çalışma olmuş." },
  { id: "m21", w: 672, h: 525, cat: "yorum", date: "26 Eylül", text: "Kitabınızı bitirdim. Benim gerçekten çok beğendiğim ve çokça istifade ettiğim bir kitap olmuş. Bir kadın olarak annemden aldığım birçok nasihati satır aralarında bulduğumu itiraf etmeliyim." },
  { id: "m16", w: 631, h: 160, cat: "kargo", date: "18 Eylül", text: "Ben de beklemezdim bu kadar hızlı gelebileceğini." },
  { id: "m01", w: 397, h: 190, cat: "kargo", date: "16 Eylül", text: "Kitabım elime ulaştı, bu kadar hızlı gelmesini beklemiyordum, notunuz için de çok teşekkür ederim." },
  { id: "m04", w: 397, h: 150, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı. İsme özel not çok şık olmuş. Çok teşekkür ederim." },
  { id: "m07", w: 671, h: 301, cat: "yorum", date: "22 Eylül", text: "Bu, bir kere okunacak bir kitap değil. Baş ucu kitabı olması gereken bir kitap." },
  { id: "m02", w: 671, h: 121, cat: "kargo", date: "12 Eylül", text: "Kitap şimdi elime ulaştı. Bir günde gelen kargo için teşekkür ederim. Değişime seninle başlıyoruz." },
  { id: "m06", w: 671, h: 144, cat: "imza", date: "17 Eylül", text: "Kargo ulaştı çok teşekkür ederim, imza için de ayrıca teşekkür, çok ince bir düşünce." },
  { id: "m09", w: 671, h: 144, cat: "yorum", date: "11 Eylül", text: "Çok güzel çok faydalı bir kitap, dışarıda bulunamayan bilgiler için teşekkürler, alan pişman olmaz." },
  { id: "m03", w: 671, h: 264, cat: "kargo", date: "16 Eylül", text: "Kitap bugün geldi, üstelik çok çabuk elimize ulaştı. Eline emeğine yüreğine sağlık, çok güzel." },
  { id: "m05", w: 671, h: 139, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı teşekkür ederim. İsme özel yazınız da çok güzel bir hava katmış." },
  { id: "m10", w: 671, h: 144, cat: "yorum", date: "21 Eylül", text: "Kitabı okumaya devam ediyorum. 36. bölüme geldim, bakış açım değişti, eksiklerimi ve hatalarımı gördüm." },
  { id: "m12", w: 397, h: 201, cat: "yorum", date: "8 Eylül", text: "Daha ilk bölümden gerçekten insanı derinden uyandırma gücüne sahip." },
  { id: "m11", w: 671, h: 121, cat: "yorum", date: "11 Eylül", text: "Emeğine sağlık, çok güzel bir kitap olmuş. Daha önce kendime hiç saygım yokmuş, bunu anladım." },
  { id: "m14", w: 671, h: 181, cat: "yorum", date: "14 Eylül", text: "Kitap çok güzel, keşke daha önce alsaydım." },
  { id: "m13", w: 671, h: 146, cat: "yorum", date: "30 Eylül", text: "Kitap güzel, anlatımı açık ve anlaşılır. Şu an 70. sayfadayım." },
  { id: "m22", w: 397, h: 417, cat: "yorum", date: "13 Eylül", text: "Büyük bir farkındalıkla okuyorum. Gayet başarılı ve özenle düşünülüp emek verilerek yazılmış bir eser." },
  { id: "m17", w: 397, h: 100, cat: "kargo", date: "19 Eylül", text: "Elime şimdi ulaştı, çok teşekkür ederim." },
  { id: "m26", w: 456, h: 76, cat: "imza", date: "12 Eylül", text: "Not için de ayrıca teşekkür ederim." },
  { id: "m20", w: 672, h: 106, cat: "kargo", date: "18 Eylül", text: "Kargo geldi, gayet iyi. Elinize emeğinize sağlık." },
  { id: "m23", w: 672, h: 135, cat: "yorum", date: "9 Eylül", text: "Vakit buldukça kitabı okuyorum, en son ilişkimde yaptığım hatalar önüme geliyor, kitap çok iyi." },
  { id: "m19", w: 397, h: 129, cat: "kargo", date: "10 Eylül", text: "Kitabım elime ulaştı, emeğine sağlık, en kısa zamanda başlayacağım." },
  { id: "m24", w: 672, h: 136, cat: "yorum", date: "7 Eylül", text: "E-kitap PDF olarak gelmiş. Çok teşekkürler, şimdiden eline emeğine yüreğine sağlık." },
  { id: "m18", w: 561, h: 76, cat: "kargo", date: "10 Eylül", text: "Kargo elime geldi, ellerine sağlık emeğine sağlık." },
  { id: "m25", w: 672, h: 106, cat: "yorum", date: "13 Eylül", text: "1 saattir okuyorum, 20 sayfa okudum, dediğin gibi kafama soka soka okuyorum." },
  { id: "m15", w: 644, h: 84, cat: "yorum", date: "5 Ekim", text: "İlk 12 sayfayı okudum, gerçekten şahane, kalemine sağlık." },
];


/**
 * Telefon sahnesinde akan sohbet: okur mesajlarının BİREBİR metni (yazım hataları dahil, değiştirilmedi).
 * Her mesaj farklı bir okurdan; tarih ve saatler gerçek.
 */
export type ChatMsg = { day: string; time: string; text: string; quote?: { from: string; text: string } };
export const PHONE_CHAT: ChatMsg[] = [
  { day: "9 Eylül", time: "11:50", text: "Kitabım elime ulaştı. İsme özel not çok şık olmuş. Çok teşekkür ederim 🙏" },
  { day: "11 Eylül", time: "09:30", text: "Hocam merhabalar kitabınız geldi ancak inceleme fırsatım oldu çok güzel çok faydalı bir kitap dışarda bulunamayan bilgiler için teşekkürler alan pişman olmaz net 💯👌" },
  { day: "12 Eylül", time: "12:08", text: "Kitap şimdi elime ulaştı.  Bir günde gelen kargo icin teşekkür ederim. Değişime seninle başlıyoruz.Saygilarimla" },
  { day: "16 Eylül", time: "20:06", text: "Kitabım elime ulaştı, bu kadar hızlı gelmesini beklemiyordum, notunuz için de çok teşekkür ederim 🌸 büyük bir zevkle okumaya başlayacağım." },
  { day: "18 Eylül", time: "14:56", text: "Bende beklemezdim bu kadar hızlı gelebileceğini reisim", quote: { from: "Gürkan Özbinici", text: "Bugün verdiğim kargo ne cabuk gelmiş" } },
  { day: "21 Eylül", time: "13:12", text: "Selamunaleyküm kitabı okumaya devam ediyorum.36.Bölümüne geldim bakış açım değişti eksiklerimi ve hatalarımı gördüm" },
];

/** Sahnede telefonun etrafında süzülen mesajlar (birebir metin). */
export const FLOATING: { time: string; text: string; tag: string }[] = [
  { time: "17:37", text: "Abi emeğine sağlık çok güzel bir kitap olmuş daha önce kendime hiç saygım yokmuş bunu anladım", tag: "Okur Yorumu" },
  { time: "13:16", text: "Gürkan kardeşim,kargo ulaştı çok teşekkür ederim, başarılarının devamını dilerim,  imza içinde ayrıca teşekkür çok ince bir düşünce 🙏", tag: "İsme Özel İmza" },
  { time: "17:42", text: "İlk 12 sayfayı okudum gerçekten şahane kalemine sağlık", tag: "Okur Yorumu" },
  { time: "17:58", text: "Elime şimdi ulaştı,çok teşekkür ederim 🙏", tag: "Flash Hızda Kargo" },
];

/** Vitrindeki öne çıkan yorum (birebir metin). */
export const FEATURED = {
  id: "m08",
  day: "16 Eylül",
  time: "23:31",
  text: "Kitap pazartesi günü elime ulaştı. Açıkçası beklediğimden çok daha iyi çıktı. Anlatım tarzı, verilen örnekler ve bazı cümlelerin insanı kendisiyle yüzleştirmesi gerçekten çok hoşuma gitti. Hele son dönemlerde yaşadığım bazı şeyleri düşününce, sanki bazı bölümler özellikle benim için yazılmış gibi geldi. Roman okur gibi hızlıca geçmek istemiyorum; pazartesi elime geçti, şu an 13. sayfadayım ama sindire sindire okuyorum. Bazı cümlelerde duruyor, düşünüyor ve kendi yaşadıklarımla karşılaştırıyorum. ‘Vazgeçilmez Olma Sanatı’ gerçekten isminin hakkını veren bir çalışma olmuş. Okudukça altını çizdiğim yerler çoğalıyor. Emeğinize, kaleminize sağlık.",
};

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
export const MESSAGES: { id: string; w: number; h: number; cat: Cat; date: string; time: string; who: string; text: string }[] = [
  { id: "m08", who: "@Pi••••03", time: "23:31", w: 532, h: 456, cat: "yorum", date: "16 Eylül", text: "Kitap pazartesi günü elime ulaştı. Açıkçası beklediğimden çok daha iyi çıktı. ‘Vazgeçilmez Olma Sanatı’ gerçekten isminin hakkını veren bir çalışma olmuş." },
  { id: "m21", who: "@vu••••l_", time: "16:14", w: 672, h: 525, cat: "yorum", date: "26 Eylül", text: "Kitabınızı bitirdim. Benim gerçekten çok beğendiğim ve çokça istifade ettiğim bir kitap olmuş. Bir kadın olarak annemden aldığım birçok nasihati satır aralarında bulduğumu itiraf etmeliyim." },
  { id: "m16", who: "+90 552 ••• •• 12", time: "14:56", w: 631, h: 160, cat: "kargo", date: "18 Eylül", text: "Ben de beklemezdim bu kadar hızlı gelebileceğini." },
  { id: "m01", who: "@sd•••31", time: "20:06", w: 397, h: 190, cat: "kargo", date: "16 Eylül", text: "Kitabım elime ulaştı, bu kadar hızlı gelmesini beklemiyordum, notunuz için de çok teşekkür ederim." },
  { id: "m04", who: "+90 541 ••• •• 76", time: "11:50", w: 397, h: 150, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı. İsme özel not çok şık olmuş. Çok teşekkür ederim." },
  { id: "m07", who: "+90 534 ••• •• 02", time: "13:49", w: 671, h: 301, cat: "yorum", date: "22 Eylül", text: "Bu, bir kere okunacak bir kitap değil. Baş ucu kitabı olması gereken bir kitap." },
  { id: "m02", who: "@Fu••••ti", time: "12:08", w: 671, h: 121, cat: "kargo", date: "12 Eylül", text: "Kitap şimdi elime ulaştı. Bir günde gelen kargo için teşekkür ederim. Değişime seninle başlıyoruz." },
  { id: "m06", who: "+90 532 ••• •• 02", time: "13:16", w: 671, h: 144, cat: "imza", date: "17 Eylül", text: "Kargo ulaştı çok teşekkür ederim, imza için de ayrıca teşekkür, çok ince bir düşünce." },
  { id: "m09", who: "+90 535 ••• •• 50", time: "09:30", w: 671, h: 144, cat: "yorum", date: "11 Eylül", text: "Çok güzel çok faydalı bir kitap, dışarıda bulunamayan bilgiler için teşekkürler, alan pişman olmaz." },
  { id: "m03", who: "+90 530 ••• •• 77", time: "17:59", w: 671, h: 264, cat: "kargo", date: "16 Eylül", text: "Kitap bugün geldi, üstelik çok çabuk elimize ulaştı. Eline emeğine yüreğine sağlık, çok güzel." },
  { id: "m05", who: "@bu••••az", time: "23:49", w: 671, h: 139, cat: "imza", date: "9 Eylül", text: "Kitabım elime ulaştı teşekkür ederim. İsme özel yazınız da çok güzel bir hava katmış." },
  { id: "m10", who: "+90 541 ••• •• 37", time: "13:12", w: 671, h: 144, cat: "yorum", date: "21 Eylül", text: "Kitabı okumaya devam ediyorum. 36. bölüme geldim, bakış açım değişti, eksiklerimi ve hatalarımı gördüm." },
  { id: "m12", who: "@Bi••••35", time: "23:01", w: 397, h: 201, cat: "yorum", date: "8 Eylül", text: "Daha ilk bölümden gerçekten insanı derinden uyandırma gücüne sahip." },
  { id: "m11", who: "+90 555 ••• •• 09", time: "17:37", w: 671, h: 121, cat: "yorum", date: "11 Eylül", text: "Emeğine sağlık, çok güzel bir kitap olmuş. Daha önce kendime hiç saygım yokmuş, bunu anladım." },
  { id: "m14", who: "+90 505 ••• •• 64", time: "15:00", w: 671, h: 181, cat: "yorum", date: "14 Eylül", text: "Kitap çok güzel, keşke daha önce alsaydım." },
  { id: "m13", who: "@ma•••an", time: "13:09", w: 671, h: 146, cat: "yorum", date: "30 Eylül", text: "Kitap güzel, anlatımı açık ve anlaşılır. Şu an 70. sayfadayım." },
  { id: "m22", who: "+90 545 ••• •• 62", time: "11:54", w: 397, h: 417, cat: "yorum", date: "13 Eylül", text: "Büyük bir farkındalıkla okuyorum. Gayet başarılı ve özenle düşünülüp emek verilerek yazılmış bir eser." },
  { id: "m17", who: "+90 507 ••• •• 59", time: "17:58", w: 397, h: 100, cat: "kargo", date: "19 Eylül", text: "Elime şimdi ulaştı, çok teşekkür ederim." },
  { id: "m26", who: "@Fu••••ti", time: "12:09", w: 456, h: 76, cat: "imza", date: "12 Eylül", text: "Not için de ayrıca teşekkür ederim." },
  { id: "m20", who: "+90 551 ••• •• 47", time: "20:32", w: 672, h: 106, cat: "kargo", date: "18 Eylül", text: "Kargo geldi, gayet iyi. Elinize emeğinize sağlık." },
  { id: "m23", who: "+90 531 ••• •• 29", time: "20:17", w: 672, h: 135, cat: "yorum", date: "9 Eylül", text: "Vakit buldukça kitabı okuyorum, en son ilişkimde yaptığım hatalar önüme geliyor, kitap çok iyi." },
  { id: "m19", who: "+90 551 ••• •• 83", time: "03:33", w: 397, h: 129, cat: "kargo", date: "10 Eylül", text: "Kitabım elime ulaştı, emeğine sağlık, en kısa zamanda başlayacağım." },
  { id: "m24", who: "@li••••an", time: "21:56", w: 672, h: 136, cat: "yorum", date: "7 Eylül", text: "E-kitap PDF olarak gelmiş. Çok teşekkürler, şimdiden eline emeğine yüreğine sağlık." },
  { id: "m18", who: "+90 546 ••• •• 51", time: "13:11", w: 561, h: 76, cat: "kargo", date: "10 Eylül", text: "Kargo elime geldi, ellerine sağlık emeğine sağlık." },
  { id: "m25", who: "+90 542 ••• •• 72", time: "23:31", w: 672, h: 106, cat: "yorum", date: "13 Eylül", text: "1 saattir okuyorum, 20 sayfa okudum, dediğin gibi kafama soka soka okuyorum." },
  { id: "m15", who: "+90 534 ••• •• 74", time: "17:42", w: 644, h: 84, cat: "yorum", date: "5 Ekim", text: "İlk 12 sayfayı okudum, gerçekten şahane, kalemine sağlık." },
];


/** Telefon ekranında hikâye gibi sırayla gösterilen gerçek ekran görüntüleri (dar balonlar telefonda net okunur) */
export const PHONE_STORY = ["m04", "m01", "m17", "m19", "m22", "m12"];
/** Sahnede telefonun etrafında süzülen gerçek ekran görüntüleri */
export const FLOATING = ["m16", "m26", "m18", "m15"];
/** Öne çıkan yorum */
export const FEATURED = {
  id: "m08",
  pull: "Açıkçası beklediğimden çok daha iyi çıktı… ‘Vazgeçilmez Olma Sanatı’ gerçekten isminin hakkını veren bir çalışma olmuş.",
};

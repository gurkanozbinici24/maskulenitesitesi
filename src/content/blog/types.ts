export type BookKey = "vazgecilmez" | "cekicilik" | "ikisi";

export interface BlogFaq {
  q: string;
  a: string;
}

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
  /** Kategori etiketi (liste sayfasında gösterilir) */
  category?: string;
  /** İlgili yazılar (slug). Boşsa otomatik seçilir. */
  related?: string[];
  /** Sık sorulan sorular: yazının sonunda gösterilir ve Google'a FAQ olarak bildirilir */
  faq?: BlogFaq[];
  /**
   * Basit markdown:
   *   boş satır = yeni paragraf, "## " ara başlık, "> " vurgulu alıntı,
   *   "- " liste maddesi, **kalın**, [metin](/link)
   */
  body: string;
}

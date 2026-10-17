/**
 * Çekicilik Sanatı — Lansman & Geri Sayım Yapılandırması
 *
 * - RELEASE_DATE: Türkiye saati (UTC+3) ile kesin çıkış anı.
 *   ISO 8601 (+03:00) formatında olduğu için ziyaretçi hangi ülkede/saat diliminde
 *   olursa olsun aynı evrensel ana (UTC) göre geri sayım yapılır.
 * - TRAILER_URL: Süre dolduğunda gösterilecek tanıtım videosu linki
 *   (YouTube veya Instagram Reel/Post linki desteklenir). Boş bırakılırsa
 *   "Tanıtım filmi yayında" mesajı ve Instagram butonu gösterilir.
 */

export const RELEASE_DATE = "2026-11-05T20:00:00+03:00";

export const TRAILER_URL = "";

export const INSTAGRAM_URL = "https://www.instagram.com/maskulenitesitesi";

export const CEKICILIK_SANATI_CONFIG = {
  bookTitle: "Çekicilik Sanatı",
  releaseDate: RELEASE_DATE,
  trailerUrl: TRAILER_URL,
  instagramUrl: INSTAGRAM_URL,
} as const;

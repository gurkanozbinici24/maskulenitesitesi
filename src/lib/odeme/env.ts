/** Ortam değişkeni okur; Vercel'de "2" ekiyle kaydedilmiş kopyayı da kabul eder (örn. RESEND_API_KEY2). */
export const env = (ad: string): string | undefined => process.env[ad] || process.env[`${ad}2`] || undefined;

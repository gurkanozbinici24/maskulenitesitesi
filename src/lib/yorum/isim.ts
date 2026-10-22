/** Sitede görünen isim, ör. "Ahmet Y." ya da baş harfler "A. Y." (sunucu ve tarayıcıda ortak) */
export function gorunenAdUret(ad: string, soyad: string, sadeceBasHarf: boolean) {
  const temiz = (x: string) => (x || "").trim().split(/\s+/)[0] || "";
  const a = temiz(ad);
  const s = temiz(soyad);
  const bas = (x: string) => (x ? `${x[0].toLocaleUpperCase("tr-TR")}.` : "");
  if (sadeceBasHarf) return [bas(a), bas(s)].filter(Boolean).join(" ") || "Okur";
  const ilk = a ? a[0].toLocaleUpperCase("tr-TR") + a.slice(1).toLocaleLowerCase("tr-TR") : "Okur";
  return s ? `${ilk} ${bas(s)}` : ilk;
}

/** Okurun formda yazdığı isim geçerli mi (harf, boşluk, kısa çizgi; 2-30 karakter) */
export const isimGecerliMi = (x: string) => /^[\p{L}][\p{L}\s'.-]{1,29}$/u.test(x.trim());

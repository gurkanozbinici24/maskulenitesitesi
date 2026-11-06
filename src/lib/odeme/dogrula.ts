import { siparisNoUret, type Siparis } from "./siparis";
import { eklemeBul, satistaMi, urunBul, type OdemeUrunu } from "./urunler";

export const temiz = (v: unknown, max = 120) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Telefonu +90XXXXXXXXXX biçimine çevirir */
export function telefonDuzelt(t: string) {
  const d = t.replace(/\D/g, "");
  if (d.length === 10 && d.startsWith("5")) return `+90${d}`;
  if (d.length === 11 && d.startsWith("05")) return `+9${d}`;
  if (d.length === 12 && d.startsWith("90")) return `+${d}`;
  return null;
}

const EPOSTA_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ilkIsim = (s: string) => s.split(" ")[0] || s;

/**
 * Ödeme formundan gelen veriyi doğrular ve sipariş kaydını oluşturur (kart ve havale ortak).
 * Fiziksel siparişte e-posta isteğe bağlıdır; imza ismi boşsa sipariş verenin (hediyede alıcının) adı kullanılır.
 */
export function siparisOlustur(g: Record<string, unknown>): { hata: string } | { urun: OdemeUrunu; siparis: Siparis } {
  const secilen = urunBul(temiz(g.urun, 60));
  if (!secilen) return { hata: "Ürün bulunamadı." };
  if (!satistaMi(secilen)) return { hata: "Bu ürün henüz satışta değil." };
  const ekleme = g.ekle === true ? eklemeBul(secilen) : null;
  const urun = ekleme ? ekleme.hedefUrun : secilen;
  const fiziksel = urun.tip === "physical";

  const ad = temiz(g.ad, 50);
  const soyad = temiz(g.soyad, 50);
  const eposta = temiz(g.eposta, 100).toLowerCase();
  const tel = telefonDuzelt(temiz(g.tel, 20));
  const il = temiz(g.il, 40);
  const ilce = temiz(g.ilce, 40);
  const adres = temiz(g.adres, 250);
  const alici = temiz(g.alici, 80);
  const hediye = g.hediye === true;
  const not = temiz(g.not, 200);

  if (!ad || !soyad) return { hata: "Ad ve soyad gerekli." };
  if (fiziksel ? eposta && !EPOSTA_RE.test(eposta) : !EPOSTA_RE.test(eposta))
    return { hata: "Geçerli bir e-posta adresi girin." };
  if (!tel) return { hata: "Geçerli bir cep telefonu girin (5XX XXX XX XX)." };
  if (g.sozlesme !== true) return { hata: "Devam etmek için sözleşmeyi onaylamanız gerekiyor." };

  let imza: string[] = [];
  if (fiziksel) {
    if (!il || !ilce || adres.length < 10) return { hata: "Kargo için il, ilçe ve açık adres gerekli." };
    if (hediye && !alici) return { hata: "Hediyeyi teslim alacak kişinin adını yazın." };
    const varsayilan = ilkIsim(hediye ? alici : ad);
    const gelen = Array.isArray(g.imza) ? g.imza.map((x) => temiz(x, 60)) : [];
    imza = Array.from({ length: urun.imzaSayisi }, (_, i) => gelen[i] || varsayilan);
  }

  const siparis: Siparis = {
    n: siparisNoUret(),
    u: urun.id,
    ad,
    soyad,
    eposta,
    tel,
    ...(fiziksel ? { il, ilce, adres, alici: alici || `${ad} ${soyad}`, imza, hediye } : { il }),
    ...(not ? { not } : {}),
  };
  return { urun, siparis };
}

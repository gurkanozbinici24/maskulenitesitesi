/**
 * Havale / EFT ile ödeme (yalnızca fiziksel kitaplar).
 * IBAN herkese açık bir bilgidir; müşterinin para gönderebilmesi için ödeme ekranında gösterilir.
 */
export const HAVALE = {
  /** false yapılırsa ödeme sayfasında havale seçeneği gizlenir */
  aktif: true,
  iban: "TR56 0001 0000 1674 4415 1350 11",
  aliciAdi: "Gürkan Özbinici",
  banka: "Ziraat Bankası",
};

export const havaleHazirMi = () => HAVALE.aktif && !/^TR00 0000/.test(HAVALE.iban);

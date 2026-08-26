"use client";

import { X, ShieldCheck } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "iade" | "sozlesme" | "gizlilik" | "iletisim";
}

export default function LegalModal({
  isOpen,
  onClose,
  title,
  type,
}: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-matte-900 border border-zinc-700 shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-gold-500/10 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {type === "iade" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">1. İade ve İptal Şartları</h4>
              <p>
                6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca; satın aldığınız <strong>fiziksel kitapları</strong>, ambalajı açılmamış, kullanılmamış ve hasar görmemiş olması kaydıyla teslimat tarihinden itibaren <strong>14 (on dört) gün</strong> içerisinde hiçbir gerekçe göstermeksizin iade edebilirsiniz.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">2. Dijital Ürünler (E-Kitap)</h4>
              <p>
                Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin (ğ) bendi uyarınca; elektronik ortamda anında ifa edilen hizmetler ve tüketiciye anında teslim edilen gayrimaddi mallara (e-kitap, dijital dosya indirmeleri) ilişkin sözleşmelerde <strong>cayma hakkı kullanılamaz</strong>.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">3. Hasarlı ve Hatalı Ürünler</h4>
              <p>
                Kargo taşıması esnasında hasar gören fiziksel kitaplar için kargo görevlisine tutanak tutturulması gerekmektedir. Hatalı basım veya hasarlı ürünler koşulsuz ve ücretsiz olarak yenisiyle değiştirilir.
              </p>
            </>
          )}

          {type === "sozlesme" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">1. Taraflar ve Amaç</h4>
              <p>
                İşbu sözleşme, alıcı (tüketici) ile satıcı arasındaki &quot;Vazgeçilmez Olma Sanatı&quot; adlı kitabın (fiziksel baskı ve/veya dijital e-kitap) satışı ve teslimi hususundaki hak ve yükümlülükleri düzenler.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">2. Ürün ve Ödeme</h4>
              <p>
                Ürünün cinsi, miktarı, satış bedeli ve ödeme koşulları sipariş formunda belirtildiği gibidir. Tüm ödemeler 256-bit SSL güvenlik sertifikalı sanal POS altyapısı üzerinden tahsil edilir.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">3. Teslimat Koşulları</h4>
              <p>
                E-Kitap siparişleri ödeme onayını müteakip anında alıcının e-posta adresine ve indirme paneline iletilir. Fiziksel kitaplar, sipariş tarihinden itibaren 1-3 iş günü içerisinde anlaşmalı kargo firmasına teslim edilir.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">4. Telif ve Fikri Mülkiyet</h4>
              <p>
                Kitabın tüm metin, grafik ve içerik hakları saklıdır. Dijital veya basılı kopyaların izinsiz çoğaltılması, internet ortamında izinsiz olarak dağıtılması veya ticari amaçla kullanımı 5846 sayılı Fikir ve Sanat Eserleri Kanunu gereğince cezai yaptırıma tabidir.
              </p>
            </>
          )}

          {type === "gizlilik" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">Gizlilik ve Kişisel Verilerin Korunması (KVKK)</h4>
              <p>
                Sitemiz üzerinden gerçekleştirdiğiniz alışverişlerde paylaştığınız ad, soyad, e-posta, telefon ve adres bilgileri yalnızca siparişin temini ve yasal faturalandırma amacıyla işlenir.
              </p>
              <p>
                Kredi kartı ve ödeme bilgileriniz kesinlikle sunucularımızda saklanmaz, doğrudan banka ve BDDK onaylı ödeme kuruluşuna şifreli olarak iletilir.
              </p>
            </>
          )}

          {type === "iletisim" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">Resmi İletişim ve Destek Kanalları</h4>
              <p>
                Siparişleriniz, kargo takibi veya sorularınız için bizimle aşağıdaki kanallardan 7/24 iletişime geçebilirsiniz:
              </p>
              <div className="p-4 rounded-xl bg-matte-950 border border-zinc-800 space-y-2 font-mono text-xs">
                <div><strong>E-Posta:</strong> destek@vazgecilmezol.com</div>
                <div><strong>WhatsApp Destek:</strong> +90 (555) 000 00 00</div>
                <div><strong>Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00</div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white uppercase tracking-wider transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

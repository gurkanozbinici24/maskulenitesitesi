"use client";

import { useState } from "react";
import { BookOpen, Mail, MessageSquare, ArrowUp } from "lucide-react";
import LegalModal from "./LegalModal";

export default function Footer() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: "iade" | "sozlesme" | "gizlilik" | "iletisim";
  }>({
    isOpen: false,
    title: "",
    type: "iade",
  });

  const openModal = (
    title: string,
    type: "iade" | "sozlesme" | "gizlilik" | "iletisim"
  ) => {
    setModalState({ isOpen: true, title, type });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-matte-950 border-t border-zinc-900 pt-16 pb-12 relative text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
            
            {/* Col 1 & 2: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-gold-500/40 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gold-400" />
                </div>
                <span className="font-extrabold tracking-wider text-lg text-white uppercase">
                  Vazgeçilmez Olma Sanatı
                </span>
              </div>

              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                İlişki psikolojisi, çekim dinamikleri ve çerçeve yönetimi üzerine inşa edilmiş başvuru kaynağı.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs text-zinc-500">
                <span>Özel Edisyon Baskı</span>
                <span>•</span>
                <span>İlişki Psikolojisi</span>
              </div>
            </div>

            {/* Col 3: Hızlı Bağlantılar */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest font-mono">
                Navigasyon
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#kazanimlar"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Neler Kazanacaksın?
                  </a>
                </li>
                <li>
                  <a
                    href="#sosyal-kanit"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Topluluk & Güven
                  </a>
                </li>
                <li>
                  <a
                    href="#danismanlik"
                    className="text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                  >
                    Özel Danışmanlık (VIP)
                  </a>
                </li>
                <li>
                  <a
                    href="#fiyat-kartlari"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Satın Alma Seçenekleri
                  </a>
                </li>
                <li>
                  <a
                    href="#sss"
                    className="hover:text-gold-400 transition-colors"
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Yasal ve Sözleşmeler (ZORUNLU LİNKLER) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest font-mono">
                Yasal & Güvence
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() =>
                      openModal("İade ve İptal Koşulları", "iade")
                    }
                    className="hover:text-gold-400 transition-colors text-left"
                  >
                    İade ve Cayma Koşulları
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openModal(
                        "Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme",
                        "sozlesme"
                      )
                    }
                    className="hover:text-gold-400 transition-colors text-left"
                  >
                    Mesafeli Satış Sözleşmesi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openModal(
                        "Gizlilik Politikası ve KVKK Aydınlatma Metni",
                        "gizlilik"
                      )
                    }
                    className="hover:text-gold-400 transition-colors text-left"
                  >
                    Gizlilik ve KVKK Politikası
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: İletişim & Destek */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest font-mono">
                İletişim & Destek
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:maskulenitesitesi@gmail.com"
                    className="flex items-center gap-2 hover:text-gold-400 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gold-500" />
                    <span>maskulenitesitesi@gmail.com</span>
                  </a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openModal("WhatsApp Destek Hattı", "iletisim")
                    }
                    className="flex items-center gap-2 hover:text-gold-400 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-gold-500" />
                    <span>WhatsApp Canlı Destek</span>
                  </button>
                </li>
                <li className="text-xs text-zinc-500 pt-1">
                  7/24 Kesintisiz Sipariş ve E-posta Desteği
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Scroll Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              © {new Date().getFullYear()} <strong>Vazgeçilmez Olma Sanatı</strong>. Tüm Hakları Saklıdır. İzinsiz kopyalanamaz veya çoğaltılamaz.
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-gold-400 transition-colors"
            >
              <span>Yukarı Çık</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* Interactive Legal Modal */}
      <LegalModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        type={modalState.type}
      />
    </>
  );
}

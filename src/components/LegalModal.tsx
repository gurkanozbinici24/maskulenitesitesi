"use client";

import { X, ShieldCheck } from "lucide-react";
import { ThemeButton } from "./ui/ThemeSystem";
import BlogBody from "./blog/BlogBody";
import { getLegal } from "@/content/legal";

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
            className="min-h-[48px] min-w-[48px] flex items-center justify-center p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          {type === "iade" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">1. Dijital Ürünler (E-Kitap)</h4>
              <p>
                Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin (ğ) bendi uyarınca; elektronik ortamda anında ifa edilen hizmetler ve tüketiciye anında teslim edilen gayrimaddi mallara (e-kitap, dijital dosya indirmeleri) ilişkin sözleşmelerde <strong>cayma hakkı kullanılamaz</strong>.
              </p>
              <h4 className="font-bold text-zinc-100 text-sm">2. Hasarlı ve Hatalı Ürünler</h4>
              <p>
                Kargo taşıması esnasında hasar gören fiziksel kitaplar için kargo görevlisine tutanak tutturulması gerekmektedir. Hatalı basım veya hasarlı ürünler koşulsuz ve ücretsiz olarak yenisiyle değiştirilir.
              </p>
            </>
          )}

          {(type === "sozlesme" || type === "gizlilik") && (() => {
            const doc = getLegal(type === "sozlesme" ? "mesafeli-satis-sozlesmesi" : "gizlilik-politikasi");
            if (!doc) return null;
            return (
              <>
                <a
                  href={`/${doc.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-gold-300 underline underline-offset-2 hover:text-gold-200"
                >
                  Tam sayfada aç
                </a>
                <BlogBody body={doc.body} />
              </>
            );
          })()}

          {type === "iletisim" && (
            <>
              <h4 className="font-bold text-zinc-100 text-sm">Resmi İletişim ve Destek Kanalları</h4>
              <p>
                Siparişleriniz, kargo takibi veya sorularınız için bizimle aşağıdaki kanallardan 7/24 iletişime geçebilirsiniz:
              </p>
              <div className="p-4 rounded-xl bg-matte-950 border border-zinc-800 space-y-2 font-mono text-xs">
                <div><strong>WhatsApp Sipariş & Destek:</strong> +90 (545) 520 79 99</div>
                <div><strong>E-Posta:</strong> maskulenitesitesi@gmail.com</div>
                <div><strong>Instagram:</strong> @maskulenitesitesi</div>
                <div><strong>Çalışma Saatleri:</strong> 7/24 Kesintisiz Destek</div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <ThemeButton
            theme="kitap1"
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="font-bold"
          >
            <span>Kapat</span>
          </ThemeButton>
        </div>
      </div>
    </div>
  );
}


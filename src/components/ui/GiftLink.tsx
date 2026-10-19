import { Gift } from "lucide-react";

/** "İsmine imzalı hediye et" — fiziksel kitap kartlarında sipariş butonunun altında */
export default function GiftLink({ href, className = "" }: { href?: string; className?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track="Hediye Siparişi"
      className={`group inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gold-500/40 px-3 py-2.5 text-xs font-semibold text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10 ${className}`}
    >
      <Gift className="h-4 w-4 transition-transform group-hover:-rotate-12" />
      <span>Hediye olarak gönder · sevdiğinin ismine imzalı</span>
    </a>
  );
}

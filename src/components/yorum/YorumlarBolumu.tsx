import { BadgeCheck, Star } from "lucide-react";
import { KITAP_ADLARI, type KitapKey } from "@/lib/yorum/token";
import { GOSTERIM_ESIGI, ozetCikar, type Yorum } from "@/lib/yorum/depo";

function Yildizlar({ puan, boyut = "h-4 w-4" }: { puan: number; boyut?: string }) {
  return (
    <span className="inline-flex" aria-label={`5 üzerinden ${puan}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${boyut} ${i <= Math.round(puan) ? "fill-gold-400 text-gold-400" : "text-zinc-600"}`} />
      ))}
    </span>
  );
}

const tarih = (t: number) => new Date(t).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" });

function Kart({ y, kitapEtiketi }: { y: Yorum; kitapEtiketi: boolean }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Yildizlar puan={y.puan} />
        <span className="font-semibold text-white">{y.gorunenAd}</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
          <BadgeCheck className="h-3.5 w-3.5" /> Doğrulanmış alıcı
        </span>
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        {tarih(y.tarih)}
        {kitapEtiketi && ` · ${KITAP_ADLARI[y.kitap]}`}
      </p>
      <p className="mt-3 whitespace-pre-line leading-relaxed text-zinc-300">{y.metin}</p>
      {y.cevap && (
        <div className="mt-4 rounded-xl border-l-2 border-gold-500 bg-gold-500/5 px-4 py-3 text-sm">
          <p className="font-semibold text-gold-300">Gürkan Özbinici&apos;nin cevabı</p>
          <p className="mt-1 whitespace-pre-line text-zinc-300">{y.cevap.metin}</p>
        </div>
      )}
    </article>
  );
}

/**
 * Okur değerlendirmeleri. Yeterli sayıda (GOSTERIM_ESIGI) değerlendirme yoksa hiçbir şey göstermez.
 * Yorumlar puandan bağımsız, tarihe göre (en yeni önce) sıralanır.
 */
export default function YorumlarBolumu({ yorumlar, kitaplar }: { yorumlar: Yorum[]; kitaplar: KitapKey[] }) {
  if (yorumlar.length < GOSTERIM_ESIGI) return null;
  const sirali = [...yorumlar].sort((a, b) => b.tarih - a.tarih);
  const o = ozetCikar(sirali);
  const ilk = sirali.slice(0, 6);
  const kalan = sirali.slice(6);
  const cokKitap = kitaplar.length > 1;

  return (
    <section id="degerlendirmeler" className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
      <h2 className="font-cinzel text-[clamp(1.4rem,3vw,1.9rem)] font-bold text-white">Okur Değerlendirmeleri</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="rounded-2xl border border-zinc-800 p-5">
          <div className="flex items-end gap-3">
            <span className="font-mono text-5xl font-black text-white">{o.ortalama.toLocaleString("tr-TR")}</span>
            <span className="mb-2 text-zinc-400">/ 5</span>
          </div>
          <Yildizlar puan={o.ortalama} boyut="h-5 w-5" />
          <p className="mt-2 text-sm text-zinc-400">{o.sayi} doğrulanmış alıcı değerlendirmesi</p>
          <div className="mt-4 space-y-1.5">
            {([5, 4, 3, 2, 1] as const).map((p) => (
              <div key={p} className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-3">{p}</span>
                <Star className="h-3 w-3 fill-zinc-500 text-zinc-500" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-gold-400" style={{ width: `${(o.dagilim[p] / o.sayi) * 100}%` }} />
                </div>
                <span className="w-6 text-right">{o.dagilim[p]}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            Değerlendirmeyi yalnızca kitabı satın alanlar, kendilerine özel gönderilen linkle yapabilir. Yorumlar puanından bağımsız
            yayınlanır ve tarihe göre sıralanır.
          </p>
        </div>
        <div className="space-y-4">
          {ilk.map((y) => (
            <Kart key={y.id} y={y} kitapEtiketi={cokKitap} />
          ))}
          {kalan.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer list-none rounded-xl border border-zinc-700 py-3 text-center text-sm font-semibold text-zinc-200 hover:border-gold-500/60 group-open:hidden">
                Tüm değerlendirmeleri göster ({sirali.length})
              </summary>
              <div className="space-y-4">
                {kalan.map((y) => (
                  <Kart key={y.id} y={y} kitapEtiketi={cokKitap} />
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

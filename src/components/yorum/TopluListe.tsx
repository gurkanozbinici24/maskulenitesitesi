"use client";

import { useEffect, useState } from "react";

export interface TopluSatir {
  etiket: string;
  /** uluslararası biçimde sadece rakamlar, ör. 905321234567; yoksa kayıtlı isimle gönderilir */
  tel?: string;
  link: string;
}

/**
 * Toplu değerlendirme daveti listesi. Her satırda WhatsApp'ı mesaj yazılı halde açan buton var;
 * gönder tuşuna kişi kendisi basar (WhatsApp otomatik toplu mesajı spam sayabilir).
 * Gönderilenler bu tarayıcıda işaretli kalır.
 */
export default function TopluListe({ id, kitap, satirlar }: { id: string; kitap: string; satirlar: TopluSatir[] }) {
  const anahtar = `msk-toplu-${id}`;
  const [yapildi, setYapildi] = useState<Record<string, boolean>>({});
  const [kopyalanan, setKopyalanan] = useState("");

  useEffect(() => {
    try {
      setYapildi(JSON.parse(localStorage.getItem(anahtar) || "{}"));
    } catch {
      /* depolama kapalı olabilir */
    }
  }, [anahtar]);

  const isaretle = (link: string, deger = true) => {
    const yeni = { ...yapildi, [link]: deger };
    setYapildi(yeni);
    try {
      localStorage.setItem(anahtar, JSON.stringify(yeni));
    } catch {
      /* yok say */
    }
  };

  const mesaj = (link: string) =>
    `Merhaba, ${kitap} kitabını okuduysan görüşün benim için çok değerli. Sadece sana özel bu linkten puan verip kısa bir yorum bırakabilirsin, 2 dakika sürer: ${link}\n\nGürkan Özbinici`;

  const kopyala = async (link: string) => {
    try {
      await navigator.clipboard.writeText(mesaj(link));
      setKopyalanan(link);
      isaretle(link);
    } catch {
      setKopyalanan("");
    }
  };

  const tamamSayisi = satirlar.filter((s) => yapildi[s.link]).length;

  return (
    <div className="mt-4">
      <p className="text-sm text-zinc-400">
        {tamamSayisi}/{satirlar.length} gönderildi. Butona basınca WhatsApp mesaj yazılı halde açılır; sen sadece gönder tuşuna bas.
      </p>
      <div className="mt-3 divide-y divide-zinc-800 rounded-xl border border-zinc-800">
        {satirlar.map((s) => {
          const tamam = !!yapildi[s.link];
          return (
            <div key={s.link} className={`flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm ${tamam ? "opacity-50" : ""}`}>
              <span className="font-mono text-zinc-200">
                {tamam ? "✓ " : ""}
                {s.etiket}
              </span>
              <div className="flex items-center gap-2">
                {s.tel ? (
                  <a
                    href={`https://wa.me/${s.tel}?text=${encodeURIComponent(mesaj(s.link))}`}
                    target="_blank"
                    rel="noopener"
                    onClick={() => isaretle(s.link)}
                    className="rounded-lg bg-emerald-500 px-3 py-1.5 font-bold text-black hover:brightness-110"
                  >
                    WhatsApp&apos;ta aç
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => kopyala(s.link)}
                    className="rounded-lg bg-amber-400 px-3 py-1.5 font-bold text-black hover:brightness-110"
                  >
                    {kopyalanan === s.link ? "Kopyalandı ✓" : "Mesajı kopyala"}
                  </button>
                )}
                {tamam && (
                  <button type="button" onClick={() => isaretle(s.link, false)} className="text-xs text-zinc-500 underline">
                    geri al
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        &quot;Mesajı kopyala&quot; çıkan kişilerin numarası listede yok: WhatsApp&apos;ta o kişinin sohbetini açıp mesajı yapıştır.
      </p>
    </div>
  );
}

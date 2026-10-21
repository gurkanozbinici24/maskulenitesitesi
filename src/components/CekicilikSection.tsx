"use client";

import { useState } from "react";
import { Book3DModel } from "./HeroSection";
import { Check, CreditCard, MessageCircle, Truck, Zap } from "lucide-react";
import { BookCountdown, useCekicilikLaunchStatus } from "./ui/BookCountdown";
import { odemeLinki } from "@/lib/odeme/urunler";
import { ThemeBadge, ThemeButton, ThemeSectionHeader } from "./ui/ThemeSystem";
import { CEKICILIK_SANATI_CONFIG, CEKICILIK_PREVIEW_PAGES, KART_ODEME_AKTIF } from "@/config/cekicilikConfig";
import BookPreview from "./BookPreview";
import AnindaTeslim from "./ui/AnindaTeslim";
import FlashTeslim from "./ui/FlashTeslim";
import PhysicalPerks from "./ui/PhysicalPerks";
import GiftLink from "./ui/GiftLink";

/**
 * Çekicilik Sanatı bölümü (id="cekicilik-sanati") — Vazgeçilmez bölümüyle aynı düzen.
 * Solda başlık + 3D kapak; sağda satış öncesi geri sayım, satışta E-Kitap / Fiziksel kartları
 * (butonlar fiyatın hemen altında) ve "İlk Sayfaları Oku".
 */
export default function CekicilikSection() {
  const [focused, setFocused] = useState(false);
  const { isOnSale } = useCekicilikLaunchStatus();
  const { ebook, physical } = CEKICILIK_SANATI_CONFIG.products;

  return (
    <section
      id="cekicilik-sanati"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-matte-950 via-[#12040a] to-matte-950 scroll-mt-24"
    >
      {/* Arka plan kırmızı / zümrüt ışık */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-crimson-700/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-emerald-600/10 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThemeSectionHeader
          theme="kitap2"
          badgeText="2. KİTAP • KADINLAR İÇİN"
          title="Çekicilik"
          highlightText="Sanatı"
          subtitle="Çekim gücü ve arzu duyulan vazgeçilmez kadının ilişki sanatı."
          className="lg:hidden"
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
          {/* Sol sütun: bilgisayarda başlık + 3D kapak */}
          <div className="flex flex-col items-center">
            <div className="hidden lg:block text-center mb-2">
              <ThemeBadge theme="kitap2" status="etiket" className="text-[10px]">
                <span>2. KİTAP • KADINLAR İÇİN</span>
              </ThemeBadge>
              <h2 className="mt-4 font-black uppercase tracking-tight leading-[1.05] text-white text-[2.6rem] xl:text-[2.9rem]">
                Çekicilik <span className="crimson-text-gradient">Sanatı</span>
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Çekim gücü ve arzu duyulan vazgeçilmez kadının ilişki{" "}sanatı.
              </p>
            </div>
            <div
              className="book-3d-scene relative flex flex-col items-center justify-center py-6 lg:py-4"
              onMouseEnter={() => setFocused(true)}
              onMouseLeave={() => setFocused(false)}
              onClick={() => setFocused((f) => !f)}
            >
              <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-crimson-600/40 via-crimson-900/30 to-emerald-500/20 blur-3xl transition-transform duration-500 ${focused ? "scale-125" : ""}`} />
              <Book3DModel
                book="kitap2"
                orientation="left"
                isFocused={focused}
                isDimmed={false}
                sizeClassName="w-[210px] h-[315px] sm:w-[250px] sm:h-[375px] lg:h-[min(390px,40svh)] lg:w-[calc(min(390px,40svh)*0.6667)]"
                imageSizes="(max-width: 1024px) 60vw, 300px"
              />
              <div className="pointer-events-none mt-8 h-4 w-[70%] max-w-[260px] rounded-full bg-crimson-600/40 blur-lg" />
              <div className="pointer-events-none -mt-3 h-3 w-[55%] max-w-[200px] rounded-full bg-black/90 blur-md" />
              <div
                aria-label="175 sayfa"
                className="pointer-events-none relative mt-5 select-none rounded-full border border-crimson-400/60 bg-gradient-to-b from-crimson-600 via-crimson-800 to-crimson-950 px-7 py-2.5 font-cinzel text-sm font-bold uppercase tracking-[0.3em] text-white shadow-[0_0_24px_rgba(220,38,38,0.45),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.5)]"
              >
                175 Sayfa
              </div>
            </div>
          </div>

          {/* Sağ sütun: geri sayım (satış öncesi) / fiyat kartları (satışta) + önizleme */}
          <div>
            {!isOnSale ? (
              <div data-sticky-hide>
                <BookCountdown theme="kitap2" size="lg" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 items-start" data-sticky-hide>
                {/* E-Kitap */}
                <div className="rounded-2xl border border-crimson-600/60 bg-gradient-to-br from-crimson-950/80 to-matte-950 p-5 flex flex-col shadow-kitap2-card">
                  <ThemeBadge theme="kitap2" status="satista" className="self-start text-[10px]">
                    <Zap className="w-3 h-3" />
                    <span>E-KİTAP SATIŞTA</span>
                  </ThemeBadge>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-black text-white">{ebook.price}</span>
                    <span className="text-sm font-bold text-gold-400">TL</span>
                  </div>
                  <p className="mt-1 min-h-[32px] text-xs text-zinc-400">
                    PDF. Kartla ödemede e-postana otomatik teslim.
                  </p>
                  <AnindaTeslim size="sm" metin="E-kitap 7/24 anında e-postanda" className="mt-3 self-start" />
                  <div className="mt-4 space-y-2">
                    {KART_ODEME_AKTIF && (
                      <ThemeButton theme="kitap2" variant="primary" size="md" fullWidth href={odemeLinki(ebook.id)} className="whitespace-nowrap">
                        <CreditCard className="w-4 h-4 flex-shrink-0" />
                        <span>Kartla Hemen Al</span>
                      </ThemeButton>
                    )}
                    <ThemeButton
                      theme="kitap2"
                      variant={KART_ODEME_AKTIF ? "secondary" : "primary"}
                      size="md"
                      fullWidth
                      href={ebook.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap"
                    >
                      <MessageCircle className={`w-4 h-4 flex-shrink-0 ${KART_ODEME_AKTIF ? "text-emerald-400" : ""}`} />
                      <span>{KART_ODEME_AKTIF ? "WhatsApp'tan Al" : "Hemen Al"}</span>
                    </ThemeButton>
                  </div>
                  {KART_ODEME_AKTIF && <FlashTeslim theme="kitap2" size="sm" className="mt-5" />}
                  <ul className="mt-5 space-y-2 border-t border-crimson-500/15 pt-4 text-xs text-zinc-300">
                    {["Tam metin, tüm bölümler", "Telefon, tablet, bilgisayar ve Kindle", "Ömür boyu erişim"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fiziksel */}
                <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-crimson-950/60 to-matte-950 order-first p-5 flex flex-col">
                  <ThemeBadge theme="kitap2" status="satista" className="self-start text-[10px]">
                    <Truck className="w-3 h-3" />
                    <span>FİZİKSEL KİTAP SATIŞTA</span>
                  </ThemeBadge>
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-black text-white">{physical.price}</span>
                    <span className="text-sm font-bold text-gold-400">TL</span>
                  </div>
                  <p className="mt-1 min-h-[32px] text-xs text-zinc-400">
                    Özel koleksiyon baskısı. İsme özel imzalı, ücretsiz kargo, 3 taksite kadar.
                  </p>
                  <AnindaTeslim tip="fiziksel" size="sm" className="mt-3 self-start" />
                  <div className="mt-4 space-y-2">
                    {KART_ODEME_AKTIF && (
                      <ThemeButton theme="kitap2" variant="primary" size="md" fullWidth href={odemeLinki(physical.id)} className="whitespace-nowrap">
                        <CreditCard className="w-4 h-4 flex-shrink-0" />
                        <span>Kartla Hemen Al</span>
                      </ThemeButton>
                    )}
                    <ThemeButton
                      theme="kitap2"
                      variant={KART_ODEME_AKTIF ? "secondary" : "primary"}
                      size="md"
                      fullWidth
                      href={physical.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap"
                    >
                      <MessageCircle className={`w-4 h-4 flex-shrink-0 ${KART_ODEME_AKTIF ? "text-emerald-400" : ""}`} />
                      <span>{KART_ODEME_AKTIF ? "WhatsApp'tan Al" : "Sipariş Ver"}</span>
                    </ThemeButton>
                    <GiftLink href={physical.giftWhatsappUrl} />
                  </div>
                  <PhysicalPerks theme="kitap2" size="sm" className="mt-5" />
                </div>
              </div>
            )}

            {CEKICILIK_PREVIEW_PAGES.length > 0 && (
              <div className="mt-4">
                <BookPreview
                  variant="card"
                  theme="kitap2"
                  heading="İlk Sayfaları Oku"
                  pages={CEKICILIK_PREVIEW_PAGES}
                  cta={
                    isOnSale
                      ? {
                          label: "Hemen Tamamına Eriş – 600 TL",
                          href: KART_ODEME_AKTIF ? odemeLinki(ebook.id) : ebook.whatsappUrl,
                          external: !KART_ODEME_AKTIF,
                        }
                      : {
                          label: "5 Kasım'da Çıkıyor · Haber Al",
                          href: CEKICILIK_SANATI_CONFIG.notifyWhatsappUrl,
                          external: true,
                        }
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

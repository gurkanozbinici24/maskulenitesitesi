"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Satın alma / haber al tıklamalarını ölçer.
 * - Tüm wa.me linkleri ve data-track="..." olan öğeler otomatik takip edilir.
 * - Olay adı: "WhatsApp Tıklama"; etiket = buton yazısı, bölüm = en yakın section id'si.
 * - Meta Pixel veya Google Analytics sonradan eklenirse aynı olay onlara da gönderilir.
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a[href*="wa.me"], [data-track]');
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const etiket = (el.dataset.track || el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60);
      const bolum = el.closest("section")?.id || "diger";
      const tur = /hediye/i.test(etiket) || /hediye/i.test(decodeURIComponent(href))
        ? "hediye"
        : /haber/i.test(decodeURIComponent(href)) || /haber/i.test(etiket)
          ? "haber-al"
          : "siparis";
      const props = { etiket, bolum, tur };
      try {
        track("WhatsApp Tıklama", props);
      } catch {}
      try {
        window.fbq?.("track", "Contact", props);
      } catch {}
      try {
        window.gtag?.("event", "whatsapp_click", props);
      } catch {}
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

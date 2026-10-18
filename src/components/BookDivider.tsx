"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { VAZGECILMEZ_CONFIG } from "@/config/cekicilikConfig";

/**
 * Vazgeçilmez Olma Sanatı'nın detay bölümlerine geçişi gösteren altın ayraç.
 * Çekicilik bölümünden sonra, "Neler Kazanacaksın?" bölümünden önce durur.
 */
export default function BookDivider() {
  return (
    <div
      id="vazgecilmez-derinlik"
      className="relative overflow-hidden bg-gradient-to-b from-matte-950 via-[#140c06] to-matte-950 py-12 sm:py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[100px]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <div className="flex w-full items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/60" />
          <div className="relative h-[66px] w-[44px] flex-shrink-0 overflow-hidden rounded-r-md rounded-l-[2px] border border-gold-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.25)]">
            <Image
              src={VAZGECILMEZ_CONFIG.coverImage}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
            />
          </div>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/60" />
        </div>

        <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.35em] text-gold-500/80 sm:text-[11px]">
          1. Kitap • Erkekler İçin
        </div>
        <h2 className="mt-2 font-cinzel text-[clamp(1.35rem,4vw,2.4rem)] font-bold leading-tight text-white">
          Vazgeçilmez Olma Sanatı&apos;nın{" "}
          <span className="gold-text-gradient">Derinlikleri</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm text-zinc-400">
          Kitabın sana kazandıracakları, gizli arşivden kanunlar ve satın alma seçenekleri.
        </p>
        <ChevronDown className="mt-5 h-5 w-5 animate-bounce text-gold-400/80" />
      </div>
    </div>
  );
}

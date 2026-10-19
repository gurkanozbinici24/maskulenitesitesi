import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/** **kalın** ve [metin](/link) destekli satır içi biçimlendirme */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <strong key={i++} className="font-semibold text-gold-300">
          {m[1]}
        </strong>
      );
    } else {
      out.push(
        <Link key={i++} href={m[3]} className="font-semibold text-gold-400 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-300">
          {m[2]}
        </Link>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function BlogBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-6 text-[1.05rem] leading-[1.85] text-zinc-300 sm:text-lg">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={bi} className="space-y-3">
              {lines.map((l, li) => (
                <li key={li} className="relative pl-6">
                  <span className="absolute left-0 top-[0.8em] h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-gold-400" />
                  {inline(l.slice(2))}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <Fragment key={bi}>
            {lines.map((l, li) => {
              if (l.startsWith("## ")) {
                return (
                  <h2 key={li} className="!mt-12 font-cinzel text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-snug text-white">
                    {l.slice(3)}
                  </h2>
                );
              }
              if (l.startsWith("> ")) {
                return (
                  <blockquote
                    key={li}
                    className="!my-10 border-l-2 border-gold-400 bg-gradient-to-r from-gold-500/10 to-transparent py-4 pl-6 pr-4 font-playfair text-xl italic leading-relaxed text-gold-100 sm:text-2xl"
                  >
                    {inline(l.slice(2))}
                  </blockquote>
                );
              }
              return <p key={li}>{inline(l)}</p>;
            })}
          </Fragment>
        );
      })}
    </div>
  );
}

/** "SATIŞTA" rozetlerindeki canlı nokta: içi kırmızı, yanıp söner (canlı yayın ışığı gibi). */
export default function CanliNokta({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <span className={`relative inline-flex flex-shrink-0 ${s}`} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
      <span className={`relative inline-flex rounded-full bg-red-600 ring-1 ring-black/40 shadow-[0_0_6px_rgba(239,68,68,0.9)] motion-safe:animate-pulse ${s}`} />
    </span>
  );
}

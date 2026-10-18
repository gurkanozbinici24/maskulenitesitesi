/**
 * Bir bölüme kaydırır; bölümün üst boşluğunu atlayıp içeriği sabit menünün hemen altına hizalar.
 * Böylece başlık, kapak ve satın alma kartları aynı ekranda görünür.
 */
export function scrollToSection(id: string, reducedMotion = false): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;

  const header = document.querySelector("header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const paddingTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const y =
    el.getBoundingClientRect().top + window.scrollY + paddingTop - headerBottom - 20;

  window.scrollTo({ top: Math.max(0, y), behavior: reducedMotion ? "auto" : "smooth" });
  return true;
}

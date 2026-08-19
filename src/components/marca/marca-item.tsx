import Link from "next/link";

// Nav lockup — reference sec_011 / frame ~46s: vertical washi kanji left, ultra-condensed
// Latin right, baseline-aligned. spec-design.md §6.3.
interface MarcaItemProps {
  href: string;
  kanji: string;
  gloss: string;
  palavra: string;
  overlay?: boolean;
}

export function MarcaItem({ href, kanji, gloss, palavra, overlay }: MarcaItemProps) {
  const tamanhoPalavra = overlay
    ? "clamp(17px, 2.55vw, 26px)"
    : "clamp(12px, 1.5vw, 16px)";

  return (
    <Link
      href={href}
      className="nav-tipo group inline-flex items-end gap-[0.3em] whitespace-nowrap"
      style={{ fontSize: tamanhoPalavra }}
      title={gloss}
    >
      <span
        className="nav-tipo-jp shrink-0 font-jp leading-none text-washi transition-colors group-hover:text-washi"
        style={{
          writingMode: "vertical-rl",
          fontSize: "0.46em",
          letterSpacing: "0.14em",
        }}
        aria-hidden
      >
        {kanji}
      </span>
      <span
        className="uppercase leading-[0.88] text-washi transition-colors group-hover:text-hinomaru-claro"
        style={{
          fontWeight: 800,
          letterSpacing: "-0.01em",
          fontVariationSettings: "'wdth' 125",
        }}
      >
        {palavra}
      </span>
    </Link>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

// Nav lockup — reference sec_011 / frame ~46s: vertical washi kanji left, ultra-condensed
// Latin right, baseline-aligned. spec-design.md §6.3.
interface MarcaItemProps {
  href: string;
  kanji: string;
  gloss: string;
  palavra: string;
  /** Overrides the default header size — the mobile drawer (`MenuMobile`) renders these
   *  much larger, matching the reference's full-screen nav list. */
  tamanho?: string;
  onClick?: () => void;
  className?: string;
}

// One size everywhere — the homepage's (larger) overlay size, now used on every route.
export function MarcaItem({ href, kanji, gloss, palavra, tamanho, onClick, className }: MarcaItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("nav-tipo group inline-flex items-end gap-[0.3em] whitespace-nowrap", className)}
      style={{ fontSize: tamanho ?? "clamp(17px, 2.55vw, 26px)" }}
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

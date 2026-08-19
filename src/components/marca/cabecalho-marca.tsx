import Link from "next/link";
import { Selo } from "@/components/marca/selo";
import { cn } from "@/lib/utils";

interface CabecalhoMarcaProps {
  className?: string;
  /** Hero overlay — larger lockup like reference sec_011 nav. */
  overlay?: boolean;
}

/** Header logo lockup — red OISHI word + 味 overlay + JP caption. */
export function CabecalhoMarca({ className, overlay }: CabecalhoMarcaProps) {
  const tamanho = overlay ? "clamp(1.85rem, 4.5vw, 2.5rem)" : "clamp(1.5rem, 2.5vw, 1.75rem)";

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 flex-col items-center leading-none", className)}
      aria-label="Oishi Cozinha Japonesa — início"
    >
      <span
        className="relative inline-grid place-items-center"
        style={{ fontSize: tamanho, fontWeight: 900, letterSpacing: "-0.04em", fontVariationSettings: "'wdth' 62" }}
      >
        <span className="relative z-10 col-start-1 row-start-1 select-none text-hinomaru-claro transition-colors group-hover:text-hinomaru">
          OISHI
        </span>
        <span className="pointer-events-none col-start-1 row-start-1 opacity-90" aria-hidden>
          <Selo escala="cabecalho" cor="var(--washi)" />
        </span>
      </span>
      <span
        className="mt-1 font-jp text-washi/75 transition-colors group-hover:text-washi"
        style={{
          fontSize: overlay ? "clamp(0.65rem, 1.2vw, 0.78rem)" : "0.62rem",
          letterSpacing: "0.18em",
        }}
      >
        放題
      </span>
    </Link>
  );
}

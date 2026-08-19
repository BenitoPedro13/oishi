import Link from "next/link";
import { Selo } from "@/components/marca/selo";
import { cn } from "@/lib/utils";

interface CabecalhoMarcaProps {
  className?: string;
  logo?: boolean;
}

// One size everywhere — the homepage's (larger) overlay lockup size, now used
// on every route instead of only `/`.
const InternalLogo = () => {
  return (
    <>
      <span
        className="relative inline-grid place-items-center"
        style={{
          fontSize: "clamp(1.85rem, 4.5vw, 2.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontVariationSettings: "'wdth' 62",
        }}
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
        style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)", letterSpacing: "0.18em" }}
      >
        放題
      </span>
    </>
  );
};

/** Header logo lockup — red OISHI word + 味 overlay + JP caption. */
export function CabecalhoMarca({ className, logo }: CabecalhoMarcaProps) {
  if (logo) {
    return (
      <Link
        href="/"
        className={cn("group inline-flex shrink-0 flex-col items-center leading-none", className)}
        aria-label="Oishi Cozinha Japonesa — início"
      >
        <InternalLogo />
      </Link>
    );
  }

  return (
    <div className={cn("group inline-flex shrink-0 flex-col items-center leading-none", className)}>
      <InternalLogo />
    </div>
  );
}

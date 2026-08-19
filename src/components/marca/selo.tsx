import { AJI_PATH, AJI_VIEWBOX } from "@/lib/marca-paths";

// The four scales — spec-design.md §3.1. Nowhere else does 味 appear.
export type EscalaSelo = "selo" | "cabecalho" | "lockup" | "capitulo" | "fantasma" | "splash";

const TAMANHOS: Record<EscalaSelo, string> = {
  selo: "clamp(20px, 2vw, 28px)",
  cabecalho: "clamp(2.4rem, 5vw, 3.1rem)",
  lockup: "clamp(3.5rem, 14vw, 11rem)",
  capitulo: "clamp(96px, 12vw, 160px)",
  fantasma: "min(70vw, 70vh)",
  splash: "110vw",
};

interface SeloProps {
  escala: EscalaSelo;
  cor?: string;
  opacidade?: number;
  className?: string;
  /** Overrides the preset width/height when the lockup size is driven by context. */
  tamanho?: string;
}

/** 味 — the seal. Always this path, always this viewBox, never re-typed. */
export function Selo({ escala, cor = "currentColor", opacidade, className, tamanho }: SeloProps) {
  const [minX, minY, w, h] = AJI_VIEWBOX.split(" ").map(Number);
  const dim = tamanho ?? TAMANHOS[escala];
  return (
    <svg
      viewBox={`${minX} ${minY} ${w} ${h}`}
      width={dim}
      height={dim}
      style={{ opacity: opacidade, flexShrink: 0 }}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`matrix(1 0 0 -1 0 ${minY * 2 + h})`}>
        <path d={AJI_PATH} fill={cor} />
      </g>
    </svg>
  );
}

import type { CSSProperties, ReactNode } from "react";
import { HINOMARU_GRADIENT_STOPS } from "@/lib/marca-paths";

interface DiscoProps {
  /** A disc always carries something — spec-design.md §3.2, rule 9. */
  children: ReactNode;
  gradiente?: boolean;
  tamanho?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Disco({ children, gradiente = true, tamanho = "clamp(140px, 22vw, 320px)", className, style }: DiscoProps) {
  const fundo = gradiente
    ? `linear-gradient(180deg, ${HINOMARU_GRADIENT_STOPS.map(([o, c]) => `${c} ${o * 100}%`).join(", ")})`
    : "var(--hinomaru)";

  return (
    <div
      className={className}
      style={{
        width: tamanho,
        height: tamanho,
        borderRadius: "50%",
        background: fundo,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

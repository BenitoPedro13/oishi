"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetrasReveladasProps {
  texto: string;
  className?: string;
  style?: React.CSSProperties;
  ativar?: boolean;
  atraso?: number;
  intervalo?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const CHAR_ANIM_S = 0.42;

/**
 * Spreads a line's stagger across its characters so it settles at ~duracaoAlvoMs
 * regardless of length — lines of different lengths (e.g. loader's JP vs EN taglines)
 * still finish together instead of a fixed per-char interval dragging long lines out.
 */
export function intervaloPara(texto: string, duracaoAlvoMs: number) {
  const janela = duracaoAlvoMs / 1000 - CHAR_ANIM_S;
  return Math.max(janela, 0) / Math.max(texto.length - 1, 1);
}

/** Per-character mask reveal — transform/opacity only (no blur) for smooth 60fps. */
export function LetrasReveladas({
  texto,
  className,
  style,
  ativar = true,
  atraso = 0,
  intervalo = 0.028,
}: LetrasReveladasProps) {
  return (
    <span className={cn("inline-flex", className)} style={style} aria-hidden={false}>
      {texto.split("").map((letra, i) => (
        <span
          key={`${letra}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          // whiteSpace: "pre" — a lone space character inside inline-block wrappers
          // otherwise collapses to zero width, running words together.
          style={{ lineHeight: 0.82, whiteSpace: "pre" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "100%", opacity: 0 }}
            animate={ativar ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0, filter: ativar ? "blur(0px)" : "blur(10px)"  }}
            transition={{
              duration: 0.42,
              delay: atraso + i * intervalo,
              ease: EASE,
            }}
          >
            {letra}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

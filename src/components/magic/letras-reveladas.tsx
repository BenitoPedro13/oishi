"use client";

import type { ReactNode } from "react";
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
export const CHAR_ANIM_S = 0.42;

/**
 * Spreads a line's stagger across its characters so it settles at ~duracaoAlvoMs
 * regardless of length — lines of different lengths (e.g. loader's JP vs EN taglines)
 * still finish together instead of a fixed per-char interval dragging long lines out.
 */
export function intervaloPara(texto: string, duracaoAlvoMs: number) {
  const janela = duracaoAlvoMs / 1000 - CHAR_ANIM_S;
  return Math.max(janela, 0) / Math.max(texto.length - 1, 1);
}

export function atrasoLetra(atraso: number, intervalo: number, indice: number) {
  return atraso + indice * intervalo;
}

interface RevelaMascaraProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ativar?: boolean;
  atraso?: number;
  /** Sync with LetrasReveladas letter index when sharing the same atraso + intervalo. */
  indice?: number;
  intervalo?: number;
}

/** Same mask reveal as LetrasReveladas — for Selo, Disco, or any non-text lockup. */
export function RevelaMascara({
  children,
  className,
  style,
  ativar = true,
  atraso = 0,
  indice = 0,
  intervalo = 0.028,
}: RevelaMascaraProps) {
  return (
    <span
      className={cn("inline-block overflow-hidden align-bottom", className)}
      style={{ lineHeight: 0.82, ...style }}
    >
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "100%", opacity: 0 }}
        animate={ativar ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{
          duration: CHAR_ANIM_S,
          delay: atrasoLetra(atraso, intervalo, indice),
          ease: EASE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
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
            animate={ativar ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: CHAR_ANIM_S,
              delay: atrasoLetra(atraso, intervalo, i),
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

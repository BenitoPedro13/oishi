"use client";

import { motion } from "motion/react";

// In the spirit of React Bits' SplitText / Magic UI's text-reveal: each word
// rises out of an overflow-hidden mask on its own stagger. Hand-built
// against our own tokens rather than vendored, so it composes with
// per-word colour (spec-design.md §6.5) without fighting a third
// dependency's API. One-shot, not scroll-linked — permitted under §7.1.
export function TextoDividido({
  texto,
  className,
  atraso = 0,
  cor,
}: {
  texto: string;
  className?: string;
  atraso?: number;
  cor?: string;
}) {
  const palavras = texto.split(" ");
  return (
    <span className={className} style={{ color: cor }}>
      {palavras.map((palavra, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.85,
              delay: atraso + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {palavra}
            {i < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

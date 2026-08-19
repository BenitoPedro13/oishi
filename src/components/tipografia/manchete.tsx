"use client";

import { motion } from "motion/react";

// Positioned-word headlines — spec-design.md §6.5. Below 768px the scatter
// collapses to a normal stacked headline (handled by the `md:` variants
// below); there is no horizontal room for it on a phone.
//
// The reference's own mechanic scrubs each word at its own scroll speed
// (M2, spec-design.md §7.4). This ships as a one-shot in-view reveal
// instead — a scroll-scrubbed version needs the differential-depth stack
// built around real content layers, deferred past this demo pass (see
// docs/tasks/TASK-scaffold-e-fase-0.md). A one-shot reveal is honest under
// §7.1: it never pretends to be the scrubbed mechanic it is not.
export interface PalavraManchete {
  t: string;
  col: string;
  v?: number;
  cor?: string;
}

interface MancheteProps {
  linhas: PalavraManchete[][];
  tamanho?: string;
  className?: string;
}

export function Manchete({ linhas, tamanho = "var(--t-splash)", className }: MancheteProps) {
  return (
    <h1
      className={className}
      style={{ fontSize: tamanho, fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.025em" }}
    >
      {linhas.map((linha, i) => (
        <span key={i} className="flex flex-wrap gap-x-3 md:grid md:grid-cols-12 md:gap-0">
          {linha.map((palavra, j) => (
            <motion.span
              key={j}
              className="md:col-span-full"
              style={{ gridColumn: palavra.col, color: palavra.cor }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: j * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {palavra.t}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

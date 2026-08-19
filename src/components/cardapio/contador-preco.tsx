"use client";

import { useRef, useState } from "react";
import { usarScrub } from "@/lib/motion/usar-scrub";
import { formatarBRL } from "@/lib/formato";
import type { ParDePreco } from "@/lib/conteudo/tipos";
import { campanha } from "@/content/campanha";

// M5 — the price counter. spec-design.md §7.4, §11.3: "the number IS the
// argument." Counts down from the standard price to the zero-waste price
// as the card scrubs through its own entry range. Reduced motion (and the
// initial render, before JS decides otherwise) shows the final value —
// never a mid-count number stuck in the DOM (§7.7).
export function ContadorPreco({
  preco,
  rotulo,
  className,
}: {
  preco: ParDePreco;
  rotulo?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [valor, setValor] = useState(preco.semDesperdicio);

  usarScrub(
    ref,
    ({ gsap }) => {
      const proxy = { v: preco.padrao };
      setValor(preco.padrao);
      gsap.to(proxy, {
        v: preco.semDesperdicio,
        ease: "none",
        onUpdate: () => setValor(Math.round(proxy.v)),
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      });
    },
    [preco.padrao, preco.semDesperdicio],
  );

  return (
    <div ref={ref} className={className}>
      {rotulo && (
        <p
          className="mb-2 text-washi/70"
          style={{ fontSize: "var(--t-rotulo)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          {rotulo}
        </p>
      )}
      <p
        className="tabular text-washi"
        style={{ fontSize: "var(--t-preco)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.95 }}
      >
        {formatarBRL(valor)}
      </p>
      <p
        className="mt-1 text-washi"
        style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}
      >
        sem desperdício
      </p>
      <p className="mt-3 max-w-[38ch] text-washi/70" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
        {campanha.condicao}
      </p>
    </div>
  );
}

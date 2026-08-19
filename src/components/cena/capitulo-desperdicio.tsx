"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ContadorPreco } from "@/components/cardapio/contador-preco";
import { MarquiseCondicao } from "@/components/cardapio/marquise-condicao";
import { campanha } from "@/content/campanha";
import { rodizios } from "@/content/rodizios";

// /` — the waste chapter's always-red content, entered via disco-transicao's
// pinned M3 (§7.4). spec-design.md §11.3 — the largest moment on the site.
export function CapituloDesperdicio() {
  return (
    <section className="relative bg-hinomaru px-4 py-20 sm:px-6" id="desperdicio">
      <div className="mx-auto grid max-w-3xl gap-3 text-center text-washi">
        {campanha.estatisticas.map((e) => (
          <motion.p
            key={e.texto}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: "var(--t-titulo)", fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.1 }}
          >
            {e.texto}
          </motion.p>
        ))}
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {[...rodizios.map((r) => r.preco), rodizios[2].precoIlimitado!].map((preco, i) => (
          <ContadorPreco key={i} preco={preco} rotulo={ROTULOS[i]} className="border-t border-washi/25 pt-5" />
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <MarquiseCondicao />
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/cardapio"
          className="border border-washi/50 px-6 py-3 text-washi transition-colors hover:border-washi hover:bg-washi hover:text-hinomaru"
          style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.02em" }}
        >
          Ver o cardápio completo
        </Link>
      </div>
    </section>
  );
}

const ROTULOS = ["Chisai", "Sem sashimi", "Com sashimi · limite", "Com sashimi · ilimitado"];

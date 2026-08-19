"use client";

import { motion } from "motion/react";
import { Disco } from "@/components/marca/disco";
import { Selo } from "@/components/marca/selo";
import { usePortaLoader } from "@/lib/motion/porta-loader";
import { LetrasReveladas, intervaloPara } from "@/components/magic/letras-reveladas";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Splash words settle at ~500ms — snappier than the loader's 830ms tagline, matching
 *  the existing ~0.45s transitions on the Selo overlay/Disco seal either side of it. */
const REVELA_MS = 500;

const SPLASH = {
  fontSize: "var(--t-splash)",
  fontWeight: 900,
  letterSpacing: "-0.04em",
  lineHeight: 0.82,
} as const;

/** Scene 1 splash lockup — reference sec_011–012 (`NEW SUSHISM` → `OISHI COZINHA`). */
export function HeroTitulo() {
  const { liberado } = usePortaLoader();

  return (
    <div className="relative isolate inline-flex flex-col items-center text-center">
      <LetrasReveladas
        texto="おいしいキッチン"
        ativar={liberado}
        intervalo={intervaloPara("おいしいキッチン", REVELA_MS)}
        className="relative z-20 mb-4 font-jp text-washi"
        style={{ fontSize: "36px", letterSpacing: "0.9rem" }}
      />

      <h1
        className="relative z-10 flex flex-nowrap items-baseline justify-center gap-0 leading-none"
        style={SPLASH}
      >
        {/* Red word — selo is absolute so it cannot stretch the line box */}
        <span className="relative inline-block align-baseline">
          <LetrasReveladas
            texto="OISHI"
            ativar={liberado}
            intervalo={intervaloPara("OISHI", REVELA_MS)}
            className="relative z-[1] inline-block select-none text-hinomaru-claro"
            style={{ fontWeight: 900, fontVariationSettings: "'wdth' 62" }}
          />
          <motion.span
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-[46%]"
            aria-hidden
            initial={{ opacity: 0, scale: 0.96 }}
            animate={liberado ? { opacity: 0.92, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
          >
            <Selo escala="lockup" cor="var(--washi)" tamanho="0.92em" />
          </motion.span>
        </span>

        <LetrasReveladas
          texto="COZINHA"
          ativar={liberado}
          atraso={0.06}
          intervalo={intervaloPara("COZINHA", REVELA_MS)}
          className="inline-block align-baseline text-washi"
          style={{ fontVariationSettings: "'wdth' 70" }}
        />

        <motion.span
          className="relative -bottom-[0.04em] ml-1 inline-flex align-baseline"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={liberado ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, delay: 0.22, ease: EASE }}
          aria-hidden
        >
          <Disco tamanho={36} gradiente className="hidden sm:inline-flex">
            <Selo escala="selo" cor="var(--washi)" />
          </Disco>
        </motion.span>
      </h1>
    </div>
  );
}

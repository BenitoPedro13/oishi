"use client";

import { Disco } from "@/components/marca/disco";
import { Selo } from "@/components/marca/selo";
import { usePortaLoader } from "@/lib/motion/porta-loader";
import {
  HERO_REVELA_MS,
  OISHI_ATRASO,
  OISHI_TEXTO,
  SELO_INDICE,
} from "@/lib/motion/hero-entrada";
import { LetrasReveladas, RevelaMascara, intervaloPara } from "@/components/magic/letras-reveladas";

const OISHI_INTERVALO = intervaloPara(OISHI_TEXTO, HERO_REVELA_MS);

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
        atraso={OISHI_ATRASO}
        intervalo={intervaloPara("おいしいキッチン", HERO_REVELA_MS)}
        className="relative z-20 mb-4 font-jp text-washi"
        style={{ fontSize: "36px", letterSpacing: "0.9rem" }}
      />

      <h1
        className="relative z-10 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 leading-none"
        style={SPLASH}
      >
        <span className="relative inline-block align-baseline whitespace-nowrap">
          <LetrasReveladas
            texto={OISHI_TEXTO}
            ativar={liberado}
            atraso={OISHI_ATRASO}
            intervalo={OISHI_INTERVALO}
            className="relative z-[1] inline-block select-none text-hinomaru-claro"
            style={{ fontWeight: 900, fontVariationSettings: "'wdth' 62" }}
          />
          <span
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-[46%] overflow-hidden"
            aria-hidden
          >
            <RevelaMascara
              ativar={liberado}
              atraso={OISHI_ATRASO}
              intervalo={OISHI_INTERVALO}
              indice={SELO_INDICE}
              className="opacity-90"
            >
              <Selo escala="lockup" cor="var(--washi)" tamanho="0.92em" />
            </RevelaMascara>
          </span>
        </span>

        <LetrasReveladas
          texto="COZINHA"
          ativar={liberado}
          atraso={OISHI_ATRASO + 0.06}
          intervalo={intervaloPara("COZINHA", HERO_REVELA_MS)}
          className="inline-block align-baseline whitespace-nowrap text-washi"
          style={{ fontVariationSettings: "'wdth' 70" }}
        />

        <span className="relative -bottom-[0.04em] ml-1 inline-flex align-baseline" aria-hidden>
          <RevelaMascara
            ativar={liberado}
            atraso={OISHI_ATRASO}
            intervalo={OISHI_INTERVALO}
            indice={SELO_INDICE}
          >
            <Disco tamanho={36} gradiente className="hidden sm:inline-flex">
              <Selo escala="selo" cor="var(--washi)" />
            </Disco>
          </RevelaMascara>
        </span>
      </h1>
    </div>
  );
}

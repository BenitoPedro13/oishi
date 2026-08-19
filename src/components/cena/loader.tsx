"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { LockupLogo } from "@/components/21st/lockup-logo";
import { LetrasReveladas, intervaloPara } from "@/components/magic/letras-reveladas";
import { Tinta } from "@/components/cena/tinta";
import { usePortaLoader } from "@/lib/motion/porta-loader";
import { cn } from "@/lib/utils";
import { CabecalhoMarca } from "../marca/cabecalho-marca";

/** Tagline wipe-reveal duration — measured ~830ms, spec-loader-sequence.md. */
const REVELAR_MS = 830;
/** Hold after the tagline settles — measured ~3.0s, spec-loader-sequence.md. */
const READ_MS = 3000;
const MAX_HOLD_MS = 4800;
/** Content dims fast right as the ink-hole starts growing — measured ≤100ms, simultaneous with wipe onset. */
const APAGAR_MS = 120;
/** Ink-hole exit duration — measured ≥600ms, ~750ms extrapolated to full coverage. */
const SAIDA_S = 0.75;

function computeHold(paintAt: number, hydratedAt: number) {
  const target = paintAt + REVELAR_MS + READ_MS;
  return Math.min(Math.max(target - hydratedAt, 0), MAX_HOLD_MS);
}

export function Loader() {
  const reduzido = useReducedMotion();
  const { liberar } = usePortaLoader();
  // Always starts "visivel" — matches SSR exactly, so client hydration never disagrees
  // with the server on whether this tree renders. The "already seen this session" check
  // is browser-only state and runs in the effect below instead, after hydration.
  const [fase, setFase] = React.useState<"visivel" | "saindo" | "feito">("visivel");
  const saindo = fase === "saindo";

  React.useEffect(() => {
    // Deliberate: this is the one-time post-hydration read of browser-only state the
    // comment above the state declaration describes. Computing it during render would
    // need `typeof window` again — exactly the hydration mismatch this effect avoids.
    if (sessionStorage.getItem("oishi:loader-visto")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFase("feito");
    }
  }, []);

  React.useEffect(() => {
    if (reduzido || fase === "feito") {
      liberar();
    }
  }, [reduzido, fase, liberar]);

  React.useEffect(() => {
    if (reduzido || fase !== "visivel") return;

    const paintEntry = performance.getEntriesByType("paint").find((e) => e.name === "first-contentful-paint");
    const hydratedAt = performance.now();
    const paintAt = paintEntry ? paintEntry.startTime : hydratedAt;
    const hold = computeHold(paintAt, hydratedAt);

    const t1 = setTimeout(() => {
      liberar();
      setFase("saindo");
    }, hold);

    return () => clearTimeout(t1);
  }, [reduzido, fase, liberar]);

  const finalizarSaida = React.useCallback(() => {
    // sessionStorage.setItem("oishi:loader-visto", "1");
    setFase("feito");
  }, []);

  React.useEffect(() => {
    if (fase === "feito") return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [fase]);

  if (fase === "feito" || reduzido) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando Oishi"
      data-fase={fase}
      className={cn(
        "loader fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden",
        // Dropped once the ink-hole exit starts — Tinta's own rect becomes the sole sumi
        // ground+hole layer, so the hero underneath can show through the hole. Keeping
        // this on during "saindo" would paint opaque sumi behind Tinta's hole and hide it.
        !saindo && "bg-sumi",
      )}
    >
      {/* z0 — ghost splash, reference sec_003 (~6% washi) */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
        <span
          className="loader-fantasma absolute select-none text-washi/6"
          style={{
            fontWeight: 900,
            fontSize: "clamp(5rem, 22vw, 12rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            fontVariationSettings: "'wdth' 62",
          }}
        >
          OISHI
        </span>
        <div className="loader-fantasma opacity-[0.06]">
          <Selo escala="fantasma" cor="var(--washi)" />
        </div>
      </div> */}

      <motion.div
        className="relative flex max-w-lg flex-col items-center px-6 text-center"
        initial={false}
        animate={{ opacity: saindo ? 0 : 1, filter: saindo ? "blur(10px)" : "blur(0px)" }}
        transition={{ duration: APAGAR_MS / 1000, ease: [0.4, 0, 1, 1] }}
      >
        <LetrasReveladas
          texto="いらっしゃいませ"
          intervalo={intervaloPara("いらっしゃいませ", REVELAR_MS)}
          className="loader-bloom font-jp text-washi"
          style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 500 }}
        />
        <LetrasReveladas
          texto="Coma tudo o que pedir. Pague menos por isso."
          intervalo={intervaloPara("Coma tudo o que pedir. Pague menos por isso.", REVELAR_MS)}
          className="loader-bloom text-cinza-claro uppercase mt-5"
          style={{
            fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            fontVariationSettings: "'wdth' 88",
          }}
        />
      </motion.div>

      <motion.div
        className="loader-bloom-lockup absolute bottom-[12vh] left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: saindo ? 0 : 1, scale: 1, filter: saindo ? "blur(10px)" : "blur(0px)" }}
        transition={
          saindo
            ? { duration: APAGAR_MS / 1000, ease: [0.4, 0, 1, 1] }
            : { delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <CabecalhoMarca className="scale-[2.77]" />
      </motion.div>
      <Tinta ativo={saindo} variante="revelar" duracao={SAIDA_S} onComplete={finalizarSaida} />
    </div>
  );
}

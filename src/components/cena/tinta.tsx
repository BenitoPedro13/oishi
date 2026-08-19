"use client";

import { motion, useReducedMotion } from "motion/react";
import { TINTA_BLOTS, TINTA_BURACO, TINTA_BURACO_FLECKS, TINTA_FLECKS, TINTA_VIEWBOX } from "@/lib/tinta-paths";
import { cn } from "@/lib/utils";

interface TintaProps {
  ativo: boolean;
  /**
   * "cobrir" — ink grows to cover (route-to-route transitions, Scene 7).
   * "revelar" — ink grows as a hole that reveals content beneath it (loader exit, Scene 0).
   */
  variante?: "cobrir" | "revelar";
  /** Animation duration in seconds. Scene 0 measured ~750ms; Scene 7 default kept at 1.2s. */
  duracao?: number;
  className?: string;
  onComplete?: () => void;
}

const ESCALA_OCULTA = 0.2;
const ESCALA_CHEIA = 3.2;
/** viewBox centre — blot growth is pinned here, matching the reference's near-centre origin. */
const ORIGEM = "320px 280px";

export function Tinta({ ativo, variante = "cobrir", duracao = 1.2, className, onComplete }: TintaProps) {
  const reduzido = useReducedMotion();

  if (reduzido) {
    if (ativo) onComplete?.();
    return null;
  }

  const revelar = variante === "revelar";
  const maskId = revelar ? "oishi-tinta-mask-revelar" : "oishi-tinta-mask-cobrir";
  const corFundo = revelar ? "white" : "black";
  const corBlot = revelar ? "black" : "white";
  // "revelar" (loader exit) is ONE blot growing from centre; "cobrir" (route transition)
  // is the three scattered blots spreading to cover the screen.
  const caminhos = revelar ? [TINTA_BURACO] : TINTA_BLOTS;
  const flecos = revelar ? TINTA_BURACO_FLECKS : TINTA_FLECKS;

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 z-[110]", className)}
      initial={false}
      animate={{ opacity: ativo ? 1 : 0 }}
      transition={{ duration: ativo ? 0 : 0.18 }}
    >
      <svg
        viewBox={TINTA_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-sumi"
        aria-hidden
      >
        <defs>
          <filter id="oishi-tinta-textura" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} seed={7} result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale={32} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={corFundo} />
            <motion.g
              fill={corBlot}
              filter="url(#oishi-tinta-textura)"
              style={{ transformOrigin: ORIGEM }}
              initial={{ scale: ESCALA_OCULTA }}
              animate={{ scale: ativo ? ESCALA_CHEIA : ESCALA_OCULTA }}
              transition={{ duration: duracao, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => {
                if (ativo) onComplete?.();
              }}
            >
              {caminhos.map((d) => (
                <path key={d.slice(0, 12)} d={d} />
              ))}
              {flecos.map((f) => (
                <circle key={`${f.cx}-${f.cy}-${f.r}`} cx={f.cx} cy={f.cy} r={f.r} />
              ))}
            </motion.g>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    </motion.div>
  );
}

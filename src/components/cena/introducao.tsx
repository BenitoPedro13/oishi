"use client";

import { useRef } from "react";
import Image from "next/image";
import { usarScrub } from "@/lib/motion/usar-scrub";
import { TextoDividido } from "@/components/bits/texto-dividido";

// /` — the introduction. spec-design.md §11.2, M2 (§7.4): scattered words
// with small photo chips riding beside them, each drifting at its own
// speed — matching the reference's "A NEW ERA OF SUSHI" beat (frames
// 21-24), not big colliding panels. Not pinned: continuous parallax
// through normal scroll, between the pinned M1 (hero) and M3
// (disco-transicao) either side of it.
export function Introducao() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const colunaRef = useRef<HTMLDivElement>(null);
  const chip1Ref = useRef<HTMLDivElement>(null);
  const chip2Ref = useRef<HTMLDivElement>(null);
  const chip3Ref = useRef<HTMLDivElement>(null);

  usarScrub(
    secaoRef,
    ({ gsap }) => {
      const cfg = { trigger: secaoRef.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(colunaRef.current, { y: -50 }, { y: 50, ease: "none", scrollTrigger: cfg });
      gsap.fromTo(chip1Ref.current, { y: -70 }, { y: 40, ease: "none", scrollTrigger: cfg });
      gsap.fromTo(chip2Ref.current, { y: -20 }, { y: 90, ease: "none", scrollTrigger: cfg });
      gsap.fromTo(chip3Ref.current, { y: -100 }, { y: 30, ease: "none", scrollTrigger: cfg });
    },
    [],
  );

  return (
    <section ref={secaoRef} className="relative overflow-hidden bg-[#1A100D] px-4 py-24 sm:px-6">
      <div
        ref={colunaRef}
        className="pointer-events-none absolute top-1/3 left-4 hidden will-change-transform md:block"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        <span className="font-jp text-washi/40" style={{ fontSize: "1.05rem", letterSpacing: "0.4em" }}>
          放題・品書・予約
        </span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-start gap-x-6 gap-y-10">
        <div className="flex items-start gap-3">
          <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            <TextoDividido texto="RODÍZIO" cor="var(--washi)" className="block" />
          </h2>
          <div ref={chip1Ref} className="mt-2 h-14 w-14 shrink-0 border border-sumi-linha will-change-transform sm:h-20 sm:w-20">
            <Image src="/fotos/painel-prato.webp" alt="" width={80} height={80} className="h-full w-full object-cover" />
          </div>
        </div>

        <h2
          className="ml-auto"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          <TextoDividido texto="DE VERDADE" cor="var(--washi)" atraso={0.1} className="block" />
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-wrap items-start gap-x-6 gap-y-10">
        <div ref={chip2Ref} className="mt-2 h-14 w-14 shrink-0 border border-sumi-linha will-change-transform sm:h-20 sm:w-20">
          <Image src="/fotos/painel-noren.webp" alt="" width={80} height={80} className="h-full w-full object-cover" />
        </div>
        <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
          <TextoDividido texto="SEM FALTAR" cor="var(--washi)" atraso={0.15} className="block" />
        </h2>

        <div className="ml-auto flex items-start gap-3">
          <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            <TextoDividido texto="NADA." cor="var(--hinomaru-claro)" atraso={0.25} className="block" />
          </h2>
          <div ref={chip3Ref} className="mt-2 h-14 w-14 shrink-0 border border-sumi-linha will-change-transform sm:h-20 sm:w-20">
            <Image src="/fotos/painel-prato.webp" alt="" width={80} height={80} className="h-full w-full object-cover" style={{ objectPosition: "60% 40%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

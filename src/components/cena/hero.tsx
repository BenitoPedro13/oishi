"use client";

import { useRef, useState } from "react";
import Noise from "@/components/bits/noise";
import { HeroiMidiaDissolve } from "@/components/cena/heroi-midia-dissolve";
import { HeroTitulo } from "@/components/cena/hero-titulo";
import { BordaRasgada } from "@/components/cena/borda-rasgada";
import { Selo } from "@/components/marca/selo";
import { usarScrub } from "@/lib/motion/usar-scrub";

const FOTOS = [
  { image: "/fotos/hero-neon.webp", focalX: 68, focalY: 40 },
  { image: "/fotos/painel-sashimi-tira.webp", focalX: 50, focalY: 45 },
  { image: "/fotos/painel-fachada.webp", focalX: 50, focalY: 55 },
];

/** No address/CTAs here by design — deliberate reversal of spec-brand.md §2.2's
 *  "above the fold" placement, 2026-08-18. Not yet reconciled with that doc. */
export function Hero() {
  const [reduzido] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const secaoRef = useRef<HTMLElement>(null);
  const fundoRef = useRef<HTMLDivElement>(null);
  const seloFantasmaRef = useRef<HTMLDivElement>(null);

  // Background parallax across the hero's own scroll-out range — spec-design.md §7.4 M2
  // "differential depth", continuing into Introducao's already-scrubbed chips/words so
  // the handoff at BordaRasgada reads as continuous depth, not a hard cut.
  usarScrub(
    secaoRef,
    ({ gsap }) => {
      const cfg = { trigger: secaoRef.current, start: "top top", end: "bottom top", scrub: true };
      gsap.fromTo(fundoRef.current, { y: -20 }, { y: 60, ease: "none", scrollTrigger: cfg });
      gsap.fromTo(seloFantasmaRef.current, { y: -40 }, { y: 130, ease: "none", scrollTrigger: cfg });
    },
    [],
  );

  return (
    <section ref={secaoRef} className="relative flex h-dvh flex-col overflow-hidden px-4 pt-24 pb-8 sm:px-6">
      {/* z0 — colour fallback when photos fail */}
      <div
        ref={fundoRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background:
            "linear-gradient(180deg, var(--hinomaru-escuro) 0%, var(--sumi) 55%), radial-gradient(ellipse 80% 60% at 70% 80%, color-mix(in srgb, var(--hinomaru) 35%, transparent), transparent)",
        }}
        aria-hidden
      />
      <div
        ref={seloFantasmaRef}
        className="pointer-events-none absolute right-[-8vw] bottom-[-10vh] opacity-[0.06] will-change-transform"
        aria-hidden
      >
        <Selo escala="fantasma" cor="var(--washi)" />
      </div>

      {/* z1 — Tier-A photos */}
      {/* <HeroiMidiaDissolve fotos={FOTOS} reducedMotion={reduzido} /> */}

      {/* z2 — dim busy phone photos (reference darkens in-camera; we scrim in CSS) */}
      <div className="hero-foto-dim pointer-events-none absolute inset-0" aria-hidden />

      {/* z3 — ink scrim: top (nav), centre (splash), bottom (CTAs) */}
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden />

      {/* A/B test — components/bits/SOURCES.md: live grain vs. the static NoiseTexture
          it replaces here, on top of images/below text, per readability question. */}
      {/* <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={25} /> */}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <HeroTitulo />
      </div>

      {/* Hero → next-section seam — sec_018 shows no pin/inset, just a ragged ink-torn
          boundary at the handoff. Static (not scroll-scrubbed): spec-scene-hero.md. */}
      <BordaRasgada />
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Disco } from "@/components/marca/disco";
import { usarScrub } from "@/lib/motion/usar-scrub";

// M3 — the disc that grows into a full-bleed red field. spec-design.md
// §3.2, §7.4. Pinned and scrubbed, not a one-shot scale-in: the circle
// starts at chapter size and scales past the viewport as the section
// unpins into the always-red content that follows (capitulo-desperdicio.tsx).
export function DiscoTransicao() {
  const secaoRef = useRef<HTMLDivElement>(null);
  const discoRef = useRef<HTMLDivElement>(null);
  const rotuloRef = useRef<HTMLDivElement>(null);

  const ESCALA_FINAL = 16;

  usarScrub(
    secaoRef,
    ({ gsap }) => {
      gsap.set(discoRef.current, { transformOrigin: "50% 50%" });
      gsap.set(rotuloRef.current, { transformOrigin: "50% 50%" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: secaoRef.current,
          start: "top top",
          end: "+=130%",
          scrub: true,
          pin: true,
        },
      });
      tl.to(discoRef.current, { scale: ESCALA_FINAL, ease: "none" }, 0);
      tl.to(rotuloRef.current, { scale: 1 / ESCALA_FINAL, ease: "none" }, 0);
    },
    [],
  );

  return (
    <section ref={secaoRef} className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-sumi">
      <div ref={discoRef} className="will-change-transform">
        <Disco tamanho="clamp(140px, 22vw, 320px)">
          <div ref={rotuloRef} className="text-center text-washi will-change-transform" style={{ fontWeight: 800 }}>
            <span className="font-jp block" style={{ fontSize: "1.1rem" }}>
              無駄
            </span>
            <span className="block uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}>
              Desperdício
            </span>
          </div>
        </Disco>
      </div>
    </section>
  );
}

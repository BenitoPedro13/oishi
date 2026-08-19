"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Contexto = { el: HTMLElement; gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger };

/**
 * The one ScrollTrigger entry point — spec-design.md §7.4. `montar` is only
 * called when the user has not requested reduced motion; every scroll
 * mechanic's *reduced* state is its normal static JSX, so skipping the
 * effect here is the whole mechanism (§7.7) — no call site re-implements it.
 */
export function usarScrub(
  ref: RefObject<HTMLElement | null>,
  montar: (ctx: Contexto) => void,
  deps: unknown[] = [],
  ativo = true,
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !ativo) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      montar({ el, gsap, ScrollTrigger });
    },
    { scope: ref, dependencies: [...deps, ativo] },
  );
}

"use client";

import { useRef } from "react";
import { Selo } from "@/components/marca/selo";
import { construirLinkWhatsapp } from "@/lib/contato/whatsapp";
import { usarScrub } from "@/lib/motion/usar-scrub";
import { cn } from "@/lib/utils";
import type { Restaurante } from "@/lib/conteudo/tipos";

// The two kanji, each occupying the left/right half of the title's width —
// mirrors `.cm_footer_lBlk_jp_l` / `_r` positioning `index.html:1722-1733`.
// Oishi's own `連絡` (spec-design.md §6.3–§6.4), not the reference's `接点`
// — TASK-scene-11-contato.md §2's decision stands.
const KANJI_ESQ = "連";
const KANJI_DIR = "絡";

/** The kanji-behind-title + seal composition — `.cm_footer_lBlk`'s content,
 *  `index.html:1721-1739`. Rendered twice by `BandaContato` (top/bottom) so
 *  the hover roll (`.js_tAnimationUnit_top/_bottom`) can swap identical
 *  copies — same trick the reference uses, `style.css:1371-1465`. */
function ComposicaoContato() {
  return (
    <div className="relative" style={{ fontSize: "var(--t-splash)", paddingBottom: "0.34em" }}>
      <div
        aria-hidden="true"
        className="font-jp pointer-events-none absolute top-[38%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-between select-none"
        style={{ width: "1.05em" }}
      >
        <span style={{ fontSize: "0.62em", fontWeight: 700, color: "var(--sumi)", lineHeight: 1 }}>{KANJI_ESQ}</span>
        <span style={{ fontSize: "0.6em", fontWeight: 700, color: "var(--sumi)", lineHeight: 1 }}>{KANJI_DIR}</span>
      </div>
      <span
        className="relative block"
        style={{ fontSize: "1em", fontWeight: 800, color: "var(--washi)", letterSpacing: "-0.03em", lineHeight: 0.82 }}
      >
        CONTATO
      </span>
      {/* Seal mark, bottom-right of the title — stands in for the reference's
          own footer_logo.svg stamp (`.cm_footer_lBlk_logo`), which is
          new-sushism.jp's own mark and isn't reused here. */}
      <span className="absolute" style={{ right: "-0.02em", bottom: "0.34em" }}>
        <Selo escala="selo" cor="var(--sumi)" tamanho="0.12em" />
      </span>
      <span
        className="absolute bg-washi text-hinomaru"
        style={{ left: 0, bottom: 0, fontSize: "0.055em", fontWeight: 800, letterSpacing: "0.03em", padding: "0.35em 0.7em" }}
      >
        Chamar no WhatsApp
      </span>
    </div>
  );
}

/**
 * Scene 11 — the full-bleed red CONTACT close. `docs/spec-design.md` §11.7,
 * `docs/tasks/TASK-banda-contato-refino.md`. Shared between `/` and `/contato`.
 * `restaurante` is a prop, not a `content/` import: this is a client component
 * (the hover roll and the bottom strip both need client-side motion), and
 * only Server Components may read the content seam directly.
 */
export function BandaContato({ className, restaurante }: { className?: string; restaurante: Restaurante }) {
  const bandaRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);
  const ano = new Date().getFullYear();

  usarScrub(
    bandaRef,
    ({ gsap }) => {
      // Mirrors the reference's own `.cm_slider` scrub — `main.js`:
      // `gsap.to(this, {x: c, scrollTrigger: {trigger, start: "top bottom", end: "bottom top", scrub: .6}})`.
      gsap.to(faixaRef.current, {
        xPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: bandaRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    [],
  );

  return (
    <section ref={bandaRef} className={cn("relative overflow-hidden bg-hinomaru px-4 py-24 sm:px-6 sm:py-40", className)}>
      <div className="pointer-events-none absolute -top-[10vw] -left-[8vw] opacity-15" aria-hidden="true">
        <Selo escala="fantasma" cor="var(--sumi)" />
      </div>

      {/* The whole kanji+CONTATO+seal block is the one CTA, wrapped in a
          single link — mirrors `<a href="mailto:...">` wrapping the entire
          `.cm_footer_lBlk`, `index.html:1720-1761`. The bottom copy is an
          `aria-hidden` duplicate that rolls up on hover; screen readers only
          ever see the top copy's text once. */}
      <a
        href={construirLinkWhatsapp("Olá! Vim pelo site do Oishi.")}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 block overflow-hidden"
      >
        <div className="relative motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:-translate-y-full">
          <ComposicaoContato />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-y-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:translate-y-0"
        >
          <ComposicaoContato />
        </div>
      </a>

      {/* `.cm_footer_rBlk` — SNS list is commented out in the reference
          (`index.html:1764-1768`), not built; the copyright line is. */}
      <div className="relative z-10 mt-16 flex justify-end">
        {/* --washi on --hinomaru measures 5.29:1, AA — spec-design.md §4.2 */}
        <p className="text-washi text-right" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em" }}>
          © {ano} {restaurante.nomeCompleto}
        </p>
      </div>

      <div
        ref={faixaRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4vw] left-0 flex w-max leading-none whitespace-nowrap select-none will-change-transform"
        style={{ fontSize: "clamp(3rem, 9vw, 8rem)", fontWeight: 800, color: "var(--sumi)", opacity: 0.35, letterSpacing: "-0.02em" }}
      >
        {[0, 1, 2].map((rep) => (
          <span key={rep} className="font-jp pr-12">
            OISHI COZINHA JAPONESA・連絡・OISHI COZINHA JAPONESA・連絡・
          </span>
        ))}
      </div>
    </section>
  );
}

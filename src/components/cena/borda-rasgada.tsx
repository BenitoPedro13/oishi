/**
 * Static ink/torn-paper boundary — the Hero → next-section seam. `spec-scene-hero.md`
 * (sec_018): the reference has no pinned/shrinking inset here, just a ragged, speckled
 * boundary line at the handoff. Reuses the `feTurbulence` + `feDisplacementMap` technique
 * already validated for the loader's ink-hole (`tinta.tsx`), applied to a static edge
 * shape instead of an animated mask — no scroll-scrub, so no reduced-motion case needed.
 */
export function BordaRasgada() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 text-sumi sm:h-10" aria-hidden>
      <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <filter id="oishi-borda-textura" x="-10%" y="-200%" width="120%" height="500%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.09" numOctaves={2} seed={11} result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale={22} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect x="0" y="24" width="1000" height="56" fill="currentColor" filter="url(#oishi-borda-textura)" />
      </svg>
    </div>
  );
}

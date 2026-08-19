# Vendored components

Copied byte-identical (only the CSS import path changed), restyled through
tokens at the call site only — spec-design.md §8.1, §13 rule 16.

| Component | Source | Notes |
|---|---|---|
| `morph-slider.tsx` / `morph-slider.css` | `ART'hur/components/MorphSlider.tsx` (sibling project on this machine), itself adapted from React Bits' MorphSlider "melt" shader | WebGL (`ogl`) displacement-morph transition between images. Used in `components/cena/hero.tsx` to cycle the hero photograph — the brand fact it carries: Oishi's own dish/interior photos, not a static frame, get the same production-grade transition the reference video's hero footage has. Falls back to a plain crossfade under `prefers-reduced-motion` or if WebGL is unavailable. |
| `noise.tsx` / `noise.css` | https://reactbits.dev/animations/noise (`DavidHDev/react-bits`, `src/content/Animations/Noise/`) | Canvas, per-frame randomised film grain (vs. the static SVG turbulence in `components/magic/noise-texture.tsx`). Trialled in `components/cena/hero.tsx` between the photo layer and the title as a readability aid over busy phone photos — Scene 1's spec already cites grain (`spec-reference-scenes.md`), this swaps the static version for a live one to test whether the flicker reads better against Oishi's mixed-source Tier-A images. |

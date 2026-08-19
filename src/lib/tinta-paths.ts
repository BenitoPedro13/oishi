// Traced ink-blot shapes for the sumi-e page transition — spec-design.md §7.6.
export const TINTA_BLOTS = [
  "M 120 80 C 40 60, 20 140, 80 200 C 140 260, 220 240, 280 180 C 340 120, 300 40, 200 50 Z",
  "M 400 120 C 320 90, 280 180, 340 260 C 400 340, 520 300, 560 200 C 600 100, 480 80, 400 120 Z",
  "M 200 320 C 120 280, 100 400, 180 480 C 260 560, 380 520, 420 400 C 460 280, 320 260, 200 320 Z",
] as const;

/**
 * Small splatter droplets scattered around the blots' perimeter — the loader's ink-hole
 * reveal (Tinta `variante="revelar"`) measured with a speckled, torn edge, not a smooth
 * curve. See `docs/spec-loader-sequence.md`. Combined with the `feTurbulence` filter in
 * `tinta.tsx` rather than a raster asset (`TASK-loader-ink-reveal.md` §6, out of scope).
 */
export const TINTA_FLECKS = [
  { cx: 40, cy: 40, r: 10 },
  { cx: 10, cy: 160, r: 6 },
  { cx: 60, cy: 260, r: 14 },
  { cx: 330, cy: 30, r: 8 },
  { cx: 610, cy: 140, r: 12 },
  { cx: 590, cy: 260, r: 7 },
  { cx: 100, cy: 500, r: 9 },
  { cx: 260, cy: 540, r: 6 },
  { cx: 460, cy: 480, r: 11 },
  { cx: 500, cy: 340, r: 5 },
  { cx: 20, cy: 350, r: 8 },
  { cx: 380, cy: 500, r: 6 },
] as const;

/**
 * Single blob centred on the viewBox — the loader's ink-hole reveal (Tinta
 * `variante="revelar"`) is ONE blot growing from near-centre (spec-loader-sequence.md),
 * not the three scattered `TINTA_BLOTS` above. Those are deliberately spread apart for
 * the "cobrir" page-transition spread; scaled from a single shared origin they'd fly
 * further apart rather than merge, which is wrong for a single growing hole.
 */
export const TINTA_BURACO =
  "M 320 180 C 250 190, 200 240, 220 300 C 240 370, 300 400, 340 390 C 420 380, 440 300, 420 240 C 400 180, 370 170, 320 180 Z";

/** Splatter droplets kept close around `TINTA_BURACO`'s centre (320, 280). */
export const TINTA_BURACO_FLECKS = [
  { cx: 200, cy: 200, r: 8 },
  { cx: 440, cy: 190, r: 10 },
  { cx: 460, cy: 340, r: 7 },
  { cx: 200, cy: 380, r: 9 },
  { cx: 320, cy: 430, r: 6 },
  { cx: 180, cy: 300, r: 11 },
  { cx: 430, cy: 420, r: 5 },
  { cx: 340, cy: 150, r: 7 },
] as const;

export const TINTA_VIEWBOX = "0 0 640 560";

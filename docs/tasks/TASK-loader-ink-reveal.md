# TASK — Loader ink-reveal exit

> Per `AGENTS.md` §1. Frame evidence: `docs/spec-loader-sequence.md`, sourced from
> `references/websites/loading-new-sushism.mov` (dedicated 60fps capture, extracted to
> `references/websites/loading-new-sushism/frames/`).

---

## 1. Current scenario

- `src/components/cena/loader.tsx` exits by animating the **entire loader `<motion.div>`'s
  opacity** from 1→0 over a flat 900ms (`FADE_MS`) — a plain cross-dissolve. The hero fades
  up underneath a dissolving grey veil.
- `src/components/cena/tinta.tsx` already implements an ink-mask scale reveal (`0.2 → 3.2`
  over 1.2s) but is **never imported or rendered by `loader.tsx`** — it currently only
  exists for use elsewhere (Scene 7, route-to-route transitions).
- `src/lib/tinta-paths.ts` holds three smooth cubic-bezier blob paths — no speckled/torn
  edge detail.
- The JP/EN tagline entrance uses `BlurFade` (whole-line blur + translate-Y + opacity,
  staggered by a 400ms delay) — a "materialize" family of motion, not a reveal-wipe.
- Per `docs/spec-loader-sequence.md`, the reference:
  - Reveals the tagline via a **left-to-right masked wipe with a soft blurred leading
    edge** over ~830ms (glyph-by-glyph, not whole-line blur).
  - Holds ~3.0s.
  - Exits via an **organic, speckled/torn-edge ink blot growing from near-centre**, hero
    visible progressively *through* the hole, measured ≥600ms (~750ms extrapolated to
    full coverage) — not a cross-dissolve.
  - Total loader ≥ ~4.4s, correcting the previous "0–1400ms" figure.
- `Tinta`'s existing mask polarity (white blot on black = "ink appears") is correct for
  Scene 7 (ink spreading to *cover* the screen during a route change) but is the **wrong
  polarity** for the loader, which needs the blot to act as a **hole** revealing the
  already-mounted hero beneath it, growing outward from near-centre.
- `src/components/cena/hero.tsx` confirmed: the hero's photo layer (`HeroiMidiaDissolve`)
  is already mounted and painted underneath the loader regardless of `liberado` state —
  only the CTA block and scroll-scrub pin gate on it. No mount-ordering change needed for
  the ink hole to have real content to reveal.
- An undocumented `loader-fantasma` ghost layer (6%-opacity giant "OISHI" wordmark + 6%
  ghost `Selo` disc) exists in current code with no counterpart in the reference tape or
  in `spec-reference-scenes.md`'s "What it shows" list. Not contradicted by the reference
  (the reference simply lacks this exact flourish) — kept as-is, treated as a deliberate
  Oishi-only addition rather than removed on spec-fidelity grounds alone.

---

## 2. Planned changes

| Concern | From | To |
|---|---|---|
| Exit mechanism | Whole-div opacity fade, 900ms | `Tinta` ink-hole reveal, ~750ms, growing from centre, hero visible through it |
| `Tinta` mask polarity | Single polarity (ink = visible) | New `variante: "cobrir" \| "revelar"` prop — `"cobrir"` keeps existing route-transition behaviour (ink grows to cover); `"revelar"` inverts the mask so the blot is a hole (loader exit) |
| `Tinta` coverage guarantee | Whole SVG scaled via `vmax` box + `scale` transform (only reliably covers viewport once scale is large) | Outer `<svg>` fixed to `h-full w-full` with `preserveAspectRatio="xMidYMid slice"` (always covers viewport); only the mask's blot `<g>` scales from near-zero, `transform-origin` pinned to viewBox centre. Fixes a latent coverage gap at low scale and decouples "always cover" from "hole size" |
| Blot edge texture | Smooth cubic-bezier paths only | Add an SVG `feTurbulence` + `feDisplacementMap` filter on the mask's blot group, plus a `TINTA_FLECKS` set of small scattered circles, to approximate the reference's speckled/torn edge without a new raster asset pipeline |
| Tagline entrance | `BlurFade`, whole-line blur/translate/opacity, JP delay 150ms / EN delay 550ms | Left-to-right masked wipe (`mask-image: linear-gradient(...)` with an animated `--revelar` custom property, soft trailing edge baked into the gradient stop), ~830ms |
| Timing constants | `COPY_SETTLE_MS = 2100`, `READ_MS = 2400`, `FADE_MS = 900` | `COPY_SETTLE_MS = 830` (matches measured wipe), `READ_MS = 3000` (matches measured hold), exit driven by `Tinta`'s `onComplete` instead of a second fixed timeout |
| Exit completion | Fixed `setTimeout(hold + FADE_MS)` | `Tinta`'s `onAnimationComplete` → `onComplete` callback drives `setFase("feito")` + `sessionStorage` write, so completion tracks the real animation instead of a guessed duration |

---

## 3. Why

The measured reference (`spec-loader-sequence.md`) shows a materially different exit
*mechanism*, not just a different duration — an ink-hole reveal vs. a cross-dissolve is a
different visual family entirely, and this is very likely what the user meant by "the hero
was being a problem." `Tinta` already exists and is the right primitive; it was simply
never wired into the loader and has the wrong mask polarity and edge texture for this use.
Fixing the polarity via a `variante` prop (rather than forking a second component) keeps
one hand-written ink primitive serving both Scene 0 and Scene 7, per this repo's "one
primitive, no duplicate builders" convention.

---

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/lib/tinta-paths.ts` | modify | add `TINTA_FLECKS` |
| `src/components/cena/tinta.tsx` | modify | `variante` prop, viewport-locked coverage, turbulence filter, flecks |
| `src/components/cena/loader.tsx` | modify | wire `Tinta variante="revelar"`, masked-wipe tagline reveal, retimed constants, completion driven by `onComplete` |

`src/components/cena/hero.tsx` — **not modified**; confirmed already correct (hero mounts
under the loader regardless of gate state).

---

## 5. Verification

1. `pnpm build` / `pnpm lint` pass.
2. Dev server, `/`, first visit (cleared `sessionStorage`): tagline wipes in left-to-right
   over ~830ms, holds, then an ink-hole opens from centre revealing the hero photo through
   a ragged (not smooth-circle) edge, full reveal by ~750ms after exit starts.
3. Repeat visit in the same session: loader does not render (`sessionStorage` gate
   unchanged).
4. `prefers-reduced-motion`: loader skipped entirely, hero renders immediately (unchanged
   existing behaviour, `Tinta` already early-returns under reduced motion).
5. Manual visual compare against `references/websites/loading-new-sushism/frames/full/`
   frames 183–201 and the two contact sheets.
6. Scene 7 (route ink transitions, wherever `Tinta variante="cobrir"` — the default — is
   used) is visually unchanged from before this task.

---

## 6. Out of scope

- Replacing the vector blot/flecks with a licensed/sourced raster splatter texture (the
  turbulence-filter approach is the pragmatic hand-written substitute; a raster asset
  pipeline is a bigger, separate decision).
- Removing or altering the `loader-fantasma` ghost layer — kept as-is, flagged for the
  user's own future call, not touched by this task.
- Re-deriving `computeHold()`'s ready-state gating logic — only its two input constants
  are retimed to match the measured reference; the paint-gated "hold until ready"
  mechanism itself is unchanged.
- Scenes 1–11 of `spec-reference-scenes.md` (separate, parallel work).
- Commit (user rule: commit only when asked).

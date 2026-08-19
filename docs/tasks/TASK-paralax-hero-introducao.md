# TASK — Parallax between Hero and Introdução

## 1. Current scenario

`src/components/cena/hero.tsx` (`"use client"`) renders the hero as flat, static
layers: a gradient/radial background div (z0), a ghost `味` `Selo` mark pinned to the
bottom-right corner (z1, opacity 0.06), a dim/scrim overlay (z2/z3), `HeroTitulo` (z10),
and the static `BordaRasgada` ink-torn seam (z20, `spec-scene-hero.md` sec_018 — the seam
graphic itself is explicitly **not** scroll-scrubbed).

`src/components/cena/introducao.tsx` already implements the M2 "differential depth"
mechanic (`spec-design.md` §7.4 M2, §11.2): its headline words and three photo chips are
each scrubbed at a different `y` range via `usarScrub`/GSAP `ScrollTrigger`, gated by
`prefers-reduced-motion` (the gating lives once inside `usarScrub`, §7.7).

The hero's own background layers (gradient, ghost mark) currently have **no** scroll
motion — they sit static while `Introducao`'s layers start moving the instant the section
enters. The handoff between the two sections (the scroll range while the hero is scrolling
out from under the viewport, up to `BordaRasgada`) has no parallax, so the transition reads
as a hard cut rather than a continuation of the depth Introducao establishes on its own.

## 2. Planned changes

Add a scrubbed parallax to the hero's two background layers (gradient/radial `div`, ghost
`Selo` `div`), driven by the **same** `usarScrub` hook Introducao already uses — no new
motion system. The trigger spans the hero's own scroll-out range (`start: "top top", end:
"bottom top"`), i.e. exactly the scroll distance during which the hero leaves the viewport
and Introducao arrives underneath it. Background layers drift at different rates (ghost
mark faster than the gradient field), continuing directly into Introducao's own
already-scrubbed chips/words so the depth feels continuous across the seam rather than
resetting.

`HeroTitulo` and `BordaRasgada` are left untouched — the seam graphic stays the
deliberately static element `spec-scene-hero.md` calls for; only the layers behind/around
it move.

**Alternatives considered:**

- **Pure CSS scroll-driven animation** (`animation-timeline: scroll()`/`view()`, no JS).
  Rejected: the project already has one designated scroll-motion pipeline — GSAP +
  ScrollTrigger via the single `usarScrub` entry point (stack table, §2.2) — and every
  other scroll mechanic (M1–M5) goes through it. A second, CSS-only mechanism would
  duplicate the `prefers-reduced-motion` gating that `usarScrub` already centralizes, and
  browser support for scroll-linked CSS animations is still uneven. Not worth a second
  system for one effect.
- **Server Component / no-JS-only parallax.** Not applicable — scroll-linked motion is
  inherently a client runtime concern. The project's no-JS story is not "parallax without
  JS," it's "the static final-frame layout is a complete, functional site" (`spec-design.md`
  §7.7), which this change doesn't touch: with JS disabled or reduced-motion set, the
  background layers simply render at their static rest position, same as today.
- **Extending the pinned M1 clip-path (hero inset) across the seam.** Rejected: M1 is a
  separate, already-specified mechanic (`spec-design.md` §7.4) currently disabled
  (`HeroiMidiaDissolve` is commented out in `hero.tsx`) and pins the hero; layering a second
  pin/scrub on top would conflict with it. Out of scope here.

## 3. Why

`spec-design.md` §7.4 M2 already establishes "differential depth" as this site's parallax
language and requires it for `/`'s intro. The hero currently has zero motion on its own
background, so Introducao's parallax starts from nothing — this closes that gap using the
existing mechanism instead of inventing a new one, keeping `usarScrub` as the single
ScrollTrigger entry point (§8) and reduced-motion/no-JS handling centralized in one place.

## 4. Affected files

| File | Change type | Notes |
|------|-------------|-------|
| `src/components/cena/hero.tsx` | modified | add `secaoRef`/`fundoRef`/`seloFantasmaRef`, wire `usarScrub` with a `ScrollTrigger` spanning `top top` → `bottom top` of the hero section |

## 5. Verification

- `pnpm lint` passes with no new warnings on `hero.tsx`.
- `pnpm build` succeeds (Next.js type-checks client components at build time).
- Manual: `pnpm dev`, scroll from hero into Introducao — the gradient field and ghost
  `味` mark visibly drift at different rates while the hero exits, continuing into
  Introducao's existing chip/word motion with no visual reset at the `BordaRasgada` seam.
- With OS-level "reduce motion" enabled, the hero background renders at its static rest
  position — no transform applied (`usarScrub` skips the effect entirely, per §7.7).
- No layout shift: background layers stay inside the section's `overflow-hidden` bounds
  at both transform extremes.

**Out of scope:** re-enabling `HeroiMidiaDissolve`/M1 pinned clip-path, any change to
`BordaRasgada` (stays static per `spec-scene-hero.md`), and Introducao's own already-built
M2 layers (untouched).

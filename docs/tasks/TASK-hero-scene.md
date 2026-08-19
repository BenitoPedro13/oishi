# TASK — Hero (Scenes 1–2): retire fabricated pin, add evidenced torn-edge seam

> Per `AGENTS.md` §1. Frame evidence: `docs/spec-scene-hero.md`, sourced from
> `references/websites/new-sushism/frames/sec/` and `.../frames/ranges/hero_*.jpg`.

---

## 1. Current scenario

- `src/components/cena/hero.tsx:28–47` implements a GSAP `ScrollTrigger` pin
  (`start: "top top"`, `end: "+=90%"`, `pin: true`) that scrubs
  `clipPath: inset(14% 26% 30% 8%)` and `scale: 1.06` — the exact numbers from
  `spec-reference-scenes.md`'s original "Scene 2 — Hero inset M1" entry.
- `docs/spec-scene-hero.md` (written today) traced the full `hero_001`–`hero_050`
  evidence this entry was built from and found it **is not a scroll trace at all** — it's
  a page-reload captured mid-recording (full hero → loader replaying → the loader's own
  ink-hole exit → full hero again), the same kind of low-fps misattribution already
  caught once for the loader itself. **The pinned/shrinking inset panel this code
  implements has no supporting evidence.**
- The same doc traced the *real*, monotonic scroll capture (`sec_015`→`sec_017`→`sec_018`)
  and found something different and simpler: **no pin, no floating inset frame**. The hero
  scrolls off normally; the boundary between the hero photo and the next section is a
  **ragged, speckled ink/torn-paper edge** — the same sumi-e motif as the loader's
  ink-hole, applied as a static section-transition seam rather than a scroll-scrubbed
  pinned mechanic.
- `src/app/globals.css:363–372` (`.recorte-heroi`) encodes the same discredited numbers as
  the reduced-motion fallback state.
- Per the same doc, **Scene 1 itself (nav, splash lockup, media crossfade) already
  matches the reference closely** — `cabecalho.tsx`'s kanji-over-word nav pattern and
  `hero-titulo.tsx`'s red-word/white-ink-seal/white-word lockup grammar are both already
  structurally correct. No changes needed there.
- One small, independently-evidenced discrepancy found in passing (not part of this
  task's scope, logged under §6): the reference's own nav bar reads `接点` for
  "CONTACT" (confirmed via `spec-scene-footer.md` on two full-resolution frames), but
  `cabecalho.tsx:14`'s `Contato` nav item currently uses `連絡`.

---

## 2. Planned changes

| Concern | From | To |
|---|---|---|
| `hero.tsx`'s `usarScrub` pin call | GSAP `ScrollTrigger` pin, scrubbed `clipPath`/`scale` to unevidenced numbers | Removed entirely — no scroll-pin mechanic ships without real evidence backing its numbers |
| `.recorte-heroi` (`globals.css`) | Base rule `clip-path: inset(0%)`; reduced-motion override to the fabricated final inset state | Removed (was only ever in service of the pin mechanic being retired) |
| Hero → next-section boundary | Hard rectangular cut (section just ends) | A static (not scroll-scrubbed) ragged ink/torn-paper edge divider at the hero's bottom, `--sumi`-filled, using the same `feTurbulence`+`feDisplacementMap` technique already validated for the loader's ink-hole (`tinta.tsx`) — this is the one piece of the correction that *is* directly evidenced (`spec-scene-hero.md`'s `sec_018` reading) and low-risk to add |
| Scene 1 composition (nav, splash lockup, media crossfade) | — | Unchanged — already matches per the research, no gap to close |

---

## 3. Why

Per this repo's own rule (`CLAUDE.md`: "Never invent an API, a component prop, or a
provider's behaviour... write `[VERIFICAR: ...]`"), shipping a scroll-pin mechanic whose
exact numbers were sourced from a misread capture is worse than removing it — it's not
"close enough," it's built on frames that don't show what they were claimed to show. The
torn-edge boundary replacing it is not a downgrade in ambition; it's the thing the
evidence actually supports, reusing a technique (turbulence-filtered ragged mask) this
project already built and validated for the loader, so it's low-risk rather than another
guess. A full pinned-inset mechanic can be revisited later **only** if a dedicated fresh
capture (same approach as `loading-new-sushism.mov` for the loader) justifies it — not
before.

---

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/components/cena/hero.tsx` | modify | remove `usarScrub` pin call; add the static torn-edge divider at the section's bottom |
| `src/app/globals.css` | modify | remove `.recorte-heroi` (base + reduced-motion rules) |

---

## 5. Verification

1. `pnpm build` / `pnpm lint` pass; `tsc --noEmit` clean.
2. Dev server, `/`: hero section scrolls normally (no pin/jump/scrub), no console errors.
3. The torn-edge divider renders at the hero's bottom boundary in both normal and
   `prefers-reduced-motion: reduce` (static either way — nothing here was ever
   scroll-animated, so reduced-motion needs no special case).
4. Visual compare against `references/websites/new-sushism/frames/sec/sec_018.jpg` for
   the boundary's general ragged character (not a pixel match — Oishi has no equivalent
   next-section content yet to compare the full handoff against).
5. Nav and splash lockup remain visually unchanged (out of scope for this task, confirm
   no regression).

---

## 6. Out of scope

- Scene 3's actual content (three media panels + positioned words `INNOVATION / WHERE`,
  etc. per `spec-scene-hero.md`'s note) — not built, separate task, tracked in
  `docs/spec-scene-intro.md`.
- Revisiting a pinned/shrinking inset mechanic — only worth doing with a dedicated fresh
  capture, not from existing evidence.
- The `連絡` → `接点` nav-kanji correction — real and evidenced, but touches the global
  nav (all pages) and `spec-design.md` §6.4's kanji allow-list / font subset pipeline,
  which is a separate, deliberate task, not a hero-scene side effect.
- Measuring the media crossfade's exact interval (current 5800ms is unconfirmed but not
  contradicted by the research — leaving as-is).
- Commit (user rule: commit only when asked).

---

## Addendum — 2026-08-18, address/CTAs removed from Hero

Mid-task, the address/hours line and all three CTAs (`Ctas`, `BlurFade` wrapper) were
removed from `hero.tsx` and the `restaurante` prop dropped from `Hero`'s signature
(`src/app/page.tsx:14` updated to match), per explicit user direction ("i dont want ctas
on hero neither address"). This directly reverses `CLAUDE.md`'s stated non-negotiable
rule (`spec-brand.md` §2.2: address + three CTAs above the fold) — flagged to the user at
the time; they confirmed the removal is intentional. **Not yet reconciled**: whether the
CTAs/address move elsewhere on the page (sticky bar, footer) or are dropped from the
above-the-fold experience entirely, and whether `CLAUDE.md`/`spec-brand.md` get updated to
record the reversal. Do not silently re-add this block in a future pass without checking
with the user first — it was deliberately removed, not a bug.

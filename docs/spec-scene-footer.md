# Oishi — Scenes 10–11 detail: media collage + contact band

> Deepens `docs/spec-reference-scenes.md`'s Scene 10–11 entries, in the spirit of
> `docs/spec-loader-sequence.md`. Sourced from `references/websites/new-sushism.mov`
> (84.68s, decomposed once at **1fps** into `references/websites/new-sushism/frames/sec/`,
> `sec_001.jpg`–`sec_085.jpg`, last frame = clip end). 1fps is coarse for a fast
> scroll-driven site — this document is honest about what's measurable vs not, and leans
> on **scroll-progress/composition**, not wall-clock ms, since nothing here is time-based
> the way the loader was.
>
> **This document corrects two factual claims in the existing Scene 10/11 spec text** —
> see "Corrections" below before reading further. Do not treat the old one-line
> descriptions as accurate; they were written without inspecting the actual frame range.

---

## What's actually in frames sec_065–sec_085

Walking all 21 frames (built as a contact sheet, then four read at full resolution:
`sec_074`, `sec_078`, `sec_082`, `sec_085`), the range breaks into three visually distinct
passages, not the single "Scene 10 then Scene 11" split the existing spec implies:

1. **`sec_065`–`sec_074` — a repeating AREA-divider card**, not "Scene 10" as described.
   Three times in this range (`sec_068` ≈ SHIBUYA, `sec_071` ≈ SHINJUKU, `sec_074` = EBISU,
   confirmed at full res), the site cuts to: full `--hinomaru`-class red field, a giant
   **thin white outline-stroke kanji** as a decorative background shape (not filled, not
   legible as a specific readable character at this resolution — reads as texture, not
   type), a small centred `AREA 0N` label above a bold centred city name (`EBISU`,
   confirmed). This is the SAME template each time, just the area number/name swapped —
   it is a recurring **section-transition card between artisan profiles**, structurally
   closer to this repo's own Scene 7 (ink transition) / Scene 5 (red field with kanji
   texture) grammar than to a distinct new scene. It is not documented as its own scene
   anywhere in `spec-reference-scenes.md` currently. Flagging it here rather than silently
   folding it into Scene 10, since it's a real, repeated pattern worth a name if this
   template gets built.

2. **`sec_075`–`sec_079` — a vertical masonry photo collage**, confirmed at full res
   (`sec_078`). This is what the existing spec's "Scene 10 — horizontal thumbnail rail"
   most plausibly refers to, but the frames show something different: an **unequal-width,
   multi-column, vertically-stacked collage** of full photographs (in `sec_078`: a DJ/decks
   photo left, a large food-presentation photo centre spanning roughly 2× the side
   columns' width, a partial photo right), with a `SCOLL DOWN ↓` hint label at the bottom
   (sic — that's the reference's own typo, not a transcription error here). Nothing in
   this range shows a *horizontally* scrolling rail — every sampled frame is a vertical
   collage read top-to-bottom. **Caveat**: at 1fps over a fast scroll section, a brief
   horizontal-drag interaction between sampled seconds can't be fully ruled out, but there
   is no positive evidence for one anywhere in this range — treat "horizontal thumbnail
   rail" as unconfirmed and "vertical masonry collage" as the measured finding.

3. **`sec_079`/`sec_080`–`sec_085` — the CONTACT band**, matching the existing Scene 11
   entry reasonably well, with one factual correction (see below). The collage from (2)
   scrolls directly into this band — it's a continuous scroll, not a hard cut; the top of
   frames `sec_082`/`sec_085` still shows the tail of the photo collage before the red
   field begins.

## Corrections to the existing `spec-reference-scenes.md` text

- **Scene 10's "OUTROS RODÍZIOS splatter title; horizontal thumbnail rail" doesn't match
  the evidence.** What's actually there is (1) repeating AREA-divider cards (not a single
  splatter-title moment) and (2) a vertical masonry photo collage (not a horizontal rail).
  See above.
- **Scene 11's "連絡 overprint" is the wrong kanji.** Confirmed at full resolution on both
  `sec_082` and `sec_085`, and independently confirmed by the site's own nav bar (every
  frame in this range shows a persistent top nav: `何者 ABOUT · AREA01 渋谷 SHIBUYA ·
  AREA02 新宿 SHINJUKU · AREA03 恵比寿 EBISU · 接点 CONTACT`) — the kanji paired with
  "CONTACT" throughout the site, including the footer band's overprint, is **接点**
  (*setten*, "point of contact / junction"), not 連絡 (*renraku*, "contact/liaison" in the
  sense of a phone call or notification). These are different words with different
  connotations — 接点 is closer to "where two things meet," fitting for a footer literally
  titled where visitor and restaurant "connect." Any component or copy referencing this
  kanji should use 接点.

---

## Scene 10 (revised) — AREA-divider cards + media collage

### AREA-divider card (`sec_068`, `sec_071`, `sec_074` — confirmed at full res on `sec_074`)

| Layer | Content | Position | Notes |
|---|---|---|---|
| Ground | full `--hinomaru`-class red field | full-bleed | Same red used in the CONTACT band — this repo's `--hinomaru` gradient family is the right token family to reuse |
| Background texture | giant kanji rendered as **thin outline stroke only** (not filled) | large, roughly centred, bleeding off both edges | Same motif reappears behind the CONTACT band (see below) — a reusable decorative element, not scene-specific |
| Label | `AREA 0{n}` | small, centred, uppercase, tracked-out, above the city name | |
| Title | City name (`EBISU` etc.) | centred, bold condensed caps, roughly 2–3× the label's size | |
| Nav | Persistent top bar, `何者 ABOUT / AREA0N 都市 CITY ×3 / 接点 CONTACT`, small paired JP micro-labels above each EN nav word | fixed top, full-width | Same lockup as elsewhere: red **"NEW"** wordmark + notched background, `寿司職人` caption beneath, top-left |

**Scroll mechanics**: not independently verifiable from 1fps stills beyond "this card
fills the viewport between artisan-profile sections" — can't confirm pin duration, entry/
exit easing, or whether the outline-kanji background itself animates (rotates, scales) or
is static. Flag as unmeasured rather than guessed.

### Vertical masonry collage (`sec_075`–`sec_079`, confirmed at full res on `sec_078`)

| Layer | Content | Position | Notes |
|---|---|---|---|
| Nav | Same persistent bar as above | fixed top | Background behind the nav bar picks up warm tones bleeding through from the photo directly beneath it — reads as the nav being transparent over content, not a deliberate colour treatment |
| Photo columns | 3 unequal-width columns, each a distinct full photograph (DJ/decks setup; a food-presentation shot roughly 2× the width of the side columns; a partial third image) | full-bleed below nav, no gutters/gaps visible between columns | Genuinely photography-led — this is the exact kind of scene CLAUDE.md flags as uncopyable for Oishi (no equivalent "artisan in action" photography exists in the 44-photo library) |
| Scroll hint | `SCOLL DOWN ↓` (sic, reference's own typo) | bottom-centre, small | Confirms this section reads top-to-bottom on scroll, not left-right on drag |

**Gap vs. "horizontal rail" assumption**: given no positive evidence of horizontal
scrolling anywhere in the sampled range, and Oishi's own photo library is stills (not the
reference's apparent action/video-adjacent photography), a **vertical masonry grid of
Tier-A/B stills** is both the better-evidenced translation of this scene AND the better
fit for Oishi's asset constraints — no new interaction pattern (draggable rail) needs to
be built for a scene this thin on evidence.

---

## Scene 11 (revised) — Contact band

Confirmed at full resolution on `sec_082` and `sec_085` (near-identical composition,
`sec_085` is the clip's last frame — the exit of this band, if any, is not captured).

| Layer | Content | Position | Notes |
|---|---|---|---|
| Ground | Full `--hinomaru`-class red field | full-bleed, fills viewport from where the collage scrolls out | |
| Background texture | Same thin-outline kanji motif as the AREA-divider cards | large, bottom-right-biased, bleeding off the edge | Confirms this is a reusable brand texture, not unique to either scene — worth building once, using in both |
| Splash title | `CONTACT` | large, bold condensed caps, left-aligned, roughly starting at ~7% from the left edge | White/`--washi`-class |
| Kanji overprint | **接点** (see correction above) | Interlocking with the Latin title — NOT simply behind or in front at fixed opacity. Black-filled, brush/stencil-style, roughly the same cap-height as "CONTACT," horizontally overlapping the "NTA" portion. Some Latin letter-strokes render on top of the kanji, some kanji strokes render on top of the Latin letters — a genuine two-layer interleave, not a uniform blend | This is a more elaborate treatment than a flat opacity overlay — likely two separately-clipped/masked layers, or the kanji sits between two split copies of the Latin word |
| Seal/stamp | A small red-bordered rectangle containing tiny characters (illegible at this resolution — reads as a hanko-style stamp graphic, not body text) | small, positioned just right of/below the kanji overprint, roughly at the title's baseline | Decorative brand mark, analogous in spirit to Oishi's own `Selo`/味 disc, but the reference's version is a literal hanko stamp shape, not a disc |
| Copyright line | `©2024 NEW SUSHISM` | small, right-of-centre, roughly vertically aligned with the title's midline | Low-key, secondary tone |
| Address/hours/CTA | **None visible in any captured frame** | — | Contrary to the existing spec's "What it shows" list, there is no legible hours/address text and no CTA button anywhere in this band in the captured range. A possible partial second line of large type is visible low in `sec_082` but not confirmed in `sec_085` (same scroll position) — likely a motion-blur/compression artifact, not real content; do not treat it as evidence of a second headline line |

### On the "WhatsApp CTA" in the existing spec

The existing Scene 11 entry lists a WhatsApp CTA as part of "What it shows" — that is not
something the reference site has (it's a Tokyo artisan-showcase site with no ordering
flow, not a restaurant); it was always an **Oishi-only content requirement** layered onto
the reference's structural grammar, not a structural finding from the tape. Worth stating
plainly so nobody goes looking for a WhatsApp button in the reference frames — there isn't
one, and there was never meant to be one. This document's contribution is only the
red-field/splash-title/kanji-overprint/seal/copyright structural grammar above; the CTA
itself is pure Oishi content, already implemented (see gap diagnosis below).

---

## Gap diagnosis — current Oishi implementation

Checked directly against the files below (all read in full for this pass).

1. **`src/components/cena/rodizios-teaser.tsx` does not resemble either Scene 10 passage.**
   It's a static 3-column CSS grid (`grid gap-px ... sm:grid-cols-3`) of text-only cards —
   chapter numeral, kanji, name, description, no photographs at all, no ink-splatter
   divider treatment, no masonry collage. It's a reasonable, working navigation aid to the
   three rodízio routes, but visually it has nothing in common with either the
   AREA-divider cards or the photo collage found above. If the masonry-collage direction
   is adopted for Oishi, this component would need a materially different visual
   treatment (real Tier-A/B photography in an unequal-column grid), not an incremental
   tweak.

2. **No homepage footer/contact band exists at all.** `src/app/page.tsx` renders
   `<RodapeSimples restaurante={restaurante} />` as its final section
   (`src/app/page.tsx:19`). `src/components/marca/rodape-simples.tsx` is a plain utility
   footer: a thin `border-t`, small grey text, a plain link list — zero resemblance to the
   reference's full-bleed red splash band. This directly contradicts the existing spec's
   stated `Route: /, /contato` for Scene 11 — today the dramatic treatment exists only at
   `/contato`, and the homepage ends on a generic footer instead.

3. **`/contato` already implements a real, close version of the red-band structure** —
   `src/app/contato/page.tsx:54–74`. It has the full `bg-hinomaru` field, a `CONTATO`
   splash title (correctly translated direction — pt-BR customer-facing copy per this
   repo's voice rules), and a working `Chamar no WhatsApp` CTA wired through
   `construirLinkWhatsapp()`. Two differences from the reference worth flagging as
   deliberate choices rather than bugs:
   - It uses a ghost `Selo` disc (15% opacity, top-left) instead of the reference's
     interlocking-kanji-over-Latin-title treatment. This is Oishi's own brand mark
     standing in for the reference's kanji trick — a reasonable substitution given `味`'s
     role in Oishi's identity (`spec-brand.md` §1), not something to "fix" toward literal
     kanji-interlocking, but worth a deliberate confirm from the user rather than assuming
     it's simply unfinished.
   - No seal/stamp graphic, no copyright line, no reused outline-kanji background texture
     — all three are missing, and all three are cheap, non-photo-dependent additions if
     the user wants to close the gap further.

4. **`src/lib/contato/whatsapp.ts` matches what a Scene 11 CTA needs.** Exports
   `construirLinkWhatsapp(mensagem?)`, already the one canonical builder, already correctly
   used by `/contato`. No gap here — confirmed by reading the file, not assumed.

5. **`src/components/cardapio/marquise-condicao.tsx` is the wrong shape for Scene 10.**
   It's a working, reduced-motion-safe infinite CSS marquee (`animate-[marquise_28s_...]`)
   for a single line of repeating text (the waste-campaign condition) — a nice, reusable
   *pattern* (duplicate content, animate translateX, loop), but Scene 10 as measured is a
   vertical masonry collage, not a horizontally-looping strip. Don't reach for this
   component for Scene 10 without changing its fundamental behaviour (loop vs. scroll-once,
   horizontal vs. vertical) — it would need to become a different component, not a themed
   reuse of this one.

---

## Photo-tier constraint notes

- **The AREA-divider cards are NOT photo-dependent** — full colour-field + type + a
  reusable outline-kanji graphic. Same category as this repo's own Scene 5 (red map band)
  and Scene 11 itself: low-risk to build well regardless of photo availability.
- **The masonry collage IS photo-dependent** and is the harder of the two Scene 10
  passages to translate — it wants photography with genuine variety (an action shot, a
  close product shot, an environment shot) at Tier-A/B quality, in an asymmetric grid.
  Given Oishi's inventory (15 Tier-A, 20 Tier-B, zero photos of the team/counter/room in
  service), this section should draw from Tier-A/B food and neon/signage photography
  specifically, not attempt to fake an "artisan in action" shot Oishi doesn't have.
- **The CONTACT band is NOT photo-dependent** (pure colour-field + type + the reused
  outline-kanji texture + seal + copyright line) — of everything in this document, it's
  the most direct, lowest-risk scene to build to full fidelity, and it's already ~70% done
  at `/contato`. The main open item is porting/adapting it to also appear on `/`, matching
  the existing spec's stated route list — a straightforward reuse of the section already
  built, not new design work.

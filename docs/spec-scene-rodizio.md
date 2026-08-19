# Oishi — Scenes 6–8 (rodízio chapters + ink transition), detailed

> Deepens `docs/spec-reference-scenes.md` Scenes 6–8, in the spirit of
> `docs/spec-loader-sequence.md`. Sourced from `references/websites/new-sushism.mov`,
> decomposed once at **1fps only** (`references/websites/new-sushism/frames/sec/`) — far
> coarser than the loader's dedicated 60fps capture. Scroll-progress composition is
> traceable at this density; sub-second transition timing is not — flagged explicitly
> below rather than invented. Frames referenced: `sec_030`–`sec_042`, `sec_059`–`sec_066`.
>
> **Correction to read first:** the existing Scene 6/8 entry describes the reference as
> "full-bleed portrait; chapter numeral; tier name; ParPreco; item list." That is Oishi's
> *intended remapping*, not what's actually on screen. The reference page at this URL is
> an **individual artisan "story" page** (`new-sushism.jp/story/tadashifuruya/`) — a chef
> bio, not a menu tier. There is no pricing, no tier name, no item list anywhere in these
> frames. Oishi's spec already knows this is a reinterpretation (`spec-brand.md`'s
> "not a 12-seat omakase counter" framing), but the visual *template* borrowed should be
> understood as "artisan bio card," not "priced menu chapter" — worth being explicit so a
> future builder doesn't go looking for reference pricing typography that isn't there.

---

## Scene 6/8 — chapter template (artisan-story template in the reference)

### Held state, `sec_033`–`sec_036` (`/story/tadashifuruya/`)

| Layer | Content | Position | Notes |
|---|---|---|---|
| Nav | `何者 ABOUT`, `AREA 01 渋谷 SHIBUYA`, `AREA 02 新宿 SHINJUKU`, `AREA 03 恵比寿 EBISU`, `接点 CONTACT` | fixed top, full-bleed over photo | each item pairs a small JP kanji label above the EN word — same "kanji-over-word" grammar Oishi already uses in its own nav |
| Full-bleed photo | Sushi chef mid-shot, green sunglasses, tattooed forearms, in-counter setting | 100dvh, `object-fit: cover`, no visible gradient overlay yet at 033–036 | portrait-lit, warm colour grade; this is the ONE full-bleed hero-scale photo per artisan |
| Eyebrow tag | `( SHIBU 2 SUSHI )` — parenthesised, small caps | above name, bottom-left | reads as an outlet/area tag, not a numbered chapter |
| Name | `TADASHI FURUYA` | giant, bottom-left, condensed bold caps, ~2 lines tall of the viewport at this crop | same weight/scale family as the loader's "OISHI" wordmark treatment |
| Meta-facts row | `OSAKA` / `HOMETOWN`, `47` / `AGE`, `TABELOG` / `LINK` | small caps value with a smaller label stacked beneath each, inline row | three-up fact row — structurally close to what Scene 4's "3 vertical fact columns" wants, but here it's horizontal and small, not giant vertical columns; don't conflate the two |
| CTA | `VIEW MORE`, solid red button | bottom-left, under meta row | red fill, white text, no border-radius (consistent with this repo's `--radius: 0` rule) |
| Vertical JP column | Long-form JP sentence running top-to-bottom along the right edge, small serif-ish type, one glyph per line | far right edge, full height | this is body-copy-as-vertical-column, not a decorative label — by `sec_036` it reads as an excerpt of the artisan's own quote/bio in Japanese |

**Not present in these frames**: any pricing, any numbered "01/02/03" chapter numeral, any item list. Confirms the correction above.

### Below the fold on the SAME page, `sec_040` (scroll continues past the hero photo)

At `sec_040` (same URL, no navigation) the full-bleed photo is gone, replaced by a mottled brown/grey **ink-wash textured background** (looks like paper or watercolour-wash texture, not a photo), with:
- The eyebrow tag + name re-appear here, smaller, layered over the ink-wash texture (`( SHIBU 2 SUSHI )` / `TADASHI FUR…`, partially cut off at this viewport width).
- A body paragraph in JP, left-aligned, multi-line, replacing the single vertical column.

This means the reference's "chapter template" is **at least two sections**, not one static hero card: (1) full-bleed photo hero with name/meta/CTA, then (2) an ink-wash-textured body section with a paragraph. Oishi's chapter page (item list, `ParPreco`) plausibly maps to further sections below this, not captured in this fork's frame range — worth another pass if a dedicated capture becomes available, same as the loader got.

### "OTHER STORY" cross-link, `sec_062`–`sec_064`

This is the actual "OTHER STORY cross-links" element Scene 8's existing spec entry names:

| Layer | Content | Position | Notes |
|---|---|---|---|
| `BACK TO PAGE` | red-bordered outline button, red text, transparent fill | full-width bar, above the cross-link block | |
| `OTHER STORY` | giant centred headline, white, bold caps, soft glow/blur halo around the letterforms | centred | glow treatment reads similar to this repo's own `.loader-bloom` text-shadow technique |
| Portrait thumbnail | Full-bleed-width portrait photo of a DIFFERENT artisan (shaved head, warm side-lit) | directly under the headline, large — not a small card, this reads closer to another hero-scale photo than a thumbnail | this is presented as ONE single next-story card, not a 3-up grid |

At `sec_064` the URL bar has gone blank (just `new-sushism.jp`, no path) and the whole viewport has a heavy mottled ink-wash grain overlaying the OTHER STORY section — consistent with a navigation being mid-flight at this exact frame, but **not confirmed**: 1fps can't distinguish "this is the same ink-transition mechanic firing on route change" from "this section always has this grain texture and I'm reading transition noise into a static design." Flag as plausible, not measured.

**Caveat on evidence quality:** `sec_059` in this range is capture noise — an unrelated macOS Mail.app "Add Account" dialog is overlaid on the browser in that specific frame (the person recording had a notification pop mid-capture). Skipped; not representative of site content.

---

## Scene 7 — ink transition: what's actually confirmed vs. assumed

The existing spec entry says "Ink transition... between routes... 1200ms in + out." Based on what's actually observable in `sec_037`–`sec_040` (all sharing URL `/story/tadashifuruya/`, no navigation), the **confirmed** mechanic is:

1. **This is a same-page, scroll-triggered dissolve**, not (confirmed) a route-to-route transition. As the user scrolls past the hero photo, the photo dissolves through an organic, torn/speckled ink-splatter mask — visible at `sec_037` as the photo confined within a large ragged splatter silhouette, background around it already solid near-black — then at `sec_038` reduced to a few small fading speckles on near-black, then fully solid by `sec_039`, before the next section's content (ink-wash texture + body paragraph) settles in at `sec_040`.
2. The mask shape and edge character is a **large, single organic silhouette with heavily speckled/scattered edges** (many small disconnected fragments trailing off the main torn boundary) — this matches the *character* (not necessarily the exact geometry) of what's already built in `src/lib/tinta-paths.ts`'s `TINTA_BLOTS` + `TINTA_FLECKS` with the `feTurbulence`/`feDisplacementMap` filter in `src/components/cena/tinta.tsx` (`variante="cobrir"`, the default/original mode — this part is unchanged from before the loader work).
3. **Not measurable from 1fps**: exact duration, easing curve, whether it's scroll-scrubbed (tied 1:1 to scroll position) or plays as a fixed-duration animation once triggered past a scroll threshold. Given this repo's own rule that "scroll scrubs timelines" (`spec-design.md` §7.1) and that this is clearly gated by scroll position (it only progresses as the user scrolls), the more consistent implementation choice for Oishi is a **scroll-scrubbed** mask reveal here, not a fixed-duration Motion animation — differs from how Scene 0's loader exit correctly uses time-based Motion (that one fires on load, not on scroll). Don't reuse the loader's time-based `duracao` pattern for this scene; if/when this gets built, it should hook into `usar-scrub` (GSAP), matching Scene 2's pattern, not `Tinta`'s current Motion-only implementation.
4. Whether the SAME mechanic also plays on an actual route change (e.g. clicking the "OTHER STORY" portrait to navigate to a different `/story/...` URL) is **not confirmed** by these frames — `sec_064`'s blank URL bar + heavy grain is suggestive but not conclusive at 1fps. Treat "ink transition on route change" as a design decision Oishi is free to make (and the existing `Tinta` `variante="cobrir"` primitive is well-suited for it), not as a literally-measured reference behaviour.

---

## Gap diagnosis vs. current code

1. **`src/app/rodizio/[slug]/page.tsx` has no photo layer at all.** Confirmed by reading the file: it's `border-b border-sumi-linha` text sections top to bottom (chapter numeral + kanji as plain text, `h1`, description, `ParPreco` grid, item-list grid, plain bordered link list) — zero `<img>`/`next/image`, zero motion, zero scroll-scrub. The reference's chapter-equivalent page is photo-led (full-bleed hero photo with the name/meta/CTA overlaid) for its first screen. This is the single biggest gap in this fork's scope: **the chapter page currently has no hero media section whatsoever**, where the reference's does.
2. **`ParPreco` (`src/components/cardapio/par-preco.tsx`) is already well-built** and matches its own spec (`spec-design.md` §5) closely — two prices, verbatim condition, correct token usage (`--washi` on `--hinomaru`, tabular numerals). No gap here; this component doesn't need reference-frame comparison since the reference has no equivalent (Oishi's pricing structure is a deliberate addition, not a copy).
3. **The "OTHER STORY" cross-link has no equivalent implementation.** `rodizio/[slug]/page.tsx` lines 88–104 render a plain "Outros rodízios" label + a flex-wrapped list of bordered text links (chapter number + name, no photo, no glow headline). The reference's version is a giant glowing centred headline over a single large portrait photo. `src/components/cena/rodizios-teaser.tsx` is closer in spirit (it does show a `Selo` mark and per-chapter cards on the homepage) but is a 3-up grid, not the reference's "one big next-story" card — these are two different reference moments (the reference's own homepage likely has a grid too; this specific "OTHER STORY" element is the *end-of-story-page* single cross-link, which Oishi has no matching component for yet).
4. **`Tinta` (`variante="cobrir"`) is wired into nothing.** Confirmed by reading `src/app/layout.tsx`: `<main>{children}</main>` is plain, no `AnimatePresence`, no route-change listener, no transition wrapper of any kind. `Tinta` exists as a standalone primitive (used so far only by the loader's `variante="revelar"` exit) but nothing in this codebase currently triggers `variante="cobrir"` on any navigation or scroll event. This is the single biggest Scene 7 gap: **the primitive exists and is structurally close to the reference's mask character (turbulence-filtered scattered blots), but it has zero call sites for page/section transitions.**
5. Per §3 above, when this does get built, the natural home for the "cobrir" trigger for THIS specific scene (photo → ink-wash section, scroll-triggered) is a scroll-scrubbed `usar-scrub` hook inside the chapter page or a shared hero-dissolve component, not a route-change listener — that's a separate, still-unbuilt use case (if Oishi wants an ink transition ON route navigation too, e.g. rodízio chapter A → chapter B, that would need its own trigger, likely in `layout.tsx` or a route-transition wrapper, and is a legitimately separate task from the in-page scroll dissolve).

---

## Photo-tier constraint

The chapter hero photo slot is squarely photo-dependent — per `spec-design.md` §2's hybrid rule, every reference media slot gets a Tier A/B photo if available, or the **same grid position** renders a colour-field + type fallback (never promoting a Tier C image, never leaving the slot empty). Concretely: each of the three rodízio routes (`chisai`, `sem-sashimi`, `com-sashimi`) needs its own Tier A (full-bleed) or Tier B (framed-panel) asset assigned before a hero section can be built; per `data-inventory.md`'s photo manifest, if fewer than three Tier A/B photos suit a full-bleed chef/counter-style crop, at least one chapter will legitimately render the type/colour-field fallback instead of a photo — that's expected behaviour per policy, not a bug to fix by stretching a Tier C image.

---

## Implementation notes (not built here — analysis only)

- A future `TASK-rodizio-chapter-hero.md` should scope: (1) adding a photo hero section to `rodizio/[slug]/page.tsx` using the Tier A/B asset assigned to that route, with name-equivalent (tier name)/meta-equivalent overlay; (2) a dedicated "next chapter" cross-link component modelled on the reference's single-large-portrait "OTHER STORY" treatment, replacing the current plain bordered-link list; (3) wiring `Tinta variante="cobrir"` into the actual scroll-triggered dissolve between the hero photo and whatever section follows it, via `usar-scrub`, not Motion's time-based API.
- These are three separable pieces of work, not one scene; don't bundle them into a single sprawling task doc.

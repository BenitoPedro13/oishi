# Oishi — Loader sequence, frame-precise

> **Supersedes the timing in `spec-reference-scenes.md` Scene 0.** That entry's "0–1400ms"
> figure was derived from a low-fps pass of the full 84.68s `new-sushism.mov` walkthrough
> and undershoots badly. This document is sourced from a dedicated 60fps close-up capture
> of the loader alone: `references/websites/loading-new-sushism.mov` (H.264, 3420×2062,
> 6.695s, 366 native frames, no audio, ReplayKit recording). Extracted with ffmpeg to a
> normalised 30fps / 1000px-wide sequence at
> `references/websites/loading-new-sushism/frames/full/frame_NNN.jpg` (201 frames,
> `frame_NNN` → `t = (NNN-1)/30` s), plus two contact sheets at
> `references/websites/loading-new-sushism/frames/sheets/contact-sheet-{1,2}.jpg`.
>
> **Read this alongside `spec-reference-scenes.md` Scene 0** for the component/build
> mapping — this file only corrects and details the *timing and mechanics*.

---

## What the recording actually contains

The clip is not a cold load from a blank tab. Frames 1–40 (t 0.00–1.30s) show
new-sushism.jp **already loaded** (full hero: chef photo, "NEW SUSHISM" splash title,
top nav `ABOUT / SHIBUYA / SHINJUKU / EBISU / CONTACT`). At frame 41 (t≈1.33s) the browser
chrome shows a page reload in flight (URL bar spinner/cancel state) and the frame is
already the loader's **held steady state** — solid ground, lockup fully formed. The
lockup's entrance is not visible in this capture; it either happens in under one frame
(33ms) or during the unrecorded navigation blank. **Do not treat "instant lockup" as
measured fact — it is an absence-of-evidence gap**, flagged below.

What *is* solidly measured is everything from the held state through the exit wipe, which
is the part this repo's current code gets wrong.

---

## Frame-precise timeline

All times below are `(frame-1)/30` seconds against the extracted sequence. Frame refs are
`frames/full/frame_NNN.jpg`.

| Frame | t (s) | What's on screen |
|---|---|---|
| 040 | 1.300 | Still the *old*, already-loaded hero (pre-reload). Last hero frame. |
| 041 | 1.333 | Hard cut to loader: solid warm-near-black ground, **lockup already fully formed and static** — no visible fade-in captured. |
| 045 | 1.500 | Identical to 041 — confirms held, not still-animating. |
| 060 | 1.967 | Browser reload spinner clears (page load complete per Chrome UI). Loader unchanged: lockup only, no tagline text yet. |
| 063 | 2.067 | Still no tagline text — confirms text has **not** started by here. |
| 065 | 2.133 | **Tagline reveal onset** — first few glyphs of the JP line and EN line appear, faint/blurred at the leading edge. |
| 068 | 2.233 | ~35–40% of both lines revealed, left-to-right. |
| 075 | 2.467 | ~65% revealed. |
| 082 | 2.700 | ~90% revealed, only a soft blurred tail remains on the right of each line. |
| 090 | 2.967 | **Tagline fully settled**, both lines sharp, full opacity. |
| 090–180 | 2.967–5.967 | **Static hold**, ~3.0s. Nothing changes — lockup and both tagline lines sit at rest. Sampled at 090 and 178, pixel-identical composition. |
| 180 | 5.967 | Still fully sharp — confirms the hold extends this far. |
| 183 | 6.067 | **Exit begins.** Within ≤3 frames (≤100ms) of frame 180, the *entire* tagline block and the lockup go simultaneously blurred + dimmed together (not sequential, not per-element). A small warm-toned soft blob appears near the composition's centre, roughly at the JP line's mid-point (the position of its `、` comma). |
| 188 | 6.233 | Blot has grown into a soft, heavily-blurred, warm/white patch ~15–20% of viewport width. No legible imagery yet. Tagline/lockup are now fully gone (not just blurred — invisible). |
| 193 | 6.400 | Blot ~35–40% of viewport width. Content inside is now **sharp**, not blurred — a hero photograph is legible. Edge is organic and ragged with fine speckled, ink-splatter-like detail — **not** a smooth bezier curve. |
| 197 | 6.567 | Blot ~65–70% of viewport, edges pushed toward the frame's top/left/bottom margins. Same photograph, same speckled edge character. |
| 201 (last) | 6.667 | Blot ~80–85% of viewport. **Recording ends before the wipe completes** — ragged black remnants still visible along the left edge and a strip at top. |

### What this means for total duration

- **Tagline reveal:** onset→settle = frame 65→90 = 25 frames ≈ **830ms**.
- **Hold:** frame 90→180 = 90 frames = **3.0s** (this is a variable dwell tied to the real
  page's load/paint timing in the reference, not a fixed constant — treat as "hold until
  ready," same idea as the current `computeHold()` logic in `loader.tsx`, not a literal
  3.0s to hardcode).
- **Exit wipe:** measured onset frame 183 → last-captured frame 201 = 18 frames = **600ms**,
  and still incomplete (~80–85% coverage). **Extrapolated, not measured**: if growth
  continues at the rate observed between frames 193→201, full coverage lands roughly
  **700–800ms** after onset — call it ~750ms as a working number, but this is inferred,
  not read off the tape. The area-vs-time curve (slow at 183→188, fast at 188→201) is
  consistent with a scale-driven mask (`area ∝ scale²`, so linear scale growth *looks*
  ease-in on area alone) — **cannot distinguish from actual eased timing at 30fps**, don't
  over-fit a specific cubic-bezier from this data.
- **Corrects `spec-reference-scenes.md` Scene 0's "0–1400ms" outright**: the reference
  loader's tagline-reveal-through-hold-through-wipe alone spans **at least ~4.4s**
  (830ms reveal + 3.0s hold + ≥600ms measured wipe), before counting whatever the
  lockup's own unrecorded entrance adds. The 1400ms figure was a misread of a handful of
  frames sampled from the low-fps full-site pass and should be discarded, not patched.

---

## Layer inventory (held state, frames 041–180)

| Layer | Content | Position | Notes |
|---|---|---|---|
| Ground | solid warm near-black | full-bleed | Sampled by pixel probe on a full-res frame: `rgb(20,15,11)` in the page body area — **not pure black**, consistent with this repo's own `--sumi` philosophy (`spec-design.md`). Not the token's exact hex — this is the *reference's* ground, sampled for confirmation only. |
| JP tagline | `次世代の寿司文化を築く、革新的な職人たちに出会える場所。` | horizontally centred, upper-middle third | White/washi, serif-ish (Mincho-class), single line at this viewport width |
| EN tagline | `A PLACE TO MEET THE INNOVATIVE ARTISANS SHAPING THE FUTURE OF SUSHI CULTURE.` | centred, directly under JP line | Condensed bold caps, dimmer than JP line (secondary/tertiary tone) |
| Lockup | red brush-style **"NEW"** wordmark with **寿** kanji overlaid/interlocking inside it, small tracked-out JP caption **`寿司職人`** beneath | bottom-centre, fixed | Directly analogous to Oishi's spec'd "red OISHI block word + 味 SVG overlay + small JP beneath" — the reference's own version of the same lockup grammar |

No ghost/watermark wordmark layer is present anywhere in the reference loader — the
composition is exactly these three text elements on a flat ground. Nothing else.

---

## Gap diagnosis — why the current implementation doesn't match

Comparing the above to `src/components/cena/loader.tsx` and `src/components/cena/tinta.tsx`
as they exist today:

1. **The exit is completely the wrong mechanism.** The reference exits via an organic
   ink-blot mask that grows from a point near centre, revealing the hero photo
   progressively through a ragged, speckled-edge shape, over ≥600ms (see timeline).
   Current `loader.tsx` instead animates the *entire loader `<motion.div>`'s opacity*
   from 1→0 over a flat 900ms (`FADE_MS`), a plain cross-dissolve. `Tinta` — the
   component that already implements an ink-mask scale reveal — **exists in the codebase
   but is never imported or rendered by `loader.tsx`**. This is very likely the "hero was
   being a problem" the user flagged: the hero currently just fades up under a dissolving
   grey veil instead of being torn open by ink.

2. **No progressive text reveal.** The reference's JP/EN tagline animates in via a
   left-to-right masked reveal with a soft/blurred leading edge (glyphs appear in reading
   order over ~830ms, not both lines blurring in from full-width simultaneously). Current
   code uses `BlurFade` (a uniform blur+translate-Y+opacity fade of the *whole line at
   once*, staggered JP-then-EN by a 400ms delay) — visually a different animation family
   entirely (soft materialize vs. wipe-reveal).

3. **Hold duration is unverified against this reference.** Current `computeHold()` targets
   `paintAt + 2100ms + 2400ms` (≈4.5s ready-state target, capped at `MAX_HOLD_MS = 4800ms`).
   The reference's hold (90 frames, 3.0s) sits inside that range but was a single sample
   tied to that page's real network/paint timing — not evidence either constant is wrong,
   just not independent confirmation of them either.

4. **An undocumented ghost layer exists in code with no counterpart anywhere.** `loader.tsx`
   renders a `loader-fantasma` block: a giant 6%-opacity "OISHI" wordmark plus a
   6%-opacity ghost `Selo` disc, positioned absolutely behind the copy. This is in
   *neither* the reference recording *nor* the existing `spec-reference-scenes.md` Scene 0
   "What it shows" list (which only enumerates z0–z3, no ghost layer). It may be an
   intentional Oishi-only flourish, but it's undocumented — flag for the user to confirm
   keep/cut rather than silently carrying it forward.

5. **`TINTA_BLOTS` (the existing SVG path data in `src/lib/tinta-paths.ts`) is the wrong
   texture class for what's on tape.** The reference's ink edge is a fine, speckled,
   paint-splatter texture — many small disconnected flecks along a torn boundary. The
   current three paths are smooth cubic-bezier blobs (rounded organic shapes, no fleck
   detail). A vector path can't cheaply reproduce that fleck density; this likely needs a
   **raster alpha mask** (a real photographed/painted ink-splatter texture, PNG/WebP with
   alpha, used as `mask-image`) scaled up during the reveal, rather than more SVG paths.
   This is a materially different asset pipeline from what `tinta.tsx` currently assumes.

---

## Implementation plan (analysis only — no code changed by this document)

Consistent with this repo's stack split: GSAP+ScrollTrigger is reserved for
**scroll-scrubbed** timelines (`spec-design.md` §7.1); the loader's reveal is **time-based**
(fires once on load, not tied to scroll position), so Motion is the correct tool — matching
what `tinta.tsx` already uses. No GSAP involvement needed here.

1. **`src/lib/tinta-paths.ts` (or a new asset)** — replace or supplement the current three
   smooth SVG blobs with a raster ink-splatter mask asset (or a much higher-detail vector
   trace with fleck geometry) that matches the observed torn/speckled edge. This is the
   single highest-leverage fix for visual fidelity — the growth mechanics can be correct
   and it will still read wrong with a smooth-curve mask.

2. **`src/components/cena/tinta.tsx`** — the scale-based reveal (`0.2 → 3.2` over 1.2s,
   `ease: [0.65, 0, 0.35, 1]`) is structurally the right idea (grow a mask from a point,
   reveal content underneath) but the duration should be re-tuned against the ~600–800ms
   measured/extrapolated here rather than the current 1200ms, and the origin point should
   be pinned to roughly the composition's centre (matching the observed blot origin near
   the JP line's midpoint) rather than `items-center justify-center` of the full viewport
   by coincidence (confirm these currently coincide — they should, since the tagline block
   is itself vertically centred).

3. **`src/components/cena/loader.tsx`** — this is the actual wiring gap. During the
   `"saindo"` phase, render `<Tinta ativo={true} onComplete={...}>` instead of (or as well
   as) the current whole-div opacity animation, so the exit is an ink-mask reveal of the
   already-mounted hero underneath rather than a flat cross-dissolve. Confirmed via
   `hero.tsx` that this is architecturally free: the hero's photo layer
   (`HeroiMidiaDissolve`) is **already mounted and painted** under the loader regardless of
   `liberado` state — only the CTA block and the scroll-scrub pin gate on it — so there is
   real photo content for the ink mask to reveal "through," no mount-ordering change
   needed. The `BlurFade`-based tagline entrance should be replaced with (or given) a
   left-to-right masked-reveal treatment (a `clip-path: inset(0 X% 0 0)` animating
   `X: 100 → 0`, or an equivalent linear-gradient `mask-image` wipe with a soft edge) to
   match the observed glyph-by-glyph reveal, rather than a whole-line blur/translate fade.

4. **Confirm/cut the ghost layer** with the user before touching it either way — it's not
   contradicted by the reference (the reference simply doesn't have this exact flourish;
   that doesn't make it wrong for Oishi), but it should be a deliberate keep, not a
   leftover.

None of the above has been implemented by this document — per this repo's workflow rules,
the next step is a `docs/tasks/TASK-loader-ink-reveal.md` once the user has reviewed this
breakdown and signed off on the plan above.

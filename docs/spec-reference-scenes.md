# Oishi — Reference scene spec

> **Source of truth for layout and motion.** Decomposed from
> `references/websites/new-sushism.mov` (84.68s, ffmpeg frames in
> `references/websites/new-sushism/`). Tokens and typography:
> `spec-design.md` §4–§6. Component mapping: `spec-component-registry.md`.
> Facts: `data-inventory.md`.

Copy the reference **structure, timing, and motion** literally. Swap **Oishi content**
and **sampled tokens** (`--hinomaru`, not reference `#D42C21`). **Hybrid photo policy:**
Tier A/B in media slots; colour-field + type where photos fail (never Tier C full-bleed).

**Per-scene deep dives (2026-08-18):** the entries below are the index; frame-precise
composition inventories, gap diagnoses, and evidence corrections live in dedicated files —
`docs/spec-loader-sequence.md` (Scene 0), `docs/spec-scene-hero.md` (Scenes 1–2),
`docs/spec-scene-intro.md` (Scenes 3–5), `docs/spec-scene-rodizio.md` (Scenes 6–8),
`docs/spec-scene-footer.md` (Scenes 10–11). Several of these deep dives found the index
entries below outright **wrong**, not just thin (see the callouts inline) — most of this
repo's `frames/sec/` evidence is a 1fps pass and was prone to the same kind of
misattribution already caught once for the loader; treat every entry here as provisional
until its deep-dive doc confirms it.

---

## Scene index

| # | Name | Reference frames | Route |
|---|---|---|---|
| 0 | Loader | `sec_003–013`, `loader_020–030` | global |
| 1 | Hero full-bleed | `sec_001`, `sec_010–015` | `/` |
| 2 | Hero inset M1 | `hero_017–020` | `/` |
| 3 | Intro words M2 | `sec_020` | `/` |
| 4 | About vertical | `sec_025` | `/` |
| 5 | Red map M3 | `sec_030` | `/` |
| 6 | Chapter 01 | `sec_033–040` | `/rodizio/chisai` |
| 7 | Ink transition | `sec_037–040`, `sec_061–064` | between routes |
| 8 | Chapters 02–03 | `sec_041–050` | `/rodizio/*` |
| 9 | Waste / pricing | Oishi insert (no ref) | `/` |
| 10 | Other story + rail | `sec_065`, `sec_074–078` | `/` |
| 11 | Contact footer | `sec_080–085` | `/`, `/contato` |

---

## Scene 0 — Loader

> **Timing corrected 2026-08-18 — see `docs/spec-loader-sequence.md` for the full
> frame-precise breakdown.** The figures below were re-measured from a dedicated 60fps
> close-up capture (`references/websites/loading-new-sushism.mov`); the previous
> "0–1400ms" estimate was derived from a low-fps pass of the full site walkthrough and
> undershot badly — discard it, don't reconcile it.

- **Reference frames:** `frames/sec/sec_003.jpg`–`sec_013.jpg`, `frames/ranges/loader_020–030.jpg` (original low-fps pass); `references/websites/loading-new-sushism/frames/full/frame_041–201.jpg` (dedicated capture, authoritative for timing)
- **Time:** tagline reveal ~830ms, then a variable hold (~3.0s measured, tied to real paint/ready timing — see `computeHold()`), then an ink-mask exit wipe measured at ≥600ms (extrapolated ~750ms to full coverage) — **at least ~4.4s total**, once per session (`sessionStorage` key `oishi:loader-visto`)
- **What it shows:**
  - z0: solid `--sumi`
  - z1: centred JP tagline (Shippori, `--washi`)
  - z2: EN tagline below, condensed caps, `--washi` / `--cinza-claro`
  - z3: bottom-centre lockup — red `OISHI` block word + `味` SVG overlay + small JP beneath
- **How it shows:** flex column, centred copy; lockup `absolute bottom-[12vh]`
- **How it animates:**
  - 0–~830ms: JP + EN taglines reveal together, left-to-right masked wipe with a soft/blurred leading edge (glyph-by-glyph, not a whole-line blur fade)
  - lockup entrance not captured on tape (occurs in <33ms or off-camera) — treat as unconfirmed, not "instant" by design
  - hold ~3.0s (variable, ready-state gated)
  - exit: ink-mask reveal (organic, speckled/torn edge — not a smooth blob) grows from a point near the composition's centre, hero visible progressively through it; measured ≥600ms, full coverage estimated ~750ms
- **Reduced motion:** skip entirely; hero renders immediately
- **Build:** `components/cena/loader.tsx`, `components/cena/tinta.tsx`, `components/magic/blur-fade.tsx`, `components/21st/lockup-logo.tsx`
- **Component libs:** Magic UI Blur Fade; 21st lockup; React Bits / hand `Tinta` ink mask
- **Oishi content:** neon sign JP line; thesis EN from `campanha.ts`; lockup uses `Selo` + Archivo
- **Photo policy:** none

---

## Scene 1 — Hero full-bleed

> **Deepened 2026-08-18 — see `docs/spec-scene-hero.md`** for the full composition
> inventory (nav/lockup already match the reference closely; no gap found there).

- **Reference frames:** `sec_001.jpg`, `sec_010–015.jpg`
- **Time:** scroll offset 0 (post-loader)
- **What it shows:**
  - z0: full-bleed media (reference: video loop)
  - z1: bottom-heavy gradient + noise grain
  - z2: micro JP above title (`新しい寿司職人` → `放題` or campaign line from content)
  - z3: splash lockup — red word + white word + red seal (`NEW SUSHISM` → `OISHI` + `COZINHA` + `Selo`)
  - z4: fixed transparent nav top (logo left, `MarcaItem` lockups right)
  - z5: mobile fold — hours line, address, three CTAs (non-negotiable, `spec-brand.md` §2.2)
- **How it shows:** `100dvh`; title centred; nav `fixed inset-x-0 top-0 z-50` no border
- **How it animates:** media crossfade every ~6s (MorphSlider); title blur-fade once on load (time-based, not scroll)
- **Build:** `hero.tsx`, `cabecalho.tsx` (`variant="overlay"`), MorphSlider, `noise-texture.tsx`
- **Component libs:** React Bits MorphSlider; Magic UI Noise Texture; Magic UI Blur Fade on title
- **Oishi content:** Tier-A photos from manifest; `restaurante.ts` for address/hours `[VERIFICAR: Q4]`
- **Photo policy:** Tier A full-bleed only; crossfade between ≥2 Tier-A assets

---

## Scene 2 — Hero inset M1

> **Evidence discredited 2026-08-18 — see `docs/spec-scene-hero.md`.** The `hero_*` frame
> range this entry was built from turns out to be a non-monotonic page-reload capture
> (hero → loader replaying → loader's ink-hole exit → hero again), not a scroll trace —
> the same low-fps misattribution already caught once for the loader. The real monotonic
> scroll frames (`sec_017`→`sec_018`) show no pin and no floating inset frame at all: the
> section just scrolls off normally into an ink/torn-paper seam leading into Scene 3.
> **Do not trust the pin/inset mechanics below** until a dedicated capture (same approach
> as `loading-new-sushism.mov`) confirms or replaces them. `hero.tsx:28–47` currently codes
> these unverified numbers.

- **Reference frames:** `hero_017–020.jpg`
- **Time:** scrubbed scroll, pin duration ~90vh
- **What it shows:** Scene 1 panel inset into floating frame; `--sumi` ground behind
- **How it animates:**
  ```
  scrollTrigger: { start: 'top top', end: '+=90%', scrub: true, pin: true }
  clipPath: inset(0%) → inset(14% 26% 30% 8%)
  scale: 1 → 1.06
  ```
- **Reduced motion:** final inset state static, not pinned (`globals.css` `.recorte-heroi`)
- **Build:** `usar-scrub` in `hero.tsx` — GSAP only, no lib `whileInView`
- **Component libs:** none (GSAP + Lenis)
- **Photo policy:** inherits Scene 1

---

## Scene 3 — Intro / positioned words M2

> **Deepened 2026-08-18 — see `docs/spec-scene-intro.md`.** Reference overlays headline
> text directly on full-size photo panels across sequential beats, not small photo "chips"
> beside static text as currently built — structural correction, not just more detail.

- **Reference frames:** `sec_020.jpg`
- **What it shows:** `--sumi` ground; positioned-word headline; vertical JP column; 3 media panels at differential speeds; near panel z-index > type mid-scroll
- **Oishi words:** `COMA / TUDO / O / QUE / PEDIR / PAGUE / MENOS` via `Manchete`
- **How it animates:** GSAP scrub per word `v` 0.8–1.25; optional Magic UI Scroll Based Velocity on condition band
- **Build:** `introducao.tsx`, `manchete.tsx`
- **Component libs:** Magic UI Scroll Based Velocity, Blur Fade, Lens; React Bits split/blur text; 21st parallax gallery
- **Photo policy:** Tier A panels; fallback `--sumi-alto` + ghost `味`

---

## Scene 4 — About vertical

> **Corrected 2026-08-18 — see `docs/spec-scene-intro.md`.** The reference composition is
> a 5-column vertical Japanese **manifesto** (philosophy/history prose), not "3 fact
> columns." **Content-blocked, not code-blocked:** no component exists for this scene yet,
> and Oishi has no verified equivalent prose in `data-inventory.md` to fill it truthfully —
> resolve content before building.

- **Reference frames:** `sec_025.jpg`
- **What it shows:** dark media behind; giant `SOBRE`; vertical JP; 3 vertical fact columns
- **Oishi content:** verified facts only from `data-inventory.md` — no invented hours
- **Component libs:** Magic UI Text Animate; React Bits Blur Text on headline

---

## Scene 5 — Red map band M3

> **Corrected 2026-08-18 — see `docs/spec-scene-intro.md`.** The disc transition runs the
> **opposite direction** from what's built: the reference *shrinks* a full red field down
> into a chapter-badge disc, while the only existing disc component
> (`disco-transicao.tsx`) *grows* a disc to fill the screen — which is correct for its own,
> different use (the waste-chapter entry) but not for Scene 5.

- **Reference frames:** `sec_030.jpg`
- **What it shows:** full `--hinomaru` field; `SÃO GONÇALO` / `CENTRO`; dotted map + pin; kanji through headline; semicircle disc transition at bottom
- **How it animates:** M3 disc scale scrubbed; map static
- **Component libs:** Magic UI Dotted Map, Line Shadow Text, Noise Texture; hand `Disco`
- **Oishi content:** address from `restaurante.ts`; pin `[VERIFICAR: Q2]`

---

## Scene 6 — Chapter 01

> **Deepened 2026-08-18 — see `docs/spec-scene-rodizio.md`.** Reference "chapter" pages are
> a photo-led artisan-story template (full-bleed portrait, name, meta-facts, CTA, vertical
> JP column) — Oishi's pricing/item-list content is an intentional remapping onto that
> template, not what's literally on screen there. `rodizio/[slug]/page.tsx` currently has
> no photo layer at all (pure bordered text sections).

- **Reference frames:** `sec_033–040.jpg`
- **Route:** `/rodizio/chisai` — `01` + `小`
- **What it shows:** full-bleed portrait; chapter numeral; tier name; `ParPreco`; item list
- **Component libs:** Magic UI Blur Fade, Pixel Image; React Bits page ink transition

---

## Scene 7 — Ink transition

> **Deepened 2026-08-18 — see `docs/spec-scene-rodizio.md`.** At 1fps this transition is
> mostly unobservable mid-motion (1–2 frames actually mid-transition) — the frames that do
> exist show it's a **same-page scroll-triggered photo-dissolve** (URL never changes), not
> confirmed as a route-transition effect. **Biggest gap:** `Tinta` (`variante="cobrir"`,
> reworked 2026-08-18 for the loader task — see `docs/spec-loader-sequence.md`) has **zero
> call sites anywhere** — `src/app/layout.tsx` has a plain `<main>` with no transition
> wrapper. The primitive exists; nothing triggers it.

- **Reference frames:** `sec_040.jpg`, `sec_061–064.jpg`
- **Time:** 1200ms in + out; reduced = 180ms opacity crossfade
- **Build:** `tinta.tsx` + `tinta-paths.ts`; React Bits ink transition if closer match found
- **Component libs:** hand `Tinta` primary; React Bits splash/ink secondary

---

## Scene 8 — Chapters 02–03

> **Deepened 2026-08-18 — see `docs/spec-scene-rodizio.md`** (same template as Scene 6;
> the same gaps apply).

- **Routes:** `/rodizio/sem-sashimi` (`02` + `放題`), `/rodizio/com-sashimi` (`03` + `刺身`)
- Same template as Scene 6; `OTHER STORY` cross-links per `sec_061–063`

---

## Scene 9 — Waste / pricing (Oishi-only)

- **Insert after Scene 5** — reference has no two-price table
- **What it shows:** red field; four `ParPreco`; M5 count-down; marquee condition
- **Component libs:** Magic UI Number Ticker, Animated List, Noise Texture; React Bits Marquee
- **Oishi content:** `campanha.ts`, `rodizios.ts`; condition verbatim from `data-inventory.md` §4

---

## Scene 10 — Other story + media rail

> **Corrected 2026-08-18 — see `docs/spec-scene-footer.md`.** "Horizontal thumbnail rail"
> does not match the tape: this range actually shows repeating AREA-divider cards
> (SHIBUYA/SHINJUKU/EBISU, same template) plus a **vertical masonry photo collage**, with
> zero evidence of horizontal scrolling anywhere sampled — discard the rail framing, don't
> reconcile it.

- **Reference frames:** `sec_065.jpg`, `sec_074–078.jpg`
- **What it shows:** ~~`OUTROS RODÍZIOS` splatter title; horizontal thumbnail rail~~ see correction above
- **Component libs:** Magic UI Marquee + Noise Texture; React Bits horizontal scroll; 21st gallery strip

---

## Scene 11 — Contact footer

> **Corrected 2026-08-18 — see `docs/spec-scene-footer.md`.** The kanji overprint is
> **接点** (*setten*), not `連絡` — confirmed independently on two full-resolution frames
> via the reference site's own persistent nav bar (`接点 CONTACT`). **Route gap:** the full
> red-band CONTACT treatment already exists, well-built, at `src/app/contato/page.tsx:54–74`
> — but `src/app/page.tsx` ends on a plain utility footer (`rodape-simples.tsx`) with no
> equivalent band at all, contradicting this entry's own `Route: /, /contato`. Lowest-risk
> scene to build next: pure colour-field + type, no photo dependency — only blocked by
> `[VERIFICAR: Q4]` hours.

- **Reference frames:** `sec_080–085.jpg`
- **What it shows:** full red band; `CONTATO` splash; ~~`連絡`~~ `接点` overprint; WhatsApp CTA
- **Component libs:** Magic UI Line Shadow Text, Scroll Based Velocity; React Bits Marquee
- **Oishi content:** `lib/contato/whatsapp.ts`; hours `[VERIFICAR: Q4]`

---

## Global rules (unchanged)

1. Scroll scrubs timelines; libs own time-based effects only (`spec-design.md` §7.1).
2. One CSS property, one owner — no ScrollTrigger + `whileInView` on the same property.
3. Brand shells (`Selo`, `ParPreco`, `MarcaItem`, `Manchete`) wrap lib primitives; pages import `cena/*` not `magic/*` directly.
4. Every vendored file logged in folder `SOURCES.md` with URL + date.

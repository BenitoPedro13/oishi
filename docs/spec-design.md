# Oishi Cozinha Japonesa — Design Spec

> **Tokens, typography, and rules.** Layout and motion scenes live in
> **`spec-reference-scenes.md`** (frame evidence in `references/websites/new-sushism/`).
> Component mapping: **`spec-component-registry.md`**. Reference capture:
> `references/websites/new-sushism.mov` (84.68s, ffmpeg). Brand: `spec-brand.md`.
> Facts: `data-inventory.md`. Platform: `spec-architecture.md`.

---

## 1. What this is designed against

> **Scene-by-scene definitions:** `spec-reference-scenes.md`. Summary below retained
> for grep compatibility; do not implement from this table alone.

**new-sushism.jp**, decomposed from the capture. Its language, in the order it appears:

| # | Device | Frames |
|---|---|---|
| 1 | Black preloader: the mark centred, tagline in JP over EN, then an **ink-dissolve** reveal | 3–13 |
| 2 | Full-bleed hero video, huge display headline over it, tiny JP line above | 1–2, 14–17 |
| 3 | On scroll the hero **does not scroll away** — it is progressively **inset into a floating panel** while the dark ground appears behind it | 17–21 |
| 4 | The next headline **assembles from separately-positioned words** entering at different speeds | 18–24 |
| 5 | A `writing-mode: vertical-rl` Japanese column scrolling at its own rate | 19–30 |
| 6 | Media panels at several scroll speeds, type **interleaved in z** — behind some panels, in front of others | 22–36 |
| 7 | Full-bleed **red** section, huge kanji layered *behind/through* the Latin headline, line-art map | 26–30 |
| 8 | A **red circle that scales up** into a full-bleed red band as a section header | 31–32, 66–68 |
| 9 | Chapter pages: numbered `01 / 02 / 03`, full-bleed portrait, name at display size | 33–48 |
| 10 | Page transitions as a **sumi-e ink splatter** mask that grows, holds black, and dissolves out | 37–40, 61–64 |
| 11 | Horizontal media rail near the end | 74–78 |
| 12 | Full red footer: giant `CONTACT` with kanji overprinted, marquee | 79–85 |

Sampled values (ffmpeg, not memory): its red is **`#D42C21`**; its ground is a **warm
near-black `#18110E`–`#1A120E`**, never `#000`.

### 1.1 The three things that actually make it feel expensive

Everything else is decoration. These three carry it:

1. **Scroll scrubs a timeline; it does not trigger animations.** Every position is a pure
   function of scroll offset, reversible, and scrubbable. Nothing "plays".
2. **Depth comes from differential scroll speed, not from shadows.** Four or five layers
   each moving at their own rate, with type interleaved *between* the media layers in z.
3. **Type is set as positioned words, not as paragraphs.** A headline is four objects on a
   grid, each with its own speed — so the line composes itself as you scroll and is a
   different composition at every offset.

**These three are what we are copying.** Not the ink splatter, not the map.

---

## 2. Reference copy + hybrid photo policy

**Retired:** the old "type-led substitution" table. We now **copy new-sushism's layout,
timing, and motion literally** (`spec-reference-scenes.md`), swapping Oishi content and
sampled tokens. See `spec-brand.md` §2.3.

### 2.1 Photo tiers (still measured — ffmpeg)

| Tier | Mean luminance | Count | Permitted use |
|---|---|---|---|
| **A** | ≤ 90 | 15 | Full-bleed hero, chapter portraits, large panels |
| **B** | 91–145 | 20 | Framed panels ≤ 40vw after grading |
| **C** | > 145 | 9 | Thumbnail / cursor-trail only; **never full-bleed** |

**Hybrid rule:** every reference media slot gets Tier A/B if available; otherwise the **same
grid position** renders a colour-field + type fallback — never a promoted Tier C, never
stock/AI imagery (`§10.2`, `§13` rule 14).

### 2.2 Oishi-only insert

**Two-price table** (`§5`, Scene 9 in `spec-reference-scenes.md`) — the reference has no
equivalent; it is the reason the site exists.

### 2.3 Honest absence

No photograph → type or colour-field at that slot, not a borrowed image. `[VERIFICAR]` for
missing facts. §10.5 lists shoot upgrades (Q12).

---

## 3. The signature

### 3.1 `味` — the seal

The kanji from the logo's disc (`spec-brand.md` §1.2) is the site's structural mark. It
appears at exactly four scales, and nowhere else:

| Scale | Use | Treatment |
|---|---|---|
| **Seal** — 20–28px | Header mark, favicon, scroll-to-top, list bullets on the price table | Solid `--washi` on `--hinomaru` disc |
| **Chapter** — 96–160px | Beside a section number `01 / 02 / 03` | `--hinomaru` at 100%, or outline |
| **Ghost** — 40–70vw | One per section maximum, as the bottom layer of the depth stack | `--washi` at 4–7% opacity, or `--sumi` at 12% on red |
| **Splash** — 100vw+, cropped | The loader, and the `/contato` footer | Bleeds past two edges, always cropped, never fully visible |

**Rules.** The ghost `味` is a *ground*, never a decoration on a busy screen — one per
section, always the furthest-back layer, always crossed by type or a panel. It never sits
alone in empty space. It is never rotated, never mirrored, never recoloured outside the
table above.

### 3.2 The *hinomaru* — the circle

The disc is the second structural device, and it does the reference's job (frames 31–32):
**a section transition is a circle that scales.**

- Enters as a circle at `clamp(140px, 22vw, 320px)`, centred, filled `--hinomaru`
- Section label reversed out in `--washi` at its centre
- Scrubbed by scroll: the circle scales until it exceeds the viewport and the section
  becomes a full-bleed red field

The gradient is real and sampled: `linear-gradient(180deg, #9A1114, #C6151B 55%, #E71B23)`
— the actual vertical graduation of the logo's disc, measured with ffmpeg. Flat
`--hinomaru` is also valid; those two are the only fills a disc ever gets.

**A disc always carries something** — a label, a number, a price, `味`. An empty red circle
is out of spec, the same way a `[VERIFICAR]` is not decoration.

### 3.3 The lockup

The supplied logo is a 1080px JPEG on white (`data-inventory.md` §1.1, Q1). It cannot be
placed on `--sumi`.

**Until a vector arrives:**

- **`味` and the disc are redrawn as SVG paths** in `src/lib/marca-paths.ts` — traced from
  the logo, one source for header, favicon, apple-icon and OG card, exactly as the sibling
  Trísion repo does it. They cannot drift, and they work on any ground.
- **The `Oishi` brush wordmark is used only where a light ground exists**, from a
  background-removed PNG produced by `scripts/normalizar-marca.ts`. It is **never** re-set
  in a substitute typeface — Archivo is not the logo (`spec-brand.md` §5.6).
- The header therefore carries **`味` disc + `Oishi` set in Archivo as a *wordmark
  stand-in*, marked `[VERIFICAR: aguardando vetor — Q1]` in the code**, not silently
  presented as the real lockup.

---

## 4. Colour

Every value below was **sampled with ffmpeg** from Oishi's own material, not chosen from
memory (`AGENTS.md` §2.1). The logo disc is a vertical gradient, so three reds are real.

### 4.1 Tokens

```css
:root {
  /* ground — warm ink, never pure black (§4.3) */
  --sumi:            #14100F;  /* page ground */
  --sumi-alto:       #1F1917;  /* raised surface: panels, cards, inputs */
  --sumi-linha:      #2E2725;  /* hairlines, dividers, input borders */

  /* the hinomaru — sampled from logo.jpg, top → bottom of the disc */
  --hinomaru-escuro: #9A1114;  /* disc top */
  --hinomaru:        #C6151B;  /* disc mid — THE brand red */
  --hinomaru-claro:  #E71B23;  /* disc bottom — gradients, hover */

  /* light */
  --washi:           #F4F1EC;  /* body text and reversed type — warm off-white */
  --foco:            #FFFFFF;  /* in-focus only, never body text (§4.4) */
  --cinza:           #8C8480;  /* secondary text, labels */
  --cinza-claro:     #A8A09B;  /* secondary text on dense screens */

  --radius: 0;                 /* §9.3 */
}
```

### 4.2 Measured contrast — these are computed, not estimated

| Foreground | Ground | Ratio | Verdict |
|---|---|---|---|
| `--washi` | `--sumi` | **16.78:1** | AAA — body text |
| `--washi` | `--sumi-alto` | **15.41:1** | AAA — body on panels |
| `--foco` | `--sumi` | **18.91:1** | AAA — focus only |
| `--cinza-claro` | `--sumi` | **7.35:1** | AAA — secondary |
| `--cinza` | `--sumi` | **5.16:1** | AA — labels ≥14px |
| `--hinomaru` | `--sumi` | **3.17:1** | ⚠️ **large text only** |
| `--hinomaru-claro` | `--sumi` | **4.12:1** | ⚠️ **large text only** |
| `--washi` | `--hinomaru` | **5.29:1** | AA — reversed text on red ✅ |
| `--foco` | `--hinomaru` | **5.96:1** | AA |
| `--washi` | `--hinomaru-escuro` | **7.56:1** | AAA |
| `--sumi` | `--hinomaru` | **3.17:1** | large text only |

### 4.3 The ground is warm, and it is not black

`--sumi` is `#14100F`, not `#000000`. The reference's ground measures `#18110E` — a warm
brown-black — and that warmth is a large part of why it feels filmic rather than harsh.
Oishi's own flyers use near-pure black, which is exactly why they look like flyers.

**Pure `#000` appears nowhere on this site**, including in gradient stops and overlays.

### 4.4 Rules that follow from the numbers

- **`--hinomaru` is never body text.** 3.17:1 fails AA. Red is for: fills, display type
  ≥32px at weight ≥700, hairlines, the disc, and marks. This is measured, not aesthetic.
- **On a red fill, text is `--washi`.** 5.29:1 passes. (Unlike the Trísion gold rule —
  Oishi's red is dark enough to reverse out of.)
- **`--foco` `#FFFFFF` is not a text colour.** Body is `--washi`. Pure white marks the one
  element currently hovered, focused or selected — one at a time.
- **No second accent colour.** No gold, no orange, no green, no teal — all four appear in
  the current flyers and all four are retired (`spec-brand.md` §4). The only colours a
  screen may add are the ones inside a photograph.
- **A red field is a section, not an accent.** Red is either a hairline-scale mark or an
  entire screen. Nothing in between — no red cards, no red buttons floating in a dark
  section except the one primary CTA per screen.

---

## 5. The price pair — the technical layer

The two-price structure is Oishi's `52□18-145`: the one piece of data whose typography is
specified exactly, because it is the reason the site exists.

**Canonical form:**

```
R$ 74,90            ← --cinza-claro, strikethrough-adjacent (see below), tabular
R$ 54,90            ← --washi at display scale, tabular
sem desperdício     ← --hinomaru, uppercase, 0.14em tracking, ≥14px
```

**Rules**

1. **Both prices always appear together.** Rendering `R$ 54,90` alone is a false price —
   it is conditional on the whole table finishing. Rendering `R$ 74,90` alone throws away
   the thesis.
2. **The standard price is not struck through.** It is not a discount that expired; it is
   what you pay if you waste food. It is set smaller and in `--cinza-claro`, above.
3. **The condition is never paraphrased.** The verbatim string from `data-inventory.md`
   §4 appears at least once per screen that shows a price.
4. **Numerals are tabular** (`font-variant-numeric: tabular-nums`) so the four tiers align
   on the comma.
5. **`R$` is set at 0.55em, baseline-aligned**, in `--cinza-claro` — the number is the
   message.
6. **Prices come from `content/rodizios.ts`**, which carries a `verificadoEm` date. A
   price string is never typed into a component (`spec-architecture.md` §5.2).
7. **A tier missing a price renders no price** — not `—`, not `Consultar`, not `R$ 0,00`.

---

## 6. Type

### 6.1 The families — two, and one is subset to 30 characters

| Role | Family | Loading |
|---|---|---|
| Display, UI, everything Latin | **Archivo** (variable: `wght` 100–900, **`wdth` 62–125**) | `next/font/google`, self-hosted, `display: swap` |
| Japanese | **Shippori Mincho** | `next/font/local`, **subset to the exact glyph set in §6.4** |

**Archivo is chosen for its `wdth` axis.** That single axis produces the entire reference
type system from one family: `wdth 62` for tight condensed headlines, `wdth 112–125` at
`wght 800` for the wide heavy nav lockups and section labels. Without a width axis this
needs two or three families. It has full pt-BR coverage (`ã ç é í ó ú â ê ô`).

**No mono.** Numerals use Archivo's tabular figures. One family fewer to load.

### 6.2 Scale

Fluid, `clamp()`-based, on a 1.333 (perfect fourth) ratio at desktop.

| Token | Size | Settings |
|---|---|---|
| `--t-splash` | `clamp(4rem, 17vw, 15rem)` | `wght 800`, `wdth 70`, tracking `-0.03em`, leading `0.82` |
| `--t-display` | `clamp(2.75rem, 8vw, 7rem)` | `wght 800`, `wdth 75`, tracking `-0.025em`, leading `0.88` |
| `--t-titulo` | `clamp(2rem, 4.5vw, 3.5rem)` | `wght 700`, `wdth 85`, tracking `-0.015em`, leading `0.95` |
| `--t-preco` | `clamp(2.5rem, 6vw, 5rem)` | `wght 800`, `wdth 100`, **tabular**, tracking `-0.02em` |
| `--t-corpo` | `clamp(1rem, 1.05vw, 1.125rem)` | `wght 400`, `wdth 100`, leading `1.6`, max `62ch` |
| `--t-rotulo` | `0.6875rem` (11px) | `wght 700`, `wdth 112`, **uppercase**, tracking `0.16em` |
| `--t-numero` | `clamp(3rem, 7vw, 6rem)` | `wght 800`, `wdth 62`, tabular — chapter numerals |

### 6.3 The nav lockup — the reference's most stealable idea

Measured from the capture's nav bar (frame at 46s): every nav item is a **two-part lockup**
— a two-line micro-label to the *left* of a large heavy Latin word, optically baseline-aligned.

```
品書  CARDÁPIO          放題  RODÍZIO          予約  RESERVA
menu                    01                     
```

- Micro-label: `--t-rotulo` at 9–10px, `--cinza`, two stacked lines, `line-height: 1.05`
- Word: Archivo `wght 800`, `wdth 108`, 15–17px, uppercase, `--washi`
- The kanji line sits above the roman line; both are optically aligned to the word's cap
  height, not its baseline

This is the site's most recognisable component and costs nothing. `Componente: MarcaItem`.

### 6.4 The complete Japanese glyph set — this list is exhaustive

**Every Japanese character permitted on this site**, with reading and gloss. The Shippori
Mincho subset is generated from exactly this list with `pyftsubset`; a character not on
this list cannot render, by construction.

| Glyph | Reading | Gloss | Used for |
|---|---|---|---|
| 味 | *aji* | flavour | The mark (§3.1) |
| 品書 | *shinagaki* | bill of fare | `CARDÁPIO` |
| 放題 | *hōdai* | unlimited (← 食べ放題) | `RODÍZIO` |
| 予約 | *yoyaku* | reservation | `RESERVA` |
| 出前 | *demae* | food delivery | `DELIVERY` |
| 連絡 | *renraku* | contact | `CONTATO` |
| 無駄 | *muda* | waste | The campaign chapter |
| 一 二 三 | *ichi ni san* | 1 2 3 | Chapter numerals beside `01 02 03` |
| 小 | *shō* | small | Beside `Chisai` (小さい — their own tier name) |
| 刺身 | *sashimi* | sashimi | The `com sashimi` tier |
| 営業時間 | *eigyō jikan* | opening hours | The hours module |
| いらっしゃいませ | *irasshaimase* | welcome | The loader — from their **real neon sign** |

**Rules.** Japanese is texture; no customer is asked to read it for meaning
(`spec-brand.md` §3.2). Every glyph above pairs with its Portuguese equivalent in the same
lockup. `放題` is a real abbreviation of `食べ放題` and the correct term for rodízio —
`回転` (*kaiten*, conveyor-belt) would be **wrong** and must not be used.
**This set is reviewed by a Japanese reader before launch** — a wrong kanji on a Japanese
restaurant is the most embarrassing possible bug. `[VERIFICAR: revisão nativa do §6.4]`

### 6.5 Positioned-word headlines

The reference's headlines are not paragraphs — they are **words placed on a grid, each
with its own scroll speed** (§1.1.3). Oishi's implementation:

```tsx
<Manchete
  linhas={[
    [{ t: 'COMA TUDO',  col: '1 / 6',  v: 1.00 }],
    [{ t: 'O QUE',      col: '2 / 5',  v: 1.18 },
     { t: 'PEDIR',      col: '7 / 12', v: 0.86 }],
  ]}
/>
```

`v` is the scroll-speed multiplier (`0.8`–`1.25`). Text remains a single accessible string
in the DOM order given; the visual scatter is `grid-column` plus transform.

**Rules.** Never more than two speed groups per line, or it reads as broken rather than
composed. Below `768px` the scatter collapses to a normal stacked headline with `v = 1` —
there is no horizontal room for the effect and it degrades into chaos.

---

## 7. Motion

### 7.1 The principle

**Scroll scrubs a timeline. Nothing "plays" on entry.** Every scroll-linked value is a
pure function of offset — reversible, scrubbable, identical at the same offset in both
directions (§1.1.1). One-shot entrance animations are permitted **only** for elements that
are not scroll-linked (the loader, a modal, a hover).

### 7.2 The stack, and which library owns what

| Job | Tool | Why |
|---|---|---|
| Scroll-scrubbed timelines, pinning, the hero inset | **GSAP + ScrollTrigger** (`gsap`, `@gsap/react`) | `scrub: true` + pinning is what ScrollTrigger is for, and nothing else does it as reliably |
| Smooth scroll normalisation | **Lenis** | Trackpad/wheel/OS scroll normalised so scrub feels the same everywhere; `lenis.on('scroll', ScrollTrigger.update)` |
| Component transitions, gestures, hover, layout, exit | **Motion** (`motion/react`) | Declarative, small, already the house library |
| Page transitions (the ink dissolve) | **Motion** `AnimatePresence` + an SVG mask | §7.6 |

**One job, one library.** GSAP does not animate hovers; Motion does not drive scrubbed
scroll timelines. Mixed ownership of one property is a bug.

### 7.3 Easing and duration

```
--ease-saida:   cubic-bezier(0.22, 1, 0.36, 1)     /* expo-out — reveals, entrances */
--ease-suave:   cubic-bezier(0.65, 0, 0.35, 1)     /* in-out — transforms, morphs */
--ease-rapido:  cubic-bezier(0.4,  0, 0.2,  1)     /* UI: hover, focus, toggles */

--dur-micro: 180ms   /* hover, focus ring */
--dur-ui:    340ms   /* panel, drawer, accordion */
--dur-cena:  900ms   /* section reveal, disc expansion */
--dur-pagina: 1200ms /* the ink transition, in + out */
```

Scroll-scrubbed motion has **no duration** — it has a range. Never both.

### 7.4 The five scroll mechanics

Named, so a task doc can cite one.

**M1 — Recorte do herói (the hero inset).** The reference's best move (frames 17–21). The
hero does **not** translate away. It is pinned, and a `clip-path: inset()` is scrubbed
from `0%` to a framed panel, revealing `--sumi` behind it. Scale drifts `1 → 1.06`
simultaneously so the crop feels like a camera push, not a mask.

```
scrollTrigger: { start: 'top top', end: '+=90%', scrub: true, pin: true }
clipPath: inset(0%) → inset(14% 26% 30% 8%)
scale: 1 → 1.06
```

**M2 — Profundidade diferencial (differential depth).** Four layers, each with a `v`
multiplier, `y: (1 - v) * range`:

| Layer | `v` | Contents |
|---|---|---|
| Ground | `0.72` | Ghost `味`, colour field, line art |
| Media, far | `0.86` | Small graded photo panels |
| Type | `1.00` | Headline words (each ±0.2, §6.5) |
| Media, near | `1.14` | One large panel that overtakes the type |

**The near media layer must cross in front of the type layer** at some scroll offset. That
z-interleave is the whole effect (§1.1.2); parallax without it just looks like lag.

**M3 — Disco que cresce (the expanding disc).** §3.2. Scrubbed `scale` from a circle to
beyond the viewport; the label inside counter-scales so it stays legible at a constant
size. Ends as a full-bleed red field.

**M4 — Coluna vertical (the vertical column).** A `writing-mode: vertical-rl` Japanese
line pinned to a section edge, scrubbed at `v = 0.8`, `--washi` at 55%, `--t-rotulo`
sizing. **Maximum one per section**, and never over a photograph — only over a flat field.

**M5 — Contador de preço (the price counter).** §11.3. On a scrubbed range, the standard
price counts **down** to the zero-waste price while the type scales up and the `sem
desperdício` label wipes in. The one place numerals are animated — because the number
*is* the argument. Uses tabular figures so nothing reflows.

### 7.5 The loader

Occurs **once per session** (`sessionStorage`), maximum **1400ms**, and never blocks
interaction after it. Sequence, mirroring frames 3–13:

1. `--sumi` field, `味` splash cropped at 100vw+, `--washi` at 6% — `0ms`
2. `いらっしゃいませ` in Shippori Mincho, then `Bem-vindo ao Oishi` beneath — `240ms`
3. Ink dissolve out (§7.6) revealing the hero — `900ms → 1400ms`

**It is skipped entirely** under `prefers-reduced-motion`, on a repeat visit in the same
session, and if the hero's own assets are already decoded. A loader that delays content
for a first-time hungry customer at 22h is a tax, not an experience.

### 7.6 The ink transition

The reference's page transition is a **sumi-e splatter mask** that grows to cover, holds,
and dissolves out (frames 37–40, 61–64).

**Implementation.** A single SVG `<mask>` containing 3–4 traced ink-blot paths, animated by
scaling the mask group from `0.2 → 3.2` with `--ease-suave`, over `--dur-pagina`. The blot
paths are **traced from real brush marks** and committed to `src/lib/tinta-paths.ts` —
never generated by a filter chain, and never a CSS `blur()` fake, which reads as a smudge
rather than ink.

**Cost control.** The mask animates `transform` only — no filter, no per-frame path
recalculation. If `matchMedia('(prefers-reduced-motion)')` matches, the transition is a
`180ms` opacity crossfade instead, and the site remains complete.

### 7.7 Reduced motion is a complete site, not a degraded one

Under `prefers-reduced-motion: reduce`:

| Mechanic | Reduced behaviour |
|---|---|
| M1 hero inset | Renders in its **final** framed state, static. Not pinned. |
| M2 depth | All layers `v = 1`. The composition stays; the movement goes. |
| M3 disc | Renders as the full red field directly. |
| M4 vertical column | Static, in place. |
| M5 price counter | Both prices render at final value, no count. |
| Loader | Skipped. |
| Ink transition | 180ms crossfade. |
| Marquee | Static, first frame. |

**Every fact, every price, every CTA is present and reachable in the reduced-motion
build.** Nothing is revealed only by animation. This is testable: the verification script
loads every route with reduced motion forced and asserts the price strings are in the DOM.

---

## 8. Components — which library owns what

**Master registry:** `spec-component-registry.md` — scene → [React Bits](https://reactbits.dev/) /
[Magic UI](https://magicui.design/docs/components) / [21st.dev](https://21st.dev/) mapping.

Order of preference:

1. **Hand-written brand components** — `Selo`, `Disco`, `MarcaItem`, `Manchete`, `ParPreco`,
   `ColunaVertical`, `Tinta`, `PainelMidia`. Libs animate *around* these; they do not replace them.
2. **Vendored lib components** in `src/components/bits/`, `magic/`, `21st/` — one scene owner
   each; logged in folder `SOURCES.md`; restyled through tokens only.
3. **shadcn/ui** for form primitives (`/reserva`) — per-component install.

### 8.1 Scroll vs time ownership

| Job | Owner |
|---|---|
| Pin, scrub, clip-path, differential depth | GSAP ScrollTrigger + Lenis |
| Loader, ink transition, hover, load-time text reveal | Motion + vendored lib components |
| **Never** both on the same CSS property | — |

### 8.2 Vendoring rules

Copy byte-identical where possible; log URL + sha256 + date in `SOURCES.md`. No second accent
colour via lib defaults (§4.4). Scramble/decrypt effects **not** on prices or addresses.

---

## 9. Layout

### 9.1 The grid

12 columns, `gutter: clamp(16px, 2.2vw, 32px)`, `max-width: 1680px`. Full-bleed sections
break the container deliberately; body copy never exceeds `62ch`.

The reference's compositions are **asymmetric and deliberately unbalanced** — a headline
starting at column 2 and ending at 6, an image spanning 7–12 and bleeding off the right
edge. Symmetry is the default only for the price table (§11.3), where alignment carries
meaning.

### 9.2 Breakpoints

`480` / `768` / `1024` / `1440`. **768 is the honest one**: below it, positioned-word
headlines collapse to stacked (§6.5), depth collapses to `v = 1` for the media layers, the
vertical column is removed entirely, and the disc transition becomes a simple field.

**The mobile site is the primary site.** Someone deciding where to eat tonight, in São
Gonçalo, at 20h, is on a phone on mobile data. Every decision above is judged there first.

### 9.3 Corners and edges

`--radius: 0`. Sharp corners everywhere — panels, inputs, buttons, media. The one named
exception is the **disc**, which is a circle by definition, and the loader's
`いらっしゃいませ` neon reference. Rounded corners on a card would put the site back in the
same visual bracket as every restaurant template it is trying to beat.

Media panels get a `1px` `--sumi-linha` edge, not a shadow. **No box-shadows anywhere**;
depth comes from scroll speed and overlap (§7.4 M2).

---

## 10. Photography standard

### 10.1 The pipeline is scripted, never manual

`scripts/normalizar-imagens.ts`, using **sharp** (`AGENTS.md` §2.1). It reads
`references/instagram/`, and writes `public/fotos/` + a generated `src/content/fotos.ts`
manifest. No image is hand-edited, and no image is committed without passing through it.

### 10.2 Automated triage

The script classifies every source image by **measured mean luminance** and records its
tier in the manifest (the measurement in §2 is its first run):

| Tier | Rule | Permitted use |
|---|---|---|
| **A** | mean ≤ 90 | Full-bleed, hero panels, `PainelMidia` at any size |
| **B** | 91–145 | Framed `PainelMidia` only, ≤ 40vw, after grading |
| **C** | > 145 | **Thumbnail or cursor-trail only.** Never larger than 220px. Never full-bleed. |
| **G** | marketing graphic (manual flag) | **Never used as photography.** Excluded from every gallery. |

A component asking for a Tier A slot when only Tier B images remain **renders its
typographic fallback** (§2.3) rather than promoting an unsuitable image.

### 10.3 The grade

Applied uniformly, so 44 photos taken over three years by four different people on three
different phones read as one library:

1. **Crop** to `3:2`, `4:5`, `1:1`, `16:9` — attention-centred, not centre-centred
2. **Highlight rolloff** — recover the blown flash hotspots that Tier B and C all share
3. **Warm the shadows** toward `--sumi` so a photo's darkest value matches the page ground
4. **Desaturate greens by ~25%** — the parsley and lettuce garnish is the single loudest
   tell of amateur food photography, and it fights `--hinomaru` on the colour wheel
5. **Vignette**, 12–18%, to seat the frame on the dark ground
6. Output **AVIF + WebP**, widths `[400, 800, 1200, 1800]`, quality 72/80

### 10.4 The shoot brief (Q12) — 14 frames

If anyone can shoot, this is the list, in priority order. All at 18h30–19h30 with the room
lights on, no flash, phone in portrait 4:5, wiped lens:

1. The rodízio table mid-service, from standing height, plates in shot
2. Hands assembling a uramaki on the counter — the single most valuable frame
3. The *noren* with the ukiyo-e print, doorway light behind it
4. The neon `いらっしゃいませ` sign, room dark
5. The *maneki-neko* on its shelf, shallow depth
6. A sashimi plate on slate, one light source, dark ground
7. The plate seal flags planted in a dish, close (`spec-brand.md` §4)
8. The frontage at dusk with the sign lit
9. The dining room with people in it, backs to camera, no faces without consent
10. Salmon being sliced, motion blur welcome
11. A tempura basket coming out, steam visible
12. The full *combinado* platter from directly above
13. A table finishing a rodízio with **clean plates** — the campaign made literal
14. Whoever runs the place, in the doorway, looking at the camera

**Frames 2, 13 and 14 are worth the other eleven combined**: they are the only ones that
give the site a person, a process and a proof.

### 10.5 Slots waiting on the shoot

Ship in typographic form now; upgrade when frames arrive. Each is one prop change.

| Slot | Now | With the shoot |
|---|---|---|
| Hero | Red-to-ink field + ghost `味` (§11.1) | Frame 2 or 1, full-bleed |
| Waste chapter | Type on red (§11.3) | Frame 13 behind the type |
| `/contato` | `味` splash + map | Frame 8 |
| About | Not built | Frames 3, 4, 5, 14 |

---

## 11. Screens

> **Authoritative scene definitions:** `spec-reference-scenes.md` (Scenes 0–11, frame-cited).
> Summaries below retained for quick grep; implement from the scene spec.

### 11.1 `/` — the hero

Full-bleed, `100dvh`. Bottom layer: the ghost `味` at 62vw, `--washi` 5%, cropped by two
edges. Ground: a scrubbed gradient from `--hinomaru-escuro` at the top edge into `--sumi`.

Headline as positioned words (§6.5), `--t-splash`:

```
COMA TUDO          ← --washi
O QUE PEDIR.       ← --washi
PAGUE MENOS.       ← --hinomaru-claro, wght 800 (4.12:1 — display size only, §4.4)
```

Above it, `--t-rotulo`: `味  OISHI COZINHA JAPONESA · SÃO GONÇALO [VERIFICAR: Q2]`

Below the fold line, and **this is non-negotiable** (`spec-brand.md` §2.2): the open state,
the address, and three CTAs — `Pedir no delivery` · `Reservar mesa` · `Chamar no WhatsApp`
— reachable without scrolling on a 390×844 phone. The cinema starts at scroll offset 1,
not offset 0.

Scroll transition: **M1** (§7.4).

### 11.2 `/` — the introduction

M2 depth stack. Positioned-word headline over a `ColunaVertical` reading `味 — 新鮮` …
no: reading from the §6.4 set only. Three Tier A panels at three speeds, one crossing in
front of the type.

### 11.3 `/` — the waste chapter — **the largest moment on the site**

Enters via **M3**: the disc grows from `無駄 / DESPERDÍCIO` into a full-bleed
`--hinomaru` field.

On red, in `--washi`:

- The four statistics (`data-inventory.md` §8) as positioned words, one per scroll beat,
  each at `--t-titulo`
- Then the four tiers, symmetric (§9.1), each a `ParPreco` (§5)
- **M5** scrubs each price down from standard to zero-waste as it enters
- A **marquee** (§8.1) carrying the verbatim condition string, never stopping
- CTA: `Ver o cardápio completo` → `/cardapio`

This section answers "how much" — the top search intent — with the brand's best idea
attached. It must be reachable from the nav in one click on mobile.

### 11.4 `/rodizio/[slug]` — the three chapters

The reference's `AREA 01/02/03` artisan pages (§1.9), remapped: **the three rodízios are
the three chapters** (§2.1).

| Slug | Chapter | Kanji | Tiers shown |
|---|---|---|---|
| `chisai` | `01` | `小` | Chisai |
| `sem-sashimi` | `02` | `放題` | sem sashimi |
| `com-sashimi` | `03` | `刺身` | com limite + ilimitado |

Each: **M3** disc entry → chapter numeral at `--t-numero` with its kanji → the tier's
`ParPreco` → the full item list by station (`Cozinha` / `Sushibah`), item names **verbatim**
(`spec-brand.md` §5.5) → `Outros rodízios` cross-links, mirroring the reference's `OTHER
STORY` module (frames 61–63).

### 11.5 `/cardapio`

All three rodízios in one crawlable, searchable document — the direct answer to
`spec-brand.md` §1.4's most expensive problem. Sticky station nav. Real `<h2>/<h3>/<ul>`,
not an image. Image-trail (§8.1) on desktop only.

Carries an explicit, honest module: the rodízios are complete and priced here; the à la
carte and delivery menu lives at `pedido.anota.ai` (`data-inventory.md` §6). It does not
pretend to be a full menu.

### 11.6 `/reserva`

The `reservation-form-reference.html` field set, rebuilt on shadcn and Oishi's tokens.
**Sushi da Praça's rules panel is not copied** (`data-inventory.md` §7) — the panel renders
only facts from `data-inventory.md`, and `[VERIFICAR: Q8]` where there are none.

Submits to WhatsApp (`spec-architecture.md` §6.3), not to a database. Ground is `--sumi`,
inputs `--sumi-alto` with `--sumi-linha` borders, radius `0`, the submit button the one
`--hinomaru` fill on the screen.

### 11.7 `/contato`

`味` splash (§3.1), address, the one sourced hours line, map, WhatsApp, Instagram, and the
`Como chegar` link. The footer is the reference's red `CONTACT` band (frames 79–85):
`CONTATO` at `--t-splash` in `--washi` on `--hinomaru`, `連絡` overprinted in `--sumi`.

---

## 12. Budgets — measured, not asserted

| Metric | Budget | How it is measured |
|---|---|---|
| LCP, mobile, 4G throttled | **≤ 2.5s** | Lighthouse CI, `scripts/verificar.mts`, median of 5 |
| CLS | **≤ 0.05** | same |
| INP | **≤ 200ms** | same |
| JS, `/`, gzipped | **≤ 350 KB** (remeasure) | `next build` output. Lib-heavy `/` route; old 210 KB target obsolete after `spec-component-registry.md` |
| JS, `/cardapio`, gzipped | **≤ 130 KB** | must stay light — highest-intent page |
| Shippori Mincho subset | **≤ 40 KB** | `ls -l` on the built font; ~30 glyphs (§6.4) |
| Largest image, any route | **≤ 180 KB** | manifest assertion in the build |
| Accessibility | **0 serious/critical axe violations** on every route | Playwright + `@axe-core/playwright` |
| Reduced motion | **every price string present in the DOM** with motion disabled | Playwright, forced `prefers-reduced-motion` |
| Contrast | every pair in §4.2 recomputed | script, not eyeballed |

No criterion here rests on "works", "fast" or "looks good".

---

## 13. The rules that are never broken

1. **No fact on screen that is not in `data-inventory.md`.** Honest absence beats a plausible placeholder.
2. **Both prices, always together, condition verbatim** (§5).
3. **`--hinomaru` is never body text** — 3.17:1, measured (§4.4).
4. **`--foco` `#FFFFFF` is not a text colour** — one in-focus element at a time.
5. **No second accent colour.** No gold, orange, green, teal.
6. **Pure `#000` appears nowhere** (§4.3).
7. **`--radius: 0`**, disc excepted. No box-shadows.
8. **`味` is SVG from `marca-paths.ts`**, never a typed character, never rotated or recoloured outside §3.1.
9. **A disc always carries something** (§3.2).
10. **Scroll scrubs; it does not trigger** (§7.1).
11. **The near media layer crosses in front of the type layer** — parallax without the z-interleave is just lag (§7.4 M2).
12. **Reduced motion is a complete site** — every price and CTA present, tested (§7.7).
13. **No photograph above its measured tier** (§10.2). Tier C never exceeds 220px.
14. **No stock photography, no AI imagery, no competitor's photographs. Ever** (§2.3).
15. **A React Bits component needs a sentence naming its brand fact.** The rejected list in §8.1 is binding.
16. **shadcn and React Bits are vendored byte-identical** with `SOURCES.md` + sha256.
17. **Every Japanese glyph is on the §6.4 list**, or it does not render.
18. **The mobile site is the primary site** (§9.2). Above the fold: open state, address, three CTAs.
19. **Menu item names verbatim** until Q6 is answered.
20. **One family plus one subset JP face.** A third typeface needs a task doc explaining why.

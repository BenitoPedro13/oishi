# Oishi — Scenes 3–5, frame-detailed (Intro words M2 / About vertical / Red map M3)

> **Deepens `spec-reference-scenes.md` Scenes 3–5.** Sourced from
> `references/websites/new-sushism.mov`, decomposed at 1fps into
> `references/websites/new-sushism/frames/sec/sec_001.jpg`–`sec_085.jpg`. Each scene there
> previously cited a *single* still (`sec_020`, `sec_025`, `sec_030`) — this file walks the
> full run around each (`sec_018`–`sec_032`) so the scroll-driven motion is actually traced,
> not guessed from one frame. 1fps is too coarse for wall-clock timing on a scroll-scrubbed
> mechanic anyway — what matters is the **scroll-progress → visual-state mapping**, which a
> ~1s cadence resolves reasonably well for sections this long. Colour sampled with `ffmpeg`
> pixel probes where relevant, not eyeballed, per this repo's CLAUDE.md.
>
> **Headline finding that changes the shape of all three scenes:** the reference's own copy
> at these three scenes is editorial/philosophical prose about *their* craft and history —
> content Oishi has no verified equivalent for in `data-inventory.md`. Where the existing
> low-detail spec assumed Oishi content slots directly into the reference's structure, two
> of these three scenes (4 and 5) need a bigger content rethink than "swap the words," not
> just a swap — flagged per-scene below.

---

## Scene 3 — Intro / positioned words M2 (`sec_018`–`sec_023`)

### What's actually there (not what the old spec said)

The old entry described "3 media panels at differential speeds" behind a single
positioned-word headline with a small vertical JP column. What's actually on tape is a
**sequence of multiple headline beats**, each one a distinct 2–3-word phrase laid directly
**over a photo panel as the panel's own background** — not white text on flat `--sumi` with
small photo "chips" beside it (which is what `introducao.tsx` currently builds).

- **`sec_018`** (first beat, entering): three photo panels side by side, each roughly
  equal width (~1/3 viewport), each with two lines of bold condensed white caps overlaid
  directly on the photo (a dark scrim/shadow under the type, not a separate text block):
  panel 1 "INNOVATION / WHERE", panel 2 "AND / SUSHI", panel 3 "TRADITION, / EVOLVES".
  Full sentence in reading order: *"Innovation where and sushi tradition, evolves"* — reads
  oddly in isolation because the panels are the actual layout unit, not a normal sentence
  flow; each panel is a bespoke crop framing part of the phrase.
- **`sec_020`**: panel 1 has scrolled almost fully off the top (only a sliver of its bottom
  edge visible) while panel 2 and panel 3 are still fully in view at *different* vertical
  offsets from each other — hard confirmation of differential scroll speed, not a synced
  3-up grid. Between/below the panels, a **two-column vertical JP text block** appears,
  much larger and more central than the old spec's "small vertical JP column" suggested:
  right column 革新と伝統が交わる、("where innovation and tradition intersect,"), left
  column 新たな寿司の世界へ ("into a new world of sushi") — together one sentence split
  across two independently-scrolling vertical columns. A fourth photo panel (dark
  clothing/sleeve, partially cropped) is already entering at the bottom edge — confirming
  panels keep coming, this isn't a fixed set of exactly 3.
- **`sec_022`**: a **second headline beat** — "A NEW / ERA OF SUSHI" — now over a single
  remaining photo panel (chef preparing nigiri), with only the tail end of the vertical JP
  phrase visible top-right (界へ, the last two characters of the previous sentence,
  confirming that vertical column's own independent scroll rate carries it up and out well
  after the panels that were on screen with it initially).

**Correction to `spec-reference-scenes.md`:** this is not one positioned-word arrangement
with passive photo chips riding along — the **photo panels are the headline's background
layer**, and the headline itself runs across **multiple sequential beats** as you scroll
("INNOVATION WHERE AND SUSHI TRADITION, EVOLVES" → "A NEW ERA OF SUSHI" → likely more not
captured in this range), not a single static composition.

### Gap vs. current `introducao.tsx`

Read in full — current build diverges structurally, not just in copy:

1. **Text-over-photo vs. text-beside-photo.** Current code (`introducao.tsx:46–80`) renders
   plain `--washi` headline words on flat `bg-sumi`, with small fixed `14–20px` square photo
   "chips" (`chip1Ref`/`chip2Ref`/`chip3Ref`) sitting *next to* the words. The reference
   never separates them — the photo panel *is* the type's background, full-panel-sized
   (hundreds of px, not a small square).
2. **One beat vs. sequential beats.** Current code is a single static arrangement of four
   words ("RODÍZIO / DE VERDADE / SEM FALTAR / NADA."); the reference scrolls through
   multiple distinct headline+panel beats.
3. **Vertical JP column.** Current code (`introducao.tsx:35–44`) renders one short label
   (放題・品書・予約, a nav-style breadcrumb, not a sentence) at fixed small size/position.
   The reference's vertical JP is a full translated sentence split across two columns,
   larger, and scrolling at its own independent rate alongside (not fixed to) the panels.
4. **The differential-speed values themselves may still be roughly right** — current code's
   `gsap.fromTo` on `colunaRef`/`chip1-3Ref` with `y: -50→50`, `-70→40`, `-20→90`,
   `-100→30` (four different ranges/rates) is at least structurally the right idea
   (everything moves at its own rate); it's the *content each thing carries* that's wrong,
   not necessarily the parallax math.
5. **`introducao.tsx`'s own code comment already flags this as a deliberate, smaller
   substitute** ("scattered words with small photo chips... not big colliding panels"),
   so this isn't a bug — it's a scoped-down interim build. This doc is the evidence for
   deciding whether to build the fuller panel-as-background version.

### Content policy note

The reference's own headline copy here is marketing prose about *their* concept ("a new
era of sushi," "where innovation and tradition intersect"). Oishi's current substitution
("RODÍZIO DE VERDADE, SEM FALTAR NADA.") is legitimate Oishi-authored copy tied to the
waste-campaign thesis, not a literal translation — that's the right call per
`spec-brand.md`, not a gap. The gap is purely structural/visual (panels-as-background,
sequential beats, larger vertical JP), not copy.

---

## Scene 4 — About vertical (`sec_023`–`sec_027`)

### What's actually there (materially different from the old spec)

The old entry said "giant SOBRE; vertical JP; **3 vertical fact columns**." At `sec_025`
there is no such thing as 3 fact columns — there is:

- **Headline block**, right-of-centre: "ABOUT" in bold condensed caps at a moderate size
  (comparable to a large heading, not viewport-filling/"giant"), with 何者 ("who they
  are"/"what kind of people") beneath it at roughly half the size — a title + JP subtitle
  pair, not a single giant word.
- **Five columns of vertical running Japanese prose** filling the left ~60% of the frame —
  a full manifesto-style paragraph, right-to-left reading order, translating roughly to:
  *"They create the future of sushi. That is their way. Without forgetting respect for
  Edomae sushi, they carve a new path beyond its boundaries. Not bound by convention until
  now — they create the sushi of the future. Not merely preserving tradition, but
  challenging it — that is their style. Now, taste it here: a revolution in every bite,
  filled with challenge and passion."* This is editorial/interview-grade content about the
  restaurant's philosophy and history — not a set of 3 short "facts" (numbers, stats,
  labels) as the old spec implied.
- **A highlighted/spotlit text band**: one column (leftmost, "さぁ、ここで味わえ...") sits
  inside a soft blue-tinted highlight rectangle, distinct from the rest — reads as an
  active-passage spotlight tied to scroll position (the "currently in focus" line
  brightened/tinted while the rest sits at lower contrast), a mechanic not mentioned in the
  old spec at all.
- **Background**: the same photo panels from Scene 3, now blurred and dimmed heavily
  (heavy gaussian blur, low opacity) as a static backdrop — not a single "dark media"
  plate, but the previous section's own panels defocused and reused.
- Top nav persists, unchanged, transparent overlay — confirms nav treatment is constant
  across every section, not hero-only.

### Gap vs. current implementation

**There is no current implementation.** `grep -rli sobre src/` and a direct look at
`src/components/cena/` and `src/components/tipografia/` turned up nothing building an About
section — no giant headline, no vertical manifesto columns, no highlight-spotlight
mechanic. This scene is unbuilt, not merely divergent.

### Content policy note — this is the real blocker, not the missing component

Building this scene *as observed* would require Oishi's own philosophy/history prose at
the same length and specificity as the reference's five-column manifesto. Per this repo's
non-negotiable rule ("never invent a fact about their business," `data-inventory.md` is
the register of every allowed fact), **that content does not currently exist for Oishi** —
there is no equivalent verified manifesto in `data-inventory.md` to fill 5 columns of
vertical prose truthfully. Two honest paths, for the user to decide, not to guess:

1. Interview the owner for a short, verifiable "who we are" statement and keep the column
   *structure* but shrink the *amount* of copy to what's actually been said (a few lines
   split across 2 columns, not 5 columns of invented philosophy).
2. Cut this scene's text-density ambition entirely and keep only what's already verified —
   e.g. the ABOUT/何者 title pair plus the handful of confirmed facts already in
   `data-inventory.md` (address, hours once Q4 resolves, the waste-campaign thesis) laid
   out as short vertical lines rather than manifesto prose.

Either way, this scene cannot be "built to match the reference" the way Scenes 1–3 can —
the blocker is content, not code.

---

## Scene 5 — Red map band M3 (`sec_028`–`sec_032`)

### What's actually there (corrects several specifics)

- **`sec_029`**: full-bleed flat red field. Sampled with `ffmpeg` (2×2 px crop, raw RGB) at
  a point well inside the field: **`rgb(212, 44, 33)` = `#D42C21`**, uniform across the
  sample — **flat fill, not a gradient or texture**, correcting any assumption this uses
  the same vertical-gradient treatment as Oishi's own `--hinomaru` disc.
  - **Left half**: a thin white/washi **line-art outline map** of central Tokyo wards
    (administrative boundary strokes only, no fill, no streets/labels beyond what's
    pinned), with **three** small black rectangular pin labels — "SHINJUKU", "SHIBUYA",
    "EBISU" — positioned at each ward's real relative location, each with a small
    downward-pointing marker tail. This is the reference's own three service areas, not a
    single "you are here" pin.
  - **Right half**: headline "STARTING FROM TOKYO" in bold condensed white caps, two
    lines, with a **huge black stamped/brushed kanji "東京"** (Tokyo) layered over both
    lines — the ink texture is rough/brushed (not a clean vector glyph), sized well beyond
    the Latin headline's cap-height, and visually overlaps/interrupts the Latin letters
    where the two collide (reads as the kanji sitting in front of, not behind, the type). A
    small red circular hanko/seal sits to the kanji's right. Below, a short vertical JP
    tail — から始まる ("...starts from") — completes the sentence "東京から始まる" ("Starts
    from Tokyo"), mirroring the English headline.
  - Top nav persists, transparent overlay, unchanged from every other section.
- **`sec_031`**: the full-bleed red map field has become a **contracted red disc floating
  on a dark (`--sumi`-class) ground**, containing "AREA 01 / SHIBUYA" (small label + large
  wordmark, matching the site's per-area chapter intro), with faint white map linework
  still visible bleeding through near the disc's edge (residual continuity from the map
  that was there a moment ago). Reads as the full red field **condensing down into a
  disc-shaped chapter badge**, not "a disc growing from chapter size to fill the screen."

**Correction to `spec-reference-scenes.md`:** the old entry's "SÃO GONÇALO / CENTRO"
pairing assumed the reference literally shows two place names the way Oishi would (city +
neighbourhood) — it doesn't; the reference shows **one city name** ("Tokyo") with **three
neighbourhood pins** on a map (their three physical locations). Because Oishi is a single
address, not three, the existing spec's single-pin adaptation is the right semantic call —
**note it explicitly as a deliberate adaptation** (one location vs. reference's three),
not an oversight. The bigger correction is the **disc transition's direction**: this
section's own M3 beat *shrinks* a full red field down into a small badge disc, the
opposite of what's built in code (next section).

### Gap vs. current implementation

- No component currently builds the map/pin/headline/kanji composition at all (confirmed
  by `grep -rli "gonçalo\|goncalo\|mapa\|dotted" src/` returning only unrelated hits — e.g.
  "sobre" as a preposition elsewhere, not an About section, and nothing map-related).
- `src/components/cena/disco-transicao.tsx` **does** implement an M3-style disc scrub
  (`gsap.to(discoRef, { scale: 16 })`, pinned, `+=130%` scroll) — but it's wired to a
  **different transition entirely**: it labels the disc "無駄 / Desperdício" (waste) and
  its own code comment says it unpins "into the always-red content that follows
  (`capitulo-desperdicio.tsx`)" — i.e. it's the entry into Scene 9 (the Oishi-only
  waste/pricing chapter), not this map scene, and it **grows** a disc to fill the screen,
  the opposite direction from what `sec_031` shows (a full field **shrinking** into a
  disc).
- **Net finding: the `Disco`/M3 mechanic needs to support both directions** — grow-to-fill
  (already built, used for the waste-chapter entry) and shrink-to-badge (not built, is
  what this map scene actually does, used for area/chapter-badge transitions). Building
  Scene 5 means either extending `disco-transicao.tsx` with a `direção: "crescer" |
  "encolher"`-style prop, or a second small component reusing the same `Disco` primitive
  in reverse — a decision for the implementation task, not resolved here.
- The stamped/brushed "東京" kanji-over-headline device has no Oishi equivalent decided
  anywhere in this doc set. Per this repo's rule that every Japanese glyph must be on the
  `spec-design.md` §6.4 allow-list, whichever glyph plays this role for Oishi (candidates:
  reusing 味, or something tied to "Centro"/São Gonçalo) is a decision for whoever
  implements this scene, not something to invent here.

---

## Summary for the implementation task(s) that follow

- Scene 3: real gap, buildable now — panels-as-headline-background + sequential beats +
  larger dual-column vertical JP, all with Oishi's own already-decided copy (no content
  blocker).
- Scene 4: **content-blocked**, not code-blocked — needs the user's decision on real
  philosophy copy (or a scoped-down version) before any component is worth building.
- Scene 5: real gap, buildable once (a) the single-pin address adaptation is confirmed
  intentional (it already is, per the existing spec) and (b) the `Disco` shrink-direction
  variant is decided, and (c) `[VERIFICAR: Q2]` (the pin location) resolves.

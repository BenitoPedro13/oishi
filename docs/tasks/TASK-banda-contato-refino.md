# TASK — Refine the CONTATO band using the real new-sushism.jp footer markup

> Per `AGENTS.md` §1. Evidence: `references/newsushism-files/index.html:1715-1781`,
> `references/newsushism-files/style.css:1279-1465` (the user just added these — a real
> capture of new-sushism.jp's HTML/CSS/JS, not the earlier 1fps `.mov` frames
> `docs/spec-scene-footer.md` was written from). Closes the three items
> `docs/tasks/TASK-scene-11-contato.md` §2 explicitly deferred: the kanji overprint, a
> seal-style mark, a copyright line — now buildable precisely instead of guessed, plus the
> reference's bottom horizontal scrub strip, which the `.mov` frames never showed.

---

## 1. Current scenario

`src/components/cena/banda-contato.tsx` renders the full-bleed `--hinomaru` band with a
ghost `Selo` (15% opacity, top-left, `fantasma` scale), a `CONTATO` splash title, and the
`Chamar no WhatsApp` CTA. It is shared by `/` (`src/app/page.tsx:22`) and `/contato`
(`src/app/contato/page.tsx:57`).

`docs/spec-design.md` §11.7 already specifies more than is built: *"`CONTATO` at
`--t-splash` in `--washi` on `--hinomaru`, `連絡` overprinted in `--sumi`."* The kanji
overprint does not exist yet. `docs/spec-scene-footer.md`'s "Gap diagnosis" item 3 lists
three more missing pieces — outline-kanji texture, seal/stamp graphic, copyright line —
deferred at the time because they were only visible as illegible detail in 1fps stills.

The real markup in `references/newsushism-files/` now shows exactly what those pieces are:

- `.cm_footer_lBlk_jp` — two giant SVG kanji strokes (`_l`/`_r`), absolutely centred,
  `z-index: 5`, sitting **behind** the `CONTACT` label (`cm_footer_lBlk_txt`, `z-index`
  unset/above) — the "overprint," achieved by stacking, not literal stroke-interleaving.
  Confirms `spec-design.md` §11.7's plain "overprinted in `--sumi`" instruction is already
  the correct target — no per-stroke interleave was ever required.
- `.cm_footer_lBlk_logo` — `footer_logo.svg`, a small hanko-style stamp (bordered
  rectangle + kanji strokes, confirmed by reading the file), bottom-right of the title
  block. This is new-sushism.jp's own brand mark — not something this repo may render
  (`AGENTS.md` "no competitor's photographs" extends to no competitor's logo assets, and
  Oishi already has its own mark for this role: `味`).
- `.cm_footer_rBlk_copy` — `©2024 NEW SUSHISM`, small, secondary tone, right side.
- `.cm_slider` (inside `.cm_footer`) — two repeated `footer_slide_txt.svg` copies (their
  own wordmark, traced vector paths, 141 KB — also a competitor asset, not reusable),
  absolutely positioned at the band's bottom edge, horizontally scrubbed with scroll via
  `gsap.to(this, {x: c, scrollTrigger: {trigger: this, start: "top bottom", end: "bottom
  top", scrub: .6}})` (`main.js`). This strip was never visible in the `.mov` frames
  `spec-scene-footer.md` analysed — it's a genuinely new finding from the real markup.

## 2. Planned changes

All changes are inside `src/components/cena/banda-contato.tsx` (the one shared component
— no prop changes, still used identically by both routes).

1. **Kanji overprint** — add `連絡` (already Oishi's chosen kanji for "Contato," live in
   `cabecalho.tsx:15` and the Shippori Mincho subset per `spec-design.md` §6.4 — **not**
   the reference's `接点`, per `TASK-scene-11-contato.md`'s already-settled decision).
   Rendered as typed Shippori Mincho text (the "SVG-only" rule in `AGENTS.md` is specific
   to `味`/`Selo`; `連絡` already renders as typed text elsewhere in this repo), sized near
   `--t-splash`, `color: var(--sumi)`, absolutely positioned to sit behind/overlapping
   "CONTATO" — same stacking approach as the reference (`z-index`, not stroke-clipping).
2. **Seal mark** — a small solid `Selo` (`escala="selo"` or `"capitulo"`, `cor="var(--sumi)"`,
   full opacity) near the title's baseline, replacing the role `footer_logo.svg` plays in
   the reference, using Oishi's own mark instead of copying theirs. The existing ghost
   `Selo` (`fantasma`, 15% opacity, top-left) stays unchanged — it already plays the
   "background texture" role the reference's outline-kanji motif plays.
3. **Copyright line** — small, secondary-tone (`--washi` at reduced opacity, since
   `--cinza` is calibrated for `--sumi` backgrounds, not `--hinomaru`; contrast will be
   checked per §5), right-aligned, `© {anoAtual} Oishi Cozinha Japonesa` — the real,
   already-verified restaurant name (`content/restaurante.ts`), year computed with
   `new Date().getFullYear()` at render time so it never goes stale (server component,
   no client state needed).
4. **Bottom scrub strip** — a new small internal element in the same file (not a separate
   exported component — it's a single-use detail of this band), two repeated copies of
   `Oishi Cozinha Japonesa · 連絡 ·` (the restaurant's own verified name + its own kanji,
   not the reference's wordmark), large, low-contrast (`--sumi` or `--washi` at low
   opacity) outline-style text, absolutely positioned at the band's bottom edge,
   overflowing both edges. Horizontal scrub wired through the repo's one ScrollTrigger
   entry point, `usarScrub` (`src/lib/motion/usar-scrub.ts`) — mirrors the reference's own
   `x` scrub exactly (`start: "top bottom"`, `end: "bottom top"`, `scrub`), reduced-motion
   safe by construction since `usarScrub` no-ops under `prefers-reduced-motion` and the
   strip's un-transformed CSS position is already the complete static layout.

**Revised, mid-task** — the user asked for a closer structural port of the real markup
than the summary above describes (the exact hover-flip mechanic, the whole block wrapped
in one link, the kanji positioned per-half behind the title) rather than a loose
adaptation. Confirmed via `AskUserQuestion`: rebuild the reference's exact CSS/JS
mechanics (hover roll, `cm_slider` scrub, absolute layering) but keep all *content* in
those slots Oishi's own — not new-sushism.jp's traced `接点` kanji, `footer_logo.svg`, or
`footer_slide_txt.svg`. What actually shipped:

- The entire kanji+CONTATO+seal composition is wrapped in **one** `<a>` (the WhatsApp
  link), mirroring `<a href="mailto:...">` wrapping all of `.cm_footer_lBlk`
  (`index.html:1720-1761`) — not a separate title + separate pill CTA as first built.
- A genuine **hover-roll**: the composition renders twice (`ComposicaoContato`, identical
  content both times — same trick the reference uses, since both its
  `js_tAnimationUnit_top`/`_bottom` states are the same content), the bottom copy sits
  `absolute inset-0 translate-y-full` (hidden below) and swaps to `translate-y-0` on
  `group-hover`, while the top copy exits with `-translate-y-full` — CSS `motion-safe:`
  transitions, not GSAP (this repo has no existing GSAP-hover pattern; the rest of the
  site's hover interactions are already plain Tailwind `hover:`/`group-hover:`, so this
  matches house style instead of introducing a second hover mechanism). Both copies are
  masked by `overflow-hidden` on the wrapping `<a>` — without it the off-screen copy
  still renders adjacent instead of clipped (hit this as a real bug mid-build: first pass
  showed two stacked "CONTATO"s because the `<a>` had no `overflow-hidden`).
  `aria-hidden="true"` on the bottom (decorative) copy so screen readers see "CONTATO"
  once, not twice — the reference doesn't bother with this, but AGENTS.md's own
  accessibility bar does.
- Sizing/positioning is expressed in `em`, all relative to a `fontSize: var(--t-splash)`
  context on the composition wrapper — the `em`-equivalents of the reference's own
  rem-relative-to-30rem-title proportions (kanji box ≈1.05em wide split into two halves,
  seal ≈0.12em), since the reference's raw rem values assume a root font-size convention
  this repo doesn't share; the *ratios* are what transfer, not the numbers.
- Not doing the reference's per-letter/per-glyph stagger (`.js_tAnimation_o_elem` /
  `.js_tAnimation_01 span span`, individually animated on hover with a 0.4 stagger) —
  building the char-splitting utility that requires is disproportionate for one footer
  detail; the whole-block roll captures the same "flip" identity.

**Not doing:**
- Not copying `footer_logo.svg` or `footer_slide_txt.svg` — both are new-sushism.jp's own
  branded vector assets (their hanko stamp, their wordmark), not something this repo
  reuses. Structure and motion are copied; the content is Oishi's own, per `AGENTS.md`'s
  standing copy policy and the precedent already set in `TASK-scene-11-contato.md` §2 for
  the kanji choice.
- Not building the reference's `<a href="mailto:...">` hover-flip (two full alternate
  copies of the block that swap on `mouseenter`/`mouseleave`, `js_tAnimationUnit_top/
  bottom`). That interaction exists because the reference's CONTACT band **is** a mailto
  link with no other CTA. Oishi's CONTACT band already has its real CTA (`Chamar no
  WhatsApp`, wired through `construirLinkWhatsapp`) sitting alongside the title, not
  replacing it — grafting an unrelated hover-swap interaction onto a title that isn't
  itself the link has no equivalent need here.
- Not touching `RodapeSimples`, `/contato`'s page body above the band, or the four files
  currently modified and uncommitted (`cabecalho.tsx`, `cabecalho-marca.tsx`,
  `introducao.tsx`, `loader.tsx`) — unrelated in-progress work, left as found.

## 3. Why

`spec-design.md` §11.7 already commits to the kanji overprint; this task is the first time
the actual reference markup exists to build it (and the seal/copyright/strip) accurately
instead of guessing from illegible 1fps stills, closing the gap `spec-scene-footer.md`
flagged and deferred. Reusing `usarScrub` for the bottom strip keeps the one-ScrollTrigger-
entry-point rule intact instead of hand-rolling a second GSAP setup.

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/components/cena/banda-contato.tsx` | modified | kanji overprint, seal mark, copyright line, bottom scrub strip — spec-design.md §11.7, reference `index.html:1715-1781` |

## 5. Verification

- `pnpm typecheck` and `pnpm lint` clean.
- Visual check in-browser (Chrome automation) on `/` and `/contato`: band shows `連絡`
  behind `CONTATO`, small solid `Selo` near the title, copyright line, and a horizontally
  drifting text strip at the band's bottom edge that responds to scroll.
- `prefers-reduced-motion` check: strip renders in its static (un-transformed) position,
  no layout shift, every other element in the band (title, CTA, copyright) still present
  and legible — per `AGENTS.md` "reduced-motion is a complete experience."
- Contrast: `--sumi` kanji on `--hinomaru` and the copyright line's chosen tone/opacity on
  `--hinomaru` both checked against `spec-design.md` §4.2's computed pairs (or computed
  fresh if this exact pair isn't already in that table) before shipping — no eyeballed
  contrast per `AGENTS.md` "During" rule.
- No console/hydration errors on either route.
- Grep confirms no literal `footer_logo.svg`/`footer_slide_txt.svg` path or copied SVG
  path data from `references/newsushism-files/` landed in the component.

**Out of scope:** the reference's mailto hover-flip interaction; `RodapeSimples`; Scene 10
(media collage / AREA-divider cards, separate task per `TASK-scene-11-contato.md`'s stated
order).

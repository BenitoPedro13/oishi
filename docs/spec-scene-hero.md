# Oishi — Scenes 1–2 (Hero), frame-precise

> Deepens `docs/spec-reference-scenes.md`'s Scene 1 ("Hero full-bleed") and Scene 2 ("Hero
> inset M1") entries. Sourced from the existing 1fps decomposition of
> `references/websites/new-sushism.mov` at `references/websites/new-sushism/frames/sec/`
> (monotonic scroll capture) and `references/websites/new-sushism/frames/ranges/hero_*.jpg`
> (a **separate, non-monotonic** capture pass — see "Important correction" below).
>
> **Read this alongside `docs/spec-reference-scenes.md`** for the component/build mapping —
> this file corrects and details the *composition and mechanics*, following the same
> honesty rules as `docs/spec-loader-sequence.md`: no invented precision the frame density
> can't support, explicit flags where evidence is ambiguous.

---

## Important correction: the `hero_017–020` evidence for Scene 2 is unreliable

The existing spec cites `frames/ranges/hero_017–020.jpg` as evidence for a **pinned,
scroll-scrubbed rectangular inset** (`clipPath: inset(0%) → inset(14% 26% 30% 8%)`,
`scale: 1 → 1.06`). Having looked at the full `hero_001`–`hero_050` sequence in order, this
reading does not hold up:

- `hero_001` — full-bleed hero, held state (identical to `sec_001`).
- `hero_015` — **the loader**, not the hero: full JP/EN tagline + bottom lockup on a black
  ground, pixel-identical in layout to what `docs/spec-loader-sequence.md` already
  documented for Oishi's own loader (reference tagline text: `次世代の寿司文化を築く、
  革新的な職人たちに出会える場所。` / `A PLACE TO MEET THE INNOVATIVE ARTISANS SHAPING
  THE FUTURE OF SUSHI CULTURE.`).
- `hero_017` — an **ink-mask reveal mid-transition**: a single ragged, speckled-edge hole
  (same visual family as the loader's ink-hole exit) framing a *tightly zoomed* crop of the
  chef's face — a zoom level (~150%+) far beyond the documented `scale: 1 → 1.06`.
- `hero_020` — back to the **full-bleed hero**, held state again.

This sequence (full hero → loader → ink-transition → full hero) is not a scroll trace at
all — it reads as a **page reload captured mid-recording** (loader replaying, then its own
ink-exit revealing the hero again), interleaved into what was labelled the "hero" frame
range. It is very likely the same capture confusion this project already corrected once for
the loader itself (`docs/spec-loader-sequence.md`'s note that the old "0–1400ms" figure came
from a low-fps misread). **Scene 2 as currently written (rectangular pinned inset panel) is
not supported by this evidence and should not be trusted as-is.**

### What the monotonic scroll capture (`sec_*`) actually shows instead

Tracing `sec_015` → `sec_017` → `sec_018` (the real, ordered scroll-down sequence):

- `sec_015`, `sec_017` — hero still full-bleed, no visible shrink/inset/pin. By `sec_017` a
  thin black strip is visible at the very bottom edge — the next section starting to enter.
- `sec_018` — the hero has scrolled **most of the way off**, no floating/inset panel, no
  visible `--sumi` gutter around a smaller framed photo. Instead, the **boundary itself**
  between the hero photo and the next section is an **ink/torn-paper edge** — a ragged,
  speckled boundary line (top ~40% of frame: hero photo continues; the torn edge cuts
  across it; bottom ~60%: the next section's own content, already visible). This is the
  same sumi-e ink motif as the loader, applied as a **section transition seam**, not as a
  pinned inset frame.
- `sec_018` also reveals what comes next: this is **Scene 3** ("Intro / positioned words
  M2") — three word-groups laid over three side-by-side media panels: `INNOVATION / WHERE`
  (left panel, chef's hands), `AND / SUSHI` (centre), `TRADITION, / EVOLVES` (right panel,
  wrist/bracelet close-up). This confirms Scene 3's "3 media panels + positioned words" is
  real (the existing spec's single `sec_020` citation under-evidenced it), and worth passing
  to whoever documents Scene 3 in detail — flagging here since it fell out of this scene's
  evidence trail, not because it's this file's scope.

**Conclusion:** the reference likely has **no genuine pinned/shrinking hero inset**. What
exists is an ink-torn-edge seam at the hero → Scene 3 handoff. Recommend either (a)
retiring "Scene 2 — Hero inset M1" as its own scroll mechanic and folding an ink-seam
transition into the Scene 1 → Scene 3 handoff instead, or (b) if the pinned-inset idea is
worth keeping as an *Oishi-original* motion beat regardless of reference fidelity, relabel
it explicitly as an Oishi invention rather than a reference-sourced measurement. Either way,
**a dedicated denser capture of an actual scroll pass (like the loader got) is needed before
trusting any specific mechanic here** — 1fps stills plus one mislabelled capture pass is not
solid enough evidence to specify exact clip-path/scale numbers.

---

## Scene 1 — Hero full-bleed: composition inventory (held state, scroll offset 0)

Traced from `sec_001`, `sec_010`, `sec_012`, `sec_015`, `sec_017` (all held-state stills;
no genuine load-time-animation evidence found — see note below).

| Layer | Content | Position | Notes |
|---|---|---|---|
| z0 — media | Full-bleed photo, one of at least 2 assets (dim kitchen/artisan close-up; warm-lit sushi-counter shot) | full-bleed | Crossfade confirmed between `sec_012` (photo A, held since `sec_001`) and `sec_015` (photo B) — interval not measurable at 1fps beyond "at least ~12s hold observed," the spec's "~6s" cadence is **unconfirmed**, not contradicted |
| z1 — nav | Logo lockup top-left (`NEW` red/white wordmark over a white ink-brush stroke, small kanji caption `寿司職人` beneath); 5 nav items top-right, each a **small 2–3 glyph kanji micro-tag stacked above the English word** (`何者 / ABOUT`, `AREA 01 渋谷 / SHIBUYA`, `AREA 02 新宿 / SHINJUKU`, `AREA 03 恵比寿 / EBISU`, `接点 / CONTACT`) | fixed, top, no visible scrim/border, direct-over-photo contrast | Oishi's existing `cabecalho.tsx` NAV array already mirrors this exact kanji-over-word pattern (`品書/Cardápio`, `放題/Rodízio`, `予約/Reserva`, `連絡/Contato`) — **this part is already correctly matched**, no gap |
| z2 — micro JP | `新しい寿司職人` ("atarashii sushi shokunin") | centred, directly above the splash lockup | Thin Mincho-class serif, letter-spaced, `washi`-toned. Reference-only copy — not Oishi content |
| z3 — splash lockup | `NEW` (red, bold condensed, white ink-brush stroke overlaid through it) + `SUSHISM` (off-white, bold condensed) + small red rectangular seal to the right of the wordmark | centred, dominant | Oishi's `hero-titulo.tsx` already reproduces this exact grammar: red word (`OISHI`) + white-ink `Selo` overlay + white word (`COZINHA`) + red `Disco`+`Selo` seal — **structurally matched already** |
| — | *(no bottom gradient/CTA band visible in any captured frame at this viewport crop — the existing spec's "z5: mobile fold" element is not evidenced here; may only appear at a narrower/mobile viewport not captured)* | | |

**Load-time title animation — unconfirmed.** `sec_010` shows the splash word garbled
(`SIIc..` instead of `SUSHISM`, JP line truncated to `新しい`) between two frames
(`sec_001`, `sec_012`) that both show it fully formed. Given the surrounding chrome (cursor
position, a Google Translate extension popup) is otherwise static across `sec_010`→`sec_012`
and the title is stable everywhere else including the very first frame, this reads more like
a **screen-recording/encoding artifact** than a real periodic re-animation. Flagging rather
than either dismissing it or building an animation theory on one ambiguous frame. Does not
contradict the existing spec's "title blur-fade once on load, time-based, not scroll" — just
doesn't independently confirm it either.

---

## Gap diagnosis vs. current code

Read `src/components/cena/hero.tsx`, `hero-titulo.tsx`, `heroi-midia-dissolve.tsx`,
`src/components/marca/cabecalho.tsx`.

1. **Scene 2's `clipPath`/`scale`/pin math (`hero.tsx:28–47`) is built exactly to the
   existing spec's numbers** (`inset(14% 26% 30% 8%)`, `scale: 1.06`, `start: "top top"`,
   `end: "+=90%"`, `pin: true`) — but per the correction above, those numbers were sourced
   from frames that don't show what they were claimed to show. This is not a coding bug —
   the code faithfully implements the spec it was given — but the spec itself needs
   re-grounding before the code is trustworthy. **Recommend re-verifying this mechanic
   against a dedicated fresh capture before touching the numbers further**, the same way
   the loader's timing got fixed with `loading-new-sushism.mov`.
2. **Nav (`cabecalho.tsx`) and splash lockup (`hero-titulo.tsx`) composition already match**
   the reference's grammar closely — kanji-over-word nav pattern, red-word + white-ink-seal +
   white-word lockup. No gap found here worth flagging.
3. **Media crossfade** (`heroi-midia-dissolve.tsx`, referenced via `FOTOS` array in
   `hero.tsx:15–19`) exists in code with 3 Tier-A-ish assets; the reference confirms
   crossfade behaviour exists but not its exact interval — current code's timing wasn't
   independently checked against a real interval measurement here (out of this fork's time
   budget; flag for follow-up if the exact rhythm matters).
4. **`hero.tsx:57–64`'s z0 colour-fallback gradient** (hinomaru-to-sumi gradient behind the
   photo layer) has no reference counterpart to compare against — reference always has a
   real photo/video loaded in every captured frame. This is Oishi-specific defensive
   styling for photo-load failure, not a reference-fidelity question either way.

---

## Photo-policy notes (Oishi cannot copy 1:1)

The reference's z0 is described as "video loop" in the existing spec — every frame captured
here shows a **still photograph** (motion, if any, is the source video's own live-action
subject movement, not a slideshow/kenburns effect distinguishable from a single frame).
Oishi has no equivalent video and only stills by luminance tier — the existing "Tier A
full-bleed only, crossfade between ≥2 Tier-A assets" policy is the right substitution and
doesn't need revision based on anything found here. The nav and splash-lockup layers need no
photo at all and are already faithfully reproduced in type/colour, consistent with this
project's type-led substitution philosophy.

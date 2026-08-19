# TASK — Photo marquee before the footer

## 1. Current scenario

`src/app/page.tsx` renders `Hero → RodiziosTeaser → BandaContato → RodapeSimples`. There
is no photography section on the homepage outside the hero background — the 12 graded
photographs in `public/fotos/` (`painel-*.webp`, `hero-neon.webp`) are otherwise unused.

The user asked for an infinite horizontal image marquee placed **before the footer**,
referencing a screen recording of `new-sushism.jp`'s scrolling photo mosaic as the general
feel (dense, cropped, warm-lit food/room photography) and pasting the MagicUI `Marquee`
docs as the mechanism.

The `Marquee` primitive is already vendored via the shadcn CLI (`pnpm dlx shadcn add
@magicui/marquee`), matching workflow §2.1 (use the CLI, don't hand-write):

- `components.json` — `@magicui` registry added.
- `src/components/ui/marquee.tsx` — byte-identical vendor output (untracked).
- `src/app/globals.css` — `--animate-marquee` / `--animate-marquee-vertical` keyframes
  added inside `@theme inline`.

None of that is task-specific work; it predates this doc and is left as-is. `SOURCES.md`
does not exist yet in this repo (no vendored file has been logged there so far) — out of
scope for this task, noted below.

## 2. Planned changes

- **New: `src/components/cena/marquee-fotos.tsx`** — a homepage scene section wrapping the
  vendored `Marquee`. Two rows, opposite `reverse` direction, `pauseOnHover`. Each row
  renders the same set of photos from `public/fotos/` as fixed-height (`h-40 sm:h-48`,
  i.e. 160–192px) `next/image` tiles, `object-cover`, `--radius: 0` (no rounding — §13),
  no box-shadow. A short pt-BR label above the rows in the existing `--t-rotulo` treatment
  (matches `RodiziosTeaser`'s `Os três capítulos` label pattern), reading `Um pouco da
  casa` — descriptive, not a claim, so it needs no `[VERIFICAR]`.
  - Left/right edge fade using a `--sumi`-based gradient mask (`mask-image`), not a
    box-shadow and not a pure-white/foreign-colour scrim — keeps §13 ("no box-shadows",
    "no second accent", "pure `#000` nowhere") intact.
  - All 12 images stay well under the Tier C ceiling (**220px, never full-bleed**,
    `spec-design.md` §10.2/§13) regardless of which tier each individual photo measures
    at, because the marquee never renders a tile taller than 192px — this section does not
    need the per-photo tier manifest (`content/fotos.ts`, not yet generated) to stay
    compliant.
  - Alt text describes each photo's visible content only (e.g. "Cryspy do Oishi",
    "Sushi redondo do Oishi") — no invented facts, no price/hours/address text (keeps the
    `src/components/**` grep assertion in §4 clean).
- **Modify: `src/app/page.tsx`** — insert `<MarqueeFotos />` between `<RodiziosTeaser />`
  and `<BandaContato />`, so it lands before the footer chain (`BandaContato` →
  `RodapeSimples`) as asked, and after the rodízio chapters rather than interrupting the
  hero → chapters flow.

**Alternative considered:** using `heroi-midia-dissolve.tsx` / `painel-midia`-style
tier-aware media components instead of a flat `next/image` list. Rejected — those
components exist for full-bleed/framed hero-scale placements with GSAP scrub; a marquee
tile is a small, purely decorative thumbnail row with no scroll-timeline behaviour, so the
simpler `next/image` + CSS animation (already how `Marquee` works) is the right altitude.

## 3. Why

The user wants a photography moment on the homepage that borrows new-sushism.jp's *density
and motion*, not its content — this repo is explicitly type-led/colour-led because Oishi
has no professional shoot (`spec-design.md` §2). A thumbnail marquee is the one place dense
photography is safe: every tile stays inside the Tier C "thumbnail only" ceiling regardless
of which of the 12 photos ends up in which slot, so it can't accidentally violate the
"no photograph above its measured tier" rule even without the still-ungenerated
`content/fotos.ts` manifest.

## 4. Affected files

| File | Change type | Notes |
|------|-------------|-------|
| `src/components/cena/marquee-fotos.tsx` | new | the marquee section, wraps vendored `Marquee` |
| `src/app/page.tsx` | modified | insert `<MarqueeFotos />` before `<BandaContato />` |
| `src/components/ui/marquee.tsx` | none (pre-existing) | vendored via shadcn CLI, not hand-edited |
| `src/app/globals.css` | none (pre-existing) | marquee keyframes already added via CLI |

**Out of scope:** classifying the 12 photos into the Tier A/B/C manifest, generating
`content/fotos.ts`, adding `SOURCES.md` logging for the vendored `Marquee` component,
`prefers-reduced-motion` beyond what the global rule in `globals.css` already provides
(freezes all animations repo-wide, including `animate-marquee` — verified below).

## 5. Verification

- `pnpm lint` and `pnpm build` (or `tsc --noEmit`) pass.
- Dev server: section renders between the rodízio grid and the red CONTATO band, 12 photos
  visible across two rows, scrolling in opposite directions, pauses on hover.
- No `next/image` console warnings (explicit `width`/`height` or `fill` + sized parent).
- With `prefers-reduced-motion: reduce` emulated in devtools, the marquee rows are static
  (the existing global media query in `globals.css` sets `animation-duration: 0.01ms` /
  `iteration-count: 1` on `*`, which covers `.animate-marquee` — confirmed by reading the
  rule, not assumed).
- No literal price/hours/address/phone string introduced under `src/components/` (keeps
  the existing grep assertion passing).

# TASK — One header size on every route

> Per `AGENTS.md` §1. Small change, documented after the fact because it came out of a
> live Q&A with the user rather than an upfront plan — still gets a task doc, no exception
> for size.

---

## 1. Current scenario

`src/components/marca/cabecalho.tsx:20` sets `const overlay = pathname === "/"`, and used
that flag to scale the logo and nav links up on the homepage and down everywhere else:

- `CabecalhoMarca` (`cabecalho-marca.tsx`): logo `fontSize` was
  `clamp(1.85rem, 4.5vw, 2.5rem)` on `/` vs `clamp(1.5rem, 2.5vw, 1.75rem)` elsewhere; the
  `放題` caption was `clamp(0.65rem, 1.2vw, 0.78rem)` vs a flat `0.62rem`.
- `MarcaItem` (`marca-item.tsx`): nav word `fontSize` was `clamp(17px, 2.55vw, 26px)` on
  `/` vs `clamp(12px, 1.5vw, 16px)` elsewhere.

The user compared screenshots of the header on `/` and on `/cardapio` and asked for the
logo and nav link sizing to match — confirmed via `AskUserQuestion`: same size everywhere,
not the existing overlay-driven scale. First pass standardized on the *smaller* (inner-
route) values; the user corrected this — they want the homepage's larger overlay sizing
applied everywhere, not the other way round.

The header's background/transparency split (`cabecalho.tsx:34-37`, the `.nav-scrim`
gradient at `globals.css:353-360`) is a separate, still-intentional piece of the same
`overlay` flag — the user's own words were "the logo size and links changed," not the
background, so that split stays.

## 2. Planned changes

- `cabecalho-marca.tsx`: drop the `overlay` prop from `CabecalhoMarcaProps` and
  `InternalLogoProps` entirely (nothing else in this component read it); `InternalLogo`
  now renders one fixed size for both the `OISHI` lockup (`clamp(1.85rem, 4.5vw, 2.5rem)`,
  the former `overlay`-only value) and the `放題` caption
  (`clamp(0.65rem, 1.2vw, 0.78rem)`, same source).
- `marca-item.tsx`: drop the `overlay` prop from `MarcaItemProps`; `tamanhoPalavra` becomes
  a single fixed `clamp(17px, 2.55vw, 26px)` — the former homepage-only value, now used on
  every route.
- `cabecalho.tsx`: stop passing `overlay={overlay}` to `CabecalhoMarca` and `MarcaItem`.
  The `overlay` variable itself, the `.nav-scrim` div, the background/border classes, and
  the animation-delay logic are untouched — still route-dependent, by design.

## 3. Why

The user found the size difference inconsistent across routes and asked for one size —
specifically the homepage's larger lockup/nav scale, everywhere.

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/components/marca/cabecalho-marca.tsx` | modified | drop overlay-driven logo/caption sizing |
| `src/components/marca/marca-item.tsx` | modified | drop overlay-driven nav-word sizing |
| `src/components/marca/cabecalho.tsx` | modified | stop passing `overlay` size prop to both |

## 5. Verification

- `tsc --noEmit` clean.
- `pnpm lint` on the three files: no new errors (checked directly, filtered from the
  full-repo run — the repo has ~280 pre-existing `react-hooks/refs` errors unrelated to
  this change, see `TASK-banda-contato-refino.md`'s verification notes).
- Visual check in-browser (Chrome automation): logo and nav word size are pixel-identical
  between `/` and `/cardapio`; no console errors on either route.

**Out of scope:** the background/transparency split between `/` and inner routes — left
as the user specified, still driven by `overlay`.

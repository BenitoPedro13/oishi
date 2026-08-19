# TASK — Fix Hero + header overflow on mobile

> Per `AGENTS.md` §1. The user attached a 390-wide screenshot of `/` showing two concrete
> defects, not a request to rebuild Hero to match `spec-design.md` §11.1's fuller spec
> (positioned-word headline, address, three CTAs — a much larger, separately-flagged gap
> already noted in `hero.tsx`'s own header comment: "No address/CTAs here by design...
> not yet reconciled"). This task fixes only what's visibly broken, not that gap.

---

## 1. Current scenario

Two defects visible in the user's screenshot at ~390px width:

1. **`src/components/cena/hero-titulo.tsx:32-64`** — the `<h1>` is `flex flex-nowrap`
   around three inline children (`OISHI`+味 lockup, `COZINHA`, the small disc). At this
   width, `--t-splash` (`clamp(4rem, 17vw, 15rem)`, `globals.css:33`) resolves to
   ~64-66px — `OISHI` and `COZINHA` combined at that size and weight don't fit in one row.
   `flex-nowrap` stops the *flex items* from wrapping onto a new row, but neither inline
   child has `whitespace-nowrap`, so the browser text-wraps mid-word instead: the
   screenshot shows `COZINH` / `A` split across two lines, an accidental break, not a
   designed one.
2. **`src/components/marca/cabecalho.tsx:54-72`** — the nav (`CARDÁPIO RODÍZIO RESERVA
   CONTATO`, `gap-8` = 32px fixed between items) plus the logo lockup, both now using the
   single larger size after `TASK-cabecalho-tamanho-unico.md`, don't fit in 390px combined
   width. Nothing wraps or scrolls, so `CONTATO` renders entirely off-screen, invisible
   and unreachable — a real functional gap (contact is one of the three named exits).

## 2. Planned changes

- **`hero-titulo.tsx` — superseded twice, see below.** First pass added `flex-wrap` +
  `whitespace-nowrap` so the two inline blocks (`OISHI`+味, `COZINHA`) could drop to their
  own line instead of splitting mid-word. The user's true-375px screenshot (DevTools
  iPhone SE) showed this still didn't reliably wrap — width-dependent wrapping of two
  items with a shared inherited font-size is fragile in a way that's hard to fully reason
  about from measurements alone. **Final fix**: stopped relying on wrapping at all. The
  user pointed at the reference's own hero (`NEW` / `SUSHISM`, always two stacked lines,
  never one flowing row regardless of viewport) and asked for the same treatment. `<h1>`
  is now `flex flex-col` — `OISHI`+味 is unconditionally line 1, `COZINHA`+the small disc
  (grouped into their own row span) is unconditionally line 2. This isn't a mobile-only
  fix; it's the layout at every width, matching the reference exactly and removing the
  entire class of combined-width overflow bugs by construction — each line now only ever
  needs to fit one word, not two.
- **Revised — the nav needed more than a wrap fallback.** First pass just let
  `cabecalho.tsx`'s nav wrap in place. The user then asked for a real mobile menu
  (reference screenshot: full-screen dark drawer, small logo top-left, close top-right,
  the same kanji-over-word lockup stacked large down the page) — and separately, at
  in-between desktop widths (~900–1200px), the horizontal nav was still overflowing with
  a visible page-level horizontal scrollbar, because `TASK-cabecalho-tamanho-unico.md`'s
  larger lockup/nav size (kept at the user's request) genuinely needs ~1000px+ to fit
  four items + the logo on one row — showing it from `sm` (640px) was never going to work
  at that size. Final shape:
  - **`pnpm dlx shadcn@latest add sheet`** vendored `ui/sheet.tsx` + its `ui/button.tsx`
    dependency (logged in `ui/SOURCES.md` with sha256, per `AGENTS.md` rule 2).
  - **New `marca/menu-mobile.tsx`** (`MenuMobile`): a full-screen `Sheet` drawer —
    `OISHI` logo + close button up top, then each nav item via `MarcaItem` at a much
    larger override size (`tamanho` prop, added to `MarcaItemProps`), one per line,
    each wrapped in `SheetClose` so tapping a link both navigates and closes the drawer.
  - **`marca-item.tsx`**: added optional `tamanho` (font-size override) and `onClick`/
    `className` props so the same component serves both the header's inline nav and the
    drawer's giant stacked nav — no duplicated markup.
  - **`cabecalho.tsx`**: the horizontal `<nav>` now only renders `xl:flex` (1280px) —
    measured (`getBoundingClientRect` on the live nav + logo) at ~900px viewport width to
    confirm the full-size row needs roughly 1000–1050px total, comfortably under 1280px
    with margin to spare. `MenuMobile` covers every width below that, not just phones.
    `flex-wrap` stays on both the outer header row and the nav itself as a safety net
    (wrapping is a far better failure mode than a horizontal scrollbar, if the numbers are
    ever wrong for some future addition).

## 3. Why

The screenshot shows real breakage, not a stylistic nit: a mid-word text break reads as a
bug, and an off-screen, unreachable nav item is a functional regression on the platform
`AGENTS.md` calls primary. Both fixes are the minimal CSS needed to guarantee no clipping
and no mid-word breaks, without pulling in new UI (a hamburger menu) that the user didn't
ask for and that would need its own vendoring/design pass.

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/components/cena/hero-titulo.tsx` | modified | `flex-wrap` + `whitespace-nowrap` on the two inline title blocks |
| `src/components/marca/cabecalho.tsx` | modified | nav row moved to `xl:flex`, wrap safety net on the header row and nav |
| `src/components/marca/marca-item.tsx` | modified | added `tamanho`/`onClick`/`className` overrides, reused by the drawer |
| `src/components/marca/menu-mobile.tsx` | new | the `Sheet`-based full-screen nav drawer, `<xl` |
| `src/components/ui/sheet.tsx`, `src/components/ui/button.tsx` | new | vendored via shadcn CLI |
| `src/components/ui/SOURCES.md` | modified | logged both vendored files |

## 5. Verification

- `tsc --noEmit` clean; `pnpm lint` on all touched files shows no new errors.
- Visual check in-browser (Chrome automation): drawer opens/closes correctly at a ~500px
  viewport (the narrowest this environment's window can reach), all four items visible,
  no page-level horizontal scroll (`document.documentElement.scrollWidth` checked equal
  to `clientWidth`). At ~900px (previously broken — visible horizontal scrollbar, `CONTATO`
  clipped) the drawer now shows correctly instead of the overflowing row.
- **Not independently screenshotted**: the `xl:` (1280px+) full nav row itself — this
  environment's browser automation could not be resized past ~900px in this session.
  Confirmed instead by measuring the nav's actual rendered width
  (`getBoundingClientRect`) at 900px and extrapolating to the row's size at its font
  clamp's ceiling (~26px, reached ~1020px viewport): total need ≈1000–1050px against a
  1280px+ container. Worth a real visual spot-check on a wide monitor before calling this
  fully closed.
- Hero title: confirmed live in-browser at a genuine wide viewport (~1500px, screenshot)
  that `flex-direction: column` is applied and the two lines render exactly as the
  reference does — `OISHI`+味 then `COZINHA`+seal, each its own line. At the shared
  `--t-splash` floor (64px, forced via DOM for measurement, matching sub-376px viewports),
  line 1 measures 119px and line 2 measures 261px — both comfortably under a 375px
  viewport's ~343px available width, individually, with no combined-width dependency left
  to overflow. This environment's browser automation still could not hold a true ≤375px
  window for a direct screenshot (resize behavior was inconsistent across this session,
  landing anywhere from ~500px to ~1500px regardless of the requested size) — the fix is
  verified by construction + measurement, not by reproducing the exact failing screenshot.

**Out of scope:** rebuilding Hero to match `spec-design.md` §11.1 in full (different
headline copy, address, three CTAs above the fold) — a separate, larger, already-flagged
gap.

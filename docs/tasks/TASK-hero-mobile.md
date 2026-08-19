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

- **`hero-titulo.tsx`**: give the `<h1>` `flex-wrap` so the two inline blocks (the
  `OISHI`+味 lockup, and `COZINHA`) can drop to their own line as whole units instead of
  splitting mid-word — add `whitespace-nowrap` to both inline blocks so a wrap can only
  happen *between* them, never inside a word. Centered, two clean lines on narrow
  viewports; unchanged single line above the width where `--t-splash` already fits (no
  behavior change at `sm`+ / desktop, where this was never an issue).
- **`cabecalho.tsx`**: allow the nav row to wrap (`flex-wrap` on the `<nav>`, `justify-end`
  or `justify-center` for the wrapped row) instead of clipping. No new component, no
  hamburger/drawer — the simplest fix that guarantees every nav item stays reachable and
  visible at any width, matching AGENTS.md's "the mobile site is the primary site" /
  "every price, the address, and all three CTAs must be present and functional" bar
  (CONTATO is one of the three named exits, per `spec-architecture.md` §6).

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
| `src/components/marca/cabecalho.tsx` | modified | nav row allowed to wrap instead of overflowing |

## 5. Verification

- `tsc --noEmit` clean; `pnpm lint` on the two files shows no new errors.
- Visual check in-browser (Chrome automation) at a 390×844 viewport on `/`: `OISHI`/味 and
  `COZINHA` each render as whole, unbroken words; nav shows all four items, none clipped
  or off-screen.
- Re-check at `sm`/desktop widths: no visual change from before this task.

**Out of scope:** rebuilding Hero to match `spec-design.md` §11.1 in full (different
headline copy, address, three CTAs above the fold) — a separate, larger, already-flagged
gap; a hamburger/drawer mobile nav pattern.

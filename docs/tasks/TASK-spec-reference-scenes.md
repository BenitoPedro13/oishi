# TASK — Spec reference scenes + Scene 0–2 rebuild

> Per `AGENTS.md` §1. Plan: `.cursor/plans/rewrite_specs_copy_reference_9429d4ef.plan.md`.
> Frame evidence: `references/websites/new-sushism/`.

---

## 1. Current scenario

- **169 frames** extracted from `new-sushism.mov` into `references/websites/new-sushism/`
  (contact sheet + 1 fps sec frames + loader/hero detail ranges).
- [`spec-design.md`](../spec-design.md) §2 ("type-led substitution") caused the build to
  diverge from the reference: wrong loader, sticky bordered nav, WebGL hero without the
  reference's composition, no ink dissolve.
- [`loader.tsx`](../../src/components/cena/loader.tsx), [`hero.tsx`](../../src/components/cena/hero.tsx),
  [`cabecalho.tsx`](../../src/components/marca/cabecalho.tsx) do not match
  `sec_005`, `sec_001`, `hero_017–020`.
- Component policy was capped at 3 React Bits (`spec-design.md` §8.1) — user directive:
  use [React Bits](https://reactbits.dev/), [Magic UI](https://magicui.design/docs/components),
  [21st.dev](https://21st.dev/) liberally per scene.

---

## 2. Planned changes

### Phase A — Docs

| File | Change |
|---|---|
| `docs/spec-reference-scenes.md` | **new** — 12 scenes, frame-cited, component-lib column |
| `docs/spec-component-registry.md` | **new** — master scene → lib → component table |
| `docs/spec-design.md` | Retire §2 substitution; §1/§7/§8/§11 → pointers; §8 lib registry pointer |
| `docs/spec-brand.md` | §2.3 reframe new-sushism as motion/layout reference |
| `docs/spec-architecture.md` | `components/magic/`, `components/21st/`, frame paths |
| `README.md` | **new** — status, setup, spec entry points |

### Phase B — Code (this task scope: Scenes 0–2)

| File | Change |
|---|---|
| `src/lib/utils.ts` | **new** — `cn()` for vendored lib components |
| `src/lib/tinta-paths.ts` | **new** — ink-blot SVG paths (§7.6) |
| `src/components/cena/tinta.tsx` | **new** — ink dissolve mask |
| `src/components/magic/blur-fade.tsx` | **new** — Magic UI pattern, Motion-based |
| `src/components/magic/noise-texture.tsx` | **new** — film grain overlay |
| `src/components/magic/SOURCES.md` | **new** |
| `src/components/21st/lockup-logo.tsx` | **new** — loader bottom lockup |
| `src/components/21st/SOURCES.md` | **new** |
| `src/components/cena/loader.tsx` | rewrite Scene 0 |
| `src/components/cena/hero.tsx` | rewrite Scene 1–2 |
| `src/components/marca/cabecalho.tsx` | overlay variant on `/` |
| `src/app/globals.css` | loader + ink dissolve styles |
| `src/app/layout.tsx` | overlay header wiring |

Scenes 3–11 follow in subsequent tasks.

---

## 3. Why

Side-by-side against extracted frames, the current UI reads as a generic dark restaurant
template, not a copy of the reference the client approved. Literal scene specs + vendored
animation primitives get us to pixel-match faster than hand-rolling each effect.

---

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `docs/spec-reference-scenes.md` | new | source of truth for layout/motion |
| `docs/spec-component-registry.md` | new | lib mapping |
| `docs/spec-design.md` | modify | pointers, retire §2 |
| `src/components/cena/loader.tsx` | modify | Scene 0 |
| `src/components/cena/hero.tsx` | modify | Scene 1–2 |
| `src/components/marca/cabecalho.tsx` | modify | transparent overlay nav |

---

## 5. Verification

1. Loader: JP line → EN line → bottom lockup → ink dissolve; total ≤ 1400ms; skipped on
   `prefers-reduced-motion` and repeat `sessionStorage` visit.
2. Hero at scroll 0: full-bleed Tier-A media, massive `OISHI` + white word lockup, micro-JP
   above, transparent nav over media (no sticky border on `/`).
3. M1: hero pinned; `clip-path` scrubs to framed panel; scale 1→1.06; `--sumi` visible behind.
4. `pnpm build` passes; `pnpm lint` passes.
5. Manual: compare `sec_005`, `sec_001`, `hero_018` at 1280px width.

---

## 6. Out of scope

- Scenes 3–11 implementation (spec only in Phase A).
- shadcn full init / Magic UI CLI (vendored minimal copies first).
- Q3 phone, Q4 hours, Q8 reservation policy resolution.
- Commit (user rule: commit only when asked).

# Oishi Cozinha Japonesa — site

Static Next.js marketing site for a Japanese rodízio restaurant in São Gonçalo/RJ.

## Status

- **Specs:** `docs/spec-reference-scenes.md` (layout/motion), `docs/spec-design.md` (tokens),
  `docs/spec-component-registry.md` (React Bits / Magic UI / 21st mapping)
- **Reference frames:** `references/websites/new-sushism/` (from `new-sushism.mov`)
- **Phase B in progress:** Scenes 0–2 (loader, hero, M1 inset)

## Setup

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm verificar` | Content validation (Zod) |

## Open questions blocking launch

See `docs/data-inventory.md` §11 — Q3 (phone), Q4 (hours), Q8 (reservation policy).

# 味 Oishi — Cozinha Japonesa

Cinematic marketing site for **Oishi Cozinha Japonesa**, a rodízio restaurant in São
Gonçalo/RJ that had 17K Instagram followers and no website. The job: get the menu and four
price tiers out of JPEGs and into real, searchable HTML, and make delivery, reservation and
WhatsApp contact one tap each.

**Live:** [oishi-eight.vercel.app](https://oishi-eight.vercel.app)

Powered by [Blessed Moon Studio](https://blessed-moon.vercel.app)

## Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router, TypeScript, `src/`) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4, CSS-first tokens |
| Scroll timelines | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Component motion | Motion (`motion/react`) |
| UI primitives | shadcn/ui, vendored per component |
| Forms | React Hook Form + Zod |
| Images | sharp |
| Content | typed TS modules in `src/content/`, validated at build time |
| Hosting | Vercel |

## Pages

| Route | Purpose |
|---|---|
| `/` | Cinematic home — loader, hero, brand story |
| `/cardapio` | Full rodízio menu, real crawlable prices |
| `/reserva` | Reservation form → WhatsApp deep link |
| `/contato` | Address, map, hours, Instagram, WhatsApp |

No cart, no checkout, no CMS, no auth in v1 — delivery routes out to `pedido.anota.ai`,
which already handles it.

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` if needed.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm verificar` | Validate `src/content/` against its Zod schemas |

## Documentation

The `docs/` directory is the source of truth for what to build and why:

- [`spec-brand.md`](docs/spec-brand.md) — brand audit, voice, the `味` mark
- [`spec-design.md`](docs/spec-design.md) — design tokens, visual system
- [`spec-architecture.md`](docs/spec-architecture.md) — platform, scope, phasing
- [`data-inventory.md`](docs/data-inventory.md) — every fact the site is allowed to state, with sourcing and confidence
- [`spec-reference-scenes.md`](docs/spec-reference-scenes.md) — reference layout/motion
- [`spec-component-registry.md`](docs/spec-component-registry.md) — React Bits / Magic UI / 21st component mapping
- [`spec-loader-sequence.md`](docs/spec-loader-sequence.md), [`spec-scene-intro.md`](docs/spec-scene-intro.md), [`spec-scene-hero.md`](docs/spec-scene-hero.md), [`spec-scene-rodizio.md`](docs/spec-scene-rodizio.md), [`spec-scene-footer.md`](docs/spec-scene-footer.md) — per-scene specs

## Status

**Fase 0 (the site)** in progress — scenes 0–2 (loader, hero, M1 inset).

Open questions blocking launch — see `docs/data-inventory.md` §11:

- **Q3** — phone number
- **Q4** — opening hours
- **Q8** — reservation policy

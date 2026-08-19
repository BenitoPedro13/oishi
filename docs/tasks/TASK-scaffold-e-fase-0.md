# TASK — Scaffold and Fase 0

> Written before any code file exists, per `AGENTS.md` §1.
> Specs: `docs/spec-brand.md`, `docs/spec-design.md`, `docs/spec-architecture.md`,
> `docs/data-inventory.md`.

---

## 1. Current scenario

The repo contains **no code**. Its entire contents are:

- `CLAUDE.md` / `AGENTS.md` — process rules. Their §0 described **Trísion Eyewear**, a
  different project; rewritten for Oishi in this session (§2.0 below, done)
- `references/instagram/` — 44 photographs and marketing graphics, the bio, the logo, and
  four rodízio flyers
- `references/websites/` — `new-sushism.mov` (853 MB, gitignored), the Sushi da Praça
  reservation-form HTML, and a functional-reference screenshot
- `docs/` — the four spec files, written in this session

No `package.json`, no `node_modules`, no git repository (`git rev-parse` reports this is
not a repo).

**What has been established this session, and is not re-derivable cheaply:**

- Brand colours **sampled with ffmpeg** from `logo.jpg` — the disc is a real vertical
  gradient `#9A1114 → #C6151B → #E71B23` (`spec-design.md` §4.1)
- Contrast ratios **computed**, not estimated — `--hinomaru` on `--sumi` is **3.17:1**,
  which is what makes "red is never body text" a rule rather than a preference
- The reference video decomposed into 12 named devices and 5 motion mechanics
  (`spec-design.md` §1, §7.4), with its own values sampled (`#D42C21`, ground `#18110E`)
- The photo library **triaged by measured luminance**: 15 Tier A, 20 Tier B, 9 Tier C
  (`spec-design.md` §2) — the constraint the entire design direction rests on
- The logo kanji identified as **味** (verified by crop), which becomes the site's mark
- A **phone-number conflict** found: `2605-9536` (WhatsApp deep link + 2 posts) vs
  `2606-9536` (2 flyers) — `data-inventory.md` Q3

---

## 2. Planned changes

### 2.0 Rewrite `AGENTS.md` / `CLAUDE.md` §0 — **DONE**

Both files described Trísion Eyewear: Amanda, eyewear, `--ouro #CCA866`, `52□18-145`,
resellers, Payload tenancy. **None of it applied here**, and leaving it would have meant
every future session reading another project's brand rules in Oishi's repo.

- ✅ **Rewrote** §0 (project context, thesis, status, the photo constraint, brand identity,
  stack table, state management, "things that must not break", start-here, open questions)
  and §4's directory layout, for Oishi
- ✅ **Kept §1–§3's rules verbatim**, with their examples re-pointed at Oishi paths — the
  portable process (task doc first, use CLIs, update docs after) is exactly right and is
  why these specs exist. §2.1 gained the ffmpeg/contrast/registry lessons from this session.
- ✅ Left the `nextjs-agent-rules` block at the top untouched — `next dev` rewrites it
- ✅ The two files are byte-identical (`shasum` verified: `d62ab7b9…`)

### 2.1 Scaffold

Via the official CLI, not hand-written (`AGENTS.md` §2.0):

```
pnpm create next-app@latest . --ts --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
git init && git add -A && git commit
```

Then verify the resulting Next major against `node_modules/next/dist/docs/` **before
writing any App Router code** — the header block in `AGENTS.md` is not decorative, and
16.x has breaking changes from training data.

### 2.2 Tokens and fonts

| File | Change | Notes |
|---|---|---|
| `src/app/globals.css` | new | `spec-design.md` §4.1 tokens verbatim + `@theme` mapping. Tailwind v4 CSS-first. |
| `src/app/layout.tsx` | modify | `<html lang="pt-BR">`, Archivo via `next/font/google` **with the `wdth` axis** (the entire reason for the family — `spec-design.md` §6.1) |
| `scripts/subset-fonte.mts` | new | `pyftsubset` wrapper driven by the `spec-design.md` §6.4 glyph list → `src/assets/shippori-mincho-subset.woff2`, budget ≤ 40 KB |

### 2.3 The mark

| File | Change | Notes |
|---|---|---|
| `src/lib/marca-paths.ts` | new | `味` + the disc traced as SVG paths. **The only source** — header, favicon, apple-icon and OG card all import it. |
| `src/components/marca/selo.tsx` | new | The four scales, `spec-design.md` §3.1 |
| `src/components/marca/disco.tsx` | new | Flat and gradient fills only; must carry content (§3.2) |
| `src/app/icon.tsx`, `apple-icon.tsx` | new | from `marca-paths.ts` |

The `Oishi` wordmark ships as an Archivo **stand-in marked `[VERIFICAR: Q1]`**, not as the
real lockup (`spec-design.md` §3.3).

### 2.4 Content and the seam

| File | Change | Notes |
|---|---|---|
| `src/lib/conteudo/tipos.ts` | new | `spec-architecture.md` §5.2 |
| `src/lib/conteudo/fonte.ts` / `fonte.local.ts` | new | The seam. **No page imports `content/` directly.** |
| `src/lib/conteudo/esquemas.ts` | new | Zod, incl. the `semDesperdicio < padrao` assertion |
| `src/content/restaurante.ts` | new | `data-inventory.md` §2. `cidade`/`cep` **left undefined** — Q2 |
| `src/content/rodizios.ts` | new | §4 + §5. Item names **verbatim** — `SUSHIBAH`, `CRYSPY`, `PORCAO` |
| `src/content/campanha.ts` | new | §8, verbatim |
| `src/lib/formato.ts` | new | `formatarBRL` (centavos → `R$ 74,90`), phone, date |
| `scripts/verificar-conteudo.mts` | new | Runs in `pnpm build` (`spec-architecture.md` §5.3) |

### 2.5 The image pipeline

`scripts/normalizar-imagens.ts` (sharp): triage by measured mean luminance → grade
(highlight rolloff, warm shadows, **−25% green saturation**, vignette) → AVIF + WebP at
`[400, 800, 1200, 1800]` → `public/fotos/` + generated `src/content/fotos.ts`
(`spec-design.md` §10).

Marketing graphics are flagged **Tier G** manually in a small allow-list and excluded from
every gallery.

### 2.6 Motion foundation

| File | Notes |
|---|---|
| `src/lib/motion/usar-lenis.ts` | Lenis + `lenis.on('scroll', ScrollTrigger.update)` |
| `src/lib/motion/usar-scrub.ts` | ScrollTrigger wrapper, **reduced-motion aware by default** — the hook returns final-state values when `prefers-reduced-motion` matches, so no call site has to remember |
| `src/components/cena/recorte-heroi.tsx` | M1 |
| `src/components/cena/pilha.tsx` | M2 — must include the near-layer z-crossing (`spec-design.md` §13.11) |
| `src/components/tipografia/manchete.tsx` | §6.5, collapses to stacked below 768px |

### 2.7 Routes

`/`, `/cardapio`, `/rodizio/[slug]` (×3, `generateStaticParams`), `/reserva`, `/contato`,
`/delivery` (308), plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.
Screens are specified in `spec-design.md` §11.

### 2.8 The three exits

`lib/contato/whatsapp.ts` (the **one** `wa.me` builder), `lib/contato/delivery.ts`, and
`components/reserva/formulario-reserva.tsx` (RHF + Zod → WhatsApp deep link,
`spec-architecture.md` §6.3).

### 2.9 Alternatives considered and rejected

Recorded in `spec-architecture.md` §13. The two most likely to be re-proposed by a future
session: **a CMS** (rejected — §7, the seam makes it reversible) and **a reservation
database** (rejected — §6.3, revisit only when the owner says WhatsApp isn't enough).

---

## 3. Why

- **§2.0 first**, because a repo whose agent rules describe a different client is a trap
  that gets more expensive with every session.
- **The seam (§2.4) before any page**, because retrofitting it after five routes read
  `content/` directly is the exact refactor it exists to prevent.
- **The image pipeline (§2.5) before any screen**, because `spec-design.md` §2 — the
  measured weakness of the photo library — is the reason the design is type-led. Building
  screens first would silently assume photographs that do not survive full-bleed.
- **Reduced motion inside `usar-scrub` (§2.6)**, not at call sites, because "every call
  site remembers" is not a mechanism.
- **WhatsApp reservations (§2.8)** ship Fase 0 now instead of blocking on a database
  decision that the restaurant may never want.

---

## 4. Affected files

| File | Change | Notes |
|---|---|---|
| `AGENTS.md`, `CLAUDE.md` | **modify** | §0 + §4 rewritten for Oishi; §1–§3 kept verbatim |
| `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs` | new | `create-next-app` output |
| `.gitignore` | modify | add `references/**/*.mov` |
| `.env.example` | new | `NEXT_PUBLIC_SITE_URL` only |
| `src/app/globals.css` | new | `spec-design.md` §4.1 |
| `src/app/layout.tsx` | modify | pt-BR, Archivo (`wdth`), Shippori subset, Lenis, JSON-LD |
| `src/app/{page,cardapio,rodizio/[slug],reserva,contato}/page.tsx` | new | `spec-design.md` §11 |
| `src/app/delivery/route.ts` | new | 308 → anota.ai |
| `src/app/{icon,apple-icon,opengraph-image}.tsx`, `sitemap.ts`, `robots.ts` | new | |
| `src/lib/marca-paths.ts`, `tinta-paths.ts` | new | the only sources for the mark and the ink |
| `src/lib/conteudo/*` | new | the seam |
| `src/lib/contato/{whatsapp,delivery}.ts` | new | the two exit builders |
| `src/lib/{formato,seo,structured-data,site-config}.ts`, `og-image.tsx` | new | one-place rules, `spec-architecture.md` §9.1 |
| `src/lib/motion/{usar-lenis,usar-scrub}.ts` | new | |
| `src/components/marca/*`, `tipografia/*`, `cena/*`, `cardapio/*`, `reserva/*` | new | `spec-architecture.md` §9 |
| `src/components/ui/*` + `SOURCES.md` | new | shadcn, vendored per component |
| `src/components/bits/*` + `SOURCES.md` | new | max 3, `spec-design.md` §8.1 |
| `src/content/*` | new | `restaurante`, `rodizios`, `campanha`; `fotos.ts` generated |
| `src/assets/shippori-mincho-subset.woff2` | new | ≤ 40 KB |
| `scripts/*.{ts,mts}` | new | images, marca, font subset, content validation, verification |
| `public/fotos/*` | generated | committed |
| `README.md` | new | setup, scripts, routes, status |

---

## 5. Verification

Every criterion is measurable. None rests on "works" or "looks good".

**Build and content**

1. `pnpm build` — **0** TypeScript errors, **0** ESLint errors
2. `verificar-conteudo.mts` passes all six rules in `spec-architecture.md` §5.3 — including
   `semDesperdicio < padrao` on all four tiers
3. Every route in `spec-architecture.md` §8 is **static** in the build manifest
4. Grep assertion: **no** string literal matching `/R\$|\(21\)|Sá Carvalho|18h30/` under
   `src/components/` (facts live in `content/`)
5. Grep assertion: **exactly one** occurrence of `wa.me` in `src/`, in
   `lib/contato/whatsapp.ts`

**Data fidelity — the ones that matter most**

6. All **eight** prices from `data-inventory.md` §4 render on `/cardapio`, matched
   character-for-character against the table by a Playwright test
7. All three rodízio item lists match `data-inventory.md` §5 **verbatim**, including
   `SUSHIBAH`, `CRYSPY`, `PORCAO`
8. The campaign condition string appears **verbatim** on every route showing a price
9. **No** `openingHours` in the emitted JSON-LD while Q4 is open; **no** `addressLocality`
   while Q2 is open
10. Every unresolved question in `data-inventory.md` §11 has a matching `[VERIFICAR: Q<n>]`
    in the code where it is load-bearing

**Design system**

11. Contrast ratios recomputed by script and matching `spec-design.md` §4.2 to 2 d.p.
12. No `#000000` and no second accent colour in `globals.css` — grep assertion
13. Every Japanese character rendered anywhere in `src/` is in the §6.4 allow-list —
    script assertion over the source
14. No photo used above its measured tier; no Tier C rendered wider than 220px

**Performance and accessibility** (`spec-design.md` §12)

15. LCP ≤ **2.5s** mobile 4G-throttled, median of 5, on `/` and `/cardapio`
16. CLS ≤ **0.05**, INP ≤ **200ms**
17. JS ≤ **210 KB** gz on `/`, ≤ **130 KB** gz on `/cardapio`
18. Shippori subset ≤ **40 KB**; no image over **180 KB**
19. **0** serious/critical axe violations on all six routes
20. With `prefers-reduced-motion: reduce` forced: all eight prices, the address, and all
    three CTAs present in the DOM, and the loader does not run
21. **With JavaScript disabled**: prices, full menu, address, hours and all three CTA
    links render and function on every route

---

## 6. Explicitly out of scope

Stated because `spec-architecture.md` §3's phases overlap enough that an unstated boundary
gets crossed:

- **No CMS, no Payload, no database, no auth, no `/admin`** (§7, §13)
- **No reservation persistence** — the form opens WhatsApp and nothing else (§6.3)
- **No cart, no checkout, no payments** (§2)
- **No à la carte menu** — we do not have one (`data-inventory.md` §6, Q7)
- **No i18n**
- **No map iframe** — static image + outbound link (§6.4)
- **No analytics** beyond optionally Vercel's cookieless one; no third-party scripts (§11)
- **No new photography** — Q12 is a brief (`spec-design.md` §10.4), not part of this task
- **No invented answers to Q2, Q3, Q4, Q5, Q8** — `[VERIFICAR]` and honest-absence states
- **No fish motif** beyond the supplied logo (`spec-brand.md` §1.3)
- **No fourth React Bits component**, and none from the rejected list (`spec-design.md` §8.1)

---

## 7. Suggested commit sequence

Each is independently reviewable and leaves the tree building:

1. `docs: add brand, design, architecture specs and data inventory`
2. `docs: rewrite agent rules for Oishi` (§2.0)
3. `chore: scaffold next app with pnpm`
4. `feat: design tokens and typography`
5. `feat: 味 mark and SVG paths`
6. `feat: content seam, types and rodízio data`
7. `feat: image pipeline and photo manifest`
8. `feat: motion foundation — lenis, scrub, M1, M2`
9. `feat: home, waste chapter and price pair`
10. `feat: cardápio and rodízio chapters`
11. `feat: reservation form and the three exits`
12. `feat: contato, seo, structured data, og`
13. `chore: verification scripts and budgets`

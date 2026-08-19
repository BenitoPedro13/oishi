<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Workflow Guidelines — Oishi Cozinha Japonesa (Restaurant Site)

> This file follows a portable process template (plan before you touch anything, lean on
> existing tooling while you work, treat documentation as part of the deliverable when you
> finish) instantiated for this specific project. Section 0 is project-specific; sections
> 1–4 are the portable rules with paths and examples adapted to this repo.
>
> The philosophy in one line: **Plan before you write, lean on existing tooling while you
> work, and treat documentation as part of the deliverable when you finish.**
>
> Closest siblings: **F&A Móveis** and **Trísion** (existing brand, WhatsApp-terminal, no
> cart, demo before the money). Do not import Flora's monorepo, NestJS, or Trísion's
> Payload tenancy into this repo — Oishi has one tenant and no CMS.

---

## 0. Project context — Oishi Cozinha Japonesa

The brand, the visual system, the platform and the facts live in **`docs/spec-brand.md`**,
**`docs/spec-design.md`**, **`docs/spec-architecture.md`** and **`docs/data-inventory.md`**.
Read brand §1–§3, design §2 and §13, and architecture §1–§6 before writing anything. Those
four files are the source of truth for *what to build*; this file covers *how to work*.

**Oishi Cozinha Japonesa** is a Japanese restaurant at R. Sá Carvalho, 40 — Centro,
São Gonçalo/RJ `[VERIFICAR: Q2]`. It has **17K Instagram followers and no website**. Its
menu and four price tiers exist only inside JPEGs; reservations arrive by phone; delivery
runs on `pedido.anota.ai`.

The product in one sentence: **make the prices searchable, make the three actions
(delivery, reserva, WhatsApp) one tap each, and make the whole thing feel like it was made
on purpose.**

### The thesis — build everything on this

> **`Coma tudo o que pedir. Pague menos por isso.`**

Oishi's **campanha contra o desperdício** charges **R$ 20 less per person** on every rodízio
tier if the whole table finishes what it takes. `R$ 74,90 → R$ 54,90`. That is the one thing
they can say that no competitor can, it is true and checkable, and it is the spine of the
site (`spec-brand.md` §2). If a change buries the two-price structure, the change is wrong.

### Status

**Specs written, no code.** `docs/` holds the four specs and
`docs/tasks/TASK-scaffold-e-fase-0.md`. There is no `package.json` and no git repository
yet. `TASK-scaffold-e-fase-0.md` §7 has the commit sequence.

### The constraint that shapes everything

Measured with ffmpeg across all 44 reference photographs, by mean luminance:
**15 Tier A** (≤90, survives full-bleed), **20 Tier B** (91–145, framed panel only),
**9 Tier C** (>145, thumbnail only) — and **zero** photographs of the team, the counter in
service, or the room with people in it.

new-sushism.jp, the aesthetic reference, is photography-led and rests on a professional
shoot. **We cannot copy that.** Oishi's site is **type-led and colour-led**, borrowing the
reference's *motion and typographic* language only. `spec-design.md` §2 is the whole
argument and is not optional reading.

### Brand identity (for copy, tone, and component decisions)

- **The mark is 味** (*aji*, "flavour") — the kanji inside the logo's *hinomaru*, verified
  by crop. `Oishi` and `味` are the same idea in two scripts. It ships as SVG from
  `lib/marca-paths.ts` at four defined scales (`spec-design.md` §3.1).
- **Colours are sampled, not chosen.** The disc is a real vertical gradient:
  `--hinomaru-escuro #9A1114` → `--hinomaru #C6151B` → `--hinomaru-claro #E71B23`.
  The ground is `--sumi #14100F` — **warm ink, never pure black**.
- **Voice:** Portuguese a São Gonçalo restaurant owner would actually speak. Warm, direct,
  first person plural, a little proud. `Fala com a gente no WhatsApp`, not `Entre em
  contato conosco`. Never corporate, never poetic-for-its-own-sake (`spec-brand.md` §3).
- **Personality:** a neighbourhood rodízio that is serious about craft and honest about
  what it is. **Not** a 12-seat omakase counter in Ebisu — customers who have eaten there
  will spot the lie (`spec-brand.md` §2.3).
- Customer-facing copy is always **pt-BR**. `Cardápio`, not `Menu`. `Rodízio` and
  `Delivery` stay — Brazilians say those.

### Stack (per `spec-architecture.md` §4)

Versions are a **snapshot taken 2026-08-18, not a pin.** See §2.0 before adding anything.

| Layer | Choice | Status |
|---|---|---|
| Framework | **Next.js** (App Router, TypeScript, `src/`, `@/*`) — current stable major | not scaffolded (16.3.1 seen) |
| Styling | **Tailwind v4**, CSS-first in `src/app/globals.css`, tokens 1:1 with `spec-design.md` §4.1. Dark only — no light-mode toggle | not started (4.3.3) |
| Scroll timelines | **GSAP + ScrollTrigger** — pinning + scrubbed `clip-path` (M1) is its job | not started (3.15.0) |
| Smooth scroll | **Lenis**, wired to `ScrollTrigger.update` | not started (1.3.26) |
| Component motion | **Motion** (`motion/react`) — hover, gesture, layout, `AnimatePresence` | not started (13.1.0) |
| Brand components | Hand-written: `Selo`, `Disco`, `MarcaItem`, `Manchete`, `ParPreco`, `ColunaVertical`, `Tinta`. No generator produces these; they are the brand | not started |
| Form/overlay primitives | **shadcn/ui**, per-component, vendored + `SOURCES.md`. The reservation reference HTML *is* shadcn | not started (CLI 4.18.0) |
| Selected effects | **React Bits**, vendored, **3 accepted, 5 explicitly rejected** (`spec-design.md` §8.1) | not started |
| Content | **Typed TS** in `src/content/` behind the seam `lib/conteudo/fonte.*.ts`. **No CMS in v1** | not started |
| Validation | **Zod** — the form, and `content/` at build time (`spec-architecture.md` §5.3) | not started |
| Form state | **React Hook Form** + resolvers | not started |
| Client/server state | **Server Components own the data.** TanStack Query **not installed** — no live/mutable data exists. Zustand **not installed** — nothing shares state across siblings yet. URL search params for filters; `useState` for the rest | deliberately absent |
| Conversion | Three exits, one builder each: `lib/contato/whatsapp.ts`, `lib/contato/delivery.ts`, and the reservation form → **WhatsApp deep link**. **No cart, no checkout, no payments, no reservation database** | not started |
| Images | **sharp** in `scripts/normalizar-imagens.ts` — triage by measured luminance, then grade | not started (0.35.3) |
| Fonts | **Archivo** via `next/font/google` (**`wdth` axis required**) + **Shippori Mincho** subset to ~30 glyphs, ≤40 KB | not started |
| Hosting | **Vercel**, fully static | not started |
| Package manager | **pnpm**, decided at scaffold time, never mixed | 11.21.0 |

### State management — which tool, and why

Decided in `spec-architecture.md` §4.2; apply this instead of re-deriving it per task.

1. **Server Components own the data.** Pages read `lib/conteudo/fonte.ts`, awaited, no
   client fetch. Fase 0's content is synchronous local TS — there is nothing to keep in
   sync after first render, which is precisely TanStack Query's job and precisely why it
   is not installed.
2. **The reservation form is the only real client state**, owned by **React Hook Form +
   Zod**. No global store.
3. **Filterable/shareable state is URL search params**, read by the Server Component
   (`/cardapio?estacao=sushibah`) — shareable, and no client fetch on a filter click.
4. **Zustand is not installed.** Add it when two sibling components with no common parent
   genuinely share state — not before. A store installed speculatively sits in every
   route's client bundle against a 210 KB budget.
5. **When one component owns a piece of state alone, `useState` is correct.** The only
   Context in the app is the Lenis instance and `useReducedMotion`.

### Things that must not break

Each is either the product thesis, a brand rule, or a lesson already paid for elsewhere.

- **Never invent a fact about their business** — not a price, not an hour, not a day of the
  week, not a menu item, not the city. Write `[VERIFICAR: Q<n> — what to ask]` inline and
  render the honest-absence state. **A wrong opening hour is worse than a missing one:** it
  sends someone across town at 22h for nothing.
- **If it is not in `docs/data-inventory.md`, it may not appear on the site.** That file is
  the register of every allowed fact, with its evidence file and confidence.
- **The two prices always appear together, and the condition is verbatim**
  (`spec-design.md` §5). `R$ 54,90` alone is a false price — it is conditional on the whole
  table. `R$ 74,90` alone throws away the thesis.
- **Prices are stored in centavos** (`7490`) and formatted at the edge by `lib/formato.ts`.
  Never store `"R$ 74,90"`. A tier with no price renders **no price** — not `—`, not
  `Consultar`.
- **`--hinomaru` is never body text.** Measured **3.17:1** on `--sumi`. Red is fills,
  display type ≥32px/700, hairlines, marks. This is a number, not a preference.
- **`--foco` `#FFFFFF` is not a text colour.** Body is `--washi`. Pure white marks the one
  element hovered, focused or selected — one at a time.
- **No second accent colour.** No gold, orange, green or teal — all four are in the current
  flyers and all four are retired. **Pure `#000` appears nowhere**, including gradient stops.
- **`--radius: 0`**, the disc excepted. **No box-shadows** — depth is scroll speed and
  overlap, never a shadow.
- **`味` is SVG from `lib/marca-paths.ts`**, never a typed character, never rotated,
  recoloured or rescaled outside `spec-design.md` §3.1. A disc always carries something.
- **Scroll scrubs a timeline; it does not trigger animations** (`spec-design.md` §7.1).
  And **the near media layer must cross in front of the type layer** — parallax without the
  z-interleave is just lag.
- **`prefers-reduced-motion` and no-JS are complete experiences**, not degraded ones. Every
  price, the address, and all three CTAs must be present and functional in both. Tested,
  not assumed.
- **One `wa.me` builder.** `lib/contato/whatsapp.ts`, reading the number from `content/`.
  A sibling project shipped `localhost` inside every production message because two places
  built that string — and here the number itself is still **conflicted** (Q3).
- **No stock photography, no AI imagery, no competitor's photographs. Ever.** Where there
  is no photograph, the design uses type (`spec-design.md` §2.3).
- **No photograph above its measured tier.** Tier C never exceeds 220px, never full-bleed.
- **Menu item names are verbatim** until Q6 is answered — `SUSHIBAH`, `CRYSPY`, `PORCAO`,
  `MISSOSHIRU` are their spellings, and "fixing" them invents a fact about their menu.
- **Every Japanese glyph is on the `spec-design.md` §6.4 allow-list**, or it does not
  render. `放題` is correct for rodízio; `回転` (conveyor-belt) would be wrong.
- **Sushi da Praça's reservation rules are never copied.** The reference HTML is a *UI*
  reference — field set and shadcn primitives — and another restaurant's policy otherwise.
- **A React Bits component needs a sentence naming the brand fact it carries.** "It looks
  incredible" is not that sentence. The rejected list in `spec-design.md` §8.1 is binding.
- **shadcn and React Bits are vendored byte-identical** into `components/ui/` and
  `components/bits/`, logged in `SOURCES.md` with URL + sha256. Restyle only through tokens.
- **The mobile site is the primary site.** Above the fold on a 390×844 phone: open state,
  address, and the three CTAs. The cinema starts at scroll offset 1.

### How to write in this repo

- **Never invent an API, a component prop, or a provider's behaviour.** Write
  `[VERIFICAR: what to check and where]` inline. Resolve it before the code ships, not after.
- **Be specific to the point of discomfort:** exact token names (`--hinomaru`, not "the
  red"), exact spec section, exact centavos, exact pt-BR strings. No acceptance criterion
  may rest on "works", "fast" or "looks good" — `spec-design.md` §12 and
  `TASK-scaffold-e-fase-0.md` §5 set the pattern (measured LCP, computed WCAG ratios).
- **Cite the spec by section**, not by description — `spec-design.md` §7.4 M1, not "the
  hero crop thing".
- **Brazilian formatting everywhere:** `R$ 74,90`, `18h30`, `(21) 2605-9536`, `1/3`, `58%`.
- **No superlatives without a number behind them.** The waste campaign is nothing *but*
  numbers, which is exactly why it leads.

### Start here

1. `docs/data-inventory.md` — every fact you are allowed to state, and the twelve open
   questions. **Read this before writing any user-facing string.**
2. `docs/spec-brand.md` — who Oishi is, the audit, the thesis, voice.
3. `docs/spec-design.md` — **§2 first** (why the design is type-led), then tokens, the
   mark, motion (§7.4), screens (§11), and the rules that are never broken (§13).
4. `docs/spec-architecture.md` — platform, the content seam (§5.1), the three exits (§6).
5. `docs/tasks/TASK-scaffold-e-fase-0.md` — the plan and the commit sequence.

### Open questions that block code

All twelve live in `data-inventory.md` §11 with an owner each. **Three block launch:**

1. **Q3 — the phone number.** `(21) 2605-9536` (WhatsApp deep link + two posts) vs
   `(21) 2606-9536` (two flyers). Blocks every CTA. Contained to
   `lib/contato/whatsapp.ts` so the site can be built around it — but it cannot ship
   unresolved. **Highest-severity item in the repo.**
2. **Q4 — which days, and what hours.** The bio gives one range with no days attached.
   Blocks the hours module, the `openingHours` JSON-LD (**omitted, never guessed**), the
   "aberto agora" state, and the reservation slots.
3. **Q8 — the standing reservation policy.** Min/max party, cut-off, tolerance. The form
   ships without it; the rules panel renders `[VERIFICAR]`.

**Q12 — can anyone shoot photographs?** blocks no code but decides the site's ceiling.
`spec-design.md` §10.4 is the 14-frame brief; §10.5 lists the four slots that upgrade with
a one-prop change.

Do not silently assume answers. Fase 0 exists partly to extract them.

---

## 1. Plan before executing — write a task document first

**Rule:** Before editing or creating **any** code file, write a task document at
`docs/tasks/TASK-<slug>.md` describing the work. No exceptions for "small" changes.

This applies from the very first scaffold commit: `TASK-scaffold-e-fase-0.md` was written
before `package.json` existed. Keep doing that.

### 1.1 Required sections

Every task document must contain these five sections, in this order:

1. **Current scenario** — what exists today, what's missing or blocked, with concrete
   file names and the commit it describes.
2. **Planned changes** — file by file, what's added/modified/removed and how it
   connects. Note alternatives considered and rejected.
3. **Why** — the justification, so a reviewer can push back before code exists.
4. **Affected files** — a table:

   | File | Change type | Notes |
   |------|-------------|-------|
   | `src/components/cardapio/par-preco.tsx` | new | the two-price component, `spec-design.md` §5 |
   | `src/lib/contato/whatsapp.ts` | new | the ONE `wa.me` builder, `spec-architecture.md` §6.2 |

5. **Verification** — measurable criteria. See `spec-design.md` §12 and
   `TASK-scaffold-e-fase-0.md` §5. No criterion may rest on "works."

Also record what is **explicitly out of scope**. The phases in `spec-architecture.md` §3
overlap enough that an unstated boundary will be crossed — a CMS in Fase 0, a reservation
database, an invented opening hour, an à la carte menu we do not have.

### 1.2 How to apply it

- **Write the document silently.** Create the file, then point the user at it or
  summarize in 2–3 lines, and wait for alignment on anything significant before writing
  code.
- **One document per task / unit of work.** Short kebab-case slug:
  `TASK-scaffold-e-fase-0.md`, `TASK-pipeline-imagens.md`, `TASK-reserva-whatsapp.md`.
- **Keep it in sync** if the plan changes mid-task — it's a living record, not
  write-once.
- **The document is the contract.** When scope is unclear, the task doc is the source of
  truth for what was agreed.

### 1.3 Why this matters

The user wants review and alignment before code is written — avoids work that gets
rejected, and leaves a trail of *why* a decision was made (type-led over photo-led,
WhatsApp over a reservation database, no CMS) which will not be obvious from the code
later.

---

## 2. Use CLIs, generators, and SDKs — don't write everything by hand

**Rule:** Prefer invoking existing, canonical tooling over hand-authoring files a tool
can generate correctly.

### 2.0 Assume your framework knowledge is outdated — check first, every time

Before scaffolding or adding a dependency for **any** part of this stack — Next.js,
Tailwind, shadcn, React Bits, GSAP, Motion, Lenis, `next/font`, sharp:

1. **Go to the framework's own current docs first.** Don't rely on remembered APIs or
   flags; they may already be wrong. The Next.js note at the top of this file is not
   decorative.
2. **Use the official CLI to scaffold/generate**, not a hand-written file:
   `pnpm create next-app@latest`, `pnpm dlx shadcn@latest init` / `add <component>`.
3. **shadcn wants to own `globals.css`.** Never let a shadcn theme generator rewrite it —
   the Oishi tokens are **sampled from the logo with ffmpeg**, not generated
   (`spec-design.md` §4.1). Let the CLI write, then restore the token block.
4. **Take the current major version as authoritative** over anything written in this file,
   and update the stack table to match (§3.1).
5. **Check the registry, don't recall.** `npm view <pkg> version` costs one command.

### 2.1 What this looks like in practice

- **Scaffolding & generators.** `pnpm create next-app@latest`, the shadcn CLI,
  `gh repo create`.
- **Run the command, then verify the output** rather than hand-recreating what a
  reliable generator already produces.
- **Fonts via `next/font`**, self-hosted, never a third-party stylesheet request — it
  breaks the performance budget in `spec-design.md` §12 and adds a third-party connection
  the privacy stance in `spec-architecture.md` §11 rules out. Archivo needs the **`wdth`
  axis** — that is the entire reason for the choice (`spec-design.md` §6.1).
- **Font subsetting goes through `pyftsubset`**, driven by the glyph list in
  `spec-design.md` §6.4 — never by hand-picking a Google Fonts `&text=` string.
- **Image processing goes through `sharp` or `ffmpeg`, scripted** — never hand-edited one
  file at a time. 44 photographs by four people on three phones become one library only if
  one script grades them all (`spec-design.md` §10).
- **Colour samples from their material go through `ffmpeg`**, not the eyedropper of memory.
  Stock "Japanese red" is `#BC002D`; theirs is a **gradient**, `#9A1114 → #E71B23`.
- **Contrast ratios are computed by script**, never estimated. `--hinomaru` on `--sumi`
  measuring 3.17:1 is the reason for a rule; a guess would have produced a bug.
- **Video references are decomposed with `ffmpeg`** — frame extraction and contact sheets —
  not described from a single glance.
- **Use the agent's dedicated tools** (Read/Edit/Write/Grep) over improvised shell
  commands when one fits.
- **One package manager, decided at scaffold time, then never mixed.**

### 2.2 When to hand-write instead

No generator covers `Selo`, `Disco`, `MarcaItem`, `Manchete`, `ParPreco`, `ColunaVertical`,
`Tinta`, the M1–M5 scroll mechanics, the content seam, or the WhatsApp builder. Those are
hand-written on purpose, matching surrounding code style. If a provider's behaviour isn't
something you can verify directly, write `[VERIFICAR: ...]` rather than guessing.

### 2.3 Why this matters

Less human error, canonical and reproducible output, and — for anything touching their
prices, hours or phone number — a result that reflects what they actually gave us rather
than a plausible number from training data. **A wrong `R$ 54,90` or a wrong `(21) 2606-9536`
shown to a customer is the worst failure this product can have.**

---

## 3. Update documentation after executing

**Rule:** Before considering a task **done**, update all documentation affected by the
change.

### 3.1 What to check and update

- **`AGENTS.md` / `CLAUDE.md`** (this file, kept byte-identical in both) — if the change
  alters the stack, architecture, or any of §0's "things that must not break."
- **`README.md`** — the *implementation* README (setup, scripts, status). Update when
  scripts, stack, routes, or the Status section change.
- **`docs/data-inventory.md`** — **first**, whenever a fact is learned, confirmed or
  contradicted. When an open question is answered: update the row, change the confidence,
  record the date and who answered, and delete the matching `[VERIFICAR]` from the code.
- **`docs/spec-brand.md`** — if a keep/refine/retire decision changes, or the voice rules
  gain a decided string.
- **`docs/spec-design.md`** — if a token, component, motion mechanic or rule changes.
  **Contrast ratios are recomputed, not estimated.** A new Japanese glyph means §6.4 grows
  *and* the font subset is regenerated.
- **`docs/spec-architecture.md`** — if the change resolves an open question, changes scope,
  or alters the data model, the seam, or the three exits. Update the specific section;
  don't append.
- **`.env.example`** — every environment variable the code reads must be listed the moment
  code reads it.
- **`docs/tasks/`** — keep task docs in sync while work is in progress (§1.2).
- Grep `docs/*.md` for the names of things you changed (route, token, `[VERIFICAR]` item,
  pt-BR string, price) to catch stale references.

### 3.2 How to apply it

Treat "docs updated" as an explicit checklist item before declaring a task complete.
When unsure whether a doc is affected, grep for the thing you changed.

### 3.3 Why this matters

`data-inventory.md` exists because a price, an hour or a phone number that drifts between
a doc and the code is how a customer ends up at a closed door or a dead number. A doc that
silently goes stale is how a future session ships the `2606` number after the owner has
already told us it is `2605`.

---

## 4. Project conventions

**Rule:** Single Next.js app, not a monorepo — no workspace tooling unless a real second
package emerges. **Fully static**: no database, no CMS, no auth, no server-side data in v1
(`spec-architecture.md` §2, §7).

- **Layout (target — `spec-architecture.md` §9; do not create folders a task is not
  building):**

  ```
  src/app/
    layout.tsx                <html lang="pt-BR">, Archivo + Shippori subset, Lenis, JSON-LD
    globals.css               spec-design.md §4.1 tokens + @theme
    page.tsx                  / — hero, intro, waste chapter, rodízios, delivery, contato
    cardapio/page.tsx         the crawlable menu — highest SEO value on the site
    rodizio/[slug]/page.tsx   3 chapters: chisai, sem-sashimi, com-sashimi
    reserva/page.tsx          static shell + client form island
    contato/page.tsx
    delivery/route.ts         308 → pedido.anota.ai
    icon.tsx apple-icon.tsx opengraph-image.tsx sitemap.ts robots.ts
  src/components/
    marca/                    selo (味), disco, marca-item (kanji+word nav), cabecalho, rodape
    tipografia/               manchete (positioned words), coluna-vertical
    cena/                     recorte-heroi (M1), pilha (M2), painel-midia, tinta
    cardapio/                 par-preco (THE component), contador-preco (M5), lista-itens,
                              marquise-condicao
    reserva/                  formulario-reserva ('use client', RHF+Zod → WhatsApp)
    ui/                       shadcn, vendored + SOURCES.md
    bits/                     React Bits, vendored + SOURCES.md — max 3
  src/lib/
    conteudo/                 tipos, fonte, fonte.local, esquemas   ← THE seam
    contato/                  whatsapp.ts (the ONE wa.me builder), delivery.ts
    marca-paths.ts            味 + disc as SVG — the only source for the mark
    tinta-paths.ts            traced ink-blot paths — spec-design.md §7.6
    formato.ts                formatarBRL / telefone / data — the ONE formatter
    seo.ts                    the ONE metadata builder
    structured-data.ts        the ONE JSON-LD builder
    og-image.tsx              the ONE OG composer
    motion/                   usar-lenis, usar-scrub (reduced-motion aware BY DEFAULT)
    site-config.ts            SITE_URL, normalised once
  src/content/                restaurante, rodizios, campanha; fotos.ts is GENERATED
  src/assets/                 shippori-mincho-subset.woff2 (≤40 KB), archivo statics for Satori
  scripts/                    normalizar-imagens, normalizar-marca, subset-fonte,
                              verificar-conteudo, verificar
  docs/                       the four specs + tasks/
  references/                 evidence; *.mov gitignored, extracted frames committed
  ```

- **The single-source rules** (`spec-architecture.md` §9.1). Each exists because two
  sources of one string is how a sibling project shipped a bug:
  the `wa.me` URL → `lib/contato/whatsapp.ts`; the delivery URL →
  `lib/contato/delivery.ts`; `味` and the disc → `lib/marca-paths.ts`; currency/phone/date
  → `lib/formato.ts`; metadata → `lib/seo.ts`; JSON-LD → `lib/structured-data.ts`;
  `SITE_URL` → `lib/site-config.ts`; menu and price data → `content/` **behind**
  `lib/conteudo/fonte.ts`; the photo manifest → generated `content/fotos.ts`.
- **No page, layout or component imports `src/content/*` directly.** They import
  `@/lib/conteudo/fonte`. That seam is what makes a CMS a one-file change instead of a
  refactor.
- **No user-facing fact lives in a component.** Enforced by a grep assertion in CI:
  no literal matching `/R\$|\(21\)|Sá Carvalho|18h30/` under `src/components/`.
- **Language.** All customer-facing copy is **Brazilian Portuguese**. Code, comments,
  commit messages and every file under `docs/` — specs, task docs, `README.md` — are
  **English**, except domain terms with no useful translation: keep `rodízio`, `sushibah`,
  `temaki`, `uramaki`, `harumaki`, `hinomaru`, `sem desperdício`, `cardápio` as-is.
- **Package manager:** **pnpm**, never mixed.
- **Styling:** Tailwind v4 tokens in `globals.css`. Don't introduce a second styling system
  (CSS-in-JS, another component library) alongside it. shadcn and React Bits land through
  the token layer, vendored, in a named task.

**Why:** this is a five-route static marketing site for a single restaurant, not a
platform. The process should match the size of the problem — F&A Móveis' shape, not
Flora's. The complexity budget goes into motion and typography, which is what the client
is actually buying.

### 4.1 Commit conventions

- **Commit automatically once a task doc's work is complete and verified** (build/lint
  passing per its own scope) — don't wait to be asked for each one. This is a standing
  authorization scoped to work that followed the task-doc process in §1; it is not blanket
  permission for destructive git operations (force-push, `reset --hard`), which still
  require explicit confirmation.
- **Never add a `Co-Authored-By` trailer to commits in this repo.**

---

## TL;DR

| Phase | Rule | Output |
|-------|------|--------|
| **Stack** | Next.js 16 + Tailwind v4 + GSAP/Lenis/Motion, pnpm. Fully static. No CMS, no database, no auth | Single-app repo: `src/app/`, `src/components/`, `src/content/`, `docs/tasks/` |
| **Before** | Write a task document first | `docs/tasks/TASK-<slug>.md`: current scenario, planned changes (file by file), why, affected-files table, verification, out-of-scope |
| **During** | Use CLIs / generators; sample with ffmpeg, compute contrast, check the registry; `[VERIFICAR: Q<n>]` for any fact not in `data-inventory.md` | Canonical output, no invented prices, no invented hours |
| **After** | Update `data-inventory.md` first, then `README.md` / `docs/spec-*.md` / `AGENTS.md` / `.env.example`, then commit — auto-committed once verified | Docs in sync, a commit |

**The loop:** plan → align → build with tooling → document → commit → done.

**Never broken:** no fact that isn't in `data-inventory.md`; both prices together with the
verbatim condition; prices in centavos; `--hinomaru` never body text (3.17:1, measured);
`#FFFFFF` means in-focus; no second accent; no pure `#000`; radius `0`; no box-shadows;
`味` is SVG from `marca-paths.ts`; a disc always carries something; scroll scrubs, it
doesn't trigger; the near layer crosses in front of the type; reduced-motion and no-JS are
complete sites; one `wa.me` builder; no stock or AI imagery, ever; no photo above its
measured tier; menu names verbatim; every kanji on the §6.4 allow-list; the mobile site is
the primary site.

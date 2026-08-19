# Oishi Cozinha Japonesa — Architecture Spec

> The platform: stack, routes, data model, integrations, phasing.
> Brand: `spec-brand.md`. Visual system: `spec-design.md`. Facts: `data-inventory.md`.

---

## 1. The problem

A restaurant with 17K Instagram followers, four printed price tiers, a WhatsApp number and
a delivery listing — and **no website**. Its menu and prices exist only inside JPEGs, so
they are invisible to search, unreadable on a slow connection, and unchangeable without a
designer.

The job, in one sentence: **make the prices searchable, make the three actions one tap
each, and make the whole thing feel like it was made on purpose.**

---

## 2. Scope

### In scope (v1)

- The cinematic marketing site: `/`, `/rodizio/[slug]`, `/cardapio`, `/reserva`, `/contato`
- The full rodízio menu as real, crawlable HTML with real prices
- Reservation form → **WhatsApp deep link** (§6.3)
- Delivery → outbound link to `pedido.anota.ai`
- Contact, address, map, hours, Instagram
- `LocalBusiness` + `Menu` structured data
- pt-BR only

### Explicitly out of scope

- **No cart, no checkout, no payments.** Delivery is `pedido.anota.ai`'s job; they already
  run it and are already paid for it. Rebuilding it would be a second product.
- **No reservation database, no admin, no auth, in v1.** §6.3 explains why.
- **No CMS in v1.** §7.
- **No i18n.** The audience is São Gonçalo. An `en` locale is a decision for after launch.
- **No blog, no accounts, no loyalty, no gift cards.**
- **No à la carte menu** — we don't have one (`data-inventory.md` §6, Q7).

---

## 3. Phasing

| Fase | What ships | Gate |
|---|---|---|
| **0 — the site** | Everything in scope above, real data, mock-free, on a Vercel URL. Reservations to WhatsApp. Content in typed TS. | Owner sees it on their phone and answers Q3, Q4, Q8. |
| **0.5 — the answers** | `[VERIFICAR]` markers resolved, hours module completed, reservation rules filled in, domain pointed. | Q3, Q4, Q8, Q11 answered. |
| **1 — persistence** *(only if asked)* | Reservations written to a database + a `/admin`, so the restaurant stops losing bookings in WhatsApp scrollback. | The owner says WhatsApp isn't enough. |
| **2 — content** *(only if asked)* | A CMS so they change prices themselves. | They ask to change a price and we're not available. |

**Fase 0 is the whole deliverable.** Fases 1 and 2 are written down so nobody builds them
speculatively — the biggest risk on a project this size is building a Payload admin for a
restaurant that would rather keep using WhatsApp.

---

## 4. Platform

Versions checked against the registry at spec time (2026-08-18), per `AGENTS.md` §2.0.
**These are a snapshot, not a pin** — take the current major as authoritative at scaffold
time and update this table.

| Layer | Choice | Version seen |
|---|---|---|
| Framework | **Next.js**, App Router, TypeScript, `src/`, `@/*` alias | 16.3.1 |
| Runtime | React | 19.2.8 |
| Styling | **Tailwind v4**, CSS-first, tokens in `src/app/globals.css` mapped 1:1 to `spec-design.md` §4.1 | 4.3.3 |
| Scroll timelines | **GSAP + ScrollTrigger** (`gsap`, `@gsap/react`) | 3.15.0 |
| Smooth scroll | **Lenis** | 1.3.26 |
| Component motion | **Motion** (`motion/react`) | 13.1.0 |
| Form + overlay primitives | **shadcn/ui**, per-component, vendored | CLI 4.18.0 |
| Selected effects | **React Bits**, vendored, 3 components max (`spec-design.md` §8.1) | — |
| Images | **sharp**, in `scripts/normalizar-imagens.ts` | 0.35.3 |
| Fonts | `next/font/google` (Archivo) + `next/font/local` (subset Shippori Mincho) | — |
| Content | **Typed TS modules** in `src/content/` | — |
| Validation | **Zod** — the reservation form, and the content modules at build time (§5.3) | — |
| Form state | **React Hook Form** + `@hookform/resolvers` | — |
| Hosting | **Vercel** | — |
| Package manager | **pnpm**, decided at scaffold, never mixed | 11.21.0 |

### 4.1 Why no framework for scroll beyond GSAP

`spec-design.md` §7.4 M1 needs pinning plus a scrubbed `clip-path` — ScrollTrigger's exact
job. Motion's `useScroll` can do M2 and M4 alone, but splitting M1 across two libraries
means two sources of truth for scroll position and a guaranteed desync. GSAP owns
everything scroll-linked; Motion owns everything else (`spec-design.md` §7.2).

### 4.2 State management

1. **Server Components own the data.** Every page reads `src/content/*` directly, awaited,
   no client fetch. The content is synchronous local TS — nothing to keep in sync after
   first render, which is exactly the job **TanStack Query is not needed for.**
   **It is not installed.**
2. **The reservation form is the only real client state**, and **React Hook Form + Zod**
   own it. No global store.
3. **Filterable/shareable state is URL search params**, read by the Server Component —
   e.g. `/cardapio?estacao=sushibah`. Shareable, and no client fetch on a filter click.
4. **Ephemeral UI state is `useState`.** No Zustand until two sibling components with no
   common parent need to share state — the mobile nav drawer is the first candidate, and
   even that is a single component today.
5. **`useReducedMotion` and the Lenis instance** are the only React Context in the app.

Installing a store before a feature needs it puts it in every route's client bundle for
zero benefit against a 210 KB budget (`spec-design.md` §12).

---

## 5. Data model

No database in v1. Content is typed TS modules behind interfaces a CMS could later
implement — the **seam** that has already paid for itself on the sibling projects.

### 5.1 The seam

```
src/lib/conteudo/
  tipos.ts          domain types — the contract. Nothing else defines these.
  fonte.ts          the ONLY module a page imports. Re-exports the active source.
  fonte.local.ts    Fase 0: reads src/content/*.ts
  fonte.cms.ts      Fase 2 (does not exist yet)
```

**No page, layout or component imports `src/content/*` directly.** They import
`@/lib/conteudo/fonte`. Swapping to a CMS later changes one file.

### 5.2 Types

```ts
export type Estacao = 'cozinha' | 'sushibah';

export interface ItemCardapio {
  nome: string;            // VERBATIM from the flyer — spec-brand.md §5.5
  descricao?: string;      // the parenthetical, e.g. "salmão, cebolinha, cheese"
  categoria: string;       // "Harumaki", "Uramaki", "Sashimi", …
  estacao: Estacao;
  foto?: string;           // key into content/fotos.ts — never a raw path
}

export interface Preco {
  padrao: number;          // centavos. 7490 — never "R$ 74,90"
  semDesperdicio: number;  // centavos. 5490
  verificadoEm: string;    // ISO date. Renders as "preços de DD/MM/AAAA"
  fonte: string;           // the evidence file in references/
}

export interface Rodizio {
  slug: 'chisai' | 'sem-sashimi' | 'com-sashimi';
  capitulo: '01' | '02' | '03';
  nome: string;
  kanji: string;           // must be in spec-design.md §6.4
  precos: Preco[];         // com-sashimi carries TWO (com limite, ilimitado)
  itens: ItemCardapio[];
}

export interface Restaurante {
  nome: string;
  endereco: { rua: string; numero: string; bairro: string;
              cidade?: string; uf?: string; cep?: string };   // optional = MISSING, not ""
  telefone: string;        // digits only, E.164 without '+': "552126059536"
  instagram: string;
  delivery: string;        // the anota.ai URL
  horarios?: Horario[];    // undefined until Q4 — the module renders honest absence
  horarioTextoBruto: string; // "18h30 às 23h40" — the one sourced string
}
```

**`Preco` is stored in centavos and formatted at the edge.** A price string is never
stored, exactly as a measurement is never stored as a string on the sibling project. One
formatter: `src/lib/formato.ts` → `formatarBRL(7490)` → `"R$ 74,90"`.

**Optional means missing.** `cidade?: string` being `undefined` is what drives the honest
absence state. An empty string is a bug — it renders as a silently blank line.

### 5.3 Content is validated at build time

`src/content/*.ts` is parsed by Zod schemas in `src/lib/conteudo/esquemas.ts`, executed in
`scripts/verificar-conteudo.mts`, run in `pnpm build`. It fails the build if:

- a `Preco.semDesperdicio >= Preco.padrao` (the campaign inverted — the worst possible bug)
- a `Preco` has no `verificadoEm` or no `fonte`
- a `kanji` is not in the `spec-design.md` §6.4 allow-list
- `telefone` is not 12–13 digits
- an `ItemCardapio.foto` key is absent from the generated `fotos.ts` manifest
- a photo is used above its measured tier (`spec-design.md` §10.2)

This is how "no invented facts" becomes a build failure rather than a good intention.

---

## 6. Integrations — the three exits

Every path off this site terminates in a channel Oishi already runs. There are exactly
three, and each has exactly one builder.

### 6.1 Delivery

An outbound link to `https://pedido.anota.ai/loja/oishi-cozinha-japonesa-1`,
`rel="noopener"`, `target="_blank"`. No API, no embed, no iframe — anota.ai owns the
catalogue and the checkout, and it is already live and maintained. Built by
`src/lib/contato/delivery.ts` so the URL exists once.

### 6.2 WhatsApp — one builder, no exceptions

**`src/lib/contato/whatsapp.ts` is the only place a `wa.me` URL is composed.** Nothing
else builds that string.

```ts
export function linkWhatsApp(mensagem?: string): string
```

- Reads the number from `content/restaurante.ts` — never a literal in a component
- Encodes the message with `encodeURIComponent`
- Emits `https://wa.me/552126059536?text=…`

**Why this rule is absolute:** a sibling project shipped `localhost` inside every
production WhatsApp message because two places built that string. Here it is worse — the
number itself is **conflicted** (`2605` vs `2606`, Q3). One builder means one line to
change when the owner answers, and no chance of a half-migrated site sending customers to
a dead number.

### 6.3 Reservations — the form submits to WhatsApp

**The reservation form validates in the browser and opens WhatsApp with a formatted
message.** No database, no email provider, no server action, no auth.

```
Olá! Gostaria de reservar uma mesa no Oishi.

📅 Data: 22/08/2026 (sábado)
🕐 Horário: 20h00
👥 Pessoas: 6
👤 Nome: Ana Marques
📱 Telefone: (21) 99999-0000
📝 Observações: aniversário
```

**Why, and not a database:**

1. **It matches how the restaurant already works.** Reservations arrive on WhatsApp today
   (`data-inventory.md` §7). A database means someone must remember to open an admin panel
   during dinner service — they won't, and a missed booking is worse than no form.
2. **The customer gets a confirmation the restaurant can reply to**, in the thread, on the
   app they already have open.
3. **No PII at rest.** No database means no CPF-adjacent data to secure, no LGPD retention
   policy to write, no breach surface, for a restaurant with no IT staff.
4. **It ships in Fase 0** instead of blocking on a Postgres provider, a schema, an admin
   UI and an auth decision.

The **UI is identical** to the reference either way (`spec-design.md` §11.6). Only the
submit target differs, and it is one function. When Fase 1 is genuinely wanted, the form
component does not change — `enviarReserva()` gains a server action alongside the deep
link.

**Client-side validation still matters** and is real: Zod schema, RHF resolver, dates in
the past rejected, party size bounded once Q8 answers it, `telefone` masked to
`(NN) NNNNN-NNNN`. An invalid reservation must never reach WhatsApp as garbage.

### 6.4 Maps

A static map image with a link out to Google Maps — not an embedded iframe. An iframe costs
~900 KB and a third-party cookie for a picture of a street. `[VERIFICAR: Q2 — endereço
completo antes de gerar o mapa]`.

---

## 7. Why there is no CMS in v1

Payload/Sanity would be ~250 MB of dependencies, a Postgres instance, an auth decision and
a `/admin` for content that consists of **three menus and four prices that changed once in
the last year**. The rodízio flyers in `references/` are dated across several months and
are otherwise identical.

**The seam (§5.1) makes this reversible for the price of one file.** If the owner asks to
change a price twice and we are not available, Fase 2 opens and `fonte.cms.ts` gets
written. Building it first would be the classic mistake: an admin panel nobody logs into.

---

## 8. Routing and rendering

| Route | Rendering | Notes |
|---|---|---|
| `/` | **Static** | The cinematic scroll journey. Every fact statically rendered — no client fetch. |
| `/cardapio` | **Static** | The crawlable menu. Highest SEO value on the site. |
| `/rodizio/[slug]` | **Static**, `generateStaticParams` | Three pages: `chisai`, `sem-sashimi`, `com-sashimi` |
| `/reserva` | **Static** shell, client form island | The form is `'use client'`; the page around it is not |
| `/contato` | **Static** | |
| `/delivery` | **Redirect** (308) → `pedido.anota.ai` | A stable, shareable, printable short link the restaurant can put on a flyer |
| `/opengraph-image` | Build-time `ImageResponse` | Per-route, from one composer (§10) |
| `/sitemap.ts`, `/robots.ts` | Static | |

**The entire site is statically rendered.** No database, no request-time data, nothing
personalised. Every route is a file on a CDN, which is how the `spec-design.md` §12 LCP
budget is met on São Gonçalo mobile data.

### 8.1 SEO — the actual point of the project

The most valuable page is `/cardapio`, and the target queries are
`rodízio japonês são gonçalo preço`, `oishi cozinha japonesa cardápio`,
`rodízio sushi centro são gonçalo`.

- **Real text, real headings, real lists.** The prices are `<span>`s in the DOM, not pixels
  in a JPEG. This alone is the single biggest improvement over the status quo.
- **`LocalBusiness` / `Restaurant` JSON-LD** — `address`, `telephone`, `openingHours`,
  `servesCuisine`, `priceRange`, `sameAs` (Instagram), `hasMenu`.
  **`openingHours` is emitted only when Q4 is answered** — an invented `openingHours` is a
  machine-readable lie that sends people to a closed door.
- **`Menu` / `MenuSection` / `MenuItem` JSON-LD** from `content/rodizios.ts`.
- One JSON-LD builder: `src/lib/structured-data.ts`. Nothing else emits a `<script
  type="application/ld+json">`.
- `src/lib/seo.ts` is the **one** metadata builder. Every `generateMetadata` calls it — no
  bare `{ title }` anywhere.

---

## 9. Repo layout

```
src/app/
  layout.tsx                <html lang="pt-BR">, Archivo + Shippori Mincho, Lenis, JSON-LD
  globals.css               spec-design.md §4.1 tokens + @theme
  page.tsx                  /  — hero, intro, waste chapter, rodízios, delivery, contato
  cardapio/page.tsx
  rodizio/[slug]/page.tsx   generateStaticParams → 3 chapters
  reserva/page.tsx
  contato/page.tsx
  delivery/route.ts         308 → anota.ai
  icon.tsx, apple-icon.tsx  from marca-paths.ts
  opengraph-image.tsx       from lib/og-image.tsx
  sitemap.ts, robots.ts

src/components/
  marca/
    selo.tsx                味 at its four scales — spec-design.md §3.1
    disco.tsx               the hinomaru, incl. the M3 scaling transition
    marca-item.tsx          the kanji + word nav lockup — §6.3
    cabecalho.tsx           nav
    rodape.tsx              the red CONTATO band — §11.7
  tipografia/
    manchete.tsx            positioned-word headline — §6.5
    coluna-vertical.tsx     writing-mode: vertical-rl — M4
  cena/
    recorte-heroi.tsx       M1 — pinned, scrubbed clip-path
    pilha.tsx               M2 — the differential-depth stack
    painel-midia.tsx        a graded photo panel, tier-aware
    tinta.tsx               the ink transition mask — §7.6
  cardapio/
    par-preco.tsx           the two-price component — §5. THE component.
    contador-preco.tsx      M5
    lista-itens.tsx
    marquise-condicao.tsx   the verbatim condition, marquee
  reserva/
    formulario-reserva.tsx  'use client', RHF + Zod → WhatsApp
  ui/                       shadcn, vendored + SOURCES.md
  bits/                     React Bits, vendored + SOURCES.md
  magic/                    Magic UI, vendored + SOURCES.md
  21st/                     21st.dev blocks, vendored + SOURCES.md

src/lib/
  conteudo/                 tipos.ts, fonte.ts, fonte.local.ts, esquemas.ts   ← the seam
  contato/
    whatsapp.ts             the ONE wa.me builder — §6.2
    delivery.ts             the ONE anota.ai link
  marca-paths.ts            味 + disc as SVG paths — the only source for the mark
  tinta-paths.ts            the traced ink-blot paths — §7.6
  formato.ts                formatarBRL, formatarTelefone, formatarData — the ONE formatter
  seo.ts                    the ONE metadata builder
  structured-data.ts        the ONE JSON-LD builder
  og-image.tsx              the ONE OG composer
  motion/
    usar-lenis.ts
    usar-scrub.ts           the ScrollTrigger wrapper — reduced-motion aware by default
  site-config.ts            SITE_URL, normalised once

src/content/
  restaurante.ts            §2 of data-inventory.md
  rodizios.ts               §4 + §5 — the three menus, four price tiers
  campanha.ts               §8 — the waste statistics, verbatim
  fotos.ts                  GENERATED by normalizar-imagens.ts — do not hand-edit

src/assets/
  shippori-mincho-subset.woff2   ≤ 40 KB, ~30 glyphs (spec-design.md §6.4)
  archivo-*.ttf                  statics for Satori/ImageResponse

scripts/
  normalizar-imagens.ts     sharp: triage + grade + AVIF/WebP → public/fotos + content/fotos.ts
  normalizar-marca.ts       background-removal for the wordmark PNG
  subset-fonte.mts          pyftsubset wrapper, driven by the §6.4 glyph list
  verificar-conteudo.mts    Zod validation of content/ — runs in build (§5.3)
  verificar.mts             Lighthouse + Playwright/axe + reduced-motion + contrast (§12)

docs/
  spec-brand.md  spec-design.md  spec-architecture.md  data-inventory.md  tasks/
references/                 evidence; *.mov gitignored, extracted frames committed
```

### 9.1 The single-source rules

Each exists because two sources of the same string is how a sibling project shipped a bug:

| One thing | One place |
|---|---|
| The `wa.me` URL | `lib/contato/whatsapp.ts` |
| The delivery URL | `lib/contato/delivery.ts` |
| `味` and the disc | `lib/marca-paths.ts` |
| Currency / phone / date formatting | `lib/formato.ts` |
| Page metadata | `lib/seo.ts` |
| JSON-LD | `lib/structured-data.ts` |
| `SITE_URL` | `lib/site-config.ts` (trailing slash stripped once; empty counts as unset) |
| Menu and price data | `content/` behind `lib/conteudo/fonte.ts` |
| The photo manifest | `content/fotos.ts`, generated — never hand-edited |

---

## 10. Repo hygiene

- **`references/*.mov` is gitignored** — `new-sushism.mov` is 853 MB. Extracted frames live
  in `references/websites/new-sushism/` (contact sheet + `frames/sec/`, `frames/ranges/`).
  Scene spec: `docs/spec-reference-scenes.md`.
- **`references/instagram/*` is committed** — it is the evidence `data-inventory.md` cites,
  and the input to the image pipeline.
- `public/fotos/` is **generated**, and committed (so a deploy never depends on `sharp`
  running in CI). Regenerated by script, never hand-edited.
- **`.env.example` lists every variable the moment code reads it.** Today that is
  `NEXT_PUBLIC_SITE_URL` and nothing else.
- **Language:** customer-facing copy is **pt-BR**. Code, comments, commit messages and
  everything under `docs/` is **English**, except domain terms with no useful translation —
  `rodízio`, `sushibah`, `temaki`, `uramaki`, `harumaki`, `hinomaru`, `sem desperdício`.

---

## 11. Security and privacy

Small surface, deliberately.

- **No database, no auth, no sessions, no cookies** in v1. Nothing to breach.
- **The reservation form never transmits data to us** — it opens WhatsApp on the user's own
  device. The name and phone go from the customer to the restaurant directly. No PII at
  rest, anywhere, which is the strongest possible LGPD position.
- **No third-party scripts.** No Google Fonts request at runtime (self-hosted via
  `next/font`), no map iframe (§6.4), no chat widget, no pixel. Analytics, if wanted, is
  **Vercel Analytics** — cookieless — and nothing else.
- `rel="noopener"` on every `target="_blank"`.
- A strict CSP set in `next.config.ts`; `unsafe-inline` for styles only if Next requires it,
  with a comment saying why.

---

## 12. Non-functional requirements

Budgets and how they are measured live in `spec-design.md` §12 (LCP ≤ 2.5s, CLS ≤ 0.05,
JS ≤ 210 KB on `/`, 0 serious axe violations, reduced-motion parity). They are enforced by
`scripts/verificar.mts`, which fails the build on regression.

Additional, architectural:

| Requirement | Criterion |
|---|---|
| Build | `pnpm build` completes with **0 TypeScript errors, 0 ESLint errors** |
| Content integrity | `verificar-conteudo.mts` passes every rule in §5.3 |
| Static output | Every route in §8 emits as static; **no route becomes dynamic by accident** — asserted against the build manifest |
| No orphan facts | No user-facing string literal in `src/components/` matching `/R\$|\(21\)|Sá Carvalho|18h30/` — grep assertion in CI |
| Offline-ish | Every route renders fully with JS disabled: prices, menu, address, hours, and all three CTA links work as plain `<a>` |

That last one is the real accessibility test for this site. A hungry customer on a bad
connection in São Gonçalo must get the price and the WhatsApp link even if GSAP never
loads.

---

## 13. Alternatives considered and rejected

| Option | Why not |
|---|---|
| **Payload/Sanity CMS in v1** | 250 MB + a database + auth, for content that changed once this year. §7. The seam makes it reversible. |
| **Reservation → Postgres + admin** | Nobody opens an admin panel during dinner service. WhatsApp is where reservations already live. §6.3. Revisit in Fase 1 if asked. |
| **Reservation → email (Resend)** | Same problem as a database plus a deliverability surface, and the restaurant does not run an inbox (`data-inventory.md` §2). |
| **Building our own delivery/cart** | anota.ai is live, maintained and paid for. Rebuilding it is a second product with a payments surface. §2. |
| **Framer Motion only, no GSAP** | Pinning + scrubbed `clip-path` (M1) is ScrollTrigger's job. Splitting scroll across two libraries desyncs. §4.1. |
| **Three.js / WebGL hero** | +150 KB against a 210 KB budget, for an effect the reference does not use. The reference's hero is a video and a `clip-path`. Rejected in `spec-design.md` §8.1. |
| **Copying the reference's photo-led design** | We have no photographs that survive it — measured, `spec-design.md` §2. Type-led instead. |
| **Copying Sushi da Praça's reservation rules** | They are a different restaurant's policy. `data-inventory.md` §7. |
| **A one-page site** | `/cardapio` and `/rodizio/[slug]` are the SEO surface. Collapsing them into `/` throws away the project's main commercial win. §8.1. |
| **i18n / an `en` locale** | The audience is São Gonçalo. Cost with no reader. |

---

## 14. Open questions that block code

From `data-inventory.md` §11. Three block launch, one blocks a design ceiling:

1. **Q3 — the phone number** (`2605` vs `2606`). Blocks every CTA. Contained to
   `lib/contato/whatsapp.ts` (§6.2) so the site can be built around it, but it cannot ship
   unresolved.
2. **Q4 — days and hours.** Blocks the hours module, `openingHours` JSON-LD (§8.1), the
   "aberto agora" state, and the reservation time slots. **The JSON-LD is omitted rather
   than guessed.**
3. **Q8 — the reservation policy.** Blocks the rules panel and the party-size bounds. The
   form ships without it; the panel renders `[VERIFICAR]`.
4. **Q11 — the domain.** Blocks canonical URLs and OG absolute paths. Fase 0 ships on a
   Vercel URL; `lib/site-config.ts` is the one place it changes.

**Q12 (can anyone shoot photographs?)** blocks no code — it decides whether the site ever
leaves its typographic mode. `spec-design.md` §10.4 is the brief; §10.5 lists the four
slots that upgrade with a one-prop change.

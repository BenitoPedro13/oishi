# Oishi Cozinha Japonesa — Brand Spec

> What Oishi is, what the evidence actually supports, and the voice the site speaks in.
> Facts live in `data-inventory.md`; this file decides what to *do* with them.
> The visual system is `spec-design.md`; the platform is `spec-architecture.md`.

---

## 1. Brand audit — what already exists

Oishi has **no website**. Its entire web presence is an Instagram account with 17K
followers, a WhatsApp number, and a listing on `pedido.anota.ai`. That is the starting
line, and it is a good one: 17K followers is real distribution that currently terminates
in a link-in-bio.

### 1.1 What the brand already owns (keep, all of it)

| Asset | Evidence | Verdict |
|---|---|---|
| The name `Oishi` | everywhere | **Keep.** 美味しい — "delicious". Says the promise in the name. |
| **味** in the *hinomaru* | logo, every flyer, the seal on the plates | **Keep — and promote.** This is the single strongest asset. See §1.2. |
| Red / black / white | logo, every flyer, every graphic | **Keep.** Already a disciplined three-colour system. |
| The two ink fish | logo | **Keep, carefully.** See §1.3. |
| Brush-drawn Latin lettering | the `Oishi` wordmark, flyer headlines | **Keep in the mark, retire everywhere else.** See §4. |
| The plate seal | small `Oishi` disc flags planted in the food, in ~8 photos | **Keep.** Unintentionally charming and completely theirs. |
| `A melhor comida japonesa de SG` | bio | **Refine.** See §5.3. |
| **Campanha contra o desperdício** | pricing flyer, statistics post | **Keep, and build the entire site on it.** See §2. |

### 1.2 The kanji is the mark

The logo's disc contains **味** (*aji*, "flavour") — verified by crop, not assumed. That is
not decoration; it is the name translated. `Oishi` (delicious) and `味` (flavour) are the
same idea in two scripts, and the restaurant put them in the same circle years ago without
anyone writing it down.

**`味` is the site's mark**: the favicon, the loader, the scroll-to-top, the section seal,
the OG card. It works at 16px where the full lockup does not. Everything in
`spec-design.md` §3.1 follows from this.

### 1.3 The fish

The logo's two ink fish are drawn well and are genuinely distinctive — but the upper one
is a **catfish** (barbels, elongated body), which is not a sushi fish, and the lower one
reads as a **koi**, which is an ornamental fish nobody eats. This is almost certainly
clip-art assembled by whoever made the logo.

**Decision: keep them in the logo, do not extend them into the design system.** They stay
where they are — inside the supplied mark. The site does not build a fish motif, does not
redraw them larger, and does not use them as section ornaments. If a line-art motif is
wanted, the brush strokes of `味` are the honest source. Flag to the owner, do not act
unilaterally: they may love the fish. Logged as a recommendation, not a change.

### 1.4 What is actively hurting them

- **Every price and menu lives inside a JPEG.** Uncrawlable, unsearchable, unreadable on a
  phone, unupdatable without a designer. Someone searching *"rodízio japonês São Gonçalo
  preço"* cannot find Oishi's prices — this is the most expensive single fact in the audit.
- **Reservations have no channel.** The one reservation post says *"reserva somente até às
  19h"* with a phone number. Every reservation costs a phone call at the busiest hour.
- **The waste campaign — their best idea — is buried** in a flyer that scrolled past nine
  months ago. No page states it. See §2.
- **Six different display typefaces** across the flyers (a brush face, a blackletter-ish
  face, an outlined face, an inline face, a Bebas-ish sans, a script) — plus gold, orange,
  green and teal accents that contradict the red/black/white system the logo defines.
- **Stock photography of people who are not their customers** (the couple in the Dia dos
  Namorados post). Cheap, and the site must not repeat it.

---

## 2. Positioning — the thesis

> ### `Coma tudo o que pedir. Pague menos por isso.`

Oishi charges you **R$ 20 less per person** on every rodízio tier if your table finishes
what it takes. That is not a promotion; it is a stance, and no competitor in São Gonçalo
has anything like it.

Every other sushi restaurant's website says the same three things — *tradição*,
*ingredientes frescos*, *experiência única*. Oishi can say something none of them can say,
that is **true, specific, checkable and worth R$ 20**:

| | |
|---|---|
| **The thesis** | Sushi rodízio wastes food. Ours costs less when it doesn't. |
| **The promise** | You order what you'll eat, you eat what you order, and you pay the lower price. |
| **The proof** | Four tiers, two prices each, printed. `R$ 74,90` → `R$ 54,90`. |
| **The condition** | *Todos da mesa.* It's a table sport, not an individual discount. |

This is the site's spine. `spec-design.md` §11.3 makes the two-price structure the largest
typographic moment on the page — bigger than the hero, because it is the one thing
worth scrolling for.

### 2.1 Why this works better than "the best sushi in SG"

`A melhor comida japonesa de SG` is a claim with nothing behind it — the same sentence
every competitor writes. `R$ 74,90 / R$ 54,90` is a claim you can **verify at the till**.
The repo rule (`AGENTS.md` §0) is *no superlatives without a number behind them*; the
waste campaign is nothing *but* numbers.

The quality claim doesn't disappear — it stops being asserted and starts being
demonstrated, by the menu, the prices, and the review.

### 2.2 Audience

One audience, three intents, in the order they matter commercially:

| Intent | Who | What they need in under 10 seconds | Terminates in |
|---|---|---|---|
| **Vou pedir agora** | at home, hungry, phone | Is it open? Deliver here? | `pedido.anota.ai` |
| **Vou jantar aí** | planning tonight or the weekend | How much is the rodízio? What's in it? Where is it? Open when? | Reservation, or WhatsApp |
| **Vou comemorar** | birthday, group of 8+ | Can I book? For how many? | Reservation form |

Every one of the three is answered above the fold on a phone, or the site failed.
Cinematic scroll is what they get *after* being answered, never instead.

### 2.3 What this is not

- **Not fine dining.** Oishi is a neighbourhood rodízio in Centro, São Gonçalo — plates
  are generous and cheerfully garnished, and the *maneki-neko* is on the shelf. A site
  that pretends to be a 12-seat omakase counter in Ebisu will be recognised as a lie by
  everyone who has eaten there. Ambitious about craft, honest about what it is.
- **Not a *sushi da praça* clone.** `references/websites/menuonline-…png` is the
  functional bar to clear, not the aesthetic one.
- **Same motion language as new-sushism, different facts.** We copy its layout, timing, and
  scroll mechanics literally (`spec-reference-scenes.md`); Oishi content, `--hinomaru`
  tokens, and hybrid photo tiers replace Tokyo artisans and reference footage. Scene 9
  (two-price table) is the one screen the reference does not have.

---

## 3. Voice

**Portuguese a São Gonçalo restaurant owner would actually speak.** Warm, direct, a little
proud, never corporate and never poetic-for-its-own-sake.

| Do | Don't |
|---|---|
| `Rodízio com sashimi, ilimitado — R$ 139,90. R$ 119,90 se a mesa não desperdiçar.` | `Uma experiência gastronômica inesquecível` |
| `Aberto das 18h30 às 23h40.` | `Venha nos visitar e descubra` |
| `A gente cobra menos de quem não desperdiça.` | `Comprometidos com a sustentabilidade` |
| `Fala com a gente no WhatsApp` | `Entre em contato conosco` |
| `R. Sá Carvalho, 40 — Centro` | `Localizado no coração da cidade` |

**Rules**

1. **pt-BR everywhere in customer-facing copy.** No English UI words where Portuguese
   exists: `Cardápio` not `Menu`, `Reserva` not `Booking`, `Contato` not `Contact`.
   `Delivery` and `Rodízio` stay — Brazilians say those.
2. **Japanese is a texture, not a language.** The site never asks a customer to read
   Japanese for meaning. Kanji appear as small typographic marks beside their Portuguese
   equivalent (`spec-design.md` §6.4). Every one must be *correct* — decorative is fine,
   wrong is not.
3. **Numbers in Brazilian format.** `R$ 74,90` (comma), `18h30`, `(21) 2605-9536`,
   `1/3`, `58%`.
4. **First person plural.** `A gente` / `nós`, not "o Oishi oferece". This is a family
   restaurant, and the copy should sound like a person is behind it.
5. **Never invent a fact.** If `data-inventory.md` doesn't have it, the string is
   `[VERIFICAR: …]` and the component renders its honest-absence state — never a
   plausible placeholder. A wrong opening hour sends someone across town for nothing.
6. **No exclamation marks in body copy.** One is permitted, in the waste-campaign CTA.

### 3.1 Strings that are already decided

| Where | String |
|---|---|
| Tagline (hero) | `Coma tudo o que pedir.` / `Pague menos por isso.` |
| Waste-campaign name | `Campanha contra o desperdício` (their words, verbatim) |
| Zero-waste price label | `sem desperdício` |
| Campaign condition | verbatim from `data-inventory.md` §4 — never paraphrased |
| Delivery CTA | `Pedir no delivery` |
| WhatsApp CTA | `Chamar no WhatsApp` |
| Reservation CTA | `Reservar mesa` |
| Menu nav | `Cardápio` |
| Honest-absence, hours | `Horário confirmado: 18h30 às 23h40.` + `[VERIFICAR: dias da semana]` |

---

## 4. Keep / refine / retire

| Element | Verdict | Note |
|---|---|---|
| `味` in the disc | **Keep — promote to primary mark** | §1.2 |
| Red / black / white | **Keep** | Sampled, not guessed: `spec-design.md` §4 |
| The `Oishi` brush wordmark | **Keep, in the mark only** | Never re-set in a substitute typeface. Q1. |
| The two ink fish | **Keep in the mark, don't extend** | §1.3 |
| The plate seal flags | **Keep** | Photograph them deliberately (§10.4 brief) |
| Six display typefaces | **Retire** | One family, one JP face: `spec-design.md` §6 |
| Gold / orange / green / teal accents | **Retire** | No second accent colour |
| Stock photos of models | **Retire** | Never on the site |
| `A melhor comida japonesa de SG` | **Refine** | Demote from claim to a warm aside. The lead is the waste campaign. |
| Menus and prices as JPEGs | **Retire** | Real text, real HTML, crawlable — §1.4 |
| Instagram as the only channel | **Refine** | Instagram becomes the *feed*; the site becomes the *record* |

---

## 5. Things that must not break

1. **Never invent a fact about their business.** Not a price, not an hour, not a day of
   the week, not a menu item, not the city. `[VERIFICAR: …]` inline, and an honest-absence
   state on screen. A wrong hour is worse than a missing one.
2. **The waste campaign is the thesis, not a section.** If a redesign buries the two-price
   structure below the fold, the redesign is wrong.
3. **Every path terminates in a channel Oishi already runs** — WhatsApp, `pedido.anota.ai`,
   or the phone. No cart, no checkout, no payments (`spec-architecture.md` §2).
4. **One phone number, from one builder.** `lib/contato/whatsapp.ts` is the only place a
   `wa.me` URL is composed (`spec-architecture.md` §6.2). Until Q3 is answered, that
   builder is also the only place the 2605/2606 conflict has to be resolved.
5. **Menu item names are reproduced verbatim** until Q6 is answered — `SUSHIBAH`,
   `CRYSPY`, `PORCAO` included.
6. **`味` is drawn from the logo, never typed.** It ships as SVG paths
   (`spec-design.md` §3.3), so the mark cannot drift when a font fails to load.
7. **No stock photography, ever.** If there is no real photo, the design uses type
   (`spec-design.md` §2.3).
8. **Japanese must be correct.** Every kanji on the site is listed in `spec-design.md`
   §6.4 with its reading and gloss, and reviewed as a set.
9. **A named private individual's review is not published without permission** (Q10).
10. **Sushi da Praça's reservation rules are never copied into Oishi's site.** The HTML
    reference is a UI reference only (`data-inventory.md` §7).

---

## 6. Open questions

All twelve live in `data-inventory.md` §11 with an owner each. **Three block launch:**

1. **Q3 — the phone number.** `2605` vs `2606`. Every CTA depends on it. One WhatsApp
   message to the owner resolves it.
2. **Q4 — the days and hours.** Blocks the hours module, the JSON-LD, the reservation
   slots, and the "aberto agora" state. Four facts currently unknown.
3. **Q8 — the reservation policy.** Blocks the form's rules panel and its validation.
   Without it the form can still ship (it hands off to WhatsApp), but it cannot state a
   minimum party size or a cut-off.

**Q12 — can anyone shoot photographs?** — does not block launch but decides the site's
ceiling. `spec-design.md` §2.3 is the design that works without it; §10.4 is the brief
that would raise it.

Do not silently assume answers. Fase 0 exists partly to extract them.

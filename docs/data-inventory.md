# Oishi — Data Inventory

> Every fact the site is allowed to state, its evidence file, and its confidence.
> **If a fact is not in this file, it may not appear on the site.** Write
> `[VERIFICAR: what to ask and who to ask]` instead.
>
> This file is the antidote to the failure mode that costs the most: a wrong price, a
> wrong phone number or a wrong opening hour published under the restaurant's name.
> Confidence levels: **CONFIRMED** (two or more independent sources agree, or a
> machine-readable source like the WhatsApp deep link), **SINGLE-SOURCE** (one piece of
> evidence, no contradiction), **CONFLICTED** (sources disagree — must be resolved before
> launch), **MISSING** (needed by the design, not present in any reference).

---

## 1. Identity

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Trading name | `Oishi Cozinha Japonesa` | `instagram/intagram-bio.md` L2 | CONFIRMED |
| Short name | `Oishi` | logo, all flyers | CONFIRMED |
| Category | Japanese Restaurant | bio L6 | CONFIRMED |
| Instagram handle | `@oishicozinhajaponesa` | bio L1, `641374021…jpg` | CONFIRMED |
| Instagram followers | 17K (267 posts, 95 following) | bio L3–5 | SINGLE-SOURCE (snapshot, decays — do **not** put a follower count on the site) |
| Logo kanji | **味** (*aji*, "flavour") inside the *hinomaru* disc | `instagram/logo.jpg`, verified by crop | CONFIRMED |
| Legal entity / CNPJ | — | — | MISSING — needed for the footer and for structured data |

### 1.1 The logo

`references/instagram/logo.jpg`, 1080×1080. Composition, top to bottom:

- Two hand-drawn line-art fish (a catfish/*bagre*-like fish upper right with barbels, a koi
  lower left) in fine black ink stroke on white.
- A red *hinomaru* disc, **vertically graduated** — sampled with ffmpeg: `#9A1114` at the
  top through `#C6151B` mid to `#E71B23` at the bottom.
- The kanji **味** brush-drawn in black with a white outline, centred on the disc.
- The wordmark `Oishi` in a black brush-styled Latin face with a red keyline and a white
  inner outline, overlapping the disc.

**The supplied logo is a raster JPEG with a white background.** No vector exists in the
references. See open question Q1.

---

## 2. Contact

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Address (street) | `R. Sá Carvalho, 40 — Centro` | bio L8; flyers footer reads `R. SÁ CARVALHO - CENTRO` without the number | CONFIRMED (street), SINGLE-SOURCE (number 40) |
| City / UF | São Gonçalo, RJ — **inferred** | bio says "de SG"; area code 21; `Centro` | **INFERRED — must confirm.** See Q2 |
| CEP | — | — | MISSING |
| Phone / WhatsApp | `(21) 2605-9536` | WhatsApp deep link `phone=%2B552126059536` (bio L11); `641374021…jpg`; `362261672…jpg` | **CONFIRMED** — three sources incl. a machine-readable link |
| Phone on the rodízio flyers | `(21) 2606-9536` | `rodizio/com-sashimi.jpg`, `rodizio/chisai.jpg` footer | **CONFLICTED** — see Q3 |
| WhatsApp URL | `https://api.whatsapp.com/send/?phone=%2B552126059536` | bio L11 | CONFIRMED |
| Delivery platform | `https://pedido.anota.ai/loja/oishi-cozinha-japonesa-1` | bio L12 | CONFIRMED |
| E-mail | — | — | MISSING |

**Note on the number shape.** `21 2605-9536` is an eight-digit **landline**, not a mobile
(no leading `9`). WhatsApp Business runs on landlines, and the bio's own deep link uses it,
so `wa.me/552126059536` (12 digits) is correct. Do not "fix" it by inserting a 9.

---

## 3. Opening hours

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Stated hours | `18h30 às 23h40` | bio L9 | SINGLE-SOURCE |
| Contradicting post | `ABERTURA PARA ATENDIMENTO PRESENCIAL E RETIRADA DELIVERY ÀS 17H` | `641374021…jpg` (Dia dos Namorados post) | **CONFLICTED** — probably a one-off holiday opening, but unproven |
| Per-weekday breakdown | — | — | **MISSING** — the bio gives one range with no days attached |
| Closing day | — | — | MISSING |

**This is the single biggest content gap.** The bio does not say *which days*. A site that
renders "Seg–Dom, 18h30–23h40" would be inventing four facts. Until Q4 is answered, the
hours module ships in its honest form (§4.3 of `spec-design.md`): the one range that is
actually sourced, with no weekday grid.

---

## 4. Rodízio — prices

Source: `references/instagram/rodizio/precos-campanha-sem-disperdicio.jpg`. All four tiers
carry two prices: the standard price, and a lower price **if the table wastes no food**.

| Tier | Standard | Zero-waste | Confidence |
|---|---|---|---|
| Rodízio Chisai | `R$ 74,90` | `R$ 54,90` | SINGLE-SOURCE |
| Rodízio sem sashimi | `R$ 94,90` | `R$ 74,90` | SINGLE-SOURCE |
| Rodízio com sashimi, com limite | `R$ 112,90` | `R$ 92,90` | SINGLE-SOURCE |
| Rodízio com sashimi, ilimitado | `R$ 139,90` | `R$ 119,90` | SINGLE-SOURCE |

Campaign name, verbatim: **`CAMPANHA CONTRA O DESPERDÍCIO`**.
Condition, verbatim: **`OBS: PARA OBTER O BENEFÍCIO DE DESPERDÍCIO ZERO É ESSENCIAL QUE
TODOS DA MESA NÃO DESPERDICEM.`**

**Four price tiers, three menus.** The `com sashimi` menu serves both the *com limite* and
the *ilimitado* tiers; the flyers do not say what the "limite" is. See Q5.

**Prices decay.** Every price on the site renders from one content module with a
`verificadoEm` date (`spec-architecture.md` §5.2). No price is typed into a component.

---

## 5. Rodízio — menus

Transcribed from the three flyer images. Item names are kept **exactly as written**,
including the restaurant's own spellings (`SUSHIBAH`, `CRYSPY`, `PORCAO`, `MISSOSHIRU`) —
see the note at the end of this section.

### 5.1 Rodízio Chisai — `rodizio/chisai.jpg`

**Cozinha**
- Harumaki: legumes · frango catupiry · camarão catupiry · provolone
- Yakissoba: legumes · frango · camarão · carne
- Batata frita
- Sobremesas: harumaki romeu e julieta · banana (mista, leite cond., chocolate) ·
  rolinho de chocolate · rolinho doce de leite

**Sushibah**
- Uramaki: california (manga, pepino, kani) · salmão skin (pele salmão grelhado) ·
  filadelfia (salmão, cebolinha, cheese) · ebi roll · pimenta biquinho · cryspy de couve ·
  cryspy de batata doce · cryspy alho poró
- Makimono: tekkamaki atum · kappamaki pepino · filadelfia (salmão, cebolinha, cheese) ·
  shakemaki salmão · kanimaki kani
- Makimono hot: filadelfia (salmão, cheese, ceb) · ebitem (camarão, cheese, ceb) ·
  skin hot (salmão, pele, grelhado) · haru hot (salmão, cheese, ceb)

### 5.2 Rodízio sem sashimi — `rodizio/sem-sashimi.png`

Everything in Chisai, **plus**:

- **Tempura**: peixe · cebola
- **Temaki**: atum com cebolinha · salmão com cebolinha · filadelfia (salmão, cheese,
  cebolinha) · skin pele (salmão grelhado) · hot filadelfia · kani
- **Sushi**: kani · atum · salmão · peixe branco · polvo · salmão skin pele · camarão ·
  salmão cheese

### 5.3 Rodízio com sashimi — `rodizio/com-sashimi.jpg`

Everything in *sem sashimi*, **plus** — and with these differences:

- **Missoshiru** and **Yasai itame** appear (Chisai and *sem sashimi* have neither)
- **Tempura** expands: peixe · camarão · cebola · lula
- **Espeto — grelhado**: frango · carne · salmão · peixe branco
- **Porcao**: camarão · lula
- **Sashimi**: kani · atum · salmão · peixe branco · ice · salmão com gergelim ·
  atum-pre · hot especial · haddock · polvo
- **Sobremesas** on this flyer omit `harumaki romeu e julieta` — the other two list it.
  Treat as a flyer inconsistency, not a fact. See Q6.

**Item names are reproduced verbatim, not corrected.** `SUSHIBAH`, `CRYSPY`, `PORCAO`,
`MISSOSHIRU`, `ATUM-PRE` are the restaurant's own spellings. Silently "fixing" them to
`sushi bar` / `crispy` / `porção` / *missoshiru* would be inventing a fact about their
menu. Ask before normalising (Q6).

---

## 6. Menu items NOT in the references

**MISSING — and load-bearing.** The references contain the three rodízio menus and nothing
else. There is **no à la carte menu, no delivery menu, no drinks list, and no à la carte
price** anywhere in `references/`.

The Instagram photos show many dishes that appear on none of the three rodízio flyers
(grilled fish on a hot plate, breaded shrimp, sashimi boats, a *combinado* platter). The
site therefore **cannot** claim to be a complete menu. `/cardapio` presents the rodízios —
which are complete and priced — and routes every à la carte / delivery question to
`pedido.anota.ai`, which is the real, live, maintained menu. See Q7.

---

## 7. Reservations

| Fact | Value | Source | Confidence |
|---|---|---|---|
| Reservations exist | Yes — by phone/WhatsApp | `641374021…jpg` | CONFIRMED |
| Cut-off rule (one dated post) | `RESERVA SOMENTE ATÉ ÀS 19H APÓS SOMENTE POR ORDEM DE CHEGADA` | `641374021…jpg` | SINGLE-SOURCE, **and specific to Dia dos Namorados** — not proven to be the standing policy |
| Minimum party size | — | — | MISSING |
| Maximum party size | — | — | MISSING |
| Late tolerance | — | — | MISSING |
| Birthday policy | — | — | MISSING |
| Deposit / *couvert* | — | — | MISSING |

`references/websites/reservation-form-reference.html` is **Sushi da Praça's** form, not
Oishi's. Its rules panel (15-minute tolerance, 4–30 people, birthday freebie, per-unit
hours) is **another restaurant's policy** and must not be copied into Oishi's site as
though it were theirs. The file is a *UI* reference — field set, layout, shadcn primitives
— and nothing more. See Q8.

---

## 8. The waste campaign — brand copy

Verbatim from `references/instagram/625019815_18304650403287076_42398012323591204_n.jpg`:

```
1 em cada 8 pessoas passa fome no mundo.
1/3 de todo alimento produzido no mundo é desperdiçado.
58% do lixo brasileiro é composto por comida.
41 mil toneladas de comida são desperdiçados por ano.
```

These are **Oishi's own uncited claims**, republished from their Instagram. The site may
quote them as Oishi's campaign copy. It may **not** present them as sourced statistics
without a citation. See Q9.

---

## 9. Social proof

One Google review is legible in
`references/instagram/637259511_18445808983106042_7304125504486438719_n.jpg`, from
**Daniella Pereira Pinheiro Martins** (5 stars): *"Melhor sushi que eu já comi em toda
minha vida… Tudo muito bem preparado, o sabor é perfeito e vc sente a qualidade excelente
dos produtos. O atendimento é maravilhoso, com funcionários simpáticos e dispostos."*

Republished by Oishi on their own feed. Using a named private individual's review on a
commercial website is a different act from Oishi resharing it on Instagram. **Do not
publish it without permission** — or aggregate it (Google rating + review count) instead,
which needs the Google Business Profile. See Q10.

---

## 10. Interior and atmosphere — usable, real details

Observed in the photo set and safe to build design language on:

- A *noren* curtain printed with an **ukiyo-e bijin-ga** (three figures, red lattice
  ground) — `626831543…jpg`
- A **maneki-neko** with a 招財進寶 banner — `623376903…jpg`
- A neon sign: **いらっしゃいませ** over `seja bem-vindo` and `Oishi` — `652809942…webp`
- Dark slate plates, bamboo mats, wooden boats, black tablecloths
- Street frontage at dusk, power lines, low-rise buildings — `619003730…jpg`

There are **no photographs of the team, the sushi counter in action, or the dining room
in service** anywhere in the references. This is the constraint that shapes the whole
design (`spec-design.md` §2).

---

## 11. Open questions

Each blocks something concrete. Owner: the restaurant, unless noted.

| # | Question | Blocks |
|---|---|---|
| **Q1** | Is there a **vector** (AI/EPS/SVG/PDF) of the logo? The supplied file is a 1080px JPEG on white. | Header mark, favicon, OG card, the `味` seal. Workaround in `spec-design.md` §3.3. |
| **Q2** | City and **CEP**. Is it São Gonçalo, RJ? | Footer, `LocalBusiness` JSON-LD, the map, "como chegar". Currently inferred. |
| **Q3** | **`2605-9536` or `2606-9536`?** The WhatsApp link says 2605; two flyers say 2606. | Every CTA on the site. **Highest-severity item in this file** — a wrong number means zero calls. |
| **Q4** | **Which days, and what hours per day?** Is 18h30–23h40 every day? Is there a closing day? Does the 17h opening apply generally? | The hours module, `openingHours` JSON-LD, the "aberto agora" state, reservation time slots. |
| **Q5** | On the *com sashimi com limite* tier, **what is the limit?** (N pieces? one round?) | The price table can render without it; the tier is unexplainable to a customer until answered. |
| **Q6** | May we correct the flyer spellings (`SUSHIBAH`→`sushi bar`, `CRYSPY`→`crispy`, `PORCAO`→`porção`)? And is `harumaki romeu e julieta` on the *com sashimi* rodízio? | Menu copy. Default until answered: **reproduce verbatim**. |
| **Q7** | Is there an **à la carte menu with prices**? Can we export the anota.ai catalogue? | Whether `/cardapio` is the whole menu or only the rodízios. |
| **Q8** | What is the **standing** reservation policy — min/max party, cut-off, tolerance, large groups? | The reservation form's rules panel and its validation. Sushi da Praça's rules may not be used. |
| **Q9** | Sources for the four waste statistics? | Whether they render as cited figures or as quoted campaign copy. |
| **Q10** | Do we have the **Google Business Profile**, and permission to quote named reviews? | The social-proof module, aggregate rating JSON-LD. |
| **Q11** | Domain name, and DNS/registrar access. | Production launch; canonical URLs; OG tags. Fase 0 ships on a Vercel URL. |
| **Q12** | Can someone **shoot 10–15 photographs** to brief (`spec-design.md` §10.4)? | Whether the site ever gets a genuinely cinematic full-bleed hero, or stays in its typographic mode permanently. |

---

## 12. How to use this file

1. **Before writing any user-facing string**, check it here.
2. **When a question is answered**, update the row, change the confidence, delete the
   `[VERIFICAR]` from the code, and note the date and who answered.
3. **When a price or hour changes**, this file changes first, then `content/`.
4. Never let a value exist only in a component. `content/` reads from these facts;
   components read from `content/`.

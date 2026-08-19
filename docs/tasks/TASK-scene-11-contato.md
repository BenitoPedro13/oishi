# TASK — Scene 11: contact band on homepage

> Per `AGENTS.md` §1. Evidence: `docs/spec-scene-footer.md` §"Scene 11 (revised)" +
> "Gap diagnosis" (items 2–4). Order picked by user: lowest-risk scene first.

---

## 1. Current scenario

`docs/spec-reference-scenes.md` Scene 11 states `Route: /, /contato` — the full-bleed red
CONTACT band should appear on both. Today it only exists at
`src/app/contato/page.tsx:54–74` (ghost `Selo`, `CONTATO` splash, `Chamar no WhatsApp` CTA
via `construirLinkWhatsapp`). `src/app/page.tsx` ends on `<RodapeSimples>`
(`src/components/marca/rodape-simples.tsx`) — a thin `border-t` utility footer with zero
resemblance to the reference's splash band. This is the gap `spec-scene-footer.md` item 2
identifies.

## 2. Planned changes

- **Extract** the red band from `contato/page.tsx:54–74` into a new shared component,
  `src/components/cena/banda-contato.tsx`, taking no props beyond an optional
  `className` — the WhatsApp message text and ghost-`Selo` treatment stay fixed (both
  pages want the same CTA copy; a generic "Vim pelo site" greeting reads fine from either
  entry point).
- **`contato/page.tsx`** renders `<BandaContato />` in place of its inline JSX — no visual
  change, just deduplication.
- **`page.tsx`** adds `<BandaContato />` as the homepage's closing scene, directly before
  `<RodapeSimples>` — the splash band is the dramatic close (Scene 11); `RodapeSimples`
  stays underneath as the site's only nav-link footer (Cardápio/Reserva/Delivery/Contato),
  which the reference doesn't need (single-page artisan site) but Oishi does (multi-route).
- **Kanji stays `連絡`, not the reference's `接点`.** `spec-scene-footer.md` correctly
  identifies the *reference's* CONTACT-band kanji as `接点`, confirmed off their own nav
  bar. But Oishi already made its own deliberate, documented content choice: `連絡` is the
  nav-lockup kanji for "Contato" (`spec-design.md` §6.3 nav lockup, §6.4 glyph allow-list
  row `連絡 | renraku | contact`), already live in `cabecalho.tsx:15` and already baked
  into the Shippori Mincho subset. Per `AGENTS.md`'s own copy policy — copy the
  reference's *structure, timing, motion*, swap *content* — the kanji is content. Adding
  `接点` here would fragment the site's own glyph system (two different words for
  "contato" in two places) for the sake of literally matching a word the reference chose
  for unrelated reasons. Not swapping it.
- **Not doing** (flagged in `spec-scene-footer.md` as optional/out-of-scope for this
  pass): the reusable outline-kanji background texture, the hanko-style seal graphic, a
  copyright line. All three are decorative, non-photo-dependent, and could close the gap
  further later — deferred, not forgotten, since the existing ghost-`Selo` treatment
  already reads as "on brand" and the doc explicitly says not to force literal
  kanji-interlocking without a deliberate confirm.

## 3. Why

Lowest-risk of the nine remaining scenes (user's own ranking): pure colour-field + type,
no photo dependency, and the component already exists and works at `/contato` — this is
a port, not new design work. Closing the homepage on the splash band matches the
reference's own structure (CONTACT is the site's final beat) instead of a generic footer.

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/components/cena/banda-contato.tsx` | new | extracted from `contato/page.tsx`, `spec-scene-footer.md` Scene 11 |
| `src/app/contato/page.tsx` | modified | inline red band replaced with `<BandaContato />` |
| `src/app/page.tsx` | modified | `<BandaContato />` added before `<RodapeSimples>` |

## 5. Verification

- `pnpm typecheck` and `pnpm lint` clean on all three touched files.
- Visual check in-browser (Chrome automation): homepage ends on the red band + WhatsApp
  CTA, `/contato` unchanged in appearance (byte-for-byte same JSX, just relocated).
- No console/hydration errors on either route.
- `construirLinkWhatsapp` remains the one `wa.me` builder — `BandaContato` imports it,
  doesn't reimplement it (`AGENTS.md` "one `wa.me` builder" rule).

**Out of scope:** outline-kanji texture, seal/stamp graphic, copyright line (see §2);
Scene 10 (media collage / AREA-divider cards) — separate task, next per user's stated
order.

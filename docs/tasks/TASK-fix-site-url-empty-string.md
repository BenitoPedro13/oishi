# TASK — Fix SITE_URL crashing the Vercel build on an empty env var

> Per `AGENTS.md` §1. Triggered by a failed Vercel production build (log pasted by user,
> commit `5565e63`, 2026-08-19).

---

## 1. Current scenario

`src/lib/site-config.ts:3` reads:

```ts
const bruto = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
```

The Vercel build log shows the build failing at `next build` → collecting `/_not-found`:

```
TypeError: Invalid URL
    at src/lib/seo.ts:12:19 — metadataBase: new URL(SITE_URL)
    code: 'ERR_INVALID_URL', input: ''
```

`input: ''` proves `process.env.NEXT_PUBLIC_SITE_URL` is set to an **empty string** in
that Vercel environment scope, not `undefined`. `??` only falls back on
`null`/`undefined` — an empty string passes straight through, so `SITE_URL` becomes `""`,
and `new URL("")` in `seo.ts:12` throws, taking the whole build down (every route imports
`seo.ts` or `site-config.ts` transitively via `layout.tsx`, `robots.ts`, `sitemap.ts`,
`structured-data.ts`).

This is a genuine code robustness gap, not solely a Vercel dashboard misconfiguration:
Vercel (and other platforms) commonly expose a declared-but-unfilled env var as `""`
rather than omitting it, so `??` alone is not a safe guard for this pattern.

## 2. Planned changes

- `src/lib/site-config.ts` — change `??` to a check that also treats an empty/whitespace
  string as unset, so the `http://localhost:3000` fallback actually applies in that case.

## 3. Why

A blank `SITE_URL` breaks `metadataBase`, `sitemap.xml`, `robots.txt`, and JSON-LD `url`
site-wide — this is the single source (`AGENTS.md` §4 "single-source rules") all four
depend on, so the fix belongs in one place, not four. Restores the intended graceful
fallback the code already documents in its own comment ("Fase 0 ships on whatever
Vercel/preview URL is live").

## 4. Affected files

| File | Change type | Notes |
|---|---|---|
| `src/lib/site-config.ts` | modified | empty-string-safe fallback |

## 5. Verification

- `pnpm exec tsc --noEmit` clean.
- `pnpm build` succeeds locally with `NEXT_PUBLIC_SITE_URL=""` explicitly set, proving the
  fallback now triggers on empty string, not just `undefined`.

**Out of scope:** whether Vercel's Production env actually has `NEXT_PUBLIC_SITE_URL` set
correctly — that's a dashboard check for the user, this fix just makes the app not crash
either way, blocked on `[VERIFICAR: Q11]` (domain) either way.

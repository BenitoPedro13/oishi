// spec-architecture.md §9.1 — the ONE place SITE_URL is normalised.
// Q11 (domain) is open; Fase 0 ships on whatever Vercel/preview URL is live.
const bruto = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_URL = bruto.replace(/\/+$/, "");

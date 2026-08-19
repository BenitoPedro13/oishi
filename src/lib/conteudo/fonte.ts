// spec-architecture.md §5.1 — THE seam. No page or component imports
// `src/content/*` or `fonte.local.ts` directly; every one imports this file.
// Swapping local TS for a CMS later means changing this file's re-export,
// not every route that reads content.
export {
  buscarCampanha,
  buscarRestaurante,
  buscarRodizio,
  buscarRodizios,
} from "./fonte.local";
export type * from "./tipos";

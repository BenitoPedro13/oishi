import { campanha } from "@/content/campanha";
import { restaurante } from "@/content/restaurante";
import { rodizios } from "@/content/rodizios";
import type { Campanha, Restaurante, Rodizio, SlugRodizio } from "./tipos";
import {
  esquemaFormularioReserva,
  esquemaRestaurante,
  esquemaRodizio,
} from "./esquemas";

// spec-architecture.md §5.1 — the concrete implementation of the seam.
// Fase 0's content is synchronous local TS, so these `async` signatures do
// nothing today — they exist so a future CMS is a change to this file only,
// never to a page or component (AGENTS.md §0, "State management").

export async function buscarRestaurante(): Promise<Restaurante> {
  return esquemaRestaurante.parse(restaurante) as Restaurante;
}

export async function buscarCampanha(): Promise<Campanha> {
  return campanha;
}

export async function buscarRodizios(): Promise<Rodizio[]> {
  return rodizios.map((r) => esquemaRodizio.parse(r) as Rodizio);
}

export async function buscarRodizio(slug: SlugRodizio): Promise<Rodizio | undefined> {
  const todos = await buscarRodizios();
  return todos.find((r) => r.slug === slug);
}

export { esquemaFormularioReserva };

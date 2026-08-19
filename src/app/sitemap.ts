import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { buscarRodizios } from "@/lib/conteudo/fonte";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rodizios = await buscarRodizios();
  const estaticas: MetadataRoute.Sitemap = ["", "/cardapio", "/reserva", "/contato"].map((caminho) => ({
    url: `${SITE_URL}${caminho}`,
    lastModified: new Date(),
  }));
  const dinamicas: MetadataRoute.Sitemap = rodizios.map((r) => ({
    url: `${SITE_URL}/rodizio/${r.slug}`,
    lastModified: r.preco.verificadoEm,
  }));
  return [...estaticas, ...dinamicas];
}

import type { Metadata } from "next";
import { SITE_URL } from "./site-config";

// THE ONE metadata builder — spec-architecture.md §9.1.
export function construirMetadata(opts: {
  titulo: string;
  descricao: string;
  caminho?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.caminho ?? ""}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${opts.titulo} · Oishi Cozinha Japonesa`,
    description: opts.descricao,
    alternates: { canonical: url },
    openGraph: {
      title: opts.titulo,
      description: opts.descricao,
      url,
      siteName: "Oishi Cozinha Japonesa",
      locale: "pt_BR",
      type: "website",
    },
  };
}

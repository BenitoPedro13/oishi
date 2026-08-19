import type { Restaurante } from "./conteudo/tipos";
import { SITE_URL } from "./site-config";
import { formatarTelefone } from "./formato";

/**
 * THE ONE JSON-LD builder — spec-architecture.md §9.1.
 *
 * `openingHours` and `address.addressLocality` are omitted on purpose while
 * Q4 and Q2 are open (data-inventory.md §11) — verification criterion #9.
 * A machine-readable wrong opening hour is worse than an absent one.
 */
export function construirRestaurantJsonLd(r: Restaurante) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.nomeCompleto,
    servesCuisine: "Japonesa",
    telephone: formatarTelefone(r.telefoneWhatsapp),
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${r.endereco.rua}, ${r.endereco.numero ?? ""} — ${r.endereco.bairro}`.trim(),
      // addressLocality / addressRegion / postalCode intentionally omitted — Q2 open
      addressCountry: "BR",
    },
    // openingHoursSpecification intentionally omitted — Q4 open
  } as const;
}

import type { Metadata } from "next";
import { Archivo, Shippori_Mincho, Geist } from "next/font/google";
import { Cabecalho } from "@/components/marca/cabecalho";
import { Loader } from "@/components/cena/loader";
import { ProvedorLenis } from "@/lib/motion/provedor-lenis";
import { ProvedorPortaLoader } from "@/lib/motion/porta-loader";
import { buscarRestaurante } from "@/lib/conteudo/fonte";
import { construirRestaurantJsonLd } from "@/lib/structured-data";
import { construirMetadata } from "@/lib/seo";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// spec-design.md §6.1 — Archivo is chosen for its `wdth` axis; without it
// the reference's type system needs two or three families instead of one.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Full Shippori Mincho for now — next/font/google only types 'latin' /
// 'latin-ext' subsets for this family (its CJK glyphs ship as one file
// regardless). The real ~30-glyph pyftsubset build (spec-design.md §6.4)
// is scripts/subset-fonte.mts, tracked as a follow-up — see
// docs/tasks/TASK-scaffold-e-fase-0.md §2.2.
const shippori = Shippori_Mincho({
  weight: "400",
  variable: "--font-shippori",
  display: "swap",
});

export const metadata: Metadata = construirMetadata({
  titulo: "Oishi Cozinha Japonesa",
  descricao:
    "Rodízio japonês em São Gonçalo. Coma tudo o que pedir, pague menos por isso — a campanha contra o desperdício do Oishi.",
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const restaurante = await buscarRestaurante();
  const jsonLd = construirRestaurantJsonLd(restaurante);

  return (
    <html
      lang="pt-BR"
      className={cn("h-full", archivo.variable, shippori.variable, "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-sumi text-washi antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProvedorPortaLoader>
          <Loader />
          <ProvedorLenis>
            <Cabecalho />
            <main>{children}</main>
          </ProvedorLenis>
        </ProvedorPortaLoader>
      </body>
    </html>
  );
}

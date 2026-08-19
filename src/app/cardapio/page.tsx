import type { Metadata } from "next";
import Link from "next/link";
import { buscarRestaurante, buscarRodizios } from "@/lib/conteudo/fonte";
import { ParPreco } from "@/components/cardapio/par-preco";
import { RodapeSimples } from "@/components/marca/rodape-simples";
import { urlDelivery } from "@/lib/contato/delivery";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata({
  titulo: "Cardápio",
  descricao: "Os três rodízios do Oishi, com os dois preços de cada tier — o padrão e o de desperdício zero.",
  caminho: "/cardapio",
});

// spec-design.md §11.5 — the direct answer to the site's highest-intent
// question. Real <h2>/<h3>/<ul>, not an image; the à la carte / delivery
// menu is routed honestly to anota.ai (data-inventory.md §6, Q7).
export default async function CardapioPage() {
  const [rodizios, restaurante] = await Promise.all([buscarRodizios(), buscarRestaurante()]);

  return (
    <>
      <div className="px-4 pt-10 pb-6 sm:px-6">
        <h1 style={{ fontSize: "var(--t-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>Cardápio</h1>
        <p className="mt-3 max-w-2xl text-cinza-claro" style={{ fontSize: "var(--t-corpo)" }}>
          Os rodízios do Oishi estão completos e com preço aqui. O cardápio à la carte e o
          delivery vivem no{" "}
          <a href={urlDelivery()} target="_blank" rel="noopener noreferrer" className="text-washi underline">
            anota.ai
          </a>{" "}
          — é lá que fica atualizado.
        </p>
      </div>

      <nav
        className="sticky top-[49px] z-40 flex gap-6 overflow-x-auto border-b border-sumi-linha bg-sumi/95 px-4 py-3 backdrop-blur-sm sm:px-6"
        aria-label="Estações"
      >
        {rodizios.map((r) => (
          <a key={r.slug} href={`#${r.slug}`} className="whitespace-nowrap text-cinza-claro hover:text-washi" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
            {r.capitulo} · {r.nome}
          </a>
        ))}
      </nav>

      {rodizios.map((rodizio) => (
        <section key={rodizio.slug} id={rodizio.slug} className="border-b border-sumi-linha px-4 py-14 sm:px-6">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 style={{ fontSize: "var(--t-titulo)", fontWeight: 700 }}>
              <span className="mr-3 font-jp text-cinza">{rodizio.kanji}</span>
              {rodizio.nome}
            </h2>
            <Link href={`/rodizio/${rodizio.slug}`} className="text-cinza-claro hover:text-washi" style={{ fontSize: "0.85rem" }}>
              Ver capítulo →
            </Link>
          </div>

          <div className="mb-10 grid gap-8 sm:grid-cols-2">
            <ParPreco preco={rodizio.preco} rotulo={rodizio.precoIlimitado ? "Com limite" : undefined} />
            {rodizio.precoIlimitado && <ParPreco preco={rodizio.precoIlimitado} rotulo="Ilimitado" />}
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {rodizio.estacoes.map((estacao) => (
              <div key={estacao.nome}>
                <h3 className="mb-3 text-washi" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  {estacao.nome}
                </h3>
                <ul className="grid gap-1.5 text-cinza-claro" style={{ fontSize: "0.9rem" }}>
                  {estacao.itens.map((item) => (
                    <li key={item.nome}>
                      <span className="text-washi">{item.nome}</span>
                      {item.descricao ? <>: {item.descricao}</> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      <RodapeSimples restaurante={restaurante} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarRestaurante, buscarRodizio, buscarRodizios } from "@/lib/conteudo/fonte";
import { ParPreco } from "@/components/cardapio/par-preco";
import { RodapeSimples } from "@/components/marca/rodape-simples";
import { Ctas } from "@/components/cena/ctas";
import { construirMetadata } from "@/lib/seo";
import type { SlugRodizio } from "@/lib/conteudo/tipos";

export async function generateStaticParams() {
  const rodizios = await buscarRodizios();
  return rodizios.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rodizio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const rodizio = await buscarRodizio(slug as SlugRodizio);
  if (!rodizio) return construirMetadata({ titulo: "Rodízio", descricao: "", caminho: "/rodizio" });
  return construirMetadata({
    titulo: rodizio.nome,
    descricao: `Capítulo ${rodizio.capitulo} — ${rodizio.descricao}`,
    caminho: `/rodizio/${rodizio.slug}`,
  });
}

// spec-design.md §11.4 — the three chapters. M3 disc entry → chapter
// numeral with its kanji → the tier's ParPreco → the full item list by
// station, verbatim → cross-links to the other two rodízios.
export default async function RodizioPage({ params }: PageProps<"/rodizio/[slug]">) {
  const { slug } = await params;
  const [rodizio, todos, restaurante] = await Promise.all([
    buscarRodizio(slug as SlugRodizio),
    buscarRodizios(),
    buscarRestaurante(),
  ]);
  if (!rodizio) notFound();

  const outros = todos.filter((r) => r.slug !== rodizio.slug);

  return (
    <>
      <section className="border-b border-sumi-linha px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-start gap-6">
          <span
            className="text-cinza"
            style={{ fontSize: "var(--t-numero)", fontWeight: 800, fontVariationSettings: "'wdth' 62" }}
          >
            {rodizio.capitulo}
          </span>
          <span className="font-jp text-hinomaru-claro" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {rodizio.kanji}
          </span>
        </div>
        <h1 style={{ fontSize: "var(--t-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>{rodizio.nome}</h1>
        <p className="mt-3 max-w-xl text-cinza-claro" style={{ fontSize: "var(--t-corpo)" }}>
          {rodizio.descricao}
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <ParPreco preco={rodizio.preco} rotulo={rodizio.precoIlimitado ? "Com limite" : undefined} />
          {rodizio.precoIlimitado && <ParPreco preco={rodizio.precoIlimitado} rotulo="Ilimitado" />}
        </div>

        <Ctas className="mt-10" />
      </section>

      <section className="border-b border-sumi-linha px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          {rodizio.estacoes.map((estacao) => (
            <div key={estacao.nome}>
              <h2 className="mb-3 text-washi" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                {estacao.nome}
              </h2>
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

      <section className="px-4 py-12 sm:px-6">
        <p className="mb-5 text-cinza" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
          Outros rodízios
        </p>
        <div className="flex flex-wrap gap-4">
          {outros.map((r) => (
            <Link
              key={r.slug}
              href={`/rodizio/${r.slug}`}
              className="border border-sumi-linha px-5 py-4 text-washi hover:border-washi"
            >
              <span className="mr-2 text-cinza">{r.capitulo}</span>
              {r.nome}
            </Link>
          ))}
        </div>
      </section>

      <RodapeSimples restaurante={restaurante} />
    </>
  );
}

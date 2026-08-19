import Link from "next/link";
import { rodizios } from "@/content/rodizios";
import { Selo } from "@/components/marca/selo";

// The reference's `AREA 01/02/03` artisan pages, remapped: the three
// rodízios are the three chapters — spec-design.md §2.1, §11.4.
export function RodiziosTeaser() {
  return (
    <section className="px-4 py-20 sm:px-6" aria-label="Os três rodízios">
      <p className="mb-10 text-cinza" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
        Os três capítulos
      </p>
      <div className="grid gap-px border border-sumi-linha sm:grid-cols-3">
        {rodizios.map((r) => (
          <Link
            key={r.slug}
            href={`/rodizio/${r.slug}`}
            className="group relative flex min-h-[280px] flex-col justify-between border-sumi-linha bg-sumi-alto p-6 transition-colors hover:bg-sumi sm:border-r last:sm:border-r-0"
          >
            <div className="flex items-start justify-between">
              <span className="text-cinza" style={{ fontSize: "var(--t-numero)", fontWeight: 800, fontVariationSettings: "'wdth' 62" }}>
                {r.capitulo}
              </span>
              <Selo escala="capitulo" cor="var(--sumi-linha)" className="group-hover:opacity-80" />
            </div>
            <div>
              <p className="font-jp text-cinza-claro" style={{ fontSize: "1.5rem" }}>
                {r.kanji}
              </p>
              <h3 className="text-washi" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                {r.nome}
              </h3>
              <p className="mt-1 text-cinza-claro" style={{ fontSize: "0.85rem" }}>
                {r.descricao}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

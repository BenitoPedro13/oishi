import type { Metadata } from "next";
import { buscarRestaurante } from "@/lib/conteudo/fonte";
import { FormularioReserva } from "@/components/reserva/formulario-reserva";
import { RodapeSimples } from "@/components/marca/rodape-simples";
import { construirMetadata } from "@/lib/seo";

export const metadata: Metadata = construirMetadata({
  titulo: "Reserva",
  descricao: "Reserve uma mesa no Oishi Cozinha Japonesa pelo WhatsApp.",
  caminho: "/reserva",
});

// spec-design.md §11.6. The rules panel renders only facts from
// data-inventory.md §7 — Sushi da Praça's policy is never copied in.
export default async function ReservaPage() {
  const restaurante = await buscarRestaurante();

  return (
    <>
      <section className="grid gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h1 style={{ fontSize: "var(--t-display)", fontWeight: 800, letterSpacing: "-0.025em" }}>予約 Reserva</h1>
          <p className="mt-3 max-w-md text-cinza-claro" style={{ fontSize: "var(--t-corpo)" }}>
            Preencha os dados e confirme pelo WhatsApp — é assim que o Oishi já recebe
            reservas hoje.
          </p>

          <div className="mt-10 border border-sumi-linha p-5" style={{ fontSize: "0.85rem" }}>
            <p className="mb-2 text-washi" style={{ fontWeight: 700 }}>
              Sobre a reserva
            </p>
            <ul className="grid gap-1.5 text-cinza-claro">
              <li>Aberto {restaurante.horario.faixaHorario} — dias da semana em confirmação.</li>
              <li>Mínimo e máximo de pessoas por mesa: <span className="text-cinza">[a confirmar com o Oishi]</span></li>
              <li>Tolerância de atraso: <span className="text-cinza">[a confirmar com o Oishi]</span></li>
              <li>Grupos grandes: fale direto no WhatsApp para combinar.</li>
            </ul>
          </div>
        </div>

        <div className="border border-sumi-linha bg-sumi-alto p-6 sm:p-8">
          <FormularioReserva />
        </div>
      </section>

      <RodapeSimples restaurante={restaurante} />
    </>
  );
}

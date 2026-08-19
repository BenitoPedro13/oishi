import type { Metadata } from "next";
import { buscarRestaurante } from "@/lib/conteudo/fonte";
import { Ctas } from "@/components/cena/ctas";
import { BandaContato } from "@/components/cena/banda-contato";
import { construirMetadata } from "@/lib/seo";
import { formatarTelefone } from "@/lib/formato";

export const metadata: Metadata = construirMetadata({
  titulo: "Contato",
  descricao: "Endereço, horário e WhatsApp do Oishi Cozinha Japonesa.",
  caminho: "/contato",
});

// spec-design.md §11.7. No map iframe — a static outbound link instead
// (spec-architecture.md §6.4); no photograph slot filled yet (Q12).
export default async function ContatoPage() {
  const restaurante = await buscarRestaurante();
  const endereco = `${restaurante.endereco.rua}, ${restaurante.endereco.numero ?? ""} — ${restaurante.endereco.bairro}`;
  const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Oishi Cozinha Japonesa, ${endereco}`)}`;

  return (
    <>
      <section className="grid gap-3 px-4 py-16 sm:px-6" style={{ fontSize: "var(--t-corpo)" }}>
        <p className="text-cinza" style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
          連絡 Contato
        </p>
        <p className="text-washi" style={{ fontWeight: 700 }}>
          {endereco}
        </p>
        <p className="text-cinza-claro">São Gonçalo, RJ [a confirmar — data-inventory.md Q2]</p>
        <p className="text-cinza-claro">
          {restaurante.horario.faixaHorario} · dias da semana em confirmação
        </p>
        <p className="text-cinza-claro">{formatarTelefone(restaurante.telefoneWhatsapp)}</p>

        <div className="mt-4 flex flex-wrap gap-4">
          <a href={linkMapa} target="_blank" rel="noopener noreferrer" className="text-washi underline">
            Como chegar (Google Maps) →
          </a>
          <a
            href={`https://instagram.com/${restaurante.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-washi underline"
          >
            {restaurante.instagram} →
          </a>
        </div>

        <Ctas className="mt-8" />
      </section>

      <BandaContato restaurante={restaurante} />
    </>
  );
}

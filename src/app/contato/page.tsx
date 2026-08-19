import type { Metadata } from "next";
import { buscarRestaurante } from "@/lib/conteudo/fonte";
import { Selo } from "@/components/marca/selo";
import { Ctas } from "@/components/cena/ctas";
import { construirMetadata } from "@/lib/seo";
import { construirLinkWhatsapp } from "@/lib/contato/whatsapp";
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

      <section className="relative overflow-hidden bg-hinomaru px-4 py-24 sm:px-6">
        <div className="pointer-events-none absolute -top-[10vw] -left-[8vw] opacity-15" aria-hidden="true">
          <Selo escala="fantasma" cor="var(--sumi)" />
        </div>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <h2
            style={{ fontSize: "var(--t-splash)", fontWeight: 800, color: "var(--washi)", letterSpacing: "-0.03em", lineHeight: 0.82 }}
          >
            CONTATO
          </h2>
          <a
            href={construirLinkWhatsapp("Olá! Vim pelo site do Oishi.")}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 bg-washi px-6 py-3 text-hinomaru"
            style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.03em" }}
          >
            Chamar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

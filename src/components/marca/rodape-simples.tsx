import Link from "next/link";
import { formatarTelefone } from "@/lib/formato";
import type { Restaurante } from "@/lib/conteudo/tipos";

export function RodapeSimples({ restaurante }: { restaurante: Restaurante }) {
  const endereco = `${restaurante.endereco.rua}, ${restaurante.endereco.numero ?? ""} — ${restaurante.endereco.bairro}`;
  return (
    <footer className="border-t border-sumi-linha px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-wrap items-start justify-between gap-8 text-cinza-claro" style={{ fontSize: "0.85rem" }}>
        <div className="grid gap-1">
          <p className="text-washi" style={{ fontWeight: 700 }}>
            {restaurante.nomeCompleto}
          </p>
          <p>{endereco}</p>
          <p>{formatarTelefone(restaurante.telefoneWhatsapp)}</p>
          <p>{restaurante.horario.faixaHorario} · dias em confirmação</p>
          <p>
            Powered by{" "}
            <a
              href="https://blessed-moon.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-washi"
            >
              Blessed Moon Studio
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/cardapio" className="hover:text-washi">
            Cardápio
          </Link>
          <Link href="/reserva" className="hover:text-washi">
            Reserva
          </Link>
          <Link href="/delivery" className="hover:text-washi">
            Delivery
          </Link>
          <Link href="/contato" className="hover:text-washi">
            Contato
          </Link>
          <a
            href={`https://instagram.com/${restaurante.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-washi"
          >
            {restaurante.instagram}
          </a>
        </nav>
      </div>
    </footer>
  );
}

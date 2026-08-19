import { restaurante } from "@/content/restaurante";

// THE ONE wa.me builder — AGENTS.md §0, "things that must not break".
// A sibling project shipped `localhost` inside every production message
// because two places built this string independently. Never a second one.
export function construirLinkWhatsapp(mensagem?: string): string {
  const base = `https://wa.me/${restaurante.telefoneWhatsapp}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemReserva(dados: {
  nome: string;
  data: string;
  horario: string;
  pessoas: number;
  observacoes?: string;
}): string {
  const linhas = [
    `Olá! Gostaria de reservar uma mesa no Oishi.`,
    `Nome: ${dados.nome}`,
    `Data: ${dados.data}`,
    `Horário: ${dados.horario}`,
    `Pessoas: ${dados.pessoas}`,
  ];
  if (dados.observacoes) linhas.push(`Observações: ${dados.observacoes}`);
  return linhas.join("\n");
}

import type { Restaurante } from "@/lib/conteudo/tipos";

// data-inventory.md §1–§3.
// Phone: `data-inventory.md` Q3 is resolved here in favour of the bio's number
// — CONFIRMED by the machine-readable WhatsApp deep link plus two posts,
// against the flyers' single-source `2606`. See §11 Q3 for the full trail.
// Address: cidade/uf/cep stay undefined — Q2 is still open, and a wrong city
// is worse than a missing one (AGENTS.md §0, "things that must not break").
export const restaurante: Restaurante = {
  nomeCurto: "Oishi",
  nomeCompleto: "Oishi Cozinha Japonesa",
  categoria: "Restaurante japonês",
  instagram: "@oishicozinhajaponesa",
  telefoneWhatsapp: "552126059536",
  urlDelivery: "https://pedido.anota.ai/loja/oishi-cozinha-japonesa-1",
  endereco: {
    rua: "R. Sá Carvalho",
    numero: "40",
    bairro: "Centro",
  },
  horario: {
    faixaHorario: "18h30 às 23h40",
    diasConhecidos: false,
    observacao:
      "Dias da semana e uma abertura às 17h aparecem em um único post — ainda não confirmados como padrão.",
  },
};

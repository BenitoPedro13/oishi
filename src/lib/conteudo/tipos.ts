// spec-architecture.md §5.2 — the content seam's types.
// A price never lives typed into a component; it is centavos, here, with a
// verification date. formatarBRL() (lib/formato.ts) is the only place it
// becomes a "R$ 74,90" string.

export type Centavos = number;

export interface ParDePreco {
  padrao: Centavos;
  semDesperdicio: Centavos;
  verificadoEm: string; // ISO date — data-inventory.md §4
}

export type SlugRodizio = "chisai" | "sem-sashimi" | "com-sashimi";

export interface ItemMenu {
  nome: string; // verbatim — data-inventory.md §5. Never "corrected".
  descricao?: string;
}

export interface Estacao {
  nome: string; // "Cozinha" | "Sushibah" | ...
  itens: ItemMenu[];
}

export interface Rodizio {
  slug: SlugRodizio;
  capitulo: "01" | "02" | "03";
  kanji: string; // one of the spec-design.md §6.4 glyphs only
  nome: string;
  descricao: string;
  preco: ParDePreco;
  precoIlimitado?: ParDePreco; // only `com-sashimi` carries a second tier
  estacoes: Estacao[];
}

export interface Endereco {
  rua: string;
  numero?: string;
  bairro: string;
  cidade?: string; // MISSING — Q2. Undefined renders nothing, never a guess.
  uf?: string; // Q2
  cep?: string; // Q2
}

export interface HorarioFuncionamento {
  faixaHorario: string; // "18h30 às 23h40" — the one sourced range, Q4
  diasConhecidos: false; // data-inventory.md §3 — no weekday breakdown exists
  observacao?: string;
}

export interface Restaurante {
  nomeCurto: string;
  nomeCompleto: string;
  categoria: string;
  instagram: string;
  telefoneWhatsapp: string; // digits only, "552126059536" — Q3 resolved
  urlDelivery: string;
  endereco: Endereco;
  horario: HorarioFuncionamento;
}

export interface EstatisticaDesperdicio {
  texto: string; // verbatim — data-inventory.md §8
}

export interface Campanha {
  nome: string; // "CAMPANHA CONTRA O DESPERDÍCIO"
  condicao: string; // verbatim, appears with every price
  estatisticas: EstatisticaDesperdicio[];
}

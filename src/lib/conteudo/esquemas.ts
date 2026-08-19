import { z } from "zod";

// spec-architecture.md §5.3 — content is validated at build time.
// The one rule that must never silently pass: the zero-waste price is
// always lower than the standard price, on every tier, on every rodízio.
export const esquemaParDePreco = z
  .object({
    padrao: z.number().int().positive(),
    semDesperdicio: z.number().int().positive(),
    verificadoEm: z.string().date(),
  })
  .refine((p) => p.semDesperdicio < p.padrao, {
    message: "semDesperdicio deve ser menor que padrao — spec-design.md §5.1",
  });

export const esquemaItemMenu = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
});

export const esquemaEstacao = z.object({
  nome: z.string().min(1),
  itens: z.array(esquemaItemMenu).min(1),
});

export const esquemaRodizio = z.object({
  slug: z.enum(["chisai", "sem-sashimi", "com-sashimi"]),
  capitulo: z.enum(["01", "02", "03"]),
  kanji: z.string().min(1),
  nome: z.string().min(1),
  descricao: z.string().min(1),
  preco: esquemaParDePreco,
  precoIlimitado: esquemaParDePreco.optional(),
  estacoes: z.array(esquemaEstacao).min(1),
});

export const esquemaRestaurante = z.object({
  nomeCurto: z.string().min(1),
  nomeCompleto: z.string().min(1),
  categoria: z.string().min(1),
  instagram: z.string().min(1),
  telefoneWhatsapp: z.string().regex(/^55\d{10,11}$/, "esperado 55 + DDD + número, só dígitos"),
  urlDelivery: z.string().url(),
  endereco: z.object({
    rua: z.string().min(1),
    numero: z.string().optional(),
    bairro: z.string().min(1),
    cidade: z.string().optional(),
    uf: z.string().optional(),
    cep: z.string().optional(),
  }),
  horario: z.object({
    faixaHorario: z.string().min(1),
    diasConhecidos: z.literal(false),
    observacao: z.string().optional(),
  }),
});

export const esquemaFormularioReserva = z.object({
  nome: z.string().min(2, "informe seu nome"),
  telefone: z.string().min(8, "informe um telefone com DDD"),
  data: z.string().min(1, "escolha uma data"),
  horario: z.string().min(1, "escolha um horário"),
  pessoas: z.number().int().min(1, "mínimo de 1 pessoa").max(60, "para grupos grandes, fale no WhatsApp"),
  observacoes: z.string().max(500).optional(),
});

export type FormularioReserva = z.infer<typeof esquemaFormularioReserva>;

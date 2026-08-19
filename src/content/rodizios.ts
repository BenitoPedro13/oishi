import type { Estacao, Rodizio } from "@/lib/conteudo/tipos";

// Transcribed verbatim from the three flyer images — data-inventory.md §5.
// Item names keep the restaurant's own spellings (SUSHIBAH, CRYSPY, PORCAO,
// MISSOSHIRU) until Q6 is answered. Prices in centavos — data-inventory.md §4.
const VERIFICADO_EM = "2026-08-18";

const cozinhaBase: Estacao = {
  nome: "Cozinha",
  itens: [
    { nome: "Harumaki", descricao: "legumes · frango catupiry · camarão catupiry · provolone" },
    { nome: "Yakissoba", descricao: "legumes · frango · camarão · carne" },
    { nome: "Batata frita" },
    {
      nome: "Sobremesas",
      descricao:
        "harumaki romeu e julieta · banana (mista, leite cond., chocolate) · rolinho de chocolate · rolinho doce de leite",
    },
  ],
};

const sushibahBase: Estacao = {
  nome: "Sushibah",
  itens: [
    {
      nome: "Uramaki",
      descricao:
        "california (manga, pepino, kani) · salmão skin (pele salmão grelhado) · filadelfia (salmão, cebolinha, cheese) · ebi roll · pimenta biquinho · cryspy de couve · cryspy de batata doce · cryspy alho poró",
    },
    {
      nome: "Makimono",
      descricao:
        "tekkamaki atum · kappamaki pepino · filadelfia (salmão, cebolinha, cheese) · shakemaki salmão · kanimaki kani",
    },
    {
      nome: "Makimono hot",
      descricao:
        "filadelfia (salmão, cheese, ceb) · ebitem (camarão, cheese, ceb) · skin hot (salmão, pele, grelhado) · haru hot (salmão, cheese, ceb)",
    },
  ],
};

const temakiEstacao: Estacao = {
  nome: "Temaki",
  itens: [
    {
      nome: "Temaki",
      descricao:
        "atum com cebolinha · salmão com cebolinha · filadelfia (salmão, cheese, cebolinha) · skin pele (salmão grelhado) · hot filadelfia · kani",
    },
  ],
};

const sushiEstacao: Estacao = {
  nome: "Sushi",
  itens: [
    {
      nome: "Sushi",
      descricao: "kani · atum · salmão · peixe branco · polvo · salmão skin pele · camarão · salmão cheese",
    },
  ],
};

export const rodizios: Rodizio[] = [
  {
    slug: "chisai",
    capitulo: "01",
    kanji: "小",
    nome: "Rodízio Chisai",
    descricao: "O rodízio de entrada — Cozinha e Sushibah.",
    preco: { padrao: 7490, semDesperdicio: 5490, verificadoEm: VERIFICADO_EM },
    estacoes: [cozinhaBase, sushibahBase],
  },
  {
    slug: "sem-sashimi",
    capitulo: "02",
    kanji: "放題",
    nome: "Rodízio sem sashimi",
    descricao: "Tudo do Chisai, mais Tempura, Temaki e Sushi.",
    preco: { padrao: 9490, semDesperdicio: 7490, verificadoEm: VERIFICADO_EM },
    estacoes: [
      cozinhaBase,
      sushibahBase,
      { nome: "Tempura", itens: [{ nome: "Tempura", descricao: "peixe · cebola" }] },
      temakiEstacao,
      sushiEstacao,
    ],
  },
  {
    slug: "com-sashimi",
    capitulo: "03",
    kanji: "刺身",
    nome: "Rodízio com sashimi",
    descricao: "O rodízio completo — com ou sem limite de sashimi.",
    preco: { padrao: 11290, semDesperdicio: 9290, verificadoEm: VERIFICADO_EM },
    precoIlimitado: { padrao: 13990, semDesperdicio: 11990, verificadoEm: VERIFICADO_EM },
    estacoes: [
      cozinhaBase,
      sushibahBase,
      { nome: "Tempura", itens: [{ nome: "Tempura", descricao: "peixe · camarão · cebola · lula" }] },
      temakiEstacao,
      sushiEstacao,
      { nome: "Missoshiru", itens: [{ nome: "Missoshiru" }] },
      { nome: "Yasai itame", itens: [{ nome: "Yasai itame" }] },
      {
        nome: "Espeto",
        itens: [{ nome: "Espeto — grelhado", descricao: "frango · carne · salmão · peixe branco" }],
      },
      { nome: "Porcao", itens: [{ nome: "Porcao", descricao: "camarão · lula" }] },
      {
        nome: "Sashimi",
        itens: [
          {
            nome: "Sashimi",
            descricao:
              "kani · atum · salmão · peixe branco · ice · salmão com gergelim · atum-pre · hot especial · haddock · polvo",
          },
        ],
      },
    ],
  },
];

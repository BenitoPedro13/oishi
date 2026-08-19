import type { Campanha } from "@/lib/conteudo/tipos";

// Verbatim — data-inventory.md §8. These are Oishi's own uncited campaign
// copy, republished from their Instagram. Quoted as campaign copy, never
// presented as sourced statistics (Q9, still open).
export const campanha: Campanha = {
  nome: "CAMPANHA CONTRA O DESPERDÍCIO",
  condicao:
    "OBS: PARA OBTER O BENEFÍCIO DE DESPERDÍCIO ZERO É ESSENCIAL QUE TODOS DA MESA NÃO DESPERDICEM.",
  estatisticas: [
    { texto: "1 em cada 8 pessoas passa fome no mundo." },
    { texto: "1/3 de todo alimento produzido no mundo é desperdiçado." },
    { texto: "58% do lixo brasileiro é composto por comida." },
    { texto: "41 mil toneladas de comida são desperdiçados por ano." },
  ],
};

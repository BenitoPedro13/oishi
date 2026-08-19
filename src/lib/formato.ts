// The ONE formatter — spec-architecture.md §9.1. A price string, a phone
// string or a date string is never hand-typed at a call site.

export function formatarBRL(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** "552126059536" → "(21) 2605-9536" */
export function formatarTelefone(digitos: string): string {
  const semDDI = digitos.startsWith("55") ? digitos.slice(2) : digitos;
  const ddd = semDDI.slice(0, 2);
  const numero = semDDI.slice(2);
  const meio = numero.length === 8 ? numero.slice(0, 4) : numero.slice(0, numero.length - 4);
  const fim = numero.slice(meio.length);
  return `(${ddd}) ${meio}-${fim}`;
}

export function formatarData(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

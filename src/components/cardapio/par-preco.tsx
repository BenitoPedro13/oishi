import { formatarBRL } from "@/lib/formato";
import type { ParDePreco } from "@/lib/conteudo/tipos";
import { campanha } from "@/content/campanha";

// spec-design.md §5 — the one piece of data whose typography is specified
// exactly. Both prices always render together; the condition is verbatim.
interface ParPrecoProps {
  preco: ParDePreco;
  rotulo?: string;
  className?: string;
  /** On a --hinomaru fill, text is --washi (5.29:1) — never --hinomaru-claro
   * on itself, and never --cinza-claro, whose ratio is only measured
   * against --sumi (spec-design.md §4.4). */
  sobreVermelho?: boolean;
}

export function ParPreco({ preco, rotulo, className, sobreVermelho }: ParPrecoProps) {
  return (
    <div className={className}>
      {rotulo && (
        <p
          className={sobreVermelho ? "mb-2 text-washi/70" : "mb-2 text-cinza"}
          style={{ fontSize: "var(--t-rotulo)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          {rotulo}
        </p>
      )}
      <p
        className={sobreVermelho ? "tabular text-washi/60" : "tabular text-cinza-claro"}
        style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 600 }}
      >
        {formatarBRL(preco.padrao)}
      </p>
      <p className="tabular text-washi" style={{ fontSize: "var(--t-preco)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
        {formatarBRL(preco.semDesperdicio)}
      </p>
      <p
        className={sobreVermelho ? "mt-1 text-washi" : "mt-1 text-hinomaru-claro"}
        style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}
      >
        sem desperdício
      </p>
      <p
        className={sobreVermelho ? "mt-3 max-w-[38ch] text-washi/70" : "mt-3 max-w-[38ch] text-cinza-claro"}
        style={{ fontSize: "0.75rem", lineHeight: 1.5 }}
      >
        {campanha.condicao}
      </p>
    </div>
  );
}

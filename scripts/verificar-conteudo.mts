#!/usr/bin/env tsx
// spec-architecture.md §5.3 — content and rule checks, run by `pnpm verificar`.
// Not yet wired into `next build` (Next 16 removed `next lint` from the
// build step; this script is the analogue for content, run explicitly).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { buscarRestaurante, buscarRodizios } from "../src/lib/conteudo/fonte";

let falhas = 0;

function falhar(mensagem: string) {
  falhas += 1;
  console.error(`✗ ${mensagem}`);
}

function ok(mensagem: string) {
  console.log(`✓ ${mensagem}`);
}

function* arquivos(dir: string): Generator<string> {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    const info = statSync(caminho);
    if (info.isDirectory()) yield* arquivos(caminho);
    else if (/\.(tsx?|mts)$/.test(nome)) yield caminho;
  }
}

async function main() {
  // 1. Zod schemas parse without throwing (semDesperdicio < padrao, etc).
  try {
    await buscarRestaurante();
    const rodizios = await buscarRodizios();
    ok(`conteúdo validado por zod — ${rodizios.length} rodízios`);
  } catch (e) {
    falhar(`esquema de conteúdo inválido: ${(e as Error).message}`);
  }

  // 2. Exactly one `wa.me` occurrence in src/, inside lib/contato/whatsapp.ts.
  const srcDir = join(import.meta.dirname, "..", "src");
  const ocorrenciasWaMe: string[] = [];
  for (const caminho of arquivos(srcDir)) {
    const conteudo = readFileSync(caminho, "utf-8");
    if (conteudo.includes("wa.me")) ocorrenciasWaMe.push(caminho);
  }
  if (ocorrenciasWaMe.length === 1 && ocorrenciasWaMe[0].endsWith("lib/contato/whatsapp.ts")) {
    ok("um único builder wa.me, em lib/contato/whatsapp.ts");
  } else {
    falhar(`wa.me encontrado fora do builder único: ${ocorrenciasWaMe.join(", ")}`);
  }

  // 3. No hard-coded fact literal under src/components/.
  const padraoFato = /R\$|\(21\)|Sá Carvalho|18h30/;
  const componentesDir = join(srcDir, "components");
  const violacoes: string[] = [];
  for (const caminho of arquivos(componentesDir)) {
    const conteudo = readFileSync(caminho, "utf-8");
    for (const linha of conteudo.split("\n")) {
      if (padraoFato.test(linha) && !linha.trim().startsWith("//")) {
        violacoes.push(`${caminho}: ${linha.trim()}`);
      }
    }
  }
  if (violacoes.length === 0) {
    ok("nenhum fato hard-coded em src/components/");
  } else {
    falhar(`fatos hard-coded em componentes:\n  ${violacoes.join("\n  ")}`);
  }

  // 4. Pure #000 must not appear in globals.css.
  const globals = readFileSync(join(srcDir, "app", "globals.css"), "utf-8");
  if (/#000000\b|#000\b/i.test(globals)) {
    falhar("pure #000 found in globals.css");
  } else {
    ok("sem #000 puro em globals.css");
  }

  console.log(falhas === 0 ? `\n${"—".repeat(20)}\nOK` : `\n${"—".repeat(20)}\n${falhas} falha(s)`);
  process.exit(falhas === 0 ? 0 : 1);
}

main();

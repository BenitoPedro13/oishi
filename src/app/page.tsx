import { buscarRestaurante } from "@/lib/conteudo/fonte";
import { Hero } from "@/components/cena/hero";
import { Introducao } from "@/components/cena/introducao";
import { DiscoTransicao } from "@/components/cena/disco-transicao";
import { CapituloDesperdicio } from "@/components/cena/capitulo-desperdicio";
import { RodiziosTeaser } from "@/components/cena/rodizios-teaser";
import { RodapeSimples } from "@/components/marca/rodape-simples";

export default async function Home() {
  const restaurante = await buscarRestaurante();

  return (
    <>
      <Hero />
      <Introducao />
      <DiscoTransicao />
      <CapituloDesperdicio />
      <RodiziosTeaser />
      <RodapeSimples restaurante={restaurante} />
    </>
  );
}

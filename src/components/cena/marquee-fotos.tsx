import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

// Every tile here stays well under the Tier C "thumbnail only, ≤220px, never
// full-bleed" ceiling (spec-design.md §10.2/§13) — density/motion borrowed from
// new-sushism.jp, not its photography (spec-design.md §2).
const FOTOS = [
  { src: "/fotos/painel-sushi-redondo.webp", alt: "Sushi redondo do Oishi" },
  { src: "/fotos/painel-temaki.webp", alt: "Temaki do Oishi" },
  { src: "/fotos/painel-cryspy.webp", alt: "Cryspy do Oishi" },
  { src: "/fotos/painel-sashimi-tira.webp", alt: "Corte de sashimi do Oishi" },
  { src: "/fotos/painel-grelhado.webp", alt: "Prato grelhado do Oishi" },
  { src: "/fotos/painel-prato.webp", alt: "Prato montado do Oishi" },
  { src: "/fotos/painel-rolinhos-bambu.webp", alt: "Rolinhos servidos sobre bambu no Oishi" },
  { src: "/fotos/painel-sushi-flores.webp", alt: "Sushi decorado com flores no Oishi" },
  { src: "/fotos/painel-noren.webp", alt: "Noren na entrada do Oishi" },
  { src: "/fotos/painel-fachada.webp", alt: "Fachada do Oishi" },
  { src: "/fotos/painel-maneki-neko.webp", alt: "Maneki-neko no balcão do Oishi" },
  { src: "/fotos/hero-neon.webp", alt: "Letreiro de neon do Oishi" },
] as const;

function LinhaFotos({ fotos }: { fotos: readonly { src: string; alt: string }[] }) {
  return (
    <>
      {fotos.map((foto) => (
        <div key={foto.src} className="relative h-40 w-56 shrink-0 overflow-hidden sm:h-48 sm:w-64">
          <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 640px) 16rem, 14rem" className="object-cover" />
        </div>
      ))}
    </>
  );
}

export function MarqueeFotos() {
  return (
    <section className="overflow-hidden py-20" aria-label="Um pouco da casa">
      <p
        className="mb-10 px-4 text-cinza sm:px-6"
        style={{ fontSize: "var(--t-rotulo)", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}
      >
        Um pouco da casa
      </p>
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(90deg, transparent, var(--sumi) 8%, var(--sumi) 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, var(--sumi) 8%, var(--sumi) 92%, transparent)",
        }}
      >
        <Marquee pauseOnHover className="[--duration:36s] [--gap:0.5rem]">
          <LinhaFotos fotos={FOTOS} />
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-2 [--duration:36s] [--gap:0.5rem]">
          <LinhaFotos fotos={[...FOTOS].reverse()} />
        </Marquee>
      </div>
    </section>
  );
}

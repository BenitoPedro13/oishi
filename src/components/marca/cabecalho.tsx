"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { CabecalhoMarca } from "./cabecalho-marca";
import { MarcaItem } from "./marca-item";
import { MenuMobile } from "./menu-mobile";
import { cn } from "@/lib/utils";
import { usePortaLoader } from "@/lib/motion/porta-loader";
import { OISHI_ATRASO } from "@/lib/motion/hero-entrada";

const NAV = [
  { href: "/cardapio", kanji: "品書", gloss: "menu", palavra: "Cardápio" },
  { href: "/rodizio/sem-sashimi", kanji: "放題", gloss: "rodízio", palavra: "Rodízio" },
  { href: "/reserva", kanji: "予約", gloss: "reserva", palavra: "Reserva" },
  { href: "/contato", kanji: "連絡", gloss: "contato", palavra: "Contato" },
] as const;

export function Cabecalho() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const { liberado } = usePortaLoader();

  return (
    <>
      {overlay && (
        <div
          className="nav-scrim pointer-events-none fixed inset-x-0 top-0 z-40 h-32 sm:h-36"
          aria-hidden
        />
      )}
      <motion.header
        className={cn(
          "z-50 w-full",
          overlay
            ? "fixed inset-x-0 top-0 bg-transparent"
            : "sticky top-0 border-b border-sumi-linha bg-sumi/95 backdrop-blur-sm",
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={liberado || !overlay ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{
          duration: 0.5,
          delay: overlay ? OISHI_ATRASO + 0.5: OISHI_ATRASO,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1800px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 sm:px-8 sm:py-5 lg:px-12",
            overlay ? "px-5 py-4 sm:px-8 sm:py-5 lg:px-12" : "px-4 py-3 sm:px-6",
          )}
        >
          <CabecalhoMarca logo />

          {/* The large lockup size needs real room — only single-row below `xl`
              (1280px) reliably overflows, so the full nav waits for `xl:` and the
              drawer (`MenuMobile`) covers everything narrower than that, not just
              phones. `flex-wrap` here is a safety net, never the primary layout. */}
          <nav
            className="hidden shrink-0 flex-wrap items-end justify-end gap-x-8 gap-y-2 xl:flex xl:gap-x-12"
            aria-label="Navegação principal"
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={liberado || !overlay ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{
                  duration: 0.45,
                  delay: overlay ? OISHI_ATRASO + 0.5 + i * 0.1 : i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MarcaItem {...item} />
              </motion.div>
            ))}
          </nav>

          <MenuMobile itens={NAV} />
        </div>
      </motion.header>
    </>
  );
}

"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { CabecalhoMarca } from "./cabecalho-marca";
import { MarcaItem } from "./marca-item";
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
            "mx-auto flex w-full max-w-[1800px] items-center  justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-12ustify-between",
            overlay ? "px-5 py-4 sm:px-8 sm:py-5 lg:px-12" : "px-4 py-3 sm:px-6",
          )}
        >
          <CabecalhoMarca overlay={overlay} />

          <nav
            className="flex shrink-0 items-end gap-8 sm:gap-10 lg:gap-14 xl:gap-[4.5rem]"
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
                <MarcaItem {...item} overlay={overlay} />
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.header>
    </>
  );
}

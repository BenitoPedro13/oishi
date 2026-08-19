"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { CabecalhoMarca } from "./cabecalho-marca";
import { MarcaItem } from "./marca-item";

interface ItemNav {
  href: string;
  kanji: string;
  gloss: string;
  palavra: string;
}

/** Full-screen mobile/tablet nav drawer — `xl:hidden` companion to `Cabecalho`'s
 *  horizontal nav. The large lockup size the nav uses (`TASK-cabecalho-tamanho-unico.md`)
 *  only fits one row from `xl` (1280px) up, so this drawer covers everything narrower
 *  than that, not just phones. Same kanji-over-word lockup as `MarcaItem`, just much
 *  larger, one per line — mirrors the reference's own full-screen mobile menu structure
 *  (dark field, small logo top-left, close top-right, stacked nav list), built on the
 *  vendored `Sheet` (`ui/SOURCES.md`).
 */
export function MenuMobile({ itens }: { itens: readonly ItemNav[] }) {
  const [aberto, setAberto] = useState(false);

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetTrigger
        className="flex size-10 items-center justify-center text-washi xl:hidden"
        aria-label="Abrir menu"
      >
        <MenuIcon size={26} />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-none bg-sumi p-0 text-washi xl:hidden data-[side=right]:w-full data-[side=right]:sm:max-w-full"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <CabecalhoMarca />
          <SheetClose
            className="flex size-10 items-center justify-center text-washi"
            aria-label="Fechar menu"
          >
            <XIcon size={28} />
          </SheetClose>
        </div>

        <nav className="flex flex-col gap-10 px-5 py-10" aria-label="Navegação principal">
          {itens.map((item) => (
            <SheetClose key={item.href} render={<MarcaItem {...item} tamanho="clamp(2.25rem, 11vw, 3.25rem)" />} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

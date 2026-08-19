import { Selo } from "@/components/marca/selo";
import { construirLinkWhatsapp } from "@/lib/contato/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Scene 11 — the full-bleed red CONTACT close. `docs/spec-scene-footer.md`.
 * Shared between `/` and `/contato` (`spec-reference-scenes.md` Scene 11 route list).
 * Kanji stays `連絡` (Oishi's own nav-lockup choice, `spec-design.md` §6.3–§6.4),
 * not the reference's `接点` — see `TASK-scene-11-contato.md` §2.
 */
export function BandaContato({ className }: { className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-hinomaru px-4 py-24 sm:px-6", className)}>
      <div className="pointer-events-none absolute -top-[10vw] -left-[8vw] opacity-15" aria-hidden="true">
        <Selo escala="fantasma" cor="var(--sumi)" />
      </div>
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <h2
          style={{ fontSize: "var(--t-splash)", fontWeight: 800, color: "var(--washi)", letterSpacing: "-0.03em", lineHeight: 0.82 }}
        >
          CONTATO
        </h2>
        <a
          href={construirLinkWhatsapp("Olá! Vim pelo site do Oishi.")}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 bg-washi px-6 py-3 text-hinomaru"
          style={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.03em" }}
        >
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}

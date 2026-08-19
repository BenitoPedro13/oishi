import Link from "next/link";
import { construirLinkWhatsapp } from "@/lib/contato/whatsapp";

// The three exits, together — AGENTS.md §0 rule 18: reachable without
// scrolling on a 390×844 phone, on every screen that makes this promise.
export function Ctas({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ""}`}>
      <Link
        href="/delivery"
        className="border border-washi/30 px-5 py-3 text-washi transition-colors hover:border-washi"
        style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.03em" }}
      >
        Pedir no delivery
      </Link>
      <Link
        href="/reserva"
        className="border border-washi/30 px-5 py-3 text-washi transition-colors hover:border-washi"
        style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.03em" }}
      >
        Reservar mesa
      </Link>
      <a
        href={construirLinkWhatsapp("Olá! Vim pelo site do Oishi.")}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-hinomaru px-5 py-3 text-washi transition-colors hover:bg-hinomaru-claro"
        style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.03em" }}
      >
        Chamar no WhatsApp
      </a>
    </div>
  );
}

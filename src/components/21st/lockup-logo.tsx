import { Selo } from "@/components/marca/selo";
import { cn } from "@/lib/utils";

interface LockupLogoProps {
  className?: string;
  compact?: boolean;
}

export function LockupLogo({ className, compact }: LockupLogoProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className="relative inline-flex items-center justify-center">
        <span
          className="relative z-10 select-none text-hinomaru-claro"
          style={{
            fontWeight: 900,
            fontSize: compact ? "clamp(2.5rem, 10vw, 4.5rem)" : "clamp(3rem, 14vw, 6rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            fontVariationSettings: "'wdth' 62",
          }}
        >
          OISHI
        </span>
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90"
          aria-hidden
        >
          <Selo escala="capitulo" cor="var(--washi)" />
        </div>
      </div>
      <p
        className="mt-2 font-jp text-washi/80"
        style={{ fontSize: compact ? "0.75rem" : "0.85rem", letterSpacing: "0.2em" }}
      >
        放題
      </p>
    </div>
  );
}

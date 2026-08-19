import { campanha } from "@/content/campanha";

// A band that never stops, carrying the campaign's one condition —
// spec-design.md §8.1: "motion that repeats is the point." A hand-rolled
// CSS-animation stand-in for the vendored React Bits marquee (deferred —
// see docs/tasks/TASK-scaffold-e-fase-0.md); same brand fact, same
// behaviour, none of the vendoring yet. Static on its first frame under
// `prefers-reduced-motion` (§7.7).
export function MarquiseCondicao() {
  const texto = campanha.condicao;
  return (
    <div className="overflow-hidden border-y border-washi/20 py-3" aria-hidden={false}>
      <div className="flex w-max motion-safe:animate-[marquise_28s_linear_infinite]">
        {[0, 1].map((rep) => (
          <p
            key={rep}
            className="shrink-0 whitespace-nowrap px-6 text-washi uppercase"
            style={{ fontSize: "clamp(0.7rem, 1.6vw, 0.95rem)", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            {texto} &nbsp;&nbsp;•&nbsp;&nbsp; {texto}
          </p>
        ))}
      </div>
    </div>
  );
}

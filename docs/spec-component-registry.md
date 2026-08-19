# Component registry — scene → library mapping

> Vendored into `src/components/{bits,magic,21st}/`. Restyle through Oishi tokens only.
> Full scene context: `spec-reference-scenes.md`.

| Scene | Layer | Library | Component | Source URL | Vendored path | Status |
|---|---|---|---|---|---|---|
| 0 | JP/EN copy fade | Magic UI | Blur Fade | https://magicui.design/docs/components/blur-fade | `src/components/magic/blur-fade.tsx` | done |
| 0 | Bottom lockup | 21st | Lockup logo block | https://21st.dev/ | `src/components/21st/lockup-logo.tsx` | done |
| 0 | Ink dissolve | hand + Motion | Tinta | `spec-design.md` §7.6 | `src/components/cena/tinta.tsx` | done |
| 1 | Media crossfade | hand | HeroiMidiaDissolve | — | `src/components/cena/heroi-midia-dissolve.tsx` | done |
| 1 | Media crossfade (legacy) | React Bits | MorphSlider | https://reactbits.dev/ | `src/components/bits/morph-slider.tsx` | replaced |
| 1 | Film grain | Magic UI | Noise Texture | https://magicui.design/docs/components/noise-texture | `src/components/magic/noise-texture.tsx` | done |
| 1 | Title reveal | Magic UI | Blur Fade | https://magicui.design/docs/components/blur-fade | `src/components/magic/blur-fade.tsx` | done |
| 2 | Hero inset | GSAP | ScrollTrigger M1 | — | `src/lib/motion/usar-scrub.ts` | done |
| 3 | Word drift | Magic UI | Scroll Based Velocity | https://magicui.design/docs/components/scroll-based-velocity | pending | |
| 3 | Panels | Magic UI | Blur Fade + Lens | https://magicui.design/docs/components/lens | pending | |
| 5 | Map | Magic UI | Dotted Map | https://magicui.design/docs/components/dotted-map | pending | |
| 5 | Headline | Magic UI | Line Shadow Text | https://magicui.design/docs/components/line-shadow-text | pending | |
| 7 | Page transition | React Bits | ink / splash (TBD) | https://reactbits.dev/ | pending | |
| 9 | Price count | Magic UI | Number Ticker | https://magicui.design/docs/components/number-ticker | pending | |
| 9 | Condition | React Bits | Marquee | https://reactbits.dev/ | pending | |
| 9 | Tier list | Magic UI | Animated List | https://magicui.design/docs/components/animated-list | pending | |
| 10 | Title band | Magic UI | Marquee + Noise | https://magicui.design/docs/components/marquee | pending | |
| 11 | Footer type | Magic UI | Line Shadow Text | https://magicui.design/docs/components/line-shadow-text | pending | |

## Install workflow

1. Find component on [reactbits.dev](https://reactbits.dev/), [magicui.design/docs/components](https://magicui.design/docs/components), or [21st.dev](https://21st.dev/).
2. Copy source into the folder above; log in that folder's `SOURCES.md`.
3. Wrap in `cena/*` or `marca/*` shell; never import lib paths from `page.tsx`.
4. Token overrides in `globals.css` / `@theme` only — not inline reference hex.

## Removed / demoted

| Was | Reason |
|---|---|
| `texto-dividido.tsx` on scroll sections | One-shot entrance fights scroll-scrub reference |
| Sticky bordered header on `/` | Reference uses transparent overlay nav |
| `spec-design.md` §8.1 three-component cap | Replaced by this registry |

## JS budget note

Target `/` gzip JS: **measure after Scene 1 ships** (expect 280–350 KB vs old 210 KB).
`/cardapio` stays lean — Marquee + image trail only.

# Magic UI — vendored components

Restyled through Oishi tokens only. Registry: https://magicui.design/docs/components

| File | Component | Source | Date |
|---|---|---|---|
| `blur-fade.tsx` | Blur Fade | https://magicui.design/docs/components/blur-fade | 2026-08-18 |
| `noise-texture.tsx` | Noise Texture | https://magicui.design/docs/components/noise-texture | 2026-08-18 |
| `letras-reveladas.tsx` | Text Animate (`by="character"`, `slideUp`-family) | https://magicui.design/docs/components/text-animate | 2026-08-18 |

Updated 2026-08-18 — Scene 0–2 implementation. `letras-reveladas.tsx` is an adaptation, not
a byte-identical copy: per-character `overflow-hidden` mask + `y`/`opacity` reveal (own
technique) instead of upstream's `staggerChildren` variants API — same underlying
mechanics (transform + opacity only, no filter/blur), verified against the real source at
`apps/www/registry/magicui/text-animate.tsx` in the `magicuidesign/magicui` GitHub repo.

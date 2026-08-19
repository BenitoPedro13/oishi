# shadcn / vendored UI — SOURCES.md

| Component | Source | sha256 | Added for |
|---|---|---|---|
| `sheet.tsx` | `pnpm dlx shadcn@latest add sheet` | `a8ff25079c1167230fc3a9ddce881a8fb24f8ebb1eecbc8189c7f1cf242018df` | mobile nav drawer, `TASK-hero-mobile.md` |
| `button.tsx` | `pnpm dlx shadcn@latest add sheet` (pulled in as a dependency of `sheet.tsx`) | `d14549ab3ba7a9d5d1f424c2599233bffa0b317121abf3b6efa2fb902d5e2781` | `sheet.tsx`'s close button |

Both vendored byte-identical, unmodified. Restyled only through the `className` prop at
each call site (Oishi's tokens, not shadcn's generic `--popover`/`--foreground` palette) —
`AGENTS.md` "shadcn and React Bits are vendored byte-identical... restyle only through
tokens."

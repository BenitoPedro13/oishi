// 味 (aji) and the hinomaru disc — THE only source. Header, favicon,
// apple-icon and OG card all import this file. spec-design.md §3.1, §3.2;
// AGENTS.md rule 8: "味 is SVG from marca-paths.ts, never a typed character."
//
// The logo's own kanji (references/instagram/logo.jpg) is drawn interlocked
// with the shrimp/koi line art around and through it — there is no clean
// edge to trace it from that file without also tracing fish whiskers. So
// this path is not autotraced from the photograph; it is the real 味 glyph
// outline, extracted from the same Shippori Mincho face already chosen for
// every other Japanese character on the site (spec-design.md §6.1), via:
//
//   curl "https://fonts.googleapis.com/css2?family=Shippori+Mincho&text=%E5%91%B3"
//   → the single-glyph woff/ttf it points at
//   → fontTools SVGPathPen against U+5473
//
// Correct by construction (it is the actual glyph outline, not a hand
// guess at CJK strokes) and immune to FOUT/recolour bugs, which is the
// whole reason rule 8 exists. Still reviewed under §6.4's native-reader
// check before launch, same as every other glyph on the allow-list.

/** Font-unit bounding box of the traced 味 glyph — used as the viewBox. */
export const AJI_VIEWBOX = "79 -76 878 908";

/**
 * The 味 glyph path, in its native (y-up) font-unit space. Flip it into
 * screen space with `transform="matrix(1 0 0 -1 0 0)"` on the *outer*
 * group — never bake a flip into the `d` string itself, so this stays a
 * faithful copy of the source outline.
 */
export const AJI_PATH =
  "M833 447Q837 452 843.5 461.0Q850 470 854.0 474.5Q858 479 862 479Q868 479 888.5 462.5Q909 446 927.0 427.0Q945 408 945 401Q942 385 920 385H678Q722 281 798.0 193.5Q874 106 957 61L955 50Q935 47 919.5 32.5Q904 18 896 -6Q819 55 758.0 152.0Q697 249 660 373V188Q662 64 668 -47Q662 -58 644.5 -67.0Q627 -76 609 -76Q600 -76 593.5 -70.0Q587 -64 587 -56Q591 -4 593.5 46.0Q596 96 597 172V297Q483 91 244 -23L234 -8Q349 62 432.5 163.0Q516 264 562 385H498Q442 384 382 371L357 423Q412 417 490 415H597V597H528Q468 596 404 583L379 633Q434 627 512 625H597V627Q597 753 584 832Q641 815 663.5 805.5Q686 796 686 789Q686 784 677 779L660 768V625H776L798 657Q802 662 808.5 671.0Q815 680 819.0 684.5Q823 689 827 689Q833 689 854.0 673.0Q875 657 893.0 638.5Q911 620 911 613Q907 597 885 597H660V415H811ZM291 721Q294 725 301.0 734.5Q308 744 314 744Q320 744 338.0 730.0Q356 716 371.0 699.5Q386 683 386 676Q376 662 345 656V398Q347 274 353 163Q345 153 327.5 143.0Q310 133 295 133Q289 133 285.5 139.0Q282 145 282 153Q282 155 286 194V225H152V185Q153 172 153 152L156 111Q153 101 137.0 91.5Q121 82 103 82Q95 82 88.0 88.0Q81 94 81 102Q85 161 88.0 216.5Q91 272 92 362V529Q92 655 79 734L156 698H276ZM286 255V669H152V255Z";

/** The hinomaru's real vertical graduation, sampled with ffmpeg from logo.jpg. */
export const HINOMARU_GRADIENT_STOPS: [offset: number, color: string][] = [
  [0, "#9A1114"],
  [0.55, "#C6151B"],
  [1, "#E71B23"],
];

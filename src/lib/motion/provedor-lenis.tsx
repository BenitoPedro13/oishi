"use client";

import type { ReactNode } from "react";
import { usarLenis } from "./usar-lenis";

export function ProvedorLenis({ children }: { children: ReactNode }) {
  usarLenis();
  return <>{children}</>;
}

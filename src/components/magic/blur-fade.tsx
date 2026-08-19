"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inView?: boolean;
  /** When false, holds the hidden initial state until flipped (loader gate). */
  ativar?: boolean;
  /** CSS blur is expensive on large type — off for hero entrances. */
  desfocar?: boolean;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 8,
  inView = true,
  ativar = true,
  desfocar = true,
}: BlurFadeProps) {
  const reduzido = useReducedMotion();

  if (reduzido) {
    return <div className={className}>{children}</div>;
  }

  const hidden = desfocar
    ? { opacity: 0, filter: "blur(8px)", y: yOffset }
    : { opacity: 0, y: yOffset };
  const shown = desfocar ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={inView ? hidden : false}
      animate={!ativar ? hidden : inView ? shown : hidden}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

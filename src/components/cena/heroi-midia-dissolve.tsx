"use client";

import { useEffect, useState } from "react";

export type HeroFoto = {
  image: string;
  focalX?: number;
  focalY?: number;
};

interface HeroiMidiaDissolveProps {
  fotos: HeroFoto[];
  reducedMotion?: boolean;
  intervalMs?: number;
  crossfadeMs?: number;
}

export function HeroiMidiaDissolve({
  fotos,
  reducedMotion = false,
  intervalMs = 5800,
  crossfadeMs = 1200,
}: HeroiMidiaDissolveProps) {
  const [indice, setIndice] = useState(0);
  const [validas, setValidas] = useState<HeroFoto[]>([]);

  useEffect(() => {
    let cancelado = false;
    Promise.all(
      fotos.map(
        (foto) =>
          new Promise<HeroFoto | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(foto);
            img.onerror = () => resolve(null);
            img.src = foto.image;
          }),
      ),
    ).then((results) => {
      if (!cancelado) setValidas(results.filter((f): f is HeroFoto => f !== null));
    });
    return () => {
      cancelado = true;
    };
  }, [fotos]);

  useEffect(() => {
    if (reducedMotion || validas.length < 2) return;
    const id = window.setInterval(() => {
      setIndice((atual) => (atual + 1) % validas.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, validas.length, intervalMs]);

  if (validas.length === 0) return null;

  const atual = validas[indice % validas.length];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {validas.map((foto, i) => (
        <div
          key={foto.image}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${foto.image})`,
            backgroundPosition: `${foto.focalX ?? 50}% ${foto.focalY ?? 50}%`,
            opacity: i === indice ? 1 : 0,
            zIndex: i === indice ? 1 : 0,
            transition: reducedMotion ? undefined : `opacity ${crossfadeMs}ms ease-in-out`,
          }}
        />
      ))}

      <img src={atual.image} alt="" className="hidden" fetchPriority="high" />
    </div>
  );
}

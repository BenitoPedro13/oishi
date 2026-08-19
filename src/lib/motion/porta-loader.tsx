"use client";

import * as React from "react";

type PortaLoaderContextValue = {
  liberado: boolean;
  liberar: () => void;
};

const PortaLoaderContext = React.createContext<PortaLoaderContextValue>({
  liberado: false,
  liberar: () => {},
});

export function ProvedorPortaLoader({ children }: { children: React.ReactNode }) {
  const [liberado, setLiberado] = React.useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    if (sessionStorage.getItem("oishi:loader-visto")) return true;
    return false;
  });
  const liberar = React.useCallback(() => setLiberado(true), []);

  return (
    <PortaLoaderContext.Provider value={{ liberado, liberar }}>{children}</PortaLoaderContext.Provider>
  );
}

export function usePortaLoader() {
  return React.useContext(PortaLoaderContext);
}

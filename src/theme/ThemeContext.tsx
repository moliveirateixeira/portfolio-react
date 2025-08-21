import React, { createContext, useContext, useEffect, useMemo, useState} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Lê tema inicial:
 * 1) localStorage ("light" | "dark"), senão
 * 2) preferência do sistema (prefers-color-scheme: light), senão
 * 3) "dark"
 */

function getInitialTheme(): Theme {
    try {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if( storedTheme === "light" || storedTheme === "dark") return storedTheme; 
    } catch {
        // Se falhar ao ler localStorage, ignora
    }
    if (typeof window !== "undefined" && window.matchMedia) {
        const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        return systemPrefersLight ? "light" : "dark";
    }
    return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme());

    // Aplica classe no body e persiste
    useEffect(() => {
        const body = document.body;
        if (theme === "light") {
            body.classList.add("light")
    } else {
            body.classList.remove("light");
    } try{
            localStorage.setItem("theme", theme);
    } catch {
    }
}, [theme]);

// Opcional: escutar mudança do sistema em tempo real
useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
        const saved = (() => {
            try {
                return localStorage.getItem("theme") as Theme | null;
            } catch {
                return null;
            }
        })();
        // Só segue o sistema se não houver escolha explícita salva
        if (!saved) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
}, []);

const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

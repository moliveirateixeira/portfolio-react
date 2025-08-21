// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Para GitHub Pages (Project Pages): base = "/<repo>/"
  base: "moliveirateixeira",
  build: {
    outDir: "dist",     // padrão do Vite (explícito aqui)
    assetsDir: "assets",// subpasta para assets
    emptyOutDir: true,  // limpa dist/ antes de cada build
    sourcemap: false    // true se quiser depurar no Pages (opcional)
  },
});

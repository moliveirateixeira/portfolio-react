// src/App.tsx
import React from "react";

import Intro from "./components/Intro";
import ThemeToggle from "./components/ThemeToggle";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import { ThemeProvider } from "./theme/ThemeContext";


function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      {/* Botao para alterar tema */}
      <ThemeToggle />

      {/* Componente de introdução */}
      <Intro />
      {/* Componentes de Projetos */}
      <Projects />
      {/* Componente de Serviços */}
      <Services />
    </ThemeProvider>
  );
}

export default App;

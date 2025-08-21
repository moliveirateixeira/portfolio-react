// src/App.tsx
import React from "react";
import { ThemeProvider } from "./theme/ThemeContext";
import Projects from "./sections/Projects";
import ThemeToggle from "./components/ThemeToggle";
import Intro from "./components/Intro";
import Services from "./sections/Services";


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

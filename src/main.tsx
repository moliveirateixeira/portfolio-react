import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import App from "./App";

// Renderiza o App na div#root
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


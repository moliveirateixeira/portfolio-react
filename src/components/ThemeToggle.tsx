import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "../theme/ThemeContext";

/**
 * Botão de alternância de tema
 * - id e classe iguais aos originais para aproveitar o CSS: #theme-toggle.theme-toggle
 * - Acessível com aria-label e aria-pressed
 */

export default function ThemeToggle() {
   const { theme , toggle } = useTheme();

    return (
        <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={toggle}
            type="button"
        >
            {theme === "light" ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
        </button>
    );
}
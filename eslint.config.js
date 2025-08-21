// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

// Limita todas as configs type-checked para TS/TSX e injeta parserOptions.project
const tsTypeChecked = tseslint.configs.recommendedTypeChecked.map((cfg) => ({
  ...cfg,
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ...(cfg.languageOptions ?? {}),
    parserOptions: {
      ...(cfg.languageOptions?.parserOptions ?? {}),
      project: ["./tsconfig.json"],
      tsconfigRootDir: import.meta.dirname,
    },
    globals: { ...globals.browser, ...globals.node },
  },
}));

export default [
  // Ignorar build/deps
  { ignores: ["dist", "build", "node_modules"] },

  // Regras JS aplicadas APENAS a arquivos .js/.cjs/.mjs (não encostam em TS)
  { files: ["**/*.{js,cjs,mjs}"], ...js.configs.recommended },

  // Regras TS com type-check, agora ESCOPO TS/TSX
  ...tsTypeChecked,

  // Camada do projeto para TS/TSX: React, Hooks, import/order, ajustes TS
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks, import: importPlugin },
    settings: { react: { version: "detect" } },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Import order
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true },
          "groups": [["builtin", "external"], ["internal"], ["parent", "sibling", "index"]],
        },
      ],
      // TS
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
    },
  },

  // Prettier por último (ok aplicar globalmente)
  prettier,
];

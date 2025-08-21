// eslint.config.js (Flat Config)
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  // 1) Ignorar pastas de build e deps
  { ignores: ["dist", "build", "node_modules"] },

  // 2) Regras base JS
  js.configs.recommended,

  // 3) Regras TS com type-check (requer tsconfig.json)
  ...tseslint.configs.recommendedTypeChecked,

  // 4) Camada do projeto (linguagem, plugins, regras)
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],     // habilita type-aware rules
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    settings: {
      react: { version: "detect" }, // detecta versão do React
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off", // React 17+
      "react/jsx-uses-react": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import order para difs limpos
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true },
          "groups": [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"]
          ]
        }
      ],

      // Pequenos ajustes TS
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
    },
  },

  // 5) Desativa regras que conflitam com o Prettier
  prettier,
];

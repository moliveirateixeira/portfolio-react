# Portfólio em React + TypeScript (Vite)

> Migração completa de um site estático (HTML/CSS/JS) para **React 18 + TypeScript**, com **Vite**, **ESLint (Flat Config)**, **Prettier**, alternância de tema (light/dark), seções **Intro / Projects / Services / Skills**, e guia didático de React no próprio README.

---

## Índice

* [1. Sobre o projeto](#1-sobre-o-projeto)
* [2. Stack e decisões técnicas](#2-stack-e-decisões-técnicas)
* [3. Estrutura de pastas](#3-estrutura-de-pastas)
* [4. Como rodar localmente](#4-como-rodar-localmente)
* [5. Qualidade de código (ESLint + Prettier)](#5-qualidade-de-código-eslint--prettier)
* [6. Tema (ThemeProvider + Toggle)](#6-tema-themeprovider--toggle)
* [7. Seções migradas e componentes](#7-seções-migradas-e-componentes)
* [8. Assets e compatibilidade com GitHub Pages](#8-assets-e-compatibilidade-com-github-pages)
* [9. Deploy (GitHub Pages via Actions)](#9-deploy-github-pages-via-actions)
* [10. Alternativas de hospedagem](#10-alternativas-de-hospedagem)
* [11. Aprendendo React com este projeto (guia rápido)](#11-aprendendo-react-com-este-projeto-guia-rápido)
* [12. Troubleshooting (erros comuns)](#12-troubleshooting-erros-comuns)
* [13. Roadmap](#13-roadmap)

---

## 1. Sobre o projeto

**Objetivo:** transformar um site estático em uma aplicação moderna usando **React + TypeScript**, mantendo o visual original e preparando a base para escala, reutilização e testes.

**Antes**: `index.html`, `style.css`, `script.js` controlando tema e marcações fixas.

**Depois**: aplicação React com componentização, estados, contexto, tipagem estrita e estrutura clara de pastas. As seções foram migradas e os dados isolados em módulos TypeScript.

---

## 2. Stack e decisões técnicas

* **Build**: [Vite](https://vitejs.dev/) (DX rápida, HMR, setup simples).
* **Linguagem**: **TypeScript** com `strict: true` e flags para segurança em tempo de desenvolvimento.
* **Qualidade**: ESLint (Flat Config) + Prettier + `import/order`.
* **UI**: CSS(`src/styles.css`). Ícones via `@phosphor-icons/react` (componentes `*Icon`).
* **Arquitetura React**: composição, **Context** para tema, componentes de apresentação vs containers, dados em módulos TS (`src/data/*`).
* **Deploy**: GitHub Pages com `vite.config.ts: base` e helper de assets.

**Trade-offs principais**

* Manter CSS existente acelera migração (menos refactor visual) e permite introduzir Tailwind/Design System depois.
* `Context` para tema evita prop drilling e centraliza a fonte da verdade.
* Dados em TS (não em JSON) dão tipagem forte e auto-complete em IDE.

---

## 3. Estrutura de pastas

```
.
├─ index.html
├─ vite.config.ts
├─ eslint.config.js
├─ tsconfig.json
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ styles.css                # CSS migrado
│  ├─ lib/
│  │  └─ asset.ts               # helper para BASE_URL (GH Pages)
│  ├─ theme/
│  │  └─ ThemeContext.tsx       # Context + Hook do tema
│  ├─ components/
│  │  ├─ ThemeToggle.tsx
│  │  ├─ Intro.tsx
│  │  ├─ ProjectCard.tsx
│  │  └─ Tags.tsx
│  ├─ sections/
│  │  ├─ Projects.tsx
│  │  └─ Services.tsx
│  └─ data/
│     ├─ projects.ts
│     ├─ services.ts
│     └─ tags.ts
└─ public/
   └─ assets/                   # imagens e SVGs
```

---

## 4. Como rodar localmente

**Pré-requisitos**: Node.js ≥ 18 (LTS) e npm ≥ 9.

```bash
npm install
npm run dev       # inicia servidor Vite (desenvolvimento)

npm run lint      # checa qualidade de código (ESLint)
npm run build     # build de produção (dist/)
npm run preview   # serve a pasta dist para conferência local
```

---

## 5. Qualidade de código (ESLint + Prettier)

> Projeto usa **Flat Config** (`eslint.config.js`) com `typescript-eslint` (type-checked) e `eslint-config-prettier`.

Exemplo (trecho relevante):

```js
// eslint.config.js (trecho)
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "build", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { project: ["./tsconfig.json"], tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, "react-hooks": reactHooks, import: importPlugin },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": ["warn", { "newlines-between": "always", "alphabetize": { order: "asc", caseInsensitive: true } }],
      "@typescript-eslint/consistent-type-imports": ["warn", { fixStyle: "inline-type-imports" }],
    },
  },
  prettier,
];
```

**Prettier**: `.prettierrc` com largura de linha, aspas, ponto-e-vírgula etc.

---

## 6. Tema (ThemeProvider + Toggle)

Implementamos um **Context** para gerenciar **light/dark**, sincronizando com `localStorage` e `prefers-color-scheme`. O `<body>` recebe a classe `light` (o CSS já tem variáveis e overrides prontos).

**`src/theme/ThemeContext.tsx` (essencial):**

```tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = { theme: Theme; toggle: () => void };
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  const systemPrefersLight = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches;
  return systemPrefersLight ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
```

**`src/components/ThemeToggle.tsx`:**

```tsx
import React from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const ariaLabel = theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro";
  const ariaPressed = theme === "light";
  return (
    <button id="theme-toggle" className="theme-toggle" aria-label={ariaLabel} aria-pressed={ariaPressed} onClick={toggle} type="button">
      {theme === "light" ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
    </button>
  );
}
```

---

## 7. Seções migradas e componentes

### Intro

`src/components/Intro.tsx` mantém classes/estrutura, adicionando **Tags** abaixo do texto.

```tsx
import React from "react";
import Tags from "./Tags";
import { asset } from "../lib/asset";

export default function Intro() {
  return (
    <section id="intro" className="section">
      <div className="container intro__wrap">
        <div className="intro__media">
          <img src={asset("assets/avatar.png")} alt="Avatar de Marcos Teixeira" />
        </div>
        <div className="intro__text">
          <p className="eyebrow">Hello World! Meu nome é <span className="hl">Marcos Teixeira</span> e sou</p>
          <h1 className="intro__title">Engenheiro <span className="nowrap">Fullstack</span></h1>
          <p className="intro__desc">Transformo necessidades em aplicações reais, evolventes e funcionais...</p>
          <Tags />
        </div>
      </div>
    </section>
  );
}
```

### Projects

Dados tipados em `src/data/projects.ts` e card de apresentação em `src/components/ProjectCard.tsx`.

```ts
// src/data/projects.ts (trecho)
import { asset } from "../lib/asset";
export type Project = { title: string; desc: string; imageSrc: string; imageAlt: string; href?: string };
export const projects: Project[] = [
  { title: "Devlinks", desc: "Agregador de Links...", imageSrc: asset("assets/Thumbnail_Project-01.png"), imageAlt: "Preview Travelgram", href: "https://..." },
  // ... demais itens
];
```

```tsx
// src/components/ProjectCard.tsx (trecho)
import React from "react";
import type { Project } from "../data/projects";
export function ProjectCard({ title, desc, imageSrc, imageAlt, href }: Project) {
  const content = (<>
    <img className="project-card__thumb" src={imageSrc} alt={imageAlt} />
    <div className="project-card__body"><h3 className="project-card__title">{title}</h3><p className="project-card__desc">{desc}</p></div>
  </>);
  return <article className="project-card">{href ? <a className="project-card__link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title} (abre em nova aba)`}>{content}</a> : content}</article>;
}
```

### Services

Renomeamos a propriedade de dados **`key` → `icon`** para evitar conflito com a prop reservada **`key`** do React.

```ts
// src/data/services.ts (trecho)
export type ServiceKey = "devices" | "hard-drives" | "infinity";
export type Service = { icon: ServiceKey; title: string; desc: string };
export const services: Service[] = [
  { icon: "devices", title: "Websites e Aplicativos", desc: "Desenvolvimento de interfaces." },
  { icon: "hard-drives", title: "API e banco de dados", desc: "Criação de serviços do sistema." },
  { icon: "infinity", title: "DevOps", desc: "Gestão e infraestrutura da aplicação." },
];
```

```tsx
// src/components/ServiceCard.tsx (trecho)
import React from "react";
import type { Service, ServiceKey } from "../data/services";
import { DevicesIcon, HardDrivesIcon, InfinityIcon } from "@phosphor-icons/react";
const ICONS: Record<ServiceKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "devices": DevicesIcon, "hard-drives": HardDrivesIcon, "infinity": InfinityIcon,
};
export function ServiceCard({ icon, title, desc }: Service) {
  const Icon = ICONS[icon];
  return (<div className="service-card"><Icon aria-hidden="true" /><h3>{title}</h3><p>{desc}</p></div>);
}
```

### Skills/Tags

```ts
// src/data/tags.ts (trecho)
import { asset } from "../lib/asset";
export type TagItem = { label: string; iconSrc: string };
export const tags: TagItem[] = [
  { label: "GitHub",     iconSrc: asset("assets/GitHub.svg") },
  { label: "HTML",       iconSrc: asset("assets/HTML.svg") },
  { label: "CSS",        iconSrc: asset("assets/CSS.svg") },
  { label: "JavaScript", iconSrc: asset("assets/JavaScript.svg") },
  { label: "React",      iconSrc: asset("assets/React.svg") },
  { label: "Node.js",    iconSrc: asset("assets/Node.js.svg") },
];
```

```tsx
// src/components/Tags.tsx (trecho)
import React from "react";
import { tags } from "../data/tags";
export default function Tags() {
  return (
    <div id="tags" className="tags">
      {tags.map(t => (
        <div key={t.label} className="tag">
          <img src={t.iconSrc} alt="" />
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## 8. Assets e compatibilidade com GitHub Pages

Para funcionar em **Project Pages** (URL: `https://usuario.github.io/REPO/`), precisamos prefixar os assets com a `base` do Vite. Criamos um helper:

```ts
// src/lib/asset.ts
export function asset(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${trimmed}`;
}
```

E ajustamos **`vite.config.ts`**:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], base: "/REPO_NAME/" }); // troque pelo nome do seu repositório
```

> Se publicar como **User/Org Page** (`usuario.github.io`), use `base: "/"`.

---

## 9. Deploy (GitHub Pages via Actions)

Workflow em `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: |
          npm run lint
          npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Configurar no GitHub**: *Settings → Pages* → `Build and deployment: GitHub Actions`.

**Opcional (SPA 404)**: adicione `public/404.html` com redirect para `index.html` se usar rotas client-side.

---

## 10. Alternativas de hospedagem

* **Vercel**: importe o repositório; Framework: *Vite*; Build: `npm run build`; Output: `dist/`.
* **Netlify**: Build: `npm run build`; Publish dir: `dist/`. Para SPA, use `public/_redirects` com `/*  /index.html  200`.
* **Cloudflare Pages**: Build: `npm run build`; Output: `dist/`; habilite SPA fallback (ou `_redirects`).

---

## 11. Aprendendo React com este projeto (guia rápido)

### 11.1 JSX e componentes funcionais

JSX é açúcar sintático para `React.createElement`. Um **componente** é uma função que retorna JSX:

```tsx
function Hello({ name }: { name: string }) {
  return <h2>Olá, {name}!</h2>;
}
```

### 11.2 Props tipadas (TypeScript)

```tsx
type ProjectProps = { title: string; desc: string };
function ProjectHeading({ title, desc }: ProjectProps) {
  return (<header><h3>{title}</h3><p>{desc}</p></header>);
}
```

### 11.3 Estado e efeitos (Hooks)

```tsx
import { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return <button onClick={() => setCount(c => c + 1)}>Cliquei {count}x</button>;
}
```

### 11.4 Context (estado global leve)

Usamos Context no **tema**: `ThemeProvider` fornece `{ theme, toggle }` a qualquer componente via `useTheme()`.

**Boas práticas**: use Context para estado *realmente* compartilhado (tema, auth, i18n). Evite para estados locais.

### 11.5 Composição e separação de responsabilidades

* **Apresentação** (visual puro): `ProjectCard`, `Tags`.
* **Containers/Sections** (coordenação/dados): `Projects`, `Services`.
* Benefícios: reuso, testes simples, manutenção fácil.

### 11.6 Performance

* Evite `useMemo`/`useCallback` prematuros; use quando um cálculo pesado ou referência estável for necessário.
* Componentize com parcimônia; imagens otimizadas.

### 11.7 Testes (sugestão)

* **React Testing Library + Vitest**: render de `Projects` e assert da quantidade de cards; snapshot opcional.

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

---

## 12. Troubleshooting (erros comuns)

* **Cannot find namespace `JSX`**: garanta `@types/react` e `@types/react-dom` instalados; em `tsconfig.json`, não restrinja `compilerOptions.types` (ou inclua `"react"`, `"react-dom"`).
* **`key` duplicada ao usar `<ServiceCard key={...} {...s} />`**: renomeie o campo de dados `key → icon` para não conflitar com a prop reservada `key` do React.
* **Phosphor ícones deprecados (`MoonStars`, `SunDim`)**: use os novos nomes com sufixo `Icon` (ex.: `MoonIcon`, `SunIcon`).
* **Assets quebrados no GitHub Pages**: configure `vite.config.ts: base` para `"/NOME_DO_REPO/"` e use o helper `asset()` ao referenciar imagens de `public/`.

---

## 13. Roadmap

* [ ] Criar **CI** para lint + build em PR.
* [ ] Transformar dados em fonte externa (CMS/JSON) e criar hooks de carga.
* [ ] Otimizar imagens e adicionar `loading="lazy"` quando aplicável.

---

**Autor**: Marcos Teixeira

> Dúvidas, melhorias ou bugs? Abra uma *issue* ou envie um *pull request*. Este README também serve como trilha de aprendizado: leia os trechos de código, rode os scripts e explore as seções para consolidar os conceitos de React + TypeScript.

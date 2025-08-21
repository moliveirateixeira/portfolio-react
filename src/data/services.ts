// src/data/services.ts
export type ServiceKey = "devices" | "hard-drives" | "infinity";

export type Service = {
  icon: ServiceKey;      // usado para mapear o ícone
  title: string;
  desc: string;
};

export const services: Service[] = [
  { icon: "devices",     title: "Websites e Aplicativos", desc: "Desenvolvimento de interfaces." },
  { icon: "hard-drives", title: "API e banco de dados",   desc: "Criação de serviços do sistema." },
  { icon: "infinity",    title: "DevOps",                 desc: "Gestão e infraestrutura da aplicação." },
];

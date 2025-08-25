import { asset } from "../lib/asset";// Tipo para um projeto
export type Project = {
  id: string;
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt: string;
  href?: string; // opcional: alguns cards não têm link no HTML original
};

// Array de projetos — espelha o seu index.html (seção PROJETOS)
export const projects: Project[] = [
  {
    id: "devlinks",
    title: "Devlinks",
    desc: "Agregador de Links(Temos o acesso aos códigos dos projetos por aqui).",
    imageSrc: asset("/assets/Thumbnail_Project-01.png"),
    imageAlt: "Preview Travelgram",
    href: "https://moteixeira.github.io/devlink/#",
  },
  // {
  //   title: "Tech News",
  //   desc: "Homepage de um portal de notícias sobre a área de tecnologia.",
  //   imageSrc: "/assets/Thumbnail_Project-02.png",
  //   imageAlt: "Preview Tech News",
  // },
  // {
  //   title: "Página de receita",
  //   desc: "Página com o passo a passo de uma receita.",
  //   imageSrc: "/assets/Thumbnail_Project-03.png",
  //   imageAlt: "Preview Página de receita",
  // },
  // {
  //   title: "Zingen",
  //   desc: "Landing Page completa e responsiva de um aplicativo de Karaokê.",
  //   imageSrc: "/assets/Thumbnail_Project-04.png",
  //   imageAlt: "Preview Zingen",
  // },
  // {
  //   title: "Refund",
  //   desc: "Um sistema para pedido e acompanhamento de reembolso.",
  //   imageSrc: "/assets/Thumbnail_Project-05.png",
  //   imageAlt: "Preview Refund",
  // },
  // {
  //   title: "Página de turismo",
  //   desc: "Página com as principais informações para quem quer viajar.",
  //   imageSrc: "/assets/Thumbnail_Project-06.png",
  //   imageAlt: "Preview Página de turismo",
  // },
];

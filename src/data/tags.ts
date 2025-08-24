import { asset } from "../lib/asset";

export type TagItem = {
  label: string;
  iconSrc: string; // caminho em /public/assets
};

export const tags: TagItem[] = [
  { label: "GitHub",     iconSrc: asset("/assets/GitHub.svg") },
  { label: "HTML",       iconSrc: asset("/assets/HTML.svg") },
  { label: "CSS",        iconSrc: asset("/assets/CSS.svg") },
  { label: "JavaScript", iconSrc: asset("/assets/JavaScript.svg") },
  { label: "React",      iconSrc: asset("/assets/React.svg") },
  { label: "Node.js",    iconSrc: asset("/assets/Node.js.svg") },
  { label: "Typescript",    iconSrc: asset("/assets/Typescript.svg") }
];

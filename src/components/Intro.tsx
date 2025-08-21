import Tags from "./Tags";
import { asset } from "../lib/asset";

/**
 * Intro (Hero) — replica o bloco do HTML original
 * - Reutiliza classes para manter estilos
 * - As imagens vêm de /public/assets/*
 */
export default function Intro() {
  return (
    <section id="intro" className="section">
      <div className="container intro__wrap">
        <div className="intro__media">
          <img src={asset("/assets/avatar.png")} alt="Avatar de Marcos Teixeira" />
        </div>

        <div className="intro__text">
          <p className="eyebrow">
            Hello World! Meu nome é <span className="hl">Marcos Teixeira</span> e sou
          </p>
          <h1 className="intro__title">
            Engenheiro <span className="nowrap">Fullstack</span>
          </h1>
          <p className="intro__desc">
            Transformo necessidades em aplicações reais, evolventes e funcionais. Desenvolvo sistemas
            através da minha paixão por tecnologia, contribuindo com soluções inovadoras e eficazes
            para desafios complexos.
          </p>
          <Tags />
        </div>
      </div>
    </section>
  );
}

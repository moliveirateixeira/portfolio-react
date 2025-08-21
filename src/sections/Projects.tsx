
import { projects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

/**
 * Seção de Projetos
 * - Replica o header e a grid do HTML original
 * - Usa ProjectCard para cada item do array
 */
export default function Projects() {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Meu trabalho</p>
          <h2 className="section__title">Veja os projetos em destaque</h2>
        </header>

        <div className="grid projects__grid">
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              desc={p.desc}
              imageSrc={p.imageSrc}
              imageAlt={p.imageAlt}
              href={p.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

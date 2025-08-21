// src/components/ProjectCard.tsx
import React from "react";
import type { Project } from "../data/projects";

/**
 * Card de projeto (somente apresentação)
 * - Mantém classes do HTML original para reaproveitar o CSS existente
 * - Se "href" vier definido, envolve o conteúdo em <a class="project-card__link" ...>
 */
export function ProjectCard({ title, desc, imageSrc, imageAlt, href }: Project) {
  const CardContent = (
    <>
      <img className="project-card__thumb" src={imageSrc} alt={imageAlt} />
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{desc}</p>
      </div>
    </>
  );

  return (
    <article className="project-card">
      {href ? (
        <a
          className="project-card__link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </article>
  );
}

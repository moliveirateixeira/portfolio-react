// src/sections/Services.tsx
import React from "react";
import { services } from "../data/services";
import { ServiceCard } from "../components/ServiceCard";

/**
 * Seção "Meus serviços" — mantém estrutura/classe do HTML:
 *  <section id="services" class="section">
 *    <div class="container">
 *      <header class="section__head"> ... </header>
 *      <div class="grid services__grid"> ...cards... </div>
 *    </div>
 *  </section>
 */
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">Meus serviços</p>
          <h2 className="section__title">Como posso ajudar o seu negócio</h2>
        </header>

        <div className="grid services__grid">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

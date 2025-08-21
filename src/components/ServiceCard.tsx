// src/components/ServiceCard.tsx
import { DevicesIcon, HardDrivesIcon, InfinityIcon } from "@phosphor-icons/react";
import React from "react";

import type { Service, ServiceKey } from "../data/services";

// Mapa de ícones por chave (Phosphor em novo padrão *Icon)
const ICONS: Record<ServiceKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "devices": DevicesIcon,
  "hard-drives": HardDrivesIcon,
  "infinity": InfinityIcon,
};

/**
 * Card de serviço — mantém as classes do HTML original:
 *  - .service-card
 *  - ícone (antes era <i class="ph ...">), agora renderizamos <svg> do Phosphor
 */
export function ServiceCard({ icon, title, desc }: Service) {
  // Seleciona o ícone pelo key
  const Icon = ICONS[icon];

  return (
    <div className="service-card">
      {/* O CSS original estiliza <i>; vamos garantir um estilo compatível para <svg> no Passo 1.4 */}
      <Icon aria-hidden="true" />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

import { tags } from "../data/tags";

/**
 * Lista de tags (skills) — mantém as classes do HTML original:
 *  - container: .tags
 *  - item: .tag  (com <img> e <span>)
 */
export default function Tags() {
  return (
    <div id="tags" className="tags">
      {tags.map((t) => (
        <div key={t.label} className="tag">
          {/* alt vazio porque o texto vem ao lado no <span> (evita redundância ao leitor de tela) */}
          <img src={t.iconSrc} alt="" />
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

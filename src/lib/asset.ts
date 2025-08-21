// Prefixa com o BASE_URL do Vite (ex.: "/REPO_NAME/") para funcionar no GH Pages.
export function asset(path: string): string {
  const trimmed = path.replace(/^\/+/, ""); // remove "/" inicial se houver
  return `${import.meta.env.BASE_URL}${trimmed}`;
}

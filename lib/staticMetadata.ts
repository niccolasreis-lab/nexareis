import { ORIGIN, routeMetadata } from './routeMetadata.ts';
import { socialMetadata } from './socialMetadata.ts';

export const escapeMetaAttribute = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Crawlers receive complete metadata in HTML, before the React application runs. */
export function renderRouteDocument(template: string, path: string) {
  const meta = routeMetadata[path];
  if (!meta) throw new Error(`No public metadata for ${path}`);
  let html = template.replace(/<title>.*?<\/title>/, () => `<title>${escapeMetaAttribute(meta.title)}</title>`);
  for (const [key, value] of Object.entries({ description: meta.description, ...socialMetadata(path, meta) })) {
    const pattern = new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`);
    if (!pattern.test(html)) throw new Error(`Missing metadata placeholder: ${key}`);
    html = html.replace(pattern, (_match, prefix) => prefix + escapeMetaAttribute(value));
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, (_match, prefix) => prefix + ORIGIN + path);
  if (path === '/nicolas-reis') html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, () => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Nícolas Reis', url: ORIGIN + path, jobTitle: 'Encarregado Administrativo' })}</script>`);
  return html;
}

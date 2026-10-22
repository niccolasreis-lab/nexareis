import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { ORIGIN, routeMetadata } from '../lib/routeMetadata.ts';
const template = await readFile('dist/index.html', 'utf8');
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
for (const [path, meta] of Object.entries(routeMetadata)) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`);
  for (const [key, value] of Object.entries({ description: meta.description, 'og:title': meta.title, 'og:description': meta.description, 'og:url': ORIGIN + path, 'twitter:title': meta.title, 'twitter:description': meta.description })) {
    html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), `$1${escape(value)}`);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${ORIGIN + path}`);
  if (path === '/nicolas-reis') html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Nícolas Reis', url: ORIGIN + path, jobTitle: 'Encarregado Administrativo' })}</script>`);
  const directory = path === '/' ? 'dist' : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
console.log(`Static metadata generated for ${Object.keys(routeMetadata).length} routes.`);

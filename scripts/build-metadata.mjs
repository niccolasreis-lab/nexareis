import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { routeMetadata } from '../lib/routeMetadata.ts';
import { renderRouteDocument } from '../lib/staticMetadata.ts';
const template = await readFile('dist/index.html', 'utf8');
for (const path of Object.keys(routeMetadata)) {
  const html = renderRouteDocument(template, path);
  const directory = path === '/' ? 'dist' : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
console.log(`Static metadata generated for ${Object.keys(routeMetadata).length} routes.`);


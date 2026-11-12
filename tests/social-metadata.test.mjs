import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ORIGIN, routeMetadata } from '../lib/routeMetadata.ts';
import { socialMetadata } from '../lib/socialMetadata.ts';
import { renderRouteDocument, escapeMetaAttribute } from '../lib/staticMetadata.ts';
import { socialImages, socialImageForPath } from '../data/socialImages.ts';
import { projectCases } from '../data/projectCases.ts';

const template = await readFile('index.html', 'utf8');
let directory;
const attributes = html => Object.fromEntries([...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)"/g)].map(m => [m[1], m[2]]));
before(async () => {
  directory = await mkdtemp(join(tmpdir(), 'nexareis-social-'));
  await mkdir(join(directory, 'dist'));
  await writeFile(join(directory, 'dist/index.html'), template);
  const result = spawnSync(process.execPath, [resolve('scripts/build-metadata.mjs')], { cwd: directory, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
});
after(async () => { if (directory) await rm(directory, { recursive: true, force: true }); });

test('the real build emits complete sharing HTML without running client JavaScript', async () => {
  for (const [path, meta] of Object.entries(routeMetadata)) {
    const html = await readFile(join(directory, 'dist', path.slice(1), 'index.html'), 'utf8');
    const tags = attributes(html);
    for (const [key, value] of Object.entries(socialMetadata(path, meta))) {
      assert.equal(tags[key], escapeMetaAttribute(value), `${path}: ${key}`);
      assert.equal([...html.matchAll(new RegExp(`<meta (?:name|property)="${key}" `, 'g'))].length, 1, 'one authoritative tag');
    }
    assert.ok(html.includes(`href="${ORIGIN + path}"`));
    assert.ok(html.includes('<div id="root"></div>'), 'metadata must not replace the existing app');
    assert.equal(tags['twitter:card'], 'summary_large_image');
  }
});

test('every project shares its own public PNG and keeps its factual summary', async () => {
  const urls = new Set();
  for (const [id, project] of Object.entries(projectCases)) {
    const path = '/projetos/' + id;
    const html = await readFile(join(directory, 'dist', path.slice(1), 'index.html'), 'utf8');
    const tags = attributes(html);
    assert.equal(tags['og:title'], escapeMetaAttribute(project.name + ' | Projetos Nexa Reis'));
    assert.equal(tags['og:description'], escapeMetaAttribute(project.summary));
    assert.equal(tags['og:image'], ORIGIN + socialImages[id].path);
    assert.equal(tags['og:image:secure_url'], tags['og:image']);
    assert.equal(tags['twitter:image'], tags['og:image']);
    assert.ok(tags['og:image:alt'].includes(project.name.split(' — ')[0]));
    urls.add(tags['og:image']);
  }
  assert.equal(urls.size, 4, 'project previews must not all inherit the homepage image');
});

test('all committed share assets are lightweight 1200 by 630 RGB PNGs with recorded provenance', async () => {
  const provenance = JSON.parse(await readFile('assets/social/provenance.json', 'utf8'));
  for (const [id, image] of Object.entries(socialImages)) {
    const bytes = await readFile('public' + image.path);
    assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
    assert.equal(bytes[25], 2, 'opaque RGB images');
    assert.ok(bytes.length < 300_000, 'small enough for a link preview');
    const record = provenance.assets.find(record => record.id === id);
    assert.ok(record);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), record.sha256);
    assert.equal(record.alt, image.alt);
  }
});

test('fallback routes reset the image and do not publish a private metrics document', () => {
  assert.equal(socialImageForPath('/projetos/signageflow/'), socialImages.signageflow);
  for (const path of ['/', '/orcamento', '/metricas', '/servicos/automacao', '/projetos/unknown', '/projetos/__proto__']) {
    assert.equal(socialImageForPath(path), socialImages.nexareis);
  }
  assert.throws(() => renderRouteDocument(template, '/metricas'), /No public metadata/);
  const home = renderRouteDocument(template, '/');
  const profile = renderRouteDocument(template, '/nicolas-reis');
  assert.ok(home.includes('ProfessionalService'));
  assert.ok(profile.includes('"@type":"Person"'));
});

test('metadata escapes text and a missing image placeholder fails the build explicitly', () => {
  assert.equal(escapeMetaAttribute('A & "B" <C> $1'), 'A &amp; &quot;B&quot; &lt;C&gt; $1');
  assert.throws(() => renderRouteDocument(template.replace(/<meta property="og:image"[^>]+>/, ''), '/projetos/chamaai-food'), /Missing metadata placeholder: og:image/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('personal history stays grounded and reusable', () => {
  const source = read('data/nicolasProfile.ts');
  for (const value of ['Nícolas Reis', 'Encarregado Administrativo', 'Operador de Atendimento de Loja', 'Balconista', 'Ajudante Geral', 'CETEF', 'Seven Computadores', 'Anhanguera']) {
    assert.ok(source.includes(value), value);
  }
  assert.ok(source.includes('Apoio aos supervisores, empacotamento de mercadorias'));
});

test('resume route exposes honest A4 print-to-PDF functionality', () => {
  const app = read('App.tsx');
  const page = read('pages/NicolasCurriculo.tsx');
  const css = read('index.css');
  const config = JSON.parse(read('vercel.json'));
  assert.match(app, /path="\/curriculo"/);
  assert.ok(config.rewrites.some(item => item.source === '/curriculo' && item.destination === '/curriculo/index.html'));
  assert.match(page, /window\.print\(\)/);
  assert.match(page, /Testemunha de Jeová/);
  assert.match(page, /www\.jw\.org/);
  assert.match(css, /@page\s*\{\s*size:\s*A4/);
  assert.match(css, /\.app-root > header, \.app-root > footer/);
});

test('profile presents the founder and the four-section navigation', () => {
  const page = read('pages/NicolasReis.tsx');
  assert.match(page, /Fundei a Nexa Reis e criei os projetos/);
  assert.match(page, /Conheça meu portfólio profissional/);
  assert.match(page, /Projetos, sistemas desenvolvidos e experiência em administração e tecnologia/);
  for (const name of ['Experiência', 'Projetos', 'Formação', 'Contato']) assert.ok(page.includes(name), name);
  assert.ok(!page.includes('Visualizar currículo para impressão'));
  assert.match(page, /aria-labelledby="projetos-heading"/);
});


test('slow entrance/exit feedback is scoped to the selected portfolio section', () => {
  const page = read('pages/NicolasReis.tsx');
  const css = read('index.css');
  assert.match(page, /useReducedMotion/);
  assert.match(page, /data-portfolio-active/);
  assert.match(page, /data-portfolio-selected/);
  assert.match(page, /setTimeout\(\(\) => setSelectedSection\(null\), 2000\)/);
  assert.match(page, /once: true, amount: 0\.08/);
  for (const effect of ['experience', 'projects', 'education', 'contact']) {
    assert.ok(page.includes('data-portfolio-effect="' + effect + '"'), effect);
  }
  assert.match(css, /@keyframes portfolio-arrival/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

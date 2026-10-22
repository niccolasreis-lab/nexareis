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

test('company projects are not falsely presented as personal authorship', () => {
  const page = read('pages/NicolasReis.tsx');
  assert.match(page, /produtos e soluções apresentados pela Nexa Reis/i);
  assert.match(page, /participação específica em cada projeto/);
  assert.match(page, /aria-labelledby="projetos-heading"/);
  assert.match(page, /Visualizar currículo para impressão/);
});

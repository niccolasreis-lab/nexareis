import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.NEXA_QA_URL || 'http://127.0.0.1:4173';
const server = process.env.NEXA_QA_URL ? null : spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'pipe' });
const results = [];
let browser;
async function check(name, fn) { await fn(); results.push({ name, status: 'pass' }); console.log('PASS', name); }
try {
  for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise(r => setTimeout(r, 100)); }
  browser = await chromium.launch({ headless: true, executablePath: process.env.NEXA_CHROMIUM_EXECUTABLE || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await mkdir('qa', { recursive: true });
  // Prevent accidental real contact submissions in every test.
  let posts = 0;
  let acknowledgement = { ok: false };
  let pauseResponse = false;
  await page.route('**/webhook/**', async route => {
    if (route.request().method() !== 'POST') return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' } });
    posts++;
    if (pauseResponse) await new Promise(r => setTimeout(r, 1000));
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(acknowledgement), headers: { 'Access-Control-Allow-Origin': '*' } });
  });
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/nicolas-reis', '/servicos/automacao']) await check(`layout ${path} at ${width}px`, async () => {
      await page.goto(base + path);
      await page.locator('h1').waitFor();
      // Render deferred sections before verifying the complete document.
      if (path === '/') {
        for (const section of await page.locator('main section').all()) { await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(40); }
        await page.locator('#feedback-gestores').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'horizontal overflow');
      const duplicates = await page.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(x => x.id).filter(Boolean); return ids.filter((x, i) => ids.indexOf(x) !== i); });
      assert.deepEqual(duplicates, [], 'duplicate IDs');
      if ([390,1440].includes(width) && path !== '/servicos/automacao') { await page.evaluate(() => scrollTo(0,0)); await page.screenshot({ path: `qa/${path === '/' ? 'home' : 'nicolas'}-${width}.png`, fullPage: true }); }
    });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await check('desktop anchors target the correct sections', async () => {
    await page.goto(base + '/');
    for (const id of ['produtos', 'solucoes', 'processo', 'sobre', 'faq', 'contato', 'home']) {
      await page.locator(`nav[aria-label="Navegação principal"] a[href="/#${id}"]`).click();
      await page.waitForTimeout(400);
      assert.equal(new URL(page.url()).hash, '#' + id);
      const top = await page.locator('#' + id).evaluate(el => el.getBoundingClientRect().top);
      assert.ok(id === 'home' ? Math.abs(top) < 2 : top >= 75 && top < 130, `${id} top ${top}`);
    }
  });
  await check('sidebar supports keyboard activation', async () => {
    const button = page.getByRole('button', { name: 'Rolar para seção Sobre' });
    await button.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(250);
    assert.ok(Math.abs(await page.locator('#sobre').evaluate(el => el.getBoundingClientRect().top) - 96) < 5);
  });
  await check('mobile menu focus, Escape and cross-route navigation', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/nicolas-reis');
    const trigger = page.getByRole('button', { name: 'Abrir menu' });
    await trigger.click();
    await page.getByRole('navigation', { name: 'Navegação móvel' }).waitFor();
    await page.waitForFunction(() => document.activeElement?.getAttribute('href') === '/#home');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Abrir menu' }).waitFor();
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    await trigger.click();
    await page.getByRole('navigation', { name: 'Navegação móvel' }).getByRole('link', { name: 'Sobre', exact: true }).click();
    await page.waitForTimeout(500);
    assert.equal(new URL(page.url()).pathname, '/');
    assert.equal(new URL(page.url()).hash, '#sobre');
    assert.ok(Math.abs(await page.locator('#sobre').evaluate(el => el.getBoundingClientRect().top) - 96) < 5);
    assert.equal(await page.locator('#mobile-navigation').count(), 0);
  });
  await check('direct routes, refresh and per-route SEO', async () => {
    for (const path of ['/nicolas-reis', '/servicos/automacao', '/servicos/sistemas', '/servicos/integracao', '/servicos/nexa-solutions', '/servicos/nexa-data']) {
      const response = await page.goto(base + path); assert.equal(response.status(), 200);
      await page.locator('h1').waitFor();
      await page.reload(); await page.locator('h1').waitFor();
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.nexareis.com.br' + path);
      const raw = await (await fetch(base + path)).text();
      assert.ok(raw.includes(`href="https://www.nexareis.com.br${path}"`));
      assert.ok(!raw.includes('<title>Automação Empresarial em São Paulo'));
    }
  });
  await check('footer returns from profile to landing anchor', async () => {
    await page.goto(base + '/nicolas-reis');
    await page.locator('footer').getByRole('link', { name: 'Sobre Nós' }).click();
    await page.waitForTimeout(400);
    assert.equal(new URL(page.url()).pathname, '/');
    assert.ok(Math.abs(await page.locator('#sobre').evaluate(el => el.getBoundingClientRect().top) - 96) < 5);
  });
  await check('all products select correctly and CestaEsperta fills contact intent', async () => {
    await page.goto(base + '/#produtos'); await page.waitForTimeout(300);
    for (const [name, url] of [['ChamaAí Food', 'https://chamaaifood.nexareis.com.br/pilot'], ['ChamaAí — Gestão de Filas', 'https://chamaai.nexareis.com.br'], ['SignageFlow', 'https://signageflow.nexareis.com.br']]) {
      const button = page.locator('#produtos').getByRole('button', { name, exact: true });
      await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('#produtos').getByRole('link', {name:'Abrir demonstração'}).getAttribute('href'), url);
    }
    await page.locator('#produtos').getByRole('button', { name:'CestaEsperta', exact:true }).click();
    await page.getByRole('button', { name:'Falar sobre o CestaEsperta' }).click();
    assert.equal(await page.locator('#necessidade').inputValue(), 'cesta-esperta');
    assert.equal(posts, 0);
  });
  await check('contact validation prevents network and focuses invalid field', async () => {
    await page.goto(base + '/#contato'); await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
    assert.equal(posts, 0);
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'nome');
    assert.equal(await page.locator('#nome').getAttribute('aria-invalid'), 'true');
  });
  async function fillContact() {
    for (const [id, value] of Object.entries({nome:'Teste controlado', empresa:'QA sem envio real', email:'qa@example.invalid', whatsapp:'11999999999', mensagem:'Teste local interceptado. Nenhuma mensagem deve ser enviada.'})) await page.locator('#' + id).fill(value);
    await page.locator('#segmento').selectOption('outros');
    await page.locator('#necessidade').selectOption({ index: 1 });
  }
  await check('negative acknowledgement preserves all fields and offers WhatsApp', async () => {
    await fillContact();
    await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
    await page.getByRole('alert').waitFor();
    assert.equal(posts, 1);
    assert.equal(await page.locator('#nome').inputValue(), 'Teste controlado');
    assert.equal(await page.locator('#email').inputValue(), 'qa@example.invalid');
    assert.ok(await page.locator('#mensagem').inputValue());
    assert.ok(await page.locator('#segmento').inputValue()); assert.ok(await page.locator('#necessidade').inputValue());
    assert.ok(await page.locator('#empresa').inputValue()); assert.ok(await page.locator('#whatsapp').inputValue());
    assert.equal(await page.getByRole('link', { name:'Abrir WhatsApp', exact: true }).getAttribute('href'), 'https://wa.me/5511937105501');
  });
  await check('one request during pending and success only after positive acknowledgement', async () => {
    acknowledgement = { ok: true }; pauseResponse = true;
    await page.getByRole('button', { name: 'Enviar mensagem', exact: true }).click();
    assert.equal(await page.locator('form button[type="submit"]').isDisabled(), true);
    await page.locator('form').evaluate(el => { el.requestSubmit(); el.requestSubmit(); });
    await page.getByRole('heading', { name: 'Envio confirmado' }).waitFor();
    assert.equal(posts, 2);
    await page.getByRole('button', { name:'Enviar nova mensagem' }).click();
    assert.equal(await page.locator('#nome').inputValue(), '');
  });
  await check('reduced motion, skip link and verified contact destinations', async () => {
    await page.goto(base + '/'); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Pular para o conteúdo');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    assert.equal(await page.locator('.custom-cursor-active').count(), 0);
    assert.equal(await page.getByRole('link', { name:'GitHub de Nícolas Reis' }).getAttribute('href'), 'https://github.com/niccolasreis-lab');
    assert.equal(await page.getByRole('link', { name:'Contato pelo WhatsApp', exact: true }).getAttribute('href'), 'https://wa.me/5511937105501');
  });
  assert.deepEqual(runtimeErrors, []);
  console.log(`${results.length} browser checks passed; all contact POSTs intercepted.`);
} catch (error) {
  results.push({status:'fail', error: String(error)}); console.error(error); process.exitCode = 1;
} finally {
  await writeFile('qa/browser-results.json', JSON.stringify({ date: new Date().toISOString(), base, engine: 'Chromium', realContactSent: false, results }, null, 2));
  await browser?.close(); server?.kill();
}

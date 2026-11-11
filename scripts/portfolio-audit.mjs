import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, stat, rename } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.NEXA_AUDIT_URL || 'http://127.0.0.1:4174';
const server = process.env.NEXA_AUDIT_URL ? null : spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4174', '--strictPort'], { stdio: 'pipe' });
const checks = [], accessibility = [], measurements = {};
let browser, page, blockedPosts = 0;
async function check(name, fn) {
  try { await fn(); checks.push({ name, status: 'pass' }); console.log('PASS', name); }
  catch (error) {
    checks.push({ name, status: 'fail', error: String(error) }); console.error('FAIL', name, error);
    if (page && !page.isClosed()) await page.screenshot({ path: `qa/audit-failure-${checks.length}.png`, fullPage: true }).catch(() => {});
  }
}
async function profile(hash = '') {
  await page.goto(base + '/nicolas-reis' + hash);
  await page.getByRole('heading', { level: 1, name: 'Nícolas Reis.' }).waitFor();
}
async function aligned(id) {
  await page.waitForFunction(id => {
    const el = document.getElementById(id);
    if (!el || document.activeElement !== el) return false;
    const expected = Math.max(0, Math.min(el.getBoundingClientRect().top + scrollY - 96, document.documentElement.scrollHeight - innerHeight));
    return Math.abs(scrollY - expected) < 2;
  }, id);
}
try {
  await mkdir('qa', { recursive: true });
  for (let i = 0; i < 50; i++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise(r => setTimeout(r, 100)); }
  browser = await chromium.launch({ headless: true, executablePath: process.env.NEXA_CHROMIUM_EXECUTABLE || undefined, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  // Block every external mutation: the audit never sends a real lead or webhook.
  await context.route('**/*', async route => {
    if (new URL(route.request().url()).pathname === '/api/events') return route.fulfill({ status: 204 });
    if (route.request().method() === 'POST') { blockedPosts++; return route.abort('blockedbyclient'); }
    return route.continue();
  });
  page = await context.newPage();
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await check('anchors align once, transfer focus and support repeated activation', async () => {
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await profile();
      for (const id of ['projetos', 'experiencia', 'formacao', 'contato-profissional']) {
        await page.locator(`[data-portfolio-card="${id}"]`).click();
        await aligned(id);
        assert.ok(await page.locator('#' + id).evaluate(el => el.getBoundingClientRect().top >= 80));
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator('[data-portfolio-card="contato-profissional"]').click();
      await aligned('contato-profissional');
    }
  });
  await check('direct deep link waits for a delayed lazy page instead of a fixed timer', async () => {
    const pattern = '**/assets/NicolasReis-*.js';
    await page.route(pattern, async route => { await new Promise(r => setTimeout(r, 450)); await route.continue(); });
    try { await profile('#formacao'); await aligned('formacao'); }
    finally { await page.unroute(pattern); }
  });
  await check('commercial header does not claim Home is active inside the profile', async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await profile();
    assert.equal(await page.locator('header [aria-current]').count(), 0);
    await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Produtos', exact: true }).click();
    await aligned('produtos');
    await page.waitForFunction(() => document.querySelector('header a[href="/#produtos"]')?.getAttribute('aria-current') === 'location');
  });
  await check('unknown route stays noindex and returns to the public home correctly', async () => {
    await page.goto(base + '/rota-inexistente-auditoria');
    await page.getByRole('heading', { name: 'Página não encontrada', exact: true }).waitFor();
    await page.waitForFunction(() => document.querySelector('meta[name="robots"]')?.getAttribute('content') === 'noindex,follow');
    await page.getByRole('link', { name: 'Voltar para a página inicial', exact: true }).click();
    await page.waitForFunction(() => location.pathname === '/' && document.querySelector('meta[name="robots"]')?.getAttribute('content') === 'index,follow');
    await page.goto(base + '/servicos/servico-inexistente-auditoria');
    await page.getByRole('heading', { level:1, name:'Serviço não encontrado', exact:true }).waitFor();
    await page.waitForFunction(() => document.querySelector('meta[name="robots"]')?.getAttribute('content') === 'noindex,follow');
  });
  await check('mobile menu isolates the page, cycles focus and restores it on Escape', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await profile();
    const trigger = page.getByRole('button', { name: 'Abrir menu' });
    await trigger.click();
    await page.waitForFunction(() => document.activeElement?.getAttribute('href') === '/#home');
    assert.equal(await page.locator('main').evaluate(el => el.inert), true);
    assert.equal(await page.locator('footer').evaluate(el => el.inert), true);
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest('#mobile-navigation') || document.activeElement?.getAttribute('aria-controls') === 'mobile-navigation')), true);
    }
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.getElementById('main-content').inert);
    assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('footer').evaluate(el => el.inert), false);
  });
  await check('browser Back closes the mobile menu without leaving the page inert', async () => {
    await page.goto(base + '/');
    await page.getByRole('link', { name: 'Sou recrutador — conhecer Nícolas Reis' }).click();
    await page.getByRole('heading', { level: 1, name: 'Nícolas Reis.' }).waitFor();
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.locator('#mobile-navigation').waitFor();
    await page.goBack();
    await page.waitForFunction(() => location.pathname === '/' && !document.getElementById('main-content').inert && !document.getElementById('mobile-navigation'));
  });
  await check('responsive portrait stays small and keeps the untouched JPEG as fallback', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await profile();
    const image = page.locator('[data-profile-portrait]');
    await image.evaluate(async img => { await img.decode(); });
    const data = await image.evaluate(img => ({ src: img.currentSrc, width: img.getBoundingClientRect().width, top: img.getBoundingClientRect().top, bytes: performance.getEntriesByName(img.currentSrc).at(-1)?.encodedBodySize }));
    measurements.portrait = data;
    assert.match(data.src, /nicolas-reis-\d+\.webp$/);
    assert.ok(data.top < 350, 'portrait should appear in the first screen on mobile');
    assert.ok((await stat('public/images/team/nicolas-reis-400.webp')).size < 60000);
    const pattern = '**/images/team/nicolas-reis-*.webp';
    await page.route(pattern, route => route.abort());
    try {
      await profile();
      await page.waitForFunction(() => document.querySelector('[data-profile-portrait]')?.currentSrc.endsWith('/nicolas-reis.jpg'));
      await image.evaluate(async img => { await img.decode(); });
      assert.ok(await image.evaluate(img => img.naturalWidth > 0));
    } finally { await page.unroute(pattern); }
  });
  await check('a missing project preview has a useful fallback and preserves its destination', async () => {
    const isolated = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    let failedImageRequests = 0;
    await isolated.route('**/*', route => {
      if (new URL(route.request().url()).pathname === '/api/events') return route.fulfill({ status: 204 });
    if (route.request().method() === 'POST') { blockedPosts++; return route.abort(); }
      if (new URL(route.request().url()).pathname === '/images/portfolio/chamaai-food.webp') { failedImageRequests++; return route.abort(); }
      return route.continue();
    });
    try {
      const faultPage = await isolated.newPage();
      await faultPage.goto(base + '/nicolas-reis#projetos');
      const card = faultPage.locator('[data-portfolio-project="chamaai-food"]');
      await card.scrollIntoViewIfNeeded();
      await card.getByText('Prévia indisponível', { exact: true }).waitFor();
      assert.ok(failedImageRequests > 0, 'the failure must be exercised without the memory image cache');
      assert.equal(await card.locator('a').getAttribute('href'), 'https://chamaaifood.nexareis.com.br/pilot');
      assert.equal(await card.locator('img').count(), 0);
      const result = await new AxeBuilder({ page: faultPage }).include('[data-portfolio-project="chamaai-food"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      accessibility.push({ path:'/nicolas-reis', viewport:390, state:'image-failure', violations:result.violations, incomplete:result.incomplete, passes:result.passes.length });
      assert.deepEqual(result.violations, []);
      await faultPage.screenshot({ path: 'qa/project-preview-fallback.png', fullPage: true });
    } finally { await isolated.close(); }
  });
  await check('subtle hover responds and reduced motion removes image transforms', async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await profile('#projetos');
    const card = page.locator('[data-portfolio-project="chamaai-food"]');
    await card.scrollIntoViewIfNeeded(); await card.locator('img').evaluate(async img => { await img.decode(); });
    await card.hover(); await page.waitForTimeout(500);
    const scale = await card.locator('img').evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a);
    assert.ok(scale > 1 && scale <= 1.03, 'hover scale must be subtle');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-portfolio-project="chamaai-food"] img')).transform === 'none');
    assert.equal(await page.locator('#custom-cursor-root').count(), 0);
    const animations = await page.locator('.portfolio-page').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length);
    assert.equal(animations, 0);
    measurements.motion = { hoverScale: scale, reducedMotionRunningAnimations: animations };
  });
  await check('mobile reflow remains readable with larger text', async () => {
    await page.setViewportSize({ width: 390, height: 844 }); await profile();
    await page.addStyleTag({ content: '.portfolio-page { zoom: 1.25; }' });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'larger text must not introduce horizontal overflow');
    await profile();
  });
  await check('portfolio browser colors and readable selection reset on commercial navigation', async () => {
    await page.setViewportSize({ width: 1440, height: 900 }); await profile();
    await page.waitForFunction(() => document.documentElement.dataset.pageSurface === 'portfolio');
    assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'), '#fff7e7');
    const colors = await page.locator('.portfolio-summary').evaluate(el => {
      const selected = getComputedStyle(el, '::selection');
      return { foreground: selected.color, background: selected.backgroundColor };
    });
    const luminance = color => {
      const [r, g, b] = color.match(/[\d.]+/g).slice(0, 3).map(v => {
        const s = Number(v) / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    };
    const a = luminance(colors.foreground), b = luminance(colors.background);
    const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    assert.ok(contrast >= 4.5, `selected text contrast is ${contrast}`);
    measurements.selectedTextContrast = contrast;
    await page.locator('header a[href="/#home"]').first().click();
    await page.waitForFunction(() => document.documentElement.dataset.pageSurface === 'commercial');
    assert.equal(await page.locator('meta[name="theme-color"]').getAttribute('content'), '#050505');
    // Observe the rendered state after the route's CSS transition settles.
    await page.waitForFunction(() => getComputedStyle(document.body).backgroundColor === 'rgb(5, 5, 5)');
    assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(5, 5, 5)');
  });
  await check('mobile navigation and footer keep 44px targets without clipping the name', async () => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 }); await profile();
      await page.evaluate(() => document.fonts.ready);
      assert.ok(await page.locator('#nicolas-heading').evaluate(el => {
        const range = document.createRange(); range.selectNodeContents(el);
        return range.getBoundingClientRect().right <= el.getBoundingClientRect().right + 1;
      }), `the complete name should fit its column at ${width}px`);
      const undersized = await page.locator('footer a').evaluateAll(links => links.filter(el => {
        const box = el.getBoundingClientRect(); return box.height < 43.5 || box.width < 43.5;
      }).map(el => el.textContent || el.getAttribute('aria-label')));
      assert.deepEqual(undersized, []);
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      const menuSizes = await page.locator('#mobile-navigation nav a').evaluateAll(links => links.map(el => {
        const box = el.getBoundingClientRect(); return { width: box.width, height: box.height };
      }));
      assert.equal(menuSizes.length, 7);
      assert.ok(menuSizes.every(box => box.width >= 44 && box.height >= 44));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.getElementById('mobile-navigation'));
    }
  });
  await check('shared buttons respond briefly and stay still with reduced motion', async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' }); await profile();
    const button = page.locator('header').getByRole('button', { name: 'Falar sobre um projeto' });
    assert.ok((await button.boundingBox()).height >= 44);
    await button.hover(); await page.waitForTimeout(250);
    const scale = await button.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).a);
    assert.ok(scale > 1 && scale <= 1.03);
    await page.emulateMedia({ reducedMotion: 'reduce' }); await profile();
    await button.hover(); await page.waitForTimeout(250);
    assert.equal(await button.evaluate(el => getComputedStyle(el).transform), 'none');
  });
  await check('normal-motion mobile menu can be interrupted and records a real preview', async () => {
    const demo = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference', recordVideo: { dir: 'qa/motion', size: { width: 390, height: 844 } } });
    await demo.route('**/*', route => {
      if (new URL(route.request().url()).pathname === '/api/events') return route.fulfill({ status: 204 });
    if (route.request().method() === 'POST') { blockedPosts++; return route.abort(); }
      return route.continue();
    });
    const demoPage = await demo.newPage();
    demoPage.on('pageerror', error => runtimeErrors.push(error.message));
    const video = demoPage.video();
    try {
      await demoPage.goto(base + '/nicolas-reis');
      await demoPage.locator('[data-profile-portrait]').evaluate(async img => { await img.decode(); });
      await demoPage.evaluate(() => document.fonts.ready);
      await demoPage.waitForTimeout(650);
      const toggle = demoPage.locator('button[aria-controls="mobile-navigation"]');
      await toggle.click();
      await demoPage.waitForFunction(() => document.activeElement?.getAttribute('href') === '/#home');
      assert.ok(await demoPage.locator('#mobile-navigation nav a').first().evaluate(el => Number(getComputedStyle(el).opacity) >= 0.95));
      await demoPage.waitForTimeout(250);
      assert.equal(await demoPage.locator('#mobile-navigation button').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(8, 62, 49)');
      await demoPage.screenshot({ path: 'qa/nicolas-menu-390.png', fullPage: false });
      await toggle.click();
      await toggle.click();
      await demoPage.waitForFunction(() => document.getElementById('main-content').inert && document.querySelector('button[aria-controls="mobile-navigation"]')?.getAttribute('aria-expanded') === 'true');
      await demoPage.keyboard.press('Escape');
      await demoPage.waitForFunction(() => !document.getElementById('mobile-navigation') && !document.getElementById('main-content').inert);
      await demoPage.getByRole('link', { name: 'Ver meus projetos' }).click();
      await demoPage.waitForFunction(() => document.activeElement?.id === 'projetos' && Math.abs(document.getElementById('projetos').getBoundingClientRect().top - 96) < 2);
      await demoPage.locator('[data-portfolio-project="chamaai-food"] img').evaluate(async img => { await img.decode(); });
      await demoPage.waitForTimeout(700);
      assert.ok(await demoPage.locator('[data-portfolio-project="chamaai-food"]').isVisible());
    } finally {
      await demo.close();
      if (video) await rename(await video.path(), 'qa/portfolio-motion-mobile.webm');
    }
  });
  await check('automated accessibility across all public routes and mobile menu', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const paths = ['/', '/nicolas-reis', '/curriculo', '/servicos/automacao', '/servicos/sistemas', '/servicos/integracao', '/servicos/nexa-solutions', '/servicos/nexa-data'];
    for (const path of paths) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(base + path); await page.locator('h1').waitFor();
      if (path === '/') {
        // Visit the complete document so deferred sections and once-only reveals are rendered.
        for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 600) {
          await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(80);
        }
        await page.waitForTimeout(1000);
      }
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      accessibility.push({ path, viewport: 1440, violations: result.violations, incomplete: result.incomplete, passes: result.passes.length });
      if (path === '/') {
        await page.getByRole('button', { name:'Enviar mensagem', exact:true }).click();
        await page.waitForFunction(() => document.getElementById('nome')?.getAttribute('aria-invalid') === 'true');
        const invalid = await new AxeBuilder({ page }).include('#contato').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        accessibility.push({ path:'/', viewport:1440, state:'invalid-contact', violations:invalid.violations, incomplete:invalid.incomplete, passes:invalid.passes.length });
      }

    }
    await page.setViewportSize({ width: 390, height: 844 }); await profile();
    for (const menuOpen of [false, true]) {
      if (menuOpen) await page.getByRole('button', { name: 'Abrir menu' }).click();
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      accessibility.push({ path: '/nicolas-reis', viewport: 390, menuOpen, violations: result.violations, incomplete: result.incomplete, passes: result.passes.length });
    }
    await page.keyboard.press('Escape');
    await writeFile('qa/accessibility-audit.json', JSON.stringify(accessibility, null, 2));
    const violations = accessibility.flatMap(result => result.violations.map(v => ({ path:result.path, viewport:result.viewport, menuOpen:result.menuOpen, id:v.id, impact:v.impact, nodes:v.nodes.map(n => ({ target:n.target, summary:n.failureSummary })) })));
    assert.deepEqual(violations, []);
  });
  await check('complete mobile and desktop captures contain loaded previews', async () => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 }); await profile();
      for (const image of await page.locator('.portfolio-project-preview img').all()) {
        await image.scrollIntoViewIfNeeded(); await image.evaluate(async img => { await img.decode(); });
      }
      await page.evaluate(() => document.fonts.ready); await page.evaluate(() => scrollTo(0,0));
      await page.screenshot({ path: `qa/nicolas-audited-${width}.png`, fullPage: true });
      measurements['pageHeight' + width] = await page.evaluate(() => document.documentElement.scrollHeight);
    }
  });
  assert.deepEqual(runtimeErrors, []);
  assert.equal(blockedPosts, 0, 'the audit must never attempt external mutations');
} catch (error) { checks.push({ status: 'fail', error: String(error) }); console.error(error); }
finally {
  await writeFile('qa/portfolio-audit.json', JSON.stringify({ date:new Date().toISOString(), base, realContactSent:false, blockedPosts, measurements, checks }, null, 2));
  await browser?.close(); server?.kill();
  if (checks.some(x => x.status !== 'pass')) process.exitCode = 1;
  console.log(`${checks.filter(x => x.status === 'pass').length}/${checks.length} audit checks passed.`);
}

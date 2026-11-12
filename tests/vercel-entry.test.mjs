import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

test('the compiled Vercel function imports its JavaScript dependency outside the TypeScript source tree', async () => {
  const root = await mkdtemp(join(tmpdir(), 'nexa-vercel-entry-'));
  try {
    const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile);
    assert.equal(config.error, undefined);
    const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, process.cwd());
    const options = { ...parsed.options, noEmit: false, sourceMap: false, inlineSourceMap: false, module: ts.ModuleKind.ESNext };
    await writeFile(join(root, 'package.json'), '{"type":"module"}');
    for (const source of ['api/growth.ts', 'server/growthProxy.ts']) {
      const destination = join(root, source.replace(/\.ts$/, '.js'));
      await mkdir(join(destination, '..'), { recursive: true });
      const result = ts.transpileModule(await readFile(source, 'utf8'), { compilerOptions: options, fileName: source });
      await writeFile(destination, result.outputText);
    }
    const entry = await import(pathToFileURL(join(root, 'api/growth.js')).href);
    const response = await entry.default.fetch(new Request('https://example.invalid/api/growth?resource=contact'));
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'POST');
  } finally { await rm(root, { recursive: true, force: true }); }
});

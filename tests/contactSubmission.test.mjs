import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ContactSubmission, CONTACT_TIMEOUT_MS } from '../lib/contactSubmission.ts';

const endpoint = 'https://example.invalid/contact';
const payload = {
  formulario: 'Contato Comercial NexaReis',
  origem: 'https://example.invalid/',
  nome: 'Contato de teste',
  name: 'Contato de teste',
  empresa: 'Empresa de teste',
  businessName: 'Empresa de teste',
  email: 'teste@example.invalid',
  whatsapp: '(11) 99999-9999',
  phone: '(11) 99999-9999',
  segmento: 'supermercados',
  segment: 'supermercados',
  necessidade: 'cesta-esperta',
  mensagem: 'Mensagem de teste',
  currentPain: 'Mensagem de teste',
};

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function waitForAbort(signal) {
  return new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
}

test('confirms a readable 2xx acknowledgement and preserves every payload alias', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => jsonResponse({ ok: true }, 201));
  const submission = new ContactSubmission();
  await submission.submit(endpoint, payload);

  assert.equal(fetchMock.mock.callCount(), 1);
  const [url, options] = fetchMock.mock.calls[0].arguments;
  assert.equal(url, endpoint);
  assert.equal(options.method, 'POST');
  assert.deepEqual(options.headers, { 'Content-Type': 'application/json' });
  assert.deepEqual(JSON.parse(options.body), payload);
  assert.equal(options.mode, undefined);
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(submission.isPending, false);
});

const failures = [
  ['HTTP 400', () => jsonResponse({ ok: true }, 400)],
  ['HTTP 500', () => jsonResponse({ ok: true }, 500)],
  ['HTTP 502', () => jsonResponse({ ok: false }, 502)],
  ['ok false', () => jsonResponse({ ok: false })],
  ['missing ok', () => jsonResponse({})],
  ['string ok', () => jsonResponse({ ok: 'true' })],
  ['numeric ok', () => jsonResponse({ ok: 1 })],
  ['null body', () => jsonResponse(null)],
  ['array body', () => jsonResponse([{ ok: true }])],
  ['empty body', () => new Response('', { status: 200 })],
  ['HTTP 204 without acknowledgement', () => new Response(null, { status: 204 })],
  ['invalid JSON', () => new Response('{broken', { status: 200 })],
  ['opaque response', () => ({ ok: false, status: 0, type: 'opaque' })],
  ['network or CORS rejection', () => { throw new TypeError('Failed to fetch'); }],
];

for (const [scenario, response] of failures) {
  test(`rejects ${scenario}, sends once and permits a subsequent manual attempt`, async (t) => {
    const originalPayload = structuredClone(payload);
    let calls = 0;
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
      calls += 1;
      return calls === 1 ? response() : jsonResponse({ ok: true });
    });
    const submission = new ContactSubmission();
    await assert.rejects(submission.submit(endpoint, payload));
    assert.equal(fetchMock.mock.callCount(), 1);
    assert.equal(submission.isPending, false);
    assert.deepEqual(payload, originalPayload);

    await submission.submit(endpoint, payload);
    assert.equal(fetchMock.mock.callCount(), 2);
    assert.equal(submission.isPending, false);
  });
}

test('blocks simultaneous submissions before a second fetch can start', async (t) => {
  let resolveResponse;
  const fetchMock = t.mock.method(globalThis, 'fetch', () => new Promise((resolve) => {
    resolveResponse = resolve;
  }));
  const submission = new ContactSubmission();
  const first = submission.submit(endpoint, payload);
  assert.equal(submission.isPending, true);
  await assert.rejects(submission.submit(endpoint, payload), /already in progress/);
  assert.equal(fetchMock.mock.callCount(), 1);

  resolveResponse(jsonResponse({ ok: true }));
  await first;
  assert.equal(submission.isPending, false);
});

test('aborts after exactly 15 seconds without retrying', async (t) => {
  assert.equal(CONTACT_TIMEOUT_MS, 15_000);
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let signal;
  const fetchMock = t.mock.method(globalThis, 'fetch', (_url, options) => {
    signal = options.signal;
    return waitForAbort(signal);
  });
  const submission = new ContactSubmission();
  const rejection = assert.rejects(submission.submit(endpoint, payload), { name: 'AbortError' });

  t.mock.timers.tick(14_999);
  assert.equal(signal.aborted, false);
  t.mock.timers.tick(1);
  await rejection;
  assert.equal(signal.aborted, true);
  assert.equal(submission.isPending, false);
  assert.equal(fetchMock.mock.callCount(), 1);
});

test('the same deadline covers waiting for the JSON response body', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let signal;
  let resolveHeaders;
  let bodyStarted = false;
  t.mock.method(globalThis, 'fetch', (_url, options) => {
    signal = options.signal;
    return new Promise((resolve) => { resolveHeaders = resolve; });
  });
  const submission = new ContactSubmission();
  const rejection = assert.rejects(submission.submit(endpoint, payload), { name: 'AbortError' });
  t.mock.timers.tick(10_000);
  resolveHeaders({
    ok: true,
    json: () => {
      bodyStarted = true;
      return waitForAbort(signal);
    },
  });
  await Promise.resolve();
  assert.equal(bodyStarted, true);
  t.mock.timers.tick(4_999);
  assert.equal(signal.aborted, false);
  t.mock.timers.tick(1);
  await rejection;
  assert.equal(submission.isPending, false);
});

for (const phase of ['headers', 'JSON']) {
  test(`rejects overdue ${phase} even before a delayed timer callback runs`, async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    let now = 0;
    t.mock.method(performance, 'now', () => now);
    let signal;
    const fetchMock = t.mock.method(globalThis, 'fetch', async (_url, options) => {
      signal = options.signal;
      if (phase === 'headers') now = CONTACT_TIMEOUT_MS;
      return {
        ok: true,
        json: async () => {
          now = CONTACT_TIMEOUT_MS;
          return { ok: true };
        },
      };
    });
    const submission = new ContactSubmission();
    await assert.rejects(submission.submit(endpoint, payload), { name: 'AbortError' });
    assert.equal(signal.aborted, true);
    assert.equal(submission.isPending, false);
    assert.equal(fetchMock.mock.callCount(), 1);
  });
}

test('accepts a valid acknowledgement just before the absolute deadline', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let now = 0;
  t.mock.method(performance, 'now', () => now);
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    json: async () => {
      now = CONTACT_TIMEOUT_MS - 1;
      return { ok: true };
    },
  }));
  const submission = new ContactSubmission();
  await submission.submit(endpoint, payload);
  assert.equal(submission.isPending, false);
});

test('cancel aborts the pending request and releases the submission lock', async (t) => {
  let signal;
  const fetchMock = t.mock.method(globalThis, 'fetch', (_url, options) => {
    signal = options.signal;
    return waitForAbort(signal);
  });
  const submission = new ContactSubmission();
  const rejection = assert.rejects(submission.submit(endpoint, payload), { name: 'AbortError' });
  submission.cancel();
  await rejection;
  assert.equal(signal.aborted, true);
  assert.equal(submission.isPending, false);
  assert.equal(fetchMock.mock.callCount(), 1);
});

test('a late acknowledgement after cancellation cannot confirm delivery', async (t) => {
  let resolveBody;
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    json: () => new Promise((resolve) => { resolveBody = resolve; }),
  }));
  const submission = new ContactSubmission();
  const rejection = assert.rejects(submission.submit(endpoint, payload), { name: 'AbortError' });
  await Promise.resolve();
  submission.cancel();
  resolveBody({ ok: true });
  await rejection;
  assert.equal(submission.isPending, false);
});

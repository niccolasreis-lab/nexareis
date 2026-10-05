import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const workflow = JSON.parse(
  readFileSync(new URL('../workflow-n8n-chamaai.json', import.meta.url), 'utf8'),
);
const webhook = workflow.nodes.find((node) => node.id === 'webhook-node');
const telegram = workflow.nodes.find((node) => node.id === 'telegram-node');
const responder = workflow.nodes.find((node) => node.id === 'respond-node');

// Evaluate only the versioned expressions with synthetic data. No n8n instance,
// Telegram credentials, network API, or production endpoint is used.
function evaluate(expression, json) {
  const match = /^=\{\{\s*([\s\S]*?)\s*\}\}$/.exec(expression);
  assert.ok(match, 'Expected an n8n expression');
  return vm.runInNewContext(`(${match[1]})`, { $json: json }, {
    timeout: 1_000,
    contextCodeGeneration: { strings: false, wasm: false },
  });
}

const message = (body) => evaluate(telegram.parameters.text, { body });
const buttonUrl = (body) => evaluate(
  telegram.parameters.inlineKeyboard.rows[0].row.buttons[0].additionalFields.url,
  { body },
);

test('workflow JSON keeps the endpoint, three nodes, versions, and response order', () => {
  assert.deepEqual(workflow.nodes.map((node) => [node.id, node.type, node.typeVersion]), [
    ['webhook-node', 'n8n-nodes-base.webhook', 1.1],
    ['telegram-node', 'n8n-nodes-base.telegram', 1.1],
    ['respond-node', 'n8n-nodes-base.respondToWebhook', 1],
  ]);
  assert.deepEqual(webhook.parameters, {
    httpMethod: 'POST',
    path: 'chamaai-lead',
    responseMode: 'responseNode',
    options: {},
  });
  assert.equal(typeof webhook.webhookId, 'string');
  assert.ok(webhook.webhookId.length > 0, 'A clean import needs webhookId to keep the full path');
  assert.deepEqual(workflow.connections, {
    'Webhook Lead Form': {
      main: [[{ node: 'Telegram Notifier', type: 'main', index: 0 }]],
    },
    'Telegram Notifier': {
      main: [[{ node: 'Respond to Webhook', type: 'main', index: 0 }]],
    },
  });
  assert.equal(responder.parameters.respondWith, 'json');
  assert.equal(workflow.settings.executionOrder, 'v1');
});

test('Telegram errors stop the workflow and do not enable automatic retries', () => {
  assert.notEqual(telegram.continueOnFail, true);
  assert.ok(telegram.onError === undefined || telegram.onError === 'stopWorkflow');
  assert.notEqual(telegram.retryOnFail, true);
  assert.notEqual(telegram.alwaysOutputData, true);
});

test('Telegram uses explicit HTML and the n8n button additionalFields URL schema', () => {
  assert.equal(telegram.parameters.additionalFields.parse_mode, 'HTML');
  assert.equal(telegram.parameters.replyMarkup, 'inlineKeyboard');
  const button = telegram.parameters.inlineKeyboard.rows[0].row.buttons[0];
  assert.equal(button.text, '💬 Abrir no WhatsApp');
  assert.equal(Object.hasOwn(button, 'url'), false);
  assert.deepEqual(Object.keys(button.additionalFields), ['url']);
});

test('Portuguese and existing English field aliases render the same lead', () => {
  const common = {
    formulario: 'Contato Comercial NexaReis',
    email: 'ana@example.test',
    necessidade: 'signageflow',
    origem: 'https://example.test/contato',
  };
  const portuguese = {
    ...common,
    nome: 'Ana Silva',
    empresa: 'Mercado Central',
    whatsapp: '(11) 99999-0000',
    segmento: 'supermercados',
    mensagem: 'Preciso organizar as ofertas.',
  };
  const english = {
    ...common,
    name: portuguese.nome,
    businessName: portuguese.empresa,
    phone: portuguese.whatsapp,
    segment: portuguese.segmento,
    currentPain: portuguese.mensagem,
  };
  assert.equal(message(portuguese), message(english));
  assert.equal(buttonUrl(portuguese), buttonUrl(english));
  assert.ok(message(portuguese).includes('👤 <b>Nome:</b> Ana Silva'));
  assert.ok(message(portuguese).includes('📝 <b>Mensagem:</b> Preciso organizar as ofertas.'));
});

test('existing alias precedence remains unchanged when both names are supplied', () => {
  const text = message({
    name: 'Preferred name', nome: 'Ignored name',
    businessName: 'Preferred company', empresa: 'Ignored company',
    phone: '(11) 99999-0000', whatsapp: '(21) 98888-0000',
    segment: 'Preferred segment', segmento: 'Ignored segment',
    currentPain: 'Preferred message', mensagem: 'Ignored message',
  });
  assert.ok(text.includes('Preferred name'));
  assert.ok(text.includes('Preferred company'));
  assert.ok(text.includes('Preferred segment'));
  assert.ok(text.includes('Preferred message'));
  assert.ok(text.includes('https://wa.me/5511999990000'));
  assert.equal(text.includes('Ignored'), false);
});

test('all external text fields escape HTML while preserving ordinary punctuation', () => {
  const value = '<tag attr="x">A&B</tag> _*[x]`';
  const escaped = '&lt;tag attr="x"&gt;A&amp;B&lt;/tag&gt; _*[x]`';
  const text = message({
    formulario: value,
    name: value,
    businessName: value,
    email: value,
    phone: value,
    necessidade: value,
    segment: value,
    city: value,
    state: value,
    locations: '2',
    monthlyDeliveryOrders: value,
    platforms: [value, value],
    preferredContact: value,
    mensagem: value,
    origem: value,
    id: value,
  });
  assert.equal(text, [
    `🔔 <b>${escaped}</b>`,
    '',
    `👤 <b>Nome:</b> ${escaped}`,
    `🏢 <b>Empresa:</b> ${escaped}`,
    `📧 <b>E-mail:</b> ${escaped}`,
    `📱 <b>WhatsApp:</b> ${escaped}`,
    `🎯 <b>Necessidade:</b> ${escaped}`,
    `🍕 <b>Segmento:</b> ${escaped}`,
    `📍 <b>Localização:</b> ${escaped} - ${escaped}`,
    '🏪 <b>Unidades:</b> 2',
    `📦 <b>Pedidos/Mês:</b> ${escaped}`,
    `🛵 <b>Plataformas:</b> ${escaped}, ${escaped}`,
    `💬 <b>Contato Preferencial:</b> ${escaped}`,
    `📝 <b>Mensagem:</b> ${escaped}`,
    `🌐 <b>Origem:</b> ${escaped}`,
    `🆔 <b>ID:</b> <code>${escaped}</code>`,
  ].join('\n'));
  assert.equal(text.includes('<tag'), false);
});

test('Portuguese aliases and string platforms also escape external HTML', () => {
  const text = message({
    nome: '<Nome&>', empresa: '<Empresa&>', whatsapp: '<Telefone&>',
    segmento: '<Segmento&>', currentPain: '<Mensagem&>', platforms: '<Plataforma&>',
  });
  for (const value of ['Nome', 'Empresa', 'Telefone', 'Segmento', 'Mensagem', 'Plataforma']) {
    assert.ok(text.includes(`&lt;${value}&amp;&gt;`));
  }
  assert.ok(message({ mensagem: '&lt;<&amp;>' }).includes('&amp;lt;&lt;&amp;amp;&gt;'));
});

test('phone links contain only normalized digits and preserve existing fallback', () => {
  for (const [phone, expected] of [
    ['(11) 9999-0000', '551199990000'],
    ['(11) 99999-0000', '5511999990000'],
    ['+55 (11) 99999-0000', '5511999990000'],
    ['<script>(11) 99999-0000</script>', '5511999990000'],
  ]) {
    assert.equal(buttonUrl({ phone }), `https://wa.me/${expected}`);
    assert.ok(message({ phone }).includes(`<a href="https://wa.me/${expected}">wa.me/${expected}</a>`));
    assert.equal(message({ phone }).includes('<script>'), false);
  }
  assert.equal(buttonUrl({}), 'https://wa.me/');
});

test('optional fields keep their existing omission rules and real line breaks', () => {
  const empty = '🔔 <b>Novo Lead Comercial</b>\n';
  assert.equal(message(undefined), empty);
  assert.equal(message({
    locations: 1,
    monthlyDeliveryOrders: 'N/A',
    platforms: 'N/A',
    preferredContact: 'whatsapp',
    mensagem: 'N/A',
    id: 'N/A',
  }), empty);
  assert.equal(message({ nome: 'Ana', empresa: 'Mercado' }).includes('\\n'), false);
});

test('acknowledgement is true with HTTP 200 only for Telegram ok === true', () => {
  for (const [json, expectedOk, expectedStatus] of [
    [{ ok: true }, true, 200],
    [{ ok: false }, false, 502],
    [{}, false, 502],
    [{ ok: 'true' }, false, 502],
    [{ ok: 1 }, false, 502],
    [{ ok: null }, false, 502],
  ]) {
    const response = evaluate(responder.parameters.responseBody, json);
    assert.deepEqual(Object.keys(response), ['ok']);
    assert.equal(response.ok, expectedOk);
    assert.equal(evaluate(responder.parameters.options.responseCode, json), expectedStatus);
  }
});

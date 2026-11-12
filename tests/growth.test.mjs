import { demoProject } from '../lib/interestLinks.ts';
import api from '../api/growth.ts';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { growthProxy } from '../server/growthProxy.ts';
import { ContactSubmission } from '../lib/contactSubmission.ts';
import { projectCases } from '../data/projectCases.ts';
import { routeMetadata } from '../lib/routeMetadata.ts';
const env = { NEXA_GROWTH_URL:'https://receiver.example.invalid', NEXA_GROWTH_TOKEN:'private-token', VERCEL_ENV:'preview' };
const request = (resource='contact',body='{}',headers={}) => new Request('https://site.example.invalid/api/growth?resource='+resource,{ method:'POST', headers:{'Content-Type':'application/json','Origin':'https://site.example.invalid','x-vercel-forwarded-for':'192.0.2.1',...headers},body });
test('private proxy forwards only the fixed resource and keeps its token server-side',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({ok:true,registered:true,receipt:'NR-0123456789ABCDEF'}));
  const response=await growthProxy(request('contact','{}',{'Idempotency-Key':'key-for-test-0000','X-Environment':'production'}),env);
  assert.equal(response.status,200);
  const [url,init]=mock.mock.calls[0].arguments;
  assert.equal(String(url),'https://receiver.example.invalid/contact');
  assert.equal(init.headers.Authorization,'Bearer private-token');
  assert.equal(init.headers['Idempotency-Key'],'key-for-test-0000');
  assert.equal(init.headers['X-Environment'],'preview');
  assert.match(init.headers['X-Client-Key'],/^[a-f0-9]{64}$/);
  assert.equal(JSON.stringify([...response.headers]).includes('private-token'),false);
});
test('proxy rejects cross-origin, unknown resources, unsupported media and oversized streamed body',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>{throw new Error('must not fetch');});
  assert.equal((await growthProxy(request('contact','{}',{Origin:'https://evil.invalid'}),env)).status,403);
  assert.equal((await growthProxy(request('http://evil.invalid'),env)).status,404);
  assert.equal((await growthProxy(request('contact','{}',{'Content-Type':'text/plain'}),env)).status,415);
  assert.equal((await growthProxy(request('contact','x'.repeat(17000)),env)).status,413);
  assert.equal(mock.mock.callCount(),0);
});
test('proxy fails closed when receiver or runtime configuration is unavailable',async t=>{
  t.mock.method(globalThis,'fetch',async()=>{throw new TypeError('network unavailable');});
  assert.equal((await growthProxy(request(),{})).status,503);
  const response=await growthProxy(request(),env);
  assert.equal(response.status,503); assert.equal((await response.json()).ok,false);
});
test('metric report key is forwarded separately from the service credential',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({ok:false}, {status:401}));
  assert.equal((await growthProxy(request('metrics','{}',{Authorization:'Bearer wrong'}),env)).status,401);
  const init=mock.mock.calls[0].arguments[1];
  assert.equal(init.headers['X-Metrics-Key'],'wrong');assert.equal(init.headers.Authorization,'Bearer private-token');
});
test('durable receipt requires a valid protocol and adds idempotency without changing the payload',async t=>{
  const mock=t.mock.method(globalThis,'fetch',async()=>Response.json({ok:true,registered:true,receipt:'NR-0123456789ABCDEF'}));
  const submission=new ContactSubmission();
  const receipt=await submission.submit('/api/contact',{nome:'Teste'},'key-for-test-0000');
  assert.equal(receipt.receipt,'NR-0123456789ABCDEF');
  assert.deepEqual(JSON.parse(mock.mock.calls[0].arguments[1].body),{nome:'Teste'});
  assert.equal(mock.mock.calls[0].arguments[1].headers['Idempotency-Key'],'key-for-test-0000');
  mock.mock.mockImplementation(async()=>Response.json({ok:true,registered:true,receipt:'invalid'}));
  await assert.rejects(submission.submit('/api/contact',{nome:'Teste'}));
});
test('each public case has its own metadata and CestaEsperta has no invented demo',()=>{
  assert.equal(Object.keys(projectCases).length,4);
  for(const [id,project] of Object.entries(projectCases)){
    assert.equal(routeMetadata['/projetos/'+id].description,project.summary);
    assert.ok(project.problem&&project.solution&&project.steps.length);
  }
  assert.equal(projectCases['cesta-esperta'].demo,'');
  assert.equal(routeMetadata['/metricas'],undefined);
});

test('the Vercel entry point reads server env even when a platform context is passed',async t=>{
  const old={url:process.env.NEXA_GROWTH_URL,token:process.env.NEXA_GROWTH_TOKEN};
  process.env.NEXA_GROWTH_URL=env.NEXA_GROWTH_URL;process.env.NEXA_GROWTH_TOKEN=env.NEXA_GROWTH_TOKEN;
  t.mock.method(globalThis,'fetch',async()=>Response.json({ok:true}));
  try { assert.equal((await api.fetch(request(),{waitUntil(){}})).status,200); }
  finally { if(old.url===undefined)delete process.env.NEXA_GROWTH_URL;else process.env.NEXA_GROWTH_URL=old.url;if(old.token===undefined)delete process.env.NEXA_GROWTH_TOKEN;else process.env.NEXA_GROWTH_TOKEN=old.token; }
});
test('bad upstream JSON and malformed endpoint fail as server errors',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('<html>not an acknowledgement</html>'));
  assert.equal((await growthProxy(request(),env)).status,503);
  assert.equal((await growthProxy(request(),{...env,NEXA_GROWTH_URL:'invalid'})).status,503);
});

test('all three existing demo destinations map to interest events with or without a root slash',()=>{
  assert.equal(demoProject('https://chamaaifood.nexareis.com.br/pilot'),'chamaai-food');
  assert.equal(demoProject('https://chamaai.nexareis.com.br/'),'chamaai-filas');
  assert.equal(demoProject('https://signageflow.nexareis.com.br/?source=test'),'signageflow');
  assert.equal(demoProject('https://signageflow.nexareis.com.br/unrelated'),undefined);
  assert.equal(demoProject('https://example.invalid'),undefined);
});

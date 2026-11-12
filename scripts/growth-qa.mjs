import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:4175';
const server = spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175','--strictPort'],{stdio:'pipe'});
const checks=[], accessibility=[], events=[], contacts=[];
let browser,page;
async function check(name,fn){try{await fn();checks.push({name,status:'pass'});console.log('PASS',name);}catch(e){checks.push({name,status:'fail',error:String(e)});console.error('FAIL',name,e);await page?.screenshot({path:`qa/growth-failure-${checks.length}.png`,fullPage:true}).catch(()=>{});}}
async function capture(path){await page.evaluate(async()=>{scrollTo(0,0);await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));});await page.screenshot({path,fullPage:true});}
async function axe(name){const result=await new AxeBuilder({page}).include('main').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();accessibility.push({name,violations:result.violations});assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],name);}
try{
 await mkdir('qa',{recursive:true});
 for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 let contactOk=false;
 await context.route('**/*',route=>{
  const request=route.request(),path=new URL(request.url()).pathname;
  if(path==='/api/events'){events.push(JSON.parse(request.postData()||'{}'));return route.fulfill({status:204});}
  if(path==='/api/contact'){contacts.push({body:JSON.parse(request.postData()||'{}'),key:request.headers()['idempotency-key']});return route.fulfill({status:contactOk?200:503,contentType:'application/json',body:JSON.stringify(contactOk?{ok:true,registered:true,receipt:'NR-0123456789ABCDEF'}:{ok:false})});}
  if(path==='/api/metrics'){const allowed=request.headers().authorization==='Bearer test-panel-key';return route.fulfill({status:allowed?200:401,contentType:'application/json',body:JSON.stringify(allowed?{ok:true,days:30,totals:[{environment:'preview',event:'quote_complete',product:'signageflow',path:'/orcamento',samples:2,total:0,good:0},{environment:'preview',event:'LCP',product:'',path:'/',samples:2,total:3800,good:1}],notifications:[{state:'uncertain',count:1}]}:{ok:false})});}
  if(request.method()==='POST')return route.abort('blockedbyclient');
  return route.continue();
 });
 page=await context.newPage();
 const runtimeErrors=[];page.on('pageerror',e=>runtimeErrors.push(e.message));
 await check('anchor remains aligned after a deferred section finishes loading',async()=>{
  await page.route('**/assets/ProductComparison-*.js',async route=>{await new Promise(r=>setTimeout(r,700));await route.continue();});
  await page.goto(base+'/#solucoes');await page.getByText('Uma base tecnológica.',{exact:false}).waitFor();await page.waitForFunction(()=>Math.abs(document.getElementById('solucoes').getBoundingClientRect().top-96)<2);
  await page.unroute('**/assets/ProductComparison-*.js');
 });
 await check('wizard validates, moves keyboard focus and preserves selections when going back',async()=>{
  await page.goto(base+'/orcamento');await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('alert').getByText('Escolha uma opção para continuar.').waitFor();
  await page.getByRole('radio',{name:'Loja, franquia ou varejo',exact:true}).check();await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.waitForFunction(()=>document.activeElement?.textContent==='O que você quer organizar primeiro?');
  await page.getByRole('radio',{name:'Atualizar o conteúdo de TVs e telas',exact:false}).check();await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.getByRole('heading',{name:'SignageFlow',exact:true}).waitFor();
  const whatsapp=await page.getByRole('link',{name:'Conversar pelo WhatsApp'}).getAttribute('href');assert.equal(new URL(whatsapp).hostname,'wa.me');assert.equal(new URL(whatsapp).pathname,'/5511937105501');assert.match(new URL(whatsapp).searchParams.get('text'),/Loja, franquia ou varejo/);
  await axe('quote recommendation');await capture('qa/orcamento-resultado-390.png');
  await page.getByRole('button',{name:'Voltar',exact:true}).click();await page.getByRole('radio',{name:'Atualizar o conteúdo de TVs e telas',exact:false}).waitFor();assert.equal(await page.getByRole('radio',{name:'Atualizar o conteúdo de TVs e telas',exact:false}).isChecked(),true);
  await page.getByRole('button',{name:'Voltar',exact:true}).click();assert.equal(await page.getByRole('radio',{name:'Loja, franquia ou varejo',exact:true}).isChecked(),true);
 });
 await check('all five recommendations match the selected task and custom work stays honest',async()=>{
  for(const id of ['chamaai-food','chamaai-filas','signageflow','cesta-esperta','sob-medida']){
   await page.goto(base+'/orcamento?segmento=outros&necessidade='+id);await page.getByRole('button',{name:'Continuar',exact:true}).click();assert.equal(await page.locator(`input[value="${id}"]`).isChecked(),true);await page.getByRole('button',{name:'Continuar',exact:true}).click();
   await page.locator('.quote-result h3').waitFor();assert.equal(await page.locator('.quote-result h3').count(),1);assert.equal(await page.locator('.quote-result a[href^="/projetos/"]').count(),id==='sob-medida'?0:1);
  }
  await page.goto(base+'/orcamento?segmento=evil&necessidade=evil');assert.equal(await page.locator('.quote-options input:checked').count(),0);
 });
 await check('guided summary fills the existing contact form and error/retry uses one request key',async()=>{
  await page.goto(base+'/orcamento?segmento=varejo&necessidade=signageflow');await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('button',{name:'Levar resumo ao contato'}).click();
  await page.locator('#contato #nome').waitFor();assert.equal(await page.locator('#segmento').inputValue(),'varejo');assert.equal(await page.locator('#necessidade').inputValue(),'signageflow');assert.match(await page.locator('#mensagem').inputValue(),/SignageFlow/);
  await page.locator('#nome').fill('Teste sintético QA');await page.locator('#empresa').fill('NexaReis QA');await page.locator('#email').fill('qa@example.invalid');await page.locator('#whatsapp').fill('11999999999');
  await page.locator('#contato button[type=submit]').click();await page.getByRole('alert').filter({hasText:'Não foi possível confirmar'}).waitFor();assert.equal(await page.locator('#nome').inputValue(),'Teste sintético QA');
  contactOk=true;await page.locator('#contato button[type=submit]').click();await page.getByRole('heading',{name:'Solicitação registrada'}).waitFor();await page.getByText('NR-0123456789ABCDEF',{exact:true}).waitFor();assert.equal(contacts.length,2);assert.equal(contacts[0].key,contacts[1].key);assert.deepEqual(contacts[0].body,contacts[1].body);
  await page.waitForFunction(()=>{const status=document.querySelector('#contato [role=status]');return status && Number(getComputedStyle(status).opacity)===1;});
  await axe('durable receipt');await capture('qa/contato-protocolo-390.png');await page.locator('#contato').screenshot({path:'qa/contato-confirmacao-390.png'});
 });
 await check('existing contact intent preserves typed personal fields',async()=>{
  await page.goto(base+'/#contato');await page.reload();await page.locator('#nome').fill('Contato preservado');await page.evaluate(()=>window.dispatchEvent(new CustomEvent('nexa:contact-intent',{detail:{necessidade:'cesta-esperta'}})));assert.equal(await page.locator('#nome').inputValue(),'Contato preservado');assert.equal(await page.locator('#necessidade').inputValue(),'cesta-esperta');
 });
 await check('new pages fit 320, 390, 768 and 1440 px with no duplicate IDs',async()=>{
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const path of ['/orcamento','/projetos/chamaai-food','/projetos/chamaai-filas','/projetos/signageflow','/projetos/cesta-esperta','/metricas']){
    await page.goto(base+path);await page.locator('main h1').waitFor();await page.evaluate(()=>document.fonts.ready);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${path} ${width} horizontal overflow`);
    assert.deepEqual(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i);}),[]);
    await capture(`qa/${path.slice(1).replaceAll('/','-')}-${width}.png`);
    if(width===390)await axe(path);
   }
  }
 });
 await check('project pages preserve demo destinations, disclosure and individual metadata',async()=>{
  for(const [id,url] of Object.entries({'chamaai-food':'https://chamaaifood.nexareis.com.br/pilot','chamaai-filas':'https://chamaai.nexareis.com.br','signageflow':'https://signageflow.nexareis.com.br','cesta-esperta':''})){
   await page.goto(base+'/projetos/'+id);await page.locator('main h1').waitFor();assert.match(await page.title(),/Projetos Nexa Reis/);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.nexareis.com.br/projetos/'+id);
   if(url)assert.equal(await page.getByRole('link',{name:'Abrir demonstração',exact:true}).getAttribute('href'),url);else{assert.equal(await page.getByRole('link',{name:'Abrir demonstração',exact:true}).count(),0);await page.getByText('Representação ilustrativa do fluxo.',{exact:false}).waitFor();}
  }
  await page.goto(base+'/projetos/inexistente');await page.getByRole('heading',{name:'Projeto não encontrado'}).waitFor();await page.waitForFunction(()=>document.querySelector('meta[name=robots]').content==='noindex,follow');
 });
 await check('private metrics reject invalid access and render empty/loaded data honestly',async()=>{
  await page.goto(base+'/metricas');await page.locator('#metrics-key').fill('wrong');await page.getByRole('button',{name:'Consultar métricas'}).click();await page.getByRole('alert').filter({hasText:'não foi reconhecida'}).waitFor();assert.equal(await page.locator('table').count(),0);
  await page.locator('#metrics-key').fill('test-panel-key');await page.getByRole('button',{name:'Consultar métricas'}).click();await page.getByText('Ainda não há amostras neste ambiente.',{exact:false}).waitFor();await page.getByRole('combobox',{name:'Ambiente'}).selectOption('preview');await page.getByRole('cell',{name:'SignageFlow',exact:true}).waitFor();await page.getByText('Resultado incerto, revisar',{exact:true}).waitFor();await axe('metrics loaded');await capture('qa/metricas-carregado-1440.png');assert.equal(await page.evaluate(()=>sessionStorage.length),0);await page.reload();assert.equal(await page.locator('#metrics-key').inputValue(),'');
 });
 await check('measurement contains only allowlisted dimensions and respects Do Not Track',async()=>{
  assert.ok(events.some(e=>e.event==='quote_complete'));
  for(const event of events){assert.deepEqual(Object.keys(event).filter(k=>!['event','product','path','value'].includes(k)),[]);assert.ok(!event.path?.includes('?'));assert.equal(JSON.stringify(event).includes('qa@example'),false);}
  const isolated=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});await isolated.addInitScript(()=>Object.defineProperty(navigator,'doNotTrack',{value:'1'}));let attempted=0;await isolated.route('**/*',route=>{if(route.request().method()==='POST'){attempted++;return route.abort();}return route.continue();});const p=await isolated.newPage();await p.goto(base+'/orcamento');await p.locator('h1').waitFor();await p.waitForTimeout(300);assert.equal(attempted,0);await isolated.close();
 });
 await check('keyboard selects native options and metrics failures do not stop navigation',async()=>{
  await page.goto(base+'/orcamento');const radio=page.locator('.quote-options input').first();await radio.focus();await page.keyboard.press('Space');assert.equal(await radio.isChecked(),true);await page.keyboard.press('ArrowDown');assert.equal(await page.locator('.quote-options input').nth(1).isChecked(),true);
  await context.route('**/api/events',route=>route.abort('failed'));await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('heading',{name:'O que você quer organizar primeiro?'}).waitFor();
  assert.deepEqual(runtimeErrors,[]);
 });
 await context.close();
 await writeFile('qa/growth-report.json',JSON.stringify({checks,accessibility,events:events.length,interceptedContacts:contacts.length,realNotificationsSent:0},null,2));
 if(checks.some(c=>c.status==='fail'))process.exitCode=1;else console.log(`${checks.length} growth checks passed.`);
}finally{await browser?.close();server.kill('SIGTERM');}

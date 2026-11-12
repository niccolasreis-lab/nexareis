import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, RefreshCw } from 'lucide-react';
import { projectCases } from '../data/projectCases';
import '../styles/growth.css';
type Total = { environment: string; event: string; product: string; path: string; samples: number; total: number; good: number };
type Report = { days: number; totals: Total[]; notifications: { state: string; count: number }[] };
const labels: Record<string,string> = { page_view:'Páginas vistas', project_view:'Projetos consultados', demo_click:'Demonstrações abertas', whatsapp_click:'Cliques no WhatsApp', quote_complete:'Orçamentos guiados concluídos', contact_registered:'Contatos confirmados no site', LCP:'LCP', INP:'INP', CLS:'CLS' };
const states: Record<string,string> = { queued:'Na fila', sending:'Em envio', accepted:'Aceitas pelo n8n', rejected:'Recusadas pelo n8n', uncertain:'Resultado incerto, revisar' };
export function Metrics() {
  const [key, setKey] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [environment, setEnvironment] = useState('production');
  async function refresh(event: FormEvent) {
    event.preventDefault(); if (pending) return; setPending(true); setError('');
    try {
      const response = await fetch('/api/metrics', { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:'Bearer ' + key },body:'{}',cache:'no-store',signal:AbortSignal.timeout(12000) });
      if (response.status === 401) throw new Error('A chave de acesso não foi reconhecida. Confira a chave privada do painel.');
      if (response.status === 429) throw new Error('Muitas tentativas. Aguarde um minuto e tente novamente.');
      const body = await response.json();
      if (!response.ok || body.ok !== true || !Array.isArray(body.totals) || !Array.isArray(body.notifications)) throw new Error('Não foi possível carregar as métricas. Tente novamente.');
      setReport(body);
    } catch (e) { setError(e instanceof Error && /^(A chave|Muitas tentativas|Não foi possível)/.test(e.message) ? e.message : 'A consulta demorou mais que o esperado. Tente novamente.'); }
    finally { setPending(false); }
  }
  const rows = report?.totals.filter(row => row.environment === environment) || [];
  return <article className="growth-page metrics-page"><div className="growth-shell">
    <Link to="/" className="growth-back"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao site</Link>
    <h1>Interesse nas soluções.</h1><p className="growth-intro">Contagens dos últimos 30 dias e medidas de desempenho recebidas dos navegadores. Os números representam interações, sem identificação de visitantes.</p>
    <form onSubmit={refresh} className="metrics-access"><label htmlFor="metrics-key"><LockKeyhole size={17} aria-hidden="true" /> Chave privada do painel</label><div><input id="metrics-key" type="password" autoComplete="off" name="metrics-key" spellCheck={false} required value={key} onChange={e => setKey(e.target.value)} aria-describedby="metrics-key-help" /><button type="submit" className="growth-button" disabled={pending}><RefreshCw size={17} aria-hidden="true" />{pending ? 'Consultando…' : report ? 'Atualizar métricas' : 'Consultar métricas'}</button></div><p id="metrics-key-help">A chave fica apenas na memória desta página. Use a chave configurada na VPS para este painel.</p></form>
    {error && <p role="alert" className="growth-error">{error}</p>}
    {report && <section className="metrics-results" aria-label="Resultados das métricas"><div className="metrics-filter"><h2>Interações registradas</h2><label>Ambiente<select value={environment} onChange={e => setEnvironment(e.target.value)}><option value="production">Produção</option><option value="preview">Prévia e testes</option></select></label></div>{rows.length ? <div className="metrics-table-scroll"><table><caption>Últimos {report.days} dias. Cliques e páginas vistas podem se repetir; não representam pessoas únicas.</caption><thead><tr><th scope="col">Evento</th><th scope="col">Projeto ou página</th><th scope="col">Amostras</th><th scope="col">Média / amostras boas</th></tr></thead><tbody>{rows.map(row => <tr key={[row.environment,row.event,row.product,row.path].join(':')}><th scope="row">{labels[row.event] || row.event}</th><td>{projectCases[row.product as keyof typeof projectCases]?.name || row.path}</td><td>{row.samples.toLocaleString('pt-BR')}</td><td>{['LCP','INP','CLS'].includes(row.event) ? `${(row.total / row.samples).toLocaleString('pt-BR',{maximumFractionDigits:row.event === 'CLS' ? 3 : 0})}${row.event === 'CLS' ? '' : ' ms'} / ${row.good} de ${row.samples}` : '—'}</td></tr>)}</tbody></table></div> : <p className="metrics-empty">Ainda não há amostras neste ambiente. As contagens aparecem conforme o site recebe interações.</p>}<p className="metrics-method">Desempenho: LCP até 2.500 ms, INP até 200 ms e CLS até 0,1 entram como amostras boas. A média é descritiva; este painel não calcula o percentil 75 nem certifica aprovação nos Core Web Vitals. Preferências de privacidade e bloqueadores podem reduzir a coleta.</p><h2>Notificações dos pedidos</h2><p className="metrics-method">Todos os pedidos recebidos por este receptor nos últimos 30 dias. Aceitação pelo n8n não confirma leitura no WhatsApp.</p><dl className="metrics-notifications">{report.notifications.length ? report.notifications.map(item => <div key={item.state}><dt>{states[item.state] || item.state}</dt><dd>{item.count}</dd></div>) : <p>Nenhuma solicitação registrada no período.</p>}</dl></section>}
  </div></article>;
}

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { quoteSegments, quoteNeeds, readQuote, quoteResult, type QuoteSegment, type QuoteNeed } from '../lib/quote';
import { prepareContact } from '../lib/contactIntent';
import { trackInterest } from '../lib/analytics';
import '../styles/growth.css';
export function Quote() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = readQuote(location.search);
  const [segment, setSegment] = useState<QuoteSegment | ''>(initial.segment);
  const [need, setNeed] = useState<QuoteNeed | ''>(initial.need);
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const reduced = useReducedMotion();
  const [logged, setLogged] = useState('');
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus();
  }, [step]);
  const result = segment && need ? quoteResult(segment, need) : null;
  const next = () => {
    if ((step === 0 && !segment) || (step === 1 && !need)) { setError('Escolha uma opção para continuar.'); return; }
    setError('');
    if (step === 1) {
      const fingerprint = segment + ':' + need;
      if (logged !== fingerprint) { trackInterest('quote_complete', need); setLogged(fingerprint); }
    }
    setStep(step + 1);
  };
  const contact = () => {
    if (!result) return;
    prepareContact({ segmento: segment, necessidade: need, mensagem: result.message });
    navigate('/#contato');
  };
  return <article className="growth-page quote-page">
    <div className="growth-shell">
      <Link to="/#produtos" className="growth-back"><ArrowLeft size={17} aria-hidden="true" /> Voltar para as soluções</Link>
      <div className="quote-layout">
        <div className="quote-main">
          <ol className="quote-progress" aria-label="Etapas do orçamento">
            {['Seu negócio', 'Sua necessidade', 'Próximo passo'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} data-complete={step > index}><span aria-hidden="true">{step > index ? <Check size={16} /> : index + 1}</span>{label}</li>)}
          </ol>
          <h1>Vamos entender o que sua empresa precisa.</h1>
          <p className="growth-intro">Duas escolhas para começar uma conversa com contexto. A proposta e os valores são definidos após avaliar sua operação.</p>
          <h2 ref={heading} tabIndex={-1} className="quote-question">{step === 0 ? 'Qual é o seu tipo de negócio?' : step === 1 ? 'O que você quer organizar primeiro?' : 'Um ponto de partida para sua operação.'}</h2>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={reduced ? false : { opacity: 0.85, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0.85 }} transition={{ duration: 0.16 }}>
              {step < 2 ? <fieldset className="quote-options" aria-describedby={error ? 'quote-error' : undefined}>
                <legend className="sr-only">{step === 0 ? 'Tipo de negócio' : 'Necessidade principal'}</legend>
                {(step === 0 ? quoteSegments : quoteNeeds).map(option => <label key={option.id} className="quote-option">
                  <input type="radio" name={step === 0 ? 'segmento' : 'necessidade'} value={option.id} checked={(step === 0 ? segment : need) === option.id} onChange={() => { if (step === 0) setSegment(option.id as QuoteSegment); else setNeed(option.id as QuoteNeed); setError(''); }} />
                  <span><strong>{option.label}</strong>{'detail' in option && <small>{option.detail}</small>}</span>
                </label>)}
              </fieldset> : result && <div className="quote-result">
                <h3>{result.name}</h3><p>{result.description}</p>
                <p className="quote-disclaimer">Essa indicação parte da tarefa escolhida. A compatibilidade, as integrações e a implantação precisam ser avaliadas com você.</p>
                {result.projectId && <Link to={'/projetos/' + result.projectId} className="growth-inline-link">Conhecer o projeto <ArrowRight size={17} aria-hidden="true" /></Link>}
                <div className="quote-result-actions"><button type="button" className="growth-button" onClick={contact}>Levar resumo ao contato <ArrowRight size={17} aria-hidden="true" /></button><a data-interest-product={need} href={result.whatsapp} target="_blank" rel="noopener noreferrer" className="growth-button secondary"><MessageCircle size={17} aria-hidden="true" /> Conversar pelo WhatsApp</a></div>
                <details className="quote-message"><summary>Ver a mensagem que preparei</summary><p>{result.message}</p></details>
              </div>}
            </motion.div>
          </AnimatePresence>
          {error && <p id="quote-error" role="alert" className="growth-error">{error}</p>}
          <div className="quote-controls">{step > 0 && <button type="button" className="growth-inline-link" onClick={() => { setError(''); setStep(step - 1); }}><ArrowLeft size={17} aria-hidden="true" /> Voltar</button>}{step < 2 && <button type="button" className="growth-button" onClick={next}>Continuar <ArrowRight size={17} aria-hidden="true" /></button>}</div>
        </div>
        <aside className="quote-summary" aria-label="Resumo das escolhas">
          <h2>Sua operação,<br />como ponto de partida.</h2><p>Escolha o que mais se aproxima da sua rotina. Você pode revisar as respostas antes de entrar em contato.</p>
          <dl><div><dt>Negócio</dt><dd>{quoteSegments.find(s => s.id === segment)?.label || 'Ainda não escolhido'}</dd></div><div><dt>Necessidade</dt><dd>{quoteNeeds.find(n => n.id === need)?.label || 'Ainda não escolhida'}</dd></div></dl>
          <p className="quote-summary-note">O resumo fica nesta conversa com o site. Seus dados de contato só são enviados quando você confirma no formulário ou no WhatsApp.</p>
        </aside>
      </div>
    </div>
  </article>;
}

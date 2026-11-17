import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/cinematic-stage.css';

type MotionLevel = 'off' | 'soft' | 'full';

const scenes = [
  {
    eyebrow: '01 / CRIATIVIDADE EM MOVIMENTO',
    lines: ['IDEIAS', 'QUE GANHAM', 'MOVIMENTO.'],
    description: 'Transformamos ideias em experiências digitais que aproximam tecnologia e pessoas.',
    footnote: 'Design + engenharia + impacto',
  },
  {
    eyebrow: '02 / AUTOMAÇÃO QUE FUNCIONA',
    lines: ['MENOS', 'ROTINA.', 'MAIS FUTURO.'],
    description: 'Sistemas e automações para eliminar tarefas repetitivas e simplificar operações.',
    footnote: 'Processos mais inteligentes',
  },
  {
    eyebrow: '03 / PRODUTOS DIGITAIS REAIS',
    lines: ['DO PRIMEIRO', 'CLIQUE À', 'OPERAÇÃO.'],
    description: 'Criamos interfaces, integrações e ferramentas que evoluem com o seu negócio.',
    footnote: 'Experiências conectadas',
  },
  {
    eyebrow: '04 / SUA PRÓXIMA IDEIA',
    lines: ['O PRÓXIMO', 'PASSO É', 'AGORA.'],
    description: 'Vamos transformar o seu desafio em uma solução digital feita para a realidade da sua empresa.',
    footnote: 'Vamos construir juntos',
  },
] as const;

export function CinematicStage() {
  const reduceMotion = useReducedMotion();
  const [activeScene, setActiveScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const stageRef = useRef<HTMLElement>(null);

  // Full cinematic motion by default. Respect OS accessibility preferences.
  const level: MotionLevel = reduceMotion ? 'off' : 'full';
  const scene = scenes[activeScene];
  const animated = level !== 'off';
  const duration = level === 'full' ? 0.8 : level === 'soft' ? 0.46 : 0;
  const shouldAutoplay = animated && playing && visible && tabVisible;

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    update();
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!shouldAutoplay) return;
    const timeout = window.setTimeout(
      () => setActiveScene((current) => (current + 1) % scenes.length),
      level === 'full' ? 6200 : 7000,
    );
    return () => window.clearTimeout(timeout);
  }, [activeScene, level, shouldAutoplay]);

  const selectScene = (index: number) => setActiveScene((index + scenes.length) % scenes.length);

  return (
    <section ref={stageRef} id="preview-motion" className="nr-cine" data-intensity={level} aria-label="Prévia interativa da animação Nexa Reis">
      <div className="nr-cine__intro">
        <span className="nr-cine__intro-label"><span className="nr-cine__live-dot" /> NEXA REIS / MOTION LAB</span>
        <Link className="nr-cine__back" to="/">Voltar ao site atual <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>

      <div className="nr-cine__stage">
        <div className="nr-cine__grid" aria-hidden="true" />
        <div className="nr-cine__halo" aria-hidden="true" />
        <div className="nr-cine__vertical-label" aria-hidden="true">DIGITAL EXPERIENCES — NEXA REIS</div>

        <div className="nr-cine__main">
          <div className="nr-cine__copy">
            <p className="nr-cine__eyebrow">{scene.eyebrow}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeScene}
                initial={animated ? { opacity: 0, x: level === 'full' ? -45 : -18, scale: level === 'full' ? 0.97 : 1 } : false}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={animated ? { opacity: 0, x: level === 'full' ? 42 : 12, scale: 1.015 } : undefined}
                transition={{ duration, ease: 'easeOut' }}
              >
                <h1 className="nr-cine__headline">
                  {scene.lines.map((line, index) => (
                    <motion.span
                      className={'nr-cine__line' + (index === 2 ? ' nr-cine__line--accent' : '')}
                      key={line}
                      initial={animated ? { opacity: 0, y: level === 'full' ? 34 : 16 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration, delay: animated ? index * (level === 'full' ? 0.1 : 0.07) : 0, ease: 'easeOut' }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </h1>
                <p className="nr-cine__description">{scene.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="nr-cine__actions">
              <Link to="/orcamento" className="nr-cine__primary">
                Converse sobre seu projeto <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/#produtos" className="nr-cine__secondary">Ver nossas soluções</Link>
            </div>
          </div>

          <div className="nr-cine__art" aria-hidden="true">
            <div className="nr-cine__orb-orbit nr-cine__orb-orbit--outer" />
            <div className="nr-cine__orb-orbit nr-cine__orb-orbit--middle" />
            <div className="nr-cine__orb-orbit nr-cine__orb-orbit--inner" />
            <div className="nr-cine__orb">
              <span>NR</span>
              <small>NEXA / REIS</small>
            </div>
            <span className="nr-cine__art-label nr-cine__art-label--top">SINCRONIA  //  001</span>
            <span className="nr-cine__art-label nr-cine__art-label--bottom">CREATIVE SYSTEMS © 2026</span>
            <div className="nr-cine__art-marker nr-cine__art-marker--a" />
            <div className="nr-cine__art-marker nr-cine__art-marker--b" />
          </div>
        </div>

        <div className="nr-cine__stage-bottom">
          <div className="nr-cine__scene-status">
            <span className="nr-cine__scene-number">0{activeScene + 1}</span>
            <span className="nr-cine__scene-count">/ 0{scenes.length}</span>
            <span className="nr-cine__scene-note">{scene.footnote}</span>
          </div>
          <div className="nr-cine__scene-controls" aria-label="Controles da apresentação">
            <button type="button" className="nr-cine__icon-button" onClick={() => selectScene(activeScene - 1)} aria-label="Cena anterior"><ChevronLeft size={19} /></button>
            <button
              type="button"
              className="nr-cine__icon-button"
              onClick={() => setPlaying((value) => !value)}
              disabled={!animated}
              aria-label={playing ? 'Pausar animação automática' : 'Reproduzir animação automática'}
              title={!animated ? 'Animações desativadas' : undefined}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button type="button" className="nr-cine__icon-button" onClick={() => selectScene(activeScene + 1)} aria-label="Próxima cena"><ChevronRight size={19} /></button>
          </div>
        </div>
      </div>

      <div className="nr-cine__understage">
        <div className="nr-cine__scene-pips" role="group" aria-label="Selecionar cena">
          {scenes.map((item, index) => (
            <button
              type="button"
              key={item.eyebrow}
              onClick={() => selectScene(index)}
              aria-label={'Ir para a cena ' + (index + 1)}
              aria-pressed={activeScene === index}
              className={'nr-cine__pip' + (index === activeScene ? ' nr-cine__pip--active' : '')}
            ><span /></button>
          ))}
        </div>

      </div>
      <p className="nr-cine__help">Prévia experimental • Cenas navegáveis • A página inicial atual não foi modificada.</p>
    </section>
  );
}

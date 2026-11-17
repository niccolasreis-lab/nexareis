import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Workflow, Layers3, Cable } from 'lucide-react';
import { CinematicStage } from '../components/CinematicStage';

const cards = [
  {
    number: '01 / AUTOMAÇÃO',
    title: 'Menos tarefas. Mais tempo.',
    description: 'Automações práticas que conectam ferramentas e melhoram o dia a dia da operação.',
    href: '/servicos/automacao',
    icon: Workflow,
  },
  {
    number: '02 / SISTEMAS',
    title: 'Tecnologia sob medida.',
    description: 'Sistemas e interfaces pensados para a rotina real de cada negócio.',
    href: '/servicos/sistemas',
    icon: Layers3,
  },
  {
    number: '03 / INTEGRAÇÃO',
    title: 'Tudo conectado.',
    description: 'Conexões entre plataformas, fluxos e dados para reduzir trabalho manual.',
    href: '/servicos/integracao',
    icon: Cable,
  },
];

export function MotionPreview() {
  return (
    <div className="nr-preview">
      <CinematicStage />
      <section className="nr-preview__details" aria-labelledby="nr-preview-solutions">
        <div className="nr-preview__details-header">
          <div>
            <p className="nr-preview__eyebrow">NEXA REIS / O QUE CRIAMOS</p>
            <h2 id="nr-preview-solutions">Movimento que apresenta soluções de verdade.</h2>
          </div>
          <p>A composição visual é experimental. Os links levam a páginas e serviços reais do website atual.</p>
        </div>
        <div className="nr-preview__cards">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link className="nr-preview__card" to={card.href} key={card.href}>
                <span className="nr-preview__card-label">{card.number}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <span className="nr-preview__card-bottom">
                  <span className="nr-preview__card-label">CONHECER SOLUÇÃO</span>
                  <span className="nr-preview__card-icon"><Icon size={21} aria-hidden="true" /></span>
                </span>
              </Link>
            );
          })}
        </div>
        <p style={{ marginTop: 30, fontSize: 13, color: '#52616b' }}>
          Esta página é uma prova de conceito isolada. Para navegar pela experiência original,{' '}
          <Link to="/" style={{ color: '#005f73', textDecoration: 'underline', textUnderlineOffset: 4 }}>volte à página inicial da Nexa Reis</Link>.
        </p>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, Github, Instagram, MapPin, MessageCircle, Phone, ShoppingBasket, UsersRound } from 'lucide-react';
import { PRODUCTS } from '../data/landingData';
import { nicolasProfile } from '../data/nicolasProfile';
import '../styles/portfolio.css';

const featuredProducts = PRODUCTS.filter(product =>
  ['chamaai-food', 'chamaai-filas', 'signageflow', 'cesta-esperta'].includes(product.id),
);

const projectPreviews: Record<string, { image: string; alt: string; caption: string }> = {
  'chamaai-food': {
    image: '/images/portfolio/chamaai-food.webp',
    alt: 'Painel do ChamaAí Food em demonstração, com pedidos em preparo e prontos para retirada',
    caption: 'Demonstração com dados fictícios',
  },
  'chamaai-filas': {
    image: '/images/portfolio/chamaai-filas.webp',
    alt: 'Página pública do ChamaAí, com a apresentação do sistema de gestão de filas',
    caption: 'Página pública do projeto',
  },
  'signageflow': {
    image: '/images/portfolio/signageflow.webp',
    alt: 'Página pública do SignageFlow, com uma prévia de conteúdo em uma TV',
    caption: 'Página pública do projeto',
  },
};

const portfolioNavigation = [
  { id: 'experiencia', label: 'Experiência', detail: 'Minha trajetória', icon: BriefcaseBusiness },
  { id: 'projetos', label: 'Projetos', detail: 'Soluções que criei', icon: Code2 },
  { id: 'formacao', label: 'Formação', detail: 'Cursos e aprendizado', icon: GraduationCap },
  { id: 'contato-profissional', label: 'Contato', detail: 'Vamos conversar', icon: MessageCircle },
];

const competencies = [
  { icon: BriefcaseBusiness, title: 'Processos', description: 'Organização administrativa' },
  { icon: UsersRound, title: 'Atendimento', description: 'Experiência com pessoas' },
  { icon: Code2, title: 'Tecnologia', description: 'Sistemas para empresas' },
];

export const NicolasReis: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedSection) return;
    const timeout = window.setTimeout(() => setSelectedSection(null), 2000);
    return () => clearTimeout(timeout);
  }, [selectedSection]);

  const selection = (id: string) => selectedSection === id && !reduceMotion ? 'true' : undefined;

  return (
    <article className="portfolio-page">
      <div className="portfolio-shell">
        <motion.section
          className="portfolio-hero"
          aria-labelledby="nicolas-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portfolio-hero-copy">
            <p className="portfolio-introduction">Olá, eu sou o</p>
            <h1 id="nicolas-heading">Nícolas<br />Reis.</h1>
            <p className="portfolio-role">Administração e Tecnologia</p>
            <p className="portfolio-founder">Fundador da Nexa Reis</p>
            <p className="portfolio-summary">Conheço a rotina de uma empresa de perto. E crio projetos digitais para ajudar a organizá-la.</p>
            <div className="portfolio-hero-actions">
              <a href={nicolasProfile.whatsapp} target="_blank" rel="noopener noreferrer" className="portfolio-button portfolio-button-green">
                Entrar em contato <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#projetos" className="portfolio-text-link">Ver meus projetos <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className="portfolio-location"><MapPin size={15} aria-hidden="true" /> {nicolasProfile.city}</p>
          </div>
          <figure className="portfolio-portrait">
            <div className="portfolio-sun" aria-hidden="true" />
            <span className="portfolio-spark" aria-hidden="true">✳</span>
            <img data-profile-portrait src={nicolasProfile.portrait} alt="Retrato profissional de Nícolas Reis" width={1147} height={1536} decoding="async" fetchPriority="high" />
            <figcaption><span className="portfolio-caption-mark" aria-hidden="true">N.</span><span>Da operação<br /><strong>à tecnologia.</strong></span></figcaption>
          </figure>
        </motion.section>

        <section className="portfolio-connect" aria-label="Contato e competências profissionais">
          <div className="portfolio-connect-contact">
            <h2>Vamos nos conectar</h2>
            <a href={nicolasProfile.whatsapp} target="_blank" rel="noopener noreferrer"><Phone size={17} aria-hidden="true" />{nicolasProfile.phone}</a>
            <a href={nicolasProfile.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} aria-hidden="true" />{nicolasProfile.instagramHandle}</a>
          </div>
          <div className="portfolio-competencies">
            <h2>O que conecta meu trabalho</h2>
            <ul>
              {competencies.map(({ icon: Icon, title, description }) => (
                <li key={title}><span className="portfolio-competency-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><span><strong>{title}</strong><small>{description}</small></span></li>
              ))}
            </ul>
          </div>
        </section>

        <nav aria-label="Navegação do portfólio profissional" className="portfolio-navigation">
          {portfolioNavigation.map(({ id, label, detail, icon: Icon }) => (
            <motion.a
              key={id}
              href={'#' + id}
              data-portfolio-card={id}
              data-portfolio-active={selection(id)}
              onClick={() => setSelectedSection(reduceMotion ? null : id)}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
              <span><strong>{label}</strong><small>{detail}</small></span>
              <ArrowDown size={16} aria-hidden="true" />
            </motion.a>
          ))}
        </nav>

        <section id="projetos" aria-labelledby="projetos-heading" className="portfolio-projects" data-portfolio-effect="projects" data-portfolio-selected={selection('projetos')}>
          <div className="portfolio-section-heading">
            <div><p className="portfolio-section-note">Projetos que desenvolvi</p><h2 id="projetos-heading">Da ideia à solução.</h2></div>
            <Link to="/#produtos" className="portfolio-text-link">Conhecer a Nexa Reis <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <p className="portfolio-section-description">Fundei a Nexa Reis e criei os projetos apresentados abaixo. Soluções pensadas para o atendimento, a organização e a rotina das empresas.</p>
          <div className="portfolio-project-grid">
            {featuredProducts.map(product => {
              const preview = projectPreviews[product.id];
              const hasDemo = product.url.startsWith('https://');
              return (
                <article key={product.id} className="portfolio-project" data-portfolio-project={product.id}>
                  <figure className="portfolio-project-preview">
                    {preview ? (
                      <img src={preview.image} alt={preview.alt} width={960} height={660} loading="lazy" decoding="async" />
                    ) : (
                      <div className="portfolio-catalog-illustration" aria-hidden="true">
                        <div className="portfolio-catalog-heading"><ShoppingBasket size={22} /><strong>CestaEsperta</strong></div>
                        <div className="portfolio-catalog-items"><span /><span /><span /></div>
                        <div className="portfolio-catalog-steps"><span>Catálogo</span><span>Pedido</span><span>Entrega</span></div>
                      </div>
                    )}
                    <figcaption>{preview?.caption ?? 'Representação ilustrativa'}</figcaption>
                  </figure>
                  <div className="portfolio-project-content">
                    <p className="portfolio-project-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="portfolio-project-description">{product.description}</p>
                    {hasDemo ? (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="portfolio-project-link" aria-label={'Conhecer projeto: ' + product.name}>Conhecer projeto <ArrowUpRight size={19} aria-hidden="true" /></a>
                    ) : (
                      <Link to="/#contato" className="portfolio-project-link">Solicitar informações <ArrowUpRight size={19} aria-hidden="true" /></Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="experiencia" aria-labelledby="experiencia-heading" className="portfolio-experience portfolio-split-section" data-portfolio-effect="experience" data-portfolio-selected={selection('experiencia')}>
          <div className="portfolio-section-intro">
            <p className="portfolio-section-note">Experiência profissional</p>
            <h2 id="experiencia-heading">Uma trajetória<br />na prática.</h2>
            <p>Minha experiência começou nas atividades operacionais do Mercantil Santa Paula. Ao longo dos anos, conheci diferentes rotinas da empresa e hoje atuo como Encarregado Administrativo.</p>
            <p className="portfolio-employer"><BriefcaseBusiness size={19} aria-hidden="true" /><span><strong>Mercantil Santa Paula</strong><small>Janeiro de 2018 até o presente</small></span></p>
          </div>
          <ol className="portfolio-timeline">
            {nicolasProfile.experience.map(({ period, role, details }, index) => (
              <li key={role}>
                <span className="portfolio-timeline-dot" aria-hidden="true" />
                <div className="portfolio-timeline-meta"><p>{period}</p>{index === 0 && <span>Cargo atual</span>}</div>
                <h3>{role}</h3><p className="portfolio-timeline-details">{details}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="formacao" aria-labelledby="formacao-heading" className="portfolio-education portfolio-split-section" data-portfolio-effect="education" data-portfolio-selected={selection('formacao')}>
          <div className="portfolio-section-intro">
            <p className="portfolio-section-note">Formação</p>
            <h2 id="formacao-heading">Aprender faz<br />parte do caminho.</h2>
            <p>Curso Análise e Desenvolvimento de Sistemas na Faculdade Anhanguera e sigo conectando o aprendizado às necessidades do dia a dia.</p>
          </div>
          <ul className="portfolio-course-list">
            {nicolasProfile.courses.map(course => (
              <li key={course.name}><GraduationCap size={23} strokeWidth={1.6} aria-hidden="true" /><div><h3>{course.name}</h3><p>{course.institution}</p><small>{course.period}</small></div></li>
            ))}
          </ul>
        </section>

        <section id="contato-profissional" className="portfolio-contact" aria-labelledby="contato-profissional-heading" data-portfolio-effect="contact" data-portfolio-selected={selection('contato-profissional')}>
          <div><p className="portfolio-contact-note">Oportunidades e projetos</p><h2 id="contato-profissional-heading">Uma boa ideia começa<br /> com uma conversa.</h2><p>Quer conhecer minha trajetória ou conversar sobre um projeto? Estou por aqui.</p></div>
          <div className="portfolio-contact-actions">
            <a href={nicolasProfile.whatsapp} target="_blank" rel="noopener noreferrer" className="portfolio-button portfolio-button-yellow">Vamos conversar <ArrowUpRight size={20} aria-hidden="true" /></a>
            <div className="portfolio-social-links"><a href={nicolasProfile.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} aria-hidden="true" />Instagram</a><a href={nicolasProfile.github} target="_blank" rel="noopener noreferrer"><Github size={18} aria-hidden="true" />GitHub</a></div>
          </div>
        </section>
      </div>
    </article>
  );
};

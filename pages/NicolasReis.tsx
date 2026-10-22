import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness, Download, Github, Instagram, MapPin, Phone } from 'lucide-react';
import { PRODUCTS } from '../data/landingData';
import { nicolasProfile } from '../data/nicolasProfile';

const featuredProducts = PRODUCTS.filter(product =>
  ['chamaai-food', 'chamaai-filas', 'signageflow', 'cesta-esperta'].includes(product.id),
);

export const NicolasReis: React.FC = () => (
  <article className="pb-24">
    <section className="relative isolate overflow-hidden pt-36 pb-16" aria-labelledby="nicolas-heading">
      <div data-profile-watermark aria-hidden="true" className="profile-watermark pointer-events-none absolute top-20 right-0 -z-10 w-full lg:w-1/2 select-none">
        <img src={nicolasProfile.portrait} alt="" width={1147} height={1536} decoding="async" className="h-auto w-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="text-brand-cyan inline-flex items-center gap-2 mb-10 underline underline-offset-4">
          <ArrowUpRight size={16} aria-hidden="true" /> Conhecer a Nexa Reis
        </Link>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-8">
            <p className="text-brand-cyan text-xs font-semibold uppercase tracking-[0.18em] mb-4">Portfólio profissional</p>
            <h1 id="nicolas-heading" className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-5">Nícolas Reis</h1>
            <p className="text-lg sm:text-xl text-white-soft mb-5">Administração e Tecnologia da Informação</p>
            <p className="flex items-center gap-2 text-gray-light mb-8"><MapPin size={17} aria-hidden="true" /> {nicolasProfile.city}</p>
            <div className="space-y-4 text-base text-gray-light leading-relaxed max-w-2xl">
              <p>Minha experiência começou nas atividades operacionais do Mercantil Santa Paula. Ao longo dos anos, conheci diferentes rotinas da empresa e hoje atuo como Encarregado Administrativo.</p>
              <p>Também curso Análise e Desenvolvimento de Sistemas na Anhanguera. Tenho interesse em aplicar tecnologia a situações reais, aproximando a organização administrativa das soluções digitais.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/curriculo" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-cyan text-[#050505] px-5 py-3 font-semibold hover:bg-white transition-colors">
                <Download size={18} aria-hidden="true" /> Visualizar currículo para impressão
              </Link>
              <a href={nicolasProfile.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-medium hover:border-brand-cyan hover:text-brand-cyan transition-colors">
                <Phone size={17} aria-hidden="true" /> Entrar em contato
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="w-40 sm:w-52 lg:w-full max-w-[280px] rounded-[1.5rem] overflow-hidden border border-white/15 bg-dark-card shadow-xl">
              <img src={nicolasProfile.portrait} alt="Retrato profissional de Nícolas Reis" width={1147} height={1536} decoding="async" fetchPriority="high" className="block w-full h-auto" />
            </div>
          </div>
        </div>
        <nav aria-label="Escolha seu interesse" className="bg-dark-bg/95 border border-white/15 rounded-3xl p-6 sm:p-8 grid sm:grid-cols-2 gap-6 mt-14">
          <div>
            <h2 className="font-display text-xl font-semibold mb-2">Sou recrutador</h2>
            <p className="text-gray-light text-sm mb-4">Veja minha experiência, formação e o currículo para impressão.</p>
            <a className="text-brand-cyan underline underline-offset-4" href="#experiencia">Ver trajetória profissional</a>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-6 sm:pt-0 sm:pl-6">
            <h2 className="font-display text-xl font-semibold mb-2">Tenho uma empresa</h2>
            <p className="text-gray-light text-sm mb-4">Conheça as soluções digitais e produtos apresentados pela Nexa Reis.</p>
            <a className="text-brand-cyan underline underline-offset-4" href="#projetos">Explorar soluções</a>
          </div>
        </nav>
      </div>
    </section>

    <section id="experiencia" aria-labelledby="experiencia-heading" className="bg-white-soft text-dark-bg py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <BriefcaseBusiness size={25} className="mb-4 text-brand-blue" aria-hidden="true" />
          <h2 id="experiencia-heading" className="font-display text-3xl font-bold mb-4">Experiência profissional</h2>
          <p className="font-semibold">Mercantil Santa Paula</p>
          <p className="text-[#555550] mt-2 text-sm">Janeiro de 2018 até o presente</p>
        </div>
        <ol className="lg:col-span-8 divide-y divide-black/15">
          {nicolasProfile.experience.map(({ period, role, details }) => (
            <li key={role} className="py-6 first:pt-0">
              <p className="text-[#555550] text-sm mb-2">{period}</p>
              <h3 className="font-display text-xl font-semibold mb-2">{role}</h3>
              <p className="text-[#4b4b47] leading-relaxed max-w-2xl">{details}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="formacao" aria-labelledby="formacao-heading" className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-10">
      <h2 id="formacao-heading" className="lg:col-span-4 font-display text-3xl font-bold">Formação</h2>
      <ul className="lg:col-span-8 space-y-7 text-gray-light">
        {nicolasProfile.courses.map(course => (
          <li key={course.name}>
            <h3 className="text-white font-semibold text-lg">{course.name}</h3>
            <p>{course.institution} — {course.period}</p>
          </li>
        ))}
      </ul>
    </section>

    <section id="projetos" aria-labelledby="projetos-heading" className="bg-[#0d0d0d] border-y border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-brand-cyan uppercase font-semibold text-xs tracking-widest mb-3">Portfólio de soluções</p>
        <h2 id="projetos-heading" className="font-display text-3xl sm:text-4xl font-bold mb-4">Tecnologia aplicada a empresas</h2>
        <p className="text-gray-light leading-relaxed max-w-3xl mb-10">
          Estes são produtos e soluções apresentados pela Nexa Reis. A descrição de minha participação específica em cada projeto será adicionada após confirmação das atividades e tecnologias utilizadas.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredProducts.map(product => {
            const hasDemo = product.url.startsWith('https://');
            return (
              <article key={product.id} className="flex flex-col justify-between gap-7 rounded-2xl bg-[#151515] border border-white/10 p-6 sm:p-8">
                <div>
                  <p className="text-brand-cyan text-xs font-semibold mb-3">{product.category}</p>
                  <h3 className="font-display text-xl font-bold mb-3">{product.name}</h3>
                  <p className="text-gray-light text-sm leading-relaxed">{product.description}</p>
                </div>
                {hasDemo ? (
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-cyan underline underline-offset-4 self-start">
                    Conhecer solução <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <Link to="/#contato" className="inline-flex items-center gap-2 text-brand-cyan underline underline-offset-4 self-start">
                    Solicitar informações <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="contato-profissional" className="max-w-7xl mx-auto px-6 pt-16" aria-labelledby="contato-profissional-heading">
      <h2 id="contato-profissional-heading" className="font-display text-3xl font-semibold mb-3">Vamos conversar?</h2>
      <p className="text-gray-light mb-6 max-w-2xl">Se quiser conhecer minha trajetória ou conversar sobre oportunidades e projetos, estes são meus canais de contato.</p>
      <div className="flex flex-wrap gap-5 text-gray-light">
        <a href={nicolasProfile.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center py-3 underline underline-offset-4"><Phone size={18} aria-hidden="true" />{nicolasProfile.phone}</a>
        <a href={nicolasProfile.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center py-3 underline underline-offset-4"><Instagram size={18} aria-hidden="true" />{nicolasProfile.instagramHandle}</a>
        <a href={nicolasProfile.github} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center py-3 underline underline-offset-4"><Github size={18} aria-hidden="true" />GitHub</a>
      </div>
    </section>
  </article>
);

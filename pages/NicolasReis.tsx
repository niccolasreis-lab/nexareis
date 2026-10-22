import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Instagram } from 'lucide-react';

const experience = [
  ['Setembro de 2021 — atual', 'Encarregado Administrativo'],
  ['Novembro de 2020 — Setembro de 2021', 'Operador de Atendimento de Loja'],
  ['Janeiro de 2019 — Novembro de 2020', 'Balconista'],
  ['Janeiro de 2018 — Dezembro de 2018', 'Ajudante Geral'],
];

export const NicolasReis: React.FC = () => (
  <article className="pt-36 pb-24">
    <div className="relative isolate overflow-hidden max-w-7xl mx-auto px-6">
      <div data-profile-watermark aria-hidden="true" className="profile-watermark pointer-events-none absolute top-0 right-0 -z-10 w-full lg:w-1/2 select-none">
        <img src="/images/team/nicolas-reis.jpg" alt="" width={1147} height={1536} fetchPriority="high" decoding="async" className="h-auto w-full" />
      </div>
      <Link to="/" className="text-brand-cyan inline-block mb-10 underline underline-offset-4">Conhecer a Nexa Reis</Link>
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <header className="lg:col-span-7">
          <p className="text-gray-light mb-4">Administração e Tecnologia da Informação</p>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-6">Nícolas Reis</h1>
          <p className="flex items-center gap-2 text-gray-light mb-8"><MapPin size={18} aria-hidden="true" /> São Paulo – SP</p>
          <div className="space-y-5 text-base sm:text-lg text-gray-light leading-relaxed max-w-2xl">
            <p>Sou um profissional com experiência nas áreas operacional e administrativa, com uma trajetória de crescimento construída ao longo dos anos no Mercantil Santa Paula.</p>
            <p>Atualmente, exerço a função de Encarregado Administrativo e curso Análise e Desenvolvimento de Sistemas na Faculdade Anhanguera.</p>
            <p>Tenho interesse em unir minha experiência com processos administrativos ao desenvolvimento de soluções tecnológicas que tornem o trabalho das empresas mais organizado e eficiente.</p>
          </div>
        </header>
        <aside className="lg:col-span-12">
        <nav aria-label="Escolha seu interesse" className="bg-dark-bg/90 border border-white/15 rounded-3xl p-6 sm:p-8 grid sm:grid-cols-2 gap-6">
          <div><h2 className="font-display text-xl font-semibold mb-3">Sou recrutador</h2><p className="text-gray-light mb-4">Conheça minha trajetória e formação.</p><a className="text-brand-cyan underline underline-offset-4" href="#experiencia">Ver experiência profissional</a></div>
          <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-6 sm:pt-0 sm:pl-6"><h2 className="font-display text-xl font-semibold mb-3">Preciso de uma solução para minha empresa</h2><p className="text-gray-light mb-4">Conheça os serviços e produtos da Nexa Reis.</p><Link className="text-brand-cyan underline underline-offset-4" to="/#solucoes">Conhecer soluções empresariais</Link></div>
        </nav>
        </aside>
      </div>
    </div>
    <section id="experiencia" className="bg-white-soft text-dark-bg mt-20 py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4"><h2 className="font-display text-3xl font-bold mb-4">Experiência profissional</h2><p className="font-semibold">Mercantil Santa Paula</p><p className="text-[#555550] mt-2">Janeiro de 2018 até o presente</p></div>
        <ol className="lg:col-span-8 divide-y divide-black/15">{experience.map(([period, role]) => <li key={role} className="py-6 first:pt-0"><p className="text-[#555550] text-sm mb-2">{period}</p><h3 className="font-display text-xl font-semibold">{role}</h3></li>)}</ol>
      </div>
    </section>
    <section id="formacao" className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-10">
      <h2 className="lg:col-span-4 font-display text-3xl font-bold">Formação</h2>
      <ul className="lg:col-span-8 space-y-7 text-gray-light">
        <li><h3 className="text-white font-semibold text-lg">Análise e Desenvolvimento de Sistemas</h3><p>Faculdade Anhanguera — 2º semestre, cursando</p></li>
        <li><h3 className="text-white font-semibold text-lg">Informática</h3><p>CETEF — 2015</p></li>
        <li><h3 className="text-white font-semibold text-lg">Manutenção de Microcomputadores</h3><p>Seven Computadores — 2015</p></li>
      </ul>
    </section>
    <section className="max-w-7xl mx-auto px-6 border-t border-white/15 pt-12">
      <h2 className="font-display text-3xl font-bold mb-5">Tecnologia aplicada às empresas</h2>
      <p className="text-gray-light max-w-2xl leading-relaxed mb-6">A Nexa Reis apresenta soluções para pedidos, atendimento, comunicação em telas e operações comerciais. Conheça as funcionalidades e os canais de demonstração de cada produto.</p>
      <Link to="/#produtos" className="inline-flex items-center gap-2 text-brand-cyan underline underline-offset-4 mb-12">Conhecer os produtos da Nexa Reis <ArrowUpRight size={18} aria-hidden="true" /></Link>
      <h2 className="font-display text-2xl font-semibold mb-5">Vamos conversar</h2>
      <div className="flex flex-wrap gap-6 text-gray-light">
        <a href="https://wa.me/5511937105501" target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center py-3 underline underline-offset-4"><Phone size={18} aria-hidden="true" />(11) 93710-5501</a>
        <a href="https://www.instagram.com/nicolasreis.tech/" target="_blank" rel="noreferrer" className="inline-flex gap-2 items-center py-3 underline underline-offset-4"><Instagram size={18} aria-hidden="true" />@nicolasreis.tech</a>
      </div>
    </section>
  </article>
);

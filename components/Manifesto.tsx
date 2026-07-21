import React from 'react';
import { motion } from 'framer-motion';
import { Shield, LayoutGrid, Eye, ArrowUpRight, Zap } from 'lucide-react';

export const Manifesto: React.FC = () => {
  const manifestoPillars = [
    {
      title: "Menos tarefas manuais",
      desc: "Eliminamos redigitação, anotações de papel e planilhas paralelas que geram erros e cansam equipes.",
      icon: Zap
    },
    {
      title: "Mais visibilidade",
      desc: "Todas as etapas da operação são exibidas em painéis em tempo real para equipe e gerência.",
      icon: Eye
    },
    {
      title: "Processos conectados",
      desc: "Do totem físico de senhas ao painel da Smart TV, todos os dispositivos conversam de forma integrada.",
      icon: LayoutGrid
    },
    {
      title: "Decisões mais rápidas",
      desc: "Métricas consolidadas de tempo de espera e produtividade de atendimento guiam melhorias operacionais imediadas.",
      icon: Shield
    }
  ];

  return (
    <section id="sobre" className="relative py-28 bg-[#F5F5F2] text-[#050505] overflow-hidden">
      
      {/* Background abstract accents */}
      <div className="absolute inset-0 grid-lines opacity-[0.03] pointer-events-none" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-brand-blue/5 blur-3xl -top-1/4 -left-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Asymmetric Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-end">
          
          <div className="lg:col-span-8">
            {/* Display Editorial Label */}
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue font-bold mb-4 block">
              Nosso Manifesto
            </span>
            
            {/* Big Editorial Heading */}
            <h2 className="title-editorial text-[#050505] uppercase">
              Não começamos pela tecnologia. <br className="hidden sm:block" />
              Começamos pelo <span className="text-brand-blue font-bold">problema.</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="font-sans text-lg text-[#333330] leading-relaxed font-light">
              A Nexa Reis observa a operação comercial no mundo real, identifica gargalos de atendimento ou expedição e desenvolve ferramentas digitais que simplificam o trabalho diário de estabelecimentos e equipes.
            </p>
          </div>

        </div>

        {/* 12-Column Editorial Grid for Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {manifestoPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col justify-between p-8 bg-white border border-[#EBEBE6] rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-500 h-[260px] text-left"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 text-brand-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#050505] mb-2 uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-[#666662] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-brand-blue" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Concept Block */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 sm:p-12 bg-gradient-to-br from-white to-[#EBEBE6] border border-[#EBEBE6] rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
        >
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
              ECOSSISTEMA INTEGRADO
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#050505] mb-4">
              EXPERIÊNCIA MELHOR PARA SEU CLIENTE E SUA EQUIPE
            </h3>
            <p className="font-sans text-[#555550] leading-relaxed">
              Ao digitalizar a operação presencial, o seu cliente final ganha autonomia e segurança, enquanto os operadores trabalham com dashboards organizados, reduzindo estresse e aumentando a produtividade operacional.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="inline-flex items-center gap-4 bg-brand-blue p-6 rounded-3xl text-white shadow-xl shadow-brand-blue/20">
              <div className="text-left">
                <div className="font-display text-4xl font-extrabold tracking-tighter">100%</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/70">Nuvem Sincronizada</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <p className="text-xs max-w-[180px] leading-snug font-light text-white/90">
                Aplicações leves que operam sem necessidade de servidores locais físicos ou infraestrutura cara.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

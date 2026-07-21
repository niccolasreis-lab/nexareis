import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Sparkles, Cpu, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const techStack = [
    "React", "TypeScript", "Tailwind CSS", "Next.js", 
    "Docker", "Supabase", "PostgreSQL", "Rest APIs"
  ];

  return (
    <section id="sobre" className="py-28 bg-[#F5F5F2] text-[#050505] relative overflow-hidden border-t border-[#EBEBE6]">
      <div className="absolute inset-0 grid-lines opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left Column: Philosophical Editorial statements */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue font-bold block mb-4">
              Quem Somos
            </span>
            
            <h2 className="title-editorial text-[#050505] uppercase mb-8">
              Construímos o que <br />
              sua operação <span className="text-brand-blue font-bold">precisa.</span>
            </h2>

            <div className="space-y-6 font-sans text-base sm:text-lg text-[#333330] leading-relaxed font-light">
              <p>
                A Nexa Reis nasceu de uma constatação simples: <strong>a tecnologia não pode criar fricção, ela deve eliminar.</strong> Enquanto outras consultorias vendem conceitos futuristas complexos, nós vamos aos estabelecimentos físicos observar o fluxo de atendimento, as conversas de balcão e os gargalos de expedição.
              </p>
              <p>
                Nossos desenvolvedores e designers de produto atuam de perto na rotina física para desenhar softwares limpos que operários de todos os níveis usem sem hesitação. O resultado são taxas de aceitação interna elevadíssimas e otimização imediata da velocidade dos negócios.
              </p>
            </div>

            {/* Core Values / Specialty Details list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 mt-10 border-t border-[#EBEBE6] w-full">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#050505] tracking-tight mb-1">Usabilidade Intuitiva</h4>
                  <p className="font-sans text-xs text-[#666662] leading-relaxed">Layouts organizados pensados para totens de balcão, telefones ou Smart TVs.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#050505] tracking-tight mb-1">Velocidade Extrema</h4>
                  <p className="font-sans text-xs text-[#666662] leading-relaxed">Código sem bibliotecas redundantes, garantindo respostas em milissegundos.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Tech stack showcase / Lab presentation */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-[#EBEBE6] p-8 sm:p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-brand-blue/5 blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4 text-brand-blue" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#888] font-bold">Nexa Technology Hub</span>
              </div>

              <h3 className="font-display text-lg font-bold text-[#050505] mb-4 uppercase tracking-tight">
                Infraestrutura Escalável e Moderna
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-[#666662] leading-relaxed mb-8">
                Desenvolvemos sob uma base sólida de engenharia para que sua empresa desfrute de estabilidade técnica vitalícia sem sustos de escalabilidade.
              </p>

              {/* Stack items capsules */}
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs font-semibold px-4 py-2 bg-[#F5F5F2] border border-[#EBEBE6] text-[#333330] rounded-full hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#EBEBE6] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold">Aplicações 100% Homologadas</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

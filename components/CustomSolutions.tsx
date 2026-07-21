import React from 'react';
import { motion } from 'framer-motion';
import { CUSTOM_SERVICES } from '../data/landingData';
import { Button } from './Button';
import { Code, Server, Layout, Database, Terminal, Smartphone, ArrowRight } from 'lucide-react';

export const CustomSolutions: React.FC = () => {
  // Map icons
  const icons = [Code, Server, Layout, Database, Smartphone, Terminal];

  const handleScrollToForm = () => {
    const element = document.getElementById('contato');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="solucoes" className="py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative vector overlays */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Headings */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-cyan font-semibold block mb-4">
            Desenvolvimento Customizado
          </span>
          <h2 className="title-editorial text-white uppercase mb-6 leading-tight">
            Seu problema não precisa <br />
            caber em um <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue font-bold">software pronto.</span>
          </h2>
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light leading-relaxed">
            Quando as plataformas existentes no mercado não cobrem as peculiaridades de suas regras de negócios, nós projetamos, programamos, homologamos e evoluímos uma solução digital proprietária exclusiva para sua empresa.
          </p>
        </div>

        {/* Custom Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CUSTOM_SERVICES.map((service, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:bg-white/[0.03] hover:border-brand-cyan/20 transition-all duration-500 flex flex-col justify-between h-[250px]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white uppercase mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-sec leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Giant Call to Action banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
        >
          <div className="max-w-xl">
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mb-2">
              Pronto para dar o próximo passo?
            </h4>
            <p className="font-sans text-sm text-gray-light leading-relaxed">
              Diga adeus ao trabalho manual. Deixe que nosso laboratório de produtos digitais projete o sistema sob medida ideal para otimizar os lucros e a velocidade de sua operação.
            </p>
          </div>
          <Button 
            variant="lime" 
            size="md" 
            onClick={handleScrollToForm}
            className="group font-bold"
          >
            Tenho um processo que precisa ser digitalizado
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

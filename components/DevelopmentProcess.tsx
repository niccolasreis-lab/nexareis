import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/landingData';

export const DevelopmentProcess: React.FC = () => {
  return (
    <section id="processo" className="py-28 bg-[#F5F5F2] text-[#050505] overflow-hidden border-t border-[#EBEBE6]">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue font-bold block mb-4">
            Metodologia Nexa Reis
          </span>
          <h2 className="title-editorial text-[#050505] uppercase">
            Da operação ao <span className="text-brand-blue font-bold">produto.</span>
          </h2>
          <p className="font-sans text-lg text-[#333330] leading-relaxed font-light mt-4">
            Seguimos um fluxo rigoroso focado na usabilidade, velocidade e estabilidade para garantir que o software construído seja perfeitamente integrado e aproveitado pelas equipes.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-0.5 bg-gradient-to-r from-brand-blue/10 via-brand-blue/30 to-brand-blue/10" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex flex-col items-start relative group"
                >
                  {/* Step bubble */}
                  <div className="relative flex items-center justify-center mb-6 z-20">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#EBEBE6] shadow-sm flex items-center justify-center font-display text-xl font-bold text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:scale-105 transition-all duration-500">
                      {step.number}
                    </div>
                    {/* Pulsing small node inside bubble */}
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-blue rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </div>

                  {/* Step Description Card */}
                  <div className="bg-white p-6 rounded-2xl border border-[#EBEBE6] shadow-sm group-hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-[#050505] uppercase tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="font-sans text-xs text-[#666662] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

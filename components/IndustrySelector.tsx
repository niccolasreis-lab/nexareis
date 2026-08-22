import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDUSTRIES, SegmentInfo } from '../data/landingData';
import { ShoppingBag, Utensils, HeartPulse, Sparkles, Sliders, AlertTriangle, Lightbulb, PackageCheck } from 'lucide-react';

export const IndustrySelector: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(INDUSTRIES[0].id);

  const selectedIndustry = INDUSTRIES.find(ind => ind.id === selectedId) || INDUSTRIES[0];

  const iconMap: Record<string, any> = {
    'supermercados': ShoppingBag,
    'restaurantes-docerias': Utensils,
    'clinicas-recepcoes': HeartPulse,
    'varejo-redes': Sparkles,
    'processos-manuais': Sliders
  };

  return (
    <section className="py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background decor */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] top-1/3 left-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-cyan font-semibold block mb-4">
            Aplicações Setoriais
          </span>
          <h2 className="title-editorial text-white uppercase leading-tight mb-4">
            Tecnologia próxima <br />
            da <span className="text-brand-cyan font-bold">operação.</span>
          </h2>
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light leading-relaxed">
            Cada segmento de negócio possui dinâmicas e dificuldades específicas no fluxo de atendimento presencial. Selecione seu setor para ver como otimizamos seu fluxo de trabalho:
          </p>
        </div>

        {/* Dynamic Sector Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Asymmetric Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3 w-full">
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-sec font-bold mb-2">
              Escolha seu Segmento
            </span>
            {INDUSTRIES.map((ind) => {
              const Icon = iconMap[ind.id] || Sliders;
              const isSelected = selectedId === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedId(ind.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 w-full cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#050505] border-white font-semibold shadow-xl shadow-white/5 scale-[1.02]'
                      : 'bg-white/[0.01] border-white/5 text-gray-light hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-brand-blue text-white' : 'bg-white/5 text-brand-cyan'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display text-sm tracking-tight uppercase">
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Animated Information block */}
          <div className="lg:col-span-8 w-full min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Visual glow overlay based on sector */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-brand-cyan/10 blur-[80px] pointer-events-none" />
                
                <div>
                  {/* Segment Title Banner */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                    <span className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                      Operação em {selectedIndustry.name}
                    </span>
                    <span className="font-mono text-[9px] bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      {selectedIndustry.product}
                    </span>
                  </div>

                  {/* Operational Problem Statement */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mb-8">
                    <div className="sm:col-span-3 flex items-start gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4 mt-0.5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold">O Problema:</span>
                    </div>
                    <div className="sm:col-span-9">
                      <p className="font-sans text-sm text-gray-sec leading-relaxed">
                        {selectedIndustry.problem}
                      </p>
                    </div>
                  </div>

                  {/* Recommended Bespoke Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mb-8">
                    <div className="sm:col-span-3 flex items-start gap-2 text-brand-cyan">
                      <Lightbulb className="w-4 h-4 mt-0.5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold">A Solução:</span>
                    </div>
                    <div className="sm:col-span-9">
                      <p className="font-sans text-sm text-white-soft leading-relaxed">
                        {selectedIndustry.solution}
                      </p>
                    </div>
                  </div>

                  {/* Real World Practical Example */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 pt-6 border-t border-white/5">
                    <div className="sm:col-span-3 flex items-start gap-2 text-[#C5F467]">
                      <PackageCheck className="w-4 h-4 mt-0.5" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Na Prática:</span>
                    </div>
                    <div className="sm:col-span-9">
                      <p className="font-sans text-xs sm:text-sm text-gray-light italic leading-relaxed">
                        "{selectedIndustry.example}"
                      </p>
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

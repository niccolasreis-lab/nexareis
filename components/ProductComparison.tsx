import React from 'react';
import { motion } from 'framer-motion';
import { COMPARISON_ROWS } from '../data/landingData';
import { Layers, Activity, Users, Monitor, ShieldCheck } from 'lucide-react';

export const ProductComparison: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-brand-blue/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        
        {/* Headings */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5F467] font-semibold block mb-3">
            Sinergia Operacional
          </span>
          <h2 className="title-editorial text-white uppercase mb-4">
            Uma base tecnológica. <br />
            Diferentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5F467] to-brand-cyan font-bold">operações.</span>
          </h2>
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light leading-relaxed">
            Nossos sistemas operam sob a mesma filosofia de simplicidade de ponta a ponta, permitindo controlar e medir todas as etapas de atendimento presencial e exibição digital.
          </p>
        </div>

        {/* Comparison Editorial Matrix */}
        <div className="w-full">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-5 gap-6 pb-6 border-b border-white/10 text-gray-sec font-mono text-[10px] uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Produto</span>
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Operação Principal</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Público-Alvo</span>
            <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5" /> Hardware Indicado</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Principal Benefício</span>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-white/5">
            {COMPARISON_ROWS.map((row, idx) => (
              <motion.div
                key={row.product}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 py-8 items-center group hover:bg-white/[0.01] px-4 -mx-4 rounded-xl transition-all duration-300"
              >
                {/* Product Col */}
                <div className="flex flex-col md:block">
                  <span className="md:hidden text-[9px] font-mono text-gray-sec uppercase tracking-widest mb-1">Produto</span>
                  <span className="font-display text-lg font-bold text-white uppercase tracking-tight group-hover:text-brand-cyan transition-colors">
                    {row.product}
                  </span>
                </div>

                {/* Operation Col */}
                <div className="flex flex-col md:block">
                  <span className="md:hidden text-[9px] font-mono text-gray-sec uppercase tracking-widest mb-1">Operação Principal</span>
                  <span className="font-sans text-sm text-white-soft">
                    {row.operation}
                  </span>
                </div>

                {/* Audience Col */}
                <div className="flex flex-col md:block">
                  <span className="md:hidden text-[9px] font-mono text-gray-sec uppercase tracking-widest mb-1">Público-Alvo</span>
                  <span className="font-sans text-sm text-gray-light leading-relaxed">
                    {row.audience}
                  </span>
                </div>

                {/* Hardware Col */}
                <div className="flex flex-col md:block">
                  <span className="md:hidden text-[9px] font-mono text-gray-sec uppercase tracking-widest mb-1">Hardware Indicado</span>
                  <span className="font-sans text-xs text-gray-sec font-mono">
                    {row.hardware}
                  </span>
                </div>

                {/* Benefit Col */}
                <div className="flex flex-col md:block">
                  <span className="md:hidden text-[9px] font-mono text-gray-sec uppercase tracking-widest mb-1">Principal Benefício</span>
                  <span className="font-sans text-sm font-semibold text-[#C5F467] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {row.benefit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

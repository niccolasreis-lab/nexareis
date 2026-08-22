import React from 'react';
import { motion } from 'framer-motion';
import { METRICS } from '../data/landingData';

export const MetricsGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full bg-brand-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header summary info */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5F467] font-semibold block mb-3">
            Impacto Mensurável
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Nossos números refletem a produtividade física de nossos clientes
          </h3>
        </div>

        {/* Dynamic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl text-center flex flex-col justify-center hover:bg-white/[0.03] hover:border-brand-cyan/25 transition-all duration-300 min-h-[180px]"
            >
              {/* Massive displaying numbers */}
              <div className="font-display text-4xl sm:text-5xl font-black text-white mb-3 tracking-tighter">
                {metric.value}
              </div>
              
              {/* Informative labels */}
              <div className="font-sans text-xs sm:text-sm text-gray-sec font-light leading-snug">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, PRODUCT_HIGHLIGHTS } from '../constants';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

const Card: React.FC<CardProps> = ({ title, description, Icon, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group relative bg-nexa-slate800/50 border border-nexa-slate800 p-8 rounded-2xl hover:border-nexa-cyan/30 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-nexa-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 bg-nexa-navy rounded-xl border border-nexa-slate800 flex items-center justify-center mb-6 group-hover:border-nexa-cyan/50 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all">
        <Icon className="w-7 h-7 text-nexa-cyan" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-nexa-cyan transition-colors">{title}</h3>
      <p className="text-gray-400 mb-6 leading-relaxed min-h-[80px]">{description}</p>
      
      <a href="#contato" className="inline-flex items-center text-nexa-blue font-semibold group-hover:text-nexa-cyan transition-colors">
        Saiba mais <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </motion.div>
);

export const Services: React.FC = () => {
  return (
    <section className="py-24 bg-nexa-navy relative overflow-hidden">
      <div id="servicos" className="absolute -top-24 left-0 w-full h-24" /> {/* Anchor offset */}
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Soluções para <span className="text-gradient">Escalar</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Nossa stack de serviços cobre desde a automação de processos repetitivos até a construção de ecossistemas digitais complexos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {SERVICES.map((service, idx) => (
            <Card key={service.id} title={service.title} description={service.description} Icon={service.icon} index={idx} />
          ))}
        </div>

        <div id="produtos" className="relative">
          <div className="text-center mb-16">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-2"
              >
                Produtos Exclusivos
              </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRODUCT_HIGHLIGHTS.map((prod, idx) => (
              <Card key={prod.id} title={prod.title} description={prod.description} Icon={prod.icon} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
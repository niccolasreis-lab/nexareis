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
    className="card-item"
  >
    <div className="card-icon-box">
      <Icon style={{ width: '1.75rem', height: '1.75rem' }} />
    </div>
    
    <h3 className="card-title">{title}</h3>
    <p className="card-text">{description}</p>
    
    <a href="#contato" className="card-link">
      Saiba mais <ArrowRight style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }} />
    </a>
  </motion.div>
);

export const Services: React.FC = () => {
  return (
    <section className="section-py bg-navy" style={{ position: 'relative' }}>
      <div id="servicos" style={{ position: 'absolute', top: '-6rem', left: 0, width: '100%', height: '6rem' }} /> {/* Anchor offset */}
      
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Soluções para <span className="text-gradient">Escalar</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-desc"
          >
            Nossa stack de serviços cobre desde a automação de processos repetitivos até a construção de ecossistemas digitais complexos.
          </motion.p>
        </div>

        <div className="grid-cards" style={{ marginBottom: '6rem' }}>
          {SERVICES.map((service, idx) => (
            <Card key={service.id} title={service.title} description={service.description} Icon={service.icon} index={idx} />
          ))}
        </div>

        <div id="produtos" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title"
                style={{ fontSize: '2rem' }}
              >
                Produtos Exclusivos
              </motion.h2>
          </div>
          <div className="grid-cards" style={{ maxWidth: '56rem', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {PRODUCT_HIGHLIGHTS.map((prod, idx) => (
              <Card key={prod.id} title={prod.title} description={prod.description} Icon={prod.icon} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
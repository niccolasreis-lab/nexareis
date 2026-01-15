import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      
      {/* Background Effects */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <motion.div 
          style={{ y: y1 }}
          className="hero-bg-blob-1"
        />
        <motion.div 
          style={{ y: y2 }}
          className="hero-bg-blob-2"
        />
        <div className="hero-noise" />
      </div>

      <div className="container" style={{ zIndex: 10, position: 'relative', textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge"
          >
            <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--color-orange)' }}></span>
            NOVA ERA DA AUTOMAÇÃO
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            Transforme seu Negócio com <br />
            <span className="text-gradient">Automação Inteligente</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            Soluções tecnológicas que impulsionam eficiência, reduzem custos e escalam seu crescimento. Deixe a tecnologia trabalhar por você.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-actions"
          >
            <Button size="lg" onClick={scrollToContact} className="group" style={{ width: '100%', maxWidth: '300px' }}>
              Solicitar Consultoria
              <ArrowRight style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem', transition: 'transform 0.2s' }} />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices} style={{ width: '100%', maxWidth: '300px' }}>
              Conheça Nossas Soluções
            </Button>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="scroll-indicator"
      >
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
};
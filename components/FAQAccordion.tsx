import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../data/landingData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Keyboard navigation following W3C WAI-ARIA Accordion design pattern
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = FAQS.length;
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + 1) % total;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - 1 + total) % total;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== -1) {
      const nextButton = document.getElementById(`faq-btn-${nextIndex}`);
      if (nextButton) {
        nextButton.focus();
      }
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="faq" className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Editorial Grid lines & Glowing Background spots */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[30vw] rounded-full bg-brand-cyan/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vw] rounded-full bg-brand-blue/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          
          {/* Animated category tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-cyan font-bold">
              Suporte & Dúvidas
            </span>
          </div>

          <h2 className="title-editorial text-white uppercase mb-6">
            Perguntas <br className="sm:hidden" />
            <span className="text-brand-cyan font-extrabold">Frequentes.</span>
          </h2>
          
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Esclareça as principais dúvidas sobre nossos produtos SaaS, fluxos de integração, implantações locais de hardware e contratos de evolução de software.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4" role="presentation">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                className={`group border rounded-3xl overflow-hidden transition-all duration-500 ${
                  isOpen 
                    ? 'bg-[#0d0d0d] border-brand-cyan/30 shadow-[0_15px_30px_rgba(0,212,255,0.03)]' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                }`}
              >
                <h3>
                  <button
                    id={`faq-btn-${idx}`}
                    onClick={() => toggleAccordion(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none focus:bg-white/[0.03] transition-all cursor-pointer group-focus-visible:ring-2 group-focus-visible:ring-brand-cyan"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                    aria-label={`Pergunta ${idx + 1}: ${faq.question}`}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white pr-6 flex items-start gap-4">
                      {/* Premium Number Bubble */}
                      <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md transition-colors duration-300 ${
                        isOpen 
                          ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20' 
                          : 'bg-white/5 text-gray-sec border border-white/5 group-hover:bg-white/10 group-hover:text-white'
                      }`}>
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="pt-0.5 group-hover:text-white transition-colors">
                        {faq.question}
                      </span>
                    </span>

                    {/* Circular Chevron Wrapper */}
                    <motion.div
                      animate={{ 
                        rotate: isOpen ? 180 : 0,
                        backgroundColor: isOpen ? 'rgba(0, 212, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: isOpen ? '#00D4FF' : '#8C8C87'
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/20"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </h3>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/[0.03] ml-0 sm:ml-[44px]">
                        <p className="font-sans text-xs sm:text-sm text-gray-light leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic CTA Footer for outstanding inquiries */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-3xl bg-[#0c0c0c] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base text-white">Sua dúvida não está aqui?</h4>
              <p className="font-sans text-xs text-gray-sec">Envie os detalhes da sua operação e conversaremos diretamente sobre o seu caso.</p>
            </div>
          </div>
          <button 
            onClick={handleScrollToContact}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-brand-cyan hover:text-black transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            Falar com Especialista
          </button>
        </motion.div>

      </div>
    </section>
  );
};

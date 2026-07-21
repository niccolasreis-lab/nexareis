import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionItem {
  id: string;
  label: string;
  num: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'home', label: 'Início', num: '01' },
  { id: 'produtos', label: 'Produtos', num: '02' },
  { id: 'solucoes', label: 'Soluções', num: '03' },
  { id: 'processo', label: 'Processo', num: '04' },
  { id: 'sobre', label: 'Sobre', num: '05' },
  { id: 'feedback-gestores', label: 'Cases', num: '06' },
  { id: 'faq', label: 'FAQ', num: '07' },
  { id: 'contato', label: 'Contato', num: '08' }
];

export const SectionIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    // We use IntersectionObserver to detect sections with high precision
    const observerOptions = {
      root: null,
      // Target elements when they occupy the center portion of the screen
      rootMargin: '-30% 0px -45% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Fallback scroll listener for edge cases (e.g., reaching bottom of page where contact form is active)
    const handleScrollFallback = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection('contato');
      }
    };

    window.addEventListener('scroll', handleScrollFallback);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollFallback);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id="side-section-indicator"
      className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-6 select-none pointer-events-auto"
      aria-label="Navegação lateral de seções"
    >
      {/* Decorative vertical editorial line */}
      <div className="absolute right-[5px] top-4 bottom-4 w-[1px] bg-white/[0.04] pointer-events-none" />
      
      {/* Running highlight track */}
      <div className="absolute right-[5px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-brand-cyan/20 via-brand-blue/20 to-transparent pointer-events-none" />

      {SECTIONS.map((section, idx) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="flex items-center gap-4 relative group cursor-pointer"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleScrollTo(section.id)}
            role="button"
            aria-label={`Rolar para seção ${section.label}`}
            id={`indicator-${section.id}`}
          >
            {/* Label Slide-Out - Premium typography */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 pr-2"
                >
                  <span className="font-mono text-[9px] text-brand-cyan/50 tracking-wider">
                    {section.num}
                  </span>
                  <span className={`font-sans text-xs tracking-[0.15em] uppercase font-medium ${
                    isActive ? 'text-white font-bold' : 'text-gray-sec hover:text-white'
                  }`}>
                    {section.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Dot Indicator */}
            <div className="relative w-3 h-3 flex items-center justify-center">
              {/* Outer Pulse aura for active section */}
              {isActive && (
                <motion.span
                  layoutId="sideActivePulse"
                  className="absolute w-5 h-5 rounded-full border border-brand-cyan/30 bg-brand-cyan/[0.03]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              {/* Central Core Indicator dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
                  backgroundColor: isActive 
                    ? '#00D4FF' 
                    : isHovered 
                      ? '#ffffff' 
                      : 'rgba(255, 255, 255, 0.15)',
                  borderColor: isActive
                    ? '#00D4FF'
                    : isHovered
                      ? 'rgba(255, 255, 255, 0.4)'
                      : 'rgba(255, 255, 255, 0.05)'
                }}
                transition={{ duration: 0.2 }}
                className="w-[7px] h-[7px] rounded-full border z-10"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

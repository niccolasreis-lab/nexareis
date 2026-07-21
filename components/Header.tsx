import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Início', href: '#home', id: 'home' },
    { label: 'Produtos', href: '#produtos', id: 'produtos' },
    { label: 'Soluções', href: '#solucoes', id: 'solucoes' },
    { label: 'Processo', href: '#processo', id: 'processo' },
    { label: 'Sobre', href: '#sobre', id: 'sobre' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contato', href: '#contato', id: 'contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection based on scroll position
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
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

  const handleCTA = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById('contato');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-4 bg-dark-bg/85 backdrop-blur-xl border-b border-dark-border' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Nexa Reis Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="z-50">
          <Logo variant="header" showText={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative font-sans text-sm tracking-wide transition-colors duration-300 ${
                activeSection === item.id 
                  ? 'text-white font-medium' 
                  : 'text-gray-sec hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span 
                  layoutId="activeIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-brand-cyan rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCTA}
            className="group"
          >
            Falar sobre um projeto
            <ArrowUpRight className="w-4 h-4 text-brand-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className="lg:hidden p-2 z-50 text-white hover:text-brand-cyan transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-2xl flex flex-col justify-center items-center px-8 lg:hidden"
          >
            {/* Background grids */}
            <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
            <div className="absolute w-[40vw] h-[40vw] rounded-full bg-brand-cyan/5 blur-3xl top-1/4 left-1/4 pointer-events-none" />
            
            <nav className="flex flex-col gap-6 items-center text-center">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-display text-2xl tracking-wide transition-all ${
                    activeSection === item.id 
                      ? 'text-brand-cyan font-bold scale-105' 
                      : 'text-gray-light hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-8 w-full max-w-xs"
              >
                <Button 
                  variant="lime" 
                  size="md"
                  onClick={handleCTA}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Falar sobre um projeto <ArrowUpRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

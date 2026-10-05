import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    id: item.href.replace('#', ''),
  }));

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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
      if (event.key !== 'Tab') return;
      const controls = [
        menuButtonRef.current,
        ...Array.from(menuPanelRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []),
      ].filter((control): control is HTMLElement => control !== null);
      if (!controls.length) return;
      const current = controls.findIndex(control => control === document.activeElement);
      const next = event.shiftKey
        ? (current - 1 + controls.length) % controls.length
        : (current + 1) % controls.length;
      event.preventDefault();
      controls[next]?.focus();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', closeOnDesktop);
    closeOnDesktop();
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', closeOnDesktop);
      if (menuButtonRef.current?.getClientRects().length) {
        menuButtonRef.current.focus({ preventScroll: true });
      }
    };
  }, [mobileMenuOpen]);

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
    <>
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
      mobileMenuOpen
        ? 'py-4 bg-dark-bg border-b border-dark-border'
        : isScrolled
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
          ref={menuButtonRef}
          type="button"
          className="lg:hidden p-3 z-50 text-white hover:text-brand-cyan transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>

      {/* A body portal avoids the fixed containing block created by header blur. */}
      {createPortal(
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            ref={menuPanelRef}
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 bg-dark-bg flex flex-col items-center overflow-y-auto px-8 pt-28 pb-8 lg:hidden"
          >
            <nav aria-label="Navegação móvel" className="my-auto flex w-full flex-col gap-5 items-center text-center">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.label}
                  href={item.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : index * 0.05 }}
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
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : navItems.length * 0.05 }}
                className="mt-4 w-full max-w-xs"
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
      </AnimatePresence>, document.body)}
    </>
  );
};

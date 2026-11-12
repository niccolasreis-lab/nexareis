import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const activeId = location.pathname === '/' ? activeSection : null;

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    id: item.href.replace('#', ''),
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;
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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = [document.getElementById('main-content'), document.querySelector('footer')].filter((el): el is HTMLElement => el instanceof HTMLElement);
    const previousInert = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
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
      background.forEach((el, index) => { el.inert = previousInert[index]; });
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', closeOnDesktop);
      if (menuButtonRef.current?.getClientRects().length) {
        menuButtonRef.current.focus({ preventScroll: true });
      }
    };
  }, [mobileMenuOpen]);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname, location.hash]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/' + href);
  };

  const handleCTA = () => {
    setMobileMenuOpen(false);
    navigate('/#contato');
  };

  return (
    <>
    <header data-portfolio-theme={location.pathname === '/nicolas-reis' ? 'light' : undefined} className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-200 ${
      mobileMenuOpen
        ? 'py-4 bg-canvas border-b border-line'
        : isScrolled
        ? 'py-4 bg-canvas/85 backdrop-blur-xl border-b border-line'
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Nexa Reis Logo */}
        <a href="/#home" onClick={(e) => handleNavClick(e, '#home')} className="z-50">
          <Logo variant="header" showText={true} />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={"/" + item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              aria-current={activeId === item.id ? 'location' : undefined}
              className={`relative font-sans text-sm tracking-wide transition-colors duration-300 ${
                activeId === item.id
                  ? 'text-ink font-medium'
                  : 'text-gray-light hover:text-ink'
              }`}
            >
              {item.label}
              {activeId === item.id && (
                <motion.span 
                  layoutId={reduceMotion ? undefined : 'activeIndicator'}
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
          className="lg:hidden p-3 z-50 text-ink hover:text-brand-cyan transition-colors touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
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
            data-portfolio-theme={location.pathname === '/nicolas-reis' ? 'light' : undefined}
            initial={reduceMotion ? false : { opacity: 0.98 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.12 }}
            className="fixed inset-0 z-50 bg-canvas flex flex-col items-center overflow-y-auto overscroll-contain px-8 pt-28 pb-8 lg:hidden"
          >
            <motion.nav aria-label="Navegação móvel" data-mobile-menu-content
              initial={reduceMotion ? false : { y: -6 }}
              animate={{ y: 0 }}
              exit={{ y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="my-auto flex w-full flex-col gap-3 items-center text-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={"/" + item.href}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex min-h-11 w-full max-w-xs items-center justify-center touch-manipulation font-display text-2xl tracking-wide transition-colors duration-150 ${
                    activeId === item.id
                      ? 'text-brand-cyan font-bold'
                      : 'text-gray-light hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="mt-4 w-full max-w-xs">
                <Button 
                  variant="lime" 
                  size="md"
                  onClick={handleCTA}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Falar sobre um projeto <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </>
  );
};


import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { NAV_ITEMS } from '../constants';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} style={{ cursor: 'pointer' }}>
          <Logo variant="header" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md-flex items-center gap-4" style={{ gap: '2rem' }}>
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => scrollToSection('#contato')}
          >
            Falar com Especialista
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md-hidden"
          style={{ color: '#d1d5db' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu md-hidden"
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem' }}>
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="nav-link"
                  style={{ fontSize: '1.125rem' }}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="primary" 
                className="btn-full"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => scrollToSection('#contato')}
              >
                Falar com Especialista
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
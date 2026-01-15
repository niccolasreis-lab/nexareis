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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-nexa-navy/70 backdrop-blur-md border-nexa-slate800 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="cursor-pointer">
          <Logo variant="header" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className="text-sm font-medium text-gray-300 hover:text-nexa-cyan transition-colors"
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
          className="md:hidden text-gray-300 hover:text-white"
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
            className="md:hidden bg-nexa-navy border-b border-nexa-slate800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="text-lg font-medium text-gray-300 hover:text-nexa-cyan transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="primary" 
                className="w-full mt-4"
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
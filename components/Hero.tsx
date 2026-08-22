import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight, Monitor, Tv, Laptop, CheckCircle, Wifi, RefreshCw, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Tech Grids & Radial Glow */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Editorial Tech Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-15" />
        
        {/* Cinematic light beams */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full bg-brand-blue/15 blur-[160px] opacity-60" />
        <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] rounded-full bg-brand-cyan/10 blur-[130px] opacity-40" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Massive Title and Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left mt-8 lg:mt-0">
          
          {/* Animated top label with pulsing micro-indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-cyan font-semibold">
              Software Studio & Lab
            </span>
          </motion.div>

          {/* Scale monumental Display Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="title-huge text-white mb-6 uppercase"
          >
            Tecnologia <br />
            para operações <br />
            <span className="text-brand-cyan font-black">
              reais.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg lg:text-xl text-gray-light max-w-xl mb-10 leading-relaxed font-light"
          >
            Desenvolvemos produtos digitais, automações e sistemas sob medida para transformar processos manuais em experiências rápidas, organizadas e escaláveis.
          </motion.p>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <Button variant="lime" size="md" onClick={() => handleScrollTo('produtos')} className="group font-bold">
              Conheça nossos produtos
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="md" onClick={() => handleScrollTo('contato')}>
              Apresente seu projeto
            </Button>
          </motion.div>

          {/* Micro-information tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 border-t border-white/5 w-full max-w-lg"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
              <span className="font-mono text-xs text-gray-light uppercase tracking-wider">Software sob medida</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
              <span className="font-mono text-xs text-gray-light uppercase tracking-wider">Produtos SaaS</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
              <span className="font-mono text-xs text-gray-light uppercase tracking-wider">Automação operacional</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
              <span className="font-mono text-xs text-gray-light uppercase tracking-wider">Implantação e suporte</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Composition Visual with 3 mockups (TV, Monitor, Notebook) */}
        <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] flex items-center justify-center w-full mt-10 lg:mt-0">
          
          {/* Ambient Glow spots behind mockups */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-brand-cyan/15 blur-2xl top-1/4 left-1/4 animate-pulse pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#C5F467]/10 blur-2xl bottom-1/4 right-1/4 pointer-events-none" />

          {/* 1. SMART TV MOCKUP - CHAMAÍ FOOD (Delivery Screen) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-4 left-6 sm:left-12 w-[240px] sm:w-[320px] bg-[#101010] border-[5px] border-[#1f1f1f] rounded-lg shadow-2xl shadow-black/80 z-20 hover:scale-105 transition-transform duration-500"
          >
            {/* TV Stand subtle indication */}
            <div className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-10 h-2 bg-[#2a2a2a] rounded-t-md" />
            
            {/* TV Screen Content (ChamaAí Food Dashboard) */}
            <div className="p-3 font-sans">
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-2">
                <span className="font-bold text-[10px] sm:text-xs text-brand-cyan tracking-wider uppercase flex items-center gap-1">
                  <Tv className="w-3 h-3" /> ChamaAí Food
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                  <Wifi className="w-2.5 h-2.5" /> AO VIVO
                </span>
              </div>
              {/* Order Lists */}
              <div className="grid grid-cols-2 gap-2 text-left">
                {/* Preparing */}
                <div className="bg-[#151515] p-2 rounded border border-white/5">
                  <h4 className="text-[8px] sm:text-[10px] text-gray-sec uppercase tracking-widest font-semibold mb-2">Em preparo</h4>
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-xs font-mono text-white-soft py-0.5 px-1 bg-white/5 rounded">#1208 - Pizza</div>
                    <div className="text-[9px] sm:text-xs font-mono text-white-soft py-0.5 px-1 bg-white/5 rounded">#1209 - Burger</div>
                  </div>
                </div>
                {/* Ready */}
                <div className="bg-[#151515] p-2 rounded border border-brand-cyan/10">
                  <h4 className="text-[8px] sm:text-[10px] text-brand-cyan uppercase tracking-widest font-semibold mb-2">Prontos</h4>
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-xs font-mono text-emerald-400 font-bold py-0.5 px-1 bg-emerald-500/10 rounded animate-pulse">#1205 - Sushi</div>
                    <div className="text-[9px] sm:text-xs font-mono text-emerald-400 font-bold py-0.5 px-1 bg-emerald-500/10 rounded">#1206 - Temaki</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. FLAT MONITOR MOCKUP - CHAMAÍ (Queue Management Panel) */}
          <motion.div 
            initial={{ opacity: 0, x: -50, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-16 left-2 sm:left-4 w-[220px] sm:w-[280px] bg-[#0c0c0c] border-[4px] border-[#252525] rounded-md shadow-2xl shadow-black/80 z-30 hover:scale-105 transition-transform duration-500"
          >
            {/* Monitor Stand */}
            <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-8 h-4 bg-[#333] rounded-t-sm" />
            <div className="absolute -bottom-[24px] left-1/2 -translate-x-1/2 w-16 h-1 bg-[#1a1a1a]" />
            
            {/* Monitor Screen Content (ChamaAí Queue panel) */}
            <div className="p-3 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                <span className="font-bold text-[9px] sm:text-xs text-[#C5F467] uppercase tracking-wider flex items-center gap-1">
                  <Monitor className="w-3 h-3" /> Gestão de Filas
                </span>
                <span className="text-[7px] sm:text-[9px] font-mono text-gray-sec">Guichê 03</span>
              </div>
              
              <div className="bg-[#121212] p-3 rounded-lg border border-white/5 text-center mb-2">
                <div className="text-[8px] sm:text-[9px] text-gray-sec uppercase tracking-widest mb-1">Última senha chamada</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tighter">A-149</div>
                <div className="text-[8px] sm:text-[9px] text-[#C5F467] font-mono mt-1 font-semibold uppercase">Pref. - Consultório 02</div>
              </div>
              
              <div className="flex items-center justify-between text-[7px] sm:text-[9px] text-gray-sec">
                <span>Espera Média: <strong className="text-white">12 min</strong></span>
                <span>Atendidos: <strong className="text-white">42 hoje</strong></span>
              </div>
            </div>
          </motion.div>

          {/* 3. PREMIUM LAPTOP MOCKUP - SIGNAGEFLOW (Digital Signage Platform) */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-4 right-2 sm:right-6 w-[250px] sm:w-[310px] bg-[#161616] border-[3px] border-[#2c2c2c] rounded-lg shadow-2xl shadow-black/80 z-40 hover:scale-105 transition-transform duration-500"
          >
            {/* Laptop Keyboard part indication */}
            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-[110%] h-[8px] bg-[#3a3a3a] rounded-b-lg border-t border-white/10" />
            
            {/* Laptop screen content (SignageFlow control dashboard) */}
            <div className="p-3 text-left font-sans">
              <div className="flex justify-between items-center pb-2 border-b border-white/5 mb-3">
                <span className="font-bold text-[9px] sm:text-xs text-orange-400 uppercase tracking-widest flex items-center gap-1">
                  <Laptop className="w-3 h-3" /> SignageFlow
                </span>
                <span className="text-[7px] sm:text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Sincronizado
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-[#1e1e1e] p-1.5 rounded border border-white/5">
                  <div>
                    <div className="text-[9px] text-white font-medium">Menu Digital Lojas</div>
                    <div className="text-[7px] text-gray-sec">Campanha Inverno</div>
                  </div>
                  <span className="text-[7px] font-mono bg-orange-400/10 text-orange-400 px-1.5 py-0.5 rounded">Ativo</span>
                </div>
                
                <div className="flex justify-between items-center bg-[#1e1e1e] p-1.5 rounded border border-white/5">
                  <div>
                    <div className="text-[9px] text-white font-medium">Telas de Oferta - Vitrine</div>
                    <div className="text-[7px] text-gray-sec">Playlist Promocional</div>
                  </div>
                  <span className="text-[7px] font-mono bg-orange-400/10 text-orange-400 px-1.5 py-0.5 rounded">Ativo</span>
                </div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-[7px] sm:text-[9px] text-gray-sec">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>12 Televisores Conectados</span>
              </div>
            </div>
          </motion.div>

          {/* Floating UI micro-cards with real status info */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[160px] right-[40px] bg-dark-card/90 border border-white/10 p-3 rounded-xl shadow-xl z-50 flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-sec uppercase tracking-widest">Sistemas</div>
              <div className="text-[11px] font-semibold text-white">100% Operacionais</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[380px] left-1/2 -translate-x-1/2 bg-dark-card/90 border border-white/10 p-3 rounded-xl shadow-xl z-50 flex items-center gap-2.5"
          >
            <Layers className="w-4 h-4 text-brand-cyan" />
            <div>
              <div className="font-mono text-[9px] text-gray-sec uppercase tracking-widest">SaaS Hub</div>
              <div className="text-[11px] font-semibold text-white">Plataforma Unificada</div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity" 
        onClick={() => handleScrollTo('sobre')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleScrollTo('sobre'); }}
        aria-label="Rolar para a seção Sobre"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-sec">Desbloquear</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-8 bg-gradient-to-b from-brand-cyan to-transparent"
        />
      </div>

    </section>
  );
};

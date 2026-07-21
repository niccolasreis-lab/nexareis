import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, ProductDetail } from '../data/landingData';
import { Button } from './Button';
import { 
  ArrowRight, Check, ExternalLink, HelpCircle, Smartcard, Play,
  Tv, Monitor, Laptop, Server, Bell, BadgeAlert, Users, Layers
} from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PRODUCTS[0].id);

  // Helper to render live responsive mockup interface based on product ID
  const renderInteractiveMockup = (productId: string) => {
    switch (productId) {
      case 'chamaai-food':
        return (
          <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            {/* Gloss grid effect */}
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* Smart TV Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse" />
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">PAINEL DE EXPEDIÇÃO — CHAMAÍ FOOD</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">CONEXÃO ATIVA</span>
                <span className="text-xs font-mono text-gray-sec">12:51</span>
              </div>
            </div>

            {/* Smart TV Body (Orders Grid) */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {/* Preparing Column */}
              <div className="bg-[#121212] p-4 rounded-xl border border-white/5 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-gray-sec uppercase tracking-widest font-semibold">Preparando</span>
                  <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white">2 Pedidos</span>
                </div>
                <div className="space-y-2 flex-grow overflow-y-auto">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-white">#1214</div>
                      <div className="text-[10px] text-gray-sec">Pizza Muçarela (Grande)</div>
                    </div>
                    <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest animate-pulse">Cozinhando</span>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-white">#1215</div>
                      <div className="text-[10px] text-gray-sec">Combo Hambúrguer Duplo</div>
                    </div>
                    <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest">Grelha</span>
                  </div>
                </div>
              </div>

              {/* Ready Column */}
              <div className="bg-[#121212] p-4 rounded-xl border border-brand-cyan/20 flex flex-col relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest font-bold">Prontos para Retirar</span>
                  <span className="text-[10px] bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded-full font-bold">2 Pedidos</span>
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/30 rounded-lg flex justify-between items-center animate-[pulse_2s_infinite]">
                    <div>
                      <div className="font-mono text-base font-black text-white">#1210</div>
                      <div className="text-[10px] text-gray-light">Marta S. (Balcão)</div>
                    </div>
                    <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">CHAMAR</span>
                  </div>
                  <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/10 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-white">#1211</div>
                      <div className="text-[10px] text-gray-light">Roberto S. (Ifood)</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Expedido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart TV Footer Status bar */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-sec">
              <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5 text-brand-cyan" /> Smart TV - Cozinha Principal</span>
              <span className="font-mono">IP: 192.168.1.154</span>
            </div>
          </div>
        );
      case 'chamaai-filas':
        return (
          <div className="w-full h-full bg-[#080808] rounded-2xl border border-white/5 p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* iPad Pro Queue Management Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C5F467]" />
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">PAINEL OPERADOR — GESTÃO DE FILAS</span>
              </div>
              <span className="text-xs font-mono text-[#C5F467] uppercase font-bold bg-[#C5F467]/10 px-2.5 py-0.5 rounded-full">OPERADOR ATIVO</span>
            </div>

            {/* Dashboard metrics widgets */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[#121212] p-2.5 rounded-lg border border-white/5 text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Em espera</span>
                <span className="text-lg font-bold text-white">08</span>
              </div>
              <div className="bg-[#121212] p-2.5 rounded-lg border border-white/5 text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Tempo Médio</span>
                <span className="text-lg font-bold text-[#C5F467]">14 min</span>
              </div>
              <div className="bg-[#121212] p-2.5 rounded-lg border border-white/5 text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Atendidos hoje</span>
                <span className="text-lg font-bold text-white">184</span>
              </div>
            </div>

            {/* Calling core controls */}
            <div className="bg-gradient-to-r from-[#121212] to-[#1a1a1a] p-4 rounded-xl border border-white/5 flex items-center justify-between mb-4">
              <div className="text-left">
                <span className="font-mono text-[9px] text-[#C5F467] tracking-widest uppercase block mb-1">Chamando no Painel</span>
                <span className="text-3xl font-display font-extrabold text-white">P-023</span>
                <span className="text-[10px] text-gray-sec block mt-0.5">Mesa de Atendimento 03</span>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <button className="bg-[#C5F467] hover:bg-[#b2e052] text-[#050505] font-display font-bold text-[10px] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                  CHAMAR PRÓXIMO <ArrowRight className="w-3 h-3" />
                </button>
                <button className="bg-white/5 hover:bg-white/10 text-white font-display text-[9px] px-3 py-1 rounded-full transition-colors border border-white/10">
                  RECHAMAR SENHA
                </button>
              </div>
            </div>

            {/* Operator list */}
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between text-gray-sec font-mono pb-1 border-b border-white/5">
                <span>Operadores</span>
                <span>Guichê</span>
              </div>
              <div className="flex justify-between text-white">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Fernando M. (Suporte)</span>
                <span className="font-mono">Mesa 01</span>
              </div>
              <div className="flex justify-between text-white">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ana Clara G. (Triagem)</span>
                <span className="font-mono">Mesa 02</span>
              </div>
            </div>
          </div>
        );
      case 'signageflow':
        return (
          <div className="w-full h-full bg-[#050505] rounded-2xl border border-white/5 p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* SignageFlow Admin Platform Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">CONSOLE — SIGNAGEFLOW</span>
              </div>
              <span className="text-[9px] font-mono bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/20 px-2 py-0.5 rounded-full font-bold">MULTILOJA CLOUD</span>
            </div>

            {/* Screens state representation */}
            <div className="grid grid-cols-2 gap-3 flex-grow">
              
              {/* Playlists control panel */}
              <div className="bg-[#101010] p-3.5 rounded-lg border border-white/5 text-left text-xs flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-gray-sec uppercase tracking-widest font-semibold block mb-2">Editor de Playlists</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] py-1 px-1.5 bg-white/5 rounded">
                      <span className="text-white">01_Ofertas_Supermercado.mp4</span>
                      <span className="text-[8px] font-mono text-gray-sec">15s</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] py-1 px-1.5 bg-white/5 rounded">
                      <span className="text-white">02_Campanha_Fraldas.png</span>
                      <span className="text-[8px] font-mono text-gray-sec">10s</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-[#FF6B35]/10 text-[#FF6B35] hover:bg-[#FF6B35]/20 font-display text-[9px] font-bold py-1 px-2.5 rounded-full transition-all mt-3 border border-[#FF6B35]/30">
                  PUBLICAR EM 24 TELAS
                </button>
              </div>

              {/* Screens Status Map */}
              <div className="bg-[#101010] p-3.5 rounded-lg border border-white/5 text-left text-xs">
                <span className="font-mono text-[9px] text-gray-sec uppercase tracking-widest font-semibold block mb-2.5">Status das Telas</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white-soft">TV Vitrine (Matriz)</span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white-soft">TV Frios (Filial Centro)</span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white-soft">Menu Board 01 (Praça)</span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* SignageFlow Footer details */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-sec">
              <span className="flex items-center gap-1"><Laptop className="w-3 h-3 text-[#FF6B35]" /> Conexão Segura SSL</span>
              <span className="font-mono text-[#FF6B35]">Signage Player v4.1</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const activeProduct = PRODUCTS.find(p => p.id === activeTab) || PRODUCTS[0];

  return (
    <section id="produtos" className="py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[150px] -top-24 -right-24 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] -bottom-24 -left-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan font-semibold block mb-4">
            Nosso Portfólio SaaS
          </span>
          <h2 className="title-editorial text-white uppercase mb-6">
            Produtos criados para <br className="hidden sm:block" />
            resolver <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue font-bold">operações reais.</span>
          </h2>
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light leading-relaxed">
            Construímos plataformas completas de automação que ligam estabelecimentos físicos à eficiência da nuvem. Sistemas prontos, testados e de rápida implantação.
          </p>
        </div>

        {/* Product selector buttons (Clean asymmetric grid) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 bg-white/[0.02] border border-white/10 p-2 rounded-full max-w-2xl mx-auto">
          {PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setActiveTab(prod.id)}
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 font-medium cursor-pointer ${
                activeTab === prod.id
                  ? 'bg-white text-[#050505] font-semibold scale-105 shadow-lg'
                  : 'text-gray-sec hover:text-white hover:bg-white/5'
              }`}
            >
              {prod.name}
            </button>
          ))}
        </div>

        {/* Active Product Interactive Showcase Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Product Details Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Category tag */}
            <span className={`inline-block border rounded-full px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] font-semibold mb-6 ${activeProduct.tagColor}`}>
              {activeProduct.category}
            </span>

            {/* Product Logo / Name */}
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3 uppercase tracking-tight flex items-center gap-2">
              {activeProduct.name}
            </h3>

            {/* Product Title statement */}
            <h4 className="font-sans text-xl text-brand-cyan font-normal mb-4 leading-snug">
              {activeProduct.title}
            </h4>

            {/* Product Description */}
            <p className="font-sans text-gray-sec text-sm sm:text-base leading-relaxed mb-8 font-light">
              {activeProduct.description}
            </p>

            {/* Features check list */}
            <div className="space-y-3.5 w-full mb-10 pt-6 border-t border-white/5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-sec font-bold block mb-1">
                Principais Funcionalidades
              </span>
              {activeProduct.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-white-soft">
                  <div className="w-4 h-4 rounded-full bg-brand-cyan/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="leading-tight">{feat}</span>
                </div>
              ))}
            </div>

            {/* Actions for this product */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <a 
                href={activeProduct.url} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto"
              >
                <Button variant="lime" size="md" className="w-full font-bold">
                  Conhecer o {activeProduct.name.split(' ')[0]} <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </a>
              <a 
                href={activeProduct.url} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="md" className="w-full">
                  Abrir demonstração
                </Button>
              </a>
            </div>

          </div>

          {/* Product Live Dashboard Mockup Display Column */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] w-full flex items-center justify-center relative">
            
            {/* Soft decorative shadow boundary */}
            <div className="absolute inset-0 bg-white/[0.01] border border-white/5 rounded-3xl -m-4 pointer-events-none" />
            
            {/* HTML interactive representation rendering */}
            {renderInteractiveMockup(activeProduct.id)}

          </div>

        </div>

      </div>
    </section>
  );
};

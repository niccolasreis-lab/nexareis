import { Link } from 'react-router-dom';
import { scrollToSection } from '../lib/navigation';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, ProductDetail } from '../data/landingData';
import { Button } from './Button';
import { 
  ArrowRight, Check, ExternalLink, HelpCircle, CreditCard, Play,
  Tv, Monitor, Laptop, Server, Bell, BadgeAlert, Users, Layers, PackageCheck, Truck
} from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PRODUCTS[0].id);

  // Helper to render live responsive mockup interface based on product ID
  const renderInteractiveMockup = (productId: string) => {
    switch (productId) {
      case 'chamaai-food':
        return (
          <div className="w-full h-full bg-surface-muted rounded-2xl border border-line p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            {/* Gloss grid effect */}
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* Smart TV Header */}
            <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-cyan" />
                <span className="font-display font-bold text-sm tracking-wider text-ink uppercase">PAINEL DE EXPEDIÇÃO — CHAMAÍ FOOD</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] bg-emerald-500/15 text-emerald-700 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">CONEXÃO ATIVA</span>
                <span className="text-xs font-mono text-gray-sec">12:51</span>
              </div>
            </div>

            {/* Smart TV Body (Orders Grid) */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {/* Preparing Column */}
              <div className="bg-surface-muted p-4 rounded-xl border border-line flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-gray-sec uppercase tracking-widest font-semibold">Preparando</span>
                  <span className="text-[10px] bg-ink/5 px-2 py-0.5 rounded-full text-ink">2 Pedidos</span>
                </div>
                <div className="space-y-2 flex-grow overflow-y-auto">
                  <div className="p-3 bg-ink/[0.02] border border-line rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-ink">#1214</div>
                      <div className="text-[10px] text-gray-sec">Pizza Muçarela (Grande)</div>
                    </div>
                    <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest">Cozinhando</span>
                  </div>
                  <div className="p-3 bg-ink/[0.02] border border-line rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-ink">#1215</div>
                      <div className="text-[10px] text-gray-sec">Combo Hambúrguer Duplo</div>
                    </div>
                    <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-widest">Grelha</span>
                  </div>
                </div>
              </div>

              {/* Ready Column */}
              <div className="bg-surface-muted p-4 rounded-xl border border-brand-cyan/20 flex flex-col relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest font-bold">Prontos para Retirar</span>
                  <span className="text-[10px] bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded-full font-bold">2 Pedidos</span>
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/30 rounded-lg flex justify-between items-center animate-[pulse_2s_infinite]">
                    <div>
                      <div className="font-mono text-base font-black text-ink">#1210</div>
                      <div className="text-[10px] text-gray-light">Marta S. (Balcão)</div>
                    </div>
                    <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-500/10 px-2 py-1 rounded">CHAMAR</span>
                  </div>
                  <div className="p-3 bg-brand-cyan/5 border border-brand-cyan/10 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-mono text-sm font-bold text-ink">#1211</div>
                      <div className="text-[10px] text-gray-light">Roberto S. (Ifood)</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700">Expedido</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart TV Footer Status bar */}
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-gray-sec">
              <span className="flex items-center gap-1.5"><Tv className="w-3.5 h-3.5 text-brand-cyan" /> Smart TV - Cozinha Principal</span>
              <span className="font-mono">IP: 192.168.1.154</span>
            </div>
          </div>
        );
      case 'chamaai-filas':
        return (
          <div className="w-full h-full bg-surface rounded-2xl border border-line p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* iPad Pro Queue Management Header */}
            <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C5F467]" />
                <span className="font-display font-bold text-sm tracking-wider text-ink uppercase">PAINEL OPERADOR — GESTÃO DE FILAS</span>
              </div>
              <span className="text-xs font-mono text-lime-800 uppercase font-bold bg-[#C5F467]/10 px-2.5 py-0.5 rounded-full">OPERADOR ATIVO</span>
            </div>

            {/* Dashboard metrics widgets */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-surface-muted p-2.5 rounded-lg border border-line text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Em espera</span>
                <span className="text-lg font-bold text-ink">08</span>
              </div>
              <div className="bg-surface-muted p-2.5 rounded-lg border border-line text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Tempo Médio</span>
                <span className="text-lg font-bold text-lime-800">14 min</span>
              </div>
              <div className="bg-surface-muted p-2.5 rounded-lg border border-line text-center">
                <span className="text-[8px] text-gray-sec uppercase tracking-widest font-semibold block mb-0.5">Atendidos hoje</span>
                <span className="text-lg font-bold text-ink">184</span>
              </div>
            </div>

            {/* Calling core controls */}
            <div className="bg-gradient-to-r from-surface-muted to-surface p-4 rounded-xl border border-line flex items-center justify-between mb-4">
              <div className="text-left">
                <span className="font-mono text-[9px] text-lime-800 tracking-widest uppercase block mb-1">Chamando no Painel</span>
                <span className="text-3xl font-display font-extrabold text-ink">P-023</span>
                <span className="text-[10px] text-gray-sec block mt-0.5">Mesa de Atendimento 03</span>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <span className="bg-[#C5F467] hover:bg-[#b2e052] text-[#050505] font-display font-bold text-[10px] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                  CHAMAR PRÓXIMO <ArrowRight className="w-3 h-3" />
                </span>
                <span className="bg-ink/5 hover:bg-ink/10 text-ink font-display text-[9px] px-3 py-1 rounded-full transition-colors border border-line">
                  RECHAMAR SENHA
                </span>
              </div>
            </div>

            {/* Operator list */}
            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between text-gray-sec font-mono pb-1 border-b border-line">
                <span>Operadores</span>
                <span>Guichê</span>
              </div>
              <div className="flex justify-between text-ink">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Fernando M. (Suporte)</span>
                <span className="font-mono">Mesa 01</span>
              </div>
              <div className="flex justify-between text-ink">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ana Clara G. (Triagem)</span>
                <span className="font-mono">Mesa 02</span>
              </div>
            </div>
          </div>
        );
      case 'signageflow':
        return (
          <div className="w-full h-full bg-surface-muted rounded-2xl border border-line p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            
            {/* SignageFlow Admin Platform Header */}
            <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B35]" />
                <span className="font-display font-bold text-sm tracking-wider text-ink uppercase">CONSOLE — SIGNAGEFLOW</span>
              </div>
              <span className="text-[9px] font-mono bg-[#FF6B35]/15 text-orange-800 border border-[#FF6B35]/20 px-2 py-0.5 rounded-full font-bold">MULTILOJA CLOUD</span>
            </div>

            {/* Screens state representation */}
            <div className="grid grid-cols-2 gap-3 flex-grow">
              
              {/* Playlists control panel */}
              <div className="bg-surface p-3.5 rounded-lg border border-line text-left text-xs flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-gray-sec uppercase tracking-widest font-semibold block mb-2">Editor de Playlists</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] py-1 px-1.5 bg-ink/5 rounded">
                      <span className="text-ink">01_Ofertas_Supermercado.mp4</span>
                      <span className="text-[8px] font-mono text-gray-sec">15s</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] py-1 px-1.5 bg-ink/5 rounded">
                      <span className="text-ink">02_Campanha_Fraldas.png</span>
                      <span className="text-[8px] font-mono text-gray-sec">10s</span>
                    </div>
                  </div>
                </div>
                
                <span className="w-full bg-[#FF6B35]/10 text-orange-800 hover:bg-[#FF6B35]/20 font-display text-[9px] font-bold py-1 px-2.5 rounded-full transition-all mt-3 border border-[#FF6B35]/30">
                  PUBLICAR EM 24 TELAS
                </span>
              </div>

              {/* Screens Status Map */}
              <div className="bg-surface p-3.5 rounded-lg border border-line text-left text-xs">
                <span className="font-mono text-[9px] text-gray-sec uppercase tracking-widest font-semibold block mb-2.5">Status das Telas</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-ink">TV Vitrine (Matriz)</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-ink">TV Frios (Filial Centro)</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-ink">Menu Board 01 (Praça)</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-500/10 px-1 py-0.2 rounded">100% ONLINE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* SignageFlow Footer details */}
            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[10px] text-gray-sec">
              <span className="flex items-center gap-1"><Laptop className="w-3 h-3 text-orange-800" /> Conexão Segura SSL</span>
              <span className="font-mono text-orange-800">Signage Player v4.1</span>
            </div>
          </div>
        );
      case 'cesta-esperta':
        return (
          <div className="w-full h-full bg-surface-muted rounded-2xl border border-blue-400/15 p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />
            <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                <span className="font-display font-bold text-sm tracking-wider text-ink uppercase">CESTAESPERTA — PEDIDOS</span>
              </div>
              <span className="text-[9px] font-mono bg-[#60A5FA]/15 text-blue-700 border border-[#60A5FA]/25 px-2 py-0.5 rounded-full font-bold">OPERAÇÃO ATIVA</span>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-grow">
              <div className="bg-ink/[0.04] p-4 rounded-xl border border-line">
                <span className="font-mono text-[9px] text-blue-700 uppercase tracking-widest font-semibold">Pré-conferência</span>
                <div className="mt-4 space-y-2.5">
                  {[
                    ['Arroz Tipo 1 5kg', 'Confirmado'],
                    ['Café Torrado 500g', 'Ajuste necessário'],
                    ['Azeite Extra Virgem', 'Confirmado'],
                  ].map(([item, status]) => (
                    <div key={item} className="rounded-lg border border-line bg-ink/5 px-3 py-2">
                      <span className="block text-[10px] text-ink">{item}</span>
                      <span className={`text-[8px] font-mono ${status === 'Confirmado' ? 'text-emerald-700' : 'text-amber-800'}`}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-ink/[0.04] p-4 rounded-xl border border-line flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-gray-sec uppercase tracking-widest font-semibold">Pedido #10428</span>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/15 text-blue-700 flex items-center justify-center"><PackageCheck className="w-5 h-5" /></div>
                    <div><span className="block text-sm font-bold text-ink">Separação concluída</span><span className="text-[9px] text-gray-sec">18 itens conferidos</span></div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#60A5FA]/10 border border-[#60A5FA]/20 p-3">
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-blue-700"><Truck className="w-3.5 h-3.5" /> PRONTO PARA ENTREGA</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[10px] text-gray-sec">
              <span>Catálogo, pedido e expedição em um fluxo só</span>
              <span className="font-mono text-blue-700">CestaEsperta</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const activeProduct = PRODUCTS.find(p => p.id === activeTab) || PRODUCTS[0];
  const isContactCta = activeProduct.url === '#contato';

  const handleContactCta = () => {
    window.dispatchEvent(new CustomEvent('nexa:contact-intent', {
      detail: {
        segmento: 'supermercados',
        necessidade: 'cesta-esperta',
        mensagem: 'Tenho interesse no CestaEsperta para catálogo, pedidos e logística.',
      },
    }));
    scrollToSection('contato');
  };

  return (
    <section id="produtos" className="py-28 bg-surface-muted border-t border-line relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[150px] -top-24 -right-24 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px] -bottom-24 -left-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan font-semibold block mb-4">
            Nossos produtos on-line
          </span>
          <h2 className="title-editorial text-ink uppercase mb-6">
            Produtos criados para <br className="hidden sm:block" />
            resolver <span className="text-brand-cyan font-bold">operações reais.</span>
          </h2>
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light leading-relaxed">
            Conheça soluções para organizar pedidos, atendimento e conteúdos em telas. As necessidades de implantação são avaliadas para cada operação.
          </p>
        </div>

        {/* Product selector buttons (Clean asymmetric grid) */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 mb-16 bg-ink/[0.02] border border-line p-2 rounded-full max-w-2xl mx-auto">
          {PRODUCTS.map((prod) => (
            <button
              type="button"
              aria-pressed={activeTab === prod.id}
              key={prod.id}
              onClick={() => setActiveTab(prod.id)}
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 font-medium cursor-pointer ${
                activeTab === prod.id
                  ? 'bg-white text-[#050505] font-semibold scale-105 shadow-lg'
                  : 'text-gray-sec hover:text-ink hover:bg-ink/5'
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
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-ink mb-3 uppercase tracking-tight flex items-center gap-2">
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
            <div className="space-y-3.5 w-full mb-10 pt-6 border-t border-line">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-sec font-bold block mb-1">
                Principais Funcionalidades
              </span>
              {activeProduct.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-ink">
                  <div className="w-4 h-4 rounded-full bg-brand-cyan/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="leading-tight">{feat}</span>
                </div>
              ))}
            </div>

            <Link to={'/projetos/' + activeProduct.id} className="inline-flex items-center gap-2 text-brand-cyan underline underline-offset-4 min-h-11 mb-4 text-sm">Ver detalhes do projeto <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>

            {/* Actions for this product */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {isContactCta ? (
                <>
                  <Button variant="lime" size="md" className="w-full sm:w-auto font-bold" onClick={handleContactCta}>
                    Falar sobre o CestaEsperta <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button variant="outline" size="md" className="w-full sm:w-auto" onClick={handleContactCta}>
                    Solicitar demonstração
                  </Button>
                </>
              ) : (
                <>
                  <a href={activeProduct.url} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 w-full sm:w-auto rounded-full px-7 py-3 text-sm font-bold bg-[#C5F467] text-[#050505] hover:bg-[#b2e052]">
                      Conhecer o {activeProduct.name.split(' ')[0]} <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                  <a href={activeProduct.url} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 w-full sm:w-auto rounded-full px-7 py-3 text-sm border border-line text-ink hover:border-brand-cyan">
                      Abrir demonstração
                  </a>
                </>
              )}
            </div>

          </div>

          {/* Product Live Dashboard Mockup Display Column */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] w-full flex items-center justify-center relative">
            
            {/* Soft decorative shadow boundary */}
            <div className="absolute inset-0 bg-ink/[0.01] border border-line rounded-3xl -m-4 pointer-events-none" />
            
            {/* HTML interactive representation rendering */}
            {renderInteractiveMockup(activeProduct.id)}
            <p className="absolute -bottom-10 left-0 text-xs text-gray-light">Prévia ilustrativa da interface, com dados de exemplo.</p>

          </div>

        </div>

      </div>
    </section>
  );
};


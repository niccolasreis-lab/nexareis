import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = {
    produtos: [
      { label: "ChamaAí Food", href: "https://chamaaifood.com.br/pilot" },
      { label: "ChamaAí — Gestão de Filas", href: "https://chamaai-nine.vercel.app/" },
      { label: "SignageFlow", href: "https://signageflow.com.br/" }
    ],
    servicos: [
      { label: "Sistemas Web Customizados", href: "#solucoes" },
      { label: "Plataformas SaaS Escaláveis", href: "#solucoes" },
      { label: "Dashboards Operacionais", href: "#solucoes" },
      { label: "Integrações de APIs", href: "#solucoes" }
    ],
    institucional: [
      { label: "Início", href: "#home" },
      { label: "Sobre Nós", href: "#sobre-nos" },
      { label: "Processo de Trabalho", href: "#processo" },
      { label: "Dúvidas Frequentes", href: "#faq" }
    ]
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-[#050505] text-[#8C8C87] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Logo Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Logo variant="header" showText={true} className="mb-6" />
            <p className="font-sans text-xs sm:text-sm text-gray-sec leading-relaxed mb-6 max-w-sm">
              Nexa Reis — Tecnologia de ponta projetada, homologada e integrada diretamente na operação física de estabelecimentos comerciais presenciais.
            </p>
            {/* Social handles */}
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-black transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://wa.me/5511937105501" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-black transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation links Columns */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold mb-6">Nossos Produtos</h4>
            <ul className="space-y-3.5">
              {quickLinks.produtos.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-sans text-xs sm:text-sm text-gray-sec hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold mb-6">Soluções Sob Medida</h4>
            <ul className="space-y-3.5">
              {quickLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleScrollTo(e, link.href)} 
                    className="font-sans text-xs sm:text-sm text-gray-sec hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white font-bold mb-6">Institucional</h4>
            <ul className="space-y-3.5">
              {quickLinks.institucional.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleScrollTo(e, link.href)} 
                    className="font-sans text-xs sm:text-sm text-gray-sec hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 18. GIANT LETTERING STAMP - Grandioso NEXA REIS em Display font with massive letter spacing */}
        <div className="py-12 select-none border-b border-white/5 pointer-events-none">
          <div className="font-display font-black text-[12vw] leading-none text-center tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.03] to-transparent uppercase pr-[-0.25em]">
            NEXA REIS
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-sec gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <span>© {currentYear} Nexa Reis. Todos os direitos reservados.</span>
            <span className="font-mono text-[9px]">CNPJ: [CONTEÚDO A CONFIRMAR] | São Paulo — SP</span>
          </div>
          
          <div className="flex items-center gap-1.5 font-sans">
            <span>Operação com dedicação por Nexa Reis</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};

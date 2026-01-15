import React from 'react';
import { Logo } from './Logo';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';
import { Linkedin, Github, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nexa-slate900 border-t border-nexa-slate800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <Logo variant="footer" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Impulsionando o futuro dos negócios através de automação inteligente e soluções de software sob medida.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-nexa-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={CONTACT_INFO.social.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-nexa-blue transition-colors">
                <Github size={20} />
              </a>
              <a href={CONTACT_INFO.social.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-nexa-blue transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
              <li><a href="#" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Privacidade</a></li>
            </ul>
          </div>

          {/* Services (Manual for now to match prompt structure ideas) */}
          <div>
            <h4 className="text-white font-bold mb-6">Soluções</h4>
            <ul className="space-y-3">
              <li><a href="#servicos" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Automação RPA</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Desenvolvimento Web</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Consultoria Tech</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-nexa-cyan text-sm transition-colors">Integração API</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-nexa-orange mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-nexa-orange shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-nexa-orange shrink-0" />
                <a href="tel:+5511999999999" className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-nexa-slate800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Nexa Reis Automation. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-400">Sistemas Operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
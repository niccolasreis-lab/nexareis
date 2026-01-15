import React from 'react';
import { Logo } from './Logo';
import { NAV_ITEMS, CONTACT_INFO } from '../constants';
import { Linkedin, Mail, MapPin, Phone, Instagram } from 'lucide-react';
import { DevSignature } from './DevSignature';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Logo variant="footer" className="mb-6" />
            <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', marginTop: '1.5rem' }}>
              Impulsionando o futuro dos negócios através de automação inteligente e soluções de software sob medida.
            </p>
            <div className="footer-social">
              <a href={CONTACT_INFO.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={CONTACT_INFO.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={CONTACT_INFO.social.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gray-400)' }} onMouseOver={(e) => e.currentTarget.style.color = '#22c55e'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-gray-400)'} aria-label="WhatsApp">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1.5rem' }}>Navegação</h4>
            <ul className="footer-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Privacidade</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1.5rem' }}>Soluções</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Automação RPA</a></li>
              <li><a href="#servicos">Desenvolvimento Web</a></li>
              <li><a href="#servicos">Consultoria Tech</a></li>
              <li><a href="#servicos">Integração API</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1.5rem' }}>Contato</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-orange)', flexShrink: 0, marginTop: '0.125rem' }} />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                <Mail size={18} style={{ color: 'var(--color-orange)', flexShrink: 0 }} />
                <a href={`mailto:${CONTACT_INFO.email}`} style={{ color: 'inherit' }}>{CONTACT_INFO.email}</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                <Phone size={18} style={{ color: 'var(--color-orange)', flexShrink: 0 }} />
                <a href={CONTACT_INFO.social.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>{CONTACT_INFO.phone}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p style={{ color: '#6b7280', fontSize: '0.875rem', textAlign: 'center' }}>
            © 2026 Nexa Reis Automation. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></span>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Sistemas Operacionais</span>
          </div>
        </div>

        {/* Developer Signature */}
        <DevSignature />
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }`}</style>
    </footer>
  );
};
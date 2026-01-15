import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface DevSignatureProps {
  className?: string;
}

export const DevSignature: React.FC<DevSignatureProps> = ({ className }) => {
  return (
    <div className={clsx("dev-signature", className)}>
      <div className="dev-sig-content">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          Desenvolvido por <span style={{ fontWeight: 600, color: '#9ca3af' }}>Nexa Reis Automation</span>
        </span>
        
        <div className="md-block hidden" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#374151' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a 
            href="https://instagram.com/nexareisautomacao" 
            target="_blank" 
            rel="noreferrer" 
            className="dev-sig-link"
          >
            <Instagram size={12} />
            <span>@nexareisautomacao</span>
          </a>
          
          <a 
            href="https://wa.me/5511937105501" 
            target="_blank" 
            rel="noreferrer" 
            className="dev-sig-link whatsapp-link"
          >
            <MessageCircle size={12} />
            <span>+55 11 93710-5501</span>
          </a>
        </div>
      </div>
    </div>
  );
};
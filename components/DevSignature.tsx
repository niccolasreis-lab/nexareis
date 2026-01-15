import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface DevSignatureProps {
  className?: string;
}

export const DevSignature: React.FC<DevSignatureProps> = ({ className }) => {
  return (
    <div className={clsx("w-full border-t border-nexa-slate800/50 mt-8 pt-6", className)}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          Desenvolvido por <span className="font-semibold text-gray-400">Nexa Reis Automation</span>
        </span>
        
        <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/nexareisautomacao" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 hover:text-nexa-cyan transition-colors"
          >
            <Instagram size={12} />
            <span>@nexareisautomacao</span>
          </a>
          
          <a 
            href="https://wa.me/5511937105501" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 hover:text-green-500 transition-colors"
          >
            <MessageCircle size={12} />
            <span>+55 11 93710-5501</span>
          </a>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { clsx } from 'clsx';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'header' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, variant = 'header' }) => {
  const isFooter = variant === 'footer';

  return (
    <div className={clsx("logo-container", isFooter ? "logo-footer" : "logo-header", className)}>
      <div className="logo-svg-wrapper">
        <div 
            className="logo-glow" 
            style={{ 
                width: isFooter ? '6rem' : '2.5rem', 
                height: isFooter ? '6rem' : '2.5rem' 
            }} 
        />
        <div style={{ width: isFooter ? '6rem' : '2.5rem', height: isFooter ? '6rem' : '2.5rem', position: 'relative' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.6))' }}>
            <defs>
               <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#00D4FF" />
                 <stop offset="100%" stopColor="#0066FF" />
               </linearGradient>
             </defs>
             
             <path 
               d="M 25 80 L 25 20 L 75 80 L 75 20" 
               fill="none" 
               stroke="url(#logoGradient)" 
               strokeWidth="6" 
               strokeLinecap="round" 
               strokeLinejoin="round"
             />
             
             <path
               d="M 50 20 L 50 50"
               fill="none"
               stroke="url(#logoGradient)" 
               strokeWidth="6"
               strokeLinecap="round"
             />

             <path
               d="M 50 50 L 75 50"
               fill="none"
               stroke="url(#logoGradient)" 
               strokeWidth="6"
               strokeLinecap="round"
             />
             
             <circle cx="25" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             <circle cx="25" cy="80" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             <circle cx="75" cy="80" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             <circle cx="75" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             <circle cx="50" cy="50" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             <circle cx="50" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             <circle cx="75" cy="50" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             
             <path d="M 25 35 L 25 65" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
             <path d="M 75 35 L 75 65" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
             <path d="M 40 38 L 45 42" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={clsx("logo-text", isFooter ? "text-xl-custom" : "text-md-custom")} style={{ fontSize: isFooter ? '1.875rem' : '1.25rem' }}>
          Nexa Reis Automation
        </span>
      )}
    </div>
  );
};
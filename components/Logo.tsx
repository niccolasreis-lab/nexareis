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
    <div className={clsx("flex", isFooter ? "flex-col items-start gap-4" : "flex-row items-center gap-3", className)}>
      <div className="relative group shrink-0">
        {/* "NA" Symbol - Custom Monogram */}
        <div className={clsx("relative transition-all duration-300", isFooter ? "w-24 h-24" : "w-10 h-10")}>
          <div className="absolute inset-0 bg-nexa-blue/20 rounded-lg blur-lg group-hover:bg-nexa-cyan/30 transition-all duration-500" />
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">
            <defs>
               <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#00D4FF" />
                 <stop offset="100%" stopColor="#0066FF" />
               </linearGradient>
             </defs>
             
             {/* N Path: Left Vert, Diagonal, Right Vert */}
             <path 
               d="M 25 80 L 25 20 L 75 80 L 75 20" 
               fill="none" 
               stroke="url(#logoGradient)" 
               strokeWidth="6" 
               strokeLinecap="round" 
               strokeLinejoin="round"
             />
             
             {/* Top Strut: Top Center to Diagonal Intersection */}
             <path
               d="M 50 20 L 50 50"
               fill="none"
               stroke="url(#logoGradient)" 
               strokeWidth="6"
               strokeLinecap="round"
             />

             {/* A Crossbar: Mid-Diagonal to Right Vert */}
             <path
               d="M 50 50 L 75 50"
               fill="none"
               stroke="url(#logoGradient)" 
               strokeWidth="6"
               strokeLinecap="round"
             />
             
             {/* Tech Nodes/Dots */}
             {/* N Vertices */}
             <circle cx="25" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             <circle cx="25" cy="80" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             <circle cx="75" cy="80" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             <circle cx="75" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             {/* Central Intersection */}
             <circle cx="50" cy="50" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             {/* Top Strut Start */}
             <circle cx="50" cy="20" r="3" fill="#0A1628" stroke="#00D4FF" strokeWidth="2" />
             
             {/* Right Intersection */}
             <circle cx="75" cy="50" r="3" fill="#0A1628" stroke="#0066FF" strokeWidth="2" />
             
             {/* Inner Circuit Details (Decorative) */}
             <path d="M 25 35 L 25 65" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
             <path d="M 75 35 L 75 65" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
             <path d="M 40 38 L 45 42" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={clsx(
          "font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-nexa-cyan to-nexa-blue whitespace-nowrap",
          isFooter ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
        )}>
          Nexa Reis Automation
        </span>
      )}
    </div>
  );
};
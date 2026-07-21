import React from 'react';
import { clsx } from 'clsx';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'header' | 'footer' | 'hero';
}

export const Logo: React.FC<LogoProps> = ({ className, showText = true, variant = 'header' }) => {
  const isFooter = variant === 'footer';
  const isHero = variant === 'hero';

  return (
    <div className={clsx(
      "flex items-center gap-3 transition-all duration-300", 
      isFooter && "flex-col items-center text-center gap-4",
      isHero && "flex-col items-center gap-6",
      className
    )}>
      {/* SVG Icon matching the glowing circuit logo */}
      <div className="relative group flex items-center justify-center">
        {/* Glow behind the SVG */}
        <div className={clsx(
          "absolute inset-0 bg-brand-cyan/20 rounded-full blur-xl transition-all duration-500 group-hover:bg-brand-cyan/35",
          isFooter ? "w-24 h-24 blur-2xl" : isHero ? "w-36 h-36 blur-3xl" : "w-10 h-10 blur-md"
        )} />
        
        <svg 
          viewBox="0 0 120 120" 
          className={clsx(
            "relative transition-transform duration-500 group-hover:scale-105",
            isFooter ? "w-20 h-20" : isHero ? "w-28 h-28" : "w-10 h-10"
          )}
        >
          <defs>
            <linearGradient id="nexaBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#00A2FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
            <filter id="nexaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Hexagonal Outer Circuit Frame */}
          <path 
            d="M 60 12 L 102 36 L 102 84 L 60 108 L 18 84 L 18 36 Z" 
            fill="none" 
            stroke="url(#nexaBlueGrad)" 
            strokeWidth="2.5" 
            strokeOpacity="0.4"
            strokeDasharray="400"
          />
          
          {/* Active circuit paths branching off hexagon corner */}
          <path 
            d="M 18 36 L 45 20 M 102 84 L 75 100" 
            fill="none" 
            stroke="url(#nexaBlueGrad)" 
            strokeWidth="2" 
            strokeOpacity="0.7"
          />
          
          {/* Micro-nodes on the hexagonal corners and paths */}
          <circle cx="60" cy="12" r="3.5" fill="#050505" stroke="#00F0FF" strokeWidth="2" filter="url(#nexaGlow)" />
          <circle cx="102" cy="36" r="3.5" fill="#050505" stroke="#00F0FF" strokeWidth="2" />
          <circle cx="18" cy="84" r="3.5" fill="#050505" stroke="#00F0FF" strokeWidth="2" />
          
          {/* Stylized double-line circuit 'N' */}
          <g filter="url(#nexaGlow)">
            {/* Main N shape */}
            <path 
              d="M 38 82 L 38 38 L 82 82 L 82 38" 
              fill="none" 
              stroke="url(#nexaBlueGrad)" 
              strokeWidth="6.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Inline accent node paths */}
            <path 
              d="M 44 48 L 56 48 M 76 72 L 64 72" 
              fill="none" 
              stroke="#050505" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
          </g>

          {/* Internal branching circuit nodes */}
          <path d="M 58 36 L 58 56" fill="none" stroke="url(#nexaBlueGrad)" strokeWidth="2" />
          <path d="M 66 36 L 66 48 L 74 48 L 74 58" fill="none" stroke="url(#nexaBlueGrad)" strokeWidth="2" />
          <path d="M 46 84 L 46 72 M 54 84 L 54 78" fill="none" stroke="url(#nexaBlueGrad)" strokeWidth="2" />
          
          <circle cx="58" cy="56" r="2.5" fill="#00F0FF" />
          <circle cx="74" cy="58" r="2.5" fill="#00F0FF" />
          <circle cx="46" cy="72" r="2.5" fill="#00F0FF" />
        </svg>
      </div>

      {showText && (
        <div className={clsx(
          "flex flex-col select-none tracking-wider",
          isFooter ? "items-center" : isHero ? "items-center" : "items-start"
        )}>
          {/* Main Logo Text with Wide futuristic spacing */}
          <span className={clsx(
            "font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-light leading-none",
            isFooter ? "text-3xl tracking-[0.15em]" : isHero ? "text-4xl tracking-[0.2em]" : "text-xl tracking-[0.1em]"
          )}>
            NEXA
          </span>
          
          {/* REIS divider */}
          <span className={clsx(
            "font-sans font-medium text-brand-cyan uppercase leading-normal tracking-[0.4em] flex items-center justify-center",
            isFooter ? "text-base mt-1.5" : isHero ? "text-lg mt-2" : "text-[0.65rem] mt-0.5"
          )}>
            {isFooter || isHero ? "— REIS —" : "REIS"}
          </span>

          {/* AUTOMAÇÃO tag */}
          {(isFooter || isHero) && (
            <span className="font-mono text-gray-sec text-xs tracking-[0.5em] mt-1 text-center font-normal">
              AUTOMAÇÃO
            </span>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { clsx } from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost' | 'lime' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}) => {
  // Premium base styling
  const baseClass = "relative inline-flex items-center justify-center font-sans font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40";
  
  const variants = {
    primary: "bg-white text-[#050505] hover:bg-white-soft shadow-lg shadow-white/5",
    lime: "bg-[#C5F467] text-[#050505] hover:bg-[#b2e052] shadow-lg shadow-[#C5F467]/10",
    dark: "bg-[#050505] text-white hover:bg-black shadow-lg shadow-black/10",
    outline: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-gray-light hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs uppercase tracking-widest",
    md: "px-7 py-3 text-sm",
    lg: "px-10 py-4.5 text-base font-semibold",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClass, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Background ripple highlight */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

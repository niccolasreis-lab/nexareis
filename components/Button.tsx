import React from 'react';
import { clsx } from 'clsx';
import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion';

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
  disabled,
  whileHover,
  whileTap,
  ...props 
}) => {
  const reduceMotion = useReducedMotion();
  const baseClass = "relative inline-flex min-h-11 items-center justify-center font-sans font-medium tracking-wide rounded-full overflow-hidden transition-[background-color,border-color,color,box-shadow] duration-150 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 touch-manipulation";
  
  const variants = {
    primary: "bg-brand-blue text-white enabled:hover:bg-accent-dark shadow-lg shadow-ink/5",
    lime: "bg-[#C5F467] text-[#050505] enabled:hover:bg-[#b2e052] shadow-lg shadow-[#C5F467]/10",
    dark: "bg-brand-blue text-white enabled:hover:bg-accent-dark shadow-lg shadow-ink/10",
    outline: "bg-transparent text-ink border border-control-line enabled:hover:border-brand-cyan enabled:hover:bg-ink/5",
    ghost: "bg-transparent text-gray-light enabled:hover:text-ink enabled:hover:bg-ink/5",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs uppercase tracking-widest",
    md: "px-7 py-3 text-sm",
    lg: "px-10 py-4.5 text-base font-semibold",
  };

  return (
    <motion.button 
      disabled={disabled}
      whileHover={reduceMotion || disabled ? undefined : whileHover ?? { scale: 1.02, y: -1 }}
      whileTap={reduceMotion || disabled ? undefined : whileTap ?? { scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(baseClass, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};


import React from 'react';
import { clsx } from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline' | 'ghost';
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
  const baseClass = "btn";
  
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  const sizes = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClass, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
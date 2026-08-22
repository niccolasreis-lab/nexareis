import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true to avoid flashes before hydration/detection

  // Mouse position coordinates using motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the organic lagging outer ring effect
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile / touch-only primary devices or small screens
    const checkDevice = () => {
      const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(Boolean(isCoarsePointer || isSmallScreen));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // Performance-optimized event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      // Expand outer ring on clickable, standard links, buttons, form elements or any custom hover trigger
      const isInteractive = target.closest('button, a, select, input, textarea, [role="button"], .clickable, [data-cursor-hover], svg');
      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isLeavingInteractive = !target.closest('button, a, select, input, textarea, [role="button"], .clickable, [data-cursor-hover], svg');
      if (isLeavingInteractive) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  // Handle hiding default cursor via root class
  useEffect(() => {
    if (!isMobile && isVisible) {
      document.documentElement.classList.add('custom-cursor-active');
    } else {
      document.documentElement.classList.remove('custom-cursor-active');
    }
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] select-none" 
      style={{ display: isVisible ? 'block' : 'none' }}
      id="custom-cursor-root"
    >
      {/* 1. Outer Ring (Spring Trail) */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          borderColor: isHovered ? 'rgba(0, 212, 255, 0.8)' : 'rgba(0, 212, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 212, 255, 0.08)' : 'rgba(0, 212, 255, 0)',
          scale: isMouseDown ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 25,
        }}
        className="absolute rounded-full border border-brand-cyan pointer-events-none mix-blend-screen"
      />

      {/* 2. Inner Dot (Immediate follower) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          duration: 0.12,
        }}
        className="absolute w-2 h-2 bg-brand-cyan rounded-full pointer-events-none mix-blend-screen"
      />
    </div>
  );
};

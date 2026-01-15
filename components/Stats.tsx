import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { STATS } from '../constants';

const Counter = ({ from, to, suffix, duration = 2 }: { from: number, to: number, suffix: string, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  React.useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;

    let start = from;
    const end = to;
    const range = end - from;
    const incrementTime = (duration * 1000) / Math.abs(range);
    let timer: any;

    const run = () => {
      start += 1;
      node.textContent = String(start) + suffix;
      if (start === end) {
        clearInterval(timer);
      }
    };

    if (range > 0) {
      timer = setInterval(run, incrementTime);
    } else {
        node.textContent = String(end) + suffix;
    }

    return () => clearInterval(timer);
  }, [inView, from, to, suffix, duration]);

  return <span ref={nodeRef} className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nexa-cyan to-white">{from}{suffix}</span>;
};

export const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-nexa-slate900 border-y border-nexa-slate800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-nexa-slate800/50">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <Counter from={0} to={stat.value} suffix={stat.suffix} />
              <p className="mt-4 text-gray-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
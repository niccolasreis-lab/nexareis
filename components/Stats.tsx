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

  return <span ref={nodeRef} className="stat-number">{from}{suffix}</span>;
};

export const Stats: React.FC = () => {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-slate900)', borderTop: '1px solid var(--color-slate800)', borderBottom: '1px solid var(--color-slate800)' }}>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, index) => (
            <div key={index} className="stat-item">
              <Counter from={0} to={stat.value} suffix={stat.suffix} />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
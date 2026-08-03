import React, { useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: React.ReactNode;
  id?: string;
  minHeight?: string;
}

export const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  id,
  minHeight = '12rem',
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '900px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={targetRef} id={id} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};

'use client';
import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Counts up from zero the first time it scrolls into view.
export default function Counter({ value, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const format = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular">
      {format(value)}
    </span>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// Custom cursor: a small dot that becomes a labelled disc over anything with data-cursor="Label".
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor]');
      setLabel(t ? t.getAttribute('data-cursor') : e.target.closest('a, button') ? '' : null);
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 92 : label === '' ? 44 : 12;

  return (
    <motion.div
      className={`cursor${label ? ' has-label' : ''}${label === '' ? ' is-link' : ''}`}
      style={{ x: sx, y: sy, opacity: hidden ? 0 : 1 }}
      aria-hidden="true"
    >
      <motion.div
        className="cursor__disc"
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              className="cursor__label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

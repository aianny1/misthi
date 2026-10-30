'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Buttery inertial scrolling. Skipped for people who prefer reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.lenis = lenis;
    let id;
    const raf = (time) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);
  return null;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.lenis) window.lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

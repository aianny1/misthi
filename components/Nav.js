'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { scrollToId } from './SmoothScroll';
import { profile } from '@/data/content';

const links = [
  ['about', 'About'],
  ['work', 'Reels'],
  ['insights', 'Insights'],
  ['quote', 'Rates'],
  ['faq', 'FAQ'],
];

// Blends against whatever is behind it, hides while scrolling down, returns on scroll up.
// Stays hidden at the page end and ignores tiny moves, which phones produce when the
// page bounces or the address bar resizes.
export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const anchor = useRef(0);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollY, 'change', (y) => {
    const end = document.documentElement.scrollHeight - window.innerHeight;
    if (y <= 240 || y >= end - 120) {
      anchor.current = y;
      setHidden(y > 240);
      return;
    }
    if (Math.abs(y - anchor.current) < 12) return;
    setHidden(y > anchor.current);
    anchor.current = y;
  });

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <motion.div className="nav__progress" style={{ scaleX: progress }} />
      <motion.header
        className="nav"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__inner wrap">
          <a href="#top" className="nav__logo" onClick={go('top')}>
            {profile.name}
          </a>
          <nav className="nav__links" aria-label="Sections">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={go(id)}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn nav__cta" onClick={go('contact')}>
            Book a collab
          </a>
        </div>
      </motion.header>
    </>
  );
}

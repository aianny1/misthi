'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Icon } from './ui/Vectors';
import { profile } from '@/data/content';

// Floating WhatsApp shortcut that appears once the visitor scrolls past the hero.
// It leaves when the footer arrives, so it never covers the giant name.
export default function WhatsAppButton() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => {
    const footer = document.querySelector('.footer');
    setShow(y > 500 && footer.getBoundingClientRect().top > window.innerHeight);
  });

  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Hi Mishthi, I would like to discuss a UGC collaboration.')}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="wa-fab"
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Mishthi on WhatsApp"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <span className="wa-fab__tip">Chat on WhatsApp</span>
          <span className="wa-fab__btn">
            <Icon name="whatsapp" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

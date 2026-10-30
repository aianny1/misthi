'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './ui/Reveal';
import { faq } from '@/data/content';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section" id="faq">
      <div className="wrap faq__grid">
        <SectionTitle eyebrow="FAQ" title="Before we" em="collab." />
        <ul className="faq__list">
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={`qa${on ? ' is-open' : ''}`}>
                <button type="button" className="qa__q" aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                  <span>{f.q}</span>
                  <motion.span className="qa__icon" animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      className="qa__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

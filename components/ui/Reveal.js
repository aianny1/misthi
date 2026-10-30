'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Splits text into words that rise out of a mask when scrolled into view.
// The outer element is what gets observed: the hidden words sit outside their
// overflow masks, so observing them directly would never report them as visible.
export function RevealText({ text, as = 'span', className, delay = 0, stagger = 0.06 }) {
  const Tag = motion[as];
  const words = text.split(' ');
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {words.map((w, i) => (
        <span key={i} className="mask" aria-hidden="true">
          <motion.span
            className="mask-inner"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.9, ease, delay: delay + i * stagger } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

// Fades and lifts any block into place.
export function Rise({ children, delay = 0, y = 32, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  );
}

// Small label + large display heading whose last phrase is set in a serif italic.
export function SectionTitle({ eyebrow, title, em, className = '' }) {
  return (
    <div className={`heading ${className}`}>
      {eyebrow && (
        <Rise as="p" className="eyebrow" y={12}>
          <span className="eyebrow__dot" />
          {eyebrow}
        </Rise>
      )}
      <h2 className="heading__title">
        <RevealText text={title} />
        {em && (
          <>
            {' '}
            <RevealText text={em} className="heading__em" delay={0.12} />
          </>
        )}
      </h2>
    </div>
  );
}

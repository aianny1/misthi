'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SectionTitle } from './ui/Reveal';
import { Waveform } from './ui/Vectors';
import { process } from '@/data/content';

// Four steps along a line that draws itself as you scroll.
export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="process section" id="process">
      <div className="wrap process__grid">
        <div className="process__side">
          <SectionTitle eyebrow="How we work together" title="From brief" em="to ready-to-post." />
          <p className="process__intro">
            A simple, transparent process: you always know what comes next, and nothing goes live without your
            approval.
          </p>
          <Waveform className="process__wave" />
        </div>
        <ol className="steps" ref={ref}>
          <span className="steps__rail" aria-hidden="true">
            <motion.span className="steps__fill" style={{ scaleY: line }} />
          </span>
          {process.map((s, i) => (
            <motion.li
              key={s.title}
              className="step"
              initial={{ opacity: 0.25, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: '-35% 0px -35% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step__num tabular">Step {i + 1}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

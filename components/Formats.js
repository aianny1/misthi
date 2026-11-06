'use client';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/Reveal';
import { PlayRing } from './ui/Vectors';
import { formats } from '@/data/content';

// List of content formats as plain, readable text (good for search). Hovering a row highlights it.
export default function Formats() {
  return (
    <section className="formats section" id="formats">
      <div className="grid-bg grid-bg--top" aria-hidden="true" />
      <PlayRing className="formats__play" />
      <div className="wrap">
        <SectionTitle eyebrow="What I create" title="Seven formats that put your product" em="in the right feed." />

        <ol className="formats__list">
          {formats.map((f, i) => (
            <motion.li
              key={f.name}
              className="format"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <h3 className="format__name">{f.name}</h3>
              <div className="format__text">
                <p className="format__note">{f.note}</p>
                <p className="format__best">
                  <b>Best for</b> {f.best}
                </p>
              </div>
              <span className="format__arrow" aria-hidden="true">
                ↗
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

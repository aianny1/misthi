'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { SectionTitle } from './ui/Reveal';
import { PlayRing } from './ui/Vectors';
import { formats, work } from '@/data/content';

const clipFor = (id) => work.find((w) => w.id === id);

// List of content formats. On desktop a reel floats after the cursor and switches
// to match the row you are over. On touch screens a row opens to show its reel inline.
export default function Formats() {
  const [active, setActive] = useState(null);
  const [fine, setFine] = useState(false);
  const area = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const vx = useVelocity(sx);
  const tilt = useTransform(vx, [-1500, 0, 1500], [-14, 0, 14], { clamp: true });

  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const onMove = (e) => {
    const r = area.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = active != null ? clipFor(formats[active].clip) : null;

  return (
    <section className="formats section" id="formats">
      <div className="grid-bg grid-bg--top" aria-hidden="true" />
      <PlayRing className="formats__play" />
      <div className="wrap">
        <SectionTitle eyebrow="What I create" title="Seven formats that put your product" em="in the right feed." />

        <div
          className="formats__list"
          ref={area}
          onMouseMove={fine ? onMove : undefined}
          onMouseLeave={fine ? () => setActive(null) : undefined}
        >
          {formats.map((f, i) => {
            const open = active === i;
            return (
              <motion.div
                key={f.name}
                className={`format${open ? ' is-active' : ''}${active != null && !open ? ' is-dim' : ''}`}
                onMouseEnter={fine ? () => setActive(i) : undefined}
                onClick={!fine ? () => setActive(open ? null : i) : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                <span className="format__name">{f.name}</span>
                <span className="format__note">{f.note}</span>
                <span className="format__arrow" aria-hidden="true">
                  ↗
                </span>
                {!fine && (
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="format__inline"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <video src={clipFor(f.clip).src} poster={clipFor(f.clip).poster} muted loop playsInline autoPlay />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}

          {fine && (
            <motion.div
              className="follow"
              style={{ x: sx, y: sy, rotate: tilt }}
              animate={{ scale: current ? 1 : 0, opacity: current ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              aria-hidden="true"
            >
              <AnimatePresence mode="popLayout">
                {current && (
                  <motion.video
                    key={current.id}
                    src={current.src}
                    poster={current.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

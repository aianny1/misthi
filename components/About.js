'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rise, RevealText } from './ui/Reveal';
import ScrollWords from './ui/ScrollWords';
import ReelFeed from './ReelFeed';
import { Burst } from './ui/Vectors';
import { about } from '@/data/content';

// Portrait and reels feed in a two-card deck. The portrait starts on top; clicking the
// feed behind it (or the button below) swaps them. The portrait tilts toward the cursor.
function PortraitDeck() {
  const ref = useRef(null);
  const [showCard, setShowCard] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const shineX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="tilt" ref={ref}>
      <Burst className="tilt__spark" />
      <div className={`deck${showCard ? ' is-card' : ''}`}>
        <div className="deck__slide deck__slide--card" onClick={() => setShowCard(true)}>
          <ReelFeed active={showCard} />
        </div>
        <div
          className="deck__slide deck__slide--photo"
          onClick={() => setShowCard(false)}
          onMouseMove={showCard ? undefined : onMove}
          onMouseLeave={reset}
        >
          <motion.div className="tilt__card" style={{ rotateX: rx, rotateY: ry }}>
            <img src="/media/portrait-saree-cut.webp" alt="Mishthi, Jaipur fashion and beauty content creator, in a pink Banarasi saree" width="465" height="553" loading="lazy" />
            <motion.span className="tilt__shine" style={{ left: shineX }} aria-hidden="true" />
          </motion.div>
          <span className="tilt__tag">Jaipur, India</span>
        </div>
      </div>
      <button type="button" className="deck__toggle" onClick={() => setShowCard((s) => !s)} aria-pressed={showCard}>
        <span aria-hidden="true">↻</span> {showCard ? 'Show photo' : 'Watch reels feed'}
      </button>
    </div>
  );
}

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="wrap about__grid">
        <Rise>
          <PortraitDeck />
        </Rise>
        <div className="about__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            About
          </p>
          <RevealText as="h2" text={about.hello} className="about__title" />
          <ScrollWords text={about.lead} className="about__lead" />
          <Rise>
            <p className="about__body">{about.body}</p>
          </Rise>
          <Rise delay={0.1}>
            <ul className="chips">
              {about.categories.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Rise>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rise, RevealText } from './ui/Reveal';
import ScrollWords from './ui/ScrollWords';
import { Burst } from './ui/Vectors';
import { about, insights, profile } from '@/data/content';

const compact = (n) => `${(n / 1000).toFixed(1)}K`;

// "Creator pass" that shares a deck with the portrait: a full-bleed photo with the key numbers.
function CreatorPass({ active }) {
  return (
    <div className="pass" aria-hidden={!active}>
      <img className="pass__photo" src="/media/portrait-red-cut.webp" alt="" width="993" height="1584" loading="lazy" />
      <span className="pass__status">
        <i /> Open for collabs
      </span>
      <div className="pass__body">
        <b className="pass__handle">@{profile.instagram}</b>
        <small className="pass__role">
          {profile.role} · {profile.city}
        </small>
        <dl className="pass__stats">
          <div>
            <dd>{compact(insights.profileVisits)}</dd>
            <dt>profile visits</dt>
          </div>
          <div>
            <dd>{compact(insights.linkTaps)}</dd>
            <dt>link taps</dt>
          </div>
          <div>
            <dd>{insights.nonFollowers}%</dd>
            <dt>new reach</dt>
          </div>
        </dl>
        <a className="btn btn--primary btn--block" href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}>
          View Instagram
        </a>
      </div>
    </div>
  );
}

// Portrait and creator pass in a two-card deck. The portrait starts on top; clicking the
// card behind it (or the button below) swaps them. The portrait tilts toward the cursor.
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
          <CreatorPass active={showCard} />
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
        <span aria-hidden="true">↻</span> {showCard ? 'Show photo' : 'View creator pass'}
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

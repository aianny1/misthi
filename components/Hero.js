'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ReelStack from './ReelStack';
import { RingLight, Burst, Viewfinder, Icon } from './ui/Vectors';
import Magnetic from './ui/Magnetic';
import { scrollToId } from './SmoothScroll';
import { getIntroDelay } from './introDelay';
import { profile, hero, work, insights } from '@/data/content';

const ease = [0.22, 1, 0.36, 1];

function Rotator({ words, delay }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [words.length, delay]);
  return (
    <span className="rotator">
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          className="rotator__word"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const Line = ({ children, d }) => (
  <span className="mask hero__line">
    <motion.span
      className="mask-inner"
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1.1, ease, delay: d }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const d = getIntroDelay();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const stackItems = ['lehenga', 'cherry', 'grwm', 'lipbalm'].map((id) => work.find((w) => w.id === id));
  const stat = (label) => insights.topReel.find((s) => s.label === label).display;
  const likes = stat('Likes');
  const shares = stat('Shares');

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <Viewfinder />
      <div className="wrap hero__inner">
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <motion.h1
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: d }}
          >
            <span className="eyebrow__dot is-live" />
            {profile.name} · {profile.role} in {profile.city}
          </motion.h1>

          <p className="hero__title">
            <Line d={d + 0.05}>Content that</Line>
            <Line d={d + 0.12}>
              <em>stops</em> the scroll
            </Line>
            <Line d={d + 0.19}>and sells.</Line>
          </p>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: d + 0.45 }}
          >
            Hey, I&rsquo;m {profile.name}. I create <Rotator words={hero.rotating} delay={d + 1.2} /> that feel real,
            for fashion, beauty and lifestyle brands across India.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: d + 0.6 }}
          >
            <Magnetic>
              <a href="#work" className="btn btn--primary" onClick={(e) => (e.preventDefault(), scrollToId('work'))}>
                Watch my reels
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#quote" className="btn btn--ghost" onClick={(e) => (e.preventDefault(), scrollToId('quote'))}>
                Get a quote
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: d + 0.85 }}
          >
            <div>
              <dd>{(insights.views / 1e6).toFixed(1)}M+</dd>
              <dt>total views</dt>
            </div>
            <div>
              <dd>{(insights.reached / 1e6).toFixed(1)}M</dd>
              <dt>accounts reached</dt>
            </div>
            <div>
              <dd>{insights.nonFollowers}%</dd>
              <dt>new-audience reach</dt>
            </div>
          </motion.dl>
        </motion.div>

        <div className="hero__visual">
          <RingLight className="hero__ring" />
          <Burst className="hero__spark" />
          <motion.div
            className="arch"
            style={{ y: archY, scale: archScale }}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: d - 0.1 }}
          >
            <motion.img
              src="/media/portrait-red-cut.webp"
              alt="Mishthi, UGC creator and model from Jaipur, in a red strapless dress"
              width="518"
              height="825"
              fetchPriority="high"
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease, delay: d - 0.1 }}
            />
            <span className="arch__label" aria-hidden="true">
              <span>@{profile.instagram} · Jaipur, IN</span>
            </span>
          </motion.div>
          <motion.div
            className="hero__stack"
            initial={{ opacity: 0, y: 80, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease, delay: d + 0.5 }}
          >
            <ReelStack items={stackItems} />
          </motion.div>
          <motion.div
            className="pop pop--likes"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: d + 1 }}
            aria-hidden="true"
          >
            <span className="pop__inner">
              <span className="pop__icon">
                <Icon name="heart" />
              </span>
              <span className="pop__text">
                <b>{likes}</b>
                <small>likes on one reel</small>
              </span>
            </span>
          </motion.div>
          <motion.div
            className="pop pop--dm"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: d + 1.3 }}
            aria-hidden="true"
          >
            <span className="pop__inner">
              <span className="pop__icon pop__icon--dm">
                <Icon name="mail" />
              </span>
              <span className="pop__text">
                <b>New collab request</b>
                <small>Brand DM · just now</small>
              </span>
            </span>
          </motion.div>
          <motion.div
            className="pop pop--shares"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: d + 1.15 }}
            aria-hidden="true"
          >
            <span className="pop__inner">
              <span className="pop__icon pop__icon--share">
                <Icon name="send" />
              </span>
              <span className="pop__text">
                <b>{shares}</b>
                <small>shares on one reel</small>
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

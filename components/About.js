'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Rise, RevealText } from './ui/Reveal';
import ScrollWords from './ui/ScrollWords';
import { PhoneReel, Burst } from './ui/Vectors';
import { about } from '@/data/content';

// Portrait in an arch that tilts toward the cursor, next to the bio.
function TiltPortrait() {
  const ref = useRef(null);
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
    <div className="tilt" ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
      <PhoneReel className="tilt__phone" />
      <Burst className="tilt__spark" />
      <motion.div className="tilt__card" style={{ rotateX: rx, rotateY: ry }}>
        <img src="/media/portrait-saree-cut.webp" alt="Mishthi, Jaipur fashion and beauty content creator, in a pink Banarasi saree" width="465" height="553" loading="lazy" />
        <motion.span className="tilt__shine" style={{ left: shineX }} aria-hidden="true" />
      </motion.div>
      <span className="tilt__tag">Jaipur, India</span>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const helloX = useTransform(scrollYProgress, [0, 1], ['6%', '-12%']);

  return (
    <section className="about section" id="about" ref={ref}>
      <motion.p className="about__hello" style={{ x: helloX }} aria-hidden="true">
        {about.hello} {about.hello}
      </motion.p>
      <div className="wrap about__grid">
        <Rise>
          <TiltPortrait />
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

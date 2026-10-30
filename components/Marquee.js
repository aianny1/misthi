'use client';
import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import { Burst } from './ui/Vectors';
import { formats } from '@/data/content';

// Endless band of content formats. Scrolling speeds it up and flips its direction.
export default function Marquee({ speed = 3 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(-1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * speed * (delta / 1000);
    if (factor.get() < 0) dir.current = 1;
    else if (factor.get() > 0) dir.current = -1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const names = formats.map((f) => f.name);
  const items = [...names, ...names];
  return (
    <div className="marquee" aria-label={`Content formats: ${names.join(', ')}`}>
      <motion.div className="marquee__track" style={{ x }} aria-hidden="true">
        {[0, 1].map((k) => (
          <span key={k} className="marquee__group">
            {items.map((f, i) => (
              <span key={i} className={i % 2 ? 'marquee__item is-script' : 'marquee__item'}>
                {f}
                <Burst className="marquee__dot" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

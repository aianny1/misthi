'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RingLight } from './ui/Vectors';
import { INTRO, typedIn } from './introDelay';

const NAME = 'Mishthi';
const TYPED = typedIn(NAME);

// Opening curtain, shown on every page load: the ring light and the name type in together,
// the finished name holds for a moment, then the curtain lifts. It closes when the typing
// actually finishes (not on a fixed timer), so a busy first load never cuts the name short.
// Timings are set in components/introDelay.js (INTRO).
export default function Loader() {
  const [show, setShow] = useState(true);
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const safety = setTimeout(() => setShow(false), INTRO.maxWait * 1000);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (!typed) return;
    const t = setTimeout(() => setShow(false), INTRO.hold * 1000);
    return () => clearTimeout(t);
  }, [typed]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: INTRO.lift, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="loader__ring"
            initial={{ opacity: 0, scale: 0.7, rotate: -INTRO.ringSpin }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: TYPED, ease: [0.22, 1, 0.36, 1] }}
          >
            <RingLight />
          </motion.div>
          <span className="loader__name" aria-label={NAME}>
            {NAME.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: '0.3em', filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
                transition={{ duration: INTRO.letterIn, ease: [0.22, 1, 0.36, 1], delay: i * INTRO.letterGap }}
                onAnimationComplete={i === NAME.length - 1 ? () => setTyped(true) : undefined}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          <motion.span
            className="loader__sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: TYPED * 0.5, duration: 0.5 }}
          >
            UGC Creator · Jaipur
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

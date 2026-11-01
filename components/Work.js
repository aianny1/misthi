'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent, animate } from 'framer-motion';
import VideoCard from './VideoCard';
import Lightbox from './Lightbox';
import { SectionTitle } from './ui/Reveal';
import { work } from '@/data/content';

const cats = ['All', ...Array.from(new Set(work.map((w) => w.cat)))];

// Filterable row of reels. Desktop drags it, hovering plays and a click opens the player.
// Touch screens use the browser's own swipe, which is smoother than a dragged transform.
export default function Work() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const [limit, setLimit] = useState(0);
  const [touch, setTouch] = useState(false);
  const viewport = useRef(null);
  const track = useRef(null);
  const dragging = useRef(false);
  const x = useMotionValue(0);
  const limitRef = useRef(0);
  const scrolled = useMotionValue(0);

  useMotionValueEvent(x, 'change', (v) => scrolled.set(limitRef.current ? v / limitRef.current : 0));

  const onSwipe = (e) => {
    const el = e.currentTarget;
    scrolled.set(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
  };

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  const list = useMemo(() => (cat === 'All' ? work : work.filter((w) => w.cat === cat)), [cat]);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      const l = Math.min(0, viewport.current.offsetWidth - track.current.scrollWidth);
      setLimit(l);
      limitRef.current = l;
      if (x.get() < l) animate(x, l, { type: 'spring', stiffness: 200, damping: 30 });
    };
    const t = setTimeout(measure, 450);
    measure();
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [list, x]);

  const pick = (c) => {
    setCat(c);
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 30 });
    viewport.current.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const close = useCallback(() => setOpen(null), []);

  const openItem = useCallback(
    (item) => {
      if (dragging.current) return;
      setOpen(list.findIndex((w) => w.id === item.id));
    },
    [list]
  );

  return (
    <section className="work section" id="work">
      <p className="work__ghost" aria-hidden="true">Showreel</p>
      <div className="wrap work__head">
        <SectionTitle eyebrow="Portfolio" title="Reels made for brands," em="loved by strangers." />
        <div className="filters" role="group" aria-label="Filter reels">
          {cats.map((c) => (
            <button key={c} type="button" className={`filter${c === cat ? ' is-on' : ''}`} onClick={() => pick(c)} aria-pressed={c === cat}>
              {c === cat && <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="filter__label">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`work__viewport${touch ? ' is-swipe' : ''}`} ref={viewport} onScroll={touch ? onSwipe : undefined}>
        <motion.div
          className="work__track"
          ref={track}
          style={{ x }}
          drag={touch ? false : 'x'}
          dragConstraints={{ left: limit, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={() => setTimeout(() => (dragging.current = false), 60)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                className="work__item"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              >
                <VideoCard item={item} index={i + 1} onOpen={openItem} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="wrap work__foot">
        <span className="work__hint">
          <span className="only-fine">Hover to play · drag to scroll · click to open</span>
          <span className="only-touch">Swipe to scroll · tap to open</span>
        </span>
        <span className="work__bar" aria-hidden="true">
          <motion.i style={{ scaleX: scrolled }} />
        </span>
        <span className="work__count tabular">{String(list.length).padStart(2, '0')} reels</span>
      </div>

      <Lightbox items={list} index={open} onClose={close} onIndex={setOpen} />
    </section>
  );
}

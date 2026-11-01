'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import HeartBubbles from './HeartBubbles';
import { Icon } from './ui/Vectors';

// A pile of reels that plays like Instagram Stories: progress bars on top, auto-advance,
// arrows below, and the top card can be dragged or tapped away. Hovering pauses it.
export default function ReelStack({ items }) {
  const [order, setOrder] = useState(items.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const box = useRef(null);
  const inView = useInView(box, { margin: '200px' });
  const cur = order[0];

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  return (
    <div className={`stack${paused ? ' is-paused' : ''}`} ref={box} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="stack__title">
        <Icon name="play" /> Latest reels
      </span>
      <div className="stack__cards">
        <div className="stack__segs" aria-hidden="true">
          {items.map((_, i) => (
            <span key={i} className={`stack__seg${i < cur ? ' is-done' : ''}${i === cur ? ' is-on' : ''}`}>
              <i key={i === cur ? `on-${cur}` : 'idle'} onAnimationEnd={i === cur ? next : undefined} />
            </span>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {order.slice(0, 3).map((idx, depth) => {
            const item = items[idx];
            const top = depth === 0;
            return (
              <motion.div
                key={item.id}
                className="stack__card"
                style={{ zIndex: 10 - depth }}
                initial={{ scale: 0.85, y: 40, opacity: 0 }}
                animate={{
                  scale: 1 - depth * 0.06,
                  y: depth * -22,
                  rotate: depth === 0 ? -2 : depth === 1 ? 5 : -7,
                  opacity: 1,
                }}
                exit={{ x: 260, rotate: 24, opacity: 0, transition: { duration: 0.35 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                drag={top ? 'x' : false}
                dragSnapToOrigin
                dragElastic={0.6}
                whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) next();
                }}
                onTap={top ? next : undefined}
              >
                {top && inView ? (
                  <video src={item.preview} poster={item.poster} muted loop playsInline autoPlay />
                ) : (
                  <img src={item.poster} alt="" draggable="false" />
                )}
                <span className="stack__label">
                  <b>{item.type}</b>
                  {item.brand ? ` · ${item.brand}` : ''}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <HeartBubbles />
      </div>
      <div className="stack__controls">
        <button type="button" onClick={prev} aria-label="Previous reel">
          ←
        </button>
        <span className="stack__count tabular">
          {cur + 1} / {items.length}
        </span>
        <button type="button" onClick={next} aria-label="Next reel">
          →
        </button>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Vertical reel card. Desktop: plays on hover. Touch screens: plays while it sits in view.
// Videos use preload="none", so nothing downloads until a card is actually played.
// The poster sits under a cobalt tint that clears once the reel plays.
export default function VideoCard({ item, index, onOpen, className = '' }) {
  const box = useRef(null);
  const vid = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const play = () => {
    vid.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    vid.current?.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()), { threshold: 0.6 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <motion.figure
      ref={box}
      className={`reel${playing ? ' is-playing' : ''} ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={() => (onOpen ? onOpen(item) : playing ? pause() : play())}
    >
      <div className="reel__frame">
        <video
          ref={vid}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="none"
          draggable="false"
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
          aria-label={item.title}
        />
        <span className="reel__tint" aria-hidden="true" />
        <span className="reel__corners" aria-hidden="true" />
        <span className="reel__top" aria-hidden="true">
          <span className="reel__brand">{item.brand || item.cat}</span>
          {index != null && <span className="reel__index tabular">{String(index).padStart(2, '0')}</span>}
        </span>
        <span className="reel__play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        <span className="reel__status" aria-hidden="true">
          <i />
          {playing ? 'Playing' : 'Preview'}
        </span>
        <span className="reel__progress" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <figcaption className="reel__meta">
        <span className="reel__type">
          {item.cat} · {item.type}
        </span>
        <span className="reel__title">{item.title}</span>
      </figcaption>
    </motion.figure>
  );
}

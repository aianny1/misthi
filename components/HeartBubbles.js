'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Icon } from './ui/Vectors';

const MAX_HEARTS = 40;
const COLORS = 3;
const rand = (min, max) => min + Math.random() * (max - min);

// Like button with hearts bubbling up from it, like an Instagram Live. Tapping sends a burst.
// A heart always finishes its flight: at the limit new hearts wait instead of replacing old ones.
export default function HeartBubbles() {
  const [hearts, setHearts] = useState([]);
  const [liked, setLiked] = useState(false);
  const nextId = useRef(0);
  const flying = useRef(0);
  const reduce = useReducedMotion();

  const spawn = useCallback((count) => {
    const room = Math.min(count, MAX_HEARTS - flying.current);
    if (room <= 0) return;
    flying.current += room;
    const fresh = Array.from({ length: room }, (_, i) => ({
      id: nextId.current++,
      color: nextId.current % COLORS,
      x: rand(-10, 10),
      drift: rand(-26, 26),
      size: rand(0.7, 1.3),
      time: rand(2.2, 3.4),
      delay: i * 0.09,
    }));
    setHearts((h) => [...h, ...fresh]);
  }, []);

  const land = (id) => {
    flying.current -= 1;
    setHearts((list) => list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!document.hidden) spawn(1);
    }, 650);
    return () => clearInterval(id);
  }, [reduce, spawn]);

  const like = () => {
    setLiked(true);
    if (!reduce) spawn(3);
  };

  return (
    <div className="hearts">
      <div className="hearts__stream" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className={`hearts__bubble hearts__bubble--${h.color}`}
            style={{ '--x': `${h.x}px`, '--drift': `${h.drift}px`, '--size': h.size, '--time': `${h.time}s`, '--delay': `${h.delay}s` }}
            onAnimationEnd={() => land(h.id)}
          >
            <Icon name="heart" />
          </span>
        ))}
      </div>
      <button type="button" className={`hearts__btn${liked ? ' is-liked' : ''}`} onClick={like} aria-pressed={liked} aria-label="Like this reel">
        <Icon name="heart" />
      </button>
    </div>
  );
}

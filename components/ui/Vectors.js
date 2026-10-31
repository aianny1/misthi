'use client';
import { useEffect, useState } from 'react';

// Creator-world line-art used around the page: a ring light, a play button, a rising analytics chart, a voice waveform, a DM paper plane, sparkles and a camera
// viewfinder. All decorative (hidden from screen readers); colours come from CSS.

const paths = {
  heart: 'M12 20.5s-7.4-4.5-9.3-9C1.3 8 3.4 4.5 6.9 4.5c2 0 3.5 1 5.1 2.9 1.6-1.9 3.1-2.9 5.1-2.9 3.5 0 5.6 3.5 4.2 7-1.9 4.5-9.3 9-9.3 9z',
  comment: 'M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.5a8.5 8.5 0 1 1 15.6-4.5z',
  send: 'M21.5 2.5 2.5 10l7.2 2.8L12.5 20l9-17.5zM9.7 12.8l11.8-10.3',
  play: 'M8 5.5v13l11-6.5z',
  mail: 'M3 5.5h18v13H3zM3 6l9 7 9-7',
  whatsapp:
    'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.59-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z',
};

export function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

const leds = Array.from({ length: 56 }, (_, i) => {
  const a = (i / 56) * Math.PI * 2;
  return { x: (300 + 262 * Math.cos(a)).toFixed(2), y: (300 + 262 * Math.sin(a)).toFixed(2), d: `${(-i * 0.06).toFixed(2)}s` };
});

// The creator's ring light, with LEDs that chase around the ring.
export function RingLight({ className = '' }) {
  return (
    <svg className={`vec ring-light ${className}`} viewBox="0 0 600 600" aria-hidden="true">
      <circle cx="300" cy="300" r="296" className="vec__dash vec__spin" />
      <circle cx="300" cy="300" r="262" className="ring-light__band" />
      <circle cx="300" cy="300" r="280" className="vec__faint" />
      <circle cx="300" cy="300" r="244" className="vec__faint" />
      <g className="ring-light__leds">
        {leds.map((l, i) => (
          <circle key={i} cx={l.x} cy={l.y} r="3.2" style={{ animationDelay: l.d }} />
        ))}
      </g>
    </svg>
  );
}

// A big play button with a dashed progress ring.
export function PlayRing({ className = '' }) {
  return (
    <svg className={`vec play-ring ${className}`} viewBox="0 0 600 600" aria-hidden="true">
      <circle cx="300" cy="300" r="290" className="vec__faint" />
      <circle cx="300" cy="300" r="250" />
      <circle cx="300" cy="300" r="270" pathLength="1" className="play-ring__progress" />
      <path d="M250 205v190l160-95z" className="play-ring__tri" />
    </svg>
  );
}

const trend = [
  [20, 250],
  [80, 222],
  [140, 232],
  [200, 182],
  [260, 194],
  [320, 132],
  [380, 146],
  [440, 74],
  [490, 40],
];

// An analytics card: grid, a growth line that draws itself, and a like popping off the peak.
export function TrendChart({ className = '' }) {
  return (
    <svg className={`vec chart ${className}`} viewBox="0 0 520 300" aria-hidden="true">
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="10" y1={y} x2="510" y2={y} className="vec__faint vec__dash" />
      ))}
      <line x1="10" y1="280" x2="510" y2="280" />
      <polyline points={trend.map((p) => p.join(',')).join(' ')} pathLength="1" className="chart__line" />
      {trend.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4" className="vec__node" />
      ))}
      <path d={paths.heart} transform="translate(462 -6) scale(1.6)" className="chart__heart" />
    </svg>
  );
}

const bars = Array.from({ length: 44 }, (_, i) => ({
  h: Math.round(14 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 92),
  d: `${(-(i % 11) * 0.13).toFixed(2)}s`,
}));

// Voiceover waveform with bars that breathe.
export function Waveform({ className = '' }) {
  return (
    <svg className={`vec waveform ${className}`} viewBox="0 0 440 120" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={i * 10 + 2} y={60 - b.h / 2} width="5" height={b.h} rx="2.5" style={{ animationDelay: b.d }} />
      ))}
    </svg>
  );
}

// A DM paper plane flying out of a dashed loop.
export function PaperPlane({ className = '' }) {
  return (
    <svg className={`vec plane ${className}`} viewBox="0 0 600 400" aria-hidden="true">
      <path d="M20 370C110 330 70 230 170 230S300 340 380 250" className="vec__dash" />
      <g className="plane__body">
        <path d="M372 236 572 60 506 300 452 220z" />
        <path d="M452 220 572 60M452 220l-6 62 30-36" />
      </g>
    </svg>
  );
}

export function Burst({ className = '' }) {
  return (
    <svg className={`vec burst ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 0C53 36 64 47 100 50C64 53 53 64 50 100C47 64 36 53 0 50C36 47 47 36 50 0Z" />
    </svg>
  );
}

// Camera viewfinder framing the hero: corner marks, REC light and a running timecode.
export function Viewfinder() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="viewfinder" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <span className="viewfinder__rec">
        <b /> REC
      </span>
      <span className="viewfinder__spec">4K · 60fps · 9:16</span>
      <span className="viewfinder__time tabular">
        00:{pad(Math.floor(t / 60) % 60)}:{pad(t % 60)}
      </span>
    </div>
  );
}

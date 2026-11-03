'use client';
import { useEffect, useState } from 'react';

// Plays a reel, with its voice only while `loud` is true (e.g. the cursor is on it and it is on screen).
// If the browser still blocks sound (no click yet), it falls back to playing muted.
export default function useSoundPlay(ref, src, loud = true) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = !loud;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, [ref, src, loud]);
}

// True once the visitor has clicked, tapped or pressed a key. Until then sound is blocked anyway,
// so players show the light silent preview and only load the full reel after the first tap.
export function useTapped() {
  const [tapped, setTapped] = useState(false);
  useEffect(() => {
    if (navigator.userActivation?.hasBeenActive) return setTapped(true);
    const on = () => setTapped(true);
    window.addEventListener('pointerdown', on, { once: true });
    window.addEventListener('keydown', on, { once: true });
    return () => {
      window.removeEventListener('pointerdown', on);
      window.removeEventListener('keydown', on);
    };
  }, []);
  return tapped;
}

'use client';
import { useEffect, useState } from 'react';

// Plays a reel with its voice. Browsers block sound until the visitor has clicked or tapped
// somewhere on the page, so until then it plays muted and turns the sound on at the first tap.
export default function useSoundPlay(ref, src) {
  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const unmute = () => {
      v.muted = false;
      v.play().catch(() => {});
    };
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
      window.addEventListener('pointerdown', unmute, { once: true });
      window.addEventListener('keydown', unmute, { once: true });
    });
    return () => {
      window.removeEventListener('pointerdown', unmute);
      window.removeEventListener('keydown', unmute);
    };
  }, [ref, src]);
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

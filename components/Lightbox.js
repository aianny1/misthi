'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Full-screen reel player with previous / next and keyboard controls.
export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index != null;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    window.lenis?.stop();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.lenis?.start();
    };
  }, [open, index, items.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="lightbox__body"
            initial={{ y: 60, scale: 0.94 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={item.id}
                className="lightbox__video"
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                autoPlay
                controls
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="lightbox__meta">
              <span className="reel__type">
                {item.cat} · {item.type}
                {item.brand ? ` · ${item.brand}` : ''}
              </span>
              <span className="lightbox__title">{item.title}</span>
              <span className="lightbox__count tabular">
                {index + 1} / {items.length}
              </span>
            </div>
            <div className="lightbox__nav">
              <button type="button" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous reel">
                ←
              </button>
              <button type="button" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next reel">
                →
              </button>
              <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

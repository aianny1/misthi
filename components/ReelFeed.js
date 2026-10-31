'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui/Vectors';
import { profile, work } from '@/data/content';

const instagram = `https://instagram.com/${profile.instagram}`;

// One full-height reel: plays while it fills the feed, double-tap likes it.
function FeedReel({ item, active, root }) {
  const box = useRef(null);
  const vid = useRef(null);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = item.url || instagram;

  useEffect(() => {
    const video = vid.current;
    if (!active) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), {
      root: root.current,
      threshold: 0.6,
    });
    io.observe(box.current);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [active, root]);

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${item.title} · ${profile.name}`, url: link });
      } else {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {}
  };

  const tabIndex = active ? 0 : -1;

  return (
    <article className="feed__reel" ref={box} onDoubleClick={() => setLiked(true)}>
      <video ref={vid} src={item.src} poster={item.poster} muted loop playsInline preload="none" aria-label={item.title} />
      <div className="feed__actions">
        <button type="button" className={`feed__act${liked ? ' is-liked' : ''}`} onClick={() => setLiked((l) => !l)} aria-pressed={liked} aria-label="Like" tabIndex={tabIndex}>
          <Icon name="heart" />
        </button>
        <a className="feed__act" href={link} target="_blank" rel="noreferrer" aria-label="Comment on Instagram" tabIndex={tabIndex}>
          <Icon name="comment" />
        </a>
        <button type="button" className="feed__act" onClick={share} aria-label="Share" tabIndex={tabIndex}>
          <Icon name="send" />
        </button>
      </div>
      <div className="feed__caption">
        <b>@{profile.instagram}</b>
        <span>{item.title}</span>
        <small>{item.brand ? `${item.type} · ${item.brand}` : item.type}</small>
      </div>
      {copied && <span className="feed__toast">Link copied</span>}
    </article>
  );
}

// Instagram-style vertical feed of every reel, snapping one reel at a time.
export default function ReelFeed({ active }) {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // A mouse wheel moves exactly one reel; snapping alone would pull small scrolls back.
  // At the first and last reel the wheel is left alone so the page keeps scrolling.
  useEffect(() => {
    const el = root.current;
    let locked = false;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 4) return;
      const down = e.deltaY > 0;
      const atEdge = down ? el.scrollTop + el.clientHeight >= el.scrollHeight - 2 : el.scrollTop <= 2;
      if (atEdge) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      el.scrollBy({ top: down ? el.clientHeight : -el.clientHeight, behavior: 'smooth' });
      setTimeout(() => (locked = false), 550);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="feed" aria-hidden={!active}>
      <div className="feed__bar">
        <b>Reels</b>
        <Icon name="play" />
      </div>
      <div className="feed__scroll" ref={root} data-lenis-prevent onScroll={() => setScrolled(true)}>
        {work.map((item) => (
          <FeedReel key={item.id} item={item} active={active} root={root} />
        ))}
      </div>
      {!scrolled && <span className="feed__hint">Scroll for more ↓</span>}
    </div>
  );
}

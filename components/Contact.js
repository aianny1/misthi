'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealText, Rise } from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import { PaperPlane, Burst } from './ui/Vectors';
import { profile } from '@/data/content';

// Letters that lift and turn lime as the cursor passes over them.
function HoverWord({ text }) {
  return (
    <span className="hoverword" aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          whileHover={{ y: -18, color: 'var(--lime)' }}
          transition={{ type: 'spring', stiffness: 500, damping: 14 }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 0]);

  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Hi Mishthi, I would like to discuss a UGC collaboration.')}`;
  const ig = `https://instagram.com/${profile.instagram}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <motion.div className="contact__card" style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}>
        <PaperPlane className="contact__plane" />
        <Burst className="contact__spark" />
        <div className="wrap contact__inner">
          <p className="eyebrow">
            <span className="eyebrow__dot is-live" />
            Open for brand collaborations
          </p>
          <h2 className="contact__title">
            <RevealText text="Got a product?" />
            <br />
            <em>
              <HoverWord text="Let’s create." />
            </em>
          </h2>

          <div className="contact__rows">
            <Rise className="crow">
              <span className="crow__k">Email</span>
              <a className="crow__v" href={`mailto:${profile.email}?subject=UGC%20collaboration`}>
                {profile.email}
              </a>
              <button type="button" className="chip" onClick={copy}>
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </Rise>
            <Rise className="crow" delay={0.05}>
              <span className="crow__k">Phone / WhatsApp</span>
              <a className="crow__v" href={`tel:+91${profile.phone}`}>
                +91 {profile.phone.slice(0, 5)} {profile.phone.slice(5)}
              </a>
            </Rise>
            <Rise className="crow" delay={0.1}>
              <span className="crow__k">Instagram</span>
              <a className="crow__v" href={ig} target="_blank" rel="noreferrer">
                @{profile.instagram}
              </a>
            </Rise>
          </div>

          <Rise className="contact__cta" delay={0.15}>
            <Magnetic>
              <a className="btn btn--primary btn--lg" href={wa} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost btn--lg" href={ig} target="_blank" rel="noreferrer">
                See Instagram
              </a>
            </Magnetic>
          </Rise>
        </div>

        <footer className="footer">
          <div className="wrap footer__inner">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>
              {profile.role} · {profile.city}, India
            </span>
            <button type="button" className="footer__top" onClick={() => (window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))}>
              Back to top ↑
            </button>
          </div>
          <motion.p
            className="footer__giant"
            aria-hidden="true"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5% 0px' }}
          >
            {profile.name.split('').map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: '40%', opacity: 0 },
                  show: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 } },
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.p>
        </footer>
      </motion.div>
    </section>
  );
}

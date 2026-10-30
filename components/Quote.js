'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { SectionTitle } from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import { rates, profile } from '@/data/content';

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const all = rates.groups.flatMap((g) => g.items);

function AnimatedTotal({ value }) {
  const ref = useRef(null);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = inr(v)),
    });
    prev.current = value;
    return () => c.stop();
  }, [value]);
  return (
    <span ref={ref} className="tabular">
      {inr(value)}
    </span>
  );
}

function Stepper({ count, onChange, label }) {
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(Math.max(0, count - 1))} disabled={!count} aria-label={`Remove one ${label}`}>
        −
      </button>
      <span className="stepper__n tabular" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={count} initial={{ y: -14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 14, opacity: 0 }} transition={{ duration: 0.2 }}>
            {count}
          </motion.span>
        </AnimatePresence>
      </span>
      <button type="button" onClick={() => onChange(Math.min(20, count + 1))} aria-label={`Add one ${label}`}>
        +
      </button>
    </div>
  );
}

// Interactive rate card: pick deliverables, see the total, send it on WhatsApp.
export default function Quote() {
  const [qty, setQty] = useState({ ugc: 1 });
  const set = (id) => (n) => setQty((q) => ({ ...q, [id]: n }));

  const lines = useMemo(() => all.filter((i) => qty[i.id] > 0).map((i) => ({ ...i, n: qty[i.id] })), [qty]);
  const total = lines.reduce((s, l) => s + l.price * l.n, 0);

  const message = [
    'Hi Mishthi! I would like a quote for:',
    ...lines.map((l) => `• ${l.n} × ${l.label} (${l.detail}) — ${inr(l.price * l.n)}`),
    `Estimated total: ${inr(total)}`,
  ].join('\n');
  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section className="quote section" id="quote">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap">
        <SectionTitle eyebrow="Rates & packages" title="Build your" em="own package." />

        <div className="quote__grid">
          <div className="quote__menu">
            {rates.groups.map((g) => (
              <div key={g.name} className="qgroup">
                <h3 className="qgroup__title">{g.name}</h3>
                <ul>
                  {g.items.map((it) => {
                    const n = qty[it.id] || 0;
                    return (
                      <li key={it.id} className={`qitem${n ? ' is-on' : ''}`}>
                        <div className="qitem__text">
                          <span className="qitem__label">{it.label}</span>
                          <span className="qitem__detail">{it.detail}</span>
                        </div>
                        <span className="qitem__price tabular">{inr(it.price)}</span>
                        <Stepper count={n} onChange={set(it.id)} label={it.label} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <p className="quote__note">{rates.note}</p>
          </div>

          <aside className="summary" aria-label="Your package">
            <p className="panel__title">Your package</p>
            <ul className="summary__lines">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li
                    key={l.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>
                      {l.n} × {l.label}
                      <small>{l.detail}</small>
                    </span>
                    <span className="tabular">{inr(l.price * l.n)}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
              {!lines.length && <li className="summary__empty">Add a deliverable to see your estimate.</li>}
            </ul>
            <div className="summary__total">
              <span>Estimated total</span>
              <b>
                <AnimatedTotal value={total} />
              </b>
            </div>
            <Magnetic strength={0.2}>
              <a
                className={`btn btn--primary btn--block${lines.length ? '' : ' is-disabled'}`}
                href={lines.length ? wa : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!lines.length}
              >
                Send on WhatsApp
              </a>
            </Magnetic>
            <button type="button" className="summary__reset" onClick={() => setQty({})} disabled={!lines.length}>
              Clear all
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

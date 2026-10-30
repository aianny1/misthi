'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Counter from './ui/Counter';
import { SectionTitle } from './ui/Reveal';
import { TrendChart } from './ui/Vectors';
import { insights } from '@/data/content';

const ease = [0.16, 1, 0.3, 1];

function Ring({ value, label, center, note }) {
  const r = 120;
  const c = 2 * Math.PI * r;
  return (
    <div className="ring">
      <svg viewBox="0 0 280 280" role="img" aria-label={label}>
        <circle cx="140" cy="140" r={r} className="ring__track" />
        <motion.circle
          cx="140"
          cy="140"
          r={r}
          className="ring__fill"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.8, ease }}
        />
      </svg>
      <div className="ring__center">
        {center}
        {note && <span className="ring__note">{note}</span>}
      </div>
    </div>
  );
}

function Stat({ value, label, extra, big }) {
  return (
    <div className={`stat${big ? ' stat--big' : ''}`}>
      <span className="stat__value">
        <Counter value={value} duration={1.6} />
      </span>
      <span className="stat__label">
        {label} {extra}
      </span>
    </div>
  );
}

const tabs = {
  Reach: () => (
    <div className="itab">
      <Ring
        value={insights.nonFollowers}
        label={`${insights.nonFollowers}% of views from non-followers`}
        center={
          <>
            <span className="ring__label">Views</span>
            <span className="ring__value">
              <Counter value={insights.views} duration={1.6} />
            </span>
          </>
        }
        note={`${insights.fromAds}% from ads`}
      />
      <div className="itab__stats">
        <Stat big value={insights.reached} label="Accounts reached" />
        <Stat value={insights.monthViews} label="Views in 28 days" extra={<em className="up">+{insights.monthGrowth}%</em>} />
        <div className="stat">
          <span className="stat__value">{insights.fromAds}%</span>
          <span className="stat__label">of views from ads</span>
        </div>
      </div>
    </div>
  ),
  Engagement: () => {
    const max = Math.max(...insights.topReel.map((s) => s.value));
    return (
      <div className="itab">
        <div className="hbars">
          <p className="panel__title">Best-performing reel</p>
          {insights.topReel.map((s, i) => (
            <div className="hbars__row" key={s.label}>
              <span className="hbars__label">{s.label}</span>
              <div className="hbars__track">
                <motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: s.value / max }}
                  transition={{ duration: 1.2, ease, delay: 0.1 + i * 0.08 }}
                />
              </div>
              <b className="tabular">{s.display}</b>
            </div>
          ))}
        </div>
        <div className="itab__stats">
          <Stat big value={insights.profileVisits} label="Profile visits" />
          <Stat value={insights.linkTaps} label="External link taps" />
          <Stat value={31800} label="Shares on one reel" />
        </div>
      </div>
    );
  },
  Audience: () => (
    <div className="itab">
      <Ring
        value={insights.gender[0].value}
        label={`${insights.gender[0].value}% women, ${insights.gender[1].value}% men`}
        center={
          <>
            <span className="ring__label">Women</span>
            <span className="ring__value">{insights.gender[0].value}%</span>
          </>
        }
        note={`Men ${insights.gender[1].value}%`}
      />
      <div className="itab__stats">
        <div className="stat stat--big">
          <span className="stat__value">{insights.nonFollowers}%</span>
          <span className="stat__label">of viewers don’t follow me yet</span>
        </div>
        <p className="itab__note">
          Most views come from people discovering my reels through Explore, the Reels feed and ads. For your brand,
          that means your product reaches fresh audiences, not the same followers every time.
        </p>
      </div>
    </div>
  ),
};

export default function Insights() {
  const names = Object.keys(tabs);
  const [tab, setTab] = useState(names[0]);
  const Body = tabs[tab];

  return (
    <section className="insights section" id="insights">
      <TrendChart className="insights__chart" />
      <div className="wrap">
        <div className="insights__head">
          <SectionTitle eyebrow="Instagram insights" title="Real numbers," em="real reach." />
          <div className="tabs" role="tablist" aria-label="Insights">
            {names.map((n) => (
              <button
                key={n}
                role="tab"
                type="button"
                aria-selected={n === tab}
                className={`tab${n === tab ? ' is-on' : ''}`}
                onClick={() => setTab(n)}
              >
                {n === tab && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="tab__label">{n}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="insights__panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <Body />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <p className="insights__source">Figures taken directly from Mishthi’s Instagram Insights.</p>
      </div>
    </section>
  );
}

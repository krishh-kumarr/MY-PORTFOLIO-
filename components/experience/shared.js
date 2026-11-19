'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export const ACCENT = { Infosys: '#5FD0C6', 'Samsung PRISM': '#A86BFF', 'Unicum Finance Consultant': '#F0B544' };
export const MONTHS = { Infosys: 2, 'Samsung PRISM': 5, 'Unicum Finance Consultant': 2 };
export const accentOf = (job) => ACCENT[job.company] ?? '#F0B544';

function Stop({ job, index, tag, onEnter, isActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const reduce = useReducedMotion();
  const accent = accentOf(job);
  useEffect(() => { if (inView) onEnter(index); }, [inView, index, onEnter]);

  return (
    <article ref={ref} className="min-h-[70vh] flex flex-col justify-center py-10" style={{ opacity: isActive ? 1 : 0.35, transition: 'opacity .5s' }}>
      <motion.div initial={reduce ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20% 0px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span style={{ color: accent }}>{tag(index)}</span>
          <span className="h-px w-10" style={{ background: accent }} />
          <span>{job.place} · {job.when}</span>
        </div>
        <h3 className="mt-5 font-display font-bold text-4xl sm:text-5xl leading-[0.95] tracking-tight">{job.company}</h3>
        <p className="mt-3 text-lg font-medium" style={{ color: accent }}>{job.role}</p>
        <p className="mt-5 text-xl text-muted max-w-prose">{job.summary}</p>
        <ul className="mt-6 space-y-3 max-w-prose">
          {job.points.map((p, i) => (
            <motion.li key={p} className="flex gap-3" initial={reduce ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}>
              <span className="mt-2.5 h-px w-4 shrink-0" style={{ background: accent }} />
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </article>
  );
}

// Sticky visual on the left, scrolling stops on the right.
export function StickyStory({ stops, active, setActive, tag, visual }) {
  const wrap = useRef(null);
  const wrapIn = useInView(wrap, { margin: '0px 0px -50% 0px' });
  useEffect(() => { if (!wrapIn) setActive(-1); }, [wrapIn, setActive]);
  return (
    <div ref={wrap} className="relative grid md:grid-cols-[1fr_1.1fr] gap-x-14">
      <div className="sticky top-16 md:top-24 z-10 h-[38vh] md:h-[72vh] bg-night/85 md:bg-transparent backdrop-blur md:backdrop-blur-none py-2">{visual}</div>
      <div>
        {stops.map((job, i) => (
          <Stop key={job.company} job={job} index={i} tag={tag} isActive={active === i || active < 0} onEnter={setActive} />
        ))}
      </div>
    </div>
  );
}

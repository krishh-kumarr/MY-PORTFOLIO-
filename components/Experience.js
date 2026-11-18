'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import { experience } from '@/lib/data';

const ACCENT = { Infosys: '#5FD0C6', 'Samsung PRISM': '#A86BFF', 'Unicum Finance Consultant': '#F0B544' };

function Role({ job, open, onToggle }) {
  const accent = ACCENT[job.company] ?? '#F0B544';
  const reduce = useReducedMotion();
  const id = `role-${job.company.replace(/\W+/g, '-')}`;
  return (
    <li className="relative pl-10">
      <span aria-hidden="true" className="absolute left-0 top-7 size-5 rounded-full border-4 border-night" style={{ background: accent, boxShadow: `0 0 0 6px color-mix(in srgb, ${accent} 22%, transparent), 0 0 24px ${accent}` }} />
      <div className="spot bg-surface sticker rounded-2xl" style={{ '--spot': accent }}>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="w-full text-left p-5 sm:p-6 flex flex-wrap items-start gap-x-6 gap-y-1 cursor-pointer rounded-2xl">
          <div className="mr-auto">
            <h3 className="font-display font-bold text-2xl">{job.company}</h3>
            <p className="font-medium" style={{ color: accent }}>{job.role} <span className="text-muted">· {job.place}</span></p>
          </div>
          <span className="text-muted font-medium tabular-nums pt-1">{job.when}</span>
          <p className="basis-full text-muted mt-2">{job.summary}</p>
          <span className="basis-full mt-3 inline-flex items-center gap-1 font-semibold">
            {open ? 'Show less' : 'What I did'}
            <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id={id} initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
              <ul className="px-6 pb-6 space-y-2 list-disc pl-11" style={{ color: "inherit" }}>
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Experience() {
  const [open, setOpen] = useState(0);
  const list = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <Section id="work" title="Where I’ve worked" intro="Three internships across iOS, data and app development." mood="confident" say="Three internships so far: Infosys, Samsung PRISM and Unicum.">
      <ol ref={list} className="relative space-y-6">
        <span aria-hidden="true" className="absolute left-[9px] top-8 bottom-8 w-0.5 bg-line" />
        <motion.span aria-hidden="true" style={reduce ? undefined : { scaleY: draw }} className="absolute left-[9px] top-8 bottom-8 w-0.5 origin-top bg-gradient-to-b from-[#5FD0C6] via-[#A86BFF] to-[#F0B544]" />
        {experience.map((job, i) => (
          <Role key={job.company} job={job} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </ol>
    </Section>
  );
}

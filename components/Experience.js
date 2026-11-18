'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import { experience } from '@/lib/data';

function Role({ job, open, onToggle }) {
  const reduce = useReducedMotion();
  const id = `role-${job.company.replace(/\W+/g, '-')}`;
  return (
    <li className="relative pl-10">
      <span aria-hidden="true" className="absolute left-0 top-6 size-5 rounded-full bg-mustard border-2 border-line" />
      <div className="bg-surface sticker rounded-2xl">
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="w-full text-left p-5 sm:p-6 flex flex-wrap items-start gap-x-6 gap-y-1 cursor-pointer rounded-2xl">
          <div className="mr-auto">
            <h3 className="font-display font-bold text-2xl">{job.company}</h3>
            <p className="font-medium">{job.role}, {job.place}</p>
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
              <ul className="px-6 pb-6 space-y-2 list-disc pl-11 marker:text-mustard">
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
  return (
    <Section id="work" title="Where I’ve worked" intro="Three internships across iOS, data and app development." mood="confident" say="Three internships so far: Infosys, Samsung PRISM and Unicum.">
      <ol className="relative space-y-6 before:absolute before:left-[9px] before:top-8 before:bottom-8 before:w-0.5 before:bg-ink">
        {experience.map((job, i) => (
          <Role key={job.company} job={job} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </ol>
    </Section>
  );
}

'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Section from './Section';
import SkillSandbox from './skills/SkillSandbox';
import { ELEMENTS, ElementArt } from './skills/elements';
import { skills } from '@/lib/data';

function ElementCard({ g, i, active, onFocus }) {
  const el = ELEMENTS[i % ELEMENTS.length];
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => onFocus(active ? null : i)}
      aria-pressed={active}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group brut grain-local h-full flex flex-col text-left rounded-3xl bg-surface overflow-hidden cursor-pointer ${active ? 'translate-x-[-3px] translate-y-[-3px]' : ''}`}
      style={{ '--c1': el.c1, '--c2': el.c2 }}
    >
      <div className="relative h-32 overflow-hidden" style={{ background: `radial-gradient(120% 100% at 50% 100%, color-mix(in srgb, ${el.c1} 22%, transparent), transparent 70%)` }}>
        <ElementArt kind={el.kind} c1={el.c1} c2={el.c2} />
        <span className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: el.c1 }}>
          {el.glyph} {el.name}
        </span>
        <span className="absolute right-5 top-3 font-display font-extrabold text-3xl outline-num" style={{ '--c': el.c1 }}>0{i + 1}</span>
      </div>
      <div className="p-5 pt-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl">{g.group}</h3>
        <p className="mt-1 text-sm text-muted">{el.line}</p>
        <ul className="mt-4 mb-1 flex flex-wrap gap-1.5">
          {g.items.map((s, k) => (
            <li key={s} className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5"
              style={{ borderColor: `color-mix(in srgb, ${el.c1} 35%, var(--color-line))`, background: `color-mix(in srgb, ${el.c1} 8%, transparent)`, transitionDelay: `${k * 30}ms` }}>
              <span className="size-1.5 rounded-full" style={{ background: el.c1, boxShadow: `0 0 8px ${el.c1}` }} />
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-muted group-hover:text-fg transition-colors">
          {active ? 'Release in sandbox ↓' : 'Summon in sandbox ↓'}
        </span>
      </div>
    </motion.button>
  );
}

export default function Skills() {
  const [focus, setFocus] = useState(null);
  return (
    <Section id="skills" title="What I work with" intro="Four elements of my toolkit. Tap one to summon it, then play with every skill in the sandbox below." mood="thoughtful" say="My toolkit, from Swift to TensorFlow. Go on, throw them around.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skills.map((g, i) => <ElementCard key={g.group} g={g} i={i} active={focus === i} onFocus={setFocus} />)}
      </div>
      <SkillSandbox groups={skills} focus={focus} onFocus={setFocus} />
    </Section>
  );
}

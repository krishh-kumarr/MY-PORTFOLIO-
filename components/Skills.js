import { Code2, Smartphone, BrainCircuit, Database } from 'lucide-react';
import Section from './Section';
import { skills } from '@/lib/data';

const LOOK = [
  { Icon: Code2, spot: '#F0B544' },
  { Icon: Smartphone, spot: '#5FD0C6' },
  { Icon: BrainCircuit, spot: '#A86BFF' },
  { Icon: Database, spot: '#7FB8FF' },
];

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee overflow-hidden py-1" aria-hidden="true">
      <div className={`marquee-track ${reverse ? 'rev' : ''}`}>
        {doubled.map((s, i) => <span key={i} className="whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 font-display font-semibold text-lg">{s}</span>)}
      </div>
    </div>
  );
}

export default function Skills() {
  const all = skills.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <Section id="skills" title="What I work with" intro="From Swift on the phone to pipelines and models behind it." mood="confident" say="My toolkit, from Swift to TensorFlow.">
      <div className="space-y-3 -mx-5 sm:mx-0">
        <Row items={all.slice(0, half)} />
        <Row items={all.slice(half)} reverse />
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skills.map((g, i) => {
          const { Icon, spot } = LOOK[i % LOOK.length];
          return (
            <div key={g.group} className="spot bg-surface sticker rounded-2xl p-6" style={{ '--spot': spot }}>
              <div>
                <span className="grid place-items-center size-11 rounded-xl" style={{ background: `color-mix(in srgb, ${spot} 18%, transparent)`, color: spot }}><Icon size={22} aria-hidden="true" /></span>
                <h3 className="mt-4 font-display font-bold text-xl">{g.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((s) => <li key={s} className="rounded-full bg-raised border border-line px-3 py-1 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5">{s}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

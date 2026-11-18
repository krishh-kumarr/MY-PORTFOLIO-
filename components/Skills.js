import Section from './Section';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <Section id="skills" title="What I work with" mood="confident" say="My toolkit, from Swift to TensorFlow.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="font-display font-bold text-xl">{g.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => <li key={s} className="bg-white border-2 border-ink rounded-full px-3 py-1 font-medium">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

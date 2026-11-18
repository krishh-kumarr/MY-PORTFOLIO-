import { Award, BadgeCheck } from 'lucide-react';
import Section from './Section';
import { awards, certifications } from '@/lib/data';

export default function Recognition() {
  return (
    <Section id="recognition" title="Recognition" mood="excited" say="I won the Samsung PRISM Excellence Award this year!">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div className="bg-mustard-soft sticker rounded-3xl p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-display font-bold text-2xl"><Award aria-hidden="true" /> Awards</h3>
          <ul className="mt-5 divide-y-2 divide-line">
            {awards.map((a) => (
              <li key={a.title} className="flex items-baseline gap-4 py-3">
                <span className="font-semibold mr-auto">{a.title}</span>
                <span className="text-muted tabular-nums shrink-0">{a.when}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-teal-soft sticker rounded-3xl p-6 sm:p-8">
          <h3 className="flex items-center gap-2 font-display font-bold text-2xl"><BadgeCheck aria-hidden="true" /> Certifications</h3>
          <ul className="mt-5 space-y-3 font-medium">
            {certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <p className="mt-6 text-muted">Member of the iOS Student Developer Program at SRM IST and the IEEE Computer Society.</p>
        </div>
      </div>
    </Section>
  );
}

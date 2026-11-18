import { Award, BadgeCheck, GraduationCap, Trophy, Medal, Star } from 'lucide-react';
import Image from 'next/image';
import Section from './Section';
import { awards, certifications, awardImages, badges } from '@/lib/data';

const LOOK = [
  { Icon: Trophy, spot: '#F0B544' },
  { Icon: GraduationCap, spot: '#5FD0C6' },
  { Icon: Medal, spot: '#FF6A3D' },
  { Icon: Star, spot: '#A86BFF' },
  { Icon: Award, spot: '#7FB8FF' },
];

export default function Recognition() {
  return (
    <Section id="recognition" title="Recognition" intro="Awards I’m proud of, and the certifications behind the skills." mood="excited" say="I won the Samsung PRISM Excellence Award this year!">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {awards.map((a, i) => {
          const { Icon, spot } = LOOK[i % LOOK.length];
          return (
            <li key={a.title} className={`spot shine relative bg-surface sticker rounded-2xl p-6 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`} style={{ '--spot': spot }}>
              <span className="shine-bar" aria-hidden="true" />
              {awardImages[a.title] && (
                <div className="mb-5 -mx-2 -mt-2 h-40 overflow-hidden rounded-xl border border-line">
                  <Image src={awardImages[a.title].src} alt={`${a.title}: certificate or photo`} width={awardImages[a.title].w} height={awardImages[a.title].h} sizes="(min-width: 1024px) 560px, 90vw" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <span className="grid place-items-center size-12 shrink-0 rounded-2xl" style={{ background: `color-mix(in srgb, ${spot} 20%, transparent)`, color: spot }}><Icon size={24} aria-hidden="true" /></span>
                <div>
                  <p className={`font-display font-bold leading-snug ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{a.title}</p>
                  {a.when && <p className="mt-1 text-muted font-medium tabular-nums">{a.when}</p>}
                  {i === 0 && <p className="mt-3 text-muted max-w-[46ch]">Six months on LLM-powered SQL optimization with my team, plus ₹80,000 in prize money.</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 spot bg-surface sticker rounded-2xl p-6 sm:p-8" style={{ '--spot': '#5FD0C6' }}>
        <div>
          <h3 className="flex items-center gap-2 font-display font-bold text-xl"><BadgeCheck aria-hidden="true" className="text-teal" /> Certifications</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border border-line bg-raised pl-2 pr-4 py-2 font-medium transition-transform hover:-translate-y-0.5">
                {badges[c] ? <Image src={badges[c]} alt="" width={480} height={480} className="size-10 rounded-lg" /> : <span className="size-10" />}
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted">Member of the iOS Student Developer Program at SRM IST and the IEEE Computer Society.</p>
        </div>
      </div>
    </Section>
  );
}

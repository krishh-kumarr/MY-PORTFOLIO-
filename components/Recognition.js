import { Award, BadgeCheck, GraduationCap, Trophy, Medal, Star } from 'lucide-react';
import Image from 'next/image';
import Section from './Section';
import { awards, certifications, awardImages, badges, certImages } from '@/lib/data';

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
                <div className="group/img mb-5 -mx-2 -mt-2 h-40 overflow-hidden rounded-xl border border-line bg-raised transition-[height] duration-500 hover:h-72">
                  <Image src={awardImages[a.title].src} alt={`${a.title}: certificate or photo`} width={awardImages[a.title].w} height={awardImages[a.title].h} sizes="(min-width: 1024px) 560px, 90vw" className="h-full w-full object-cover transition-all duration-500 group-hover/img:object-contain" />
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
              <li key={c} tabIndex={certImages[c] ? 0 : undefined} className="group/cert relative flex items-center gap-3 rounded-2xl border border-line bg-raised pl-2 pr-4 py-2 font-medium transition-transform hover:-translate-y-0.5">
                {badges[c] ? <Image src={badges[c]} alt="" width={480} height={480} className="size-10 rounded-lg" /> : <span className="size-10" />}
                {c}
                {certImages[c] && (
                  <span className="pointer-events-none absolute bottom-full left-0 z-30 mb-3 w-[min(80vw,420px)] origin-bottom-left scale-90 opacity-0 transition-all duration-300 group-hover/cert:scale-100 group-hover/cert:opacity-100 group-focus/cert:scale-100 group-focus/cert:opacity-100">
                    <Image src={certImages[c].src} alt={`${c} certificate`} width={certImages[c].w} height={certImages[c].h} sizes="420px" className="w-full h-auto rounded-xl border border-line bg-white shadow-2xl" />
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted">Member of the iOS Student Developer Program at SRM IST and the IEEE Computer Society.</p>
        </div>
      </div>
    </Section>
  );
}

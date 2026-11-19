'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import ProjectVisual from './ProjectVisual';
import { useAvatar } from './AvatarProvider';
import { projects, moreProjects, galleries } from '@/lib/data';

const tones = { sky: 'bg-sky-soft mesh mesh-sky', teal: 'bg-teal-soft mesh mesh-teal', mustard: 'bg-mustard-soft mesh mesh-mustard' };
const spots = { sky: '#7FD6CF', teal: '#5FD0C6', mustard: '#F0B544' };
const pair = { sky: ['#7FD6CF', '#7FB8FF'], teal: ['#5FD0C6', '#F0B544'], mustard: ['#F0B544', '#FF6A3D'] };

/** A project as a folder: hover slides its photos up like papers, click opens the gallery. */
function Card({ p, i }) {
  const { react, settle } = useAvatar();
  const think = () => react('thoughtful', p.pitch, 0);
  const papers = (galleries[p.slug] ?? []).slice(0, 3);
  const [c1, c2] = pair[p.tone] ?? pair.mustard;
  const num = String(i + 1).padStart(2, '0');
  return (
    <article onPointerEnter={think} onPointerLeave={settle} onFocus={think} onBlur={settle} style={{ '--spot': spots[p.tone], '--c1': c1, '--c2': c2 }} className="group spot brut bg-surface rounded-3xl flex flex-col mt-10">
      <span className="grain-layer" aria-hidden="true" />
      <div className="relative h-60 rounded-t-3xl folder-clip" aria-hidden="true">
        {/* back of the folder */}
        <div className={`absolute inset-x-4 top-6 bottom-0 rounded-t-2xl overflow-hidden ${tones[p.tone]}`}><div className="absolute -top-0 left-0 h-6 w-28 rounded-t-xl bg-inherit" /></div>
        {/* papers peeking out */}
        {papers.map((im, k) => (
          <div key={im.src} className="folder-paper absolute bottom-12 left-1/2 w-[42%] aspect-[4/3] rounded-lg overflow-hidden border border-line bg-surface shadow-lg"
            style={{ '--k': k, '--r': `${(k - 1) * 9}deg`, '--x': `${(k - 1) * 58}%` }}>
            <Image src={im.src} alt="" width={im.w} height={im.h} sizes="240px" className="h-full w-full object-cover" />
          </div>
        ))}
        {/* front flap */}
        <div className="folder-flap absolute inset-x-0 bottom-0 h-[58%] rounded-t-2xl border-t border-line bg-surface/85 backdrop-blur-md overflow-hidden">
          <div className="absolute inset-0 opacity-90"><ProjectVisual project={p} /></div>
        </div>
      </div>
      <div className="relative overflow-hidden p-6 flex flex-col gap-3 flex-1 border-t border-line/60 rounded-b-3xl">
        <span aria-hidden="true" className="pointer-events-none absolute -right-3 -bottom-8 font-display font-extrabold text-[9rem] leading-none outline-num opacity-60" style={{ '--c': c1 }}>{num}</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: c1 }}>File {num}</span>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-bold text-2xl mr-auto">
            <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{p.name}</Link>
          </h3>
          <span className="text-muted font-medium tabular-nums shrink-0">{p.year}</span>
        </div>
        <p>{p.summary}</p>
        <p className="font-semibold pl-3 border-l-2" style={{ borderColor: c1 }}>{p.result}</p>
        <ul className="mt-auto pt-2 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s, k) => (
            <li key={s} className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg border px-2.5 py-0.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{ borderColor: `color-mix(in srgb, ${c1} 35%, var(--color-line))`, background: `color-mix(in srgb, ${c1} 7%, transparent)`, transitionDelay: `${k * 35}ms` }}>
              <span className="size-1.5 rounded-full" style={{ background: k % 2 ? c2 : c1 }} />{s}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-2 font-semibold">Open the project
          <span className="grid place-items-center size-8 rounded-full border transition-all duration-500 group-hover:rotate-45 group-hover:scale-110" style={{ borderColor: c1, background: `color-mix(in srgb, ${c1} 15%, transparent)` }}>
            <ArrowUpRight size={16} />
          </span>
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Things I’ve built" intro="Each project is a folder. Hover to peek inside, open it for the full story." mood="thoughtful" say="Hover a project and I’ll explain it.">
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
      </div>
      <h3 className="mt-16 font-display font-bold text-2xl">Smaller builds</h3>
      <ul className="mt-4 grid sm:grid-cols-2 gap-x-8">
        {moreProjects.map((m) => (
          <li key={m.name} className="border-b border-line">
            <a href={m.href} target="_blank" rel="noopener" className="group flex items-baseline gap-3 py-4 px-2 -mx-2 rounded-lg transition-colors hover:bg-raised">
              <span className="font-semibold group-hover:underline decoration-2 underline-offset-4">{m.name}</span>
              <span className="text-muted mr-auto">{m.what}</span>
              <span className="text-muted tabular-nums">{m.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

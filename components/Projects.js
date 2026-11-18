'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import ProjectVisual from './ProjectVisual';
import { useAvatar } from './AvatarProvider';
import { projects, moreProjects } from '@/lib/data';

const tones = { sky: 'bg-sky-soft', teal: 'bg-teal-soft', mustard: 'bg-mustard-soft' };

function Card({ p }) {
  const { react, settle } = useAvatar();
  const think = () => react('thoughtful', p.pitch, 0);
  return (
    <article onPointerEnter={think} onPointerLeave={settle} onFocus={think} onBlur={settle} className="group relative bg-white sticker sticker-hover rounded-3xl overflow-hidden flex flex-col">
      <div className={`h-52 border-b-2 border-ink overflow-hidden ${tones[p.tone]}`} aria-hidden="true">
        <ProjectVisual project={p} />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-bold text-2xl mr-auto">
            <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{p.name}</Link>
          </h3>
          <span className="text-muted font-medium tabular-nums shrink-0">{p.year}</span>
        </div>
        <p>{p.summary}</p>
        <p className="font-semibold">{p.result}</p>
        <ul className="mt-auto pt-2 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => <li key={s} className="text-sm font-medium border-2 border-ink rounded-full px-2.5 py-0.5">{s}</li>)}
        </ul>
        <span className="inline-flex items-center gap-1 font-semibold group-hover:underline decoration-2 underline-offset-4">Read the story <ArrowUpRight size={18} /></span>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Things I’ve built" intro="Hover a project and I’ll tell you about it. Open one for screenshots and details." mood="thoughtful" say="Hover a project and I’ll explain it.">
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => <Card key={p.slug} p={p} />)}
      </div>
      <h3 className="mt-16 font-display font-bold text-2xl">Smaller builds</h3>
      <ul className="mt-4 grid sm:grid-cols-2 gap-x-8">
        {moreProjects.map((m) => (
          <li key={m.name} className="border-b-2 border-ink/15">
            <a href={m.href} target="_blank" rel="noopener" className="group flex items-baseline gap-3 py-4">
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

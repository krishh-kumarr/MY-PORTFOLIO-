'use client';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import ProjectGallery from './ProjectGallery';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import ProjectVisual from './ProjectVisual';
import { useAvatar } from './AvatarProvider';
import { projects, moreProjects, galleries } from '@/lib/data';

const tones = { sky: 'bg-sky-soft mesh mesh-sky', teal: 'bg-teal-soft mesh mesh-teal', mustard: 'bg-mustard-soft mesh mesh-mustard' };
const spots = { sky: '#7FD6CF', teal: '#5FD0C6', mustard: '#F0B544' };

/** A project as a folder: hover slides its photos up like papers, click opens the gallery. */
function Card({ p, onOpen }) {
  const { react, settle } = useAvatar();
  const think = () => react('thoughtful', p.pitch, 0);
  const papers = (galleries[p.slug] ?? []).slice(0, 3);
  return (
    <article onPointerEnter={think} onPointerLeave={settle} onFocus={think} onBlur={settle} style={{ '--spot': spots[p.tone] }} className="group spot tilt bg-surface sticker rounded-3xl flex flex-col mt-10">
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
      <div className="p-6 flex flex-col gap-3 flex-1 border-t border-line">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display font-bold text-2xl mr-auto">
            <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0 after:content-[''] cursor-pointer focus-visible:outline-none">{p.name}</button>
          </h3>
          <span className="text-muted font-medium tabular-nums shrink-0">{p.year}</span>
        </div>
        <p>{p.summary}</p>
        <p className="font-semibold">{p.result}</p>
        <ul className="mt-auto pt-2 flex flex-wrap gap-2" aria-label="Built with">
          {p.stack.map((s) => <li key={s} className="text-sm font-medium bg-raised border border-line rounded-full px-2.5 py-0.5">{s}</li>)}
        </ul>
        <span className="inline-flex items-center gap-1 font-semibold">Open the folder <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
      </div>
    </article>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <Section id="projects" title="Things I’ve built" intro="Each project is a folder. Hover to peek inside, click to open it." mood="thoughtful" say="Hover a project and I’ll explain it.">
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => <Card key={p.slug} p={p} onOpen={() => setOpen(p)} />)}
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
      <AnimatePresence>{open && <ProjectGallery key={open.slug} project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}

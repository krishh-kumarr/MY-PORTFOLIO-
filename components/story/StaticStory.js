'use client';
import { motionValue } from 'motion/react';
import Beat from './Beat';
import { AvatarFace } from '../Avatar';
import { stillScenes } from './scenes';

const still = motionValue(0.5);
const moodFor = { low: 'thoughtful', next: 'confident', win: 'excited' };

/** The whole story as a calm, readable page: same words and photos, no motion. */
export default function StaticStory({ chapters }) {
  return (
    <div className="mx-auto max-w-5xl px-5 space-y-24 py-16">
      {chapters.map((c) => {
        const Scene = stillScenes[c.scene];
        return (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`}>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl sticker overflow-hidden">
              <Scene progress={still} />
              <div className="absolute bottom-0 left-4 w-[28%] max-w-[200px]">
                <AvatarFace mood={c.mood} sizes="200px" className="aspect-[640/700]" />
              </div>
            </div>
            <h2 id={`${c.id}-title`} className="mt-8 font-display font-extrabold tracking-tight">
              <span className="block text-lg text-muted font-semibold">Chapter {c.number}</span>
              <span className="block text-5xl leading-[0.95] mt-1">{c.title}</span>
            </h2>
            <p className="mt-3 text-xl">{c.line} <span className="text-muted">{c.years}</span></p>
            <ol className="mt-8 grid gap-6 md:grid-cols-2">
              {c.beats.map((b, i) => <li key={i} data-mood={moodFor[b.kind] ?? c.mood}><Beat beat={b} /></li>)}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

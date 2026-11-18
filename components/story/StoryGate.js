'use client';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import Story from './Story';
import Surat from './scenes/Surat';
import { motionValue } from 'motion/react';

const still = motionValue(0.2);

/** The optional cinematic story at the end of the portfolio. Nothing loads until the visitor presses play. */
export default function StoryGate() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (open) requestAnimationFrame(() => document.getElementById('surat')?.scrollIntoView({ behavior: 'smooth' })); }, [open]);

  return (
    <section id="story" data-story aria-labelledby="story-title" className="relative border-t border-line">
      <div className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-60"><Surat progress={still} /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
        <div className="relative z-10 mx-auto max-w-6xl h-full px-5 flex flex-col justify-end pb-[12svh]">
          <p className="text-teal font-semibold text-lg">Optional, about three minutes</p>
          <h2 id="story-title" className="mt-2 font-display font-extrabold tracking-tight text-5xl sm:text-7xl leading-[0.92] max-w-[16ch]">The story of someone who refused to stop figuring things out.</h2>
          <p className="mt-5 text-lg text-muted max-w-[52ch]">Five chapters from Surat to the starting grid: the lost first year, the App Store rejections, six hard months at Samsung PRISM, and the wins that came after.</p>
          <div className="mt-8">
            {open ? (
              <a href="#surat" className="sticker sticker-hover rounded-full bg-mustard px-7 py-3.5 font-semibold text-lg inline-flex items-center gap-2"><Play size={20} aria-hidden="true" /> Back to the start</a>
            ) : (
              <button type="button" onClick={() => setOpen(true)} className="group sticker sticker-hover rounded-full bg-mustard px-7 py-3.5 font-semibold text-lg inline-flex items-center gap-3 cursor-pointer">
                <span className="grid place-items-center size-8 rounded-full bg-night text-mustard transition-transform group-hover:scale-110"><Play size={16} fill="currentColor" aria-hidden="true" /></span>
                Play the story
              </button>
            )}
          </div>
        </div>
      </div>
      {open && <Story />}
    </section>
  );
}

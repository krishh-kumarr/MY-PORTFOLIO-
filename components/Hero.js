'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { AvatarFace, useTilt } from './Avatar';
import Bubble from './Bubble';
import Stars from './Stars';
import { useAvatar, useSectionMood } from './AvatarProvider';
import { links } from '@/lib/data';

export default function Hero() {
  const ref = useRef(null);
  const { mood, say, react, settle } = useAvatar();
  const tilt = useTilt(5);
  useSectionMood(ref, 'confident', 'Hi, I’m Krish. I build iOS apps, data pipelines and ML systems.');

  const poke = () => {
    react('surprised', 'Whoa! Okay, you found the secret button.', 1400);
    setTimeout(() => react('excited', 'Now go check out my projects.', 2200), 1400);
  };

  return (
    <section ref={ref} id="top" className="mx-auto max-w-6xl px-5 pt-10 pb-20 lg:pt-16 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
      <div className="relative" style={{ perspective: 900 }}>
        <motion.div
          {...{ onPointerMove: tilt.onPointerMove, onPointerLeave: (e) => { tilt.onPointerLeave(e); settle(); } }}
          style={tilt.style}
          initial={tilt.reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative aspect-square max-w-[460px] mx-auto rounded-[44px] bg-sky sticker overflow-hidden"
        >
          <Stars className="absolute inset-0 w-full h-full" />
          <button
            type="button"
            onClick={poke}
            onPointerEnter={() => react('laughing', 'Ha, hi there! Click me if you dare.', 0)}
            onFocus={() => react('laughing', 'Ha, hi there! Press Enter if you dare.', 0)}
            onBlur={settle}
            aria-label="Poke the avatar"
            className="absolute inset-x-[4%] -bottom-[9%] cursor-pointer rounded-t-[40%] focus-visible:outline-offset-[-6px]"
          >
            <motion.div
              animate={tilt.reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AvatarFace mood={mood} sizes="(min-width: 1024px) 380px, 80vw" priority className="aspect-[640/700]" />
            </motion.div>
          </button>
        </motion.div>
        <Bubble text={say} tail="bottom" className="absolute z-10 -top-6 left-4 right-6 sm:left-auto sm:-right-4 sm:max-w-[300px] lg:-right-12" />
      </div>

      <div>
        <h1 className="font-display font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">Krish Kumar</h1>
        <p className="mt-6 text-xl sm:text-2xl leading-snug max-w-[30ch]">
          I build iOS apps, data pipelines and machine learning systems.
        </p>
        <p className="mt-4 text-muted text-lg max-w-[46ch]">
          Computer science student at SRM University, Chennai (CGPA 9.81). Most recently an iOS Developer Intern at Infosys, and before that an R&amp;D intern at Samsung PRISM.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold text-lg">See my projects</a>
          <a href="#contact" className="sticker sticker-hover rounded-full bg-white px-6 py-3 font-semibold text-lg">Get in touch</a>
        </div>
        <ul className="mt-8 flex gap-5 font-medium">
          <li><a className="underline decoration-2 underline-offset-4 hover:decoration-mustard" href={links.github} target="_blank" rel="noopener">GitHub</a></li>
          <li><a className="underline decoration-2 underline-offset-4 hover:decoration-mustard" href={links.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a className="underline decoration-2 underline-offset-4 hover:decoration-mustard" href={links.instagram} target="_blank" rel="noopener">Instagram</a></li>
        </ul>
      </div>
    </section>
  );
}

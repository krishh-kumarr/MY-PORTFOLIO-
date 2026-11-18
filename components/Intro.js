'use client';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { AvatarFace } from './Avatar';
import { useAvatar } from './AvatarProvider';

/** Opening shot: the name, the thesis, and an invitation to start the story. */
export default function Intro() {
  const { mood, react, settle } = useAvatar();
  const reduce = useReducedMotion();
  return (
    <section id="top" aria-labelledby="intro-title" className="relative h-[calc(100dvh-4rem)] min-h-[560px] overflow-hidden bg-[#0F1B2D] text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[5dvh] bg-ink" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[5dvh] bg-ink z-10" />
      <div className="relative z-10 mx-auto max-w-6xl h-full px-5 flex flex-col justify-center">
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-teal font-semibold text-lg">A story in five chapters</motion.p>
        <motion.h1 id="intro-title" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="mt-3 font-display font-extrabold tracking-tight text-6xl sm:text-8xl leading-[0.9]">
          Krish Kumar
        </motion.h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }} className="mt-6 text-2xl sm:text-3xl max-w-[22ch] leading-snug">
          The story of someone who refused to stop figuring things out.
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#story" className="sticker sticker-hover rounded-full bg-mustard text-ink px-6 py-3 font-semibold text-lg inline-flex items-center gap-2">
            Start the story <ChevronDown aria-hidden="true" className={reduce ? '' : 'animate-bounce'} />
          </a>
          <a href="#projects" className="font-semibold underline decoration-2 underline-offset-4 hover:decoration-mustard">Skip to projects</a>
        </div>
      </div>
      <button
        type="button"
        onPointerEnter={() => react('laughing', 'Ready? It starts in Surat.', 0)}
        onPointerLeave={settle}
        onClick={() => react('excited', 'Let’s go!', 1600)}
        aria-label="Wave at the avatar"
        className="absolute right-[2%] -bottom-[2dvh] w-[min(58vw,440px)] cursor-pointer"
      >
        <AvatarFace mood={mood} priority sizes="(min-width: 1024px) 440px, 58vw" className="aspect-[640/700]" />
      </button>
    </section>
  );
}

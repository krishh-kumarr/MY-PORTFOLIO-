'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, FileText, Play } from 'lucide-react';
import { AvatarFace } from './Avatar';
import Bubble from './Bubble';
import { useAvatar, useSectionMood } from './AvatarProvider';
import { canRun3D, readEnv } from '@/lib/capability';
import { links } from '@/lib/data';

const HeroStage3D = dynamic(() => import('./hero/HeroStage3D'), { ssr: false, loading: () => null });

const GREETING = 'Hi, I’m Krish. Move your cursor, I’m watching.';

export default function Hero() {
  const ref = useRef(null);
  const { mood, say, react, settle } = useAvatar();
  const reduce = useReducedMotion();
  const [three, setThree] = useState(false);
  const [aura, setAura] = useState('none');
  const [pose, setPose] = useState('idle');
  const hovering = useRef(false), timer = useRef();
  useSectionMood(ref, 'confident', GREETING);
  useEffect(() => { setThree(canRun3D(readEnv())); return () => clearTimeout(timer.current); }, []);

  const onHover = (on) => {
    hovering.current = on;
    if (on) { setAura('gold'); react('laughing', 'Powering up… click me if you dare.', 0); }
    else { setAura('none'); settle(); }
  };
  const onPoke = () => {
    clearTimeout(timer.current);
    setAura('lightning'); setPose('wave');
    react('surprised', 'Whoa! Lightning mode. Okay, you found the secret.', 1800);
    timer.current = setTimeout(() => { setPose('idle'); setAura(hovering.current ? 'gold' : 'none'); }, 1800);
  };

  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.2, 0.8, 0.2, 1] } });

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 hero-bg" />
      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-20 lg:pt-20 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center min-h-[calc(100dvh-4rem)]">
        <div>
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm font-medium text-muted">
            <span className="size-2 rounded-full bg-[#3FB950] animate-pulse" aria-hidden="true" /> Open to SDE and iOS roles
          </motion.p>
          <motion.h1 {...fade(0.08)} id="hero-title" className="mt-6 font-display font-extrabold tracking-tight text-6xl sm:text-7xl lg:text-8xl leading-[0.9]">
            Krish Kumar
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 text-xl sm:text-2xl leading-snug max-w-[28ch] text-fg/90">
            I build iOS apps, data pipelines and machine learning systems.
          </motion.p>
          <motion.p {...fade(0.24)} className="mt-4 text-muted text-lg max-w-[48ch]">
            Final-year computer science at SRM University (CGPA 9.81). iOS Developer Intern at Infosys, and winner of the Samsung PRISM Excellence Award with my team.
          </motion.p>
          <motion.div {...fade(0.32)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold text-lg inline-flex items-center gap-2">See my work <ArrowDown size={18} aria-hidden="true" /></a>
            <a href="#story" className="sticker sticker-hover rounded-full bg-surface px-6 py-3 font-semibold text-lg inline-flex items-center gap-2"><Play size={18} aria-hidden="true" /> Watch my story</a>
            <a href={links.resume} target="_blank" rel="noopener" className="rounded-full px-4 py-3 font-semibold inline-flex items-center gap-2 text-muted hover:text-fg"><FileText size={18} aria-hidden="true" /> Resume</a>
          </motion.div>
          <motion.dl {...fade(0.4)} className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {[['9.81', 'CGPA'], ['3', 'internships'], ['₹80K', 'PRISM prize']].map(([n, l]) => (
              <div key={l} className="border-l-2 border-mustard pl-3"><dt className="sr-only">{l}</dt><dd className="font-display font-bold text-2xl">{n}</dd><dd className="text-sm text-muted">{l}</dd></div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...fade(0.2)} className="relative aspect-square w-full max-w-[560px] mx-auto">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full hero-halo" />
          {three ? (
            <HeroStage3D mood={mood} aura={aura} pose={pose} onHover={onHover} onPoke={onPoke} />
          ) : (
            <button type="button" aria-label="Poke the avatar" onPointerEnter={() => react('laughing', 'Ha, hi there!', 0)} onPointerLeave={settle} onClick={() => react('surprised', 'Whoa! You found the secret.', 1800)} className="absolute inset-x-[14%] bottom-0 cursor-pointer">
              <AvatarFace mood={mood} sizes="(min-width: 1024px) 420px, 72vw" priority className="aspect-[640/700]" />
            </button>
          )}
          <Bubble text={say} tail="bottom" className="absolute z-10 top-[1%] left-0 max-w-[240px] text-sm sm:text-base" />
          <p aria-hidden="true" className="absolute bottom-1 inset-x-0 text-center text-xs text-muted">Hover me. Click me.</p>
        </motion.div>
      </div>
    </section>
  );
}

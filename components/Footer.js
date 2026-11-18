'use client';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Play } from 'lucide-react';
import { links } from '@/lib/data';

/** Sign-off: "See you around." over a giant name, with the avatar standing among the crowd it met along the way. */
export default function Footer({ onPlay }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);
  const crowdY = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);
  const meY = useTransform(scrollYProgress, [0, 1], ['24%', '0%']);
  return (
    <footer ref={ref} className="relative mt-10 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-14 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display font-extrabold text-2xl">Krish.</p>
          <p className="mt-1 text-muted">iOS, data and ML engineer</p>
          <h2 className="mt-8 font-display font-extrabold tracking-tight text-4xl sm:text-5xl">See you around.</h2>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 content-start text-muted">
          {[['Work', '#work'], ['Projects', '#projects'], ['Skills', '#skills'], ['Recognition', '#recognition'], ['Contact', '#contact'], ['Resume', links.resume]].map(([l, h]) => (
            <a key={l} href={h} className="hover:text-fg w-fit">{l}</a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-muted">
          <a href={`mailto:${links.email}`} className="hover:text-fg break-all">{links.email}</a>
          <a href={links.github} target="_blank" rel="noopener" className="hover:text-fg">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noopener" className="hover:text-fg">LinkedIn</a>
          <a href={links.instagram} target="_blank" rel="noopener" className="hover:text-fg">Instagram</a>
        </div>
      </div>

      <div className="relative mt-10 h-[min(62vw,520px)]">
        <motion.p aria-hidden="true" style={reduce ? undefined : { y: nameY }} className="absolute inset-x-0 top-0 text-center font-display font-extrabold leading-none tracking-tighter text-[26vw] text-fg/[.06] select-none">KRISH</motion.p>
        <motion.div aria-hidden="true" style={reduce ? undefined : { y: crowdY }} className="absolute inset-x-0 bottom-0 h-[72%] footer-crowd">
          <Image src="/art/crew-selfie.webp" alt="" fill sizes="100vw" className="object-cover object-[50%_35%]" />
        </motion.div>
        <motion.div style={reduce ? undefined : { y: meY }} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[92%] aspect-[254/898]">
          <Image src="/avatar/body-front.webp" alt="Krish's cartoon avatar standing in front" width={254} height={898} sizes="160px" className="h-full w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,.45)]" />
        </motion.div>
        {onPlay && (
          <button type="button" onClick={onPlay} className="absolute z-10 right-5 bottom-6 sm:right-[8%] sticker sticker-hover rounded-full bg-mustard px-5 py-3 font-semibold inline-flex items-center gap-2 cursor-pointer">
            <Play size={16} fill="currentColor" aria-hidden="true" /> Play my story
          </button>
        )}
      </div>
      <p className="relative z-10 border-t border-line px-5 py-4 text-center text-sm text-muted bg-night">© {new Date().getFullYear()} Krish Kumar</p>
    </footer>
  );
}

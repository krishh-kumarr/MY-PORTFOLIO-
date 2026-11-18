'use client';
import { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { AvatarFace } from './Avatar';
import { links } from '@/lib/data';

/** Sign-off: one clear call to action, the name set huge with the avatar in front, then a quiet bottom bar. */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [mood, setMood] = useState('confident');
  const copy = async () => { try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} };
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div aria-hidden="true" className="absolute inset-0 footer-glow" />
      <div className="relative mx-auto max-w-6xl px-5 pt-20">
        <p className="text-teal font-semibold">What’s next</p>
        <h2 className="mt-2 font-display font-extrabold tracking-tight text-5xl sm:text-7xl leading-[0.95] max-w-[14ch]">Let’s build something together.</h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${links.email}`} className="sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold text-lg inline-flex items-center gap-2">Email me <ArrowUpRight size={18} aria-hidden="true" /></a>
          <button type="button" onClick={copy} className="rounded-full border border-line bg-surface px-5 py-3 font-medium inline-flex items-center gap-2 hover:border-mustard cursor-pointer">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span>{copied ? 'Copied' : links.email}</span>
          </button>
        </div>
      </div>

      <div className="relative mt-10 select-none" onPointerEnter={() => setMood('laughing')} onPointerLeave={() => setMood('confident')}>
        <p aria-hidden="true" className="footer-name text-center font-display font-extrabold leading-[0.8] tracking-tighter text-[23vw]">KRISH</p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(30vw,300px)] footer-float">
          <AvatarFace mood={mood} sizes="300px" className="aspect-[640/700]" />
        </div>
      </div>

      <div className="relative border-t border-line bg-night">
        <div className="mx-auto max-w-6xl px-5 py-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
          <span className="mr-auto">© {new Date().getFullYear()} Krish Kumar · iOS, data and ML engineer</span>
          {[['Work', '/#work'], ['Projects', '/#projects'], ['Story', '/#story'], ['Resume', links.resume]].map(([l, h]) => <a key={l} href={h} className="hover:text-fg">{l}</a>)}
          <span aria-hidden="true" className="h-4 w-px bg-line" />
          <a href={links.github} target="_blank" rel="noopener" className="hover:text-fg">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noopener" className="hover:text-fg">LinkedIn</a>
          <a href={links.instagram} target="_blank" rel="noopener" className="hover:text-fg">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

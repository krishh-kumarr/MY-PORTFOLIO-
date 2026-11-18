'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import StaticStory from './StaticStory';
import StoryPlayer from './StoryPlayer';
import Footer from '../Footer';
import { chapters } from '@/lib/story';

/** The footer is where the story lives: press play and the film opens; reduced motion gets the still story. */
export default function StoryGate() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const play = () => setOpen(true);
    window.addEventListener('play-story', play);
    return () => window.removeEventListener('play-story', play);
  }, []);
  const toProjects = () => { setOpen(false); requestAnimationFrame(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })); };
  return (
    <div id="story" data-story>
      {open && reduce && <section aria-label="Krish’s story"><StaticStory chapters={chapters} /></section>}
      {open && !reduce && <StoryPlayer onClose={() => setOpen(false)} onProjects={toProjects} />}
      <Footer onPlay={() => setOpen(true)} />
    </div>
  );
}

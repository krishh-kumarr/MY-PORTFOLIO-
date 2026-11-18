'use client';
import { useReducedMotion } from 'motion/react';
import StaticStory from './StaticStory';
import StoryPlayer from './StoryPlayer';
import Footer from '../Footer';
import { chapters } from '@/lib/story';

/** The story plays on a loop at the bottom of the page, right above the sign-off. Reduced motion gets the still story. */
export default function StoryGate() {
  const reduce = useReducedMotion();
  return (
    <div id="story" data-story>
      <section aria-labelledby="story-title" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-6">
          <p className="text-teal font-semibold">The story so far</p>
          <h2 id="story-title" className="mt-1 font-display font-extrabold tracking-tight text-4xl sm:text-6xl">Someone who refused to stop figuring things out.</h2>
        </div>
        {reduce ? <StaticStory chapters={chapters} /> : <StoryPlayer inline onClose={() => {}} />}
      </section>
      <Footer />
    </div>
  );
}

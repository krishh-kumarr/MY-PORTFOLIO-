'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import Chapter from './Chapter';
import StaticStory from './StaticStory';
import { scenes } from './scenes';
import { chapters } from '@/lib/story';
import { canRun3D, readEnv } from '@/lib/capability';

const StoryCharacter = dynamic(() => import('./StoryCharacter'), { ssr: false, loading: () => null });

/** The story: an animated film by default, a still page when the visitor prefers reduced motion. */
export default function Story() {
  const reduce = useReducedMotion();
  const root = useRef(null);
  const [three, setThree] = useState(false);
  useEffect(() => setThree(canRun3D(readEnv())), []);
  if (reduce) return <StaticStory chapters={chapters} />;
  return (
    <div ref={root} className="relative">
      {three && <StoryCharacter chapters={chapters} root={root} />}
      {chapters.map((c) => <Chapter key={c.id} chapter={c} Scene={scenes[c.scene]} traveler={!three} />)}
    </div>
  );
}

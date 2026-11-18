'use client';
import { useReducedMotion } from 'motion/react';
import Chapter from './Chapter';
import StaticStory from './StaticStory';
import { scenes } from './scenes';
import { chapters } from '@/lib/story';

/** The story: an animated film by default, a still page when the visitor prefers reduced motion. */
export default function Story() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticStory chapters={chapters} />;
  return <div className="relative">{chapters.map((c) => <Chapter key={c.id} chapter={c} Scene={scenes[c.scene]} />)}</div>;
}

'use client';
// Temporary preview of chapters with a placeholder scene. Deleted in Task 9.
import Chapter from '@/components/story/Chapter';
import { chapters } from '@/lib/story';

const Placeholder = () => <div className="w-full h-full bg-gradient-to-b from-sky to-teal-soft" />;
export default function Preview() {
  return <main>{chapters.map((c) => <Chapter key={c.id} chapter={c} Scene={Placeholder} />)}</main>;
}

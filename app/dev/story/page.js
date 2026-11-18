'use client';
// Temporary preview of chapters. Deleted in Task 9.
import Chapter from '@/components/story/Chapter';
import Surat from '@/components/story/scenes/Surat';
import Crossroads from '@/components/story/scenes/Crossroads';
import Canteen from '@/components/story/scenes/Canteen';
import { chapters } from '@/lib/story';

const Placeholder = () => <div className="w-full h-full bg-gradient-to-b from-sky to-teal-soft" />;
const scenes = { surat: Surat, crossroads: Crossroads, canteen: Canteen };
export default function Preview() {
  return <main>{chapters.map((c) => <Chapter key={c.id} chapter={c} Scene={scenes[c.scene] ?? Placeholder} />)}</main>;
}

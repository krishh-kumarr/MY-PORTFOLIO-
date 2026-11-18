'use client';
import { motion, useTransform } from 'motion/react';
import Rooftops from './Rooftops';
import Ground from './Ground';
import { beatWindow } from '../Chapter';
import { chapters } from '@/lib/story';

const grind = chapters.find((c) => c.id === 'grind');
const firstWin = grind.beats.findIndex((b) => b.kind === 'win');
const [CUT] = beatWindow(firstWin, grind.beats.length);

/** Chapter 4: night rooftops, then a cut to the floodlit ground when the wins arrive. */
export default function Grind({ progress }) {
  const groundOpacity = useTransform(progress, [CUT - 0.03, CUT + 0.01], [0, 1]);
  const groundProgress = useTransform(progress, [CUT, 1], [0, 1]);
  return (
    <div className="absolute inset-0">
      <div data-scene="rooftops" className="absolute inset-0"><Rooftops progress={progress} /></div>
      <motion.div data-scene="ground" style={{ opacity: groundOpacity }} className="absolute inset-0"><Ground progress={groundProgress} /></motion.div>
    </div>
  );
}

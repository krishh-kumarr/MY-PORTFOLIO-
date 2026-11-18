'use client';
import { motion, useTransform } from 'motion/react';
import LightsOut from '../LightsOut';
import Tower from './Tower';

/** Chapter 5: the start grid and lights out, then the hero tower. */
export default function Grid({ progress }) {
  const lights = useTransform(progress, [0, 0.7], [0, 1]);
  const towerOpacity = useTransform(progress, [0.66, 0.74], [0, 1]);
  return (
    <div className="absolute inset-0">
      <LightsOut progress={lights} />
      <motion.div style={{ opacity: towerOpacity }} className="absolute inset-0"><Tower progress={progress} /></motion.div>
    </div>
  );
}

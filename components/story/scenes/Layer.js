'use client';
import { motion, useTransform } from 'motion/react';

/** A parallax layer: deeper layers (higher depth) move further as the chapter plays. */
export function Layer({ depth, progress, children, drift = 160 }) {
  const x = useTransform(progress, [0, 1], [0, -drift * depth]);
  return <motion.g data-depth={depth} style={{ x }}>{children}</motion.g>;
}

/** Full-bleed scene canvas. Portrait screens crop the sides, keeping the ground in view. */
export function SceneSvg({ children, defs }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full">
      {defs && <defs>{defs}</defs>}
      {children}
    </svg>
  );
}

export const INK = '#15212B';

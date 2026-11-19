'use client';
import { Mascot } from 'page-mascot';

/** Chibi Krish: turns his head toward the cursor and reacts when clicked. */
export default function KrishMascot({ size = 140, className = '' }) {
  return <Mascot directions="/mascots/krish-directions.webp" reactions="/mascots/krish-reactions.webp" size={size} label="Chibi Krish, watching your cursor" className={className} />;
}

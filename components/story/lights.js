/** Lights-out timing on the scene's own 0→1 progress. */
export const LIGHTS_OUT = 0.75;
const FIRST = 0.1;
const STEP = 0.12;

/** How many of the five start lights are lit at progress p. All go out at LIGHTS_OUT. */
export function litCount(p) {
  if (p >= LIGHTS_OUT || p < FIRST) return 0;
  return Math.min(5, Math.floor((p - FIRST) / STEP) + 1);
}

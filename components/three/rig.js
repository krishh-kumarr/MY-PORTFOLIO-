/**
 * Pure animation maths for the 3D character. Angles in radians.
 * Positive hip/shoulder = limb swings backward; negative = forward.
 */

const S = Math.sin;

/** Joint targets for a pose at gait phase `ph` (one full stride = 2π). */
export function poseTargets(pose, ph) {
  switch (pose) {
    case 'walk': return gait(ph, 0.5, 0.75, 0.42, 0.05, 0.05);
    case 'run': return gait(ph, 0.95, 1.3, 0.9, 0.22, 0.11);
    case 'ninja': {
      const g = gait(ph, 1.05, 1.45, 0, 0.5, 0.13);
      // Arms swept straight back, a little flutter as the body drives forward.
      return { ...g, shoulderL: 1.35 + 0.08 * S(ph), shoulderR: 1.35 - 0.08 * S(ph), elbowL: -0.1, elbowR: -0.1, armOut: 0.18 };
    }
    case 'sit': return { hipL: -1.45, hipR: -1.45, kneeL: 1.35, kneeR: 1.35, shoulderL: -0.6, shoulderR: -0.6, elbowL: -0.9, elbowR: -0.9, lean: -0.05, bob: 0, twist: 0, armOut: 0.12 };
    case 'wave': {
      const b = idle(ph);
      return { ...b, shoulderR: -2.6, elbowR: -0.5 + 0.45 * S(ph * 6), armOutR: 0.35 };
    }
    default: return idle(ph);
  }
}

function idle(ph) {
  const breathe = S(ph * 0.5);
  // Hands in pockets, weight shifting gently from foot to foot.
  return { hipL: 0.02 * breathe, hipR: -0.02 * breathe, kneeL: 0.04, kneeR: 0.04, shoulderL: 0.12, shoulderR: 0.12, elbowL: -0.55, elbowR: -0.55, lean: 0.01 * breathe, bob: 0.006 * breathe, twist: 0.03 * breathe, armOut: 0.16 };
}

function gait(ph, hip, knee, arm, lean, bob) {
  const s = S(ph), c = Math.cos(ph);
  return {
    hipL: -hip * s, hipR: hip * s,
    kneeL: knee * Math.max(0, c), kneeR: knee * Math.max(0, -c),
    shoulderL: arm * s, shoulderR: -arm * s,
    elbowL: -0.35 - 0.5 * Math.max(0, -s) * (arm > 0 ? 1 : 0), elbowR: -0.35 - 0.5 * Math.max(0, s) * (arm > 0 ? 1 : 0),
    lean, bob: bob * Math.abs(S(ph)), twist: 0.08 * s * (arm > 0 ? 1 : 0), armOut: 0.1,
  };
}

/** Head rotation toward a cursor given in −1…1 screen space (y up). */
export function aimHead(x, y) {
  const clamp = (v, m) => Math.max(-m, Math.min(m, v));
  return { yaw: clamp(x * 0.5, 0.7) || 0, pitch: clamp(-y * 0.3, 0.4) || 0 };
}

export function poseForTravel(travel) {
  return { walk: 'walk', run: 'run', ninja: 'ninja', drive: 'idle' }[travel] ?? 'walk';
}

/** Which chapter is pinned on screen and how far through it we are (0→1). */
export function storyFrame(rects, vh) {
  for (let i = 0; i < rects.length; i++) {
    const { top, height } = rects[i];
    if (top <= 0 && top + height >= vh) return { index: i, progress: -top / (height - vh) };
  }
  return null;
}

/** Frame-rate independent smoothing toward a target. */
export const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));

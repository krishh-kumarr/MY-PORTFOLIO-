import { poseTargets, aimHead, storyFrame, poseForTravel } from '@/components/three/rig';

test('walk swings legs in opposition and arms against legs', () => {
  const a = poseTargets('walk', Math.PI / 2);
  expect(a.hipL).toBeCloseTo(-a.hipR);
  expect(Math.sign(a.shoulderL)).toBe(-Math.sign(a.hipL));
});

test('run swings wider and leans further forward than walk', () => {
  const w = poseTargets('walk', Math.PI / 2), r = poseTargets('run', Math.PI / 2);
  expect(Math.abs(r.hipL)).toBeGreaterThan(Math.abs(w.hipL));
  expect(r.lean).toBeGreaterThan(w.lean);
});

test('ninja run sweeps both arms straight back and leans hard', () => {
  for (const ph of [0, 1, 2, 3]) {
    const n = poseTargets('ninja', ph);
    expect(n.shoulderL).toBeGreaterThan(1);
    expect(n.shoulderR).toBeGreaterThan(1);
    expect(n.lean).toBeGreaterThan(0.4);
  }
});

test('sitting bends hips forward, idle stays upright', () => {
  expect(poseTargets('sit', 0).hipL).toBeLessThan(-1.2);
  expect(Math.abs(poseTargets('idle', 1).lean)).toBeLessThan(0.05);
});

test('head aim follows the cursor but never twists unnaturally', () => {
  expect(aimHead(0, 0)).toEqual({ yaw: 0, pitch: 0 });
  expect(aimHead(1, 0).yaw).toBeGreaterThan(0);
  expect(aimHead(-5, 5).yaw).toBeGreaterThanOrEqual(-0.7);
  expect(Math.abs(aimHead(0, 9).pitch)).toBeLessThanOrEqual(0.4);
});

test('travel styles map to poses', () => {
  expect(poseForTravel('walk')).toBe('walk');
  expect(poseForTravel('run')).toBe('run');
  expect(poseForTravel('ninja')).toBe('ninja');
});

test('storyFrame finds the pinned chapter and its progress', () => {
  const vh = 800;
  const rects = [{ top: -4000, height: 3200 }, { top: -1000, height: 3000 }, { top: 2000, height: 3000 }];
  expect(storyFrame(rects, vh)).toEqual({ index: 1, progress: 1000 / 2200 });
  expect(storyFrame([{ top: 300, height: 3000 }], vh)).toBeNull();
});

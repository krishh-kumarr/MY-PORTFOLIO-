import { canRun3D } from '@/lib/capability';

const ok = { webgl2: true, deviceMemory: 8, cores: 8, reducedMotion: false, saveData: false };

test('capable desktop runs 3D', () => expect(canRun3D(ok)).toBe(true));
test('no WebGL2 falls back', () => expect(canRun3D({ ...ok, webgl2: false })).toBe(false));
test('reduced motion falls back', () => expect(canRun3D({ ...ok, reducedMotion: true })).toBe(false));
test('data saver falls back', () => expect(canRun3D({ ...ok, saveData: true })).toBe(false));
test('low memory phone falls back', () => expect(canRun3D({ ...ok, deviceMemory: 2 })).toBe(false));
test('few cores falls back', () => expect(canRun3D({ ...ok, cores: 2 })).toBe(false));
test('unknown memory (Safari) is allowed', () => expect(canRun3D({ ...ok, deviceMemory: undefined })).toBe(true));

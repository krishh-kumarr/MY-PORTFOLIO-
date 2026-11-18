/** Decides whether a device should get the real 3D scene. Unknown values count as capable. */
export function canRun3D({ webgl2, deviceMemory, cores, reducedMotion, saveData }) {
  if (!webgl2 || reducedMotion || saveData) return false;
  if (deviceMemory !== undefined && deviceMemory < 4) return false;
  if (cores !== undefined && cores < 4) return false;
  return true;
}

/** Reads the environment in the browser. */
export function readEnv() {
  let webgl2 = false;
  try { webgl2 = !!document.createElement('canvas').getContext('webgl2'); } catch { webgl2 = false; }
  return {
    webgl2,
    deviceMemory: navigator.deviceMemory,
    cores: navigator.hardwareConcurrency,
    reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    saveData: navigator.connection?.saveData ?? false,
  };
}

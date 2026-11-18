'use client';
import * as THREE from 'three';

let grad;
/** Three-step cel-shading ramp. */
export function gradientMap() {
  if (!grad) {
    grad = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255]), 3, 1, THREE.RGBAFormat);
    grad.minFilter = grad.magFilter = THREE.NearestFilter;
    grad.needsUpdate = true;
  }
  return grad;
}

const toons = new Map();
export function toon(color) {
  if (!toons.has(color)) toons.set(color, new THREE.MeshToonMaterial({ color, gradientMap: gradientMap() }));
  return toons.get(color);
}

let ink;
/** Inverted-hull ink outline: back faces pushed out along normals. */
export function inkMaterial() {
  if (!ink) {
    ink = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: { t: { value: 0.012 } },
      vertexShader: 'uniform float t; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * t, 1.0); }',
      fragmentShader: 'void main(){ gl_FragColor = vec4(0.05, 0.06, 0.09, 1.0); }',
    });
  }
  return ink;
}

/** A cel-shaded mesh with an ink outline. */
export function T({ g, c, o = true, children, ...props }) {
  return (
    <group {...props}>
      <mesh geometry={g} material={toon(c)} />
      {o && <mesh geometry={g} material={inkMaterial()} />}
      {children}
    </group>
  );
}

/** Soft radial glow texture for additive sprites. */
let glowTex;
export function glowTexture() {
  if (!glowTex) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.35, 'rgba(255,255,255,.45)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    glowTex = new THREE.CanvasTexture(c);
  }
  return glowTex;
}

/** Canvas texture with centred text (number plates, headband mark). */
export function textTexture(text, { w = 128, h = 72, bg = '#F6FBFD', fg = '#15212B', font = '800 54px sans-serif' } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 3);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4;
  return t;
}

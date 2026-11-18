'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { litCount, LIGHTS_OUT } from './lights';

const INK = '#15212B';
const MUSTARD = '#E3A73A';

function useNumberTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 72;
    const g = c.getContext('2d');
    g.fillStyle = '#F6FBFD'; g.fillRect(0, 0, 128, 72);
    g.fillStyle = INK; g.font = '800 54px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('27', 64, 40);
    return new THREE.CanvasTexture(c);
  }, []);
}

/** Original open-wheel car from primitives, in Krish's colours with number 27. */
function Car(props) {
  const num = useNumberTexture();
  const wheels = [[-0.85, 0.62], [0.85, 0.62], [-0.85, -0.68], [0.85, -0.68]];
  return (
    <group {...props}>
      <mesh position={[0, 0.32, 0]}><boxGeometry args={[0.62, 0.3, 2.3]} /><meshStandardMaterial color={MUSTARD} flatShading /></mesh>
      <mesh position={[0, 0.3, -1.4]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.22, 0.7, 6]} /><meshStandardMaterial color={MUSTARD} flatShading /></mesh>
      <mesh position={[0, 0.2, -1.78]}><boxGeometry args={[1.6, 0.06, 0.32]} /><meshStandardMaterial color={INK} /></mesh>
      <mesh position={[0, 0.72, 1.05]}><boxGeometry args={[1.3, 0.08, 0.36]} /><meshStandardMaterial color={INK} /></mesh>
      <mesh position={[0, 0.5, 1.05]}><boxGeometry args={[0.08, 0.36, 0.2]} /><meshStandardMaterial color={INK} /></mesh>
      <mesh position={[0, 0.55, 0.1]}><boxGeometry args={[0.42, 0.18, 0.6]} /><meshStandardMaterial color={INK} /></mesh>
      <mesh position={[0, 0.66, 0.05]}><sphereGeometry args={[0.16, 10, 8]} /><meshStandardMaterial color="#A8DDF3" flatShading /></mesh>
      <mesh position={[0, 0.475, -0.7]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.5, 0.28]} /><meshBasicMaterial map={num} /></mesh>
      {wheels.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x * 0.62, 0.22, z * 1.4]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.24, 0.24, 0.3, 12]} /><meshStandardMaterial color={INK} /></mesh>
      ))}
    </group>
  );
}

function Track() {
  const kerbs = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -40]}><planeGeometry args={[7, 120]} /><meshStandardMaterial color="#26313E" /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -40]}><planeGeometry args={[60, 120]} /><meshStandardMaterial color="#163323" /></mesh>
      {kerbs.map((i) => [-1, 1].map((s) => (
        <mesh key={`${i}${s}`} position={[s * 3.6, 0.03, 4 - i * 2.4]}><boxGeometry args={[0.4, 0.06, 1.2]} /><meshStandardMaterial color={i % 2 ? '#D94B3D' : '#F6FBFD'} /></mesh>
      )))}
      {kerbs.map((i) => <mesh key={`l${i}`} position={[0, 0.02, 4 - i * 3]}><boxGeometry args={[0.12, 0.02, 1.4]} /><meshBasicMaterial color="#F6FBFD" transparent opacity={0.5} /></mesh>)}
    </group>
  );
}

function Scene({ progress }) {
  const { camera, invalidate, size } = useThree();
  const car = useRef();
  const lights = useRef([]);
  useEffect(() => progress.on('change', () => invalidate()), [progress, invalidate]);
  useFrame(() => {
    const p = progress.get();
    const n = litCount(p);
    lights.current.forEach((m, i) => { if (m) { const on = i < n; m.color.set(on ? '#FF2A1A' : '#3A1E1E'); m.emissive.set(on ? '#FF2A1A' : '#000000'); } });
    const t = Math.max(0, p - LIGHTS_OUT) / (1 - LIGHTS_OUT);
    const z = -t * t * 70;
    if (car.current) car.current.position.z = z;
    // Portrait screens pull the camera back and in line so the whole car stays in frame.
    const portrait = size.width < size.height;
    const cx = portrait ? 1.1 : 3.2, cz = portrait ? 7.5 : 4.6;
    camera.position.set(cx - t * cx * 0.7, 1.6 + t * 0.6, cz + z * 0.82); // the camera lags, so the car pulls away
    camera.lookAt(0, 0.6, z - 5);
  });
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />
      <Track />
      <group position={[0, 0, -6]}>
        <mesh position={[0, 3.2, 0]}><boxGeometry args={[6.4, 0.3, 0.3]} /><meshStandardMaterial color="#2E3B49" /></mesh>
        {[-3.1, 3.1].map((x) => <mesh key={x} position={[x, 1.6, 0]}><boxGeometry args={[0.2, 3.2, 0.2]} /><meshStandardMaterial color="#2E3B49" /></mesh>)}
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i} position={[-2 + i, 2.65, 0.05]}>
            <mesh><boxGeometry args={[0.7, 0.9, 0.2]} /><meshStandardMaterial color="#151C24" /></mesh>
            <mesh position={[0, 0.18, 0.12]}><sphereGeometry args={[0.16, 12, 10]} /><meshStandardMaterial ref={(m) => (lights.current[i] = m)} color="#3A1E1E" emissiveIntensity={2} /></mesh>
          </group>
        ))}
      </group>
      <Car ref={car} />
    </>
  );
}

/** The one real 3D moment: five red lights, then the car launches. */
export default function LightsOut3D({ progress, onContextLost }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      frameloop="demand"
      camera={{ fov: 50, position: [3.2, 1.6, 4.6] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onContextLost?.(); })}
    >
      <color attach="background" args={['#0F1B2D']} />
      <fog attach="fog" args={['#0F1B2D', 12, 60]} />
      <Scene progress={progress} />
    </Canvas>
  );
}

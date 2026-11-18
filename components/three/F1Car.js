'use client';
import { forwardRef, useMemo } from 'react';
import * as THREE from 'three';
import { T, textTexture } from './toon';
import Character from './Character';

const BODY = '#E9A93A', DARK = '#121820', TEAL = '#5FD0C6', TYRE = '#16191E', RIM = '#38414E', STRIPE = '#F2C230';

/** Side profile (x = length, nose at +x) extruded across the car's width, then turned so the nose points to −z. */
function profile(points, width, bevel = 0.04) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  const g = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 3 });
  g.translate(0, 0, -width / 2);
  g.rotateY(Math.PI / 2);
  g.computeVertexNormals();
  return g;
}

function useGeos() {
  return useMemo(() => {
    const halo = new THREE.CatmullRomCurve3([[-0.27, 0.56, 0.15], [-0.25, 0.78, -0.1], [0, 0.84, -0.42], [0.25, 0.78, -0.1], [0.27, 0.56, 0.15]].map((p) => new THREE.Vector3(...p)));
    return {
      tub: profile([[2.15, 0.14], [2.15, 0.22], [1.2, 0.36], [0.45, 0.52], [0.25, 0.5], [-0.15, 0.5], [-0.3, 0.76], [-0.55, 0.8], [-1.35, 0.62], [-1.95, 0.46], [-2.1, 0.36], [-2.1, 0.12]], 0.44),
      pod: profile([[0.55, 0.14], [0.45, 0.46], [-0.4, 0.5], [-1.5, 0.3], [-1.55, 0.14]], 0.36, 0.06),
      fin: profile([[-0.55, 0.78], [-1.4, 0.98], [-1.6, 0.98], [-1.6, 0.62]], 0.02, 0.004),
      floor: new THREE.BoxGeometry(1.5, 0.04, 3.5),
      wingMain: new THREE.BoxGeometry(2.0, 0.035, 0.34), wingFlap: new THREE.BoxGeometry(1.9, 0.025, 0.17), endFront: new THREE.BoxGeometry(0.03, 0.22, 0.46),
      rearMain: new THREE.BoxGeometry(1.2, 0.04, 0.3), rearFlap: new THREE.BoxGeometry(1.2, 0.03, 0.17), endRear: new THREE.BoxGeometry(0.04, 0.5, 0.52), pylon: new THREE.BoxGeometry(0.06, 0.42, 0.08),
      halo: new THREE.TubeGeometry(halo, 24, 0.03, 8, false), haloPost: new THREE.CylinderGeometry(0.025, 0.03, 0.3, 8),
      tyreF: new THREE.CylinderGeometry(0.31, 0.31, 0.3, 28), tyreR: new THREE.CylinderGeometry(0.34, 0.34, 0.38, 28),
      rim: new THREE.CylinderGeometry(0.2, 0.2, 0.02, 20), stripe: new THREE.TorusGeometry(0.255, 0.016, 6, 32), hub: new THREE.CylinderGeometry(0.05, 0.05, 0.03, 10),
      arm: new THREE.CylinderGeometry(0.012, 0.012, 1, 6), mirror: new THREE.BoxGeometry(0.12, 0.06, 0.04), plate: new THREE.PlaneGeometry(0.46, 0.26),
    };
  }, []);
}

function Wheel({ g, rear, side, refCb }) {
  const tyre = rear ? g.tyreR : g.tyreF;
  const w = rear ? 0.19 : 0.15;
  return (
    <group ref={refCb}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <T g={tyre} c={TYRE} />
        {[1, -1].map((f) => (
          <group key={f} position={[0, f * (w + 0.002), 0]}>
            <mesh geometry={g.rim}><meshToonMaterial color={RIM} /></mesh>
            <mesh geometry={g.stripe} rotation={[Math.PI / 2, 0, 0]}><meshBasicMaterial color={STRIPE} /></mesh>
            <mesh geometry={g.hub} position={[0, f * 0.01, 0]}><meshBasicMaterial color={BODY} /></mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function Arm({ g, from, to }) {
  const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return <mesh geometry={g.arm} position={mid} quaternion={q} scale={[1, len, 1]}><meshBasicMaterial color={DARK} /></mesh>;
}

export const WHEELS = [[-0.86, 0.31, -1.45, false], [0.86, 0.31, -1.45, false], [-0.84, 0.34, 1.35, true], [0.84, 0.34, 1.35, true]];

/** An original open-wheel race car in Krish's colours, number 27, with the 3D avatar in the cockpit. */
const F1Car = forwardRef(function F1Car({ wheels, mood = 'excited', look }, ref) {
  const g = useGeos();
  const num = useMemo(() => textTexture('27', { w: 128, h: 72, bg: '#F6FBFD', fg: '#15212B', font: '900 56px sans-serif' }), []);
  return (
    <group ref={ref}>
      <T g={g.tub} c={BODY} />
      {[-1, 1].map((s) => <T key={s} g={g.pod} c={BODY} position={[s * 0.42, 0, 0]} />)}
      <T g={g.fin} c={DARK} />
      <mesh geometry={g.floor} position={[0, 0.1, 0.05]}><meshToonMaterial color={DARK} /></mesh>
      {/* teal accent stripe along the tub */}
      <mesh position={[0, 0.47, -0.9]} rotation={[-0.2, 0, 0]}><boxGeometry args={[0.1, 0.01, 1.4]} /><meshBasicMaterial color={TEAL} /></mesh>
      {/* front wing */}
      <T g={g.wingMain} c={DARK} position={[0, 0.12, -2.15]} />
      <T g={g.wingFlap} c={BODY} position={[0, 0.2, -2.02]} rotation={[-0.3, 0, 0]} />
      {[-1, 1].map((s) => <T key={s} g={g.endFront} c={DARK} position={[s * 1.0, 0.18, -2.1]} />)}
      {/* rear wing */}
      <T g={g.pylon} c={DARK} position={[0, 0.7, 1.85]} />
      <T g={g.rearMain} c={DARK} position={[0, 0.92, 1.95]} rotation={[0.15, 0, 0]} />
      <T g={g.rearFlap} c={BODY} position={[0, 1.04, 2.06]} rotation={[0.35, 0, 0]} />
      {[-1, 1].map((s) => <T key={s} g={g.endRear} c={DARK} position={[s * 0.62, 0.86, 2.0]} />)}
      {/* halo */}
      <T g={g.halo} c={DARK} />
      <mesh geometry={g.haloPost} position={[0, 0.68, -0.48]} rotation={[0.5, 0, 0]}><meshToonMaterial color={DARK} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} geometry={g.mirror} position={[s * 0.42, 0.62, -0.5]}><meshToonMaterial color={DARK} /></mesh>)}
      {/* number plates: nose top and engine cover sides */}
      <mesh geometry={g.plate} position={[0, 0.375, -1.35]} rotation={[-Math.PI / 2 + 0.18, 0, 0]} scale={0.75}><meshBasicMaterial map={num} /></mesh>
      {[-1, 1].map((s) => <mesh key={s} geometry={g.plate} position={[s * 0.235, 0.6, -0.9 + 1.6]} rotation={[0, s * Math.PI / 2, 0]} scale={0.7}><meshBasicMaterial map={num} /></mesh>)}
      {/* suspension */}
      {WHEELS.map(([x, y, z], i) => (
        <group key={i}>
          <Arm g={g} from={[Math.sign(x) * 0.2, 0.32, z - 0.12]} to={[x * 0.85, y + 0.04, z]} />
          <Arm g={g} from={[Math.sign(x) * 0.2, 0.22, z + 0.12]} to={[x * 0.85, y - 0.06, z]} />
        </group>
      ))}
      {WHEELS.map(([x, y, z, rear], i) => (
        <group key={`w${i}`} position={[x, y, z]}>
          <Wheel g={g} rear={rear} side={Math.sign(x)} refCb={(el) => { if (wheels) wheels.current[i] = el; }} />
        </group>
      ))}
      {/* the driver: Krish, seated, looking down the track */}
      <group position={[0, 0.06, 0.02]} rotation={[0, Math.PI, 0]} scale={0.5}>
        <Character pose="sit" mood={mood} look={look} headband />
      </group>
    </group>
  );
});

export default F1Car;
